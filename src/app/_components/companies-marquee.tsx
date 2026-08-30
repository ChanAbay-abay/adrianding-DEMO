import Image from "next/image"
import { Marquee } from "@/app/_components/marquee"
import { COMPANY_GROUPS, ALL_COMPANIES } from "@/lib/companies"

/**
 * Companies-served marquee — category pills over three greyscale logo rows that
 * drift in alternating directions. Header/heading is the caller's job; this is
 * just the moving wall, so it can drop straight into the landing page and the
 * corporate-training page.
 */

function LogoRow({
  logos,
  direction,
  speed,
}: {
  logos: typeof ALL_COMPANIES
  direction: "left" | "right"
  speed: number
}) {
  return (
    <Marquee direction={direction} speed={speed} className="py-2">
      {logos.map((c) => (
        <Image
          key={c.src}
          src={c.src}
          alt={c.name}
          width={180}
          height={44}
          style={{ width: "auto" }}
          className="h-7 w-auto object-contain opacity-55 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-8 lg:h-9"
        />
      ))}
    </Marquee>
  )
}

export function CompaniesMarquee() {
  const third = Math.ceil(ALL_COMPANIES.length / 3)
  const rows = [
    ALL_COMPANIES.slice(0, third),
    ALL_COMPANIES.slice(third, third * 2),
    ALL_COMPANIES.slice(third * 2),
  ]

  return (
    <div>
      <div className="mx-auto flex max-w-7xl flex-wrap gap-x-3 gap-y-2 px-5 sm:px-8">
        {COMPANY_GROUPS.map((g) => (
          <span
            key={g.category}
            className="border-border/70 text-muted-foreground rounded-full border px-3 py-1 text-xs"
          >
            {g.category}
          </span>
        ))}
      </div>

      <div className="mt-10 space-y-3">
        <LogoRow logos={rows[0]} direction="left" speed={32} />
        <LogoRow logos={rows[1]} direction="right" speed={26} />
        <LogoRow logos={rows[2]} direction="left" speed={30} />
      </div>
    </div>
  )
}
