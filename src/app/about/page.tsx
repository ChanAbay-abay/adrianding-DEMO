import type { Metadata } from "next"
import { SiteNavbar } from "@/app/_components/site-navbar"
import { SiteFooter } from "@/app/_components/site-footer"
import { SiteCta } from "@/app/_components/site-cta"
import { AboutStory } from "./_sections/story"
import { AboutJourney } from "./_sections/journey"
import { AboutCertifications } from "./_sections/certifications"
import { SpecializationsDetail } from "@/app/_components/specializations-detail"

export const metadata: Metadata = {
  title: "About Coach Adrian Ding — 20+ years in the training circuit",
  description:
    "Adrian Ding, CEO of Maximum Impact PH — corporate trainer, leadership coach and keynote speaker. His story, certifications and the six areas he goes deep on.",
}

export default function AboutPage() {
  return (
    <>
      <SiteNavbar />
      <main>
        <AboutStory />
        <AboutJourney />
        <AboutCertifications />
        <SpecializationsDetail />
        <SiteCta
          heading="Work with Adrian"
          subtext="Join a public workshop, or bring him in to train your team."
        />
      </main>
      <SiteFooter />
    </>
  )
}
