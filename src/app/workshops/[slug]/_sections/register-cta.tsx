import { CtaBanner } from "@/components/common/cta-banner"
import { Button } from "@/components/ui/button"
import { BloomFieldBackground } from "@/app/_components/bloom-field-background"
import type { Workshop } from "@/lib/workshops"
import { RegistrationDialog } from "./registration-dialog"

export function RegisterCta({ workshop }: { workshop: Workshop }) {
  return (
    <div className="relative overflow-hidden">
      <BloomFieldBackground />
      <CtaBanner
        variant="brand"
        className="relative bg-transparent"
        heading="Ready to save your seat?"
        subtext={`${workshop.schedule} · ${workshop.venue}, ${workshop.city}`}
        actions={
          <RegistrationDialog
            workshopTitle={workshop.title}
            schedule={workshop.schedule}
            venue={`${workshop.venue}, ${workshop.city}`}
          >
            <Button variant="secondary" size="lg">
              Register now
            </Button>
          </RegistrationDialog>
        }
      />
    </div>
  )
}
