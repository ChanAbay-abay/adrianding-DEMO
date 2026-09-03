"use client"

import { useEffect, useState } from "react"
import NumberFlow from "@number-flow/react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const MotionNumberFlow = motion.create(NumberFlow)

type CountdownProps = {
  /** Event start — ISO string or Date. */
  target: string | Date
  className?: string
}

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
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
 * client markup match, then ticks once a second with animated digit flips.
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

  if (done) {
    return (
      <span className={cn("text-muted-foreground text-sm", className)}>
        This workshop has started.
      </span>
    )
  }

  return (
    <div className={cn("flex items-start gap-3 sm:gap-4", className)}>
      {UNITS.map(({ key, label }, i) => (
        <div key={key} className="flex items-start gap-3 sm:gap-4">
          <div className="flex flex-col items-center">
            <MotionNumberFlow
              value={parts ? parts[key] : 0}
              format={{ minimumIntegerDigits: 2 }}
              className="text-4xl font-semibold tracking-tighter tabular-nums sm:text-5xl"
            />
            <span className="text-muted-foreground mt-1 text-[0.625rem] font-medium tracking-[0.14em] uppercase">
              {label}
            </span>
          </div>
          {i < UNITS.length - 1 && (
            <span className="text-muted-foreground/40 pt-0.5 text-2xl font-semibold sm:text-3xl">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
