"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Transition,
} from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HERO_TRACK_VH, NARRATIVE_END, NARRATIVE_VH } from "./hero-scroll"

/**
 * Landing hero — a two-stage pinned narrative in a GQ-cover treatment.
 *
 * The section is `HERO_TRACK_VH` tall; a `sticky top-0 h-[100svh]` stage stays
 * visually locked while you scroll through it. `scrollYProgress` is remapped to
 * `p` (0→1 across the short transition, then held at 1 through the dwell and
 * curtain). Everything keys off `p`:
 *
 *   Stage 1        Portrait centred (colour). "Adrian" over "Ding" in brand
 *                  maroon, pulled in to frame the portrait. Role list
 *                  bottom-left, credential stats bottom-right, two big CTAs.
 *   Transition     "Ding" rises to sit level with "Adrian"; the portrait
 *                  stays in colour throughout; list + stats clear; the
 *                  credential badges fade in (orgs left, dated timeline right);
 *                  the scrim eases.
 *   Stage 2        Both wordmarks lift together (`wordLiftY`) to clear room for
 *                  the badges. Held for `STAGE2_HOLD_VH`, then the rest of the
 *                  page slides up over it and snaps flush (`.hero-curtain`).
 *
 * A load-in plays once. Cursor parallax stacks depth across bg / wordmark /
 * portrait (pointer-fine only). Reduced motion → static resolved stage 2.
 *
 * All copy is inline here. Assets (flat in public/images/):
 *   ad-hero-bg.png · ad-hero-portrait.png
 *   ad-logo-white.png · {maximum-impact,aet,cpd}-logo.png
 */

const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1]

// Wordmark is brand maroon (#8f130b ≈ #980F09, nudged for on-photo legibility)
// in both stages now — no colour transition. It lives on `wordBase` as a class.

const ROLES = [
  "Corporate Trainer",
  "Leadership Development Coach",
  "Keynote Speaker",
  "Inspirational Writer",
]
const STATS = [
  "20+ years",
  "20,000+ professionals trained",
  "Top 500 companies in the Philippines",
]

const ORGS = [
  {
    role: "CEO of",
    org: "Maximum Impact",
    logo: "/images/maximum-impact-logo.png",
  },
  {
    role: "Founder & Lead Coach",
    org: "The Academy for Extraordinary Teens",
    logo: "/images/aet-logo.png",
  },
  {
    role: "Founder",
    org: "Centre of Personal Development",
    logo: "/images/cpd-logo.png",
  },
]

const TIMELINE = [
  { year: "2021", label: "Bachelor of Arts in Mass Communication" },
  { year: "2017", label: "Emotional Intelligence Coaching Practice" },
  { year: "2004", label: "T. Harv Eker Peak Potentials Training" },
]

