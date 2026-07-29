import type { StaticImageData } from "next/image";
import event1 from "../../public/images/Event1.jpeg";
import thanksgiving from "../../public/images/Thanksgiving.jpeg";
import campusOutreach from "../../public/images/Event2.jpeg";

/**
 * Real event flyer images, keyed by event id (see `church.events`).
 * Statically imported so Next knows their dimensions (no crop, blur-up placeholder).
 * Add an entry here when a real flyer lands; events without one fall back to a placeholder.
 */
export const eventImages: Record<string, StaticImageData> = {
  "salem-campus-outreach": campusOutreach,
  "q2-thanksgiving": thanksgiving,
  // Covenant Week is a PAST event — both UpcomingEvents and PastEvents read this
  // same map by id, so its flyer keeps showing after the move.
  "covenant-week": event1,
};
