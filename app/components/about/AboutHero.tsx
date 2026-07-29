import Image from "next/image";
import Link from "next/link";
import { church, PLAN_VISIT_HREF } from "../../content/church";
import { ArrowRightIcon, PlayIcon } from "../icons";

/**
 * About hero — full-bleed congregation photo with the vision statement over it.
 *
 * Deliberately quieter than the homepage Hero: shorter (min-h ~70svh rather than
 * a full viewport), centred rather than hard-left, and no service-time chips.
 * The homepage hero has to sell a visit in five seconds; this one only has to set
 * the tone before the reader starts reading. Same photographic treatment and the
 * same two-button shape, so it still reads as the same site.
 */
export function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#100a17]">
      {/* Solid dark base — what shows while the photo streams in, so text never flashes unreadable */}
      <div className="absolute inset-0 -z-30 bg-[#100a17]" />

      {/* LCP image for this route, hence priority. */}
      <Image
        src="/images/Hero-Congregation.jpg"
        alt="The Salem Rivers congregation gathered together during a service"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />

      {/*
        Even scrim, not the homepage's left-weighted one: this copy is centred, so
        it needs legibility across the full width. Two layers — a flat wash for
        contrast, then a bottom vignette to settle the edge into the next section.
      */}
      <div className="absolute inset-0 -z-10 bg-black/60" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[70svh] max-w-3xl flex-col items-center justify-center py-24 text-center text-white sm:py-28">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-gold-soft">
            About {church.name}
          </p>

          <h1 className="text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
            About Salem Rivers Church
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
            More than a church, we are a family raising people who are strong in
            faith, empowered by wisdom, intimate with the Holy Spirit, and
            equipped to impact their world for Jesus Christ.
          </p>

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
        </div>
      </div>
    </section>
  );
}
