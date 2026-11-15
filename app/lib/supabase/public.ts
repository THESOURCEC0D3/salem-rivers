import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "./config";

/** Public gallery reads: no visitor login or staff session is attached. */
export function createPublicClient() {
  const { url, publishableKey } = getSupabaseConfig();

  return createClient(url, publishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
