# Coach Adrian Ding (adrianding.com) — Demo PRD

> Frontend-only demo. Represents the full quote scope (QUO-2026-0002-v5) visually — CMS, CRM, auth, and payment tracking are shown as UI/forms, not wired to a real backend. Full build happens after demo approval. Organized by page, section-by-section, in build order: Landing → About → Gallery → Workshops → Corporate Training → global (Navbar/Footer) → Email Templates.

---

## Client

| Field    | Value |
| -------- | ----- |
| Name     | Coach Adrian Ding |
| Slug     | adrian-ding |
| Industry | Corporate Training, Leadership Coaching, Keynote Speaking |
| Website  | adrianding.com (existing, live — this is a remodel) |

---

## Brand

| Field      | Value |
| ---------- | ----- |
| Primary    | `#980F09` — deep maroon/wine red |
| Secondary  | `#222222` — near-black |
| Neutral    | `#FFFFFF` — white |
| Tone       | Classy, sophisticated, "GQ meets Architectural Digest" — relatable Boomers to Gen Z |
| Serif font | The Seasons (logo, key words/pull quotes) |
| Body font  | Red Hat Display |
| Accent font| Abramo (special callouts only) |

### Competitive Differentiation

**Rivals — what to notice and avoid**
| Name | Site | What their site leans on |
|---|---|---|
| Francis Kong | franciskong.com | Authority via decades of columns/books — content-library feel, less personality-forward |
| Anthony Pangilinan | anthonypangilinan.com | Media/TV personality branding, storytelling bio |
| Jayson Lo | jaysonlo.com | Book/framework-driven funnel (his "YOUnique" system), free worksheet as lead magnet |
| Boris Joaquin | borisjoaquin.com | Multi-channel hub (podcast + articles), "top ranked speaker" credential stacking |
| The Josh | *unclear — pending FB page link from Chan* | — |
| John Maxwell Team (Maxwell Leadership PH) | maxwellleadership.com.ph | Franchise/certification funnel, event-countdown urgency, borrowed global authority |

**Build note:** these mostly read as static, credential-heavy, template-driven. That's the gap to exploit — none of them move like a modern funnel site.

**Heroes — what to borrow (positioning/UX, not visuals)**
| Name | Site | What makes it work |
|---|---|---|
| Tony Robbins | tonyrobbins.com | High production value, bold single-CTA sections, event-ticket funnel energy |
| Robin Sharma | robinsharma.com | Minimalist, premium editorial feel — restraint reads as authority |
| Brendon Burchard | brendon.com | Video-first, masterclass/course funnel, high energy momentum |
| Ryan Leak | ryanleak.com | Personality-forward, keynote booking CTA always visible, story-led bio |

**Synthesis for Adrian's site:** personality-led like the heroes (not institution-led like the rivals), with momentum-driven UX — single CTA per section, smooth scroll, forms that pull you forward (Iman Gadzhi funnel-style, see UX Direction below).

---

## Context

**What they do:** Adrian Ding, CEO of Maximum Impact PH, is a leadership development coach and corporate trainer with 20+ years experience. Runs two revenue lines: corporate training/consulting for companies (80% of revenue) and public workshops for individuals (20%, growing focus).

**Why this demo:** Client-facing pitch demo per signed quote QUO-2026-0002-v5, to be approved before handoff to build team for full CMS/CRM implementation.

**Audience:** (1) HR heads / L&D decision-makers at PH corporations for the Corporate Training form. (2) Individual professionals (insurance, real estate, medical, retail, service industries) for Workshop registrations.

---

## Story

**The one thing this demo must communicate:** Adrian Ding's 20+ years training 20,000+ leaders across HSBC, Wipro, Petron, and more, now has a digital front door built to convert both corporate inquiries and public workshop signups.

**Section flow:**
Navbar → Hero → Stats → About/Bio → Areas of Specialization → Companies Served (marquee) → Successful Events Gallery → Testimonials → Workshops (open for registration) → Forms (Corporate Training + Workshop) → CTA/Footer

---

## UX Direction (applies globally, every page)

**Principle:** Seamless, momentum-driven flow — similar to Iman Gadzhi's funnel sites (Educate.io, GrowYourAgency), not a static brochure site.

