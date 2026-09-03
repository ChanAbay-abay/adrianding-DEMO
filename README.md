# Coach Adrian Ding — Demo Site

A full multi-page Next.js site built to pitch Coach Adrian Ding on a real rebuild of
adrianding.com. **This is a client-facing demo, not production** — every form, login, and
content list is frontend-only. Read this file before touching code, then read `PRD.md`
(scope, copy, and asset status — source of truth for what each page should say).

**Stack:** Next.js 15 · React 19 · Tailwind CSS 4 · TypeScript · Radix UI · GSAP 3 +
`@gsap/react` · Framer Motion (hero quote-reveal only) · React Hook Form + Zod · Lucide React

---

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No environment variables, no backend.

---

## Current status

This repo is being shown to Adrian Ding for approval. **Nothing here is wired to a real
backend.** Once he signs off on direction and content, the next phase builds the CRM/CMS/auth
layer described below.

Routes shipped: `/` (landing), `/about`, `/workshops` + `/workshops/[slug]`,
`/corporate-training`, `/gallery` + `/gallery/[slug]`, `/staff-login`, `/email-templates`.

| Route | Sections |
| --- | --- |
| `/` | editorial hero · companies marquee · specializations · paths · stats · workshops-open · quote-reveal · testimonials · CTA |
| `/about` | hero · story · journey/timeline · certifications · FAQ |
| `/workshops` | hero · list (calendar) |
| `/workshops/[slug]` | overview · details · registration form/dialog · register CTA |
| `/corporate-training` | hero · why · companies · programs · testimonials · inquiry form/CTA |
| `/gallery` | floating wall grid |
| `/gallery/[slug]` | event hero · photo wall |
| `/staff-login` | UI shell only — see below |
| `/email-templates` | copy/layout preview only — see below |

---

## What still needs Adrian Ding's approval

Content is real-looking but **representative, not final** in these files. Every workshop
card, gallery event, and testimonial needs his input before it ships — don't treat any of
this as locked copy.

| File | What's pending |
| --- | --- |
| `src/lib/workshops.ts` | Each workshop card + detail page: title, curriculum outline, inclusions, and **price** (`"Price on inquiry*"` until confirmed). |
| `src/lib/gallery.ts` | Each past event (parent grid card + child page): name, date, blurb, photo set, and Adrian's "reflections" copy — written in his voice as a placeholder, not his actual notes. |
| `src/lib/testimonials.ts` | Every quote is a placeholder pending the real ones from `Coach_Adrian_Ding_Website_2025.pdf`. No headshots supplied yet. |
| `src/lib/timeline.ts` | Founding year and milestone wording need confirmation. |
| `src/app/about/_sections/certifications.tsx` | Confirm the exact accrediting-body names and years (AET / CPD). |
| `src/app/_sections/stats.tsx` | Industry count is a placeholder pending client confirmation. |
| `src/lib/companies.ts` / logo marquee | 47 of 91 companies have no logo artwork and render as name chips — see `PRD.md` → **Companies Served — Roster**. |
| `src/app/fonts/` | **The Seasons** and **Abramo** are web-sourced demo copies of commercial fonts — swap for licensed files (same filenames) before any real handoff. See `PRD.md` → **Fonts**. |

