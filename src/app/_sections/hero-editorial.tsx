"use client"

import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { gsap, useGSAP, EASE, DUR } from "@/app/_lib/gsap"

/**
 * Hero option #7 — "Editorial cover".
 *
 * A single full-screen frame in the GQ / Architectural Digest register, modelled
 * on the Jasmine Star cover treatment:
 *
 *   - `ad-bg-2.png` fills the frame (the file already carries a mono grade); a
 *     light scrim + vignette keep the white type legible.
 *   - The portrait cut-out sits right-of-centre, magazine-cover-subject style,
 *     with the wordmark's tail running over its shoulder.
 *   - "Adrian Ding" is set as one enormous serif line in the TOP-LEFT (it runs
 *     into the portrait, cover-style), with the belief-statement tagline and the
 *     social icons stacked right under it.
 *   - The role list (coach / trainer / speaker / writer) sits in the BOTTOM-LEFT
 *     above one CTA button that anchors to the page's #cta section (built later —
 *     it will branch to workshop registration vs. corporate-training contact).
 *
 * Nav is split like the reference: a minimal top row (one Register CTA) that
 * scrolls away with the hero, plus the main link bar which sits at the hero's
 * bottom edge and then pins to the top of the viewport for the rest of the page.
 *
 * That pin is pure CSS — no scroll listener. The `<nav>` is a sibling *after*
 * the hero with `margin-top: calc(var(--nav-h) * -1)`, so its natural position
 * is the hero's bottom edge; `position: sticky; top: 0` then lets it rise with
 * the scroll and lock at the top. Its containing block is the page `<main>`, so
 * it stays locked past the hero. The hand-off frame is seamless because the bar
 * is exactly `--nav-h` tall — at the lock frame the hero's bottom edge and the
 * bar's bottom edge coincide. (cf. lessons.md 2026-08-09 — sticky, not a JS
 * position state-machine.)
 *
 * NOTE (hero restart, this pass): the previous two-stage pinned narrative —
 * portrait colour->mono, "Ding" rising to align, the org / dated-timeline
 * credential-badge reveal, and the `.hero-curtain` page-rise — is intentionally
 * dropped here. That credential content has no home in this direction yet.
 *
 * No scroll pin, no `.hero-curtain`, no scroll-snap. Reduced motion -> the
 * resolved composition, painted immediately.
 *
 * Assets (flat in public/images/): ad-bg-2.png · ad-hero-portrait.png ·
 * ad-logo-white.png
 */

const TAGLINE = "Better people build better companies —"
const TAGLINE_2 = "better companies build a better country."

const SOCIALS = [
  { label: "Instagram", Icon: Instagram },
  { label: "Facebook", Icon: Facebook },
  { label: "LinkedIn", Icon: Linkedin },
  { label: "YouTube", Icon: Youtube },
]

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/workshops", label: "Workshops" },
  { href: "/corporate-training", label: "Corporate Training" },
]

// Cover lines — his four hats, stacked bottom-left like a magazine's cover copy.
const ROLES = [
  "Leadership Development Coach",
  "Corporate Trainer",
  "Keynote Speaker",
  "Inspirational Writer",
]

// #cta — the section is built later; it branches to workshop registration vs.
// corporate-training contact. Every funnel button on the hero points here.
const CTA_HREF = "#cta"

const WORD =
  "block font-serif font-normal whitespace-nowrap leading-[0.82] tracking-[-0.03em] text-white text-[clamp(3rem,12vw,10.5rem)] [text-shadow:0_12px_60px_rgba(0,0,0,0.55)]"

const NAV_LINK =
  "text-[0.7rem] font-semibold tracking-[0.16em] text-white/75 uppercase transition-colors hover:text-white"

const ROLE_LINE =
  "he-line text-[0.72rem] font-semibold tracking-[0.22em] text-white/70 uppercase"

