"use client"

import Image from "next/image"
import { useRef } from "react"
import { gsap, useGSAP, EASE } from "@/app/_lib/gsap"
import { cn } from "@/lib/utils"

export type TimelineEntry = {
  /** Year or short period label, e.g. "2004" or "2017–2019". */
  year: string
  title: string
  body: string
  /** Optional logo (cert body, school). */
  logoSrc?: string
  logoAlt?: string
}

type JourneyTimelineProps = {
  entries: TimelineEntry[]
  className?: string
}

/**
 * A guided journey rail. A scroll-scrubbed beam runs down the spine; whichever
 * entry the beam is currently passing is the focal one (full weight, maroon
 * year, filled node) while the rest recede. Node positions are measured and
 * re-measured on resize so the beam and the highlights never drift (Iridel
 * lessons 2026-07-29 / 2026-08-03). Reduced motion: full rail, every entry lit.
 */
export function JourneyTimeline({ entries, className }: JourneyTimelineProps) {
  const list = useRef<HTMLOListElement>(null)
  const fill = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const ol = list.current
      const beam = fill.current
      if (!ol || !beam) return

      const items = Array.from(
        ol.querySelectorAll<HTMLLIElement>("[data-entry]")
      )
      const dots = items.map((li) =>
        li.querySelector<HTMLSpanElement>("[data-dot]")
      )

      const fracFor = (i: number) => {
        const dot = dots[i]
        if (!dot) return 1
        return (dot.offsetTop + dot.offsetHeight / 2) / ol.offsetHeight
      }

      const paint = (progress: number) => {
        let active = -1
        items.forEach((_, i) => {
          if (progress >= fracFor(i) - 0.02) active = i
        })
        items.forEach((li, i) => {
          li.dataset.state =
            i < active ? "past" : i === active ? "active" : "upcoming"
        })
      }

      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(beam, { scaleY: 1 })
        items.forEach((li) => (li.dataset.state = "active"))
      })

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(beam, { scaleY: 0, transformOrigin: "top" })
        paint(0)
        const st = gsap.to(beam, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ol,
            start: "top 32%",
            end: "bottom 68%",
            scrub: 0.5,
            onUpdate: (self) => paint(self.progress),
            invalidateOnRefresh: true,
          },
        })
        items.forEach((li) => {
          gsap.from(li.querySelector("[data-entry-content]"), {
            opacity: 0,
            y: 28,
            duration: 0.7,
            ease: EASE,
            scrollTrigger: { trigger: li, start: "top 80%", once: true },
          })
        })
        return () => st.kill()
      })

      return () => mm.revert()
    },
    { scope: list }
  )

  return (
    <ol ref={list} className={cn("relative", className)}>
      {/* Rail + scrubbed beam */}
      <span
        aria-hidden
        className="bg-border absolute top-3 bottom-3 left-[3px] w-0.5 md:left-[10rem]"
      >
        <span
          ref={fill}
          className="bg-brand absolute inset-0 block origin-top"
        />
      </span>

      {entries.map((e, i) => (
        <li
          key={`${e.year}-${i}`}
          data-entry
          data-state="upcoming"
          className={cn(
            "group relative pb-20 pl-10 transition-opacity duration-500 last:pb-0",
            "md:min-h-[20rem] md:pb-28 md:pl-[14rem]",
            "data-[state=active]:opacity-100 data-[state=past]:opacity-60 data-[state=upcoming]:opacity-30"
          )}
        >
          {/* Year */}
          <span className="text-muted-foreground group-data-[state=active]:text-brand group-data-[state=past]:text-foreground/50 mb-3 block font-serif text-4xl tracking-[-0.02em] transition-colors duration-500 md:absolute md:top-0 md:left-0 md:mb-0 md:w-[8.5rem] md:text-right md:text-5xl lg:text-[3.5rem]">
            {e.year}
          </span>

          {/* Node */}
          <span
            data-dot
            aria-hidden
            className="border-border bg-background group-data-[state=active]:border-brand group-data-[state=active]:bg-brand group-data-[state=past]:border-brand/60 group-data-[state=past]:bg-brand/50 absolute top-[0.9rem] left-0 size-4 -translate-x-1/2 rounded-full border-2 transition-colors duration-500 md:left-[10rem]"
          />

          <div data-entry-content>
            {e.logoSrc && (
              <div className="bg-muted/50 relative mb-6 flex h-16 w-40 items-center justify-center rounded-sm">
                <Image
                  src={e.logoSrc}
                  alt={e.logoAlt ?? ""}
                  fill
                  sizes="160px"
                  className="object-contain p-3"
                />
              </div>
            )}
            <h3 className="text-foreground font-serif text-2xl tracking-tight lg:text-[1.75rem]">
              {e.title}
            </h3>
            <p className="text-muted-foreground mt-4 max-w-xl text-lg leading-relaxed">
              {e.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}
