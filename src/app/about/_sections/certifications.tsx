import Image from "next/image"
import { Reveal } from "@/app/_components/reveal"
import { SplitReveal } from "@/app/_components/split-reveal"

/**
 * About — certification / accreditation logos.
 * TODO: confirm the exact accrediting-body names and years (AET / CPD) with the
 * client; the rest are from the PRD.
 */

const CERTS = [
  {
    name: "Peak Potentials",
    line: "Train the Trainer certification — T. Harv Eker, 2004",
    src: "/images/trainer-logo.png",
  },
  {
    name: "Genos International",
    line: "Emotional Intelligence coaching practice, 2017",
    src: "/images/genos-logo.png",
  },
  {
    name: "INSEAD",
    line: "Executive Education programme, 2021",
    src: "/images/insead-logo.png",
  },
  {
    name: "AET",
    line: "Accredited trainer",
    src: "/images/aet-logo.png",
  },
  {
    name: "CPD Council",
    line: "Accredited professional-development provider",
    src: "/images/cpd-logo.png",
  },
]

export function AboutCertifications() {
  return (
    <section className="border-border/60 mx-auto max-w-7xl border-t px-6 py-24 sm:px-8 lg:py-36">
      <SplitReveal
        rule
        className="font-serif text-[2.75rem] leading-[1.05] tracking-[-0.02em] lg:text-[3.75rem]"
      >
        Certifications &amp; accreditations
      </SplitReveal>

      <Reveal
        stagger={0.08}
        className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
      >
        {CERTS.map((c) => (
          <div key={c.name} className="flex items-start gap-4">
            <div className="bg-muted/60 relative size-16 shrink-0 rounded-sm">
              <Image
                src={c.src}
                alt={c.name}
                fill
                sizes="64px"
                className="object-contain p-2"
              />
            </div>
            <div>
              <h3 className="text-foreground font-semibold tracking-tight">
                {c.name}
              </h3>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                {c.line}
              </p>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
