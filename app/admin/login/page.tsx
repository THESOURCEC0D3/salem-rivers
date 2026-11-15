import { redirect } from "next/navigation";
import { getMediaStaff } from "@/app/lib/supabase/staff";
import { LoginForm } from "./LoginForm";

export default async function LoginPage() {
  if (await getMediaStaff()) redirect("/admin");
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-border bg-surface p-7 shadow-sm sm:p-10">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Salem media team</p>
      <h1 className="mt-3 text-3xl">Welcome back</h1>
      <p className="mt-3 text-muted-foreground">Sign in to organise albums and share moments from church life.</p>
      <LoginForm />
    </div>
  );
}
