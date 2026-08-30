"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import {
  gsap,
  useGSAP,
  Draggable,
  EASE_IO,
  prefersReducedMotion,
} from "@/app/_lib/gsap"
import { cn } from "@/lib/utils"
import type { Testimonial } from "@/lib/testimonials"

type Props = {
  testimonials: Testimonial[]
  className?: string
  /** ms between auto-advances; 0 disables autoplay. */
  interval?: number
}

/**
 * Testimonial slider — a real slide track you can flick through (GSAP Draggable
 * + InertiaPlugin, snapping to the nearest quote), with arrows, dots and
 * autoplay for everyone else. Reduced motion drops the drag + eased slide and
 * just cuts between quotes with the controls.
 */
export function TestimonialCarousel({
  testimonials,
  className,
  interval = 6500,
}: Props) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  // Measured viewport width — drives each slide's width so the flex track can't
  // blow out on a long non-wrapping quote (flex `min-width: auto`).
  const [vw, setVw] = useState(0)
  const viewport = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const dragRef = useRef<Draggable | null>(null)
  const slideW = useRef(0)
  const indexRef = useRef(0)
  const count = testimonials.length

  const goTo = useCallback(
    (next: number, animate = true) => {
      const i = (next + count) % count
      indexRef.current = i
      setIndex(i)
      if (!track.current) return
      gsap.to(track.current, {
        x: -i * slideW.current,
        duration: animate && !prefersReducedMotion() ? 0.55 : 0,
        ease: EASE_IO,
        onUpdate: () => dragRef.current?.update(),
      })
    },
    [count]
  )

  useEffect(() => {
    if (!interval || paused || count < 2) return
    const id = setInterval(() => goTo(indexRef.current + 1), interval)
    return () => clearInterval(id)
  }, [interval, paused, count, goTo])

  useGSAP(
    () => {
      const vp = viewport.current
      const tk = track.current
      if (!vp || !tk) return

      const sync = () => {
        const w = vp.clientWidth
        slideW.current = w
        setVw(w)
        gsap.set(tk, { x: -indexRef.current * w })
        dragRef.current?.applyBounds({ minX: -(count - 1) * w, maxX: 0 })
      }

      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const w0 = vp.clientWidth
        slideW.current = w0
        setVw(w0)
        gsap.set(tk, { x: -indexRef.current * w0 })
        dragRef.current = Draggable.create(tk, {
          type: "x",
          // No inertia throw — `onDragEnd` commits to exactly one neighbour, so
          // a momentum tween would only fight `goTo` for the final position.
          inertia: false,
          cursor: "grab",
          activeCursor: "grabbing",
          dragClickables: true,
          edgeResistance: 0.9,
          bounds: { minX: -(count - 1) * w0, maxX: 0 },
          onPress: () => setPaused(true),
          onRelease: () => setPaused(false),
          onDragEnd() {
            // Commit by drag direction + distance, not raw endpoint — a slow
            // half-slide drag should still advance one quote.
            const w = slideW.current || 1
            const moved = this.startX - this.x
            const dir = moved > w * 0.12 ? 1 : moved < -w * 0.12 ? -1 : 0
            goTo(indexRef.current + dir)
          },
        })[0]
        return () => {
          dragRef.current?.kill()
          dragRef.current = null
        }
      })
      mm.add("(prefers-reduced-motion: reduce)", () => {
        sync()
      })

      const ro = new ResizeObserver(sync)
      ro.observe(vp)
      return () => {
        ro.disconnect()
        mm.revert()
      }
    },
    { scope: viewport }
  )

  return (
    <div
      className={cn("relative w-full min-w-0", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Quote className="text-brand/25 size-12" aria-hidden />

      <div ref={viewport} className="mt-5 w-full overflow-hidden">
        <div ref={track} className="flex" aria-live="polite">
          {testimonials.map((t, i) => (
            <figure
              key={t.org + i}
              aria-hidden={i !== index || undefined}
              style={{ width: vw || "100%" }}
              className="min-w-0 shrink-0 pr-8"
            >
              <blockquote className="font-serif text-[1.6rem] leading-[1.28] tracking-[-0.01em] text-balance sm:text-[2rem] lg:text-[2.4rem]">
                {t.quote}
              </blockquote>
              <figcaption className="text-muted-foreground mt-7 text-sm tracking-[0.04em]">
                <span className="text-foreground font-semibold">{t.name}</span>{" "}
                · {t.role}, {t.org}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center gap-4">
        <button
          type="button"
          onClick={() => goTo(indexRef.current - 1)}
          aria-label="Previous testimonial"
          className="border-border/70 hover:border-brand/40 hover:text-brand flex size-10 items-center justify-center rounded-full border transition-colors"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => goTo(indexRef.current + 1)}
          aria-label="Next testimonial"
          className="border-border/70 hover:border-brand/40 hover:text-brand flex size-10 items-center justify-center rounded-full border transition-colors"
        >
          <ChevronRight className="size-4" />
        </button>

        <div className="ml-2 flex gap-1.5">
          {testimonials.map((item, i) => (
            <button
              key={item.org + i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === index || undefined}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "bg-brand w-6" : "bg-border w-1.5"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
