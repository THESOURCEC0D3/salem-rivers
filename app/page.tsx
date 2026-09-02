import { Hero } from "./components/home/Hero";
import { PastorWelcome } from "./components/home/PastorWelcome";
import { AboutSalemCityOfFaith } from "./components/home/AboutSalemCityOfFaith";
import { GlimpseStrip } from "./components/home/GlimpseStrip";
import FeaturedSermon from "@/app/components/media/FeaturedSermon";
import { NextEvent } from "./components/home/NextEvent";
import { GetInvolved } from "./components/home/GetInvolved";
import { ClassesPreview } from "./components/home/ClassesPreview";
import { TestimonySection } from "./components/home/TestimonySection";
import { NeedPrayer } from "./components/home/NeedPrayer";
import { ReadyToJoin } from "./components/home/ReadyToJoin";
import { Reveal } from "./components/Reveal";
import { getFeaturedSermon } from "@/app/lib/sermonService";
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
 * SECTION SURFACES — the homepage runs a gold wash rhythm rather than one flat
 * ivory. The scale is defined in globals.css (--color-gold-wash-1..3, mixed from
 * the logo's own gold). Running order:
 *
 *   Hero              photo, full bleed
 *   PastorWelcome     wash-1
 *   AboutSalemCity…   wash-3
 *   GlimpseStrip      wash-1
 *   FeaturedSermon    wash-2
 *   NextEvent         wash-3
 *   GetInvolved       wash-1
 *   ClassesPreview    wash-2
 *   TestimonySection  dark photo — deliberately outside the scale
 *   NeedPrayer        wash-2
 *   ReadyToJoin       bg-primary — deliberately outside the scale
 *
 * The rule that matters: NO TWO ADJACENT SECTIONS SHARE A STEP. If you reorder
 * or insert a section, re-check that, or the seam between them disappears.
 *
 * GlimpseStrip, FeaturedSermon and GetInvolved are also used by /about and
 * /watch, so their washes are passed HERE as props rather than changed in the
 * components — their defaults stay untouched and the other pages are unaffected.
 */
export default async function Home() {
  const featuredSermon = await getFeaturedSermon();
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
        <AboutSalemCityOfFaith />
      </Reveal>
      <Reveal>
        <GlimpseStrip className="bg-gold-wash-1" />
      </Reveal>
      <Reveal>
        <FeaturedSermon sermon={featuredSermon} className="bg-gold-wash-2" />
      </Reveal>
      <Reveal>
        <NextEvent />
      </Reveal>
      <Reveal>
        <GetInvolved className="bg-gold-wash-1" />
      </Reveal>
      <Reveal>
        <ClassesPreview />
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
