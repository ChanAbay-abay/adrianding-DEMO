---
target: Six programs / two decades deep specializations section
total_score: 17
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
timestamp: 2026-09-01T05-10-40Z
slug: src-app-components-spec-reveal-cards-tsx
---
Method: dual-agent (A: design review · B: detector + browser evidence)

# Critique — "Six programs, two decades deep" specializations section

Targets: `src/app/_sections/specializations.tsx` + `src/app/_components/spec-reveal-cards.tsx`
Mode: Persuade (landing-page section). Heuristics 7 and 10 scored `n/a`.

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | No resting cue that 5 of 6 rows are interactive/collapsed — no chevron, "+", or hint; nothing on mobile. |
| 2 | Match System / Real World | 3 | Real program names, outcome-first copy, familiar accordion metaphor. |
| 3 | User Control and Freedom | 2 | One row is forced open; can't collapse all, can't compare two, can't preview on keyboard without committing. |
| 4 | Consistency and Standards | 1 | `rounded-3xl` vs the `--radius: 0.25rem` token; sans titles vs The Seasons serif everywhere else; white-on-photo vs committed-light; duplicates `LandingPaths`' device, weaker, 200px above it. |
| 5 | Error Prevention | 3 | Low stakes; a mis-hover just swaps the open row. |
| 6 | Recognition Rather Than Recall | 2 | Six titles visible, but comparing programs means hovering each in turn and holding the last one in memory. |
| 7 | Flexibility and Efficiency | n/a | Persuade surface. |
| 8 | Aesthetic and Minimalist Design | 2 | Six heavy photo bands + a triple-duration hover for "here are six topics," on an otherwise restrained page. |
| 9 | Error Recovery | 2 | `line-clamp-2` truncates blurbs with "…" even in the open state on mobile; the full sentence exists nowhere on the page. |
| 10 | Help and Documentation | n/a | Persuade surface. |
| **Total** | | **17 / 32** | **Acceptable (53%) — lower edge** |

## Design Specificity Verdict

**Start here: this section is category-interchangeable.** Everything below the `<SplitReveal>` heading is a generic "21st.dev hover-expand image card" — the component's own doc comment says so (*"adapted from the `HoverExpand` primitive / 21st.dev"*). An unrelated product could paste it in unchanged.

**LLM assessment (design review).** Concrete breaks from the Adrian Ding system, in order of loudness:
- `rounded-3xl` (~24px) on every card vs the site token `--radius: 0.25rem`. Nothing else on the page is this round — `about-teaser`, `gallery-preview`, `paths` all use square image frames.
- Sans-serif card titles (`font-semibold`) vs The Seasons serif on every other heading and card title on the page. **The section header is serif; the cards under it are not — the section contradicts itself.**
- White text over scrimmed photos vs the site's committed-light, `#222`-on-white editorial voice. The only other white-on-photo place is `LandingPaths`, ~200px below, which does the *exact same move* (white serif over full-bleed photography) with real conviction. This section reads as a timid rehearsal of the section that follows it.
- `gap-3` between fat rounded cards — neither the page's hairline rhythm nor generous whitespace.
- Six `placeholderImg()` Unsplash stock shots (a whiteboard, a microphone, laptops) while the credibility block directly above shows *real* logos and *real* numbers and the gallery below shows *real* rooms. "What he actually does" is the one section faking its photography.

**Does the interaction do the job?** No. The job: an HR/L&D buyer scans six distinct capabilities in one pass and concludes "he covers what we need." Instead five of six are dim bands with `line-clamp-2` copy and a barely-visible photo; you reveal one at a time; and revealing one yields **no new information** — same title, same two-line blurb, just a bigger stock photo. No link, no CTA, no grouping. The motion has a cost and no payoff.

**Deterministic scan.** `detect.mjs --json` on the two files: **exit 0, zero findings** — they pass the static detector outright. The in-page `detect.js` overlay reported 51 anti-patterns page-wide; ~24 map to this section: 12 × `low-contrast` (white text on `#f7f7f7`), 6 × `tight-leading` (`leading-tight` 1.25 on the `<h3>`), 6 × `image-hover-transform` (`group-hover:scale-[1.03]` on `<Image>`). The 12 contrast hits are **false positives as-rendered** — the detector can't see the `next/image` photo or the `from-black/85` scrim above the section background — but they point at a real fragility (see P2). `tight-leading` and `image-hover-transform` are real, low-severity.

