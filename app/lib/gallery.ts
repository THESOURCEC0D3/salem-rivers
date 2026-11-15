import { cache } from "react";
import { connection } from "next/server";
import { createPublicClient } from "./supabase/public";
import { PREVIEWS_BUCKET } from "./media-upload";
import type { Album, Photo } from "../types/media";

/**
 * Previews live in a PRIVATE bucket, so every image needs a signed link.
 * One hour keeps an open tab working; the trade-off is that a photo unpublished
 * after a visitor loaded it stays reachable by that link until it expires.
 */
const PREVIEW_LINK_SECONDS = 60 * 60;

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export type GalleryPhoto = Pick<
  Photo,
  "id" | "original_path" | "original_filename" | "alt_text" | "caption" | "width" | "height"
> & { previewUrl: string | null };

export type GalleryAlbum = Album & { cover: GalleryPhoto | null };

const PHOTO_COLUMNS =
  "id, album_id, preview_path, original_path, original_filename, alt_text, caption, width, height, is_cover, sort_order";

type PhotoRow = Pick<
  Photo,
  | "id" | "album_id" | "preview_path" | "original_path" | "original_filename"
  | "alt_text" | "caption" | "width" | "height" | "is_cover" | "sort_order"
>;

async function signPreviews(rows: PhotoRow[]): Promise<GalleryPhoto[]> {
  if (rows.length === 0) return [];
  const supabase = createPublicClient();
  const { data, error } = await supabase.storage
    .from(PREVIEWS_BUCKET)
    .createSignedUrls(rows.map((row) => row.preview_path), PREVIEW_LINK_SECONDS);
  // A signing failure degrades to "preview unavailable" rather than crashing the page.
  const urls = new Map((error ? [] : data).map((item) => [item.path, item.error ? null : item.signedUrl]));
  return rows.map((row) => ({
    id: row.id,
    original_path: row.original_path,
    original_filename: row.original_filename,
    alt_text: row.alt_text,
    caption: row.caption,
    width: row.width,
    height: row.height,
    previewUrl: urls.get(row.preview_path) ?? null,
  }));
}

/** Published albums, newest event first, each with its cover (or first photo). */
export async function getPublishedAlbums(): Promise<GalleryAlbum[]> {
  // Signed links expire, so this must never be baked into a build-time page.
  await connection();
  const supabase = createPublicClient();
  // RLS already hides drafts; the filter states the intent and uses the partial index.
  const { data: albums, error } = await supabase
    .from("albums").select("*").eq("is_published", true)
    .order("event_date", { ascending: false }).order("id");
  if (error) throw new Error("Unable to load the gallery.");
  if (!albums?.length) return [];

  const ids = albums.map((album) => album.id);
  const covers = await supabase.from("photos").select(PHOTO_COLUMNS)
    .in("album_id", ids).eq("is_cover", true);
  if (covers.error) throw new Error("Unable to load the gallery.");
  const coverRows = new Map((covers.data as PhotoRow[]).map((row) => [row.album_id, row]));

  // Albums published without a chosen cover fall back to their first photo.
  const missing = ids.filter((id) => !coverRows.has(id));
  const fallbacks = await Promise.all(missing.map((id) =>
    supabase.from("photos").select(PHOTO_COLUMNS).eq("album_id", id)
      .order("sort_order").order("id").limit(1).maybeSingle()));
  fallbacks.forEach((result) => {
    if (result.data) coverRows.set((result.data as PhotoRow).album_id, result.data as PhotoRow);
  });

  const signed = await signPreviews([...coverRows.values()]);
  const byId = new Map(signed.map((photo) => [photo.id, photo]));
  return (albums as Album[]).map((album) => {
    const row = coverRows.get(album.id);
    return { ...album, cover: row ? byId.get(row.id) ?? null : null };
  });
}

/**
 * One published album and its photos. Wrapped in `cache` so generateMetadata
 * and the page share a single fetch per request instead of querying twice.
 */
export const getPublishedAlbum = cache(async (slug: string) => {
  await connection();
  if (!SLUG_PATTERN.test(slug)) return null;
  const supabase = createPublicClient();
  const { data: album, error } = await supabase
    .from("albums").select("*").eq("slug", slug).eq("is_published", true).maybeSingle();
  if (error) throw new Error("Unable to load this album.");
  if (!album) return null;

  const { data: rows, error: photosError } = await supabase
    .from("photos").select(PHOTO_COLUMNS).eq("album_id", album.id)
    .order("sort_order").order("id");
  if (photosError) throw new Error("Unable to load this album.");
  return { album: album as Album, photos: await signPreviews(rows as PhotoRow[]) };
});

/** event_date is a plain date; format in UTC so it never shifts by a day. */
export function formatEventDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
