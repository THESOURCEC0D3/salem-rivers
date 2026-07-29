import type { StaticImageData } from "next/image";
import bishopHilary from "../../public/images/BishopHillary.png";
import archbishop from "../../public/images/Archbishop.jpg";

/**
 * Leadership photos, keyed by `church.about.leadership[].name` — name-keyed, not
 * index-keyed, so the mapping survives the list being reordered (same rationale
 * as `departmentImages`).
 *
 * A leader with no entry here keeps their PhotoPlaceholder. Add a key when a real
 * photo lands; nothing else needs to change.
 *
 * Statically imported for build-time dimensions + blur-up placeholders.
 */
export const leaderImages: Record<
  string,
  { src: StaticImageData; alt: string; objectPosition?: string }
> = {
  "Bishop Hilary Ogoliegbune": {
    src: bishopHilary,
    alt: "Bishop Hilary Ogoliegbune, Lead Pastor of Salem Rivers",
    objectPosition: "object-top",
  },
  "Archbishop Sam Amaga": {
    // Landscape source cropped into a portrait card, so centring would cut the
    // head off. Anchoring to the top keeps the face in frame.
    src: archbishop,
    alt: "Archbishop Sam Amaga, founder of Foundation Faith Church",
    objectPosition: "object-top",
  },
};
