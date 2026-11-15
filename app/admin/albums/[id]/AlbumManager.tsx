"use client";

import Link from "next/link";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { checkPhotoFiles, deletePhoto, ORIGINALS_BUCKET, preparePhoto, PREVIEWS_BUCKET, savePreparedPhoto } from "@/app/lib/media-upload";
import type { Album, Photo } from "@/app/types/media";
import { StaffHeader } from "../../StaffHeader";
import { PhotoCard } from "./PhotoCard";

const input = "mt-2 min-h-11 w-full rounded-xl border border-border bg-background px-4";
const button = "min-h-11 rounded-full border border-border px-5 py-2 text-sm font-semibold hover:bg-muted disabled:opacity-50";

export function AlbumManager({ initialAlbum, initialPhotos, initialCount, email }: {
  initialAlbum: Album; initialPhotos: Photo[]; initialCount: number; email?: string;
}) {
  const [album, setAlbum] = useState(initialAlbum);
  const [photos, setPhotos] = useState(initialPhotos);
  const [total, setTotal] = useState(initialCount);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [previewRevision, setPreviewRevision] = useState(0);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState<{ done: number; total: number; name: string } | null>(null);
  const [failures, setFailures] = useState<string[]>([]);

  useEffect(() => {
    let active = true;
    async function refreshPreviews() {
      if (!photos.length) { setUrls({}); return; }
      try {
        const { data, error } = await createClient().storage.from(PREVIEWS_BUCKET)
          .createSignedUrls(photos.map((photo) => photo.preview_path), 300);
        if (!active) return;
        if (error) throw error;
        const next: Record<string, string> = {};
        data?.forEach((entry) => { if (entry.path && entry.signedUrl && !entry.error) next[entry.path] = entry.signedUrl; });
        setUrls(next);
      } catch {
        if (active) setError("Couldn’t refresh picture previews. Check your connection and use Refresh pictures.");
      }
    }
    void refreshPreviews();
    const timer = window.setInterval(() => { void refreshPreviews(); }, 240_000);
    const onFocus = () => { void refreshPreviews(); };
    window.addEventListener("focus", onFocus);
    return () => { active = false; clearInterval(timer); window.removeEventListener("focus", onFocus); };
  }, [photos, previewRevision]);

  useEffect(() => {
    if (!busy) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [busy]);

  async function refresh(limit = Math.max(24, photos.length)) {
    const { data, error, count } = await createClient().from("photos").select("*", { count: "exact" })
      .eq("album_id", album.id).order("sort_order").order("id").range(0, limit - 1);
    if (error) throw new Error("Couldn’t refresh the pictures. Please try again.");
    setPhotos(data as Photo[]);
    setTotal(count ?? 0);
  }

  async function run(task: () => Promise<void>, success: string, refreshAfter = true) {
    setBusy(true); setError(""); setMessage("");
    try {
      await task();
      if (refreshAfter) await refresh();
      setMessage(success);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The change couldn’t be saved. Please try again.");
      // Deletion can partly succeed: show the new hidden/retryable state.
      try { await refresh(); } catch { /* Keep the original actionable error. */ }
    } finally { setBusy(false); }
  }

  async function saveAlbum(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    if (!title) { setError("Enter an album name."); return; }
    await run(async () => {
      const { data, error } = await createClient().from("albums").update({ title,
        event_date: String(form.get("date")), description: String(form.get("description") ?? "").trim(),
      }).eq("id", album.id).select("*").single();
      if (error) throw new Error("Couldn’t save the album details.");
      setAlbum(data as Album);
    }, "Album details saved.");
  }

  async function toggleAlbum() {
    if (album.is_published && !window.confirm("Unpublish this album? Visitors will no longer be able to find it or get new download links.")) return;
    await run(async () => {
      const supabase = createClient();
      if (!album.is_published) {
        const { count, error } = await supabase.from("photos").select("id", { count: "exact", head: true })
          .eq("album_id", album.id).eq("is_published", true);
        if (error) throw new Error("Couldn’t check the album pictures.");
        if (!count) throw new Error("Add at least one visible picture before publishing this album.");
      }
      const { data, error } = await supabase.from("albums").update({ is_published: !album.is_published })
        .eq("id", album.id).select("*").single();
      if (error) throw new Error("Couldn’t change the album’s publication status.");
      setAlbum(data as Album);
    }, album.is_published ? "Album moved to drafts." : "Album published.");
  }

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!files.length) return;
    if (files.length > 20) { setError("Choose up to 20 pictures at a time."); return; }
    setBusy(true); setError(""); setMessage(""); setFailures([]);
    setProgress({ done: 0, total: files.length, name: files[0].name });
    let saved = 0;
    const failed: string[] = [];
    try {
      const supabase = createClient();
      const last = await supabase.from("photos").select("sort_order").eq("album_id", album.id)
        .order("sort_order", { ascending: false }).limit(1);
      if (last.error) throw new Error("Couldn’t check the album. Refresh and try again.");
      const start = (last.data?.[0]?.sort_order ?? -1) + 1;
      for (let i = 0; i < files.length; i++) {
        setProgress({ done: i, total: files.length, name: files[i].name });
        try {
          const prepared = await preparePhoto(files[i]);
          await savePreparedPhoto(supabase, album.id, album.title, prepared, start + i);
          saved++;
        } catch (cause) {
          failed.push(`${files[i].name}: ${cause instanceof Error ? cause.message : "Upload failed. Check your connection."}`);
          setFailures([...failed]);
        }
        setProgress({ done: i + 1, total: files.length, name: files[i].name });
      }
      await refresh();
      setMessage(`${saved} picture${saved === 1 ? "" : "s"} uploaded.${album.is_published ? " New pictures are visible to visitors." : " Publish the album when you’re ready to share it."}`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Couldn’t complete the uploads. Refresh this album before retrying.");
    } finally { setBusy(false); setProgress(null); }
  }

  async function savePhoto(photo: Photo, caption: string, altText: string, order: number) {
    if (!altText || !Number.isInteger(order) || order < 0 || order > 2147483647) {
      setError("Enter a picture description and a valid display order."); return;
    }
    await run(async () => {
      const { error } = await createClient().from("photos").update({ caption, alt_text: altText, sort_order: order })
        .eq("id", photo.id).select("id").single();
      if (error) throw new Error("Couldn’t save the picture details.");
    }, "Picture details saved.");
  }

  async function togglePhoto(photo: Photo) {
    await run(async () => {
      const supabase = createClient();
      if (!photo.is_published) await checkPhotoFiles(supabase, photo);
      const { error } = await supabase.from("photos").update({ is_published: !photo.is_published,
        ...(photo.is_published ? { is_cover: false } : {}),
      }).eq("id", photo.id).select("id").single();
      if (error) throw new Error("Couldn’t change the picture visibility.");
    }, photo.is_published ? "Picture hidden from visitors." : "Picture will be visible when the album is published.");
  }

  async function setCover(photo: Photo) {
    await run(async () => {
      const supabase = createClient();
      await checkPhotoFiles(supabase, photo);
      const cleared = await supabase.from("photos").update({ is_cover: false }).eq("album_id", album.id).eq("is_cover", true);
      if (cleared.error) throw new Error("Couldn’t change the album cover.");
      const selected = await supabase.from("photos").update({ is_cover: true }).eq("id", photo.id).select("id").single();
      if (selected.error) throw new Error("Couldn’t select the cover. Refresh and choose it again.");
    }, "Album cover updated.");
  }

  async function removePhoto(photo: Photo) {
    if (!window.confirm(`Permanently delete “${photo.original_filename}” and its original download?`)) return;
    await run(() => deletePhoto(createClient(), photo), "Picture deleted.");
  }

  async function download(photo: Photo) {
    await run(async () => {
      const { data, error } = await createClient().storage.from(ORIGINALS_BUCKET)
        .createSignedUrl(photo.original_path, 60, { download: photo.original_filename.replace(/[\\/\r\n]/g, "_") });
      if (error || !data) throw new Error("Couldn’t prepare the download. Please try again.");
      const link = document.createElement("a");
      link.href = data.signedUrl; link.download = photo.original_filename;
      document.body.appendChild(link); link.click(); link.remove();
    }, "Download requested.", false);
  }

  async function deleteAlbum() {
    if (!window.confirm("Permanently delete this empty album?")) return;
    setBusy(true); setError("");
    try {
      const { error } = await createClient().from("albums").delete().eq("id", album.id).select("id").single();
      if (error) throw error;
      window.location.assign("/admin");
    } catch {
      setError("Couldn’t delete the album. Remove all of its pictures first, then try again.");
      setBusy(false);
    }
  }

  return (
    <>
      <StaffHeader email={email} disabled={busy} />
      <Link href="/admin" onClick={(event) => { if (busy) event.preventDefault(); }} className="text-sm font-semibold text-primary hover:underline">← All albums</Link>
      <div className="mt-5 flex flex-wrap items-start justify-between gap-5">
        <div><span className={`rounded-full px-3 py-1 text-xs font-bold ${album.is_published ? "bg-green-50 text-green-800" : "bg-gold-soft text-accent"}`}>{album.is_published ? "Published" : "Draft album"}</span><h1 className="mt-3 break-words text-3xl sm:text-4xl">{album.title}</h1><p className="mt-2 text-muted-foreground">{total} picture{total === 1 ? "" : "s"}</p></div>
        <div className="flex flex-wrap gap-2">
          <button onClick={toggleAlbum} disabled={busy} className={`${button} ${album.is_published ? "" : "border-primary bg-primary text-white hover:bg-primary-hover"}`}>{album.is_published ? "Unpublish album" : "Publish album"}</button>
          {total === 0 && <button onClick={deleteAlbum} disabled={busy} className={`${button} text-red-800`}>Delete empty album</button>}
        </div>
      </div>
      <form onSubmit={saveAlbum} className="mt-7 rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <div className="grid gap-5 sm:grid-cols-[2fr_1fr]">
          <label className="text-sm font-semibold">Album name<input name="title" defaultValue={album.title} required maxLength={160} disabled={busy} className={input} /></label>
          <label className="text-sm font-semibold">Event date<input type="date" name="date" defaultValue={album.event_date} required disabled={busy} className={input} /></label>
        </div>
        <label className="mt-4 block text-sm font-semibold">Description<textarea name="description" defaultValue={album.description} maxLength={2000} rows={2} disabled={busy} className={`${input} py-3`} /></label>
        <button disabled={busy} className={`${button} mt-4`}>Save album details</button>
      </form>
      <div className="mt-6 rounded-2xl border border-dashed border-primary/50 bg-purple-soft p-6">
        <h2 className="text-xl">Add pictures</h2>
        <p className="mt-2 text-sm text-muted-foreground">Choose up to 20 JPG, PNG, or WebP pictures at a time, up to 50 MB each. We’ll keep the originals for downloads and make smaller browsing previews.</p>
        <p className="mt-2 text-sm font-semibold">{album.is_published ? "This album is published. Completed uploads will become visible to visitors." : "These pictures stay private until you publish the album."}</p>
        <label className="mt-4 block text-sm font-semibold">Choose pictures
          <input type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={upload} disabled={busy} className="mt-2 block w-full text-sm file:mr-4 file:min-h-11 file:rounded-full file:border-0 file:bg-primary file:px-5 file:font-semibold file:text-white disabled:opacity-50" />
        </label>
        {progress && <div role="status" className="mt-5"><p className="break-all text-sm">Uploading {progress.done} of {progress.total}: {progress.name}</p><progress max={progress.total} value={progress.done} className="mt-2 h-3 w-full accent-primary" /><p className="mt-1 text-xs">Keep this page open until the uploads finish.</p></div>}
      </div>
      {error && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-red-800">{error}</p>}
      {message && <p role="status" className="mt-5 rounded-xl bg-green-50 p-4 text-green-900">{message}</p>}
      {failures.length > 0 && <div role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-800"><p className="font-bold">Some pictures need attention:</p><ul className="mt-2 list-disc space-y-2 pl-5">{failures.map((failure, index) => <li key={index} className="break-words">{failure}</li>)}</ul></div>}
      <div className="mb-5 mt-10 flex flex-wrap items-center justify-between gap-3"><h2 className="text-2xl">Pictures</h2><button disabled={busy} onClick={() => { void run(async () => { setPreviewRevision((value) => value + 1); }, "Pictures refreshed."); }} className={button}>Refresh pictures</button></div>
      {!photos.length ? <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">Your uploaded pictures will appear here.</div> : <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo) => <PhotoCard key={photo.id} photo={photo} previewUrl={urls[photo.preview_path]} disabled={busy} onSave={savePhoto} onVisibility={togglePhoto} onCover={setCover} onDelete={removePhoto} onDownload={download} />)}
      </div>}
      {photos.length < total && <button disabled={busy} onClick={() => { void run(() => refresh(photos.length + 24), "More pictures loaded.", false); }} className={`${button} mt-6`}>Load more pictures ({photos.length} of {total})</button>}
    </>
  );
}
