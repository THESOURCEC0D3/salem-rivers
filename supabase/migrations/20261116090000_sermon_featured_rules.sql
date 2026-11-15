-- Sermon status rules for the video dashboard. Apply once, after the media
-- library migration. Changes rules only; does not add or remove any videos.
begin;

do $$
begin
  if (select count(*) from public.sermons where status = 'live') > 1
     or (select count(*) from public.sermons where status = 'latest') > 1 then
    raise exception 'More than one sermon is already live or latest. Set the extras to previous, then run this again.';
  end if;
  if exists (select 1 from public.sermons where status <> 'previous' and not is_published) then
    raise exception 'A draft sermon is marked live or latest. Publish it or set it to previous, then run this again.';
  end if;
end $$;

-- At most one live and one latest sermon at any moment. Indexing a constant
-- over a filtered set means a second matching row is a duplicate.
create unique index sermons_one_live_idx on public.sermons ((true)) where status = 'live';
create unique index sermons_one_latest_idx on public.sermons ((true)) where status = 'latest';

-- A featured sermon must be visible to visitors; a draft cannot be live.
alter table public.sermons
  add constraint sermons_featured_must_be_published
  check (status = 'previous' or is_published);

-- Making a sermon live (or latest) moves the current one to previous in the
-- SAME statement, so a dropped connection can never leave two live or none.
-- SECURITY INVOKER: the demotion runs with the staff member's own permissions,
-- so the existing row-level security rules still apply.
create function public.demote_previous_featured_sermon()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if new.status in ('live', 'latest')
     and (tg_op = 'INSERT' or old.status is distinct from new.status) then
    update public.sermons set status = 'previous'
    where status = new.status and id <> new.id;
  end if;
  return new;
end;
$$;

-- Trigger functions are not meant to be called directly through the API.
revoke execute on function public.demote_previous_featured_sermon() from public, anon, authenticated;

create trigger sermons_single_featured
  before insert or update of status on public.sermons
  for each row execute function public.demote_previous_featured_sermon();

commit;

select 'Sermon status rules enabled' as result;
