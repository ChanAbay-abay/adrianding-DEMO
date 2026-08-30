import { SplitReveal } from "@/app/_components/split-reveal"
import { CompaniesMarquee } from "@/app/_components/companies-marquee"

/**
 * Landing — proof by logo wall. Categorised, moving (PRD).
 */

export function LandingCompanies() {
  return (
    <section className="border-border/60 overflow-hidden border-t py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SplitReveal
          rule
          className="max-w-3xl font-serif text-[2.75rem] leading-[1.05] tracking-[-0.02em] lg:text-[3.75rem]"
        >
          Trusted by the companies that set the standard
        </SplitReveal>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed lg:text-xl">
          From multinationals and banks to family businesses and hospitals —
          Adrian has trained leaders across the Philippine economy.
        </p>
      </div>

      <div className="mt-16">
        <CompaniesMarquee />
      </div>
    </section>
  )
}
