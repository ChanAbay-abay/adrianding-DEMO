import { SplitReveal } from "@/app/_components/split-reveal"
import { TestimonialCarousel } from "@/app/_components/testimonial-carousel"
import { TESTIMONIALS } from "@/lib/testimonials"

/**
 * Landing — what clients say, all eight, one at a time.
 * TODO: quotes are placeholders until the source PDF is supplied.
 */

export function LandingTestimonials() {
  return (
    <section className="border-border/60 border-t py-24 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-[0.65fr_minmax(0,1fr)] lg:gap-24">
        <SplitReveal
          rule
          className="font-serif text-[2.75rem] leading-[1.05] tracking-[-0.02em] lg:text-[3.75rem]"
        >
          The people who booked him twice
        </SplitReveal>
        <TestimonialCarousel testimonials={TESTIMONIALS} />
      </div>
    </section>
  )
}
