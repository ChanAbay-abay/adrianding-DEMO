import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/app/_components/reveal"
import { SplitReveal } from "@/app/_components/split-reveal"
import { GALLERY_EVENTS } from "@/lib/gallery"

/**
 * Landing — a look inside recent rooms. Links through to the full gallery.
 * TODO: images are the three lifestyle stand-ins until real event photos land.
 */

export function LandingGalleryPreview() {
  const events = GALLERY_EVENTS.slice(0, 3)

  return (
    <section className="bg-muted/40 py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SplitReveal
              rule
              className="font-serif text-[2.75rem] leading-[1.05] tracking-[-0.02em] lg:text-[3.75rem]"
            >
              Inside the room
            </SplitReveal>
            <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed lg:text-xl">
              A few of the workshops and keynotes from the last two years.
            </p>
          </div>
          <Link
            href="/gallery"
            className="text-brand group hidden items-center gap-2 pb-2 text-sm font-semibold tracking-[0.12em] uppercase sm:inline-flex"
          >
            All events
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <Reveal stagger={0.1} className="mt-14 grid gap-10 md:grid-cols-3">
          {events.map((e) => (
            <Link
              key={e.slug}
              href={`/gallery/${e.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={e.cover}
                  alt={e.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <p className="text-muted-foreground mt-5 text-xs tracking-[0.1em] uppercase">
                {e.date} · {e.location}
              </p>
              <h3 className="text-foreground group-hover:text-brand mt-2 text-xl font-semibold tracking-tight transition-colors">
                {e.name}
              </h3>
            </Link>
          ))}
        </Reveal>

        <Link
          href="/gallery"
          className="text-brand mt-12 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.12em] uppercase sm:hidden"
        >
          All events
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  )
}
