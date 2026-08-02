"use client";
import { useState } from "react";
import Image from "next/image";

interface FeaturedVideoPlayerProps {
  youtubeId: string;
  thumbnail?: string;
  title: string;
}

export default function FeaturedVideoPlayer({
  youtubeId,
  thumbnail,
  title,
}: FeaturedVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

 const embedUrl = `https://www.youtube.com/embed/${youtubeId}`;

const thumbnailUrl =
  thumbnail ??
  `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  if (!embedUrl) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl bg-gray-200">
        <p className="text-gray-500">Unable to load sermon.</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
      {!isPlaying ? (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="group relative h-full w-full"
        >
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            unoptimized
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 transition group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 h-10 w-10 text-red-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </button>
      ) : (
 <iframe
  className="absolute inset-0 h-full w-full"
  src={`${embedUrl}?autoplay=1`}
  title={title}
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
/>
      )}
    </div>
  );
}