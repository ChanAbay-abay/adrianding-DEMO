"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type CountdownProps = {
  /** Event start — ISO string or Date. */
  target: string | Date
  className?: string
}

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hrs" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
] as const

function breakdown(ms: number) {
  const c = Math.max(0, ms)
  return {
    days: Math.floor(c / 86_400_000),
    hours: Math.floor((c / 3_600_000) % 24),
    minutes: Math.floor((c / 60_000) % 60),
    seconds: Math.floor((c / 1_000) % 60),
  }
}

/**
 * Live countdown to an event. Renders em-dashes until mounted so server and
 * client markup match, then ticks once a second. Plain `setInterval` — no GSAP.
 */
export function Countdown({ target, className }: CountdownProps) {
  const targetMs = new Date(target).getTime()
  const [remaining, setRemaining] = useState<number | null>(null)

  useEffect(() => {
    const update = () => setRemaining(targetMs - Date.now())
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [targetMs])

  const done = remaining != null && remaining <= 0
  const parts = remaining == null ? null : breakdown(remaining)

  return (
    <div className={cn("flex items-stretch gap-2 sm:gap-3", className)}>
      {UNITS.map(({ key, label }) => (
        <div
          key={key}
          className="bg-foreground text-background flex min-w-[3.75rem] flex-col items-center rounded-sm px-3 py-2.5 sm:min-w-[4.5rem] sm:py-3"
        >
          <span className="font-serif text-2xl leading-none tabular-nums sm:text-3xl">
            {parts ? String(parts[key]).padStart(2, "0") : "--"}
          </span>
          <span className="text-background/60 mt-1.5 text-[0.625rem] font-medium tracking-[0.14em] uppercase">
            {label}
          </span>
        </div>
      ))}
      {done && (
        <span className="text-muted-foreground self-center pl-1 text-sm">
          This workshop has started.
        </span>
      )}
    </div>
  )
}