export function HeroEditorial() {
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".he-bg, .he-portrait, .he-word, .he-line, .he-nav", {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        yPercent: 0,
      })
    })

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: EASE } })
      tl.from(".he-bg", { scale: 1.12, autoAlpha: 0, duration: DUR.slow + 0.2 })
        .from(
          ".he-portrait",
          { yPercent: 8, scale: 1.04, autoAlpha: 0, duration: DUR.slow },
          "-=1.05"
        )
        .from(".he-word", { yPercent: 118, duration: 0.95 }, "-=0.7")
        .from(
          ".he-line",
          { y: 18, autoAlpha: 0, duration: DUR.base, stagger: 0.08 },
          "-=0.5"
        )
        .from(".he-nav", { y: 22, autoAlpha: 0, duration: DUR.base }, "<0.1")

      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const bg = gsap.quickTo(".he-bg", "xPercent", {
          duration: 0.7,
          ease: "power3.out",
        })
        const bgY = gsap.quickTo(".he-bg", "yPercent", {
          duration: 0.7,
          ease: "power3.out",
        })
        const por = gsap.quickTo(".he-portrait", "xPercent", {
          duration: 0.7,
          ease: "power3.out",
        })
        const onMove = (e: MouseEvent) => {
          const x = e.clientX / window.innerWidth - 0.5
          const y = e.clientY / window.innerHeight - 0.5
          bg(x * -2)
          bgY(y * -1.5)
          por(x * 2)
        }
        window.addEventListener("mousemove", onMove, { passive: true })
        return () => window.removeEventListener("mousemove", onMove)
      }
    })

    return () => mm.revert()
  })

  return (
    <>
      {/* `sticky top-0` so the hero holds at the top while the opaque
          <QuoteReveal /> sheet (a later sibling, z-10) rides up over it. It stays
          stuck for the rest of the page but is fully covered from there on, so no
          unpin logic is needed. `z-0` boxes its inner z-20/30/40 layers in so
          they can't poke above the sheet. (cf. tasks/lessons.md 2026-08-09.) */}
      <div className="sticky top-0 z-0 min-h-[100svh] w-full overflow-hidden bg-[#141414]">
        {/* Background — ad-bg-2 (already mono). Light scrim + vignette. */}
        <div className="he-bg absolute inset-[-4%] z-0 will-change-transform">
          <Image
            src="/images/ad-bg-2.png"
            alt=""
            fill
            priority
            sizes="110vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_40%,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
          {/* Bottom-up wash — grounds the cover lines + CTA over the nav seam. */}
          <div className="absolute inset-x-0 bottom-0 h-[42%] bg-linear-to-t from-black/60 to-transparent" />
        </div>

        {/* Portrait — right-of-centre, cover-subject style */}
        <div className="he-portrait pointer-events-none absolute -right-[3%] bottom-0 z-20 aspect-[1080/1720] h-[74svh] w-auto will-change-transform select-none sm:right-[4%] sm:h-[82svh] lg:right-[11%] lg:h-[90svh]">
          <Image
            src="/images/ad-hero-portrait.png"
            alt="Coach Adrian Ding"
            fill
            priority
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 50vw, 42vw"
            className="object-contain object-bottom"
          />
        </div>

        {/* Top-left cluster — the giant wordmark runs into the portrait,
            cover-style; the belief line and the socials sit right under it. */}
        <div className="pointer-events-none absolute top-12 left-6 z-30 sm:top-16 sm:left-10">
          {/* w-max so the mask wrapper hugs the wordmark — overflow-hidden then
              only clips the vertical reveal, never the last glyph of "Ding". */}
          <div className="w-max overflow-hidden pb-[0.12em]">
            <h1 className={`he-word ${WORD}`}>Adrian Ding</h1>
          </div>
          <p className="he-line mt-6 max-w-[32rem] font-serif text-base leading-relaxed text-white/80 italic sm:text-lg">
            {TAGLINE}
            <br />
            {TAGLINE_2}
          </p>
          <div className="he-line pointer-events-auto mt-6 flex items-center gap-4">
            {SOCIALS.map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="text-white/70 transition-colors hover:text-white"
              >
                <Icon className="size-[1.1rem]" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom-left cluster — cover lines + the single funnel CTA. Padded to
            clear the pinned nav bar (--nav-h) that overlays the hero's foot. */}
        <div className="absolute bottom-0 left-6 z-30 flex flex-col items-start gap-6 pb-[calc(var(--nav-h)+3vh)] sm:left-10">
          <ul className="flex flex-col gap-2">
            {ROLES.map((role) => (
              <li key={role} className={ROLE_LINE}>
                {role}
              </li>
            ))}
          </ul>
          <div className="he-line">
            <Button asChild variant="brand" size="lg" className="shadow-xl">
              <Link href={CTA_HREF}>Work with Adrian</Link>
            </Button>
          </div>
        </div>

        {/* Top-right — funnel CTA that scrolls away with the hero; the nav bar
            below carries the lasting one. */}
        <div className="absolute top-0 right-6 z-40 flex h-14 items-center sm:right-10">
          <div className="he-line">
            <Button asChild variant="brand" size="sm" className="shadow-lg">
              <Link href={CTA_HREF}>Register</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main link bar — sits at the hero's bottom edge, then pins to the top.
          Pure-CSS hand-off: negative top margin drops it onto the hero's bottom
          edge, `sticky top-0` locks it there on scroll. Height is exactly
          --nav-h so the lock frame is seamless. Centre is kept clear for the
          wordmark's descender. */}
      <nav
        aria-label="Main"
        className="he-nav sticky top-0 z-40 mt-[calc(var(--nav-h)*-1)] flex h-(--nav-h) items-center justify-between gap-6 bg-[#141414] px-6 sm:px-10"
      >
        <Link
          href="/"
          aria-label="Coach Adrian Ding — home"
          className="flex items-center"
        >
          <Image
            src="/images/ad-logo-white.png"
            alt="Adrian Ding monogram"
            width={80}
            height={80}
            className="h-7 w-7 object-contain"
          />
        </Link>
        <div className="flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={NAV_LINK}>
              {l.label}
            </Link>
          ))}
          <Button asChild variant="brand" size="sm">
            <Link href={CTA_HREF}>Register</Link>
          </Button>
        </div>
      </nav>
    </>
  )
}
