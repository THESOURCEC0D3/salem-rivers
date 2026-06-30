import type { Metadata } from "next";
import { EventsHero } from "../components/events/EventsHero";
import { UpcomingEvents } from "../components/events/UpcomingEvents";
import { PastEvents } from "../components/events/PastEvents";
import { ReadyToJoin } from "../components/home/ReadyToJoin";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming events at Salem Rivers in Port Harcourt, plus a look back at life in the church. Come along — an event is an easy first step.",
};

/**
 * Events — proves the church is alive and offers a low-commitment on-ramp.
 * Upcoming first (nearest at top), past below as photo evidence; each event
 * funnels to a WhatsApp "I'd like to come", newcomers back to Plan Your Visit.
 */
export default function EventsPage() {
  return (
    <>
      <EventsHero />
      <UpcomingEvents />
      <PastEvents />
      <ReadyToJoin />
    </>
  );
}
