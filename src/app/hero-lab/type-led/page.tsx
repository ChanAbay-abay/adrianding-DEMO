import { HeroTypeLed } from "@/app/_sections/hero-type-led"
import { LandingStats } from "@/app/_sections/stats"
import { LandingAbout } from "@/app/_sections/about-teaser"
import { BackLink } from "../_back-link"

export default function TypeLedHeroLab() {
  return (
    <main>
      <BackLink label="Type-led" />
      <HeroTypeLed />
      <div className="bg-background relative z-10">
        <LandingStats />
        <LandingAbout />
      </div>
    </main>
  )
}
