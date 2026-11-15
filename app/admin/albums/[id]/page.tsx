import { notFound } from "next/navigation";
import { requireMediaStaff } from "@/app/lib/supabase/staff";
import type { Album, Photo } from "@/app/types/media";
import { AlbumManager } from "./AlbumManager";

export default async function AlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) notFound();
  const { supabase, user } = await requireMediaStaff();
  const { data: album, error } = await supabase.from("albums").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error("Unable to load this album.");
  if (!album) notFound();
  const photos = await supabase.from("photos").select("*", { count: "exact" })
    .eq("album_id", id).order("sort_order").order("id").range(0, 23);
  if (photos.error) throw new Error("Unable to load the album pictures.");
  return <AlbumManager initialAlbum={album as Album} initialPhotos={photos.data as Photo[]} initialCount={photos.count ?? 0} email={user.email} />;
}
