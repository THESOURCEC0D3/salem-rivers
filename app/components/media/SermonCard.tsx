import Image from "next/image";
import { Sermon } from "@/app/types/sermon";
import { getYouTubeThumbnailFromId } from "../../lib/youtube";

interface SermonCardProps {
  sermon: Sermon;
  onSelect: (sermon: Sermon) => void;
}

export default function SermonCard({
  sermon,
  onSelect,
}: SermonCardProps) {
 const thumbnailUrl = getYouTubeThumbnailFromId(
  sermon.youtubeId,
  sermon.thumbnail
);

  return (
    <button
  type="button"
  onClick={() => onSelect(sermon)}
  className="block w-full overflow-hidden rounded-2xl bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
>
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-gray-200">
        <Image
          src={thumbnailUrl}
          alt={sermon.title}
          fill
          unoptimized
          className="object-cover transition duration-500 hover:scale-105"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Play icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 h-7 w-7 text-red-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Information */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">
          {sermon.title}
        </h3>

        <p className="mt-2 font-medium text-gray-700">
          {sermon.speaker}
        </p>

        <p className="mt-2 text-sm text-gray-500">
          {sermon.date}
          {sermon.duration && ` • ${sermon.duration}`}
        </p>

        <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
          {sermon.description}
        </p>
      </div>
   </button>
  );
}