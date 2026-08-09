import { Sermon } from "@/app/types/sermon";
import SermonCard from "./SermonCard";

interface PreviousSermonsProps {
  sermons: Sermon[];
  onSelect: (sermon: Sermon) => void;
}

export default function PreviousSermons({
  sermons,
  onSelect,
}: PreviousSermonsProps) {
  return (
    <section id="sermons" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section heading */}
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">
            Sermon Library
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            Previous Sermons
          </h2>

          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Catch up on messages from our previous services and continue
            growing in the Word.
          </p>
        </div>

        {/* Sermon grid */}
        {sermons.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <p className="text-gray-500">
              Previous sermons will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sermons.map((sermon) => (
             <SermonCard
  key={sermon.id}
  sermon={sermon}
  onSelect={onSelect}
/>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}