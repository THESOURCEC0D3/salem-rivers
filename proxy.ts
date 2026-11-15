import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseConfig } from "./app/lib/supabase/config";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const { url, publishableKey } = getSupabaseConfig();
  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        const previous = response;
        response = NextResponse.next({ request });
        previous.cookies.getAll().forEach((cookie) => response.cookies.set(cookie));
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
      },
    },
  });

  const { data, error } = await supabase.auth.getClaims();
  if (request.nextUrl.pathname !== "/admin/login" && (error || !data?.claims)) {
    const redirect = NextResponse.redirect(new URL("/admin/login", request.url));
    response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
    response = redirect;
  }
  // All staff responses must remain private, including sign-in and redirects.
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
