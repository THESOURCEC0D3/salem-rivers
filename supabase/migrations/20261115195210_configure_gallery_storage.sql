-- Apply once, after creating gallery-originals and gallery-previews.
-- Does not upload, remove, or modify any photo files.
begin;

do $$
begin
  if (select count(*) from storage.buckets
      where id in ('gallery-originals', 'gallery-previews')) <> 2 then
    raise exception 'Create both buckets first: gallery-originals and gallery-previews.';
  end if;

  if not (select relrowsecurity from pg_class where oid = 'storage.objects'::regclass) then
    raise exception 'Storage row-level security must be enabled before applying these rules.';
  end if;

  -- Permissive policies combine with OR. An existing broad rule could expose
  -- drafts or permit uploads even with the correct gallery rules in place.
  -- This initial migration intentionally stops rather than altering such rules.
  if exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and permissive = 'PERMISSIVE'
      and roles && array['public', 'anon', 'authenticated']::name[]
  ) then
    raise exception 'Existing Storage policies need review before adding the gallery rules. No changes were applied.';
  end if;
end $$;

-- Keep original downloads and browsing previews private until a published
-- database record explicitly authorizes their release.
update storage.buckets
set public = false,
    file_size_limit = 52428800,
    allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp']
where id = 'gallery-originals';

update storage.buckets
set public = false,
    file_size_limit = 5242880,
    allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp']
where id = 'gallery-previews';

create policy "Visitors can read published gallery originals"
  on storage.objects for select to anon, authenticated
  using (
    bucket_id = 'gallery-originals'
    and exists (
      select 1 from public.photos
      join public.albums on albums.id = photos.album_id
      where photos.original_path = storage.objects.name
        and photos.is_published
        and albums.is_published
    )
  );

create policy "Visitors can read published gallery previews"
  on storage.objects for select to anon, authenticated
  using (
    bucket_id = 'gallery-previews'
    and exists (
      select 1 from public.photos
      join public.albums on albums.id = photos.album_id
      where photos.preview_path = storage.objects.name
        and photos.is_published
        and albums.is_published
    )
  );

-- SELECT supports staff draft previews and replacement uploads (upsert).
-- INSERT, UPDATE, and DELETE are all limited to explicit staff membership.
-- The USING and WITH CHECK sides also prevent moves to an unrelated bucket.
create policy "Media staff can manage gallery files"
  on storage.objects for all to authenticated
  using (
    bucket_id in ('gallery-originals', 'gallery-previews')
    and (select exists (
      select 1 from public.media_admins where user_id = (select auth.uid())
    ))
  )
  with check (
    bucket_id in ('gallery-originals', 'gallery-previews')
    and (select exists (
      select 1 from public.media_admins where user_id = (select auth.uid())
    ))
  );

commit;

-- Show the resulting bucket settings in the SQL Editor.
select id as bucket, public, file_size_limit
from storage.buckets
where id in ('gallery-originals', 'gallery-previews')
order by id;
