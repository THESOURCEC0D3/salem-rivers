"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createClient } from "@/app/lib/supabase/client";
import type { Album } from "@/app/types/media";

const input = "mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-4";

export function AlbumList({ initialAlbums }: { initialAlbums: Album[] }) {
  const [albums, setAlbums] = useState(initialAlbums);
  const [more, setMore] = useState(initialAlbums.length === 24);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function createAlbum(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    if (!title) return;
    setBusy(true);
    setError("");
    const id = crypto.randomUUID();
    const slug = title.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70).replace(/-$/, "") || "album";
    try {
      const { error } = await createClient().from("albums").insert({
        id, title, slug: `${slug}-${id.slice(0, 8)}`,
        event_date: String(form.get("date")),
        description: String(form.get("description") ?? "").trim(),
      });
      if (error) throw error;
      window.location.assign(`/admin/albums/${id}`);
    } catch {
      setError("Couldn’t create the album. Check your connection and refresh the list before trying again.");
      setBusy(false);
    }
  }

  async function loadMore() {
    setBusy(true);
    setError("");
    try {
      const { data, error } = await createClient().from("albums").select("*")
        .order("event_date", { ascending: false }).order("id").range(albums.length, albums.length + 23);
      if (error) throw error;
      setAlbums((current) => [...current, ...(data as Album[])]);
      setMore(data.length === 24);
    } catch { setError("Couldn’t load more albums. Please try again."); }
    finally { setBusy(false); }
  }

  return (
    <>
      <h1 className="text-3xl sm:text-4xl">Your photo albums</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Gather the moments, choose the pictures, and publish when you’re ready.</p>
      {error && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-red-800">{error}</p>}
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[340px_1fr]">
        <form onSubmit={createAlbum} className="space-y-5 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-xl">Create an album</h2>
          <label className="block text-sm font-semibold">Album name<input name="title" maxLength={160} required disabled={busy} placeholder="Sunday Thanksgiving Service" className={input} /></label>
          <label className="block text-sm font-semibold">Event date<input name="date" type="date" required disabled={busy} className={input} /></label>
          <label className="block text-sm font-semibold">Description <span className="font-normal text-muted-foreground">(optional)</span><textarea name="description" maxLength={2000} rows={3} disabled={busy} className={`${input} py-3`} /></label>
          <button disabled={busy} className="min-h-12 w-full rounded-full bg-primary px-5 font-semibold text-white hover:bg-primary-hover disabled:opacity-60">{busy ? "Please wait…" : "Create draft album"}</button>
          <p className="text-xs text-muted-foreground">Draft albums are visible only to the media team.</p>
        </form>
        <div>
          {albums.length === 0 ? <div className="rounded-2xl border border-dashed border-border bg-gold-wash-1 p-10 text-center"><h2 className="text-2xl">Your first album starts here</h2><p className="mt-3 text-muted-foreground">Create an album, then add your pictures.</p></div> :
            <div className="grid gap-4 sm:grid-cols-2">
              {albums.map((album) => <Link key={album.id} href={`/admin/albums/${album.id}`} className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-primary">
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${album.is_published ? "bg-green-50 text-green-800" : "bg-gold-soft text-accent"}`}>{album.is_published ? "Published" : "Draft"}</span>
                <h2 className="mt-4 break-words text-xl">{album.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{new Date(`${album.event_date}T12:00:00`).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}</p>
                <p className="mt-5 text-sm font-semibold text-primary">Manage pictures →</p>
              </Link>)}
            </div>}
          {more && <button onClick={loadMore} disabled={busy} className="mt-6 min-h-11 rounded-full border border-border px-6 font-semibold disabled:opacity-60">{busy ? "Loading…" : "Load more albums"}</button>}
        </div>
      </div>
    </>
  );
}
