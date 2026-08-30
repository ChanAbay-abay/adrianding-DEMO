import Link from "next/link"

/**
 * Hero Lab index — throwaway route for comparing hero directions on the
 * `hero-explorations` branch. Delete once a direction is picked and wired into
 * `src/app/page.tsx`.
 */

const VARIANTS = [
  {
    href: "/hero-lab/cinematic",
    name: "Cinematic → settle",
    tag: "#4",
    blurb:
      "The GQ-cover composition, no scroll pin. One intro timeline plays on load — plate pushes in, portrait rises, wordmark clip-reveals — then it holds as a static hero and normal scrolling takes over.",
  },
  {
    href: "/hero-lab/type-led",
    name: "Type-led",
    tag: "#6",
    blurb:
      "Statement carries the screen, portrait is the supporting column. Light editorial ground, one primary CTA (workshop-forward), hairline stat row, company name-drop. Headline splits into masked lines on load.",
  },
]

export default function HeroLabIndex() {
  return (
    <main className="mx-auto flex min-h-[100svh] max-w-3xl flex-col justify-center px-6 py-24">
      <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
        hero-explorations branch
      </p>
      <h1 className="mt-3 font-serif text-4xl tracking-[-0.02em] sm:text-5xl">
        Hero Lab
      </h1>
      <p className="text-muted-foreground mt-4 max-w-xl">
        Two directions to compare against the current scroll-locked two-stage
        hero. Each opens full-screen with a couple of real sections below it so
        the scroll-out reads.
      </p>

      <ul className="mt-12 space-y-4">
        {VARIANTS.map((v) => (
          <li key={v.href}>
            <Link
              href={v.href}
              className="group border-border/70 hover:border-brand hover:bg-muted/40 block rounded-2xl border p-6 transition-colors"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-brand font-mono text-sm">{v.tag}</span>
                <span className="font-serif text-2xl">{v.name}</span>
                <span className="text-muted-foreground ml-auto text-sm transition-transform group-hover:translate-x-1">
                  open →
                </span>
              </div>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                {v.blurb}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
