"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useReducedMotionSafe } from "@/app/_lib/use-reduced-motion-safe"
import { cn } from "@/lib/utils"

/**
 * The six programs as a vertical stack of expand-on-hover image cards (adapted
 * from the `HoverExpand` primitive / 21st.dev). Every row is a rounded, cropped
 * photo with the program title + blurb laid over it behind a scrim — so even
 * collapsed it reads as an image, never a blank band. Hovering a row (or
 * tapping / focusing it) grows its height to show the full photo; the
 * previously-open row shrinks back. One row is always open. Reduced-motion
 * users get the same open/close with no height tween.
 *
 * Below `lg` the same six cards are a horizontal snap rail instead (the
 * calling section supplies the scroller; these are its fixed-width panels) —
 * stacked, six of them ran to about two phone screens on their own. The
 * expand/collapse height tween is desktop-only for the same reason: in the
 * rail every card is the same height, so there is nothing to expand into.
 */

export type SpecCard = {
  key: string
  title: string
  blurb: string
  image: string
  imageAlt: string
  // Vertical focal point for the cropped photo, e.g. "50% 20%" to bias the
  // crop toward the top of the frame. Defaults to centered.
  imagePosition?: string
}

const COLLAPSED_H = "11.5rem"
const EXPANDED_H = "27rem"
// Rail-panel height below `lg` — matches the `h-96` class the card carries
// before the viewport query resolves, so the two can never disagree. Tall
// enough that the full header + body copy is readable without clamping.
const RAIL_H = "24rem"

// Alternating horizontal offset so the stack reads as a staggered, hand-set
// column rather than a locked grid — even rows pulled left, odd rows pushed
// right. `lg:`-gated: below that the cards are fixed-width panels in a
// horizontal rail, where an inset would just shrink them unevenly.
const OFFSETS = ["lg:mr-[7%] lg:w-[93%]", "lg:ml-[7%] lg:w-[93%]"]

export function SpecRevealCards({ items }: { items: SpecCard[] }) {
  const reduce = useReducedMotionSafe()
  const [active, setActive] = useState(0)

  // The height tween is the desktop stack's interaction. Mount-gated so SSR
  // and the first client render agree (lessons 2026-09-02); until it syncs,
  // the CSS height on the card governs — which is what mobile wants anyway.
  const [stacked, setStacked] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const sync = () => setStacked(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  return (
    <>
      {items.map((item, i) => {
        const open = active === i
        return (
          <motion.div
            key={item.key}
            role="button"
            tabIndex={0}
            aria-expanded={open}
            aria-label={item.title}
            // `contain-layout` scopes the height tween's reflow cost to this
            // row's own box, so toggling one card can't force a layout recalc
            // outside the stack.
            className={cn(
              "group relative h-96 w-[78vw] max-w-96 shrink-0 cursor-pointer snap-start overflow-hidden rounded-3xl contain-layout outline-none focus-visible:ring-2 focus-visible:ring-white/80 lg:h-auto lg:w-auto lg:max-w-none lg:shrink",
              OFFSETS[i % OFFSETS.length]
            )}
            initial={false}
            animate={{
              height: stacked ? (open ? EXPANDED_H : COLLAPSED_H) : RAIL_H,
            }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.42, ease: [0.33, 1, 0.68, 1] }
            }
            onHoverStart={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                setActive(i)
              }
            }}
          >
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              sizes="(min-width: 1280px) 1216px, (min-width: 1024px) 100vw, 78vw"
              style={{ objectPosition: item.imagePosition ?? "50% 50%" }}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div
              className={cn(
                "absolute inset-0 bg-linear-to-t transition-colors duration-300",
                open
                  ? "from-black/60 via-black/28 to-black/8"
                  : "from-black/65 via-black/35 to-black/15"
              )}
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:p-6 lg:gap-12 lg:p-8">
              <h3 className="text-xl leading-tight font-semibold tracking-[-0.01em] text-balance text-white sm:max-w-52 sm:shrink-0 lg:max-w-60 lg:text-[1.65rem]">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/85 sm:max-w-xs sm:text-right lg:line-clamp-2 lg:max-w-sm lg:text-base">
                {item.blurb}
              </p>
            </div>
          </motion.div>
        )
      })}
    </>
  )
}
