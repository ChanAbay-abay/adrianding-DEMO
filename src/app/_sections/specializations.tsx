import { Reveal } from "@/app/_components/reveal"
import { SplitReveal } from "@/app/_components/split-reveal"
import { SPECIALIZATIONS } from "@/lib/specializations"

/**
 * Landing — the six areas Adrian goes deep on. Teaser version; the About page
 * carries the expanded copy.
 */

export function LandingSpecializations() {
  return (
    <section className="bg-muted/40 py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SplitReveal
          rule
          className="max-w-3xl font-serif text-[2.75rem] leading-[1.05] tracking-[-0.02em] lg:text-[3.75rem]"
        >
          Six areas Adrian goes deep on
        </SplitReveal>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed lg:text-xl">
          Two decades of the same work, refined into six programs companies book
          again and again.
        </p>

        <Reveal
          stagger={0.09}
          className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SPECIALIZATIONS.map((s) => (
            <div key={s.key}>
              <div className="bg-brand/10 text-brand inline-flex rounded-md p-3">
                <s.icon className="size-5" aria-hidden />
              </div>
              <h3 className="text-foreground mt-5 text-lg font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="text-muted-foreground mt-2.5 leading-relaxed">
                {s.blurb}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
