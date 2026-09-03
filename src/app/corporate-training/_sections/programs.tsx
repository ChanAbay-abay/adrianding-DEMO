import { SplitReveal } from "@/app/_components/split-reveal"
import { Reveal } from "@/app/_components/reveal"
import {
  SpecRevealCards,
  type SpecCard,
} from "@/app/_components/spec-reveal-cards"
import {
  SPECIALIZATIONS,
  SPECIALIZATION_IMAGES,
  SPECIALIZATION_IMAGE_ALTS,
} from "@/lib/specializations"

/**
 * Corporate Training — same reveal-card treatment as the landing page's
 * specializations section, mirrored (rail on the right, cards on the left),
 * reframed around what a team gets when they bring Adrian in.
 */
const CARDS: SpecCard[] = SPECIALIZATIONS.map((spec) => ({
  key: spec.key,
  title: spec.title,
  blurb: spec.blurb,
  image: SPECIALIZATION_IMAGES[spec.key],
  imageAlt: SPECIALIZATION_IMAGE_ALTS[spec.key],
}))

export function CorporatePrograms() {
  return (
    <section className="bg-muted/40 py-24 lg:py-36">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        {/* `flex flex-col` below `lg` so the `order-*` classes actually apply
            — as a plain block container they did nothing, and the card rail
            (first in DOM, so it can sit left on the desktop grid) rendered
            above its own heading on mobile. */}
        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,19rem)] lg:gap-16 xl:gap-20">
          {/* Cards on the left this time. */}
          {/* Horizontal snap rail below `lg`, vertical stack from `lg` — see
              the landing page's `LandingSpecializations` for the same pair. */}
          <Reveal
            stagger={0.08}
            className="no-scrollbar order-2 -mx-6 mt-12 flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto px-6 pb-1 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:order-1 lg:mx-0 lg:mt-0 lg:snap-none lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
          >
            <SpecRevealCards items={CARDS} />
          </Reveal>

          {/* Rail on the right — held in view while the stack scrolls past. */}
          <div className="order-1 lg:sticky lg:top-28 lg:order-2 lg:self-start">
            <SplitReveal
              rule
              className="font-serif text-[2.5rem] leading-[1.05] tracking-[-0.02em] lg:text-[3rem]"
            >
              Programs
              <br />
              <span className="text-brand">we run</span>
            </SplitReveal>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
              Six areas, refined over twenty years on the training circuit —
              tailored to your team&rsquo;s roles, industry and goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
