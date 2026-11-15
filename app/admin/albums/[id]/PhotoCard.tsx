"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import type { Photo } from "@/app/types/media";

export function PhotoCard({ photo, previewUrl, disabled, onSave, onVisibility, onCover, onDelete, onDownload }: {
  photo: Photo;
  previewUrl?: string;
  disabled: boolean;
  onSave: (photo: Photo, caption: string, altText: string, order: number) => Promise<void>;
  onVisibility: (photo: Photo) => void;
  onCover: (photo: Photo) => void;
  onDelete: (photo: Photo) => void;
  onDownload: (photo: Photo) => void;
}) {
  const [caption, setCaption] = useState(photo.caption);
  const [altText, setAltText] = useState(photo.alt_text);
  const [order, setOrder] = useState(photo.sort_order);
  async function save(event: FormEvent) {
    event.preventDefault();
    await onSave(photo, caption.trim(), altText.trim(), order);
  }
  const button = "min-h-11 rounded-lg border border-border px-3 py-2 text-sm font-semibold hover:bg-muted disabled:opacity-50";
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="relative aspect-[4/3] bg-muted">
        {previewUrl ? <Image src={previewUrl} alt={photo.alt_text} fill unoptimized sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain" /> : <p className="grid h-full place-items-center p-6 text-center text-sm text-muted-foreground">Preview unavailable. Use Refresh pictures to try again.</p>}
        {photo.is_cover && <span className="absolute left-3 top-3 rounded-full bg-surface px-3 py-1 text-xs font-bold shadow-sm">Album cover</span>}
      </div>
      <div className="space-y-4 p-4">
        <p className="break-all text-sm font-semibold">{photo.original_filename}</p>
        <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${photo.is_published ? "bg-green-50 text-green-800" : "bg-gold-soft text-accent"}`}>{photo.is_published ? "Visible when album is published" : "Hidden from visitors"}</span>
        <form onSubmit={save} className="space-y-3">
          <label className="block text-xs font-semibold">Picture description
            <input aria-label={`Description for ${photo.original_filename}`} value={altText} onChange={(event) => setAltText(event.target.value)} required maxLength={500} disabled={disabled} className="mt-1 min-h-11 w-full rounded-lg border border-border px-3 text-sm" />
          </label>
          <label className="block text-xs font-semibold">Caption (optional)
            <textarea value={caption} onChange={(event) => setCaption(event.target.value)} maxLength={1000} rows={2} disabled={disabled} className="mt-1 w-full rounded-lg border border-border p-3 text-sm" />
          </label>
          <label className="block text-xs font-semibold">Display order
            <input type="number" min={0} max={2147483647} step={1} value={order} onChange={(event) => setOrder(Number(event.target.value))} disabled={disabled} required className="mt-1 min-h-11 w-full rounded-lg border border-border px-3 text-sm" />
          </label>
          <button disabled={disabled} className={`${button} w-full`}>Save picture details</button>
        </form>
        <div className="flex flex-wrap gap-2">
          <button disabled={disabled} onClick={() => onVisibility(photo)} className={button}>{photo.is_published ? "Hide picture" : "Make visible"}</button>
          <button disabled={disabled || photo.is_cover || !photo.is_published} onClick={() => onCover(photo)} className={button}>Use as cover</button>
          <button disabled={disabled} onClick={() => onDownload(photo)} className={button}>Download original</button>
          <button disabled={disabled} onClick={() => onDelete(photo)} className={`${button} text-red-800`}>Delete</button>
        </div>
      </div>
    </article>
  );
}
