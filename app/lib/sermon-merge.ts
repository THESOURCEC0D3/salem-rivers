import type { Sermon, SermonRow } from "../types/sermon";

/** Database row → the shape every sermon component already uses. */
export function rowToSermon(row: SermonRow): Sermon {
  return {
    id: row.id,
    title: row.title,
    speaker: row.speaker,
    description: row.description,
    youtubeId: row.youtube_id,
    thumbnail: row.thumbnail_url ?? undefined,
    date: row.sermon_date,
    duration: row.duration,
    status: row.status,
    platform: "youtube",
  };
}

/**
 * Combine dashboard sermons with the ones still kept in app/data/sermons.ts.
 *
 * Two rules keep the two sources from fighting:
 * 1. The same YouTube video in both → the dashboard copy wins (no duplicates).
 * 2. Once ANY dashboard sermon is live or latest, the dashboard decides what is
 *    featured: file sermons marked live/latest are shown as previous. Otherwise
 *    a stale "live" in the file would outrank every new dashboard video.
 *    With nothing featured in the dashboard, the file behaves exactly as before.
 *
 * Newest first. The sort is stable, so same-day sermons keep dashboard-first,
 * then file order.
 */
export function mergeSermons(dashboard: Sermon[], file: Sermon[]): Sermon[] {
  const dashboardIds = new Set(dashboard.map((sermon) => sermon.youtubeId));
  const dashboardFeatures = dashboard.some((sermon) => sermon.status !== "previous");
  const fromFile = file
    .filter((sermon) => !dashboardIds.has(sermon.youtubeId))
    .map((sermon) =>
      dashboardFeatures && sermon.status !== "previous" ? { ...sermon, status: "previous" as const } : sermon);
  return [...dashboard, ...fromFile].sort((a, b) => b.date.localeCompare(a.date));
}

/** Live beats latest beats newest. */
export function pickFeatured(sermons: Sermon[]): Sermon {
  return sermons.find((s) => s.status === "live")
    ?? sermons.find((s) => s.status === "latest")
    ?? sermons[0];
}
