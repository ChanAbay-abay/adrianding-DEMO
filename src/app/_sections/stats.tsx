import { Counter } from "@/app/_components/counter"
import { Reveal } from "@/app/_components/reveal"

/**
 * Landing — "By the numbers". Editorial / magazine treatment: a quiet
 * department heading, then four figures set large in the serif with a
 * caption-style line under each. No cards, no rules, no dividers — whitespace
 * and type carry it. Sits directly under <LandingSpecializations> ("Six
 * programs, two decades deep") on the same bg-muted/40 ground, shared no
 * divider, backing up that claim with the numbers right after it.
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
    <section className="bg-muted/40 text-foreground">
      <div className="mx-auto max-w-7xl px-6 pt-4 pb-12 sm:px-8 lg:pt-6 lg:pb-16">
        <h2 className="text-muted-foreground font-serif text-lg italic lg:text-xl">
          By the numbers
        </h2>

        {/* Figures never wrap (`whitespace-nowrap`) so a mid-count value can't
            stack onto a second line and shove its caption down out of step with
            the others. The 4-up track is uneven — the wide "Top 500" and
            "20,000+" columns get extra width so the longest figure clears its
            cell at every size the count-up passes through. */}
        <Reveal
          stagger={0.12}
          className="mt-8 grid grid-cols-2 gap-x-8 gap-y-14 sm:gap-x-16 sm:gap-y-16 lg:mt-12 lg:grid-cols-[1fr_1.2fr_1.35fr_1fr] lg:gap-x-12 lg:gap-y-0 xl:gap-x-16"
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-foreground text-[2rem] leading-none font-bold tracking-[-0.03em] whitespace-nowrap tabular-nums sm:text-5xl lg:text-6xl xl:text-7xl">
                <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="text-muted-foreground mt-6 max-w-[24ch] text-sm leading-snug text-pretty lg:mt-8 lg:text-base">
                {s.label}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
