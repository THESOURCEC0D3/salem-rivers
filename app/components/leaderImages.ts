import type { StaticImageData } from "next/image";
import bishopHilary from "../../public/images/BishopHillary.png";
import archbishop from "../../public/images/Archbishop.png";
import doctorLove from "../../public/images/Doctor-love-Sam-Amaga.png";

/**
 * Leadership photos, keyed by `church.about.leadership[].name` — name-keyed, not
 * index-keyed, so the mapping survives the list being reordered (same rationale
 * as `departmentImages`).
 *
 * A leader with no entry here keeps their PhotoPlaceholder. Add a key when a real
 * photo lands; nothing else needs to change.
 *
 * `kind` IS LOAD-BEARING — check the file before you set it:
 *
 *   "photo"  → an ordinary opaque photograph. Rendered `fill` + `object-cover`,
 *              cropped to the card, with a blur-up placeholder.
 *
 *   "cutout" → the subject has been masked out onto a TRANSPARENT background.
 *              These must NOT be cropped with object-cover (it slices heads off)
 *              and must NOT use `placeholder="blur"` — Next's blur-up data URL is
 *              an alpha-less JPEG, so it flashes an opaque rectangle behind the
 *              transparency while loading. Rendered `object-contain`, bottom
 *              aligned, on a tinted gradient supplied by the card.
 *
 * Verified at time of writing (PNG IHDR colour type + corner alpha):
 *   BishopHillary.png             842×1264  RGBA but fully opaque  → photo
 *   Archbishop.png                523×656   transparent background → cutout
 *   Doctor-love-Sam-Amaga.png     400×566   transparent background → cutout
 */
export const leaderImages: Record<
  string,
  {
    src: StaticImageData;
    alt: string;
    kind: "photo" | "cutout";
    objectPosition?: string;
  }
> = {
  "Bishop Hilary Ogoliegbune": {
    src: bishopHilary,
    alt: "Bishop Hilary Ogoliegbune, Lead Pastor of Salem Rivers",
    kind: "photo",
    // Portrait source in a 4/5 card — anchor to the top so the crop keeps the face.
    objectPosition: "object-top",
  },
  "Archbishop Sam Amaga": {
    src: archbishop,
    alt: "Archbishop Sam Amaga, founder of Foundation Faith Church",
    kind: "cutout",
  },
  "Dr. Love Sam-Amaga": {
    src: doctorLove,
    alt: "Dr. Love Sam-Amaga, co-founder of Foundation Faith Church",
    kind: "cutout",
  },
};
