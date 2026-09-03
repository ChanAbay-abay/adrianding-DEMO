import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteNavbar } from "@/app/_components/site-navbar"
import { SiteFooter } from "@/app/_components/site-footer"
import { WORKSHOPS, getWorkshop } from "@/lib/workshops"
import { WorkshopOverview } from "./_sections/overview"
import { WorkshopDetails } from "./_sections/details"
import { RegisterCta } from "./_sections/register-cta"

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
        {workshop.status === "open" && <RegisterCta workshop={workshop} />}
      </main>
      <SiteFooter />
    </>
  )
}