- Single clear next-step CTA per section — never present the visitor with more than one decision at a time
- Smooth scroll with section-anchored navbar; scrolling should feel like progressing, not scanning
- Forms are multi-step, not a wall of fields upfront (Corporate Training + Workshop registration both apply). Reveal fields progressively, use large touch-friendly inputs
- Micro-interactions/transitions on scroll and hover to reinforce forward motion, not just static reveal
- Copy should pull the visitor forward ("what happens next") rather than dump information and wait for them to act
- Build note for Claude Code: treat this as a UX priority equal to visual design — the goal is that filling out a workshop form or corporate inquiry feels like the natural next step, not a chore

---

## Auth

Google login/signup is **staff-only**, for CRM/CMS access (managing form submissions, marking workshops as paid, publishing new workshops/gallery events). No public-facing user accounts in this phase. Represented in the demo as a static staff login screen — not functional.

---

## Build Order

1. Landing Page
2. About Page
3. Gallery Page (parent + child)
4. Workshops Page (parent + child)
5. Corporate Training Page
6. Global components (Navbar, Footer) — build alongside Landing, reused everywhere
7. Email Templates

---

## Page 1: Landing Page

Build top to bottom:

1. **Navbar** (global) — Logo (AD/Adrian Ding), links: About, Gallery, Workshops, Corporate Training, Contact. Sticky on scroll.
2. **Hero** — Scroll-locked two-stage GQ-cover narrative (`_sections/hero.tsx`, tuning in `_sections/hero-scroll.ts`). A `position: sticky` stage pins for ~3 screens; `scrollYProgress` → `p` drives every layer, so it also runs in reverse on scroll-up. Proximity scroll-snap clicks stage 1 / stage 2 into place; the released state snaps on `.hero-curtain`.
   - **Stage 1** — centred portrait (colour); giant dark-red "Adrian" (upper-left) / "Ding" (dropped, upper-right) wordmark, stacked high; roles list bottom-left (Corporate Trainer · Leadership Development Coach · Keynote Speaker · Inspirational Writer); credential stats bottom-right (20+ years · 20,000+ professionals trained · Top 500 companies in the Philippines); two large CTAs bottom-right — Corporate Training (outline, → `/corporate-training#inquiry`) / Workshops (deep maroon, → `/workshops`).
   - **Transition** (`NARRATIVE_VH`, short) — "Ding" rises level with "Adrian"; wordmark warms dark-red → brand maroon; portrait cross-fades to a grayscale cut; roles + stats clear; credential cover-lines fade in bigger, no logo boxes — orgs left (CEO Maximum Impact · Founder & Lead Coach, AET · Founder, CPD), dated timeline right (2021 INSEAD · 2017 Genos · 2004 T. Harv Eker); background scrim eases.
   - **Dwell** (`STAGE2_HOLD_VH`) — stage 2 sits fully formed, then the rest of the page slides up over the pinned hero and snaps flush (`.hero-curtain` in `globals.css`, `-100vh` = `CURTAIN_VH`).
   - Nav is the global `<SiteNavbar overHero />` (page.tsx), transparent over the hero → solid once the curtain rises. The hero carries no nav of its own.
   - Cursor parallax stacks depth: bg drifts against the pointer, wordmark barely moves with it, portrait travels most (pointer-fine only). Reduced motion → static resolved stage-2 composition, no pin, curtain margin reset.
   - **Mobile:** functional but a dedicated pass is owed — cover-line columns stack, wordmark can kiss the right edge, roles/stats sit over the portrait.
3. **Stats bar** — 20+ Years in the Training Circuit | 20,000+ Professionals Trained | Top 500 PH Companies Trained | 9+* Industries Served (`*` placeholder pending confirmation)
4. **CTA** — "Ready to build a winning culture?" Two paths: Inquire for Corporate Training / Register for a Workshop
5. **Links to Workshop Page / Corporate Training** — quick-nav cards, one per path, funneling to their respective pages
6. **Companies Served by category** — animated/moving marquee, categorized (Multi-nationals, Mega-corporations, Finance, Real Estate, Hotels & Resorts, Food & Retail, SMEs & Family Businesses, Schools & Universities, Associations)
7. **Areas of Specialization** (capabilities grid, 6 items) — Leadership Training & Development, Inspirational Keynotes, Building Winning Cultures & High-Performing Teams, Effective & Compelling Communications, Train the Trainer + Coach the Coaches, Corporate Imaging & Personal Branding
8. **Testimonials** — carousel/slider, all 8 (Wipro, Global Payments, Rose Pharmacy, Knowles, Global Pacific, HSBC, PETDA, Rotary International). Full quotes in Coach_Adrian_Ding_Website_2025.pdf — copy verbatim from source, don't paraphrase.
9. **Footer** (global) — see Global Components below

