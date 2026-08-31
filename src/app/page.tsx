import { HeroEditorial } from "./_sections/hero-editorial"
import { LandingStats } from "./_sections/stats"
import { LandingAbout } from "./_sections/about-teaser"
import { LandingSpecializations } from "./_sections/specializations"
import { LandingCompanies } from "./_sections/companies"
import { LandingGalleryPreview } from "./_sections/gallery-preview"
import { LandingTestimonials } from "./_sections/testimonials"
import { LandingWorkshopsOpen } from "./_sections/workshops-open"
import { LandingPaths } from "./_sections/paths"
import { LandingCta } from "./_sections/cta"
import { SiteFooter } from "./_components/site-footer"

export default function Page() {
  return (
    <main>
      {/* Editorial-cover hero (#7). It renders its own split nav: a minimal top
          row (socials + Register) that scrolls away, plus the main link bar that
          starts at the hero's bottom edge and pins to the top for the rest of
          the page. Its sticky containing block is this <main>, so it stays
          pinned through every section below — no separate <SiteNavbar> here. */}
      <HeroEditorial />
      {/* Opaque plane the rest of the page scrolls up on, above the hero. */}
      <div className="bg-background relative z-10">
        <LandingStats />
        <LandingAbout />
        <LandingSpecializations />
        <LandingCompanies />
        <LandingGalleryPreview />
        <LandingTestimonials />
        <LandingWorkshopsOpen />
        <LandingPaths />
        <LandingCta />
        <SiteFooter />
      </div>
    </main>
  )
}
