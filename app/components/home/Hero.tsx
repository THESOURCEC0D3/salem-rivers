import Image from "next/image";
import Link from "next/link";
import { church, PLAN_VISIT_HREF } from "../../content/church";
import { Container } from "../Container";
import { ArrowRightIcon, ClockIcon, MapPinIcon, HeartIcon } from "../icons";

/**
 * Hero — "the trailer." A strong still backdrop (no autoplay video), a big
 * "Welcome to Salem Rivers", one warm line, and service times + location visible
 * WITHOUT scrolling, with two CTAs: Plan Your Visit (primary) and Give online.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Real congregation photo; scrim over it guarantees ≥4.5:1 text contrast. */}
      <Image
        src="/images/hero.jpeg"
        alt={`${church.name} gathered for worship`}
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 hero-scrim" />

      <Container>
        <div className="flex min-h-[calc(100svh-4rem)] flex-col justify-center py-20 text-white sm:py-24">
          <h1 className="max-w-4xl">
            <span className="block text-lg font-medium uppercase tracking-[0.18em] text-gold-soft sm:text-xl">
              Welcome to
            </span>
            <span className="mt-2 block text-balance text-6xl font-semibold leading-[0.95] sm:text-7xl lg:text-8xl">
              {church.name}
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

          {/* CTAs — primary contrasts the dark hero (white); Give online is the secondary. */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={PLAN_VISIT_HREF}
              className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-primary shadow-lg transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Plan Your Visit
              <ArrowRightIcon size={18} />
            </Link>
            <Link
              href={church.give.href}
              className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-[background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <HeartIcon size={20} />
              Give online
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
