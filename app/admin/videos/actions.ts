"use server";

import { revalidatePath } from "next/cache";
import { getMediaStaff } from "@/app/lib/supabase/staff";

/**
 * Called by the dashboard after every successful save. The homepage and Watch
 * page are pre-built for speed; this tells Next.js to rebuild them on their
 * next visit so the change shows within seconds instead of the 5-minute backstop.
 *
 * The staff check matters: server actions are public endpoints, and without it
 * anyone could repeatedly force the pages to rebuild.
 */
export async function refreshSermonPages() {
  if (!(await getMediaStaff())) throw new Error("Not authorised.");
  revalidatePath("/");
  revalidatePath("/watch");
}
