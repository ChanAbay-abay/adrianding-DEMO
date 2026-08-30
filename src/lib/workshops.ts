/**
 * Public workshop catalogue — powers the workshops list, each workshop detail
 * page (with its countdown + registration form), and the landing-page preview.
 *
 * In the real build this is CMS-managed. Prices are unset pending the client
 * (PRD): shown as an asterisked placeholder. Curriculum outlines are
 * representative — TODO: replace with the exact outline from the source deck.
 */

export type Workshop = {
  slug: string
  title: string
  /** ISO 8601 with PH offset. */
  start: string
  /** Human-readable schedule line. */
  schedule: string
  venue: string
  city: string
  /** Display price — placeholder until the client confirms. */
  price: string
  status: "open" | "past"
  /** One-line hook for cards. */
  summary: string
  /** Longer intro paragraph for the detail page. */
  intro: string
  audience: string
  format: string
  curriculum: string[]
  inclusions: string[]
}

export const WORKSHOPS: Workshop[] = [
  {
    slug: "exceptional-salesmanship",
    title: "Exceptional Salesmanship",
    start: "2026-10-09T09:00:00+08:00",
    schedule: "Friday, October 9, 2026 · 9:00 AM – 5:00 PM",
    venue: "SEDA Ayala Center Cebu, E-bloc",
    city: "Cebu City",
    price: "₱[placeholder]*",
    status: "open",
    summary:
      "A full-day intensive on the mindset, language and process behind sales that close — without pressure tactics.",
    intro:
      "Selling is a transfer of conviction. This one-day workshop rebuilds how you open, qualify, present and close — so the sale feels like the natural next step for the buyer, not a battle. Built for professionals who live and die by their numbers.",
    audience:
      "Account managers, agents and consultants in insurance, real estate, medical, retail and service industries — anyone carrying a quota.",
    format:
      "One full day, in person. Live frameworks, paired practice, role-play with feedback, and a 30-day application plan you leave with.",
    curriculum: [
      "The conviction transfer — why people actually buy",
      "Opening for trust in the first 90 seconds",
      "Question ladders that surface the real need",
      "Presenting value so price becomes a detail",
      "Handling objections without friction",
      "Closing language and the assumptive next step",
      "Building a referral engine from every client",
    ],
    inclusions: [
      "Printed training manual",
      "Certificate of completion",
      "AM & PM snacks plus lunch",
      "30-day post-training application mechanism",
      "Online reunion session with the cohort",
    ],
  },
  {
    slug: "exceptional-leadership",
    title: "Exceptional Leadership",
    start: "2026-10-16T09:00:00+08:00",
    schedule: "Friday, October 16, 2026 · 9:00 AM – 5:00 PM",
    venue: "SEDA Ayala Center Cebu, E-bloc",
    city: "Cebu City",
    price: "₱[placeholder]*",
    status: "open",
    summary:
      "The shift from managing tasks to leading people — a practical day on influence, standards and building a team that owns its results.",
    intro:
      "Most people are promoted for their individual output and then left to figure out leadership on the job. This workshop closes that gap: how to set standards people rise to, have the conversations you have been avoiding, and build a culture that holds without you in the room.",
    audience:
      "New and emerging leaders, supervisors, and senior individual contributors stepping into people management.",
    format:
      "One full day, in person. Case work, guided self-assessment, live coaching demos, and a personal leadership plan.",
    curriculum: [
      "Manager vs leader — the real difference in the day-to-day",
      "Setting standards people choose to meet",
      "The accountability conversation, start to finish",
      "Coaching in the moment instead of rescuing",
      "Delegation that develops the team",
      "Reading and shaping team culture",
      "Your 90-day leadership plan",
    ],
    inclusions: [
      "Printed training manual",
      "Certificate of completion",
      "AM & PM snacks plus lunch",
      "30-day post-training application mechanism",
      "Online reunion session with the cohort",
    ],
  },
  {
    // TODO: replace representative past events with the client's real history.
    slug: "building-winning-cultures-2025",
    title: "Building Winning Cultures",
    start: "2025-11-14T09:00:00+08:00",
    schedule: "November 14, 2025 · 9:00 AM – 5:00 PM",
    venue: "SEDA Ayala Center Cebu, E-bloc",
    city: "Cebu City",
    price: "₱[placeholder]*",
    status: "past",
    summary:
      "A sold-out day on the habits and rituals that turn a group of good people into a high-performing team.",
    intro:
      "Culture is what the team does when no one is watching. This session broke down the small, repeatable rituals that compound into a winning culture.",
    audience: "Team leads, department heads and business owners.",
    format: "One full day, in person.",
    curriculum: [
      "What culture actually is — and isn't",
      "The rituals that build belonging",
      "Standards, scoreboards and streaks",
      "Catching and correcting drift early",
    ],
    inclusions: [
      "Printed training manual",
      "Certificate of completion",
      "AM & PM snacks plus lunch",
      "30-day post-training application mechanism",
      "Online reunion session with the cohort",
    ],
  },
]

export const OPEN_WORKSHOPS = WORKSHOPS.filter((w) => w.status === "open")
export const PAST_WORKSHOPS = WORKSHOPS.filter((w) => w.status === "past")

export function getWorkshop(slug: string): Workshop | undefined {
  return WORKSHOPS.find((w) => w.slug === slug)
}
