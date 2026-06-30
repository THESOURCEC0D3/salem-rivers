# Page Overrides — Plan Your Visit (`/visit`)

> Overrides `MASTER.md` for the Plan Your Visit page.
> **Role (revised):** A deliberately **minimal** page — just where, when, and how to reach us. The
> detailed newcomer/church info now lives on **About** (the nav sends newcomers there). The Plan Your
> Visit button is the **only** link to this page.

## Hard rule — direct WhatsApp, NO form

Site is WhatsApp-first. Where other churches use a contact form, we use a **direct WhatsApp** button
(plus tap-to-call). Do not add a contact/RSVP form anywhere.

## What the page shows (only these)

1. **Warm header** — "Plan your visit" + one short reassuring line.
2. **Service times** — from `church.serviceTimes`.
3. **Where to find us** — `church.address` + **Get Directions** (`church.directionsUrl`) + a
   **lazy embedded map** (`church.mapEmbedUrl`).
4. **Talk to us** — **WhatsApp** (`whatsappLink()`) + **Call** (`church.phoneHref`). No form.

## Notes

- Reuses content already in `app/content/church.ts` (serviceTimes, address, directionsUrl, mapEmbedUrl,
  phoneHref, whatsappNumber). The richer `visit` block (whatToExpect, kids, welcomeVideo) is retained in
  church.ts and is now **available to reuse on the About page**.
- `YouTubeFacade` component kept for reuse on Watch.
