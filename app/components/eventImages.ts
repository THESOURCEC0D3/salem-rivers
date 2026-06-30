import type { StaticImageData } from "next/image";
import event1 from "../../public/images/Event1.jpeg";

/**
 * Real event flyer images, keyed by event id (see `church.events`).
 * Statically imported so Next knows their dimensions (no crop, blur-up placeholder).
 * Add an entry here when a real flyer lands; events without one fall back to a placeholder.
 */
export const eventImages: Record<string, StaticImageData> = {
  "covenant-week": event1,
};
