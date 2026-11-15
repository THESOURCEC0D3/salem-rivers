"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/app/lib/supabase/client";

const TABS = [
  { href: "/admin", label: "Photo albums", match: (p: string) => p === "/admin" || p.startsWith("/admin/albums") },
  { href: "/admin/videos", label: "Sermon videos", match: (p: string) => p.startsWith("/admin/videos") },
];

export function StaffHeader({ email, disabled = false }: { email?: string; disabled?: boolean }) {
  const pathname = usePathname();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function signOut() {
    setBusy(true);
    try {
      const { error } = await createClient().auth.signOut({ scope: "local" });
      if (error) throw error;
      window.location.assign("/admin/login");
    } catch {
      setError("Couldn’t sign out. Please try again.");
      setBusy(false);
    }
  }
  return (
    <div className="mb-8 border-b border-border pb-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/admin" className="text-sm font-bold uppercase tracking-widest text-accent">Media team</Link>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="break-all text-muted-foreground">{email}</span>
          <button disabled={busy || disabled} onClick={signOut} className="min-h-11 rounded-full border border-border px-5 font-semibold hover:bg-muted disabled:opacity-60">{busy ? "Signing out…" : "Sign out"}</button>
          {error && <p role="alert" className="text-red-800">{error}</p>}
        </div>
      </div>
      <nav aria-label="Dashboard sections" className="mt-5 flex gap-2">
        {TABS.map((tab) => {
          const active = tab.match(pathname);
          return (
            <Link key={tab.href} href={tab.href} aria-current={active ? "page" : undefined}
              className={`min-h-11 rounded-full px-5 py-2.5 text-sm font-semibold ${active ? "bg-primary text-white" : "border border-border hover:bg-muted"}`}>
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
