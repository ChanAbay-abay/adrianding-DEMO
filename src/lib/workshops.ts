/**
 * Public workshop catalogue — powers the workshops list, each workshop detail
 * page (with its countdown + registration form), and the landing-page preview.
 *
 * In the real build this is CMS-managed. Prices are unset pending the client
 * (PRD): shown as "Price on inquiry*" — real UI copy, not a raw placeholder
 * token, so it reads as intentional if this ships before the client confirms
 * figures. TODO: swap in the real price once supplied. Curriculum outlines are
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
  /** Card fill — path under `public/images/`. */
  image: string
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
    price: "Price on inquiry*",
    image: "/images/gallery/primaryhomes/photo-3.jpg",
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
    price: "Price on inquiry*",
    image: "/images/gallery/sunlife/photo-3.jpg",
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
  // TODO: placeholder open workshops — added to preview a fuller catalogue.
  // Replace with the client's real upcoming dates.
  {
    slug: "presenting-with-impact",
    title: "Presenting with Impact",
    start: "2026-10-23T09:00:00+08:00",
    schedule: "Friday, October 23, 2026 · 9:00 AM – 5:00 PM",
    venue: "SEDA Ayala Center Cebu, E-bloc",
    city: "Cebu City",
    price: "Price on inquiry*",
    image: "/images/gallery/axa/photo-3.jpg",
    status: "open",
    summary:
      "Command a room, build a talk that lands, and handle questions without losing the thread — a full day of stagecraft for anyone who presents to clients, boards or their own team.",
    intro:
      "A great idea badly presented loses to a weak idea presented well. This workshop rebuilds how you plan, open, structure and deliver a talk so the audience leaves persuaded and clear on what happens next.",
    audience:
      "Managers, business developers, technical leads and founders who pitch, brief or update an audience as part of the job.",
    format:
      "One full day, in person. Live delivery drills, on-camera feedback, and a rebuilt version of a talk you bring with you.",
    curriculum: [
      "The one-sentence point every talk needs",
      "Structuring for attention, not for completeness",
      "Openings that earn the next five minutes",
      "Slides that support you instead of replacing you",
      "Voice, pace and stillness under pressure",
      "Fielding hard questions and hostile rooms",
      "Closing on a clear call to action",
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
    slug: "negotiation-essentials",
    title: "Negotiation Essentials",
    start: "2026-11-06T09:00:00+08:00",
    schedule: "Friday, November 6, 2026 · 9:00 AM – 5:00 PM",
    venue: "SEDA Ayala Center Cebu, E-bloc",
    city: "Cebu City",
    price: "Price on inquiry*",
    image: "/images/gallery/dueksaminc/photo-3.jpg",
    status: "open",
    summary:
      "Prepare, open and close a negotiation so both sides leave able to say yes — a practical day on leverage, trade-offs and holding your number without burning the relationship.",
    intro:
      "Most people negotiate on instinct and give away margin they never needed to. This workshop gives you a repeatable process: know your walk-away, map the other side's interests, and trade concessions on purpose.",
    audience:
      "Sales, procurement, account management and business owners who close deals, renew contracts or manage suppliers.",
    format:
      "One full day, in person. Paired and group negotiation simulations with debriefs after every round.",
    curriculum: [
      "Preparation: interests, options and your walk-away",
      "Anchoring and the first offer",
      "Trading concessions instead of conceding",
      "Handling pressure, deadlines and silence",
      "Multi-party and internal negotiations",
      "Locking the agreement so it sticks",
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
    slug: "coaching-for-managers",
    title: "Coaching for Managers",
    start: "2026-11-20T09:00:00+08:00",
    schedule: "Friday, November 20, 2026 · 9:00 AM – 5:00 PM",
    venue: "SEDA Ayala Center Cebu, E-bloc",
    city: "Cebu City",
    price: "Price on inquiry*",
    image: "/images/gallery/evercare/photo-3.jpg",
    status: "open",
    summary:
      "Trade rescuing your team for developing it — a full day on the questions, feedback and follow-through that turn everyday conversations into growth.",
    intro:
      "When a manager solves every problem, the team stops growing and the manager stays buried. This workshop teaches a simple coaching habit you can use in a hallway conversation, a one-on-one or a performance review.",
    audience:
      "Team leads, supervisors and managers responsible for the performance and development of others.",
    format:
      "One full day, in person. Live coaching demonstrations, triad practice, and a plan for your next five one-on-ones.",
    curriculum: [
      "Coaching vs telling — when each is right",
      "The core questions that unlock thinking",
      "Feedback that changes behaviour",
      "Running a one-on-one people look forward to",
      "Holding follow-through without micromanaging",
      "Coaching through resistance and low confidence",
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
    slug: "customer-experience-excellence",
    title: "Customer Experience Excellence",
    start: "2026-12-04T09:00:00+08:00",
    schedule: "Friday, December 4, 2026 · 9:00 AM – 5:00 PM",
    venue: "SEDA Ayala Center Cebu, E-bloc",
    city: "Cebu City",
    price: "Price on inquiry*",
    image: "/images/gallery/primaryhomes/photo-5.jpg",
    status: "open",
    summary:
      "Turn ordinary service into a reason customers come back — a full day on the standards, recovery moves and team habits behind an experience people talk about.",
    intro:
      "Customers rarely remember the transaction; they remember how it felt. This workshop breaks down how to design service standards, handle complaints so they build loyalty, and get a whole team consistent.",
    audience:
      "Front-line leads, branch and store managers, and service teams in retail, hospitality, healthcare and professional services.",
    format:
      "One full day, in person. Scenario work, service-recovery role-play, and a standards draft for your own team.",
    curriculum: [
      "What customers actually judge you on",
      "Writing service standards a team can follow",
      "The first 30 seconds of every interaction",
      "Service recovery that wins loyalty back",
      "Handling difficult customers without escalating",
      "Making the standard stick across a team",
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
    price: "Price on inquiry*",
    image: "/images/gallery/sunlife/photo-5.jpg",
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

/**
 * Soonest open workshop by start date — powers the landing announcement strip.
 * `start` is ISO 8601 with a fixed +08:00 offset on every row, so a lexical
 * sort is chronological.
 */
export const NEXT_WORKSHOP: Workshop | undefined = [...OPEN_WORKSHOPS].sort(
  (a, b) => a.start.localeCompare(b.start)
)[0]

export function getWorkshop(slug: string): Workshop | undefined {
  return WORKSHOPS.find((w) => w.slug === slug)
}
