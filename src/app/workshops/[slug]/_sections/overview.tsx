import Link from "next/link"
import { CalendarDays, MapPin, Tag, PlayCircle } from "lucide-react"
import { Countdown } from "@/app/_components/countdown"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Workshop } from "@/lib/workshops"

/**
 * Workshop detail — top of page. Schedule / venue / price, a live countdown to
 * the start, and a primer-video slot (placeholder).
 */
export function WorkshopOverview({ workshop }: { workshop: Workshop }) {
  const isOpen = workshop.status === "open"

  return (
    <section className="mx-auto max-w-5xl px-6 pt-16 pb-16 sm:px-8 lg:pt-24">
      <Link
        href="/workshops"
        className="text-muted-foreground hover:text-foreground text-xs font-semibold tracking-[0.14em] uppercase"
      >
        ← All workshops
      </Link>

      <h1 className="mt-7 font-serif text-[2.75rem] leading-[1.03] tracking-[-0.02em] sm:text-[3.5rem] lg:text-[4.5rem]">
        {workshop.title}
      </h1>
      <Badge variant={isOpen ? "brand" : "secondary"} className="mt-5">
        {isOpen ? "Open for registration" : "Past workshop"}
      </Badge>
      <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed lg:text-xl">
        {workshop.intro}
      </p>

      <dl className="mt-10 grid gap-4 sm:grid-cols-3">
        <Meta icon={CalendarDays} label="When" value={workshop.schedule} />
        <Meta
          icon={MapPin}
          label="Where"
          value={`${workshop.venue}, ${workshop.city}`}
        />
        <Meta icon={Tag} label="Investment" value={workshop.price} />
      </dl>

      {isOpen && (
        <div className="border-border/70 mt-10 rounded-md border p-6">
          <p className="text-muted-foreground text-xs tracking-[0.14em] uppercase">
            Starts in
          </p>
          <div className="mt-3">
            <Countdown target={workshop.start} />
          </div>
          <Button asChild variant="brand" size="lg" className="mt-6">
            <Link href="#register">Register now</Link>
          </Button>
        </div>
      )}

      {/* Primer video slot */}
      <div className="bg-muted/50 text-muted-foreground mt-10 flex aspect-video items-center justify-center rounded-md">
        <span className="flex items-center gap-2 text-sm">
          <PlayCircle className="size-5" />
          Primer video — coming soon
        </span>
      </div>
    </section>
  )
}

function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays
  label: string
  value: string
}) {
  return (
    <div className="border-border/70 rounded-sm border p-4">
      <dt className="text-muted-foreground flex items-center gap-1.5 text-xs tracking-[0.1em] uppercase">
        <Icon className="size-3.5" />
        {label}
      </dt>
      <dd className="text-foreground mt-1.5 text-sm font-medium">{value}</dd>
    </div>
  )
}
