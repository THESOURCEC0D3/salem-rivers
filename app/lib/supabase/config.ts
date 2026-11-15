export function getSupabaseConfig() {
  // Keep these accesses explicit so Next.js can include the public values in
  // browser bundles. Never put a secret or service-role key in these variables.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!url || !publishableKey) {
    throw new Error("Set the Supabase URL and publishable key in .env.local.");
  }

  if (!publishableKey.startsWith("sb_publishable_")) {
    throw new Error("Supabase requires a publishable key for this website.");
  }

  let projectUrl: URL;
  try {
    projectUrl = new URL(url);
  } catch {
    throw new Error("The Supabase project URL must be a valid HTTPS URL.");
  }

  if (projectUrl.protocol !== "https:" || projectUrl.username || projectUrl.password) {
    throw new Error("The Supabase project URL must be a valid HTTPS URL.");
  }

  return { url: projectUrl.origin, publishableKey };
}
