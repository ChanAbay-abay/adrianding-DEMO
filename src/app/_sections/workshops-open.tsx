import Link from "next/link"
import { ArrowRight, CalendarDays, MapPin } from "lucide-react"
import { Reveal } from "@/app/_components/reveal"
import { SplitReveal } from "@/app/_components/split-reveal"
import { Button } from "@/components/ui/button"
import { OPEN_WORKSHOPS } from "@/lib/workshops"

/**
 * Landing — the open public workshops, listed on the page (PRD flow:
 * "Testimonials → Workshops (open for registration) → Forms"). This is the
 * conversion moment, so the copy pulls forward.
 */
export function LandingWorkshopsOpen() {
  if (OPEN_WORKSHOPS.length === 0) return null

  return (
    <section className="border-border/60 border-t py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SplitReveal
          rule
          className="max-w-3xl font-serif text-[2.75rem] leading-[1.05] tracking-[-0.02em] lg:text-[3.75rem]"
        >
          Open for registration
        </SplitReveal>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed lg:text-xl">
          Two full days with Adrian this October in Cebu. Individual seats,
          Fortune&nbsp;500 material.
        </p>

        <Reveal stagger={0.1} className="mt-14 grid gap-6 lg:grid-cols-2">
          {OPEN_WORKSHOPS.map((w) => (
            <article
              key={w.slug}
              className="border-border/60 flex flex-col justify-between border p-8 lg:p-10"
            >
              <div>
                <h3 className="font-serif text-2xl tracking-tight lg:text-3xl">
                  {w.title}
                </h3>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  {w.summary}
                </p>
                <dl className="text-muted-foreground mt-6 space-y-2 text-sm">
                  <div className="flex items-center gap-2.5">
                    <CalendarDays className="size-4 shrink-0" />
                    {w.schedule}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="size-4 shrink-0" />
                    {w.venue}, {w.city}
                  </div>
                  <div className="text-foreground pt-1 font-medium">
                    {w.price}
                  </div>
                </dl>
              </div>
              <Button asChild variant="brand" size="lg" className="mt-8 w-fit">
                <Link href={`/workshops/${w.slug}`}>
                  View details &amp; register
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
