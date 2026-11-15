import type { SupabaseClient } from "@supabase/supabase-js";
import type { Photo } from "../types/media";

export const ORIGINALS_BUCKET = "gallery-originals";
export const PREVIEWS_BUCKET = "gallery-previews";
export const MAX_ORIGINAL_BYTES = 50 * 1024 * 1024;

export interface PreparedPhoto {
  original: File;
  preview: Blob;
  width: number;
  height: number;
  extension: string;
}

export async function preparePhoto(file: File): Promise<PreparedPhoto> {
  if (!file.size || file.size > MAX_ORIGINAL_BYTES) throw new Error("Choose a picture smaller than 50 MB.");
  const extensions: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
  if (!extensions[file.type]) throw new Error("Choose a JPG, PNG, or WebP picture.");
  let bitmap: ImageBitmap;
  try { bitmap = await createImageBitmap(file); }
  catch { throw new Error("This picture couldn’t be opened. Try exporting it as a JPG."); }

  try {
    if (bitmap.width * bitmap.height > 80_000_000) throw new Error("This picture is too large to process. Export a smaller version first.");
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Your browser couldn’t prepare a preview. Try another browser.");
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const preview = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Couldn’t create a preview.")), "image/webp", 0.82);
    });
    if (preview.size > 5 * 1024 * 1024) throw new Error("The preview is too large. Try a smaller picture.");
    return { original: file, preview, width: bitmap.width, height: bitmap.height, extension: extensions[file.type] };
  } finally { bitmap.close(); }
}

/** Upload both files before publishing the corresponding photo record. */
export async function savePreparedPhoto(
  supabase: SupabaseClient,
  albumId: string,
  albumTitle: string,
  prepared: PreparedPhoto,
  sortOrder: number,
): Promise<Photo> {
  const id = crypto.randomUUID();
  const originalPath = `${albumId}/${id}.${prepared.extension}`;
  const previewExtension = prepared.preview.type === "image/webp" ? "webp" : "png";
  const previewPath = `${albumId}/${id}.${previewExtension}`;
  let rowAttempted = false;

  try {
    const original = await supabase.storage.from(ORIGINALS_BUCKET).upload(originalPath, prepared.original, {
      contentType: prepared.original.type, upsert: false, cacheControl: "300",
    });
    if (original.error) throw new Error("The original picture could not be uploaded.");
    const preview = await supabase.storage.from(PREVIEWS_BUCKET).upload(previewPath, prepared.preview, {
      contentType: prepared.preview.type, upsert: false, cacheControl: "300",
    });
    if (preview.error) throw new Error("The picture preview could not be uploaded.");

    rowAttempted = true;
    const { data, error } = await supabase.from("photos").insert({
      id, album_id: albumId, original_path: originalPath, preview_path: previewPath,
      original_filename: prepared.original.name, alt_text: `${albumTitle} — ${prepared.original.name}`,
      width: prepared.width, height: prepared.height, file_size: prepared.original.size,
      mime_type: prepared.original.type, sort_order: sortOrder, is_published: true,
    }).select("*").single();
    if (error) throw new Error("The picture details could not be saved.");
    return data as Photo;
  } catch (cause) {
    // A lost response may follow a committed insert. Check before removing its
    // files, so a retry cannot leave a saved photo with missing originals.
    if (rowAttempted) {
      let saved;
      try { saved = await supabase.from("photos").select("*").eq("id", id).maybeSingle(); }
      catch { throw new Error("We couldn’t confirm whether this picture was saved. Refresh the album before retrying."); }
      if (saved.error) throw new Error("We couldn’t confirm whether this picture was saved. Refresh the album before retrying.");
      if (saved.data) return saved.data as Photo;
    }
    const cleanup = await Promise.allSettled([
      supabase.storage.from(ORIGINALS_BUCKET).remove([originalPath]),
      supabase.storage.from(PREVIEWS_BUCKET).remove([previewPath]),
    ]);
    if (cleanup.some((result) => result.status === "rejected" || result.value.error)) {
      throw new Error("Upload failed and some files could not be cleaned up. Contact the website administrator before retrying this picture.");
    }
    throw cause;
  }
}

export async function deletePhoto(supabase: SupabaseClient, photo: Photo) {
  // Retain the hidden row until both file deletions succeed. Failed deletions
  // can then be retried using the stored paths, instead of leaving orphan files.
  const hidden = await supabase.from("photos").update({ is_published: false, is_cover: false })
    .eq("id", photo.id).select("id").single();
  if (hidden.error) throw new Error("Couldn’t hide the picture before deleting it.");
  const removed = await Promise.allSettled([
    supabase.storage.from(ORIGINALS_BUCKET).remove([photo.original_path]),
    supabase.storage.from(PREVIEWS_BUCKET).remove([photo.preview_path]),
  ]);
  if (removed.some((result) => result.status === "rejected" || result.value.error)) {
    throw new Error("The picture is now hidden, but its files could not all be deleted. Please retry Delete.");
  }
  const deleted = await supabase.from("photos").delete().eq("id", photo.id).select("id").single();
  if (deleted.error) throw new Error("Files were deleted, but the picture entry could not be removed. Please refresh and retry Delete.");
}

export async function checkPhotoFiles(supabase: SupabaseClient, photo: Photo) {
  const results = await Promise.all([
    supabase.storage.from(ORIGINALS_BUCKET).exists(photo.original_path),
    supabase.storage.from(PREVIEWS_BUCKET).exists(photo.preview_path),
  ]);
  if (results.some((result) => result.error || !result.data)) {
    throw new Error("This picture is missing an original or preview. Delete the entry and upload it again before making it visible.");
  }
}
