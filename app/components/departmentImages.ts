import type { StaticImageData } from "next/image";
import technical1 from "../../public/images/technical1.jpg";
import choir from "../../public/images/choir.jpg";
import ushering from "../../public/images/ushering-department-image.jpg";
import kdfLogo from "../../public/images/KDF-Logo.jpeg";

/**
 * Department photos, keyed by `church.departments[].name` — so the mapping survives
 * the list being reordered, unlike an index-based one. A department with no entry
 * here keeps its PhotoPlaceholder; add a key once a real photo exists.
 *
 * Statically imported for build-time dimensions + blur-up placeholders, same as
 * `glimpseImages`.
 *
 * `kind` IS LOAD-BEARING — look at the file before you set it (same rule, and the
 * same reasoning, as `kind` in `leaderImages`):
 *
 *   "photo" → a photograph or a wide designed graphic. Cropped to the 16:10 card
 *             with `object-cover`, so it always fills the frame. Anything whose
 *             ratio is near the card's survives this; check that a centre crop
 *             doesn't eat text before you use it.
 *
 *   "logo"  → a square/tall logo or mark. These must NOT be cropped: the KDF logo
 *             under `object-cover` loses the torch flame off the top and gets the
 *             "KDF" wordmark sliced through the middle. Rendered `object-contain`
 *             on a black frame instead.
 *
 * Verified at time of writing (dimensions + simulated 16:10 centre crop):
 *   technical1.jpg                1310×2048  0.64  crop is fine at 15% → photo
 *   choir.jpg                     2048×1365  1.50  crop is fine          → photo
 *   ushering-department-image.jpg 1368×768   1.78  ~10% side crop, all
 *                                                  text survives         → photo
 *   KDF-Logo.jpeg                 300×300    1.00  cover decapitates it  → logo
 */
export const departmentImages: Record<
  string,
  {
    src: StaticImageData;
    alt: string;
    kind: "photo" | "logo";
    objectPosition?: string;
  }
> = {
  "Technical / Media": {
    // Tall portrait cropped into a 16:10 card, so centring lands on torsos and legs.
    // Pulling the crop window up to 15% frames faces and branded shirts instead.
    src: technical1,
    alt: "Members of the technical and media team in branded shirts, one wearing a comms headset",
    kind: "photo",
    objectPosition: "object-[center_15%]",
  },
  Ushering: {
    src: ushering,
    alt: "Ushering department graphic: two clasped hands over pastel shapes, with the words Serving God by Serving People",
    kind: "photo",
  },
  Choir: {
    src: choir,
    alt: "The choir in robes leading the congregation in worship, with a soloist singing at the front",
    kind: "photo",
  },
  "Kingdom Dominion Force (KDF)": {
    src: kdfLogo,
    alt: "Kingdom Dominion Force logo: two runners carrying a flaming torch, over the letters KDF",
    kind: "logo",
  },
};
