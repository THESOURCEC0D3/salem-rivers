# Page Overrides — Watch (`/watch`)

> **Status: deliberate placeholder.** Currently a polished "Coming soon" notice (red pulsing live dot +
> Plan Your Visit), holding the nav slot until the real page is built with care.

## Planned (later, not yet built)

The full Watch page is two-state (architecture doc §3.5):
- **Live** (Sunday during service): "We're live now" + the channel live_stream embed + Facebook link.
- **Not-live** (the other 166 hours): `YouTubeFacade` of the latest service + next-live time.
- **Live detection:** schedule-based, computed client-side in `Africa/Lagos` time (no API). SSR-safe
  default = not-live.
- The physical visit stays primary; the livestream is always framed as the fallback.
