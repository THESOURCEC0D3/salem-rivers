# Page Overrides — Home

> Overrides `MASTER.md` for the Home page only. Source: `Church-architecture.pdf` §3.1.
> **Role:** Be *the trailer, not the movie.* Prove "real, warm, here's when/where" in ~5 seconds to a
> skimmer on a cheap Android. Every section funnels to **Plan Your Visit**; WhatsApp is the fallback.

## Section order (top → bottom)

1. **Hero** — strong still congregation photo (NO autoplay video). One-line identity
   ("A Pentecostal family in [neighbourhood], Port Harcourt"). **Service times + location visible
   without scrolling.** Primary CTA **Plan Your Visit**; secondary **Message us on WhatsApp**.
2. **"New here? Here's what Sunday looks like"** — 3–4 reassuring beats (how long · what to wear · kids ·
   the welcome), each a small card → link to Plan Your Visit.
3. **A glimpse of us** — optimised photo strip of real services/events. Faces, not the building.
4. **Pastor's welcome** — one genuine photo + 2–3 plain, warm sentences.
5. **Testimony** — short single testimony. **CLEARED for build** (church approved). Reusable
   `<Testimony>` section component so it can also drop into Plan Your Visit later.
6. **Next event** — the single nearest upcoming event → Events page.
7. **"Can't make it in person?"** — subordinate livestream mention → Watch page. Visually quieter than
   the visit CTAs (muted card, no big gold button).
8. **Footer** (shared) — address, embedded map / Get Directions, phone, WhatsApp, service times,
   Contact, Give [conditional — keep slot, off until cleared].

## Home-specific rules

- Hero overlays text on a darkened image → enforce ≥4.5:1; bake a gradient scrim, don't trust the photo.
- Service times + location chip must be above the fold at 375px width.
- Funnel discipline: no section is a dead end; primary action everywhere is Plan Your Visit.
- Performance: hero image `priority`, everything below `loading="lazy"`; `<Image>` + WebP throughout.
- All `[BRACKET]` values come from `app/content/church.ts` (placeholders, clearly marked).
