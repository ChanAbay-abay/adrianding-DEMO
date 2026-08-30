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
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

/**
 * Corporate training inquiry — multi-step, progressive disclosure. Frontend
 * only: submitting shows an acknowledgment screen. No network call.
 */

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Enter a valid work email."),
  phone: z.string().min(7, "Enter a valid contact number."),
  company: z.string().min(2, "Which company?"),
  role: z.string().min(2, "Your role or title."),
  context: z.string().optional(),
  consent: z.literal(true, { message: "You need to agree to continue." }),
})

type FormValues = z.infer<typeof schema>

const STEPS: { title: string; fields: (keyof FormValues)[] }[] = [
  { title: "Your details", fields: ["fullName", "email", "phone"] },
  { title: "Your company", fields: ["company", "role", "context"] },
  { title: "Confirm", fields: ["consent"] },
]

export function CorporateInquiryForm() {
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

  if (done) {
    const v = getValues()
    return (
      <div ref={paneRef} className="border-border/70 rounded-md border p-8">
        <div className="bg-brand/10 text-brand flex size-12 items-center justify-center rounded-full">
          <Check className="size-6" />
        </div>
        <h3 className="mt-5 font-serif text-2xl tracking-tight">
          Thanks, {v.fullName.split(" ")[0]}. We&rsquo;ve got your inquiry.
        </h3>
        <p className="text-muted-foreground mt-3 leading-relaxed">
          Someone from the Maximum Impact PH team will reply to{" "}
          <span className="text-foreground">{v.email}</span> within 2 business
          days to understand what {v.company} needs and put together a proposal.
        </p>
        <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
          For context: Adrian has trained 20,000+ professionals across the Top
          500 companies in the Philippines over 20+ years — from multinationals
          to family businesses.
        </p>
        <p className="text-muted-foreground mt-6 flex items-center gap-2 text-sm">
          <Mail className="size-4" />
          coachadrianding@maximumimpact.online
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
      onSubmit={handleSubmit(() => setDone(true))}
      className="border-border/70 rounded-md border p-6 sm:p-8"
    >
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
            <Field label="Work email" error={errors.email?.message}>
              <Input
                type="email"
                className="h-12 text-base"
                autoComplete="email"
                {...register("email")}
              />
            </Field>
            <Field label="Contact number" error={errors.phone?.message}>
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
            <Field label="Company" error={errors.company?.message}>
              <Input className="h-12 text-base" {...register("company")} />
            </Field>
            <Field label="Your role" error={errors.role?.message}>
              <Input
                className="h-12 text-base"
                placeholder="e.g. Head of L&D"
                {...register("role")}
              />
            </Field>
            <Field
              label="What are you looking to work on? (optional)"
              error={errors.context?.message}
            >
              <Textarea
                rows={4}
                className="text-base"
                placeholder="Team size, topic, rough timing…"
                {...register("context")}
              />
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <dl className="bg-muted/40 space-y-2 rounded-sm p-4 text-sm">
              <Row k="Name" v={getValues("fullName") || "—"} />
              <Row k="Email" v={getValues("email") || "—"} />
              <Row k="Company" v={getValues("company") || "—"} />
              <Row k="Role" v={getValues("role") || "—"} />
            </dl>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="accent-brand mt-1 size-4"
                {...register("consent")}
              />
              <span className="text-muted-foreground text-sm leading-relaxed">
                I agree to Maximum Impact PH collecting and processing the
                information above to respond to this inquiry, in line with the
                Philippine Data Privacy Act.
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
            Send inquiry
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
