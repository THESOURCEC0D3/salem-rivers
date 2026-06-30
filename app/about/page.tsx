import type { Metadata } from "next";
import { AboutHero } from "../components/about/AboutHero";
import { WhatWeBelieve } from "../components/about/WhatWeBelieve";
import { HowWeFunction } from "../components/about/HowWeFunction";
import { Leadership } from "../components/about/Leadership";
import { Vision } from "../components/about/Vision";
import { ReadyToJoin } from "../components/home/ReadyToJoin";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who Salem Rivers is, what we believe, how the church functions, and the people who lead it — a warm Pentecostal family in Port Harcourt.",
};

/**
 * About — the deeper-trust page newcomers are sent to. Removes objections rather
 * than converting directly; it ends by handing the reassured reader to Plan Your Visit.
 */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhatWeBelieve />
      <HowWeFunction />
      <Leadership />
      <Vision />
      <ReadyToJoin />
    </>
  );
}
