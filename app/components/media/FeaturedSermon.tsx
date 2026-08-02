import Link from "next/link";
import { getFeaturedSermon } from "@/app/lib/sermonService";
import FeaturedVideoPlayer from "./FeaturedVideoPlayer";

export default async function FeaturedSermon() {
  const sermon = await getFeaturedSermon();

  if (!sermon) return null;

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Heading */}
        <div className="mb-14 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">
            Featured Message
          </span>

          <h2 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Watch Our Latest Sermon
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Be encouraged by God's Word through our latest teaching and stay
            connected wherever you are.
          </p>
        </div>

        {/* Main Card */}
        <div className="grid items-center gap-12 rounded-3xl bg-white p-8 shadow-xl lg:grid-cols-2">

          {/* Video */}
<FeaturedVideoPlayer
  youtubeId={sermon.youtubeId}
  thumbnail={sermon.thumbnail}
  title={sermon.title}
/>

          {/* Content */}
          <div>

            {sermon.status === "live" && (
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
                <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
                LIVE NOW
              </div>
            )}

            <h3 className="text-4xl font-bold text-gray-900">
              {sermon.title}
            </h3>

            <p className="mt-4 text-lg font-medium text-gray-700">
              {sermon.speaker}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              {sermon.date} • {sermon.duration}
            </p>

            <p className="mt-8 leading-8 text-gray-600">
              {sermon.description}
            </p>

            <Link
              href="/watch"
              className="mt-10 inline-flex items-center rounded-full border border-gray-300 px-6 py-3 font-semibold transition hover:bg-gray-100"
            >
              Browse All Sermons →
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}