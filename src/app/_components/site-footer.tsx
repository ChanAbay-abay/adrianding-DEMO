import Image from "next/image"
import Link from "next/link"
import { Instagram, Linkedin, Facebook, Mail, Phone } from "lucide-react"

/**
 * Global footer — used on every page including the landing page. Carries the
 * standing "Demo by iridel.com" credit (Iridel lessons 2026-07-16).
 */

const NAV = [
  { href: "/workshops", label: "Workshops" },
  { href: "/corporate-training", label: "Corporate Training" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/staff-login", label: "Staff login" },
]

const SOCIALS = [
  { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
  { href: "https://facebook.com", label: "Facebook", Icon: Facebook },
]

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M16.5 3c.3 2 1.5 3.6 3.5 3.9v2.7c-1.3.1-2.5-.2-3.6-.8v6.6c0 3.4-2.6 5.6-5.7 5.6A5.5 5.5 0 0 1 5 12.9c1-.7 2.2-1.1 3.5-1v2.9a2.7 2.7 0 0 0-1.2-.1 2.6 2.6 0 0 0 .5 5.1c1.5 0 2.8-1.2 2.8-3V3h3.9Z" />
    </svg>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-border/70 border-t">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/images/ad-logo-black.png"
                alt="Adrian Ding monogram"
                width={80}
                height={80}
                className="h-10 w-10 object-contain"
              />
              <span className="font-serif text-xl tracking-tight">
                Adrian Ding
              </span>
            </Link>
            <p className="text-muted-foreground mt-4 max-w-sm leading-relaxed">
              Leadership development, corporate training and keynotes from the
              CEO of Maximum Impact PH. 20+ years, 20,000+ leaders trained.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-muted-foreground hover:text-brand hover:border-brand/40 border-border/70 flex size-9 items-center justify-center rounded-full border transition-colors"
                >
                  <Icon className="size-4" />
                </a>
              ))}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-muted-foreground hover:text-brand hover:border-brand/40 border-border/70 flex size-9 items-center justify-center rounded-full border transition-colors"
              >
                <TikTokIcon className="size-4" />
              </a>
            </div>
          </div>

          {/* Quick nav */}
          <nav aria-label="Footer" className="flex flex-col gap-3">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase">
              Explore
            </p>
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-muted-foreground hover:text-foreground w-fit text-sm transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase">
              Contact
            </p>
            <a
              href="mailto:coachadrianding@maximumimpact.online"
              className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm break-all transition-colors"
            >
              <Mail className="size-4 shrink-0" />
              coachadrianding@maximumimpact.online
            </a>
            <a
              href="tel:+639209007709"
              className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
            >
              <Phone className="size-4 shrink-0" />
              0920 900 7709
            </a>
          </div>
        </div>

        <div className="border-border/70 mt-14 flex flex-col items-start justify-between gap-3 border-t pt-6 sm:flex-row sm:items-center">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Coach Adrian Ding · Maximum Impact PH.
            All rights reserved.
          </p>
          <a
            href="https://iridel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground/40 hover:text-muted-foreground/70 text-xs transition-colors"
          >
            Demo by iridel.com
          </a>
        </div>
      </div>
    </footer>
  )
}
