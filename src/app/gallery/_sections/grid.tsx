"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap, useGSAP, Flip, EASE, DUR } from "@/app/_lib/gsap"
import { cn } from "@/lib/utils"
import { GALLERY_EVENTS, GALLERY_YEARS } from "@/lib/gallery"

/**
 * Gallery parent — filterable grid of past events. Filtering animates the cards
 * to their new positions with GSAP Flip (entering cards fade up, leaving cards
 * fade out) instead of a hard re-render. First scroll-in still staggers.
 * TODO: images are lifestyle stand-ins until real event photos land.
 */
export function GalleryGrid() {
  const [year, setYear] = useState<number | "all">("all")
  const gridRef = useRef<HTMLDivElement>(null)
  const flipState = useRef<Flip.FlipState | null>(null)

  const events =
    year === "all"
      ? GALLERY_EVENTS
      : GALLERY_EVENTS.filter((e) => e.year === year)

  const pick = (y: number | "all") => {
    if (y === year || !gridRef.current) return
    flipState.current = Flip.getState(
      gridRef.current.querySelectorAll(".gallery-card")
    )
    setYear(y)
  }

  useGSAP(
    () => {
      const grid = gridRef.current
      if (!grid) return
      const cards = grid.querySelectorAll<HTMLElement>(".gallery-card")

      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!flipState.current) {
          // First render — scroll-in stagger.
          gsap.from(cards, {
            opacity: 0,
            y: 24,
            duration: DUR.base,
            ease: EASE,
            stagger: 0.06,
            scrollTrigger: { trigger: grid, start: "top 82%", once: true },
          })
          return
        }
        Flip.from(flipState.current, {
          duration: 0.55,
          ease: EASE,
          scale: true,
          absolute: true,
          stagger: 0.03,
          onEnter: (els) =>
            gsap.fromTo(
              els,
              { opacity: 0, scale: 0.92 },
              { opacity: 1, scale: 1, duration: 0.4, ease: EASE }
            ),
          onLeave: (els) =>
            gsap.to(els, {
              opacity: 0,
              scale: 0.92,
              duration: 0.3,
              ease: EASE,
            }),
        })
      })

      return () => mm.revert()
    },
    { dependencies: [year], scope: gridRef }
  )

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <FilterPill active={year === "all"} onClick={() => pick("all")}>
          All
        </FilterPill>
        {GALLERY_YEARS.map((y) => (
          <FilterPill key={y} active={year === y} onClick={() => pick(y)}>
            {y}
          </FilterPill>
        ))}
      </div>

      <div
        ref={gridRef}
        className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {events.map((e) => (
          <Link
            key={e.slug}
            href={`/gallery/${e.slug}`}
            data-flip-id={e.slug}
            className="gallery-card group block"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={e.cover}
                alt={e.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <p className="text-muted-foreground mt-4 text-xs tracking-[0.1em] uppercase">
              {e.date} · {e.location}
            </p>
            <h3 className="text-foreground group-hover:text-brand mt-1 text-lg font-semibold tracking-tight transition-colors">
              {e.name}
            </h3>
            <p className="text-muted-foreground mt-1.5 line-clamp-2 text-sm leading-relaxed">
              {e.blurb}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-1.5 text-xs font-semibold tracking-[0.12em] uppercase transition-colors",
        active
          ? "border-brand bg-brand text-brand-foreground"
          : "border-border/70 text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  )
}
