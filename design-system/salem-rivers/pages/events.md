# Page Overrides — Events (`/events`)

> Overrides `MASTER.md` for the Events page. Source: `Church-architecture.pdf` §3.4.
> **Role:** Prove the church is alive, and offer a low-commitment on-ramp — an event can feel easier to
> attend than "church."

## Section order (top → bottom)

1. **Events hero** — short framing line ("an event is an easy first step").
2. **Upcoming** (nearest first) — flyer image + date · time · location + one-line "what it is".
   Each funnels to a **WhatsApp "I'd like to come to [event]"**; newcomers get a Plan Your Visit link.
3. **Past events** — photo evidence of community life (placeholder grid for now).
4. **Closing CTA** — reuse `ReadyToJoin` → Plan Your Visit.

## Rules

- **Keep `upcoming` current** — a stale past event sitting at the top is a credibility killer. Pruning is
  part of the weekly content rhythm.
- Single source of truth: `church.events` (`upcoming[]` + `past[]`). The homepage "next event" is just
  `events.upcoming[0]`. Real flyer images are keyed by event id in `app/components/eventImages.ts`
  (statically imported → shown at natural ratio, no crop). Events without a real flyer use a placeholder.
