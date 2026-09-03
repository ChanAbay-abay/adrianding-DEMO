import type { Metadata } from "next"
import { SiteNavbar } from "@/app/_components/site-navbar"
import { SiteFooter } from "@/app/_components/site-footer"
import { CorporateTrainingHero } from "./_sections/hero"
import { CorporateWhy } from "./_sections/why"
import { CorporatePrograms } from "./_sections/programs"
import { CorporateCompanies } from "./_sections/companies"
import { CorporateTestimonials } from "./_sections/testimonials"
import { CorporateInquiryCta } from "./_sections/inquiry-cta"

export const metadata: Metadata = {
  title: "Corporate Training — Coach Adrian Ding",
  description:
    "Custom corporate training on leadership, culture and communication. 20,000+ professionals trained across the Top 500 companies in the Philippines.",
}

export default function CorporateTrainingPage() {
  return (
    <>
      <SiteNavbar />
      <main>
        <CorporateTrainingHero />
        <CorporateWhy />
        <CorporatePrograms />
        <CorporateCompanies />
        <CorporateTestimonials />
        <CorporateInquiryCta />
      </main>
      <SiteFooter />
    </>
  )
}
