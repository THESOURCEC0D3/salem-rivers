"use client";

import { useEffect, useState } from "react";


import { Sermon } from "@/app/types/sermon";
import WatchHero from "@/app/components/media/WatchHero";
import FeaturedSermon from "@/app/components/media/FeaturedSermon";
import PreviousSermons from "@/app/components/media/PreviousSermons";

interface WatchPageClientProps {
  featuredSermon: Sermon;
  previousSermons: Sermon[];
}

export default function WatchPageClient({
  featuredSermon,
  previousSermons,
}: WatchPageClientProps) {
  const [selectedSermon, setSelectedSermon] =
    useState<Sermon>(featuredSermon);

   useEffect(() => {
  if (selectedSermon.id === featuredSermon.id) {
    return;
  }

  const featuredSection = document.getElementById("featured-sermon");

  if (featuredSection) {
    featuredSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}, [selectedSermon, featuredSermon.id]);

  return (
    <main>
      <WatchHero />

      <FeaturedSermon sermon={selectedSermon} />

      <PreviousSermons
        sermons={previousSermons}
        onSelect={setSelectedSermon}
      />
    </main>
  );
}