---

## Page 2: About Page

1. **Story/Bio** — narrative pulled from deck ("2 things I love: coffee and developing people..." belief statement on better people → better companies → better country). Reference source deck for exact copy.
2. **Background & Certifications** — timeline: 2004 T. Harv Eker Peak Potentials (Train the Trainer Cert), 2017 Genos Emotional Intelligence Coaching Practice, 2021 INSEAD Bachelor of Arts in Mass Communication (Execution Education Programme)
3. **MVC (Mission/Vision/Values)** — not present in current resources. Omit section unless Chan supplies this content.
4. **Areas of Specialization** (detailed version, expands on landing page teaser)
5. **CTA** — same dual-path pattern as landing (Corporate Training / Workshops)
6. **Footer** (global)

---

## Page 3: Gallery Page

### Parent (`/gallery`)
- Grid of all past events/workshops, each card: thumbnail, event name, date, short description
- Optional filter by year
- Each card links to its child page
- CTA at bottom → Workshops page (upcoming)

### Child (`/gallery/[event-slug]`)
- Event hero image + title + date
- Full description
- Photo gallery (grid/lightbox)
- CTA → related upcoming workshop if applicable, else → Workshops page

> Assets pending — Chan to source as demo progresses. Lowest build priority per earlier confirmation, but included in Phase 1.

---

## Page 4: Workshops Page

### Parent (`/workshops`)
- List of all workshops, distinguishing "Open for Registration" vs "Past"
- Each card: name, date, venue, price, short description, CTA button
- Currently known workshops:
  - **Exceptional Salesmanship** — Oct 9, 2026, 9:00–5:00 PM, SEDA Ayala E-bloc. Price: ₱[placeholder]*
  - **Exceptional Leadership** — Oct 16, 2026, 9:00–5:00 PM, SEDA Ayala E-bloc. Price: ₱[placeholder]*

### Child (`/workshops/[workshop-slug]`)
- Full workshop details: date, time, venue, price, curriculum outline (from source deck), inclusions (training manual, certificate, AM/PM snacks + lunch, 30-day post-training mechanism, online reunion), highlights (targeted audience, format)
- Primer/teaser video slot (placeholder)
- **Workshop Registration Form** — multi-step per UX Direction. Fields: Name, Number, Email, Occupation, Salary range, City (optional), consent checkbox. Frontend only — no backend in this phase.
- Payment details section (bank/QR placeholder), reflecting the intended flow: user submits form → receives confirmation email with payment details → replies in-thread with proof of payment → staff manually reviews and marks as PAID in CRM → user receives payment confirmation email. Represented as static UI in this phase, not functional.

> `*` Pricing not yet provided — asterisked placeholder, no functioning CMS in this phase.

---

## Page 5: Corporate Training Page

