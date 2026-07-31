import type { Metadata } from "next";
import { EventsHero } from "../components/events/EventsHero";
import { UpcomingEvents } from "../components/events/UpcomingEvents";
import { PastEvents } from "../components/events/PastEvents";
import { ReadyToJoin } from "../components/home/ReadyToJoin";
import { Reveal } from "../components/Reveal";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming events at Salem Rivers in Port Harcourt, plus a look back at life in the church. Come along, because an event is an easy first step.",
};

/**
 * Events — proves the church is alive and offers a low-commitment on-ramp.
 * Upcoming first (nearest at top), past below as photo evidence; each event
 * funnels to a WhatsApp "I'd like to come", newcomers back to Plan Your Visit.
 *
 * `EventsHero` is deliberately NOT wrapped in `Reveal`. It is the first thing on
 * screen and the route's LCP element; fading it in would delay perceived load and
 * animate something the visitor is already looking at.
 */
export default function EventsPage() {
  return (
    <>
      <EventsHero />
      <Reveal>
        <UpcomingEvents />
      </Reveal>
      <Reveal>
        <PastEvents />
      </Reveal>
      <Reveal>
        <ReadyToJoin />
      </Reveal>
    </>
  );
}
