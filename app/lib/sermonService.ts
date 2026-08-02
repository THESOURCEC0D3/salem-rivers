import { sermons } from "@/app/data/sermons";

export async function getFeaturedSermon() {
  const live = sermons.find((sermon) => sermon.status === "live");

  if (live) return live;

  return sermons.find((sermon) => sermon.status === "latest");
}

export async function getAllSermons() {
  return sermons;
}