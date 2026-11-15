"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/app/lib/supabase/client";

export function LoginForm() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: String(form.get("email") ?? "").trim(),
        password: String(form.get("password") ?? ""),
      });
      if (authError || !data.user) {
        setError("We couldn’t sign you in. Check your email and password, then try again.");
        return;
      }
      const { data: staff, error: accessError } = await supabase.from("media_admins")
        .select("user_id").eq("user_id", data.user.id).maybeSingle();
      if (accessError || !staff) {
        await supabase.auth.signOut({ scope: "local" });
        setError(accessError ? "We couldn’t check your access. Please try again." : "This account hasn’t been given media-team access. Contact the website administrator.");
        return;
      }
      // A full navigation makes the server read the new auth cookies.
      window.location.assign("/admin");
    } catch {
      setError("Unable to connect. Check your internet connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={signIn} className="mt-7 space-y-5">
      <label className="block text-sm font-semibold">Email address
        <input name="email" type="email" autoComplete="username" required disabled={busy} className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-4" />
      </label>
      <label className="block text-sm font-semibold">Password
        <input name="password" type="password" autoComplete="current-password" required disabled={busy} className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-4" />
      </label>
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      <button disabled={busy} className="min-h-12 w-full rounded-full bg-primary px-6 font-semibold text-white hover:bg-primary-hover disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button>
      <p className="text-xs leading-relaxed text-muted-foreground">Use the staff account created for this website. If you need help signing in, contact the website administrator.</p>
    </form>
  );
}
