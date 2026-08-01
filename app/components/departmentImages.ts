import type { StaticImageData } from "next/image";
import technical1 from "../../public/images/technical1.jpg";
import choir from "../../public/images/choir.jpg";

/**
 * Department photos, keyed by `church.departments[].name` — so the mapping survives
 * the list being reordered, unlike an index-based one. A department with no entry
 * here keeps its PhotoPlaceholder; add a key once a real photo exists.
 *
 * Statically imported for build-time dimensions + blur-up placeholders, same as
 * `glimpseImages`.
 */
export const departmentImages: Record<
  string,
  { src: StaticImageData; alt: string; objectPosition?: string }
> = {
  "Technical / Media": {
    // Tall portrait cropped into a 16:10 card, so centring lands on torsos and legs.
    // Pulling the crop window up to 15% frames faces and branded shirts instead.
    src: technical1,
    alt: "Members of the technical and media team in branded shirts, one wearing a comms headset",
    objectPosition: "object-[center_15%]",
  },
  Choir: {
    src: choir,
    alt: "The choir in robes leading the congregation in worship, with a soloist singing at the front",
  },
};
