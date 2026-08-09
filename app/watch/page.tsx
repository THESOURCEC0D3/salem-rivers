import WatchPageClient from "./WatchPageClient";
import {
  getAllSermons,
  getFeaturedSermon,
} from "@/app/lib/sermonService";

export default async function WatchPage() {
  const sermons = await getAllSermons();
  const featuredSermon = await getFeaturedSermon();

  if (!featuredSermon) {
    return null;
  }

  const previousSermons = sermons.filter(
    (sermon) => sermon.id !== featuredSermon.id
  );

  return (
    <WatchPageClient
      featuredSermon={featuredSermon}
      previousSermons={previousSermons}
    />
  );
}