*(Not explicitly listed by Chan but required — this is 80% of Adrian's revenue per quote and needs its own funnel, distinct from Workshops.)*

1. **Intro/hero-lite** — positions corporate training as the primary offering
2. **Why Corporate Training** — value prop tied to stats (20,000+ trained, Top 500 companies)
3. **Areas of Specialization** (capabilities grid, reused component)
4. **Companies Served** (reused marquee component)
5. **Testimonials** (corporate-specific selection — Wipro, HSBC, Global Payments, Global Pacific)
6. **Corporate Training Inquiry Form** — multi-step. Fields: Name, Number, Email, Company, Occupation/Role. Frontend only.
7. **Footer** (global)

---

## Global Components

### Navbar
Logo, links to About / Gallery / Workshops / Corporate Training / Contact. Sticky, smooth-scroll anchors where applicable.

### Footer
Contact info (coachadrianding@maximumimpact.online, 0920.900.7709), social links (Instagram, LinkedIn, Facebook, TikTok), quick nav links, copyright.

### Contact
No standalone contact page needed at this phase — contact info lives in footer + is reinforced at each form's confirmation step. Revisit if Chan wants a dedicated page later.

### Data Privacy
Consent checkbox (PH Data Privacy Act) on both Workshop Registration and Corporate Training Inquiry forms. No separate TOS page needed for this phase.

---

## Email Templates (client-facing — build ahead, for Chan's review before handoff)

### 1. Workshop Registration Confirmation
**Trigger:** Immediately after Workshop Registration Form submission
**Contents:** Confirmation of registration, event summary (name/date/time/venue), payment instructions + bank/QR placeholder, reminder to reply to the same email thread with proof of payment, optional primer/teaser video embed, contact info for questions

### 2. Payment Confirmation
**Trigger:** Staff manually marks registrant as PAID in CRM
**Contents:** Payment confirmed, event reminder (date/time/venue), event-specific primer/teaser video, what to bring/expect, contact info

### 3. Corporate Training Inquiry Acknowledgment
**Trigger:** Immediately after Corporate Training Inquiry Form submission
**Contents:** Acknowledgment of inquiry received, expected turnaround for staff follow-up, brief reinforcement of credibility (stat or two), contact info

> All three are frontend/copy deliverables for this phase — actual send-trigger wiring (Resend integration) is Phase 2. Build the copy and layout now since these are client-facing and Chan needs them ready ahead of time.

---

## Assets

Images live flat in `public/images/` (no subfolders — per Iridel template convention).

| Filename | Used in | Status |
| -------- | ------- | ------ |
| `ad-hero-portrait.png` (1080×1720, transparent) | Landing Hero — stage-1 colour cut; grayscale-filtered for the stage-2 mono | ✅ real |
| `ad-hero-portrait-mono.png` (1080×1720) | Delivered mono cut — **unused**: it's a flat white-backed photo, so the hero grayscales the transparent cut instead. Re-export with transparency to use it. | ⚠️ on file, not wired |
| `ad-hero-bg.png` (1920×1080) | Landing Hero — B&W background plate behind the two-stage narrative | ✅ real |
| `ad-logo-black.png` / `ad-logo-white.png` | Navbar / hero lockup (hero uses white) | ✅ real |
| `ad-photo-1.png` / `ad-photo-2.png` / `ad-photo-3.png` | About / secondary | ✅ real (unplaced) |
| `maximum-impact-logo.png` / `aet-logo.png` / `cpd-logo.png` | Hero stage 2 — org credential badges (CEO / Founder). Renamed from spaced filenames; backgrounds knocked out to transparent, rendered white-silhouette on the dark plate. `maximum-impact` is a clean mark; `aet` reads; `cpd` is an embossed wordmark that silhouettes patchily. | ⚠️ transparent, mixed quality |
| `insead-logo.png` / `genos-logo.png` / `trainer-logo.png` | Hero stage 2 — dated timeline badges. Transparent now. `insead` silhouettes clean; **`genos` is a certification badge graphic and `trainer` is a full certificate scan — they silhouette to white blobs.** Need real vector logos. | ⚠️ transparent; genos/trainer unusable as marks |
| `images/logos/*` | Companies Served marquee | ⚠️ mixed — several files have URL-junk names, one 17 MB jpg, one stray `.html`; needs a cleanup pass before wiring the marquee |
| bio-coffee-shot | About | [ ] pending |
| event-gallery-* | Gallery | [ ] pending |

### Fonts (installed — `src/app/fonts/`, wired in `src/app/layout.tsx`)

| Role | Font | Source | Var |
| ---- | ---- | ------ | --- |
| Serif / display (logo, headings, wordmark) | **The Seasons** (Regular + Bold) | web-sourced woff2 | `--font-the-seasons` → `font-serif` |
| Body | **Red Hat Display** (300–900) | `next/font/google` | `--font-red-hat` → `font-sans` |
| Accent (callouts only) | **Abramo** Serif | web-sourced woff2 | `--font-abramo` → `font-accent` |

> The Seasons + Abramo are commercial faces; the installed woff2 are web-download copies for the
> demo. Swap in licensed files (same filenames) before client handoff.

---

## Delivery

| Field  | Value |
| ------ | ----- |
| Format | Vercel preview URL |
| Notes  | Demo represents full quote scope visually (CMS/CRM/auth/payment tracking as static UI). No real backend, database, or integrations in this phase. Approval unlocks Phase 2 full build. |