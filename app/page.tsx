import { church } from "./content/church";
import { Hero } from "./components/home/Hero";
import { PastorWelcome } from "./components/home/PastorWelcome";
import { GlimpseStrip } from "./components/home/GlimpseStrip";
import { Testimonials } from "./components/Testimonials";
import { Section } from "./components/Section";
import { GetInvolved } from "./components/home/GetInvolved";
import { NextEvent } from "./components/home/NextEvent";
import { ReadyToJoin } from "./components/home/ReadyToJoin";

/**
 * Home — "the trailer." Pastor's welcome now leads straight after the hero; the
 * "New here" details live on the About page. Everything still funnels to Plan Your Visit.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <PastorWelcome />
      <GlimpseStrip />
      <Section
        id="testimonies"
        eyebrow="Testimonies"
        title="What people say"
        className="bg-background"
      >
        <Testimonials items={[...church.testimonials]} />
      </Section>
      <GetInvolved />
      <NextEvent />
      <ReadyToJoin />
    </>
  );
}
