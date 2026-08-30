import { Counter } from "@/app/_components/counter"
import { Reveal } from "@/app/_components/reveal"
import { SplitReveal } from "@/app/_components/split-reveal"

/**
 * Corporate Training — the case, tied to the numbers.
 */

const POINTS = [
  {
    value: 20000,
    suffix: "+",
    label: "professionals trained",
    body: "Two decades of rooms — from frontline supervisors to executive teams.",
  },
  {
    value: 500,
    prefix: "Top ",
    label: "PH companies",
    body: "Multinationals, banks, hospitals, retailers and family businesses.",
  },
  {
    value: 30,
    suffix: "-day",
    label: "reinforcement",
    body: "Every program includes a follow-through mechanism so the change sticks.",
  },
]

export function CorporateWhy() {
  return (
    <section className="border-border/60 mx-auto max-w-5xl border-t px-6 py-24 sm:px-8 lg:py-36">
      <SplitReveal
        rule
        className="max-w-3xl font-serif text-[2.75rem] leading-[1.05] tracking-[-0.02em] lg:text-[3.75rem]"
      >
        Why teams keep bringing Adrian back
      </SplitReveal>
      <Reveal stagger={0.12} className="mt-16 grid gap-12 sm:grid-cols-3">
        {POINTS.map((p) => (
          <div key={p.label}>
            <p className="text-brand font-serif text-5xl tracking-[-0.02em] lg:text-6xl">
              <Counter to={p.value} prefix={p.prefix} suffix={p.suffix} />
            </p>
            <p className="text-foreground mt-3 text-sm font-semibold tracking-[0.08em] uppercase">
              {p.label}
            </p>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              {p.body}
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
