import { QrCode, Landmark } from "lucide-react"

/**
 * Workshop detail — how payment works. Static representation of the real flow
 * (submit → confirmation email with details → reply with proof → staff marks
 * PAID → final confirmation). No live payment in this phase.
 */

const FLOW = [
  "Complete the registration form above.",
  "Receive a confirmation email with the bank and QR payment details.",
  "Pay, then reply to that email thread with your proof of payment.",
  "Our team verifies it and marks your registration as PAID.",
  "You get a final confirmation email with joining instructions.",
]

export function PaymentDetails() {
  return (
    <section className="border-border/60 mx-auto max-w-5xl border-t px-6 py-20 sm:px-8 lg:py-32">
      <h2 className="font-serif text-[2.25rem] leading-[1.05] tracking-[-0.02em] lg:text-[3rem]">
        How payment works
      </h2>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="border-border/70 rounded-md border p-6">
          <Landmark className="text-brand size-5" />
          <h3 className="text-foreground mt-3 font-semibold">Bank transfer</h3>
          <dl className="text-muted-foreground mt-3 space-y-1 text-sm">
            <div className="flex justify-between gap-4">
              <dt>Bank</dt>
              <dd className="text-foreground">[Bank name]*</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Account name</dt>
              <dd className="text-foreground">Maximum Impact PH*</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Account number</dt>
              <dd className="text-foreground">[0000 0000 0000]*</dd>
            </div>
          </dl>
        </div>

        <div className="border-border/70 flex flex-col items-center justify-center rounded-md border p-6 text-center">
          <div className="bg-muted/60 text-muted-foreground flex size-28 items-center justify-center rounded-sm">
            <QrCode className="size-10" />
          </div>
          <p className="text-muted-foreground mt-3 text-sm">QR payment code*</p>
        </div>
      </div>

      <ol className="mt-10 space-y-4">
        {FLOW.map((line, i) => (
          <li key={i} className="flex gap-3">
            <span className="bg-brand/10 text-brand flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
              {i + 1}
            </span>
            <span className="text-muted-foreground text-sm leading-relaxed">
              {line}
            </span>
          </li>
        ))}
      </ol>

      <p className="text-muted-foreground/60 mt-8 text-xs">
        * Placeholder — payment details and CRM status tracking are wired in the
        full build.
      </p>
    </section>
  )
}
