# Coach Adrian Ding — Demo Site

A full multi-page Next.js site built to pitch Coach Adrian Ding on a real rebuild of
adrianding.com. **This is a client-facing demo, not production** — every form, login, and
content list is frontend-only. Read this file before touching code, then read `PRD.md`
(scope, copy, and asset status — source of truth for what each page should say).

**Stack:** Next.js 15 · React 19 · Tailwind CSS 4 · TypeScript · Radix UI · GSAP 3 +
`@gsap/react` · Framer Motion (hero quote-reveal only) · React Hook Form + Zod · Lucide React

---

## Current Status

This repo is being shown to Adrian Ding for approval. **Nothing here is wired to a real
backend.** Once he signs off on direction and content, the team builds the CRM/CMS/auth
layer described below — do not start that work before approval, the page structure and
content shape may still change based on his feedback.

Routes shipped: `/` (landing), `/about`, `/workshops` + `/workshops/[slug]`,
`/corporate-training`, `/gallery` + `/gallery/[slug]`, `/staff-login`, `/email-templates`.

---

## What Still Needs Adrian Ding's Approval

Content is real-looking but **representative, not final** in these files. Every workshop
card, gallery event, and testimonial needs his input before it ships — don't treat any of
this as locked copy:

| File                                       | What's pending                                                                                                            |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `src/lib/workshops.ts`                     | Each workshop card + detail page: title, curriculum outline, inclusions, and **price** (`"Price on inquiry*"` until confirmed). Marked `TODO` inline. |
| `src/lib/gallery.ts`                       | Each past event (parent grid card + child page): name, date, blurb, photo set, and Adrian's "reflections" copy — written in his voice as a placeholder, not his actual notes. Marked `TODO` inline. |
| `src/lib/testimonials.ts`                  | Quotes are placeholders pending the real ones from `Coach_Adrian_Ding_Website_2025.pdf`.                                |
| `src/lib/companies.ts` / logo marquee      | 47 of 91 companies have no logo artwork and render as name chips — see `PRD.md` → **Companies Served — Roster**.       |
| `src/app/fonts/`                           | **The Seasons** and **Abramo** are web-sourced demo copies of commercial fonts — swap for licensed files (same filenames) before any real handoff. See `PRD.md` → **Fonts**. |

