import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/app/_components/reveal"
import { Button } from "@/components/ui/button"

/**
 * Landing — the fork. Deliberately workshop-forward: the workshop card is the
 * larger, louder one (growing public registrations is the goal), corporate is
 * the quieter second path.
 */

export function LandingPaths() {
  return (
    <section className="border-border/60 border-t py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          {/* Primary path — workshops */}
          <div className="bg-brand text-brand-foreground flex flex-col justify-between p-10 lg:p-14">
            <div>
              <p className="text-brand-foreground/70 text-xs font-semibold tracking-[0.16em] uppercase">
                For individuals
              </p>
              <h3 className="mt-5 font-serif text-[2rem] leading-[1.05] tracking-[-0.02em] lg:text-[2.75rem]">
                Join a public workshop
              </h3>
              <p className="text-brand-foreground/80 mt-5 max-w-md text-lg leading-relaxed">
                Spend a day with Adrian on salesmanship or leadership — the same
                material Fortune 500 teams get, open for individual
                registration.
              </p>
            </div>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="mt-10 w-fit"
            >
              <Link href="/workshops">
                See upcoming workshops
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          {/* Secondary path — corporate */}
          <div className="border-border/60 flex flex-col justify-between border p-10 lg:p-14">
            <div>
              <p className="text-muted-foreground text-xs font-semibold tracking-[0.16em] uppercase">
                For companies
              </p>
              <h3 className="mt-5 font-serif text-[2rem] leading-[1.05] tracking-[-0.02em] lg:text-[2.75rem]">
                Train your team
              </h3>
              <p className="text-muted-foreground mt-5 max-w-md leading-relaxed">
                Custom corporate programs on leadership, culture and
                communication, delivered on-site or off.
              </p>
            </div>
            <Link
              href="/corporate-training#inquiry"
              className="text-brand group mt-10 inline-flex w-fit items-center gap-2 text-sm font-semibold tracking-[0.12em] uppercase"
            >
              Inquire for corporate training
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
