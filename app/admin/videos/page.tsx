import { requireMediaStaff } from "@/app/lib/supabase/staff";
import type { SermonRow } from "@/app/types/sermon";
import { StaffHeader } from "../StaffHeader";
import { VideoManager } from "./VideoManager";

export default async function VideosPage() {
  const { supabase, user } = await requireMediaStaff();
  // Staff can read drafts too (row-level security), so this lists everything.
  const { data, error } = await supabase.from("sermons").select("*")
    .order("sermon_date", { ascending: false }).order("created_at", { ascending: false }).limit(200);
  if (error) throw new Error("Unable to load videos.");
  return <><StaffHeader email={user.email} /><VideoManager initialVideos={data as SermonRow[]} /></>;
}
