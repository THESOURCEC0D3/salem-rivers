-- Initial media library. Apply once to the new Salem Supabase project.
-- This migration creates tables and access rules; it does not upload files.
begin;

create table public.media_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Membership is managed only through trusted database administration.
-- A signed-in person can inspect their own membership, but cannot grant it.
alter table public.media_admins enable row level security;
revoke all on public.media_admins from public, anon, authenticated;
grant select on public.media_admins to authenticated;
grant all on public.media_admins to service_role;
create policy "Staff can read their own membership"
  on public.media_admins for select to authenticated
  using (user_id = (select auth.uid()));

create table public.albums (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(btrim(title)) > 0),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  description text not null default '',
  event_date date not null,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create index albums_published_date_idx
  on public.albums (event_date desc, id) where is_published;

create table public.photos (
  id uuid primary key default gen_random_uuid(),
  -- Require the app to remove photos and their Storage files before an album
  -- is deleted. A cascading row deletion would leave orphaned photo files.
  album_id uuid not null references public.albums (id) on delete restrict,
  original_path text not null unique check (length(btrim(original_path)) > 0),
  preview_path text not null unique check (length(btrim(preview_path)) > 0),
  original_filename text not null check (length(btrim(original_filename)) > 0),
  alt_text text not null check (length(btrim(alt_text)) > 0),
  caption text not null default '',
  width integer not null check (width > 0),
  height integer not null check (height > 0),
  file_size bigint not null check (file_size > 0),
  mime_type text not null check (mime_type in ('image/jpeg', 'image/png', 'image/webp')),
  sort_order integer not null default 0 check (sort_order >= 0),
  is_cover boolean not null default false,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

-- The leading album_id also indexes the foreign key and album permission check.
create index photos_album_order_idx on public.photos (album_id, sort_order, id);
create unique index photos_one_cover_per_album_idx
  on public.photos (album_id) where is_cover;

create table public.sermons (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(btrim(title)) > 0),
  speaker text not null default '',
  description text not null default '',
  youtube_id text not null unique check (youtube_id ~ '^[A-Za-z0-9_-]{11}$'),
  sermon_date date not null,
  duration text not null default '',
  thumbnail_url text,
  status text not null default 'previous' check (status in ('live', 'latest', 'previous')),
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create index sermons_published_date_idx
  on public.sermons (sermon_date desc, id) where is_published;

alter table public.albums enable row level security;
alter table public.photos enable row level security;
alter table public.sermons enable row level security;

-- Revoke automatic/default grants before assigning only the necessary ones.
revoke all on public.albums, public.photos, public.sermons from public, anon, authenticated;
grant usage on schema public to anon, authenticated;
grant select on public.albums, public.photos, public.sermons to anon;
grant select, insert, update, delete on public.albums, public.photos, public.sermons to authenticated;
grant all on public.albums, public.photos, public.sermons to service_role;

create policy "Anyone can read published albums"
  on public.albums for select to anon, authenticated
  using (is_published);

create policy "Anyone can read published photos in published albums"
  on public.photos for select to anon, authenticated
  using (
    is_published and exists (
      select 1 from public.albums
      where albums.id = photos.album_id and albums.is_published
    )
  );

create policy "Anyone can read published sermons"
  on public.sermons for select to anon, authenticated
  using (is_published);

-- Membership checks use a server-managed table, not editable user metadata.
-- FOR ALL supplies staff read access to drafts as well as write access.
create policy "Media staff can manage albums"
  on public.albums for all to authenticated
  using ((select exists (select 1 from public.media_admins where user_id = (select auth.uid()))))
  with check ((select exists (select 1 from public.media_admins where user_id = (select auth.uid()))));

create policy "Media staff can manage photos"
  on public.photos for all to authenticated
  using ((select exists (select 1 from public.media_admins where user_id = (select auth.uid()))))
  with check ((select exists (select 1 from public.media_admins where user_id = (select auth.uid()))));

create policy "Media staff can manage sermons"
  on public.sermons for all to authenticated
  using ((select exists (select 1 from public.media_admins where user_id = (select auth.uid()))))
  with check ((select exists (select 1 from public.media_admins where user_id = (select auth.uid()))));

commit;
