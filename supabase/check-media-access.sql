-- Run after the media-library migration in Supabase's SQL Editor.
-- All test users and records are rolled back; no Auth emails are sent.
begin;

insert into auth.users (id)
values ('d875b07c-b274-4868-992d-119220347001');
insert into public.media_admins (user_id)
values ('d875b07c-b274-4868-992d-119220347001');

insert into public.albums (id, title, slug, event_date, is_published) values
('d875b07c-b274-4868-992d-119220347011', 'Access test public', 'access-test-d875b07c-public', current_date, true),
('d875b07c-b274-4868-992d-119220347012', 'Access test draft', 'access-test-d875b07c-draft', current_date, false);

insert into public.photos (
  id, album_id, original_path, preview_path, original_filename,
  alt_text, width, height, file_size, mime_type, is_published
) values
('d875b07c-b274-4868-992d-119220347021', 'd875b07c-b274-4868-992d-119220347011',
 'access-test-d875b07c/one.jpg', 'access-test-d875b07c/one.webp', 'one.jpg', 'Test one', 100, 100, 1024, 'image/jpeg', true),
('d875b07c-b274-4868-992d-119220347022', 'd875b07c-b274-4868-992d-119220347011',
 'access-test-d875b07c/two.jpg', 'access-test-d875b07c/two.webp', 'two.jpg', 'Test two', 100, 100, 1024, 'image/jpeg', false),
('d875b07c-b274-4868-992d-119220347023', 'd875b07c-b274-4868-992d-119220347012',
 'access-test-d875b07c/three.jpg', 'access-test-d875b07c/three.webp', 'three.jpg', 'Test three', 100, 100, 1024, 'image/jpeg', true);

insert into public.sermons (id, title, youtube_id, sermon_date, is_published) values
('d875b07c-b274-4868-992d-119220347031', 'Access test public', 'test_347031', current_date, true),
('d875b07c-b274-4868-992d-119220347032', 'Access test draft', 'test_347032', current_date, false);

set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
select set_config('request.jwt.claim.sub', '', true);

do $$
declare
  table_name text;
begin
  if (select count(*) from public.albums where slug like 'access-test-d875b07c-%') <> 1 then
    raise exception 'FAIL: public album visibility';
  end if;
  if (select count(*) from public.photos where original_path like 'access-test-d875b07c/%') <> 1 then
    raise exception 'FAIL: public photo visibility, including draft parent albums';
  end if;
  if (select count(*) from public.sermons where youtube_id like 'test_34703%') <> 1 then
    raise exception 'FAIL: public sermon visibility';
  end if;
  foreach table_name in array array['albums', 'photos', 'sermons'] loop
    if has_table_privilege('anon', 'public.' || table_name, 'INSERT, UPDATE, DELETE, TRUNCATE') then
      raise exception 'FAIL: visitors have write privileges on %', table_name;
    end if;
  end loop;
  if has_table_privilege('anon', 'public.media_admins', 'SELECT, INSERT, UPDATE, DELETE') then
    raise exception 'FAIL: visitors have staff membership access';
  end if;
end $$;

reset role;
set local role authenticated;
-- Spoofing user-editable metadata must not turn this ordinary user into staff.
select set_config('request.jwt.claim.sub', 'd875b07c-b274-4868-992d-119220347002', true);
select set_config('request.jwt.claims', '{"sub":"d875b07c-b274-4868-992d-119220347002","role":"authenticated","user_metadata":{"role":"admin","is_admin":true}}', true);

do $$
declare
  affected integer;
  table_name text;
