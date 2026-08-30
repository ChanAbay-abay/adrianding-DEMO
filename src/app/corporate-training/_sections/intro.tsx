import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/app/_components/reveal"
import { SplitReveal } from "@/app/_components/split-reveal"
import { Button } from "@/components/ui/button"

/**
 * Corporate Training — page opener. Positions custom corporate programs as the
 * core offering (80% of the practice).
 */
export function CorporateIntro() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-20 pb-20 sm:px-8 lg:pt-28 lg:pb-28">
      <SplitReveal
        as="h1"
        className="font-serif text-[2.75rem] leading-[1.03] tracking-[-0.02em] sm:text-[3.5rem] lg:text-[4.5rem]"
      >
        Training built around your team, not a template.
      </SplitReveal>
      <Reveal delay={0.1} className="mt-8 space-y-6">
        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed lg:text-xl">
          Most of Adrian&rsquo;s work is custom corporate programs — designed
          with your L&amp;D team around the outcome you need, delivered on-site
          or off, and reinforced after the room clears.
        </p>
        <Button asChild variant="brand" size="lg" className="h-12 px-8">
          <Link href="#inquiry">
            Start an inquiry
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </Reveal>
    </section>
  )
}
