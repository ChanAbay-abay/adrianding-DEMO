import { Reveal } from "@/app/_components/reveal"
import { SplitReveal } from "@/app/_components/split-reveal"
import { SPECIALIZATIONS } from "@/lib/specializations"
import { cn } from "@/lib/utils"

type Props = {
  heading?: string
  /** Section background. */
  tone?: "plain" | "muted"
}

/**
 * The expanded version of the six specializations (longer `detail` copy than
 * the landing teaser). Shared by the About and Corporate Training pages.
 */
export function SpecializationsDetail({
  heading = "What Adrian works on",
  tone = "muted",
}: Props) {
  return (
    <section
      className={cn(
        "py-24 lg:py-36",
        tone === "muted" ? "bg-muted/40" : "border-border/60 border-t"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SplitReveal className="max-w-3xl font-serif text-[2.75rem] leading-[1.05] tracking-[-0.02em] lg:text-[3.75rem]">
          {heading}
        </SplitReveal>

        <Reveal
          stagger={0.08}
          className="mt-16 grid gap-x-14 gap-y-16 md:grid-cols-2"
        >
          {SPECIALIZATIONS.map((s) => (
            <div key={s.key} className="flex gap-5">
              <div className="bg-brand/10 text-brand mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md">
                <s.icon className="size-5" aria-hidden />
              </div>
              <div>
                <h3 className="text-foreground text-xl font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="text-muted-foreground mt-3 leading-relaxed">
                  {s.detail}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
