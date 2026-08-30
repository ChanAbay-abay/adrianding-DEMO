/**
 * Shared scroll tuning for the landing hero's two-stage pinned narrative.
 *
 * Imported by the client hero (`_sections/hero.tsx`). The curtain distance is
 * mirrored as a plain `-100vh` in the `.hero-curtain` rule in `globals.css`
 * (that rule can't read a TS constant) — keep `CURTAIN_VH` equal to it.
 */

/** The pinned stage fills exactly one viewport. */
export const STAGE_VH = 100

/** Scroll distance the stage-1 → stage-2 transition plays across. */
export const NARRATIVE_VH = 105

/** Scroll distance stage 2 sits fully formed before the curtain starts. */
export const STAGE2_HOLD_VH = 95

/** Scroll distance the rest of the page takes to rise up over the pinned hero. */
export const CURTAIN_VH = 100

/** Total height of the hero's scroll track. */
export const HERO_TRACK_VH =
  STAGE_VH + NARRATIVE_VH + STAGE2_HOLD_VH + CURTAIN_VH

/**
 * `scrollYProgress` value (0→1 across the pinned range) at which the stage-1 →
 * stage-2 transition finishes. After this it holds at 1 through the dwell and
 * the curtain.
 */
export const NARRATIVE_END =
  NARRATIVE_VH / (NARRATIVE_VH + STAGE2_HOLD_VH + CURTAIN_VH)
