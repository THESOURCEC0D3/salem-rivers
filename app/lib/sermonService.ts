import { cache } from "react";
import { sermons as fileSermons } from "@/app/data/sermons";
import type { SermonRow } from "@/app/types/sermon";
import { createPublicClient } from "./supabase/public";
import { mergeSermons, pickFeatured, rowToSermon } from "./sermon-merge";

/**
 * Published dashboard sermons, or [] if Supabase can't be reached (e.g. a
 * paused free project). The homepage must never break because of this: on
 * failure the site quietly falls back to the sermons in the file.
 */
async function getDashboardSermons() {
  try {
    const { data, error } = await createPublicClient()
      .from("sermons").select("*").eq("is_published", true)
      .order("sermon_date", { ascending: false }).order("created_at", { ascending: false });
    if (error) throw error;
    return (data as SermonRow[]).map(rowToSermon);
  } catch (cause) {
    console.error("Sermons: Supabase unavailable, showing file sermons only.", cause);
    return [];
  }
}

/** `cache`: the Watch page asks for both lists; this makes it one database call. */
export const getAllSermons = cache(async () =>
  mergeSermons(await getDashboardSermons(), fileSermons));

export async function getFeaturedSermon() {
  return pickFeatured(await getAllSermons());
}
