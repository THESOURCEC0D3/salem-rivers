import { requireMediaStaff } from "@/app/lib/supabase/staff";
import type { Album } from "@/app/types/media";
import { StaffHeader } from "./StaffHeader";
import { AlbumList } from "./AlbumList";

export default async function AdminPage() {
  const { supabase, user } = await requireMediaStaff();
  const { data, error } = await supabase.from("albums").select("*")
    .order("event_date", { ascending: false }).order("id").range(0, 23);
  if (error) throw new Error("Unable to load albums.");
  return <><StaffHeader email={user.email} /><AlbumList initialAlbums={data as Album[]} /></>;
}
