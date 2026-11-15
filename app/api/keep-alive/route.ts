import { createPublicClient } from "@/app/lib/supabase/public";

/**
 * Hit once a day by Vercel Cron (vercel.json). Supabase's free plan pauses a
 * project after a week without database activity; a real query here counts as
 * activity. The homepage alone may not, because it is served from cache.
 *
 * If CRON_SECRET is set in Vercel, only Vercel's scheduler can trigger this.
 * Vercel sends it as a Bearer token automatically.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { error } = await createPublicClient().from("sermons").select("id").limit(1);
  // A 503 shows up as a failed run in Vercel's Cron logs: an early pause warning.
  if (error) return Response.json({ ok: false }, { status: 503 });
  return Response.json({ ok: true });
}
