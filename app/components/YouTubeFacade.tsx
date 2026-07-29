"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { PlayIcon } from "./icons";

/**
 * Lite YouTube embed (facade pattern, doc §6).
 *
 * WHY THIS EXISTS: a plain <iframe> pulls ~0.5–1.2 MB of YouTube player code on
 * every page load, whether or not anyone presses play. This renders a poster
 * image instead and only swaps in the real iframe on tap — so the ~95% who never
 * watch pay nothing. That is the difference between a fast and a slow homepage
 * on the cheap Androids and patchy data this site is built for.
 *
 * Also uses youtube-nocookie.com, so YouTube sets no tracking cookies until the
 * visitor actually chooses to watch.
 *
 * States:
 *   youtubeId = null  → labelled placeholder, button disabled (nothing to load)
 *   youtubeId set     → poster + play button; tap swaps in the autoplaying iframe
 */
export function YouTubeFacade({
  youtubeId,
  label,
  title,
  poster,
  sizes = "(max-width: 1024px) 100vw, 36rem",
  className = "rounded-3xl shadow-lg",
}: {
  /** The 11-character YouTube video ID — NOT the full URL. */
  youtubeId: string | null;
  /** Placeholder caption shown while there is no video yet. */
  label: string;
  /** Accessible name for the player and the play button. */
  title: string;
  /** Poster still. Statically imported so it gets WebP + blur-up. */
  poster?: StaticImageData;
  sizes?: string;
  /** Shape/elevation comes from the caller so this fits inside a card or stands alone. */
  className?: string;
}) {
  const [active, setActive] = useState(false);
  const ready = Boolean(youtubeId);

  if (active && youtubeId) {
    return (
      <div
        className={`relative aspect-video w-full overflow-hidden bg-black ${className}`}
      >
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => ready && setActive(true)}
      disabled={!ready}
      aria-label={ready ? `Play: ${title}` : `${title} — coming soon`}
      className={`group relative block aspect-video w-full cursor-pointer overflow-hidden focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-default ${
        poster ? "bg-black" : "photo-ph"
      } ${className}`}
    >
      {/* Poster. alt="" because the button already carries the accessible name. */}
      {poster && (
        <Image
          src={poster}
          alt=""
          fill
          placeholder="blur"
          sizes={sizes}
          className="object-cover transition-transform duration-300 group-enabled:group-hover:scale-[1.02]"
        />
      )}

      <span className="absolute inset-0 grid place-items-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-primary shadow-lg transition-transform duration-200 group-enabled:group-hover:scale-105 sm:h-20 sm:w-20">
          <PlayIcon size={28} className="translate-x-0.5 sm:h-8 sm:w-8" />
        </span>
      </span>

      {/* Only label the panel while it is standing in for a real still. */}
      {!ready && (
        <span className="absolute inset-x-0 bottom-4 mx-auto w-fit max-w-[90%] rounded-full bg-black/35 px-3 py-1.5 text-center text-xs font-medium text-white/90 backdrop-blur-sm">
          Placeholder · {label}
        </span>
      )}
    </button>
  );
}
