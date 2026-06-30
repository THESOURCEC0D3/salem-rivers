"use client";

import { useState } from "react";
import { PlayIcon } from "./icons";

/**
 * Lite YouTube embed (facade pattern, doc §6). Shows a lightweight thumbnail and
 * only loads the real (heavy) iframe when the user taps play — critical for cheap
 * Androids on patchy data. Reusable on the Watch page later.
 *
 * When `youtubeId` is null, it renders a labelled placeholder (nothing to load yet).
 */
export function YouTubeFacade({
  youtubeId,
  label,
}: {
  youtubeId: string | null;
  label: string;
}) {
  const [active, setActive] = useState(false);
  const ready = Boolean(youtubeId);

  if (active && youtubeId) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-black shadow-lg">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title="Welcome to Salem Rivers"
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
      aria-label={ready ? "Play the welcome video" : "Welcome video coming soon"}
      className="photo-ph group relative block aspect-video w-full cursor-pointer overflow-hidden rounded-3xl shadow-lg focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-default"
    >
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-white/90 text-primary shadow-lg transition-transform duration-200 group-enabled:group-hover:scale-105">
          <PlayIcon size={32} className="translate-x-0.5" />
        </span>
      </span>
      <span className="absolute inset-x-0 bottom-4 mx-auto w-fit max-w-[90%] rounded-full bg-black/35 px-3 py-1.5 text-center text-xs font-medium text-white/90 backdrop-blur-sm">
        {ready ? "Watch our 60-second welcome" : `Placeholder · ${label}`}
      </span>
    </button>
  );
}
