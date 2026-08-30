"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Photo = { src: string; alt: string }

/**
 * Thumbnail grid + dialog lightbox with prev/next. Used on gallery event pages.
 */
export function PhotoLightbox({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const show = (i: number) => {
    setIndex(i)
    setOpen(true)
  }
  const step = (d: number) =>
    setIndex((i) => (i + d + photos.length) % photos.length)

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((p, i) => (
          <button
            key={p.src + i}
            type="button"
            onClick={() => show(i)}
            className="relative aspect-[4/3] overflow-hidden rounded-sm"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 hover:scale-[1.04]"
            />
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        {/* Trigger kept for a11y completeness; opening is driven by the grid. */}
        <DialogTrigger className="sr-only">Open gallery</DialogTrigger>
        <DialogContent className="max-w-3xl border-0 bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">
            {photos[index]?.alt ?? "Event photo"}
          </DialogTitle>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
            <Image
              src={photos[index].src}
              alt={photos[index].alt}
              fill
              sizes="90vw"
              className="object-cover"
            />
          </div>
          {photos.length > 1 && (
            <div className="mt-3 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="bg-background/90 text-foreground flex size-10 items-center justify-center rounded-full"
              >
                <ChevronLeft className="size-4" />
              </button>
              <span className="text-background text-sm">
                {index + 1} / {photos.length}
              </span>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="bg-background/90 text-foreground flex size-10 items-center justify-center rounded-full"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