**Visual overlays.** The detect.js overlay ran only inside a headless Playwright page that has since closed — there is **no persistent overlay in your browser** to look at. Screenshots were captured at 1440 and 402 (resting + expanded); findings below are from those.

## Overall Impression

The header is genuinely on-brand and the six one-liners are well-pitched B2B copy. Everything between them is an imported component that fights the site's identity, hides its own content behind serial hover, and — measurably — jitters the whole page when you mouse over it. Biggest opportunity: **stop competing with `LandingPaths` and go type-led** — a numbered editorial index makes all six capabilities legible at rest with zero interaction, and removes every contrast/motion/keyboard defect by construction.

## What's Working

1. **The section header is byte-for-byte consistent with its neighbours** — `font-serif text-[2.75rem] lg:text-[3.75rem] tracking-[-0.02em]`, `text-brand` on "two decades", the DrawSVG `rule` accent. Same treatment as `LandingCompanies` and `LandingGalleryPreview`. The problem starts one element down.
2. **The content model is right and already written.** Six clearly-named capabilities with outcome-first lines — "something to use, not just a feeling," "change behaviour, not just the mood," "the signal you send before you say a word." Correct register for L&D buyers.
3. **Accessibility scaffolding is above average for this pattern** — real `role="button"`, `tabIndex`, `aria-expanded`, `aria-label`, explicit Enter/Space handlers, `useReducedMotion()` on the height tween, `onFocus` opening rows so keyboard users aren't locked out. (It has gaps — see P2/P3 — but someone tried.)

## Priority Issues

### [P0] The section breaks the site's visual system
**What:** `rounded-3xl` cards, sans-serif titles, and white-text-over-scrim photo bands, inside a site built on `--radius: 0.25rem`, The Seasons serif headings, and `#222`-on-white committed-light.
**Why it matters:** the demo's whole pitch is a disciplined GQ / Architectural-Digest redesign. This section looks pulled from a component gallery, and it sits one scroll above `LandingPaths` doing the white-serif-over-full-bleed-photo move properly — so it reads as a weaker copy of the section below.
**Fix:** re-conceive type-led (see Recommended Design). If photos must stay short-term: square the corners (`rounded-[--radius]`), set titles in `font-serif`, align the gap to the hairline rhythm.
**Suggested command:** `/impeccable shape` (plan the redesign), then `/impeccable typeset` + `/impeccable layout`.

### [P1] The expand does nothing, and the content is trapped behind serial hover
**What:** at rest, 5 of 6 programs are dim bands with clipped one-liners and near-invisible photos, revealable only one at a time. Expanding a row just enlarges a stock photo — the blurb stays `line-clamp-2` and is *still* truncated with "…" in the open state on mobile ("…grow the people around…"). The full sentence exists nowhere on the page, even though `src/lib/specializations.ts` already carries a longer `detail` string per program.
**Why it matters:** buyers scan to match capabilities against a need. This forces serial exploration plus memory, and the interaction that costs motion + layout shift buys zero information.
**Fix:** make the resting state fully legible (all six titles + complete one-liners); demote the photo to a small fixed accent. On expand (or on a dedicated page) show the `detail` copy and add a "See how this runs →" link.
**Suggested command:** `/impeccable shape` or `/impeccable distill`; `/impeccable clarify` for the expanded copy.

