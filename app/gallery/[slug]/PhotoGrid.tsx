"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPublicClient } from "@/app/lib/supabase/public";
import { ORIGINALS_BUCKET } from "@/app/lib/media-upload";
import type { GalleryPhoto } from "@/app/lib/gallery";

/**
 * Which tile shape a photo gets. A repeating rhythm (every 7th photo is a
 * 2×2 feature) keeps the grid varied but deliberate; orientation decides the
 * rest, so portraits get tall tiles and wide shots get wide ones and neither
 * is cropped into the wrong shape.
 */
type Tile = { cols: number; rows: number; lgWide: boolean; mobileWide: boolean };

function bentoLayout(photos: GalleryPhoto[]): string[] {
  const tiles: Tile[] = photos.map((photo, i) => {
    const base = { lgWide: false, mobileWide: false };
    // A 2×2 tile needs ~4 photos after it to back-fill around it; near the end
    // of an album it would leave an empty block beside it instead.
    if (i % 7 === 0 && photos.length - i > 4) return { ...base, cols: 2, rows: 2 };
    const ratio = photo.width / photo.height;
    if (ratio < 0.85) return { ...base, cols: 1, rows: 2 };
    if (ratio > 1.4 && i % 3 === 1) return { ...base, cols: 2, rows: 1 };
    return { ...base, cols: 1, rows: 1 };
  });

  // Close off the last row: if the cells don't divide evenly into rows, widen
  // small tiles from the end (desktop only) until they do. Each widening adds
  // one cell. Mobile is fixed separately so its 2-column layout is untouched.
  const cells = (cols: number) => tiles.reduce((sum, t) => sum + Math.min(t.cols, cols) * t.rows, 0);
  let lgGap = (4 - (cells(4) % 4)) % 4;
  for (let i = tiles.length - 1; i >= 0 && lgGap > 0; i--) {
    if (tiles[i].cols === 1 && tiles[i].rows === 1) { tiles[i].lgWide = true; lgGap--; }
  }
  if (cells(2) % 2 !== 0) {
    const last = tiles.findLastIndex((t) => t.cols === 1 && t.rows === 1);
    if (last >= 0) tiles[last].mobileWide = true;
  }

  return tiles.map((t) => [
    t.cols === 2 || t.mobileWide ? "col-span-2" : "",
    t.mobileWide && t.cols === 1 ? (t.lgWide ? "" : "lg:col-span-1") : "",
    t.lgWide && t.cols === 1 ? "lg:col-span-2" : "",
    t.rows === 2 ? "row-span-2" : "",
  ].filter(Boolean).join(" "));
}

export function PhotoGrid({ photos }: { photos: GalleryPhoto[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const current = index === null ? null : photos[index];
  const spans = useMemo(() => bentoLayout(photos), [photos]);

  const open = (i: number) => { setIndex(i); setError(""); dialogRef.current?.showModal(); };
  const close = () => dialogRef.current?.close();
  const step = useCallback((delta: number) => {
    setError("");
    setIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length));
  }, [photos.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  async function download(photo: GalleryPhoto) {
    setDownloading(true);
    setError("");
    try {
      // Signed only on click, for 60s, so original links aren't sitting in the page.
      const { data, error: signError } = await createPublicClient().storage
        .from(ORIGINALS_BUCKET)
        .createSignedUrl(photo.original_path, 60, { download: photo.original_filename.replace(/[\\/\r\n]/g, "_") });
      if (signError || !data) throw signError;
      window.location.assign(data.signedUrl);
    } catch {
      setError("This photo couldn’t be downloaded. Refresh the page and try again.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <>
      {/*
        Bento grid: fixed-height rows, with some tiles spanning two columns or
        rows. grid-flow-dense back-fills holes left by big tiles, so the grid
        stays solid at any photo count. Tiles crop (object-cover); the lightbox
        shows the full, uncropped photo.
      */}
      <ul className="grid grid-flow-dense auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 lg:grid-cols-4">
        {photos.map((photo, i) => (
          <li key={photo.id} className={`${spans[i]} group relative overflow-hidden rounded-2xl bg-muted`}>
            <button
              type="button"
              onClick={() => open(i)}
              className="absolute inset-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
              aria-label={`View photo: ${photo.alt_text}`}
            >
              {photo.previewUrl ? (
                <Image
                  src={photo.previewUrl}
                  alt={photo.alt_text}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              ) : (
                <span className="grid h-full place-items-center p-6 text-sm text-muted-foreground">Preview unavailable</span>
              )}
              {/* Soft vignette on hover: depth without covering the photo. */}
              <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          </li>
        ))}
      </ul>

      {/* Native <dialog>: focus trapping, Escape-to-close and the backdrop come free. */}
      <dialog
        ref={dialogRef}
        onClose={() => setIndex(null)}
        onClick={(event) => { if (event.target === dialogRef.current) close(); }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-black/95 p-0 text-white backdrop:bg-black/80"
      >
        {current && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-3 p-4 text-sm">
              <span className="text-white/70">{(index ?? 0) + 1} / {photos.length}</span>
              <div className="flex gap-2">
                <button type="button" onClick={() => download(current)} disabled={downloading} className="min-h-11 rounded-full border border-white/30 px-5 font-semibold hover:bg-white/10 disabled:opacity-60">
                  {downloading ? "Preparing…" : "Download"}
                </button>
                <button type="button" onClick={close} className="min-h-11 rounded-full border border-white/30 px-5 font-semibold hover:bg-white/10">Close</button>
              </div>
            </div>
            <div className="relative min-h-0 flex-1" onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
              {current.previewUrl && (
                <Image src={current.previewUrl} alt={current.alt_text} fill unoptimized sizes="100vw" className="object-contain" />
              )}
              {photos.length > 1 && (
                <>
                  <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-2xl hover:bg-black/70">‹</button>
                  <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute right-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-2xl hover:bg-black/70">›</button>
                </>
              )}
            </div>
            <div className="min-h-14 p-4 text-center text-sm">
              {error ? <p role="alert" className="text-red-300">{error}</p> : current.caption && <p className="text-white/80">{current.caption}</p>}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
