"use client"

import { useRef, type ReactNode } from "react"
import { gsap, useGSAP } from "@/app/_lib/gsap"
import { cn } from "@/lib/utils"

type MarqueeProps = {
  children: ReactNode
  /** Travel speed in px/second. */
  speed?: number
  direction?: "left" | "right"
  className?: string
  /** Gap between items, any CSS length. Default `3.5rem`. */
  gap?: string
}

/**
 * Seamless infinite marquee. The track holds two identical halves; GSAP slides
 * it exactly one half-width and loops, so the seam is invisible. Pauses on
 * hover and keyboard focus. Reduced-motion turns it into a plain horizontal
 * scroll strip so nothing is hidden.
 */
export function Marquee({
  children,
  speed = 40,
  direction = "left",
  className,
  gap = "3.5rem",
}: MarqueeProps) {
  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const tween = useRef<gsap.core.Tween | null>(null)

  useGSAP(
    () => {
      const t = track.current
      if (!t) return

      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const build = () => {
          tween.current?.kill()
          const half = t.scrollWidth / 2
          if (half <= 0) return
          const dur = half / speed
          const from = direction === "left" ? 0 : -half
          const to = direction === "left" ? -half : 0
          gsap.set(t, { x: from })
          tween.current = gsap.fromTo(
            t,
            { x: from },
            { x: to, duration: dur, ease: "none", repeat: -1 }
          )
        }
        build()
        const ro = new ResizeObserver(build)
        ro.observe(t)
        return () => {
          ro.disconnect()
          tween.current?.kill()
        }
      })
      return () => mm.revert()
    },
    { scope: wrap }
  )

  const pause = () => tween.current?.pause()
  const resume = () => tween.current?.resume()

  return (
    <div
      ref={wrap}
      className={cn(
        "relative overflow-hidden max-md:overflow-x-auto",
        "[mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]",
        "[-webkit-mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]",
        "motion-reduce:[mask-image:none] motion-reduce:[-webkit-mask-image:none]",
        className
      )}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
    >
      <div ref={track} className="flex w-max flex-none">
        <div
          className="flex flex-none items-center"
          style={{ gap, paddingRight: gap }}
        >
          {children}
        </div>
        <div
          aria-hidden
          className="flex flex-none items-center motion-reduce:hidden"
          style={{ gap, paddingRight: gap }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
