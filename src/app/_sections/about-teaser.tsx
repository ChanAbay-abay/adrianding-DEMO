import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/app/_components/reveal"
import { SplitReveal } from "@/app/_components/split-reveal"

/**
 * Landing — the person behind the work. Belief statement pulled from the deck
 * ("two things I love: coffee and developing people" → better people → better
 * companies → better country).
 */

export function LandingAbout() {
  return (
    <section className="border-border/60 border-t py-24 lg:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 sm:px-8 lg:grid-cols-[0.8fr_1fr] lg:gap-24">
        <Reveal className="relative aspect-[4/5] overflow-hidden">
          <Image
            src="/images/ad-photo-1.png"
            alt="Coach Adrian Ding"
            fill
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="object-cover"
          />
        </Reveal>

        <div>
          <SplitReveal
            as="p"
            by="lines"
            className="pull-quote text-[2rem] sm:text-[2.5rem] lg:text-[3rem]"
          >
            Two things I love: coffee, and developing people.
          </SplitReveal>

          <Reveal delay={0.1} className="mt-10 space-y-6">
            <p className="text-muted-foreground text-lg leading-relaxed lg:text-xl">
              Adrian Ding is the CEO of Maximum Impact PH and has spent more
              than 20 years in the training circuit — on stages, in boardrooms,
              and beside the people doing the actual work.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed lg:text-xl">
              The belief under all of it is simple: better people build better
              companies, and better companies build a better country. Everything
              he teaches ladders back to that.
            </p>
            <Link
              href="/about"
              className="text-brand group inline-flex items-center gap-2 pt-2 text-sm font-semibold tracking-[0.12em] uppercase"
            >
              Read Adrian&rsquo;s story
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
