import { SiteNavbar } from "./_components/site-navbar"
import { DemoHero } from "./_sections/hero"
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
      {/* One navbar for the whole site. Over the hero it floats transparent,
          then turns solid once `.hero-curtain` rises under it. */}
      <SiteNavbar overHero />
      <DemoHero />
      {/* Curtain: the rest of the page rises up over the pinned hero. The
          negative margin lives in `.hero-curtain` (globals.css) so it can be
          reset under prefers-reduced-motion, where the hero is only one
          viewport tall. The hero itself is owned by a separate work stream. */}
      <div className="hero-curtain bg-background relative z-10 rounded-t-[1.75rem] shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.55)]">
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
