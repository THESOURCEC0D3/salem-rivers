import { redirect } from "next/navigation";
import { createClient } from "./server";

export async function getMediaStaff() {
  const supabase = await createClient();
  // Verify with Auth; do not trust a user object read directly from a cookie.
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;

  const { data: membership, error: membershipError } = await supabase
    .from("media_admins").select("user_id").eq("user_id", user.id).maybeSingle();
  if (membershipError) throw new Error("Unable to check staff access. Please try again.");
  if (!membership) return null;
  return { supabase, user };
}

export async function requireMediaStaff() {
  const staff = await getMediaStaff();
  if (!staff) redirect("/admin/login");
  return staff;
}
