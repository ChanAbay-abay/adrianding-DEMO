/**
 * Past events / successful workshops — the Gallery parent grid and each event's
 * child page.
 *
 * TODO: all events below are representative and reuse the three lifestyle
 * photos as stand-ins. Replace with the client's real event names, dates,
 * descriptions and photo sets as they are sourced.
 */

export type GalleryEvent = {
  slug: string
  name: string
  /** Display date. */
  date: string
  /** Year, for the filter. */
  year: number
  location: string
  blurb: string
  /** Card + hero image. */
  cover: string
  /** Lightbox grid. */
  photos: { src: string; alt: string }[]
  /** Optional related upcoming workshop slug. */
  relatedWorkshop?: string
}

const STANDINS = [
  {
    src: "/images/ad-photo-1.png",
    alt: "Adrian Ding speaking to a workshop audience",
  },
  {
    src: "/images/ad-photo-2.png",
    alt: "Workshop participants during a group exercise",
  },
  {
    src: "/images/ad-photo-3.png",
    alt: "Adrian Ding coaching a participant one on one",
  },
]

export const GALLERY_EVENTS: GalleryEvent[] = [
  {
    slug: "exceptional-salesmanship-manila-2025",
    name: "Exceptional Salesmanship — Manila",
    date: "March 2025",
    year: 2025,
    location: "Makati City",
    blurb:
      "A full house of agents and account managers spent the day rebuilding how they open, qualify and close. The energy in the room carried straight through the afternoon.",
    cover: STANDINS[0].src,
    photos: STANDINS,
    relatedWorkshop: "exceptional-salesmanship",
  },
  {
    slug: "leadership-intensive-cebu-2025",
    name: "Leadership Intensive — Cebu",
    date: "June 2025",
    year: 2025,
    location: "Cebu City",
    blurb:
      "Emerging leaders from a dozen companies worked through the accountability conversation and left with a 90-day plan they wrote themselves.",
    cover: STANDINS[1].src,
    photos: STANDINS,
    relatedWorkshop: "exceptional-leadership",
  },
  {
    slug: "building-winning-cultures-2025",
    name: "Building Winning Cultures",
    date: "November 2025",
    year: 2025,
    location: "Cebu City",
    blurb:
      "A sold-out session on the rituals that compound into a high-performing team — one of the most requested repeat topics of the year.",
    cover: STANDINS[2].src,
    photos: STANDINS,
  },
  {
    slug: "keynote-hr-summit-2024",
    name: "Keynote — National HR Summit",
    date: "September 2024",
    year: 2024,
    location: "Pasay City",
    blurb:
      "Adrian opened the summit with a keynote on building winning cultures to an audience of several hundred HR and L&D leaders.",
    cover: STANDINS[0].src,
    photos: STANDINS,
  },
  {
    slug: "train-the-trainer-2024",
    name: "Train the Trainer + Coach the Coaches",
    date: "May 2024",
    year: 2024,
    location: "Mandaue City",
    blurb:
      "An intensive for in-house facilitators — how to design a session that changes behaviour, not just the mood in the room.",
    cover: STANDINS[1].src,
    photos: STANDINS,
  },
  {
    slug: "personal-branding-workshop-2024",
    name: "Corporate Imaging & Personal Branding",
    date: "February 2024",
    year: 2024,
    location: "Makati City",
    blurb:
      "Client-facing professionals worked on the signal they send before they say a word — presence, positioning and consistency.",
    cover: STANDINS[2].src,
    photos: STANDINS,
  },
]

export function getGalleryEvent(slug: string): GalleryEvent | undefined {
  return GALLERY_EVENTS.find((e) => e.slug === slug)
}

export const GALLERY_YEARS = [
  ...new Set(GALLERY_EVENTS.map((e) => e.year)),
].sort((a, b) => b - a)
