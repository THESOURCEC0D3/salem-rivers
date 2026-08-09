import { sermons } from "@/app/data/sermons";

export async function getFeaturedSermon() {
  const live = sermons.find((sermon) => sermon.status === "live");

  if (live) return live;

  const latest = sermons.find((sermon) => sermon.status === "latest");

  if (latest) return latest;

  return sermons[0];
}

export async function getAllSermons() {
  return sermons;
}