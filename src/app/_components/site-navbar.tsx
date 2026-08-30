"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * The one navbar for the whole site. Self-contained — every page renders
 * `<SiteNavbar />` (inner routes) or `<SiteNavbar overHero />` (landing, where
 * it floats transparent over the dark pinned hero and turns solid once the
 * page content rises over it). Links always go to real routes, never in-page
 * anchors.
 *
 * The single CTA is workshop-forward on purpose: growing public-workshop
 * registrations is the goal (corporate is already the bigger channel).
 */

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/workshops", label: "Workshops" },
  { href: "/corporate-training", label: "Corporate Training" },
]

export function SiteNavbar({ overHero = false }: { overHero?: boolean }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(!overHero)

  // Over the hero: stay transparent until the page's `.hero-curtain` has risen
  // far enough that its top edge reaches the bottom of the navbar, then commit
  // to the solid treatment. IntersectionObserver can't express "top edge at a
  // fixed offset" cleanly (it fires the moment the tall curtain enters from the
  // bottom, a full viewport of scroll too early), so measure the edge directly.
  useEffect(() => {
    if (!overHero) {
      setSolid(true)
      return
    }
    const curtain = document.querySelector(".hero-curtain")
    if (!curtain) {
      setSolid(true)
      return
    }
    const navH = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-h")
    )
    const navHpx = Number.isFinite(navH) ? navH * 16 : 64
    let frame = 0
    const update = () => {
      frame = 0
      setSolid(curtain.getBoundingClientRect().top <= navHpx)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [overHero])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  const linkColor = (active: boolean) =>
    solid
      ? active
        ? "text-brand"
        : "text-foreground/70 hover:text-foreground"
      : active
        ? "text-white"
        : "text-white/70 hover:text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.7)]"

  return (
    <header
      className={cn(
        "top-0 z-50 h-(--nav-h) w-full transition-colors duration-300",
        // Over the hero it floats (the pinned hero is behind it); everywhere
        // else it's a normal sticky bar that reserves its own space.
        overHero ? "fixed" : "sticky",
        solid
          ? "border-border/60 bg-background/85 supports-[backdrop-filter]:bg-background/70 border-b backdrop-blur"
          : "bg-transparent"
      )}
    >
      <nav
        aria-label="Main"
        className="flex h-full w-full items-center justify-between px-6 sm:px-10"
      >
        <Link
          href="/"
          aria-label="Coach Adrian Ding — home"
          className="flex items-center gap-2.5"
        >
          <Image
            src={
              solid ? "/images/ad-logo-black.png" : "/images/ad-logo-white.png"
            }
            alt="Adrian Ding monogram"
            width={88}
            height={88}
            className="h-9 w-9 object-contain"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={cn(
                "text-[0.7rem] font-semibold tracking-[0.16em] uppercase transition-colors",
                linkColor(isActive(l.href))
              )}
            >
              {l.label}
            </Link>
          ))}
          <Button
            asChild
            variant="brand"
            size="sm"
            className={cn(!solid && "shadow-lg")}
          >
            <Link href="/workshops">Register</Link>
          </Button>
        </div>

        {/* Mobile trigger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              className={cn(
                !solid && "text-white hover:bg-white/10 hover:text-white"
              )}
            >
              <MenuIcon className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle asChild>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5"
              >
                <Image
                  src="/images/ad-logo-black.png"
                  alt="Adrian Ding monogram"
                  width={88}
                  height={88}
                  className="h-9 w-9 object-contain"
                />
                <span className="sr-only">Adrian Ding</span>
              </Link>
            </SheetTitle>
            <div className="mt-6 flex flex-col gap-1">
              {LINKS.map((l) => (
                <SheetClose asChild key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={cn(
                      "rounded-sm px-2 py-3 text-xs font-semibold tracking-[0.16em] uppercase transition-colors",
                      isActive(l.href)
                        ? "text-brand"
                        : "text-foreground/80 hover:bg-muted/60 hover:text-foreground"
                    )}
                  >
                    {l.label}
                  </Link>
                </SheetClose>
              ))}
            </div>
            <SheetClose asChild>
              <Button asChild variant="brand" size="lg" className="mt-6 w-full">
                <Link href="/workshops">Register for a workshop</Link>
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
