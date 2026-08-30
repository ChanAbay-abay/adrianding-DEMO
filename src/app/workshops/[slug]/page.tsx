import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteNavbar } from "@/app/_components/site-navbar"
import { SiteFooter } from "@/app/_components/site-footer"
import { WORKSHOPS, getWorkshop } from "@/lib/workshops"
import { WorkshopOverview } from "./_sections/overview"
import { WorkshopDetails } from "./_sections/details"
import { RegistrationForm } from "./_sections/registration-form"
import { PaymentDetails } from "./_sections/payment-details"

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return WORKSHOPS.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const w = getWorkshop(slug)
  if (!w) return { title: "Workshop not found" }
  return {
    title: `${w.title} — ${w.schedule} · Coach Adrian Ding`,
    description: w.summary,
  }
}

export default async function WorkshopPage({ params }: Params) {
  const { slug } = await params
  const workshop = getWorkshop(slug)
  if (!workshop) notFound()

  return (
    <>
      <SiteNavbar />
      <main>
        <WorkshopOverview workshop={workshop} />
        <WorkshopDetails workshop={workshop} />

        {workshop.status === "open" && (
          <section
            id="register"
            className="mx-auto max-w-5xl scroll-mt-[calc(var(--nav-h)+1.5rem)] px-6 py-20 sm:px-8 lg:py-32"
          >
            <h2 className="font-serif text-[2.25rem] leading-[1.05] tracking-[-0.02em] lg:text-[3rem]">
              Reserve your seat
            </h2>
            <p className="text-muted-foreground mt-5 max-w-xl text-lg">
              Takes a minute. You&rsquo;ll get payment details by email right
              after.
            </p>
            <div className="mt-10">
              <RegistrationForm
                workshopTitle={workshop.title}
                schedule={workshop.schedule}
                venue={`${workshop.venue}, ${workshop.city}`}
              />
            </div>
          </section>
        )}

        <PaymentDetails />
      </main>
      <SiteFooter />
    </>
  )
}
