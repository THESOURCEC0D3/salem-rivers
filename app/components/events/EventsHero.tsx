import { church } from "../../content/church";
import { PageHero } from "../PageHero";

/**
 * Events header — prove the church is alive; frame events as an easy first step.
 *
 * Currently on the GRADIENT skin because no suitable photo exists yet. To give
 * this page a photo hero, add one prop — nothing else changes:
 *
 *   image={{ src: "/images/events-hero.jpg", alt: "…" }}
 *
 * HANDOFF §8b specifies that file as "a wide crowd/congregation photo — NOT the
 * flyer". Two existing images were considered and rejected: `Hero-Congregation.jpg`
 * and `HeroImage2.jpg` both carry burned-in "38th Anniversary" event graphics that
 * collide with hero copy and pin an evergreen page to one past event.
 *
 * KEEP IT `compact`. Two full event flyers render immediately below this at their
 * natural ratio — a tall photo hero stacked above them would put three competing
 * images in the first two screens.
 */
export function EventsHero() {
  return (
    <PageHero
      eyebrow="What's happening"
      title="Events"
      intro={`There's always something happening at ${church.name}. An event can be an easy first step, so come along, bring a friend, and meet the family.`}
    />
  );
}