export function DemoHero() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  // p: 0→1 across the transition, then held at 1 through the dwell + curtain.
  const p = useTransform(scrollYProgress, [0, NARRATIVE_END], [0, 1])

  // ── Scroll-driven layers ──────────────────────────────────────────────
  // "Ding" rises to align with "Adrian" during the transition; then both
  // wordmarks lift together in stage 2 to clear room for the credential badges.
  const dingY = useTransform(p, [0.2, 0.82], ["84%", "0%"])
  // Stage 1 keeps Ding at its lower resting spot; over the transition it also
  // closes the 5svh gap up to Adrian's baseline so the two align in stage 2.
  // vh, not svh — framer-motion's transform parser doesn't recognise svh and
  // silently drops the value. The svh/vh gap is negligible at these sizes.
  const dingAlignY = useTransform(p, [0.2, 0.82], ["0vh", "5vh"])
  const wordLiftY = useTransform(p, [0.5, 0.92], ["0vh", "-16vh"])
  const colorPortraitOpacity = useTransform(p, [0.3, 0.64], [1, 0])
  const monoPortraitOpacity = useTransform(p, [0.3, 0.64], [0, 1])
  // Scrim tint holds at stage-1 strength across both stages — no transition.
  const BG_SCRIM_OPACITY = 0.42

  const listOpacity = useTransform(p, [0, 0.16, 0.32], [1, 1, 0])
  const listY = useTransform(p, [0.16, 0.32], ["0%", "-14%"])

  const coverOpacity = useTransform(p, [0.46, 0.9], [0, 1])
  const coverY = useTransform(p, [0.46, 0.9], [28, 0])

  // ── Cursor parallax — depth stack, pointer-fine only ──────────────────
  // Far bg drifts against the cursor; the wordmark barely moves with it; the
  // portrait (nearest) travels most, with it.
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const spring = { stiffness: 110, damping: 18, mass: 0.4 }
  const bgPX = useSpring(useTransform(rawX, [-0.5, 0.5], [9, -9]), spring)
  const bgPY = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]), spring)
  const wordPX = useSpring(useTransform(rawX, [-0.5, 0.5], [-4, 4]), spring)
  const wordPY = useSpring(useTransform(rawY, [-0.5, 0.5], [-3, 3]), spring)
  const portraitPX = useSpring(
    useTransform(rawX, [-0.5, 0.5], [-18, 18]),
    spring
  )
  const portraitPY = useSpring(
    useTransform(rawY, [-0.5, 0.5], [-15, 15]),
    spring
  )

  useEffect(() => {
    if (reduce) return
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX / window.innerWidth - 0.5)
      rawY.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [reduce, rawX, rawY])

  // ── Load-in (plays once, no scroll input) ─────────────────────────────
  const loadWord = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0.12, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease: EASE_OUT, delay } as Transition,
        }
  const loadChrome = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: EASE_OUT, delay } as Transition,
        }
  const loadPortrait = reduce
    ? {}
    : {
        initial: { opacity: 0, scale: 1.05, y: 24 },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: { duration: 1.3, ease: EASE_OUT, delay: 0.1 } as Transition,
      }

  const wordBase =
    "block font-serif leading-[0.8] tracking-[-0.02em] font-normal text-[#8f130b] text-[clamp(2.5rem,11vw,11.5rem)] [text-shadow:0_10px_55px_rgba(0,0,0,0.55)]"
  // Credential badge — logo on a transparent ground, each fit to a uniform
  // square box so the mixed source PNGs read at one consistent size, next to a
  // small label over a serif name.
  const badgeLogo =
    "h-16 w-16 shrink-0 object-contain sm:h-[4.75rem] sm:w-[4.75rem]"
  const badgeLabel =
    "text-[11px] font-medium tracking-[0.16em] text-white/55 uppercase sm:text-[13px]"
  const badgeName =
    "font-serif text-xl leading-[1.05] text-[#e0554a] sm:text-[1.7rem]"

  return (
    <section
      ref={sectionRef}
      id="home"
      className={`relative w-full bg-[#141414] ${reduce ? "h-[100svh]" : ""}`}
      style={reduce ? undefined : { height: `${HERO_TRACK_VH}vh` }}
    >
      {/* Snap sentinels — proximity snap clicks stage 1 / stage 2 into place;
          the released state snaps on `.hero-curtain` itself. */}
      {!reduce && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 h-px w-px"
            style={{ top: 0, scrollSnapAlign: "start" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 h-px w-px"
            style={{ top: `${NARRATIVE_VH}vh`, scrollSnapAlign: "start" }}
          />
        </>
      )}

      <div className="sticky top-0 isolate h-[100svh] min-h-[620px] w-full overflow-hidden bg-[#141414]">
        {/* ─── Background — B&W plate. Only the photo takes the cursor drift;
            the scrim + vignette stay full-bleed so no edge is ever exposed. */}
        <div className="absolute inset-0 z-0">
          <motion.div
            style={{ x: reduce ? 0 : bgPX, y: reduce ? 0 : bgPY }}
            className="absolute inset-[-3%] will-change-transform"
          >
            <Image
              src="/images/ad-hero-bg.png"
              alt=""
              fill
              priority
              sizes="110vw"
              className="scale-[1.05] object-cover object-center [filter:grayscale(1)_contrast(1.32)_brightness(0.62)]"
            />
          </motion.div>
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: BG_SCRIM_OPACITY }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_66%_56%_at_50%_42%,transparent_0%,rgba(0,0,0,0.42)_100%)]" />
        </div>

        {/* ─── Portrait — centred, fixed. Stays in colour across both stages. */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-[1.5vh] z-20 flex justify-center">
          <motion.div
            style={{ x: reduce ? 0 : portraitPX, y: reduce ? 0 : portraitPY }}
            className="will-change-transform"
          >
            <motion.div
              {...loadPortrait}
              className="relative aspect-[1080/1720] h-[72svh] w-auto select-none sm:h-[80svh] lg:h-[90svh]"
            >
              <Image
                src="/images/ad-hero-portrait.png"
                alt="Coach Adrian Ding"
                fill
                priority
                sizes="(max-width: 640px) 82vw, (max-width: 1024px) 60vw, 44vw"
                className="object-contain object-bottom"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* ─── Wordmark — Adrian (fixed) + Ding (rises to align) ──────────── */}
        <motion.div
          style={{ x: reduce ? 0 : wordPX, y: reduce ? 0 : wordPY }}
          className="pointer-events-none absolute inset-0 z-10 will-change-transform select-none"
        >
          <motion.div
            style={{ y: reduce ? 0 : wordLiftY }}
            className="absolute top-[31svh] left-[7vw] will-change-transform sm:top-[26svh] sm:left-[15vw]"
          >
            <motion.span {...loadWord(0.15)} className={wordBase}>
              Adrian
            </motion.span>
          </motion.div>

          <motion.div
            style={{ y: reduce ? 0 : wordLiftY }}
            className="absolute top-[26svh] right-[10vw] will-change-transform sm:top-[21svh] sm:right-[21vw]"
          >
            <motion.div
              style={{ y: reduce ? "5vh" : dingAlignY }}
              className="will-change-transform"
            >
              <motion.div
                style={{ y: reduce ? "0%" : dingY }}
                className="will-change-transform"
              >
                <motion.span
                  {...loadWord(0.28)}
                  className={`${wordBase} text-right`}
                >
                  Ding
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* The global <SiteNavbar overHero /> (rendered from page.tsx) floats
            over this pinned stage — the hero no longer carries its own nav so
            the landing and inner pages share one navbar with real-route links. */}

        {/* ─── Stage 1 — roles bottom-left, stats bottom-right, cleared on
            transition. Stacked on mobile. ──────────────────────────────── */}
        <motion.ul
          style={{ opacity: reduce ? 0 : listOpacity, y: reduce ? 0 : listY }}
          className="absolute bottom-[38vh] left-[3vw] z-40 space-y-2.5 will-change-transform sm:bottom-[9vh] sm:space-y-3"
        >
          {ROLES.map((r) => (
            <li
              key={r}
              className="text-lg leading-[1.1] font-medium text-white/90 [text-shadow:0_2px_14px_rgba(0,0,0,0.85)] sm:text-2xl"
            >
              {r}
            </li>
          ))}
        </motion.ul>

        <motion.ul
          style={{ opacity: reduce ? 0 : listOpacity, y: reduce ? 0 : listY }}
          className="absolute bottom-[26vh] left-[3vw] z-40 space-y-2.5 will-change-transform sm:right-[3vw] sm:bottom-[23vh] sm:left-auto sm:space-y-3 sm:text-right"
        >
          {STATS.map((stat) => (
            <li
              key={stat}
              className="text-lg leading-[1.1] font-semibold text-[#e0554a] [text-shadow:0_2px_14px_rgba(0,0,0,0.85)] sm:text-2xl"
            >
              {stat}
            </li>
          ))}
        </motion.ul>

        {/* ─── Stage 2 — credential badges. Split L/R on sm+, stacked on mobile. */}
        <motion.div
          style={{ opacity: reduce ? 1 : coverOpacity, y: reduce ? 0 : coverY }}
          className="absolute top-[18svh] right-[3vw] left-[3vw] z-40 space-y-6 will-change-transform sm:top-[35svh] sm:right-auto sm:max-w-[28rem] sm:space-y-8"
        >
          {ORGS.map((o) => (
            <div key={o.org} className="flex items-center gap-4">
              <Image
                src={o.logo}
                alt=""
                width={96}
                height={96}
                className={badgeLogo}
              />
              <div>
                <p className={badgeLabel}>{o.role}</p>
                <p className={badgeName}>{o.org}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          style={{ opacity: reduce ? 1 : coverOpacity, y: reduce ? 0 : coverY }}
          className="absolute top-[54svh] right-[3vw] left-[3vw] z-40 space-y-6 will-change-transform sm:top-[35svh] sm:left-auto sm:max-w-[28rem] sm:space-y-8 sm:text-right"
        >
          {TIMELINE.map((t) => (
            <div key={t.year}>
              <p className={badgeLabel}>{t.year}</p>
              <p className={badgeName}>{t.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ─── CTAs — fixed to this corner, present in both stages ────────── */}
        <motion.div
          {...loadChrome(0.42)}
          className="absolute right-[3vw] bottom-[4vh] left-[3vw] z-40 flex flex-col gap-3 sm:right-[3vw] sm:bottom-[9vh] sm:left-auto sm:flex-row [&>button]:w-full sm:[&>button]:w-auto"
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-13 rounded-full border-white/55 bg-transparent px-9 text-[15px] text-white hover:bg-white/10 hover:text-white sm:h-14 sm:px-10 sm:text-base"
          >
            <Link href="/corporate-training#inquiry">Corporate Training</Link>
          </Button>
          <Button
            asChild
            variant="brand"
            size="lg"
            className="h-13 rounded-full bg-[#560a05] px-9 text-[15px] hover:bg-[#420804] sm:h-14 sm:px-10 sm:text-base"
          >
            <Link href="/workshops">Workshops</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
