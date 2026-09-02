import type { Metadata } from "next";
import { church } from "../content/church";
import { PageHero } from "../components/PageHero";
import { ClassList } from "../components/classes/ClassList";
import { ReadyToJoin } from "../components/home/ReadyToJoin";
import { Reveal } from "../components/Reveal";

export const metadata: Metadata = {
  title: "Classes",
  description:
    // Full official name — search snippet, same reasoning as /about and /events.
    "Arch-Bishop's Arm: three schools at Foundation Faith Church, Salem City of Faith in Port Harcourt — Covenant Faith Bible Institute, Salem Pastoral & Management College, and Provincial Leadership Training. Admission is open.",
};

/**
 * Classes — the three schools the church runs across the year.
 *
 * The gradient PageHero skin is deliberate. The only artwork available is the
 * flyer, and a flyer makes a bad full-bleed hero: the photo skin lays a scrim
 * and white text over the image, which would bury the very words the flyer
 * exists to communicate. So the flyer is shown further down at its natural
 * ratio inside `ClassList`, where it can actually be read.
 *
 * `PageHero` is NOT wrapped in `Reveal` — it is the route's LCP element and is
 * already on screen, same rule as the other pages.
 */
export default function ClassesPage() {
  const { classes } = church;

  return (
    <>
      <PageHero
        eyebrow="Classes"
        title={classes.theme}
        intro={`${classes.tagline} — with three schools running across the year at ${church.shortName}. Admission is open.`}
        align="center"
        size="tall"
      />
      <Reveal>
        <ClassList />
      </Reveal>
      <Reveal>
        <ReadyToJoin />
      </Reveal>
    </>
  );
}
