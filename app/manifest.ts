import type { MetadataRoute } from "next";
import { church } from "./content/church";

/**
 * Web app manifest — what makes the site installable on a phone home screen or
 * a laptop desktop.
 *
 * Next serves this at /manifest.webmanifest and injects the <link rel="manifest">
 * automatically; there is nothing to wire up in layout.tsx.
 *
 * INSTALLABILITY NEEDS EXACTLY TWO THINGS (Next's own PWA guide, §6):
 *   1. a valid manifest — this file
 *   2. the site served over HTTPS — Vercel already does
 *
 * A service worker is NOT required. Plenty of older tutorials say it is; that
 * requirement was dropped. One is only needed for OFFLINE access or push
 * notifications, which are deliberately a later phase — a cache on a site whose
 * whole job is current event dates can show someone last month's events, and
 * that is worse than a loading spinner.
 *
 * WHAT THIS DOES AND DOES NOT GIVE YOU
 *   ✓ icon on the home screen / desktop, opens fullscreen with no browser chrome
 *   ✗ not in the Play Store or App Store — it is a web app, not a native one
 *   ✗ no offline access (needs a service worker)
 *   ✗ no push notifications (needs a server; this site is fully static)
 *
 * iOS NEVER PROMPTS. Android and desktop Chrome show an install banner on their
 * own once this file is valid. Safari does not, and Apple provides no API to
 * trigger one — iPhone users must tap Share → "Add to Home Screen" by hand. If
 * that matters, the fix is on-page copy telling them, not code.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    /*
      A stable identity for the installed app, independent of start_url. Without
      it the browser derives identity from start_url, so changing that later
      would orphan everyone's existing install and create a duplicate.
    */
    id: "/",
    name: church.name,
    /*
      NOT `church.shortName` ("Salem City of Faith", 19 characters) — launchers
      truncate the home-screen label at roughly 12. "Salem" is what the church
      calls itself anyway: the tagline reads "In Salem God is making many
      mighty", and members are "Salemites".
    */
    short_name: "Salem",
    description: church.identity,
    start_url: "/",
    /*
      standalone = opens in its own window with no browser address bar, which is
      the whole point of installing. The site's own header carries the nav, so
      losing browser chrome does not strand anyone.
    */
    display: "standalone",
    /*
      background_color paints the splash screen while the app boots; theme_color
      tints the OS chrome around it (Android status bar, desktop title bar).
      Both are the site's ivory, so the splash matches the page that follows and
      the status bar reads as a continuation of the ivory header rather than a
      band of unrelated colour.
    */
    background_color: "#fffcf7",
    theme_color: "#fffcf7",
    lang: "en-NG",
    categories: ["lifestyle"],
    /*
      TWO PURPOSES, AND THE PADDING DIFFERS — this is not duplication.

      "any"      shown as-is. 88% content, so the emblem breathes to the edge.
      "maskable" Android crops the icon into a circle or squircle. The safe zone
                 is a circle 80% of the width, and the largest 1.40:1 box that
                 fits inside it is 65% of the width. Verified by rendering the
                 circular mask over both: at 88% the wreath's outer leaves get
                 clipped, at 65% the whole mark survives with margin.

      All four sit on #2a1a33 (--color-foreground). The wreath is thin gold
      strokes that measure ~2.3:1 on ivory and wash out at icon sizes; on the
      dark tile it stays crisp. Maskable icons must be opaque regardless — a
      transparent one lets the mask show through.
    */
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    /*
      Long-press the installed icon (Android) or right-click it (desktop) to jump
      straight to one of these. Ordered by what a visitor most likely wants.
    */
    shortcuts: [
      {
        name: "Worship with us",
        short_name: "Visit",
        description: "Service times, address and directions",
        url: "/visit",
      },
      {
        name: "Events",
        short_name: "Events",
        description: "What is coming up at the church",
        url: "/events",
      },
      {
        name: "Watch",
        short_name: "Watch",
        description: "Sermons and services",
        url: "/watch",
      },
    ],
  };
}