begin
  if exists (select 1 from public.media_admins) then
    raise exception 'FAIL: ordinary users can read staff memberships';
  end if;
  if (select count(*) from public.albums where slug like 'access-test-d875b07c-%') <> 1
    or (select count(*) from public.photos where original_path like 'access-test-d875b07c/%') <> 1
    or (select count(*) from public.sermons where youtube_id like 'test_34703%') <> 1 then
    raise exception 'FAIL: ordinary user visibility';
  end if;

  begin
    insert into public.albums (title, slug, event_date)
    values ('Denied', 'access-test-d875b07c-denied', current_date);
    raise exception 'FAIL: ordinary user created an album';
  exception when insufficient_privilege then null;
  end;
  begin
    insert into public.photos (album_id, original_path, preview_path, original_filename, alt_text, width, height, file_size, mime_type)
    values ('d875b07c-b274-4868-992d-119220347011', 'access-test-d875b07c/denied.jpg', 'access-test-d875b07c/denied.webp', 'denied.jpg', 'Denied', 1, 1, 1, 'image/jpeg');
    raise exception 'FAIL: ordinary user created a photo';
  exception when insufficient_privilege then null;
  end;
  begin
    insert into public.sermons (title, youtube_id, sermon_date)
    values ('Denied', 'test_347099', current_date);
    raise exception 'FAIL: ordinary user created a sermon';
  exception when insufficient_privilege then null;
  end;

  foreach table_name in array array['photos', 'albums', 'sermons'] loop
    execute format('update public.%I set is_published = false where id::text like %L', table_name, 'd875b07c-b274-4868-992d-1192203470%');
    get diagnostics affected = row_count;
    if affected <> 0 then raise exception 'FAIL: ordinary user updated %', table_name; end if;
    execute format('delete from public.%I where id::text like %L', table_name, 'd875b07c-b274-4868-992d-1192203470%');
    get diagnostics affected = row_count;
    if affected <> 0 then raise exception 'FAIL: ordinary user deleted from %', table_name; end if;
  end loop;

  if has_table_privilege('authenticated', 'public.media_admins', 'INSERT, UPDATE, DELETE, TRUNCATE') then
    raise exception 'FAIL: users can manage staff memberships';
  end if;
end $$;

reset role;
set local role authenticated;
select set_config('request.jwt.claim.sub', 'd875b07c-b274-4868-992d-119220347001', true);
select set_config('request.jwt.claims', '{"sub":"d875b07c-b274-4868-992d-119220347001","role":"authenticated"}', true);

do $$
declare
  affected integer;
begin
  if (select count(*) from public.albums where slug like 'access-test-d875b07c-%') <> 2
    or (select count(*) from public.photos where original_path like 'access-test-d875b07c/%') <> 3
    or (select count(*) from public.sermons where youtube_id like 'test_34703%') <> 2 then
    raise exception 'FAIL: staff cannot read drafts';
  end if;
  update public.albums set title = 'Edited by staff' where id = 'd875b07c-b274-4868-992d-119220347012';
  get diagnostics affected = row_count;
  if affected <> 1 then raise exception 'FAIL: staff album update'; end if;
  update public.photos set caption = 'Edited by staff' where id = 'd875b07c-b274-4868-992d-119220347022';
  get diagnostics affected = row_count;
  if affected <> 1 then raise exception 'FAIL: staff photo update'; end if;
  update public.sermons set title = 'Edited by staff' where id = 'd875b07c-b274-4868-992d-119220347032';
  get diagnostics affected = row_count;
  if affected <> 1 then raise exception 'FAIL: staff sermon update'; end if;
end $$;

-- These mutations must succeed for an explicitly approved staff account.
insert into public.albums (id, title, slug, event_date)
values ('d875b07c-b274-4868-992d-119220347013', 'Staff-created', 'access-test-d875b07c-staff', current_date);
insert into public.photos (id, album_id, original_path, preview_path, original_filename, alt_text, width, height, file_size, mime_type)
values ('d875b07c-b274-4868-992d-119220347024', 'd875b07c-b274-4868-992d-119220347013', 'access-test-d875b07c/staff.jpg', 'access-test-d875b07c/staff.webp', 'staff.jpg', 'Staff test', 1, 1, 1, 'image/jpeg');
insert into public.sermons (id, title, youtube_id, sermon_date)
values ('d875b07c-b274-4868-992d-119220347033', 'Staff-created', 'test_347033', current_date);

do $$
declare affected integer;
begin
  delete from public.photos where id = 'd875b07c-b274-4868-992d-119220347024';
  get diagnostics affected = row_count;
  if affected <> 1 then raise exception 'FAIL: staff photo deletion'; end if;
  delete from public.albums where id = 'd875b07c-b274-4868-992d-119220347013';
  get diagnostics affected = row_count;
  if affected <> 1 then raise exception 'FAIL: staff album deletion'; end if;
  delete from public.sermons where id = 'd875b07c-b274-4868-992d-119220347033';
  get diagnostics affected = row_count;
  if affected <> 1 then raise exception 'FAIL: staff sermon deletion'; end if;
end $$;

reset role;
rollback;
select 'PASS: media access checks passed; all test records rolled back.' as result;
