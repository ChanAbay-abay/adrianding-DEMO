"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { gsap, useGSAP, EASE, DUR } from "@/app/_lib/gsap"

/**
 * Hero option #4 — "Cinematic → settle".
 *
 * Same GQ-cover composition as the production hero (B&W plate, centred colour
 * portrait, split maroon wordmark, cover lines, dual CTA) but NOT scroll-pinned.
 * A single one-time intro timeline plays on load — plate pushes in, portrait
 * rises, the wordmark clip-reveals from behind a mask, cover lines cascade —
 * then it resolves to a fully static hero and normal scrolling takes over.
 *
 * No `useScroll`, no sticky pin, no `.hero-curtain`, no scroll-snap. Reduced
 * motion → the resolved composition, painted immediately.
 *
 * Assets (flat in public/images/): ad-hero-bg.png · ad-hero-portrait.png
 */

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

const WORD =
  "block font-serif leading-[0.8] tracking-[-0.02em] font-normal text-[#8f130b] text-[clamp(2.5rem,11vw,11.5rem)] [text-shadow:0_10px_55px_rgba(0,0,0,0.55)]"

export function HeroCinematic() {
  const scope = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = scope.current
      if (!root) return
      const q = gsap.utils.selector(root)

      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(q(".hero-bg, .hero-portrait, .hero-word, .hero-line"), {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          yPercent: 0,
        })
      })

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: EASE } })
        tl.from(".hero-bg", {
          scale: 1.14,
          autoAlpha: 0,
          duration: DUR.slow + 0.2,
        })
          .from(
            ".hero-portrait",
            { yPercent: 9, scale: 1.05, autoAlpha: 0, duration: DUR.slow },
            "-=1.05"
          )
          .from(
            ".hero-word",
            { yPercent: 125, duration: 0.95, stagger: 0.12 },
            "-=0.75"
          )
          .from(
            ".hero-line",
            { y: 20, autoAlpha: 0, duration: DUR.base, stagger: 0.08 },
            "-=0.55"
          )

        // Light cursor parallax once settled — pointer-fine only.
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          const bg = gsap.quickTo(".hero-bg", "xPercent", {
            duration: 0.7,
            ease: "power3.out",
          })
          const bgY = gsap.quickTo(".hero-bg", "yPercent", {
            duration: 0.7,
            ease: "power3.out",
          })
          const por = gsap.quickTo(".hero-portrait", "xPercent", {
            duration: 0.7,
            ease: "power3.out",
          })
          const onMove = (e: MouseEvent) => {
            const x = e.clientX / window.innerWidth - 0.5
            const y = e.clientY / window.innerHeight - 0.5
            bg(x * -2)
            bgY(y * -1.5)
            por(x * 2.4)
          }
          window.addEventListener("mousemove", onMove, { passive: true })
          return () => window.removeEventListener("mousemove", onMove)
        }
      })

      return () => mm.revert()
    },
    { scope }
  )

  return (
    <section
      ref={scope}
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#141414]"
    >
      {/* B&W plate + scrim + vignette */}
      <div className="hero-bg absolute inset-[-4%] z-0 will-change-transform">
        <Image
          src="/images/ad-hero-bg.png"
          alt=""
          fill
          priority
          sizes="110vw"
          className="scale-[1.05] object-cover object-center [filter:grayscale(1)_contrast(1.32)_brightness(0.62)]"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_66%_56%_at_50%_42%,transparent_0%,rgba(0,0,0,0.45)_100%)]" />
      </div>

      {/* Portrait — centred, anchored to the base */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-[1.5vh] z-20 flex justify-center">
        <div className="hero-portrait relative aspect-[1080/1720] h-[72svh] w-auto will-change-transform select-none sm:h-[80svh] lg:h-[90svh]">
          <Image
            src="/images/ad-hero-portrait.png"
            alt="Coach Adrian Ding"
            fill
            priority
            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 60vw, 44vw"
            className="object-contain object-bottom"
          />
        </div>
      </div>

      {/* Split wordmark — each half clip-revealed from behind its own mask */}
      <div className="pointer-events-none absolute inset-0 z-10 select-none">
        <div className="absolute top-[30svh] left-[7vw] overflow-hidden sm:top-[25svh] sm:left-[15vw]">
          <span className={`hero-word ${WORD}`}>Adrian</span>
        </div>
        <div className="absolute top-[24svh] right-[10vw] overflow-hidden sm:top-[19svh] sm:right-[21vw]">
          <span className={`hero-word ${WORD} text-right`}>Ding</span>
        </div>
      </div>

      {/* Cover lines — roles bottom-left */}
      <ul className="absolute bottom-[38vh] left-[3vw] z-40 space-y-2.5 sm:bottom-[9vh] sm:space-y-3">
        {ROLES.map((r) => (
          <li
            key={r}
            className="hero-line text-lg leading-[1.1] font-medium text-white/90 [text-shadow:0_2px_14px_rgba(0,0,0,0.85)] sm:text-2xl"
          >
            {r}
          </li>
        ))}
      </ul>

      {/* Cover lines — stats bottom-right */}
      <ul className="absolute bottom-[26vh] left-[3vw] z-40 space-y-2.5 sm:right-[3vw] sm:bottom-[23vh] sm:left-auto sm:space-y-3 sm:text-right">
        {STATS.map((s) => (
          <li
            key={s}
            className="hero-line text-lg leading-[1.1] font-semibold text-[#e0554a] [text-shadow:0_2px_14px_rgba(0,0,0,0.85)] sm:text-2xl"
          >
            {s}
          </li>
        ))}
      </ul>

      {/* Dual CTA — workshop-forward. `hero-line` sits on this container, not on
          the <Button asChild> Slots — a GSAP autoAlpha tween on a Radix Slot
          child leaves it stuck at visibility:hidden. */}
      <div className="hero-line absolute right-[3vw] bottom-[4vh] left-[3vw] z-40 flex flex-col gap-3 sm:bottom-[9vh] sm:left-auto sm:flex-row *:w-full sm:*:w-auto">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="h-13 rounded-full border-white/55 bg-transparent px-9 text-[15px] text-white hover:bg-white/10 hover:text-white sm:h-14 sm:px-10"
        >
          <Link href="/corporate-training#inquiry">Corporate Training</Link>
        </Button>
        <Button
          asChild
          variant="brand"
          size="lg"
          className="h-13 rounded-full bg-[#560a05] px-9 text-[15px] hover:bg-[#420804] sm:h-14 sm:px-10"
        >
          <Link href="/workshops">Workshops</Link>
        </Button>
      </div>
    </section>
  )
}
