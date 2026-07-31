import type { Metadata } from "next";
import { AboutHero } from "../components/about/AboutHero";
import { WhoWeAre } from "../components/about/WhoWeAre";
import { OurHeritage } from "../components/about/OurHeritage";
import { OurVision } from "../components/about/OurVision";
import { OurMission } from "../components/about/OurMission";
import { OurPassion } from "../components/about/OurPassion";
import { CoreValues } from "../components/about/CoreValues";
import { WhatWeBelieve } from "../components/about/WhatWeBelieve";
import { Leadership } from "../components/about/Leadership";
import { ChurchLife } from "../components/about/ChurchLife";
import { YourJourney } from "../components/about/YourJourney";
import { FaqAccordion } from "../components/about/FaqAccordion";
import { FinalCta } from "../components/about/FinalCta";
import { GlimpseStrip } from "../components/home/GlimpseStrip";
import { GetInvolved } from "../components/home/GetInvolved";
import { Reveal } from "../components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who Salem Rivers Church is: our heritage, vision, mission, values, beliefs and leadership. A Pentecostal family in Port Harcourt raising people strong in faith, empowered by wisdom, and intimate with the Holy Spirit.",
};

/**
 * About — the deeper-trust page newcomers are sent to. It removes objections
 * rather than converting directly, and hands the reassured reader to Plan Your
 * Visit at the end.
 *
 * ORDER IS THE ARGUMENT: identity → where we came from → what we're aiming at →
 * what we value → what we believe → who leads → what it's actually like →
 * what your next step is → your remaining questions → the invitation. Trust is
 * built before the ask, same as the homepage funnel.
 *
 * TWO SECTIONS ARE REUSED VERBATIM FROM THE HOMEPAGE — do not fork them:
 *   • `GlimpseStrip` — the photo gallery
 *   • `GetInvolved`  — the ministry/department cards
 * Both take optional heading + `className` props whose defaults are the homepage's
 * own values, so passing props here changes this page only. If you need a
 * different look, change it in the shared component, not in a copy.
 *
 * SURFACE ALTERNATION — no two adjacent sections share a background:
 *   hero(photo) → background → muted → background → PRIMARY → background →
 *   muted → background → muted → background → muted → background → muted →
 *   background → PRIMARY
 * Re-check this if you reorder. The two `bg-primary` bands (Mission, FinalCta)
 * are deliberately far apart — they are the page's only two full-colour moments.
 */
export default function AboutPage() {
  return (
    <>
      {/*
        AboutHero is NOT wrapped in `Reveal`: it is the route's LCP element and is
        already on screen. Every section below it reveals on scroll.
      */}
      <AboutHero />
      <Reveal>
        <WhoWeAre />
      </Reveal>
      <Reveal>
        <OurHeritage />
      </Reveal>
      <Reveal>
        <OurVision />
      </Reveal>
      <Reveal>
        <OurMission />
      </Reveal>
      <Reveal>
        <OurPassion />
      </Reveal>
      <Reveal>
        <CoreValues />
      </Reveal>
      <Reveal>
        <WhatWeBelieve />
      </Reveal>
      <Reveal>
        <Leadership />
      </Reveal>

      {/* Reused gallery — this page's wording, homepage's component. */}
      <Reveal>
        <GlimpseStrip
          eyebrow="A glimpse of us"
          title="Life at Salem Rivers"
          intro="Take a glimpse into our worship, fellowship, ministries, outreach, and church family."
          className="bg-background"
        />
      </Reveal>

      <Reveal>
        <ChurchLife />
      </Reveal>

      {/*
        Reused ministry cards — the "Ministries & Departments" card in ChurchLife
        above anchors down to this section's `#get-involved` id.
      */}
      <Reveal>
        <GetInvolved
          eyebrow="Ministries & departments"
          title="The teams that carry the work"
          intro="Every one of these is volunteer-run, and every one of them has room for you."
          className="bg-background"
        />
      </Reveal>

      <Reveal>
        <YourJourney />
      </Reveal>
      <Reveal>
        <FaqAccordion />
      </Reveal>
      <Reveal>
        <FinalCta />
      </Reveal>
    </>
  );
}