Before editing a card in gallery/workshops/testimonials, check whether the change is
cosmetic (safe to make now) or content (needs AD's sign-off first) — when unsure, ask rather
than inventing details on his behalf.

---

## Backend / CRM / CMS — not yet built

Everything below is UI only. This is the actual scope of work once Adrian Ding approves:

- **Workshops & gallery are static arrays**, not CMS-managed. `src/lib/workshops.ts` and
  `src/lib/gallery.ts` are the shape a future CMS schema should match — use them as the data
  contract when wiring a real CMS (fields, relations like `relatedWorkshop`, etc).
- **Registration forms don't submit anywhere.** `workshops/[slug]/_sections/registration-form.tsx`
  (workshop signup) and `corporate-training/_sections/*` (inquiry form) validate with Zod
  client-side only — no CRM write, no confirmation email.
- **`/staff-login` is a UI shell** — no auth provider, no session, no protected routes behind
  it. Needs real auth (and a reason to exist — confirm with AD what staff actually need to do
  there) before it's real.
- **`/email-templates` is copy/layout only.** The actual send-trigger wiring (e.g. Resend) is
  explicitly Phase 2 per the signed quote — not built here.
- **No payment/tracking.** Workshop pricing displays but nothing charges or records
  attendance.

Treat `src/lib/*.ts` as the CMS content model to replicate, and the two forms above as the
CRM lead-capture entry points.

---

## Architecture

```
src/
  app/
    page.tsx                composition only, no copy
    layout.tsx               metadata + fonts
    globals.css              design tokens + custom utilities
    _sections/*.tsx           homepage sections
    _components/*.tsx         site-wide chunks (navbar, footer, CTA, GSAP primitives)
    about/ workshops/ workshops/[slug]/
    corporate-training/ gallery/ gallery/[slug]/
    staff-login/ email-templates/
      page.tsx                route metadata + composition
      _sections/*.tsx          that route's sections
  components/
    common/                  shared marketing/dashboard components (template)
    ui/                      primitives (shadcn-style)
  lib/                       companies.ts, gallery.ts, specializations.ts, testimonials.ts,
                             timeline.ts, workshops.ts, images.ts, utils.ts
public/images/               gallery/, hero/, icons/, logos/, mascot/ — subfoldered, not flat
```

Two rules carried from the template that still hold:

1. **`page.tsx` files carry no copy.** Imports, metadata, and composition only.
2. **Don't edit `src/components/`.** Content changes happen in `_sections/*.tsx` or `src/lib/*.ts`.

### Where content lives

- **Page-specific copy** (hero headings, one-off sections) is inline in that route's
  `_sections/*.tsx` file.
- **Shared/repeated content** (workshops, gallery events, companies, testimonials, timeline,
  specializations) lives in `src/lib/*.ts` instead, since multiple pages or cards read the
  same data — see the approval table above before editing any of those.

### Notable custom pieces (not template scaffolding)

Live in `src/app/_components/` and `src/app/_sections/`, built specifically for this demo:

- `hero-editorial.tsx` — the current landing hero: giant top-left wordmark, cover lines,
  bottom-left CTA. Replaced an earlier scroll-pinned hero (deleted, along with the old
  `/hero-lab` route).
- `quote-reveal.tsx` — collision-proof responsive portrait/quote layout on the homepage.
- `spec-reveal-cards.tsx`, `split-reveal.tsx`, `text-sweep-reveal.tsx`, `reveal.tsx` — GSAP
  scroll-reveal primitives, all gated on `prefers-reduced-motion` via `gsap.matchMedia`.
- `companies-marquee.tsx` — the "You're in great company" logo marquee.
  **Do not edit this file, even for small audit fixes** — it's been tuned and is fragile to
  touch; if something looks off, flag it rather than patching it directly.
- `workshops-calendar.tsx`, `event-cards.tsx`, `timeline.tsx`, `counter.tsx`,
  `countdown.tsx`, `marquee.tsx` — supporting motion/data-display pieces used across
  workshops, gallery, and about.
- `bloom-field-background.tsx`, `floating-copy.tsx` — decorative background/copy effects.

---

## Design system

### Colour

Tokens live in `src/app/globals.css`. Brand is a deep maroon/wine (`#980F09`).

| Token | Value | Notes |
| --- | --- | --- |
| `--brand` | `oklch(0.4331 0.1689 29.22)` | `#980F09`, primary buttons/links |
| `--brand-accent` | `oklch(0.615 0.23 29.22)` | Same hue, lifted for legibility as an inline accent word on the cream quote sheet — too light to double as `--brand` |
| `--brand-accent-dark` | `oklch(0.72 0.15 29.22)` | Dark-mode variant of the accent |
| `--radius` | `0.25rem` | Near-square |

Dark mode lifts `--brand` to `oklch(0.53 0.17 29.22)` (~+0.10 L) for contrast against a dark
ground. Both light and dark tokens are defined — check both before shipping a color change.

### Buttons

Glow and border color must shift on hover together with the fill — not just the fill alone.
Check this specifically on any button variant you touch.

### Hover states

Gallery/photo tile hover should only scale the tile up. Never dim or white-out sibling tiles
on hover — that reads as a bug, not an effect.

---

## Images

`public/images/` is subfoldered (`gallery/`, `hero/`, `icons/`, `logos/`, `mascot/`) — this
diverges from the base template's flat rule because of the volume of company logos and
per-event gallery photos. Company logo files are named `co-<slug>.<ext>`.

`grep -rn "placeholderImg" src/` currently returns 14 hits — these are the Unsplash
stand-ins in `src/lib/specializations.ts` and elsewhere pending real client photography.
Confirm each one against `PRD.md` before delivery.

---

## Before this goes to the client for final delivery

- [ ] Replace placeholder testimonials, quotes, and workshop prices — see the approval table
      above.
- [ ] Swap `The Seasons` / `Abramo` font files for licensed copies (same filenames) in
      `src/app/fonts/`.
- [ ] Fill in the 47 missing company logos or confirm the name-chip fallback is acceptable.
- [ ] Confirm founding year / milestones in `src/lib/timeline.ts`.
- [ ] Confirm AET/CPD accrediting-body names and years in `about/_sections/certifications.tsx`.
- [ ] Resolve all 14 `placeholderImg` calls with real photography.
- [ ] Decide scope and timeline for the CRM/CMS/auth work described above — not part of this
      demo's delivery.

```bash
npm run validate                # typecheck + lint + format check
grep -rn "TODO" src/            # every hit maps to a row in the approval table above
grep -rn "placeholderImg" src/  # must be empty before delivery
grep -rn "<img" src/            # must be empty — next/image only
```

---

## Scripts

```bash
npm run dev           # dev server
npm run build         # production build
npm run validate      # typecheck + lint + format check (run before delivery)
npm run lint          # ESLint
npm run lint:css      # Stylelint
npm run format        # Prettier (write)
npm run typecheck     # TypeScript
```
