import Link from "next/link"
import { CalendarDays, MapPin, Tag, PlayCircle } from "lucide-react"
import { Countdown } from "@/app/_components/countdown"
import { Button } from "@/components/ui/button"
import type { Workshop } from "@/lib/workshops"
import { RegistrationDialog } from "./registration-dialog"

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
      <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed lg:text-xl">
        {workshop.intro}
      </p>

      <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <dl className="flex flex-1 flex-col gap-6">
          <Meta icon={CalendarDays} label="When" value={workshop.schedule} />
          <Meta
            icon={MapPin}
            label="Where"
            value={`${workshop.venue}, ${workshop.city}`}
          />
          <Meta icon={Tag} label="Investment" value={workshop.price} />
        </dl>

        {isOpen && (
          <div className="flex flex-col items-start gap-4 lg:items-end lg:text-right">
            <div>
              <p className="text-muted-foreground text-xs tracking-[0.14em] uppercase">
                Starts in
              </p>
              <div className="mt-3">
                <Countdown target={workshop.start} />
              </div>
            </div>
            <div className="bg-muted/50 flex h-12 items-center gap-4 rounded-full py-1.5 pr-1.5 pl-5">
              <span className="text-foreground/80 text-sm font-medium whitespace-nowrap">
                Registration still open
              </span>
              <RegistrationDialog
                workshopTitle={workshop.title}
                schedule={workshop.schedule}
                venue={`${workshop.venue}, ${workshop.city}`}
              >
                <Button variant="brand" className="h-full px-5">
                  Register now
                </Button>
              </RegistrationDialog>
            </div>
          </div>
        )}
      </div>

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
    <div>
      <dt className="text-muted-foreground flex items-center gap-1.5 text-xs tracking-[0.1em] uppercase">
        <Icon className="size-3.5" />
        {label}
      </dt>
      <dd className="text-foreground mt-1.5 text-sm font-medium">{value}</dd>
    </div>
  )
}
