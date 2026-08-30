import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type SiteCtaProps = {
  heading?: string
  subtext?: string
}

/**
 * Shared closing call-to-action — full-bleed maroon, dual path, workshop-forward
 * (the workshop button is the primary action everywhere). Closes the landing
 * page and every inner route.
 */
export function SiteCta({
  heading = "Ready to build a winning culture?",
  subtext = "Start with a workshop, or bring Adrian in to train your whole team.",
}: SiteCtaProps) {
  return (
    <section className="bg-brand text-brand-foreground">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:py-36">
        <h2 className="max-w-3xl font-serif text-[2.75rem] leading-[1.03] tracking-[-0.02em] lg:text-[4rem]">
          {heading}
        </h2>
        <p className="text-brand-foreground/80 mt-6 max-w-xl text-lg leading-relaxed lg:text-xl">
          {subtext}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="secondary" size="lg" className="h-12 px-8">
            <Link href="/workshops">
              Register for a workshop
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-brand-foreground/40 text-brand-foreground hover:bg-brand-foreground/10 hover:text-brand-foreground h-12 bg-transparent px-8"
          >
            <Link href="/corporate-training#inquiry">
              Inquire for corporate training
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
