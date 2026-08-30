import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { SiteNavbar } from "@/app/_components/site-navbar"
import { SiteFooter } from "@/app/_components/site-footer"
import { PhotoLightbox } from "@/app/_components/photo-lightbox"
import { Button } from "@/components/ui/button"
import { GALLERY_EVENTS, getGalleryEvent } from "@/lib/gallery"
import { getWorkshop } from "@/lib/workshops"

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return GALLERY_EVENTS.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const e = getGalleryEvent(slug)
  if (!e) return { title: "Event not found" }
  return {
    title: `${e.name} — ${e.date} · Coach Adrian Ding`,
    description: e.blurb,
  }
}

export default async function GalleryEventPage({ params }: Params) {
  const { slug } = await params
  const event = getGalleryEvent(slug)
  if (!event) notFound()

  const related = event.relatedWorkshop
    ? getWorkshop(event.relatedWorkshop)
    : undefined

  return (
    <>
      <SiteNavbar />
      <main className="mx-auto max-w-4xl px-6 py-16 sm:px-8 lg:py-24">
        <Link
          href="/gallery"
          className="text-muted-foreground hover:text-foreground text-xs font-semibold tracking-[0.14em] uppercase"
        >
          ← All events
        </Link>

        <p className="text-muted-foreground mt-8 text-xs tracking-[0.14em] uppercase">
          {event.date} · {event.location}
        </p>
        <h1 className="mt-3 font-serif text-[2.5rem] leading-[1.03] tracking-[-0.02em] sm:text-[3.5rem]">
          {event.name}
        </h1>

        <div className="relative mt-10 aspect-video overflow-hidden">
          <Image
            src={event.cover}
            alt={event.name}
            fill
            priority
            sizes="(min-width: 896px) 896px, 100vw"
            className="object-cover"
          />
        </div>

        <p className="text-muted-foreground mt-8 max-w-2xl text-lg leading-relaxed">
          {event.blurb}
        </p>

        <h2 className="mt-14 font-serif text-2xl tracking-tight">Photos</h2>
        <p className="text-muted-foreground/60 mt-1 text-xs">
          Representative images — event photo sets to follow.
        </p>
        <div className="mt-5">
          <PhotoLightbox photos={event.photos} />
        </div>

        <div className="border-border/70 mt-16 rounded-md border p-8 text-center">
          <p className="text-foreground font-serif text-2xl tracking-tight">
            {related
              ? `${related.title} is open for registration`
              : "Want to be in the next one?"}
          </p>
          <Button asChild variant="brand" size="lg" className="mt-5">
            <Link href={related ? `/workshops/${related.slug}` : "/workshops"}>
              {related ? "View workshop & register" : "See upcoming workshops"}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
