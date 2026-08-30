/**
 * Adrian's six areas of specialization. Short `blurb` for the landing teaser +
 * corporate page grid; longer `detail` for the About page's expanded version.
 * Copy is representative around the PRD's capability list.
 */
import {
  Compass,
  Mic,
  Users,
  MessagesSquare,
  GraduationCap,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react"

export type Specialization = {
  key: string
  title: string
  blurb: string
  detail: string
  icon: LucideIcon
}

export const SPECIALIZATIONS: Specialization[] = [
  {
    key: "leadership",
    title: "Leadership Training & Development",
    blurb:
      "Turning strong individual performers into leaders who set standards and grow the people around them.",
    detail:
      "Programs that move managers from running tasks to leading people — accountability conversations, coaching in the moment, delegation that develops, and the personal standards a team rises to meet.",
    icon: Compass,
  },
  {
    key: "keynotes",
    title: "Inspirational Keynotes",
    blurb:
      "High-energy, story-led keynotes that leave an audience with something to use, not just a feeling.",
    detail:
      "Conference and company-event keynotes on leadership, culture and performance — built to land with a room of hundreds and still feel personal, and always tied to a concrete takeaway.",
    icon: Mic,
  },
  {
    key: "culture",
    title: "Building Winning Cultures & High-Performing Teams",
    blurb:
      "The rituals and standards that compound a group of good people into a team that wins.",
    detail:
      "How culture actually forms — the small repeatable rituals, scoreboards and streaks — and how to catch and correct drift early before it sets. For teams that need to hold their edge under pressure.",
    icon: Users,
  },
  {
    key: "communication",
    title: "Effective & Compelling Communications",
    blurb:
      "Saying it so it moves people — clarity, structure and presence, in the room and on stage.",
    detail:
      "Message structure, executive presence, handling the tough question, and presenting so the point survives the meeting. Practical work for leaders and client-facing teams.",
    icon: MessagesSquare,
  },
  {
    key: "train-the-trainer",
    title: "Train the Trainer + Coach the Coaches",
    blurb:
      "Equipping in-house facilitators and coaches to run sessions that change behaviour, not just the mood.",
    detail:
      "Session design, facilitation craft, and coaching skill for internal L&D teams — so the capability stays in the company after the external trainer leaves.",
    icon: GraduationCap,
  },
  {
    key: "personal-branding",
    title: "Corporate Imaging & Personal Branding",
    blurb:
      "The signal you send before you say a word — presence, positioning and consistency.",
    detail:
      "For leaders and client-facing professionals: aligning how you show up with what you want to be known for, across the room, the deck and the profile.",
    icon: UserRoundCheck,
  },
]
