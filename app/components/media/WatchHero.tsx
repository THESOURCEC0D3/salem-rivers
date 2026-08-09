import Link from "next/link";

export default function WatchHero() {
  return (
    <section className="relative overflow-hidden bg-gray-950 py-28 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-400">
            Watch & Grow
          </p>

          <h1 className="mt-5 text-5xl font-bold leading-tight md:text-6xl">
            Experience the Word. Grow in Faith.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Watch messages from Foundation Faith Church and stay connected
            with God's Word wherever you are.
          </p>

          <Link
            href="#sermons"
            className="mt-8 inline-flex rounded-full bg-red-600 px-7 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Browse Sermons
          </Link>
        </div>
      </div>
    </section>
  );
}