"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Workshop } from "@/lib/workshops"

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

/**
 * Local-date key (not `toISOString`, which shifts across UTC and would land
 * a 9am PH-time workshop on the wrong calendar day for viewers west of PH).
 */
function dateKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

type DayCell = { date: Date; inMonth: boolean; workshops: Workshop[] }

function buildMonth(
  year: number,
  month: number,
  byDay: Map<string, Workshop[]>
): DayCell[] {
  const first = new Date(year, month, 1)
  const startOffset = first.getDay()
  const gridStart = new Date(year, month, 1 - startOffset)

  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(gridStart)
    date.setDate(gridStart.getDate() + i)
    return {
      date,
      inMonth: date.getMonth() === month,
      workshops: byDay.get(dateKey(date)) ?? [],
    }
  })
}

/**
 * Month-grid calendar marking every open workshop date. Click a marked date
 * to jump straight to that workshop's page; hover (desktop) or focus
 * (keyboard) surfaces a smooth popover preview first, since a bare dot on a
 * date is not enough context to commit to a click.
 *
 * Defaults to the soonest open workshop's month so the first thing a visitor
 * sees already has a marked date, not a search.
 */
export function WorkshopsCalendar({
  workshops,
  className,
}: {
  workshops: Workshop[]
  className?: string
}) {
  const router = useRouter()

  const byDay = useMemo(() => {
    const map = new Map<string, Workshop[]>()
    for (const w of workshops) {
      const key = dateKey(new Date(w.start))
      map.set(key, [...(map.get(key) ?? []), w])
    }
    return map
  }, [workshops])

  const initial =
    workshops.length > 0 ? new Date(workshops[0].start) : new Date()
  const [cursor, setCursor] = useState(
    new Date(initial.getFullYear(), initial.getMonth(), 1)
  )
  const [openKey, setOpenKey] = useState<string | null>(null)
  const [direction, setDirection] = useState(1)

  const days = useMemo(
    () => buildMonth(cursor.getFullYear(), cursor.getMonth(), byDay),
    [cursor, byDay]
  )

  const monthLabel = cursor.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  function go(delta: number) {
    setOpenKey(null)
    setDirection(delta)
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + delta, 1))
  }

  return (
    <div className={cn("bg-muted/40 w-full rounded-3xl p-6", className)}>
      <div className="mb-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div />
        <div className="overflow-hidden text-center">
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.p
              key={monthLabel}
              custom={direction}
              initial={{ opacity: 0, x: 16 * direction }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 * direction }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-2xl tracking-[-0.01em] whitespace-nowrap sm:text-3xl lg:text-4xl"
            >
              {monthLabel}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous month"
            className="bg-background hover:bg-background/70 flex size-8 items-center justify-center rounded-full transition-colors"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next month"
            className="bg-background hover:bg-background/70 flex size-8 items-center justify-center rounded-full transition-colors"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="text-muted-foreground grid grid-cols-7 gap-1.5 text-center text-xs font-medium">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1.5">
            {d[0]}
          </div>
        ))}
      </div>

      <div className="overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={monthLabel}
            custom={direction}
            initial={{ opacity: 0, x: 24 * direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 * direction }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-7 gap-1.5"
          >
            {days.map((cell) => {
              const key = dateKey(cell.date)
              const workshop = cell.workshops[0]
              const isOpen = openKey === key

              return (
                <div key={key} className="relative">
                  <button
                    type="button"
                    disabled={!workshop}
                    onMouseEnter={() => workshop && setOpenKey(key)}
                    onMouseLeave={() =>
                      setOpenKey((k) => (k === key ? null : k))
                    }
                    onFocus={() => workshop && setOpenKey(key)}
                    onBlur={() => setOpenKey((k) => (k === key ? null : k))}
                    onClick={() =>
                      workshop && router.push(`/workshops/${workshop.slug}`)
                    }
                    className={cn(
                      "flex h-16 w-full flex-col items-center justify-center gap-1 rounded-lg text-sm transition-colors lg:h-20",
                      !cell.inMonth && "text-muted-foreground/40",
                      cell.inMonth && !workshop && "text-foreground",
                      workshop &&
                        "bg-brand/10 text-brand hover:bg-brand/20 focus-visible:bg-brand/20 cursor-pointer font-semibold focus-visible:outline-none"
                    )}
                  >
                    {cell.date.getDate()}
                    {workshop && (
                      <span className="bg-brand size-1.5 rounded-full" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isOpen && workshop && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                        transition={{
                          duration: 0.22,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="bg-popover text-popover-foreground pointer-events-none absolute top-full left-1/2 z-20 mt-3 w-96 -translate-x-1/2 rounded-3xl border p-8 shadow-xl"
                      >
                        <div className="flex flex-col items-center gap-2 text-center">
                          <span className="bg-brand/10 text-brand rounded-full px-3 py-1 text-xs font-semibold">
                            {workshop.schedule}
                          </span>
                          <p className="font-serif text-2xl leading-tight">
                            {workshop.title}
                          </p>
                        </div>
                        <div className="border-border/60 mt-5 space-y-3 border-t pt-5">
                          <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
                            <MapPin className="size-4 shrink-0" />
                            {workshop.venue}, {workshop.city}
                          </p>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {workshop.summary}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
