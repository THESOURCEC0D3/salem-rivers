import { Hero } from "./components/home/Hero";
import { PastorWelcome } from "./components/home/PastorWelcome";
import { AboutSalemRivers } from "./components/home/AboutSalemRivers";
import { GlimpseStrip } from "./components/home/GlimpseStrip";
import FeaturedSermon from "@/app/components/media/FeaturedSermon";
import { NextEvent } from "./components/home/NextEvent";
import { GetInvolved } from "./components/home/GetInvolved";
import { TestimonySection } from "./components/home/TestimonySection";
import { NeedPrayer } from "./components/home/NeedPrayer";
import { ReadyToJoin } from "./components/home/ReadyToJoin";
import { Reveal } from "./components/Reveal";

/**
 * Home — "the trailer."
 *
 * The order below is the funnel, and it is deliberate: meet the church (hero),
 * meet its leader, learn who they are, see the people, find a date, find a place
 * to serve, hear from members, be offered prayer — and only then be asked to
 * commit to a visit. Trust is built before the ask.
 *
 * Watching is NOT a homepage section. Per the spec (design-system/.../home.md
 * item 7) and HANDOFF §1, the livestream stays a subordinate fallback — it gets
 * the quiet strip at the bottom of ReadyToJoin, nothing more. A `LatestSermon`
 * component exists but is parked; see HANDOFF §8c before re-adding it.
 *
 * Section backgrounds alternate background → muted → background so no two
 * adjacent sections share a surface. If you reorder, re-check that alternation.
 */
export default function Home() {
  return (
    <>
      {/*
        Hero is NOT wrapped in `Reveal`: it is the route's LCP element and is
        already on screen, so fading it in would only delay perceived load.
        Everything below it reveals on scroll.
      */}
      <Hero />
      <Reveal>
        <PastorWelcome />
      </Reveal>
      <Reveal>
        <AboutSalemRivers />
      </Reveal>
      <Reveal>
        <GlimpseStrip />
      </Reveal>
      <Reveal>
        <FeaturedSermon />
      </Reveal>
      <Reveal>
        <NextEvent />
      </Reveal>
      <Reveal>
        <GetInvolved />
      </Reveal>
      <Reveal>
        <TestimonySection />
      </Reveal>
      <Reveal>
        <NeedPrayer />
      </Reveal>
      <Reveal>
        <ReadyToJoin />
      </Reveal>
    </>
  );
}
