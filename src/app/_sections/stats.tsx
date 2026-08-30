import { Counter } from "@/app/_components/counter"
import { Reveal } from "@/app/_components/reveal"

/**
 * Landing — credibility bar. Four numbers, straight on the page, no cards.
 * Labels verbatim from the PRD story section.
 */

const STATS = [
  { value: 20, suffix: "+", label: "Years in the training circuit" },
  { value: 20000, suffix: "+", label: "Professionals trained" },
  { value: 500, prefix: "Top ", label: "PH companies trained" },
  // TODO: confirm industry count with the client (PRD marks this a placeholder).
  { value: 9, suffix: "+", label: "Industries served" },
]

export function LandingStats() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-28 pb-24 sm:px-8 lg:pt-32 lg:pb-36">
      <Reveal
        stagger={0.12}
        className="lg:divide-border/60 grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-4 lg:divide-x"
      >
        {STATS.map((s) => (
          <div key={s.label} className="lg:px-10 lg:first:pl-0">
            <p className="text-foreground font-serif text-6xl tracking-[-0.02em] lg:text-7xl">
              <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
            </p>
            <p className="text-muted-foreground mt-4 text-sm tracking-[0.08em] uppercase">
              {s.label}
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
