# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/salem-rivers/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Salem Rivers (Nigerian Pentecostal church · Port Harcourt, Rivers State)
**Category:** Church / Religious Organization
**Style:** Accessible & Ethical (WCAG AAA targets)

> **Human-refined from the UI-UX-Pro-Max generator.** The generator proposed a *Community/Forum*
> pattern, *Fredoka* display type, and a cold lilac background — all overridden. Reasons:
> - **Pattern:** This homepage is "the trailer" funnelling to a *physical visit* (see architecture
>   doc / `pages/home.md`), not an online-community signup. The architecture doc is authoritative.
> - **Type:** Fredoka reads as a children's/gaming font. Swapped to **Fraunces** (warm, reverent
>   old-style serif) for headings; kept **Nunito** (warm, readable) for body.
> - **Color:** Warmed the neutrals (ivory, not cold lilac) and committed to a **royal purple + warm
>   gold** identity — "royal priesthood / celebration", fitting and distinctive for this church.

---

## Global Rules

### Color Palette — Light (default)

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary (royal purple) | `#6D28D9` | `--color-primary` |
| Primary Hover | `#5B21B6` | `--color-primary-hover` |
| On Primary | `#FFFFFF` | `--color-on-primary` |
| Secondary | `#8B5CF6` | `--color-secondary` |
| Accent (warm gold, accessible) | `#B45309` | `--color-accent` |
| On Accent | `#FFFFFF` | `--color-on-accent` |
| Gold Bright (decorative on dark only) | `#E0A82E` | `--color-gold-bright` |
| Background (warm ivory) | `#FFFCF7` | `--color-background` |
| Surface / Card | `#FFFFFF` | `--color-card` |
| Foreground (deep warm plum) | `#2A1A33` | `--color-foreground` |
| Muted | `#F4EEE6` | `--color-muted` |
| Muted Foreground | `#6B5B73` | `--color-muted-foreground` |
| Border (warm) | `#E8DDCF` | `--color-border` |
| Destructive | `#DC2626` | `--color-destructive` |
| Ring (focus) | `#6D28D9` | `--color-ring` |
| WhatsApp (brand) | `#25D366` | `--color-whatsapp` |

### Color Palette — Dark

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Background | `#18101F` | `--color-background` |
| Surface / Card | `#241531` | `--color-card` |
| Foreground | `#F5EFE6` | `--color-foreground` |
| Primary (lightened) | `#A78BFA` | `--color-primary` |
| Accent (gold) | `#E0A82E` | `--color-accent` |
| Muted | `#2A1C36` | `--color-muted` |
| Muted Foreground | `#B9A9C4` | `--color-muted-foreground` |
| Border | `rgba(255,255,255,0.10)` | `--color-border` |

**Contrast verified:** white on `#6D28D9` ≈ 6.8:1; `#2A1A33` on `#FFFCF7` ≈ 14:1; `#6B5B73` on white
≈ 5.3:1 (secondary text). Test dark mode independently.

### Typography

- **Heading Font:** Fraunces (warm old-style serif; weights 500/600, optical sizing for display)
- **Body Font:** Nunito (warm humanist sans; weights 400/600/700)
- **Mood:** warm, welcoming, trustworthy, a touch of reverence — alive, not stiff
- **Loading:** self-host via `next/font/google`, `display: swap`, subset `latin`, only the weights above.
- **Type scale:** 12 · 14 · 16 (body base) · 18 · 24 · 32 · 40 · 56. Body line-height 1.6.

### Spacing (4/8px rhythm)

`--space-xs 4` · `--space-sm 8` · `--space-md 16` · `--space-lg 24` · `--space-xl 32` ·
`--space-2xl 48` · `--space-3xl 64` · `--space-4xl 96` (section vertical rhythm on desktop).

### Radius & Shadow

- Radius: `--radius-sm 8px` · `--radius-md 12px` · `--radius-lg 20px` · `--radius-pill 999px`.
- Shadows (warm-tinted, soft): `sm 0 1px 2px rgba(42,26,51,.06)` · `md 0 4px 12px rgba(42,26,51,.08)`
  · `lg 0 12px 28px rgba(42,26,51,.12)` · `xl 0 24px 48px rgba(42,26,51,.16)`.

---

## Component Specs (Tailwind v4 / token-driven)

- **Button / primary:** bg `--color-primary`, text `--color-on-primary`, radius pill, `font-semibold`,
  `px-6 py-3`, `cursor-pointer`, transition 200ms; hover → `--color-primary-hover` + `-translate-y-px`
  (no layout shift); visible focus ring (`--color-ring`, 3px offset). This is the **"Plan Your Visit"** CTA.
- **Button / secondary (WhatsApp):** bg white / outline, text `--color-foreground`, border `--color-border`,
  optional WhatsApp-green icon. Visually subordinate to primary.
- **Card:** bg `--color-card`, radius `--radius-lg`, border `--color-border`, shadow `md` → `lg` on hover.
- **Eyebrow / overline:** Nunito 700, 12–13px, letter-spacing 0.08em, color `--color-accent` (gold).
- **Input:** 16px text (no iOS zoom), 44px+ height, label always visible, focus ring `--color-ring`.

---

## Style Guidelines

**Style:** Accessible & Ethical — High contrast, 16px+ text, keyboard nav, screen-reader friendly,
WCAG AAA target, clear focus states, semantic HTML.
**Key Effects:** Clear focus rings (3–4px), ARIA labels, skip links, responsive, reduced-motion,
44×44px touch targets, soft warm shadows, gentle 150–300ms transitions.

### Page Pattern (church-specific — overrides generator)

**"First-Visit Funnel"** — every section ends pointing at **Plan Your Visit**; WhatsApp is the persistent
fallback (floating button + hero). Livestream is kept visually subordinate. No section is a dead end.
Per-page section orders live in `pages/*.md` (start with `pages/home.md`).

---

## Anti-Patterns (Do NOT Use)

- ❌ **AI purple/pink gradients** — purple is the brand, but no lazy violet→pink gradient washes.
- ❌ **Cold/clinical neutrals** — keep backgrounds warm (ivory), never blue-gray.
- ❌ **Autoplay video / heavy hero** — hero is a strong still (mobile-first, patchy data).
- ❌ **Emojis as icons** — use SVG (Lucide/Heroicons), one consistent set.
- ❌ **Missing cursor-pointer**, **layout-shifting hovers**, **low-contrast text (<4.5:1)**,
  **instant (0ms) state changes**, **invisible focus states**.
- ❌ **Livestream as a co-equal CTA** — it is always the fallback.

---

## Pre-Delivery Checklist

- [ ] No emojis as icons; one consistent SVG icon set
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover/focus states, smooth 150–300ms transitions
- [ ] Text contrast ≥ 4.5:1 (light AND dark, tested separately)
- [ ] Visible keyboard focus; logical tab order; skip link
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive 375 / 768 / 1024 / 1440; no horizontal scroll
- [ ] Images via Next `<Image>`, WebP, sized, lazy below fold; sub-3s on throttled 3G
- [ ] No content hidden behind the fixed navbar; safe spacing for floating WhatsApp button