### [P1] Hovering the stack visibly jitters the whole page
**What:** the row animates `height` (a layout property) on `motion.div`. Measured: baseline CLS ≈ 0.00003; **one hover = +0.086 CLS** across ~19 shift entries; **three hovers = 0.257 cumulative**. Sweeping the mouse down all six rows blows past Google's < 0.1 "good" budget on first interaction. Keyboard Tab additionally fires `onFocus`-expansion on every row (doesn't count as CLS because of `hadRecentInput`, but the target row keeps sliding away as you approach it), and the sticky navbar overlaps a row as it opens (no `scroll-mt`). The `group-hover:scale-[1.03]` image zoom is **not** gated by `prefers-reduced-motion` (only the height tween is), so reduced-motion users still get a 500ms zoom. Three uncoordinated durations per hover (0.42s height, 0.5s scale, 0.3s gradient).
**Why it matters:** page instability on hover is the kind of defect that undermines "premium" instantly; it fails Casey and Sam outright.
**Fix:** animate `grid-template-rows` `0fr→1fr` or a transform/`translateY` reveal instead of `height`; expand on Enter/Space only, not focus; gate the image zoom behind reduced-motion; add `scroll-mt-[calc(var(--nav-h)+…)]`; unify durations.
**Suggested command:** `/impeccable animate` (rebuild the reveal) + `/impeccable optimize` (CLS).

### [P2] Contrast is fine as-rendered but fragile, and the focus ring vanishes on light photos
**What:** text sits in the strongest part of the bottom scrim, so worst-case measured contrast is ~12.6:1 (title) / ~9.5:1 (blurb) over a near-white photo region — **passes AA**. But the card has **no solid fallback background**: on a slow connection or a 404 the text is literally white on `#f7f7f7` (~1.1:1, invisible). The `focus-visible:ring-white/80` ring disappears against the bright "Effective & Compelling Communications" and "Corporate Imaging" photos (WCAG 2.4.11), with no dark companion and no offset.
**Why it matters:** the load-failure path is a real blank-section risk in a demo that will be shown on hotel wifi; the focus ring gap locks out keyboard users on two of six rows.
**Fix:** give each card a solid near-black (or maroon) base fill behind the image; put the caption on a solid plate rather than trusting the gradient; give the focus ring a dark outer ring + `ring-offset-2`.
**Suggested command:** `/impeccable colorize` / `/impeccable polish`.

### [P2] Stale doc comment, placeholder images, and factually wrong alt text
**What:** the section JSDoc still describes *"a plain editorial row (sans-serif title + one line of copy, a hairline between)… hovering wipes a photo in"* — not what renders now (photo always present, no hairline); the build looks like a half-finished migration. `grep -r "placeholderImg" src/` must be empty before delivery (CLAUDE.md checklist) — it has six hits here. `keynotes` alt text = *"Adrian Ding on stage delivering a keynote to a full room"* on a generic Unsplash photo that is not Adrian.
**Why it matters:** the alt text is a factual misrepresentation to screen-reader users; the stale comment and placeholders are delivery blockers.
**Fix:** rewrite the comment to match; swap in real photography or set `alt=""` (the adjacent `<h3>` already labels each image) and drop `placeholderImg`; fix the keynote alt.
**Suggested command:** `/impeccable clarify` + `/impeccable harden`.

## Persona Red Flags

**Jordan (first-timer):** lands on six dark bands with **no affordance they're interactive** — no chevron, "+", or "hover to explore" on any of the five collapsed `[role="button"]` rows. Likely scrolls past thinking it's a photo montage. If they do hover, the payoff (bigger stock photo, same two clipped lines) teaches them nothing.

**Sam (a11y / keyboard / SR / contrast):** focus ring invisible on the two light photos, no non-colour indicator; Tab = forced expand + a ~15.5rem jump per row; `aria-expanded` announces a state change that exposes **no new content** (same title, same clamped blurb); `text-white/85` is borderline over the brighter photos; the `scale-[1.03]` image zoom ignores `prefers-reduced-motion`. `role="button"` wraps the `<h3>` so the title is announced twice, and six sibling buttons have no `role="list"` grouping.

**Casey (mobile, one-handed):** at 402px the collapsed rows are effectively **all-black rectangles** — a ~1–2rem photo sliver over 2 lines of title + 2 clamped lines of blurb, six near-identical bands. `COLLAPSED_H = 11.5rem` is too short for the mobile text block; at ≤360px a genuinely hidden third blurb line is cut. Tapping swaps which row is open and shoves the rest down; you can't close one, can't see two, get no pressed state. Even the *expanded* Leadership blurb is truncated.

**Riley (stress / scanning):** the resting state *is* the failure mode — six dark bands, five with clipped one-liners, differentiated only by a photo you can barely see. Under time pressure Riley cannot answer "which of these do I need" without hovering all six and holding each in memory. No "for individuals / for orgs" grouping, no links to go deeper.

