import type { Metadata } from "next"
import { SiteNavbar } from "@/app/_components/site-navbar"
import { SiteFooter } from "@/app/_components/site-footer"
import { SpecializationsDetail } from "@/app/_components/specializations-detail"
import { CorporateIntro } from "./_sections/intro"
import { CorporateWhy } from "./_sections/why"
import { CorporateCompanies } from "./_sections/companies"
import { CorporateTestimonials } from "./_sections/testimonials"
import { CorporateInquiryForm } from "./_sections/inquiry-form"

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
        <CorporateIntro />
        <CorporateWhy />
        <SpecializationsDetail heading="Programs we run" tone="muted" />
        <CorporateCompanies />
        <CorporateTestimonials />

        <section
          id="inquiry"
          className="border-border/60 mx-auto max-w-2xl scroll-mt-[calc(var(--nav-h)+1.5rem)] border-t px-6 py-24 sm:px-8 lg:py-36"
        >
          <h2 className="font-serif text-[2.5rem] leading-[1.05] tracking-[-0.02em] lg:text-[3.25rem]">
            Tell us what your team needs
          </h2>
          <p className="text-muted-foreground mt-5 text-lg">
            A few quick questions. We&rsquo;ll reply within 2 business days.
          </p>
          <div className="mt-10">
            <CorporateInquiryForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
