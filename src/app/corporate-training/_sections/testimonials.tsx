import { SplitReveal } from "@/app/_components/split-reveal"
import { TestimonialCarousel } from "@/app/_components/testimonial-carousel"
import { CORPORATE_TESTIMONIALS } from "@/lib/testimonials"

/**
 * Corporate Training — corporate-specific testimonial subset.
 * TODO: quotes are placeholders until the source PDF is supplied.
 */
export function CorporateTestimonials() {
  return (
    <section className="py-24 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-[0.65fr_minmax(0,1fr)] lg:gap-24">
        <SplitReveal
          rule
          className="font-serif text-[2.75rem] leading-[1.05] tracking-[-0.02em] lg:text-[3.75rem]"
        >
          From the people who signed off on it
        </SplitReveal>
        <TestimonialCarousel testimonials={CORPORATE_TESTIMONIALS} />
      </div>
    </section>
  )
}