## Minor Observations

- Header supporting paragraph floats top-right in the `lg:grid-cols-2` with a large void beneath it, ~600px from the heading — `companies` and `gallery-preview` (the sections it rhymes with) keep that line directly under the heading.
- `line-clamp-2` orphans "wins.", "stage.", "them." each alone on line 2 — tighten the blurbs to two balanced lines or one.
- HiDPI waste: `sizes="(min-width:1280px) 1216px, 100vw"` makes a 2× display pick the `w=3840` srcset entry and upscale a 1400px Unsplash master, ×6, even for collapsed 184px-tall crops. No `placeholder="blur"`.
- `active` resets to `0` on any remount — Leadership always re-opens regardless of the user's last choice.
- No list semantics on the six `role="button"` siblings.

## Questions to Consider

1. If you deleted the photos tomorrow, would this section be *worse* — or just honest about being a list?
2. Every other section that shows images uses real Adrian / real rooms. Why is "what he actually does" the one place with stock whiteboards and microphones?
3. What does a buyer *do* after reading these six? No link, no CTA — the section ends in `py-36` of empty padding right before the fork.
4. `LandingPaths` is 200px below doing white-serif-over-full-bleed-photo with conviction. Can both sections own that device, or does one yield?
5. "One row always open" — a considered choice, or a workaround because six collapsed black bands looked broken?

## Recommended Design

Two directions; both fix the P0/P1/P2 defects structurally rather than patching them.

### Direction A — "The Index" (type-led, photos as accents) — recommended

A numbered editorial index. Each program is a row: an oversized serif numeral `01`–`06` in maroon, the title in The Seasons, the full one-liner in the body face, a `border-border` hairline between rows. **No background photos.** On hover/focus the row does two quiet things — the hairline redraws in maroon (reuse the `SplitReveal` DrawSVG rule), and **one** small ~200px 4:3 photo for that program cross-fades into a **fixed slot** (right column on `lg`, pinned above the list on mobile). One deliberately-exposed image at a time, never six murky bands.

- **Why it fits:** matches committed-light / black-on-white / serif exactly; echoes the `LandingStats` "serif figure + caption" magazine feel it sits inside; shows real photography (when it lands) at a size that actually reads; and **stops competing with `LandingPaths`** — the bold full-bleed move stays that section's alone.
- **Interaction:** hover/focus → rule animates + fixed-slot image cross-fades (250ms). Because the image slot is fixed-height, **focus causes zero layout shift** and keyboard users can preview freely. Click/Enter → `/about#<program>` (or a future `/programs/<slug>`) where the long `detail` copy already lives. Reduced-motion: instant.
- **Layout / type / colour:** `lg:grid-cols-[1.1fr_0.9fr]`, list left / square-cornered sticky image frame right; single column + pinned image on mobile. Numerals `font-serif text-brand text-5xl lg:text-7xl tabular-nums`; titles `font-serif text-2xl lg:text-[1.75rem]`; one-liners `text-muted-foreground`; hairline dividers; `py-8 lg:py-10` per row. Zero scrims.

### Direction B — keep photography central, one deliberate frame

A left rail of six selectable program titles (plain serif list; active item maroon + drawn rule) and, on the right, **one** large 3:2 image + the full `detail` paragraph + a real CTA ("Bring this to your team →"). A proper `role="tablist"` with roving tabindex and arrow keys. Only ever one well-exposed photo, at the size it deserves, beside full copy — overview (all six titles always visible) *and* depth without serial hovering. Right-panel title on a **solid maroon caption bar**, not a gradient over the photo. Square-cornered frame. Mobile: titles become a horizontal chip/stepper above the panel.

**Pick A.** The site's identity is restraint and type; the credibility work is already done by the logo wall and the numbers directly above; the bold-photo gesture is owned by `LandingPaths` right below. A quiet numbered index differentiates six capabilities *faster* (everything legible at rest, zero interaction required) and removes every contrast/motion/keyboard defect by construction. Choose B only if the client insists the section must be photo-led *and* will supply six strong, consistent real photos.
