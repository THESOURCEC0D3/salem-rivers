import type { StaticImageData } from "next/image";
import technical1 from "../../public/images/technical1.jpg";
import choir from "../../public/images/choir.jpg";
import ushering from "../../public/images/ushering-image.jpg";
import kdfLogo from "../../public/images/KDF-Logo.jpeg";
import sanitation from "../../public/images/sanitation-image.jpg";
import protocol from "../../public/images/protocolimage2.jpg";

/**
 * Department photos, keyed by `church.departments[].name` — so the mapping survives
 * the list being reordered, unlike an index-based one. A department with no entry
 * here keeps its PhotoPlaceholder; add a key once a real photo exists.
 *
 * Statically imported for build-time dimensions + blur-up placeholders, same as
 * `glimpseImages`.
 *
 * `kind` IS LOAD-BEARING — look at the file, and MEASURE, before you set it.
 * The card is a 16:10 frame, so what matters is whether a 16:10 centre crop
 * eats anything that carries meaning:
 *
 *   "photo"   → a real photograph. Cropped to fill with `object-cover`, so it
 *               always covers the frame. Faces can be steered with
 *               `objectPosition`. Losing a few pixels of background is fine.
 *
 *   "graphic" → a DESIGNED banner with a wordmark on it. Never cropped:
 *               the sanitation banner is 1368×768 (ratio 1.78) against a 1.60
 *               frame, and its ink runs from ~7.5% to ~96.9% of the width while
 *               a centre crop keeps only 5.1%–94.9%. Cover therefore slices the
 *               last letter off. Rendered `object-contain` on a warm
 *               `bg-gold-soft` frame — the ~5% bars top and bottom sit close
 *               to the image's own edge colour (#e6d8bf).
 *
 *               NOTE the trade-off, since it is what "graphic" costs: contain
 *               leaves bars. A 1.33 photo under contain would bar the LEFT and
 *               RIGHT, which is why the team photos below are "photo", not this.
 *
 *   "logo"    → a square logo or mark. Also never cropped: KDF under cover
 *               loses the torch flame off the top and cuts the wordmark in
 *               half. `object-contain` on a black frame that matches the
 *               logo's own flat black backdrop.
 *
 * Measured at time of writing (dimensions + simulated 16:10 centre crop):
 *   technical1.jpg                1310×2048  0.64  crop fine at 15%  → photo
 *   choir.jpg                     2048×1365  1.50  crop fine         → photo
 *   ushering-image.jpg            1448×1086  1.33  crop fine at centre → photo
 *   protocolimage2.jpg            1195×896   1.33  crop fine at centre → photo
 *   sanitation-image.jpg          1368×768   1.78  CLIPS wordmark      → graphic
 *   KDF-Logo.jpeg                 300×300    1.00  decapitates it    → logo
 */
export const departmentImages: Record<
  string,
  {
    src: StaticImageData;
    alt: string;
    kind: "photo" | "graphic" | "logo";
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
    // Was the pastel "Serving God by Serving People" banner, which had to be
    // letterboxed. This is a real team photo: 1448×1086 (1.33), TALLER than the
    // 1.60 card, so cover crops ~17% of the HEIGHT and fills the frame edge to
    // edge. Centre is right — the six of them sit head to shoe inside the band.
    src: ushering,
    alt: "Six members of the ushering team in matching green, together in front of the church's anniversary backdrop",
    kind: "photo",
  },
  Protocol: {
    // 1195×896 (1.33), same story as Ushering: cover crops ~17% of the height,
    // taking the wall above and the ground below. All four faces sit well
    // inside the band at centre, so no objectPosition is needed.
    src: protocol,
    alt: "Four members of the protocol team in dark suits, standing together outside the church",
    kind: "photo",
  },
  Sanitation: {
    src: sanitation,
    alt: "Sanitation department graphic: a broom, mop and bucket over pastel shapes, with the words Serve God by Keeping His House Clean",
    kind: "graphic",
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
