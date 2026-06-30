# Page Overrides — About (`/about`)

> Overrides `MASTER.md` for the About page. Source: `Church-architecture.pdf` §3.3.
> **Role:** Answer "who are you, can I trust you, and how does this church function?" This is where
> newcomers are sent (the nav "About" link). Removes objections; ends by handing the reader to Plan
> Your Visit. Give depth **shape**, not a wall of text.

## Section order (top → bottom)

1. **Who we are** — short, human introduction (the hero).
2. **What we believe** — concise, plain-language belief cards. NOT a theology dump.
3. **How the church functions** — membership path + weekly rhythm, then the departments/units
   (reused from `church.departments`, shown compactly to describe structure).
4. **Leadership** — real photos + short intros (trust).
5. **Our heart / vision** — a few warm lines.
6. **Closing CTA** — reuse `ReadyToJoin` → Plan Your Visit.

## Notes

- Content lives in `app/content/church.ts` → `about` (+ reused `departments`). All `[BRACKETS]` (beliefs
  wording, membership steps, leader names/photos/bios, vision) to confirm with the church.
- The richer `visit` content (`whatToExpect`, `kids`) remains available in church.ts if we later decide
  newcomers want "what Sunday is like" here too.
