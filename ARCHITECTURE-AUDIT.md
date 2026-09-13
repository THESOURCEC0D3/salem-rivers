# Salem City of Faith — Project Handbook & Architecture Audit

**Audited:** 4 September 2026 · **Last touched:** 5 September 2026 · **Base commit:** `6c077f4`
**Working tree:** uncommitted work outstanding — see §15 for what has changed since that commit.
**Supersedes** the previous audit entirely. That document described a 7-section homepage, a
`DoorMarkIcon` logo, the working title "Salem Rivers" and a phone number that no longer exists.
None of that is true any more.

This is written to be used **without any AI assistant**. It is a handbook first and a survey
second: §10 (Recipes) and §11 (Gotchas) are the parts you will actually reach for.

---

## Table of contents

1. [What this project is](#1-what-this-project-is)
2. [Quick start](#2-quick-start)
3. [Tech stack](#3-tech-stack)
4. [Directory map](#4-directory-map)
5. [The content model — `church.ts`](#5-the-content-model--churchts)
6. [Routes](#6-routes)
7. [Shared chrome](#7-shared-chrome)
8. [Design system](#8-design-system)
9. [The image system](#9-the-image-system)
10. [Recipes — how to do the common jobs](#10-recipes--how-to-do-the-common-jobs)
11. [Gotchas — read before editing](#11-gotchas--read-before-editing)
12. [Outstanding work](#12-outstanding-work)
13. [Dead code and orphaned assets](#13-dead-code-and-orphaned-assets)
14. [Deploying](#14-deploying)
15. [Change log](#15-change-log)

---

## 1. What this project is

A marketing and invitation website for **Foundation Faith Church, Salem City of Faith** — a
Nigerian Pentecostal church at No. 1 Faith Avenue, Rumuomasi, Port Harcourt, Rivers State.

It is a **brochure site, not an application**. There is no database, no CMS, no login, no forms
and no server-side logic beyond Next's own rendering. Every route is statically prerendered at
build time. All content lives in one TypeScript file.

**The organising principle:** the site is *WhatsApp-first*. There is no contact form anywhere.
Every "get in touch" action is a WhatsApp deep link with a message pre-written for the context
the visitor clicked from. This is deliberate and documented in several component headers — do
not add a contact form without deciding to overturn that.

**The church's naming**, settled and now consistent everywhere:

| | |
|---|---|
| Official name | Foundation Faith Church, Salem City of Faith |
| Short form (prose) | Salem City of Faith |
| Retired working title | ~~Salem Rivers~~ — gone from the site; survives only in the repo folder name and `package.json` |

---

## 2. Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build — also runs a full TypeScript check
npm run start    # serve the production build
npm run lint     # eslint
npx tsc --noEmit # types only, much faster than a full build
```

**`npm run build` needs internet.** `next/font/google` fetches Fraunces and Nunito from Google
at build time. With no connection the build fails with `Failed to fetch 'Nunito' from Google
Fonts` — that is a network problem, not a code problem. `npx tsc --noEmit` works offline and is
the fastest way to check your work.

**Verifying a change without a browser.** The build writes real HTML to
`.next/server/app/*.html`. Grepping those files is the most reliable way to confirm something
actually rendered:

```bash
grep -o 'class="[^"]*bg-gold-wash[^"]*"' .next/server/app/index.html
```

---

## 3. Tech stack

| | |
|---|---|
| Framework | **Next.js 16.2.9**, App Router, Turbopack |
| React | 19.2.4 |
| Styling | **Tailwind CSS v4** — configured in CSS via `@theme`, *no `tailwind.config.js`* |
| Animation | Framer Motion 12 |
| Language | TypeScript 5, strict |
| Path alias | `@/*` → repo root (so `@/app/lib/...`) |

### ⚠️ This is not the Next.js you may know

`AGENTS.md` warns about this and it is real. Next 16 changed things that older tutorials and
Stack Overflow answers get wrong. **The docs ship inside the repo** — read them rather than
guessing:

```
node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md
```

The one that has already bitten this project: **`<Image priority>` is deprecated in Next 16**,
replaced by an explicit `preload` prop that defaults to `false`. See §11.

`next.config.ts` is nearly empty — it only allowlists `img.youtube.com` for remote images
(YouTube thumbnails).

---

## 4. Directory map

```
app/
├─ layout.tsx              Root layout: fonts, metadata, JSON-LD, Header/Footer/WhatsAppButton
├─ page.tsx                HOMEPAGE — section order + the gold wash rhythm
├─ globals.css             ALL design tokens (Tailwind v4 @theme) + a few global rules
│
├─ about/page.tsx          /about
├─ classes/page.tsx        /classes
├─ events/page.tsx         /events
├─ give/page.tsx           /give   (coming-soon placeholder)
├─ visit/page.tsx          /visit  (the keystone conversion page)
├─ watch/page.tsx          /watch  → WatchPageClient
├─ watch/WatchPageClient.tsx
│
├─ content/church.ts       ★ THE SINGLE SOURCE OF ALL COPY (1035 lines)
├─ data/sermons.ts         Sermon list (separate from church.ts — see §5)
├─ types/sermon.ts         Sermon types
├─ lib/sermonService.ts    Picks the featured sermon
├─ lib/youtube.ts          YouTube URL/ID/thumbnail helpers
│
└─ components/
   ├─ *ImageS.ts           FOUR image maps — see §9
   │    leaderImages.ts · departmentImages.ts · eventImages.ts · glimpseImages.ts
   ├─ Header / Footer / WhatsAppButton      site chrome
   ├─ Section / Container / Button / PageHero / PhotoPlaceholder / Reveal / icons
   ├─ Testimonials.tsx     the carousel (client)
   ├─ home/                homepage sections
   ├─ about/               /about sections
   ├─ events/              /events sections
   ├─ classes/             /classes sections
   └─ media/               sermon + video components

design-system/salem-rivers/   Original design spec (MASTER.md + one file per page)
HANDOFF.md                    Original brief
Church-architecture.pdf       Original client document
```

**Only 7 files are client components** (everything else is server-rendered):
`Header`, `Reveal`, `Testimonials`, `YouTubeFacade`, `about/FaqAccordion`,
`media/FeaturedVideoPlayer`, `watch/WatchPageClient`.

---

## 5. The content model — `church.ts`

**`app/content/church.ts` is the most important file in the project.** Almost all visible text
comes from here. Edit it and every page updates. It exports:

| Export | What it is |
|---|---|
| `church` | One giant object — all copy, grouped by page/section |
| `navLinks` | The navbar links |
| `PLAN_VISIT_HREF` | `"/visit"` — the primary CTA target |
| `whatsappLink(message?)` | **The only place a `wa.me` URL is built** |
| ~15 exported types | `ChurchEvent`, `PastEvent`, `ChurchClass`, `Testimonial`, `Department`, `Leader`, … |

### Top-level shape of `church`

```
name, shortName, identity, tagline          identity
city, state, neighbourhood, address         location
directionsUrl, mapEmbedUrl                  Google Maps links
phone, phoneHref, email, whatsappNumber     contact (see below)
serviceTimes[]                              Sunday 7:00 AM · Wednesday 5:30 PM
pastor{}                                    Bishop Hilary Ogoliegbune
visit{}                                     /visit copy
about{}                                     /about copy — the biggest block (~390 lines)
testimonials[]                              homepage carousel
departments[]                               the six serving teams
events{ upcoming[], past[] }                events
classes{}                                   /classes — the three schools
prayer{}, watch{}, give{}, socials{}, photos{}
sermons{}                                   ⚠ PARKED — not rendered anywhere
```

### Two things about contact details

**One phone number, four places.** `phone` (displayed), `phoneHref` (the `tel:` link),
`whatsappNumber` (the `wa.me` form) and the JSON-LD `telephone` in `layout.tsx` are all the
same line: **0703 152 2204 / +234 703 152 2204**. Local SEO wants Name/Address/Phone identical
everywhere, so if one moves, move all of them.

**Two numbers on the site are deliberately NOT the church's.** `0816 507 9879` and
`0813 849 1000` belong to **SPAMIC's registrar** (the college office) and appear in the SPAMIC
event blurb and on `/classes`. There are guard comments at both sites. Do not sweep them into
`church.phone` — anyone dialling them is registering for a course.

### `church.sermons` is a trap

There are **two** unrelated `Sermon` types:

- `church.sermons` + the `Sermon` type in `church.ts` — **parked, rendered nowhere**. It fed
  `home/LatestSermon.tsx`, which is no longer imported. Ignore it.
- `app/types/sermon.ts` + `app/data/sermons.ts` — **the live one**, used by `/watch` and the
  homepage's featured sermon.

If you are editing sermons, you want **`app/data/sermons.ts`**.

---

## 6. Routes

All 8 routes are `○ (Static)` — prerendered at build time.

### `/` — Homepage

Section order is the funnel and is deliberate: meet the church → meet its leader → learn who
they are → see the people → find a date → find a place to serve → learn how to grow → hear from
members → be offered prayer → *only then* be asked to visit.

| # | Section | Surface |
|---|---|---|
| 1 | `Hero` | full-bleed photo |
| 2 | `PastorWelcome` | `gold-wash-1` |
| 3 | `AboutSalemCityOfFaith` | `gold-wash-3` |
| 4 | `GlimpseStrip` | `gold-wash-1` |
| 5 | `FeaturedSermon` | `gold-wash-2` |
| 6 | `NextEvent` | `gold-wash-3` |
| 7 | `GetInvolved` | `gold-wash-1` |
| 8 | `ClassesPreview` | `gold-wash-2` |
| 9 | `TestimonySection` | dark photo — outside the scale |
| 10 | `NeedPrayer` | `gold-wash-2` |
| 11 | `ReadyToJoin` | `bg-primary` (blue) — outside the scale |

**The rule that matters: no two adjacent sections share a wash.** If you reorder or insert,
re-check that or the seam between them disappears. The two non-participants (dark testimony,
blue CTA) are the page's contrast moments — folding them into the gold scale would flatten it.

`GlimpseStrip`, `FeaturedSermon` and `GetInvolved` are **shared with other pages**, so their
washes are passed as props *from `page.tsx`*, not set inside the components. Their defaults stay
untouched so `/about` and `/watch` are unaffected.

`Hero` is deliberately **not** wrapped in `Reveal` — it is the LCP element and already on
screen.

### `/about`
`AboutHero → WhoWeAre → OurHeritage → OurVision → OurMission → OurPassion → CoreValues →
WhatWeBelieve → Leadership → GlimpseStrip → ChurchLife → GetInvolved → YourJourney →
FaqAccordion → FinalCta`

The longest page. Content comes from `church.about`.

### `/classes` — the three schools
`PageHero → ClassList → ReadyToJoin`

Programme name: **"Arch-Bishop's Arm"**. `ClassList` renders, in order: the flyer, the
institute's story (mandate, objective, journey, workforce, affiliation, certificates, five
modules, campus life), then the three school cards, then "who can come" + registration.

The three schools:

| Acronym | Name | Season | Meets |
|---|---|---|---|
| P.L.T | Provincial Leadership Training | March–May | Thursdays |
| C.F.B.I | Covenant Faith Bible Institute | May–June | Weekends |
| S.P.A.M.I.C | Salem Pastoral & Management College | July–September | Weekends |

Seasons carry **no year** — `classes.year` holds it separately, so copy does not go stale
annually. Class **times are unknown** (the flyer prints the literal word "TIME"), so the cards
say *"time confirmed at registration"*. Fill `time` in `church.ts` and they switch automatically.

### `/events`
`EventsHero → UpcomingEvents → PastEvents → ReadyToJoin`

Two arrays in `church.events`. `upcoming` is **nearest-first**; `past` is **newest-first**.

### `/visit` — the keystone page ("Worship with us")

> **The button says "Worship with us"; the URL is still `/visit`.** Renamed 13 Sep 2026 across
> all 11 visible labels plus the page `<title>`. The route, and the `PLAN_VISIT_HREF` constant
> that points at it, deliberately kept their old names — changing a live URL breaks inbound links
> and loses its search history. So `PLAN_VISIT_HREF` no longer matches the words on the button;
> that is intentional, not drift.
Service times, address, embedded map, "what to expect", and a direct WhatsApp link. No form.

### `/watch`
`WatchHero → FeaturedSermon → PreviousSermons`. Client-side: clicking a previous sermon swaps
the featured player and scrolls to it. Data from `app/data/sermons.ts`.

### `/give`
A coming-soon placeholder. Deliberate — giving details were not cleared.

---

## 7. Shared chrome

Rendered on every page by `layout.tsx`, along with the fonts, metadata, and a JSON-LD `Church`
block for local SEO.

### Header (`app/components/Header.tsx`) — client

- **Logo:** `public/images/salem-logo-nav.png`, `h-14` rising to `h-16` at `lg`. `alt=""`
  because the wrapping link carries an `aria-label` — otherwise the name is announced twice.
- **Bar height `h-20` (80px).** ⚠ Two files subtract this: `Hero.tsx` and `give/page.tsx` both
  use `min-h-[calc(100svh-5rem)]`. **That `5rem` IS the bar height.** If you change one, change
  all three or those sections stop filling the viewport.
- **Desktop nav appears at `lg`, not `md`** — see §11 for the arithmetic. Below `lg` it is a
  hamburger.

### Footer
Renders the **same logo asset** at `h-12` (its column is only ~242px wide at `lg`). Here
`alt` **is** the church name, because it stands alone rather than inside a labelled link. The
church name also appears as text in the copyright line, which is what keeps the canonical
Name/Address/Phone crawlable.

### WhatsAppButton
Fixed bottom-right on every page. The persistent "reach a human" channel.

### Social links
Six accounts, in `church.socials`, rendered as the footer icon row **and** fed to the JSON-LD
`sameAs` array in `layout.tsx` — which is how search engines tie the profiles to the church.

| Network | Handle |
|---|---|
| Facebook | `officialsalemrivers` |
| Instagram | `salemriversph` |
| YouTube | `@officialsalemrivers` |
| TikTok | `@officialsalemrivers` |
| X | `salemriversph` |
| Threads | `salemriversph` |

**The handles split in two — do not "tidy" them into one spelling.** Facebook, YouTube and
TikTok use `officialsalemrivers`; Instagram, X and Threads use `salemriversph`. All six were
click-tested on 5 Sep 2026.

`sameAs` is `Object.values(church.socials)`, so adding a network to that object puts it in the
schema automatically — but the footer row is written out by hand, so a new network needs an entry
there too, plus a brand icon in `icons.tsx`.

These replaced `https://facebook.com/example` style placeholders that had been in place since
the project began; the footer icons went nowhere real until 5 Sep 2026.

### Favicon and app icons
Three files in `app/`, picked up by Next's file convention — no `metadata.icons` config:

| File | Size | Notes |
|---|---|---|
| `favicon.ico` | 16 / 32 / 48 | multi-size, so the browser picks a real bitmap instead of downscaling one |
| `icon.png` | 512×512 | transparent; the modern `<link rel="icon">` |
| `apple-icon.png` | 180×180 | flattened onto ivory `#fffcf7` — **iOS composites transparency onto black**, which would put a gold wreath on a black tile |

All three are generated from **the emblem only** — the wreath, cropped out of
`public/images/salem-logo-2.png` at rows 127–308. That source is the stacked lockup, with
"FOUNDATION FAITH CHURCH" and "SALEM CITY OF FAITH" as two text lines beneath the wreath. At the
16×16 a browser tab actually renders, those lines are about one pixel tall each and turn into a
grey smear, so including them would make the icon *less* recognisable, not more.

**Known limitation:** the mark is thin gold strokes on transparency. That reads well on a dark
browser tab and is washed out on a light one — the more common default. The fix, if it ever
matters, is flattening the icon onto its own dark tile (`--color-foreground` #2a1a33) so it
carries its contrast with it; it then looks identical whatever the tab colour. That was a
deliberate deferral, not an oversight — it changes how the brand mark is presented.

To regenerate after a logo change: crop the emblem, pad to square with ~6% margin, then emit the
three files above. `sharp` cannot write `.ico`, so that one is a hand-built container — ICO
header, one 16-byte directory entry per size, then PNG payloads.

---

## 8. Design system

**All tokens live in `app/globals.css` inside `@theme`.** Tailwind v4 turns each into a utility
(`--color-primary` → `bg-primary`, `text-primary`, …). There is no `tailwind.config.js`.

| Token | Value | Notes |
|---|---|---|
| `--color-background` | `#fffcf7` | warm ivory |
| `--color-foreground` | `#2a1a33` | near-black with a purple cast |
| `--color-primary` | `#4b70c2` | **royal blue** — despite older docs saying "purple" |
| `--color-accent` | `#b45309` | accessible burnt gold, for text and borders |
| `--color-gold` | `#c8881d` | brighter gold for flourishes |
| `--color-gold-core` | `#c1a545` | **the logo's own gold**, sampled from the artwork |
| `--color-gold-wash-1/2/3` | `#fdf9f0` / `#fbf6eb` / `#f8f2e3` | section surfaces |

### The gold wash scale

The washes are **derived**, not hardcoded: `color-mix(in srgb, var(--color-gold-core) N%,
var(--color-background))` at 4%, 7% and 11%. Retune `--color-gold-core` and all three follow.
Tailwind folds the `color-mix` at build time, so the shipped CSS contains literal hex and there
is no runtime cost.

> **⚠ THE SCALE STOPS AT 11% FOR A MEASURED REASON.** Section eyebrows render in
> `--color-accent` at **12px bold**, which is *not* "large text" under WCAG, so it needs 4.5:1.
> Measured: wash-1 **4.76**, wash-2 **4.65**, wash-3 **4.51** — all pass. A 16% step lands at
> **4.34** and fails. Do not add a darker wash without re-checking the eyebrow.

Cards on the strongest sections use `bg-gold-wash-1` so they read as elevation within one
palette rather than white islands.

### Three greens, and which is which
`--color-whatsapp` (#25d366) and `--color-whatsapp-hover` (#1ebe5d) are **fills only**.
`--color-whatsapp-text` (#167c3c) is for green **text or icons** on a light surface.

Same split the golds use (`--color-gold` = flourish, `--color-accent` = may carry text), and
for the same reason: #1ebe5d as text scores **2.19–2.45:1**, under half the 4.5 AA needs.
Lighthouse caught it on the live site (Accessibility 96, 9 Sep 2026). #167c3c is the same hue at
59% brightness and clears AA on every surface (4.55–5.24).

> **⚠ Still failing, deliberately untouched:** white on the #25d366 button fill is **1.98:1**.
> That is WhatsApp's own brand pairing, so changing it is a brand decision, not a bug fix.
> Darkening the fill to #167c3c would take white to 5.24 if accessibility wins that argument.

### Typography
- Headings: **Fraunces** (serif), via `--font-serif`
- Body: **Nunito** (sans), via `--font-sans`
- Both self-hosted by `next/font`, subset to latin, `display: swap`

### Accessibility baked in
- `:focus-visible` gets a 3px ring globally
- `prefers-reduced-motion` neuters transitions in CSS **and** in Framer (via `Reveal`)
- A "Skip to content" link is the first focusable element
- Light theme only — dark mode is a deliberate later add

---

## 9. The image system

Four maps, all keyed by **name or id, never by array index**, so reordering content cannot
scramble the pictures.

| Map | Keyed by | Used by |
|---|---|---|
| `leaderImages.ts` | `church.about.leadership[].name` | `about/Leadership` |
| `departmentImages.ts` | `church.departments[].name` | `home/GetInvolved` |
| `eventImages.ts` | event `id` | `UpcomingEvents` **and** `PastEvents` |
| `glimpseImages.ts` | array order | `GlimpseStrip` |

Anything without an entry falls back to a labelled `PhotoPlaceholder`, so the site works
half-finished and improves as photos arrive.

### The `kind` discriminator — this is load-bearing

`departmentImages` and `leaderImages` each carry a `kind` that decides how the image is fitted.
**Measure before you set it.** The department card is a **16:10 (1.60)** frame:

| `kind` | Rendering | When |
|---|---|---|
| `photo` | `object-cover` (+ optional `objectPosition`) | real photographs — losing background is fine |
| `graphic` | `object-contain` on `bg-gold-soft` | designed banners with a wordmark |
| `logo` | `object-contain` on `bg-[#010101]` | square logos |

**Why `graphic` exists:** the sanitation banner is 1368×768 (1.78). Its ink runs from 7.5% to
96.9% of the width, but a 16:10 centre crop keeps only 5.1%–94.9% — so `object-cover` **slices
the last letter off**. `object-contain` leaves ~5% bars top and bottom, and `bg-gold-soft`
(`#f7ead0`) is close to the artwork's own edge colour (`#e6d8bf`), so it reads as a mat.

**The trade-off runs both ways:** contain on a *1.33* image bars the **left and right**. That is
why the team photos are `photo`, not `graphic`.

Current department mapping:

| Department | File | Ratio | Kind |
|---|---|---|---|
| Technical / Media | technical1.jpg | 0.64 | photo, `object-[center_15%]` |
| Ushering | ushering-image.jpg | 1.33 | photo |
| Protocol | protocolimage2.jpg | 1.33 | photo |
| Sanitation | sanitation-image.jpg | 1.78 | **graphic** |
| Choir | choir.jpg | 1.50 | photo |
| KDF | KDF-Logo.jpeg | 1.00 | **logo** |

`leaderImages` uses `photo` vs **`cutout`** (transparent PNG — `object-contain`, bottom-aligned,
and **no `placeholder="blur"`**, because Next's blur data URL has no alpha and flashes an opaque
rectangle behind the transparency).

### Event flyers are never cropped
Both `UpcomingEvents` and `PastEvents` render flyers at natural ratio (`h-auto w-full`). A flyer
is a designed poster; cropping cuts text off.

---

## 10. Recipes — how to do the common jobs

### Add an upcoming event
1. Add an object to `church.events.upcoming` in `church.ts`, **nearest-first**. Required:
   `id, title, date, time, location, blurb, flyer`.
2. Put the flyer in `public/images/`.
3. In `eventImages.ts`: `import` it, then add `"<id>": <import>` under the *Upcoming* group.
4. `npm run build`.

### Move an event to past
1. Cut the object from `upcoming`.
2. Add it to the **top** of `past` (newest first) with only `id, title, date, photo`.
   **Keep the same `id`.**
3. In `eventImages.ts`, move the line to the *past* group (cosmetic only).

> **Keeping the `id` is the whole trick.** Both lists look flyers up in the same map by id, so
> the real flyer follows the event across. Change the id and the card silently drops to a
> placeholder.

### Add a department photo
1. Drop the file in `public/images/`.
2. **Measure it first** — is a 16:10 centre crop going to eat anything?
   - photograph → `kind: "photo"`
   - designed banner with text → `kind: "graphic"`
   - square logo → `kind: "logo"`
3. Add an entry to `departmentImages.ts` keyed by the **exact** department name from
   `church.departments`.
4. Update the measurement table in that file's header comment.

### Change any copy
Search `app/content/church.ts` for the text. It is almost certainly there.

### Change the phone number
`church.ts` → `phone`, `phoneHref`, `whatsappNumber`. All four surfaces (display, `tel:`,
`wa.me`, JSON-LD) follow. **Do not touch the two registrar numbers** (§5).

### Add a nav link
Add to `navLinks` in `church.ts` — **then read §11 on the header budget**, because each link
costs the logo ~90px.

### Add a sermon
`app/data/sermons.ts`. Set `status` to `"live"`, `"latest"` or `"previous"`.
`getFeaturedSermon()` prefers `live`, then `latest`, then the first entry. You only need the
**11-character YouTube video ID**, not the URL.

### Add a testimony
`church.testimonials`. Only `quote` is required — `name` is **optional** and the card omits the
whole caption when it is absent, so a testimony can be published unattributed rather than
showing a placeholder.

---

## 11. Gotchas — read before editing

These are all real problems that have already cost time.

### 1. `Reveal` must never hide content server-side
`app/components/Reveal.tsx` looks over-engineered. It is not. The obvious implementation gives
Framer `initial={{opacity: 0}}`, which ships `style="opacity:0"` in the HTML — so *any* failure
between SSR and Framer's first frame (hydration error, 404'd chunk, slow mobile JS) leaves the
section **permanently blank**. That actually happened to the department cards: correct markup,
correct CSS, working images, invisible page.

So `canAnimate` starts `false` and only an effect flips it. Every failure mode now degrades to
"visible, not animated" instead of "gone". **Do not simplify this away.**

### 2. The header's horizontal budget
The logo is a **3.91:1** lockup, so its *height* is really a *width* budget.

```
5 nav links (~388px) + "Plan Your Visit" (~174px) + gaps (32px) ≈ 594px of fixed chrome
  at md  → container 720px → only ~126px left → the logo does not fit AT ALL
  at lg  → container 960px → ~366px left      → h-16 (250px wide) fits comfortably
```

That is why the desktop nav appears at **`lg`**, not `md`. **Before adding a sixth nav link,
redo this arithmetic.** Each link costs ~90px straight out of the logo's budget.

### 3. `<Image priority>` is deprecated in Next 16
Use `preload` instead. And note the measured behaviour: **`loading="eager"` also emits a
`<link rel="preload">`**, and `preload={false}` does *not* suppress it. The header logo therefore
passes **no** loading props at all — the default (lazy) is correct, because the route heroes are
the real LCP and hold the only preload worth having.

`Hero.tsx` and `PageHero.tsx` still pass the deprecated `priority`. They work; migrating them is
tidy-up, not urgent.

### 4. `whatsappLink()` pre-fills — it does not send
`wa.me/<number>?text=…` opens WhatsApp's composer with the message ready. **The visitor still
has to press send.** Sending from the site would need the WhatsApp Business Cloud API (Meta
verification, a dedicated number that can no longer be used in the normal app, a server, and
per-conversation cost).

**Never put this behind a button labelled "Send".** People will see the message on screen,
assume it went, and close the app — and the church silently loses the message. Every link
appends a "My name is: " prompt, because admins were getting messages from unknown numbers.

### 5. JSX comments cannot go in a `return (` or an attribute list
```jsx
return (
  {/* comment */}     // ❌ syntax error
  <section>
<Section
  {/* comment */}     // ❌ syntax error
  eyebrow="…"
```
Put `//` comments *above* the `return`, or `{/* */}` *inside* a parent element. This has caused
three build failures.

### 6. Backslashes get mangled in shell heredocs
Running Node via a heredoc strips one level of escaping, so a regex written as `[\\s\\S]`
arrives as `[sS]` and matches nothing — silently. **Write scripts to a file and run the file**,
or use plain string `indexOf`/`slice`. One partial failure already left two files inconsistent.

### 7. Measure image crops; do not eyeball them
The ushering banner *looked* fine in a rendered crop and was in fact clipping its own artwork.
Compute where the ink actually is and where the crop window actually falls.

### 8. Section heading levels
`Section` renders its `title` as `<h2>`. If you remove a section title, any `<h3>`s beneath it
are left dangling under the `<h1>` — a heading-level skip. `/classes` promotes its institute
headings to `<h2>` for exactly this reason.

---

## 12. Outstanding work

### 🔴 Launch blockers — placeholders visitors can actually read

Verified against the built HTML. These render as literal bracketed text on live pages:

| Text | Where | Page |
|---|---|---|
| `[Describe KDF]` | `church.departments` → KDF blurb | **`/` and `/about`** |
| `[CONFIRM]` | FAQ, "How long is the service?" | `/about` |
| `[CONFIRM wording.]` | Dr. Love Sam-Amaga's bio | `/about` |
| `[CONFIRM: add years served and a personal line.]` | Bishop Hilary's bio | `/about` |
| `[to be confirmed]` ×2 | `churchLife` meeting times | `/about` |
| `[Details to be confirmed]` | `churchLife` | `/about` |

The KDF one is the worst — it is on the homepage. Fix these before any launch.

*(Most other brackets in `church.ts` are in `photo:` fields, which only feed placeholder labels,
or in comments. Those are fine.)*

### ✅ Recently closed

- **Social links were `example.com` placeholders** — all six now point at real accounts
  (see §7). This was a live-site defect nobody had flagged: every footer icon was a dead link.
- **Favicon was the Next.js starter icon** — now the church emblem (see §7).

### 🟠 Performance — Lighthouse 79 on production (9 Sep 2026)

Measured on the live Vercel site, incognito. Accessibility 96 → expected 100 after the contrast
fix above. Best Practices 100, SEO 100.

The score is dragged almost entirely by **TBT 670 ms** (Lighthouse weights it 30%), with 4.2 s of
main-thread work and 13 long tasks. Cause identified, fix NOT yet applied:

**`Reveal` is expensive twice over.** It pulls in Framer Motion (a **117 KB** chunk) for one
fade-and-slide, and — worse — it renders a plain tag, then flips `canAnimate` in `useEffect` and
**swaps the whole subtree to a `motion.*` component**. That is a full remount of every wrapped
section right after hydration: **10 on the homepage, 14 on /about**.

Replacing it with `IntersectionObserver` + a CSS transition is ~1 KB and visually identical.
**The hard constraint:** any replacement must keep the existing hydration gate — content is never
hidden unless JS has proven it can show it again (see §11.1; this fixed a real bug where sections
rendered blank). A naive `opacity: 0` in CSS reintroduces exactly that bug.

Deferred on 9 Sep 2026 at the user's request — too risky to attempt the night before a deploy.

### 🟠 Stale content

- **SPAMIC sits in `upcoming`** dated "Classes begin Saturday, 8 August 2026" — nearly a month
  past. It is a **July–September intake**, not a one-day event, so it may still be running;
  that is a judgement call for the church. Options: leave it, move it to `past`, or reword to
  *"August/September session, in progress"*. It is currently one of only two upcoming events,
  so it is conspicuous.
- **`/classes` seasons**: by the flyer's own schedule, P.L.T (Mar–May) and C.F.B.I (May–June)
  have finished for 2026. The page reads as a standing annual programme so it is not wrong, but
  "Admission is open" is doing a lot of work.

### 🟡 Known gaps

- **Class times unknown** — the flyer prints only the word "TIME".
- **Testimonies are unattributed** — no names were supplied. Note that testimony 1 describes a
  specific diagnosis and dates; attaching a name makes it identifiable health information, so
  get explicit consent separately from consent to share the testimony.
- **Instructor names missing** on `/classes` — the supplied text ended mid-sentence
  ("…staffers like …"). The sentence currently stops cleanly; fill `institute.workforce.names`
  and the clause appears.
- **Livestream** — `/watch` works off a manual sermon list. There is no live detection; the
  `/about` FAQ says livestream is "on the way".
- **No dark mode**, deliberately.
- **`priority` → `preload`** migration in `Hero.tsx` / `PageHero.tsx`.

### Local SEO note
The site's structured data is only half of it. **Google Business Profile almost certainly still
lists the old phone number.** Update it there too, or the mismatch undoes the consistency work.

---

## 13. Dead code and orphaned assets

Harmless, but do not mistake any of it for live code.

**Unused components** (defined, never imported):
- `app/components/about/HowWeFunction.tsx`
- `app/components/about/Vision.tsx`
- `app/components/home/LatestSermon.tsx` — parked; reads the dead `church.sermons`

**Unused export:** `DoorMarkIcon` in `icons.tsx` — was the site's mark before the real logo.

**Orphaned images** — 9 of the 43 files in `public/images/` are referenced by nothing and
are safe to delete:

```
Archbishop Sam-Amaga.png   Archbishop.jpg        Bishop-Hillary.png
Hero-Congregation.jpg      HeroImage2.jpg        technicalimage1.jpeg
technicalimage3.jpeg       ushering-department-image.jpg
salem-logo-1.png  <- KEEP: the untrimmed source artwork for salem-logo-nav.png
salem-logo-2.png  <- KEEP: the stacked lockup; its emblem is the favicon source (§7)
```

> ### ⚠ Before deleting ANY image, run the checker
>
> Deleting `event1.jpg` once broke the build. It looks like an orphan next to `Event1.jpeg`,
> but it is the fourth "A glimpse of us" tile, imported by `glimpseImages.ts`. Several
> filenames differ only by extension or capitalisation:
>
> | Looks like a duplicate | Reality |
> |---|---|
> | `event1.jpg` | **USED** — `glimpseImages.ts`, the school-band photo |
> | `Event1.jpeg` | **USED** — `eventImages.ts`, Covenant Week flyer |
> | `Archbishop.png` | **USED** — `leaderImages.ts` |
> | `Archbishop.jpg` | unused |
>
> Save this as `scripts/check-images.js` and run `node scripts/check-images.js`. It lists
> genuinely-unreferenced files AND catches case mismatches, which matter because **Windows is
> case-insensitive and Linux deploy hosts are not** — an import that works locally can 404 in
> production:
>
> ```js
> const fs = require("fs"), path = require("path");
> const IMG = "public/images";
> const onDisk = fs.readdirSync(IMG);
> const walk = (d, o = []) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) {
>   const p = path.join(d, e.name);
>   if (e.isDirectory()) walk(p, o); else if (/\.(ts|tsx)$/.test(e.name)) o.push(p); } return o; };
> const strip = s => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
> const refs = [];
> for (const f of walk("app"))
>   for (const m of strip(fs.readFileSync(f, "utf8")).matchAll(
>     /["'`][^"'`]*\/images\/([^"'`/]+\.(?:png|jpe?g|webp|avif|gif|svg))["'`]/gi))
>     refs.push({ name: m[1], file: f });
> const exact = new Set(onDisk), lower = new Map(onDisk.map(f => [f.toLowerCase(), f]));
> for (const r of refs) if (!exact.has(r.name))
>   console.log("MISMATCH", r.name, "->", lower.get(r.name.toLowerCase()) || "MISSING", r.file);
> const used = new Set(refs.map(r => r.name.toLowerCase()));
> console.log("unreferenced:", onDisk.filter(f => !used.has(f.toLowerCase())));
> ```
>
> It strips comments first — `EventsHero.tsx` and `LatestSermon.tsx` mention filenames in
> documentation examples that do not exist, and a naive grep reports those as broken imports.
**Naming leftovers:** the repo folder and `package.json` `name` are still `salem-rivers`, and
the design spec lives at `design-system/salem-rivers/`. Referenced by path in `AGENTS.md`,
`HANDOFF.md` and `CLAUDE.md`. Renaming is possible but touches several files for no user-visible
gain. The email `info@salemrivers.org` is a **real mailbox** — do not "fix" it.

---

## 14. Deploying

Static output, so anything that serves Next works — Vercel is the path of least resistance
(`next build`, zero config).

**Pre-deploy checklist**
1. `npx tsc --noEmit` — clean
2. `npm run build` — all 8 routes `○ (Static)` *(needs internet for fonts)*
3. `grep -rn "\[CONFIRM\|\[to be confirmed\|\[Describe" .next/server/app/*.html` — expect
   nothing once §12 is fixed
4. Check `upcoming` events — has anything passed?
5. Check the homepage wash rhythm if you reordered sections

**After deploying**, a content change is just an edit to `church.ts` plus a rebuild. That is the
whole point of the architecture: **one file, one rebuild, no CMS.**

---

*End of audit. If something here disagrees with a comment in the code, trust the code and fix
this document — the inline comments are closer to the decisions.*

---

## 15. Change log

Entries below are appended **automatically** by a Stop hook
(`.claude/hooks/log-changes.sh`, wired up in `.claude/settings.json`). It runs at the end of
every turn and records the date, the commit the work sits on, and the porcelain status of each
changed file.

**It records WHAT changed, not WHY.** A shell script cannot know that event cards moved to a
fixed 4:3 frame because flyer ratios span 5.4×. Reasoning, trade-offs and measurements belong
in the body of this document (§1–14) — the log is the index, the sections are the explanation.

Two things keep it from spamming: the audit excludes itself from the change set (or its own
append would re-trigger it forever), and a fingerprint in `.claude/.audit-log-state` means an
entry is written only when the set of changed files actually differs from the last one logged.
Uncommitted work therefore logs once, not once per turn.

To pause it: `/hooks`, or delete the `Stop` block from `.claude/settings.json`.

<!-- Entries are appended below this line. -->

### 2026-09-05 16:03 — 16 file(s) changed · at `6c077f4`

     M .gitignore
     M app/components/eventImages.ts
     M app/components/events/PastEvents.tsx
     M app/components/events/UpcomingEvents.tsx
     M app/components/home/NextEvent.tsx
     M app/content/church.ts
     M public/images/Event1.jpeg
     M public/images/Event2.jpeg
     D public/images/Event2.jpg
     M public/images/Thanksgiving.jpeg
     M public/images/going-beyond-your-fathers-event.jpeg
     M public/images/ignite-revival.jpeg
     M public/images/let-the-fire-fall-event.jpeg
     M public/images/spamic.jpeg
     M public/images/worship-experience.jpeg
    ?? .claude/


### 2026-09-05 16:38 — 17 file(s) changed · at `6c077f4`

     M .gitignore
     M app/components/eventImages.ts
     M app/components/events/PastEvents.tsx
     M app/components/events/UpcomingEvents.tsx
     M app/components/home/NextEvent.tsx
     M app/content/church.ts
     M public/images/Event1.jpeg
     M public/images/Event2.jpeg
     D public/images/Event2.jpg
     M public/images/Thanksgiving.jpeg
     M public/images/going-beyond-your-fathers-event.jpeg
     M public/images/ignite-revival.jpeg
     M public/images/let-the-fire-fall-event.jpeg
     M public/images/spamic.jpeg
     M public/images/worship-experience.jpeg
    ?? .claude/hooks/log-changes.sh
    ?? .claude/settings.json


### 2026-09-07 08:21 — 3 file(s) changed · at `cd100b2`

     M app/favicon.ico
    ?? app/apple-icon.png
    ?? app/icon.png


### 2026-09-07 11:39 — 4 file(s) changed · at `8f46065`

     M app/components/Footer.tsx
     M app/components/icons.tsx
     M app/content/church.ts
     M app/layout.tsx


### 2026-09-09 18:18 — 4 file(s) changed · at `68d6561`

     M app/components/Footer.tsx
     M app/components/home/GetInvolved.tsx
     M app/components/home/PastorWelcome.tsx
     M app/globals.css


### 2026-09-13 11:00 — 10 file(s) changed · at `34af62e`

     M app/components/Button.tsx
     M app/components/Footer.tsx
     M app/components/Header.tsx
     M app/components/about/AboutHero.tsx
     M app/components/about/FinalCta.tsx
     M app/components/events/UpcomingEvents.tsx
     M app/components/home/Hero.tsx
     M app/components/home/ReadyToJoin.tsx
     M app/give/page.tsx
     M app/visit/page.tsx

