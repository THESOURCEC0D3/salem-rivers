import WatchPageClient from "./WatchPageClient";
import {
  getAllSermons,
  getFeaturedSermon,
} from "@/app/lib/sermonService";

/**
 * Rebuild at most every 5 minutes. A backstop only: dashboard saves refresh this
 * page immediately (see app/admin/videos/actions.ts).
 */
export const revalidate = 300;

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