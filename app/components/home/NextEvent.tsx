import Image from "next/image";
import Link from "next/link";
import { church } from "../../content/church";
import { eventImages } from "../eventImages";
import { Section } from "../Section";
import { PhotoPlaceholder } from "../PhotoPlaceholder";
import { CalendarIcon, ClockIcon, MapPinIcon, ArrowRightIcon } from "../icons";

/**
 * Section — the single nearest upcoming event (= events.upcoming[0]).
 *
 * Two states, and `church.events.upcoming` is the only switch between them:
 *   • array has entries → the flyer card for the first one
 *   • array is empty    → "no event coming up" + a route to the events archive
 *
 * So publishing or retiring an event is a content edit in church.ts, never a code
 * change here. Keep the array sorted nearest-first: [0] is what the homepage shows.
 */
export function NextEvent() {
  const [next] = church.events.upcoming;

  return (
    <Section
      id="next-event"
      eyebrow="What's coming up"
      title="The next time to join us"
      className="bg-background"
    >
      {next ? (
        <div className="mx-auto max-w-xl overflow-hidden rounded-3xl border border-border bg-card shadow-md">
          {/*
            A flyer is a designed poster — shown at its natural ratio (h-auto, no crop)
            so no text gets cut off. Events without a real flyer fall back to the
            labelled placeholder rather than an empty box.
          */}
          {eventImages[next.id] ? (
            <Image
              src={eventImages[next.id]}
              alt={`Flyer for ${next.title}`}
              placeholder="blur"
              sizes="(max-width: 640px) 100vw, 36rem"
              className="h-auto w-full"
            />
          ) : (
            <PhotoPlaceholder
              label={next.flyer}
              rounded=""
              className="aspect-[4/3] w-full"
            />
          )}

          <div className="p-7 sm:p-8">
            <h3 className="text-2xl font-semibold text-foreground sm:text-3xl">
              {next.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              {next.blurb}
            </p>

            <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/90">
              <div className="inline-flex items-center gap-2">
                <CalendarIcon size={18} className="text-accent" />
                <dt className="sr-only">Date</dt>
                <dd>{next.date}</dd>
              </div>
              <div className="inline-flex items-center gap-2">
                <ClockIcon size={18} className="text-accent" />
                <dt className="sr-only">Time</dt>
                <dd>{next.time}</dd>
              </div>
              <div className="inline-flex items-center gap-2">
                <MapPinIcon size={18} className="text-accent" />
                <dt className="sr-only">Location</dt>
                <dd>{next.location}</dd>
              </div>
            </dl>

            <Link
              href="/events"
              className="mt-7 inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-on-primary shadow-md transition-[background-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              See all events
              <ArrowRightIcon size={18} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 text-center shadow-md sm:p-10">
          <p className="text-lg leading-relaxed text-muted-foreground">
            We currently do not have any event coming up.
          </p>

          <Link
            href="/events"
            className="mt-7 inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-on-primary shadow-md transition-[background-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            See previous events
            <ArrowRightIcon size={18} />
          </Link>
        </div>
      )}
    </Section>
  );
}