Before adding or editing a card in gallery/workshops/testimonials, check whether the change
is cosmetic (safe to make now) or content (needs AD's sign-off first) — when unsure, ask
rather than inventing details on his behalf.

---

## Backend / CRM / CMS — Not Yet Built

Everything below is UI only. This is the actual scope of work once Adrian Ding approves and
the team moves past the demo:

- **Workshops & gallery are static arrays**, not CMS-managed. `src/lib/workshops.ts` and
  `src/lib/gallery.ts` are the shape a future CMS schema should match — use them as the
  data contract when wiring a real CMS (fields, relations like `relatedWorkshop`, etc).
- **Registration forms don't submit anywhere.** `workshops/[slug]/_sections/registration-form.tsx`
  (workshop signup) and `corporate-training/_sections/*` (inquiry form) validate with Zod
  client-side only — no CRM write, no confirmation email. This is the natural CRM
  integration point (lead capture → CRM record).
- **`/staff-login` is a UI shell** — no auth provider, no session, no protected routes
  behind it. Needs real auth (and a reason to exist — confirm with AD what staff actually
  need to do there) before it's real.
- **`/email-templates` is copy/layout only.** The actual send-trigger wiring (e.g. Resend)
  is explicitly Phase 2 per the signed quote — not built here.
- **No payment/tracking.** Workshop pricing displays but nothing charges or records
  attendance.

When this becomes a real build: treat `src/lib/*.ts` as the CMS content model to replicate,
and the two forms above as the CRM lead-capture entry points. Don't retrofit a backend onto
the demo components directly without reviewing this list with the team first — some of this
UI (e.g. `/staff-login`) may not even be the right shape once real requirements land.

---

## Recreating This for a New Client

This repo started from Iridel's demo template. The same workflow builds the next one:

### 1. Fill in the PRD

Open `PRD.md` and fill in every field — client name, slug, brand color, story, stats,
testimonials, assets. This is the source of truth Claude reads before touching any code.

If you don't have all the details yet, give Claude what you do have and tell it which
fields to treat as placeholders:

```
Client: Meridian Health, slug meridian-health.
Brand: teal.
About: Healthcare analytics for hospital systems.
Story: Cuts manual reporting by 80%.
Stats: placeholder for now.
Assets: none yet — use Unsplash placeholders.
```

Claude will generate a complete filled-in PRD for you to review before building.

### 2. Get your photos

You need at least a hero image before the demo looks real. Two options:

**Option A — Unsplash (fast, dev only)**

Find a photo on [unsplash.com](https://unsplash.com), grab the ID from the URL:

```
https://unsplash.com/photos/3Mhgvrk4tjM
                              ↑ this is the photo ID
```

Use it in `page.tsx` as a placeholder:

```ts
import { placeholderImg } from "@/lib/images"
placeholderImg("3Mhgvrk4tjM", 1600, 700)
```

**Must be replaced before delivery.** Run `grep -r "placeholderImg" src/` — must return nothing.

**Option B — real assets**

Download client-provided images, then drop them flat into:

```
public/
  images/
    hero.jpg
    feature-1.jpg
    feature-2.jpg
```

Reference them in your section files:

```ts
import { localClientImg } from "@/lib/images"
localClientImg("client-slug", "hero.jpg")
// → "/images/hero.jpg"
```

### 3. Build the demo

With the PRD filled and assets in place, prompt Claude:

```
PRD is filled. Assets are in public/images/. Build the demo.
```

Claude will update `globals.css` (brand tokens), `layout.tsx` (metadata), create section
files in `src/app/_sections/`, and wire them in `page.tsx`.

### 4. Iterate

Make changes with targeted prompts — describe what changes, not what stays:

```
Change the hero heading to "Cut reporting time by 80%". Keep everything else.
```

```
Replace the FeatureGrid with a second FeatureRow on their AI assistant feature, image right.
```

### 5. Deliver

```bash
npm run validate
grep -r "placeholderImg" src/   # must be empty
grep -r "TODO" src/             # review all flagged placeholders — see approval table above
```

Visual check before sending the preview URL:

- Brand color looks right in light mode
- No cramped sections — whitespace should feel generous
- CTA banner is the last section
- Navbar shows the client name

---

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Per-Client Customization

Never edit `src/components/`. These paths change per client:

### `src/app/globals.css` — brand tokens

```css
:root {
  --brand: oklch(L C H); /* client brand color */
  --brand-foreground: oklch(0.985 0 0);
  --background: oklch(0.985 0.002 H); /* H: ~90 warm, ~0 neutral, ~250 cool */
  --radius: 0.625rem; /* 0.25rem square → 1rem rounded */
}
```

Common brand colors in OKLCH:

| Color  | OKLCH                  | Color  | OKLCH                  |
| ------ | ---------------------- | ------ | ---------------------- |
| Indigo | `oklch(0.55 0.22 265)` | Green  | `oklch(0.55 0.16 155)` |
| Blue   | `oklch(0.55 0.18 240)` | Orange | `oklch(0.62 0.18 55)`  |
| Teal   | `oklch(0.58 0.14 185)` | Purple | `oklch(0.52 0.22 300)` |
| Red    | `oklch(0.55 0.20 25)`  | Pink   | `oklch(0.60 0.20 340)` |

Update both `:root` and `.dark` — dark mode uses ~+0.07 lightness for the same hue.

### `src/app/layout.tsx` — metadata and fonts

```ts
export const metadata = {
  title: "Client Name — Demo",
  description: "One sentence about what this demo shows.",
}
```

### `src/app/_sections/*.tsx` and `src/app/<route>/_sections/*.tsx` — one file per section

All content (copy, stats, image paths, labels) lives inline in the section file that renders
it. Shared content lists (workshops, gallery events, companies, testimonials) live in
`src/lib/*.ts` instead, since multiple pages/cards read the same data — see the approval
table above before editing any of those.

### `src/app/page.tsx` and other `page.tsx` files — composition only

Imports and renders the section components. No strings or data here.

---

## Section Components — `src/components/common/`

| Component                      | Use for                                     |
| ------------------------------ | ------------------------------------------- |
| `HeroSection`                  | Page opener — always first after Navbar     |
| `FeatureRow`                   | Image + text deep-dive, alternate `reverse` |
| `StatGrid` / `StatItem`        | Key metrics — no card container             |
| `FeatureGrid` / `FeatureItem`  | Icon + heading + description grid           |
| `TestimonialCard`              | Pull-quotes with author attribution         |
| `CtaBanner`                    | Closing CTA — always last section           |
| `ImageCard`                    | Case studies, resources (16:9 image top)    |
| `Navbar`                       | Sticky top nav, start / center / end slots  |
| `DashboardGrid`                | Responsive widget/card grid                 |
| `EmptyState`                   | Empty list or table placeholder             |
| `PageContainer` / `PageHeader` | Inner-page shell and title block            |

UI primitives (`Button`, `Card`, `Input`, `Badge`, etc.) live in `src/components/ui/`.

Site-specific animation primitives (GSAP-based `reveal`, `split-reveal`, `marquee`,
`counter`, `countdown`, `timeline`, `testimonial-carousel`, `companies-marquee`) live in
`src/app/_components/` — all gate on `prefers-reduced-motion` via `gsap.matchMedia`.

---

## Scripts

```bash
npm run dev           # dev server
npm run build         # production build
npm run validate      # typecheck + lint + format check (run before delivery)
npm run lint          # ESLint
npm run format        # Prettier (write)
npm run typecheck     # TypeScript
```
