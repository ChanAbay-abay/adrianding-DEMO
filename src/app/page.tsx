import { HeroEditorial } from "./_sections/hero-editorial"
import { QuoteReveal } from "./_sections/quote-reveal"
import { LandingCompanies } from "./_sections/companies"
import { LandingStats } from "./_sections/stats"
import { LandingSpecializations } from "./_sections/specializations"
import { LandingPaths } from "./_sections/paths"
import { LandingWorkshopsOpen } from "./_sections/workshops-open"
import { LandingTestimonials } from "./_sections/testimonials"
import { LandingGalleryPreview } from "./_sections/gallery-preview"
import { SiteFooter } from "./_components/site-footer"

/**
 * Landing funnel, top to bottom:
 *   Hero (who) → Quote (the belief) →
 *   Companies (client roster) → Specializations (what he does, "Six
 *   programs, two decades deep") → Stats (the numbers backing that claim,
 *   shared ground with Specializations, no divider) →
 *   Paths (#which-path — pick a lane: workshops vs corporate; the hero's
 *   only CTA scrolls here) →
 *   Workshops open (the individual lane's next step) →
 *   Testimonials → Gallery → Footer.
 */
export default function Page() {
  return (
    <main id="main-content">
      {/* Editorial-cover hero. Renders the same <SiteNavbar> every other page
          does, just started at the hero's bottom edge instead of the top
          (`startBelowHero`); its sticky containing block is this <main>, so
          it stays pinned through every section below. */}
      <HeroEditorial />
      {/* Video-transition beat: an opaque cream sheet rides up over the held
          (sticky) hero, pins, and writes the belief line in word by word. */}
      <QuoteReveal />
      {/* Opaque plane the rest of the page scrolls up on, above the hero.
          Tagged light so the navbar hit-test resolves here and never falls
          through to the still-pinned dark hero underneath; the dark sections
          nested inside (LandingPaths, SiteFooter) carry their own
          `data-navbar-theme="dark"` and win locally via `.closest()`. */}
      <div data-navbar-theme="light" className="bg-background relative z-10">
        {/* Client roster right off the hero. */}
        <LandingCompanies />
        {/* The six areas every engagement is built from. */}
        <LandingSpecializations />
        {/* Headline figures — backs up the six programs just shown. */}
        <LandingStats />
        {/* The fork and the page's single CTA target: workshops (individuals)
            vs corporate training. #which-path — the hero bar scrolls here. */}
        <LandingPaths />
        {/* Concrete next step for anyone who picked the workshop lane. */}
        <LandingWorkshopsOpen />
        <LandingTestimonials />
        <LandingGalleryPreview />
        <SiteFooter />
      </div>
    </main>
  )
}
