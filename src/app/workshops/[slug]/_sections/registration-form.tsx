"use client"

import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft, ArrowRight, Check, Mail } from "lucide-react"
import { gsap, useGSAP } from "@/app/_lib/gsap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

/**
 * Workshop registration — multi-step, progressive disclosure (PRD UX direction).
 * Frontend only: submitting advances to a confirmation screen that spells out
 * the real payment flow. No network call.
 */

const SALARY_RANGES = [
  "Under ₱30,000",
  "₱30,000 – ₱50,000",
  "₱50,000 – ₱80,000",
  "₱80,000 – ₱120,000",
  "Over ₱120,000",
  "Prefer not to say",
] as const

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().min(7, "Enter a valid mobile number."),
  occupation: z.string().min(2, "Tell us what you do."),
  salaryRange: z.enum(SALARY_RANGES, {
    message: "Select a range.",
  }),
  city: z.string().optional(),
  consent: z.literal(true, {
    message: "You need to agree to continue.",
  }),
})

type FormValues = z.infer<typeof schema>

const STEPS: { title: string; fields: (keyof FormValues)[] }[] = [
  { title: "Who's registering", fields: ["fullName", "email", "phone"] },
  { title: "About you", fields: ["occupation", "salaryRange", "city"] },
  { title: "Confirm", fields: ["consent"] },
]

type Props = { workshopTitle: string; schedule: string; venue: string }

export function RegistrationForm({ workshopTitle, schedule, venue }: Props) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const paneRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  })

  useGSAP(
    () => {
      const el = paneRef.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 24 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
        )
      })
      return () => mm.revert()
    },
    { dependencies: [step, done], scope: paneRef }
  )

  const next = async () => {
    const ok = await trigger(STEPS[step].fields)
    if (ok) setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }
  const back = () => setStep((s) => Math.max(s - 1, 0))
  const onSubmit = () => setDone(true)

  if (done) {
    const v = getValues()
    return (
      <div ref={paneRef} className="border-border/70 rounded-md border p-8">
        <div className="bg-brand/10 text-brand flex size-12 items-center justify-center rounded-full">
          <Check className="size-6" />
        </div>
        <h3 className="mt-5 font-serif text-2xl tracking-tight">
          You&rsquo;re on the list, {v.fullName.split(" ")[0]}.
        </h3>
        <p className="text-muted-foreground mt-3 leading-relaxed">
          Your spot for <span className="text-foreground">{workshopTitle}</span>{" "}
          is held. Here is what happens next:
        </p>
        <ol className="mt-6 space-y-4">
          {[
            `We email a confirmation to ${v.email} with the payment details (bank transfer or QR).`,
            "You send payment and reply to that same email thread with your proof of payment.",
            "Our team reviews it and marks your registration as PAID in our system.",
            "You get a final confirmation email with your joining instructions and a primer video.",
          ].map((line, i) => (
            <li key={i} className="flex gap-3">
              <span className="bg-muted text-foreground/70 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                {i + 1}
              </span>
              <span className="text-muted-foreground text-sm leading-relaxed">
                {line}
              </span>
            </li>
          ))}
        </ol>
        <p className="text-muted-foreground mt-6 flex items-center gap-2 text-sm">
          <Mail className="size-4" />
          Questions? coachadrianding@maximumimpact.online
        </p>
        <p className="text-muted-foreground/60 mt-6 text-xs">
          Demo form — no data is sent or stored.
        </p>
      </div>
    )
  }

  const current = STEPS[step]

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-border/70 rounded-md border p-6 sm:p-8"
    >
      {/* Progress */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div
            key={s.title}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i <= step ? "bg-brand" : "bg-border"
            )}
          />
        ))}
      </div>
      <p className="text-muted-foreground mt-3 text-xs tracking-[0.1em] uppercase">
        Step {step + 1} of {STEPS.length} · {current.title}
      </p>

      <div ref={paneRef} className="mt-6 space-y-5">
        {step === 0 && (
          <>
            <Field label="Full name" error={errors.fullName?.message}>
              <Input
                className="h-12 text-base"
                autoComplete="name"
                {...register("fullName")}
              />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <Input
                type="email"
                className="h-12 text-base"
                autoComplete="email"
                {...register("email")}
              />
            </Field>
            <Field label="Mobile number" error={errors.phone?.message}>
              <Input
                type="tel"
                className="h-12 text-base"
                autoComplete="tel"
                placeholder="0917 000 0000"
                {...register("phone")}
              />
            </Field>
          </>
        )}

        {step === 1 && (
          <>
            <Field label="Occupation / role" error={errors.occupation?.message}>
              <Input
                className="h-12 text-base"
                placeholder="e.g. Insurance advisor"
                {...register("occupation")}
              />
            </Field>
            <Field label="Salary range" error={errors.salaryRange?.message}>
              <select
                className="border-input bg-background focus-visible:ring-ring h-12 w-full rounded-md border px-3 text-base shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
                defaultValue=""
                {...register("salaryRange")}
              >
                <option value="" disabled>
                  Select a range
                </option>
                {SALARY_RANGES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="City (optional)" error={errors.city?.message}>
              <Input
                className="h-12 text-base"
                autoComplete="address-level2"
                {...register("city")}
              />
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <dl className="bg-muted/40 space-y-2 rounded-sm p-4 text-sm">
              <Row k="Workshop" v={workshopTitle} />
              <Row k="Schedule" v={schedule} />
              <Row k="Venue" v={venue} />
              <Row k="Name" v={getValues("fullName") || "—"} />
              <Row k="Email" v={getValues("email") || "—"} />
            </dl>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="accent-brand mt-1 size-4"
                {...register("consent")}
              />
              <span className="text-muted-foreground text-sm leading-relaxed">
                I agree to Maximum Impact PH collecting and processing the
                information above to manage my workshop registration, in line
                with the Philippine Data Privacy Act.
              </span>
            </label>
            {errors.consent?.message && (
              <p className="text-destructive text-sm">
                {errors.consent.message}
              </p>
            )}
          </>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between">
        {step > 0 ? (
          <Button type="button" variant="ghost" onClick={back}>
            <ArrowLeft className="size-4" />
            Back
          </Button>
        ) : (
          <span />
        )}
        {step < STEPS.length - 1 ? (
          <Button type="button" variant="brand" onClick={next}>
            Continue
            <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button type="submit" variant="brand">
            Complete registration
          </Button>
        )}
      </div>
    </form>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-foreground text-right font-medium">{v}</dd>
    </div>
  )
}
