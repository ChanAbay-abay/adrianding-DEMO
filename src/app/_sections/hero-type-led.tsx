"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { gsap, useGSAP, SplitText, EASE, DUR } from "@/app/_lib/gsap"

/**
 * Hero option #6 — "Type-led".
 *
 * The opposite weighting from the production hero: the statement carries the
 * screen, the portrait is the supporting column. Light editorial ground
 * (contrast with the dark cinematic option), a single primary CTA
 * (workshop-forward — corporate is a quiet text link), a hairline stat row,
 * and a company name-drop. Portrait sits in a dark block on the right, wiped
 * in on load; the headline splits into masked lines.
 *
 * No scroll pin. Reduced motion → painted at rest, no split.
 * Asset: ad-hero-portrait.png (transparent cut, flat on the dark block).
 */

const STATS = [
  { n: "20+", l: "Years" },
  { n: "20,000+", l: "Trained" },
  { n: "Top 500", l: "PH companies" },
]

export function HeroTypeLed() {
  const scope = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      const root = scope.current
      const heading = headingRef.current
      if (!root || !heading) return
      const q = gsap.utils.selector(root)
      const chrome = ".tl-sub, .tl-cta, .tl-stats, .tl-companies, .tl-caption"

      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(q(`${chrome}, .tl-portrait`), {
          autoAlpha: 1,
          y: 0,
          clipPath: "none",
        })
      })

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = new SplitText(heading, {
          type: "lines",
          mask: "lines",
          linesClass: "tl-line",
        })

        const tl = gsap.timeline({ defaults: { ease: EASE } })
        tl.from(".tl-portrait", {
          clipPath: "inset(100% 0 0 0)",
          duration: DUR.slow + 0.1,
        })
          .from(
            split.lines,
            { yPercent: 115, duration: 0.9, stagger: 0.12 },
            0.15
          )
          .from(
            q(chrome),
            { y: 18, autoAlpha: 0, duration: DUR.base, stagger: 0.09 },
            "-=0.5"
          )

        return () => {
          tl.kill()
          split.revert()
        }
      })

      return () => mm.revert()
    },
    { scope }
  )

  return (
    <section
      ref={scope}
      className="grid min-h-[100svh] w-full grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]"
    >
      {/* ── Type column ─────────────────────────────────────────────── */}
      <div className="order-2 flex flex-col justify-center px-6 py-16 sm:px-10 lg:order-1 lg:py-0 lg:pl-[7vw]">
        <div className="max-w-[38rem]">
          <h1
            ref={headingRef}
            className="text-foreground font-serif text-[clamp(2.5rem,5.6vw,5.25rem)] leading-[0.98] tracking-[-0.02em]"
          >
            Twenty years. Twenty thousand leaders.{" "}
            <span className="text-brand">One room at a time.</span>
          </h1>

          <p className="tl-sub text-muted-foreground mt-7 max-w-[34rem] text-lg leading-relaxed">
            Adrian Ding builds winning cultures inside the Philippines&rsquo;
            Top 500 companies &mdash; and runs the public workshops that get
            individual professionals there faster.
          </p>

          <div className="tl-cta mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Button asChild variant="brand" size="lg" className="rounded-full">
              <Link href="/workshops">Register for a workshop</Link>
            </Button>
            <Link
              href="/corporate-training#inquiry"
              className="text-foreground/70 hover:text-brand text-sm font-medium transition-colors"
            >
              Bringing a team? Corporate training &rarr;
            </Link>
          </div>

          <dl className="tl-stats divide-border/60 mt-12 flex divide-x">
            {STATS.map((s) => (
              <div key={s.l} className="px-5 first:pl-0">
                <dt className="text-foreground font-serif text-2xl">{s.n}</dt>
                <dd className="text-muted-foreground mt-1 text-xs tracking-[0.1em] uppercase">
                  {s.l}
                </dd>
              </div>
            ))}
          </dl>

          <p className="tl-companies text-muted-foreground/70 mt-8 text-xs tracking-[0.14em] uppercase">
            Trusted by HSBC &middot; Wipro &middot; Petron &middot; Jollibee
            &middot; Nestl&eacute;
          </p>
        </div>
      </div>

      {/* ── Portrait column ─────────────────────────────────────────── */}
      <div className="tl-portrait relative order-1 min-h-[55svh] overflow-hidden bg-[#141414] lg:order-2 lg:min-h-0">
        <div className="bg-brand absolute inset-y-0 left-0 z-10 w-1" />
        <Image
          src="/images/ad-hero-portrait.png"
          alt="Coach Adrian Ding"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-contain object-bottom"
        />
        <span className="tl-caption absolute right-4 bottom-8 z-10 rotate-180 text-[11px] tracking-[0.3em] text-white/50 uppercase [writing-mode:vertical-rl]">
          Maximum Impact &mdash; CEO
        </span>
      </div>
    </section>
  )
}
