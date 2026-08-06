import type { StaticImageData } from "next/image";
import event1 from "../../public/images/Event1.jpeg";
import thanksgiving from "../../public/images/Thanksgiving.jpeg";
import campusOutreach from "../../public/images/Event2.jpeg";
import spamic from "../../public/images/spamic.jpeg";
import letTheFireFall from "../../public/images/let-the-fire-fall-event.jpeg";
import womenConference from "../../public/images/women-ministry-event.jpeg";

/**
 * Real event flyer images, keyed by event id (see `church.events`).
 * Statically imported so Next knows their dimensions (no crop, blur-up placeholder).
 * Add an entry here when a real flyer lands; events without one fall back to a placeholder.
 */
export const eventImages: Record<string, StaticImageData> = {
  // Upcoming, in the order they appear in `church.events.upcoming`.
  "spamic-batch-2": spamic,
  "let-the-fire-fall": letTheFireFall,
  "annual-women-conference": womenConference,

  // PAST events. Nothing below needs moving or renaming when an event is
  // retired — UpcomingEvents and PastEvents read this same map by id, so a
  // flyer keeps showing as long as the entry keeps its id.
  "q2-thanksgiving": thanksgiving,
  "salem-campus-outreach": campusOutreach,
  "covenant-week": event1,
};
