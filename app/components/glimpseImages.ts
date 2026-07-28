import type { StaticImageData } from "next/image";
import worship1 from "../../public/images/worship1.jpg";
import greeting1 from "../../public/images/Greeting1.jpg";
import children1 from "../../public/images/children1.jpg";
import event1 from "../../public/images/event1.jpg";
import bishopHug from "../../public/images/Bishophug.jpg";

/**
 * "A glimpse of us" photos, in grid order — the first is the featured tile.
 * Statically imported so Next knows their dimensions and can generate a blur-up
 * placeholder (same rationale as `eventImages`).
 */
export const glimpseImages: { src: StaticImageData; alt: string }[] = [
  {
    src: worship1,
    alt: "The congregation on their feet celebrating during a praise night service",
  },
  {
    src: greeting1,
    alt: "Two members smiling as they arrive at the church gate for a service",
  },
  {
    src: children1,
    alt: "Children singing into microphones during children's church",
  },
  {
    src: event1,
    alt: "The school band lined up outside to welcome arriving guests at a church event",
  },
  {
    src: bishopHug,
    alt: "Two members sharing a warm embrace during a praise night service",
  },
];
