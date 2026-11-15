import nextEnv from "@next/env";
import { createClient } from "@supabase/supabase-js";

// Read the same local configuration as Next.js without printing credentials.
nextEnv.loadEnvConfig(process.cwd(), true, { info() {}, error() {} });

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!url || !key?.startsWith("sb_publishable_")) {
    throw new Error("Set the project URL and sb_publishable_ key in .env.local.");
  }

  let projectUrl;
  try {
    projectUrl = new URL(url);
  } catch {
    throw new Error("The project URL is invalid.");
  }
  if (projectUrl.protocol !== "https:" || projectUrl.username || projectUrl.password) {
    throw new Error("Use the HTTPS project URL from Supabase's Connect dialog.");
  }

  const settings = await fetch(new URL("/auth/v1/settings", projectUrl.origin), {
    headers: { apikey: key },
    signal: AbortSignal.timeout(15000),
  });
  if (!settings.ok) {
    throw new Error(`Supabase rejected the connection (HTTP ${settings.status}).`);
  }
  console.log("Supabase project is reachable and the publishable key is accepted.");

  if (process.argv.includes("--connection-only")) return;

  const supabase = createClient(projectUrl.origin, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: {
      fetch: (input, options) => fetch(input, {
        ...options,
        signal: AbortSignal.timeout(15000),
      }),
    },
  });

  let incomplete = false;
  for (const table of ["albums", "photos", "sermons"]) {
    const { error, status } = await supabase.from(table).select("id").limit(1);
    if (error) {
      incomplete = true;
      const reason = error.code === "PGRST205"
        ? "not created yet; apply the media-library migration"
        : `read failed (HTTP ${status}); check the table grants and policies`;
      console.log(`${table}: ${reason}.`);
    } else {
      console.log(`${table}: public read succeeds.`);
    }
  }
  if (incomplete) process.exitCode = 1;
}

main().catch((error) => {
  // Avoid dumping fetch errors, request objects, URLs, or credentials.
  const message = error instanceof Error && error.message !== "fetch failed"
    ? error.message
    : "Could not reach Supabase. Check network access and the project URL.";
  console.error(message);
  process.exitCode = 1;
});
