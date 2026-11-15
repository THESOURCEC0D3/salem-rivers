# Salem media library setup

The website's Supabase connection values belong in the ignored `.env.local`.
The browser client is in `app/lib/supabase/client.ts`; the stateless public
client is in `app/lib/supabase/public.ts`. The public client deliberately does
not attach a staff session. Authenticated server clients and session refresh
will be added with the admin dashboard.

## 1. Check the connection

```powershell
npm.cmd run supabase:check -- --connection-only
```

This makes a read-only request. It never prints the URL, key, or response data.

## 2. Create the tables

Use the Supabase connection in Codex to apply the reviewed migration, or open
the **SQL Editor** in the new Salem project's dashboard. Paste the complete
contents of `migrations/20261115192508_create_media_library.sql` and run once.
The transaction prevents a partial setup if a statement fails.

The tables are:

- `albums`: event names, dates, slugs, and publication status.
- `photos`: album membership, original and preview file paths, dimensions,
  download filename, captions, ordering, and publication status.
- `sermons`: YouTube IDs and sermon details. Video files remain on YouTube.
- `media_admins`: explicitly approved staff accounts. Signing in alone does
  not permit uploads or editing. Neither visitors nor staff can grant membership.

All media starts as a draft. Public reads require publication; photos also
require their parent album to be published. Table rules alone do not control
Storage files; configure storage using step 4 below.

If applying through the SQL Editor, this does not record CLI migration history.
Before adopting `db push`, reconcile the migration history with this applied
file; do not blindly reapply it. The CLI created the migration using v3.1.0.

## 3. Verify after applying

```powershell
npm.cmd run supabase:check
```

Run `check-media-access.sql` in the SQL Editor to exercise public, signed-in
non-staff, and staff permissions. It creates temporary test records inside a
transaction and rolls back all records. A failed assertion is an error; do not
publish the gallery until it passes. Review Supabase's Security Advisor too.

The migration and access checks have passed in an isolated PGlite PostgreSQL
instance with simulated Supabase roles and `auth.uid()`. TypeScript checks
also pass. This does not replace running the checks and Security Advisor
against the actual hosted project after applying the migration.

## Remaining work

1. Apply the storage migration and test real published-file downloads.
2. Add staff sign-in and uploads, including image resizing and file cleanup.
3. Build `/gallery`, albums, photo previews, and individual downloads.
4. Import the existing YouTube records and connect the Watch page.

The current homepage and Watch page still use their existing content while
this setup is in progress. Add the same public environment variables to the
hosting provider when deploying the integration.

## 4. Configure photo storage

Create two private buckets using **Storage > New bucket**:

| Bucket | Per-file limit | Allowed MIME types |
| --- | --- | --- |
| `gallery-originals` | 50 MB | `image/jpeg`, `image/png`, `image/webp` |
| `gallery-previews` | 5 MB | `image/jpeg`, `image/png`, `image/webp` |

Run `migrations/20261115195210_configure_gallery_storage.sql` once in a new SQL
Editor query. It checks that both buckets exist, enforces their settings, and
adds file-access policies. It stops if other permissive Storage policies
already apply to website roles, because those policies could bypass the
gallery's rules. Review any such policies before retrying; do not remove
unrelated rules blindly.

The storage migration has passed local PostgreSQL tests using simulated
Supabase Auth and Storage tables. Tests cover published/draft visibility,
unlinked uploads, wrong-bucket paths, denied visitor/non-staff writes, staff
CRUD, cross-bucket restrictions, membership revocation, and unpublishing.
The real Storage API upload, signed-link, and download flows still need an
end-to-end test after this migration is applied and a staff account is ready.

Visitors can read or obtain signed links only for files whose paths match a
published photo in a published album. File listing uses the same filter and
therefore reveals only published files. An upload with no photo record stays
hidden. A preview path cannot authorize a file in the originals bucket or vice
versa. Approved staff can read drafts and upload, replace, and delete files
in these two buckets only.

Use the public client and `createSignedUrl`/`createSignedUrls` for gallery
delivery, with a short expiry (for example 5 minutes); use the `download`
option for original downloads. `getPublicUrl` does not serve private buckets.
Already-issued links remain usable until they expire even if a photo is
unpublished. Keep signed URLs out of long-lived caches; refresh expired
previews when needed. Downloaded copies cannot be recalled.

The application should upload both files, then save the photo record, and
publish it only when both are ready. Remove files through the Storage API,
not by deleting rows from `storage.objects`.

## 5. Authorize the first staff account

Create the staff account in **Authentication > Users > Add user > Create new
user**. The website account is separate from the Supabase dashboard account.
For the owner's own email address, auto-confirm the account during creation.

The owner supplied User UID `4c346c90-3270-4f5e-9a0b-65ffb86aa7ba`. Run
`grant-media-staff.sql` in the Salem project's SQL Editor. It verifies that
the account exists and adds only that ID to `media_admins`. Re-running it is
safe. The result should say **Media staff access enabled**.

This account-specific setup script is not a migration to apply to other
environments. Passwords and tokens do not belong in it. Staff membership
authorizes access to the media tables and gallery files; it does not grant
Supabase dashboard access. The website's staff sign-in page and dashboard
are the next implementation step.

## 6. Sermon video rules (video dashboard)

Run `migrations/20261116090000_sermon_featured_rules.sql` once in a new SQL
Editor query. It allows at most one live and one latest sermon, stops a hidden
draft from being live or latest, and makes "Go live" move the previous live
video to previous in the same step. It changes rules only, not videos. The
result should say **Sermon status rules enabled**.

Videos added in `/admin/videos` are merged with those still in
`app/data/sermons.ts`. Once any dashboard video is live or latest, the dashboard
decides what is featured; file videos marked live/latest are shown as previous.

`vercel.json` schedules `/api/keep-alive` daily to help keep the free project
active. Optionally set a `CRON_SECRET` environment variable in Vercel so only
Vercel's scheduler can call it.
