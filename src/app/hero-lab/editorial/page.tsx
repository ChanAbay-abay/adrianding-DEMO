import { HeroEditorial } from "@/app/_sections/hero-editorial"
import { LandingStats } from "@/app/_sections/stats"
import { LandingAbout } from "@/app/_sections/about-teaser"
import { BackLink } from "../_back-link"

/**
 * Hero Lab — "Editorial cover" (#7). The hero renders as a full-screen frame
 * plus a sibling `<nav>` that starts at the hero's bottom edge and pins to the
 * top on scroll. The nav's sticky containing block is this `<main>`, so it
 * stays pinned across the sections below.
 */
export default function EditorialHeroLab() {
  return (
    <main>
      <BackLink label="Editorial cover" />
      <HeroEditorial />
      <div className="bg-background relative z-10">
        <LandingStats />
        <LandingAbout />
      </div>
    </main>
  )
}
