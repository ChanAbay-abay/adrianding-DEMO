import { HeroCinematic } from "@/app/_sections/hero-cinematic"
import { LandingStats } from "@/app/_sections/stats"
import { LandingAbout } from "@/app/_sections/about-teaser"
import { BackLink } from "../_back-link"

export default function CinematicHeroLab() {
  return (
    <main>
      <BackLink label="Cinematic → settle" />
      <HeroCinematic />
      <div className="bg-background relative z-10">
        <LandingStats />
        <LandingAbout />
      </div>
    </main>
  )
}
