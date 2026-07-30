import Link from "next/link";
import { church, PLAN_VISIT_HREF } from "../../content/church";
import { PageHero } from "../PageHero";
import { ArrowRightIcon, PlayIcon } from "../icons";

/**
 * About hero — full-bleed congregation photo with the vision statement over it.
 *
 * Deliberately quieter than the homepage Hero: shorter (~70svh rather than a full
 * viewport), centred rather than hard-left, and no service-time chips. The
 * homepage hero has to sell a visit in five seconds; this one only has to set the
 * tone before the reader starts reading.
 *
 * All the layout lives in the shared `PageHero` (HANDOFF §8b) — this file is just
 * this page's content and its CTA pair.
 *
 * IMAGE — USE THE CLEAN CUT. `Hero-Congregation.jpg` is the same praise-night
 * shot at higher resolution, but it has a "38th Anniversary · Day Two · Praise
 * Night" lockup burned into the bottom centre: it collided with the CTAs and
 * pinned an evergreen page to one past event. This cut has no text, and is the
 * same 1264×842 export as the homepage hero. The scrim hides the resolution
 * difference. Do not swap back for the sharper file.
 */
export function AboutHero() {
  return (
    <PageHero
      eyebrow={`About ${church.name}`}
      title="About Salem Rivers Church"
      intro="More than a church, we are a family raising people who are strong in faith, empowered by wisdom, intimate with the Holy Spirit, and equipped to impact their world for Jesus Christ."
      align="center"
      size="tall"
      image={{
        src: "/images/Hero-IMAGE.png",
        alt: "The Salem Rivers congregation on their feet, hands raised in worship during a praise night service",
      }}
    >
      {/*
        Same CTA pair as the homepage hero — solid white primary, translucent
        secondary — so the two heroes read as siblings. Visit stays primary;
        watching stays the subordinate fallback (HANDOFF §1).
      */}
      <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
        <Link
          href={PLAN_VISIT_HREF}
          className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-primary shadow-lg transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Plan Your Visit
          <ArrowRightIcon size={18} />
        </Link>
        <Link
          href="/watch"
          className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-[background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <PlayIcon size={18} />
          Watch Sermons
        </Link>
      </div>
    </PageHero>
  );
}
