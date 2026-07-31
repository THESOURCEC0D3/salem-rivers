import Image from "next/image";
import Link from "next/link";
import { church, PLAN_VISIT_HREF } from "../../content/church";
import { ArrowRightIcon, ClockIcon, MapPinIcon } from "../icons";

/**
 * Hero — "the trailer." A full-bleed photo of a service as the backdrop, with
 * "Welcome to Salem Rivers" + warm line + service times/location overlaid hard
 * left. Two CTAs: Plan Your Visit (primary) and Give online.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#100a17]">
      {/* Solid dark base — what shows while the photo streams in, so text never flashes unreadable */}
      <div className="absolute inset-0 -z-30 bg-[#100a17]" />

      {/* The service, full bleed. This is the LCP image, hence priority. */}
      <Image
        src="/images/HeroImage3-clean.png"
        alt="A Salem Rivers service, with the minister preaching on stage and the choir behind him"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />

      {/*
        Left-weighted scrim. This photo is already dark, so it needs far less help than
        a bright one: heavy only under the copy, then clearing completely from md up so
        the stage, choir and LED wall stay visible. Mobile keeps a black/25 floor on the
        right because the copy spans most of the width there.
      */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/60 to-black/25 md:via-black/45 md:to-transparent" />
      {/*
        Light bottom vignette. The photo's lower third is already near-black silhouetted
        congregation, so the CTAs read fine over it — this just settles the edge rather
        than blacking it out (the burned-in logo that needed hiding is gone from this cut).
      */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />

      {/*
        Deliberately wider than the site Container (max-w-6xl): the copy hugs the left
        edge so more of the photo reads, instead of starting a third of the way in.
      */}
      <div className="mx-auto w-full max-w-[110rem] px-5 sm:px-8 lg:px-12">
        <div className="flex min-h-[calc(100svh-4rem)] max-w-xl flex-col justify-center py-20 text-white sm:py-24">
          {/*
            Two-part heading, one <h1>: the small gold "Welcome to" is the lead-in
            and the church's full name carries the display weight. The name is
            split across two lines so "Foundation Faith Church" and "Salem Rivers"
            each get their own, which is how the church says it aloud.
            Sizes stepped down from 6xl/7xl/8xl — the full name is far longer than
            "Salem Rivers" was and would otherwise wrap to four lines on a phone.
          */}
          <h1>
            <span className="block text-lg font-medium uppercase tracking-[0.18em] text-gold-soft sm:text-xl">
              Welcome to
            </span>
            <span className="mt-2 block text-balance text-4xl font-semibold leading-[1.02] sm:text-5xl lg:text-6xl">
              Foundation Faith Church,
              <span className="block">Salem Rivers.</span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-xl leading-relaxed text-white/85">
            {church.tagline}
          </p>

          {/* Above-the-fold facts: service times + location */}
          <div className="mt-7 flex flex-wrap gap-2.5">
            {church.serviceTimes.map((s) => (
              <span
                key={s.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-sm font-medium backdrop-blur-sm"
              >
                <ClockIcon size={16} className="text-gold-soft" />
                <span className="text-white/95">{s.label}</span>
                <span className="font-semibold text-white">{s.time}</span>
              </span>
            ))}
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-sm font-medium backdrop-blur-sm">
              <MapPinIcon size={16} className="text-gold-soft" />
              <span className="text-white/95">
                {church.neighbourhood}, {church.city}
              </span>
            </span>
          </div>

          {/*
            CTAs — primary contrasts the dark hero (white). The secondary is
            translucent on purpose: it complements rather than competes, and
            sends a first-timer to About, the page written to answer "what am I
            walking into?" before they commit to a date.
          */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={PLAN_VISIT_HREF}
              className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-primary shadow-lg transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Plan Your Visit
              <ArrowRightIcon size={18} />
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-[background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              I&apos;m new here
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
