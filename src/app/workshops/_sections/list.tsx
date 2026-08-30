import Link from "next/link"
import { ArrowRight, CalendarDays, MapPin } from "lucide-react"
import { Reveal } from "@/app/_components/reveal"
import { SplitReveal } from "@/app/_components/split-reveal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { OPEN_WORKSHOPS, PAST_WORKSHOPS, type Workshop } from "@/lib/workshops"

/**
 * Workshops parent — open dates up top as full cards, past events as a quiet
 * list below.
 */
export function WorkshopsList() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-10 sm:px-8 lg:pt-28">
        <SplitReveal
          as="h1"
          className="font-serif text-[2.75rem] leading-[1.03] tracking-[-0.02em] sm:text-[3.5rem] lg:text-[4.5rem]"
        >
          Public workshops
        </SplitReveal>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed lg:text-xl">
          A full day with Adrian — the same programs companies book, open for
          individual registration. Seats are limited and dates do sell out.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20 sm:px-8 lg:pb-32">
        <Reveal stagger={0.1} className="space-y-6">
          {OPEN_WORKSHOPS.map((w) => (
            <OpenCard key={w.slug} workshop={w} />
          ))}
        </Reveal>

        {PAST_WORKSHOPS.length > 0 && (
          <div className="mt-16">
            <h2 className="text-muted-foreground text-sm font-semibold tracking-[0.14em] uppercase">
              Past workshops
            </h2>
            <ul className="border-border/70 mt-4 divide-y border-t">
              {PAST_WORKSHOPS.map((w) => (
                <li key={w.slug}>
                  <Link
                    href={`/workshops/${w.slug}`}
                    className="group flex items-center justify-between gap-4 py-4"
                  >
                    <span>
                      <span className="text-foreground group-hover:text-brand font-medium transition-colors">
                        {w.title}
                      </span>
                      <span className="text-muted-foreground block text-sm">
                        {w.schedule}
                      </span>
                    </span>
                    <ArrowRight className="text-muted-foreground size-4 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  )
}

function OpenCard({ workshop: w }: { workshop: Workshop }) {
  return (
    <div className="border-border/60 border p-8 sm:p-10">
      <h3 className="font-serif text-[1.75rem] tracking-tight sm:text-[2.25rem]">
        {w.title}
      </h3>
      <Badge variant="brand" className="mt-3">
        Open for registration
      </Badge>
      <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
        {w.summary}
      </p>
      <div className="text-muted-foreground mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <span className="flex items-center gap-1.5">
          <CalendarDays className="size-4" />
          {w.schedule}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin className="size-4" />
          {w.venue}, {w.city}
        </span>
        <span className="text-foreground font-medium">{w.price}</span>
      </div>
      <Button asChild variant="brand" size="lg" className="mt-6">
        <Link href={`/workshops/${w.slug}`}>
          View details &amp; register
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </div>
  )
}
