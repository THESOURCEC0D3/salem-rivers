import { Hero } from "./components/home/Hero";
import { PastorWelcome } from "./components/home/PastorWelcome";
import { GlimpseStrip } from "./components/home/GlimpseStrip";
import { TestimonySection } from "./components/home/TestimonySection";
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
      <TestimonySection />
      <GetInvolved />
      <NextEvent />
      <ReadyToJoin />
    </>
  );
}
