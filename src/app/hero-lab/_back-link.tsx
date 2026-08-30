import Link from "next/link"

/**
 * Hero Lab only — a small fixed pill to jump back to the variant index.
 * Not part of the site; the lab routes exist to compare hero directions in
 * isolation before one is wired into the real landing page.
 */
export function BackLink({ label }: { label: string }) {
  return (
    <Link
      href="/hero-lab"
      className="fixed top-4 left-4 z-[100] rounded-full bg-black/70 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-white uppercase backdrop-blur transition-colors hover:bg-black/90"
    >
      ↩ Hero Lab · {label}
    </Link>
  )
}
