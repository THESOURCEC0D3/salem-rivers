import Image from "next/image";
import Link from "next/link";
import { church } from "../../content/church";
import { eventImages } from "../eventImages";
import { Section } from "../Section";
import { PhotoPlaceholder } from "../PhotoPlaceholder";
import { CalendarIcon, ClockIcon, MapPinIcon, ArrowRightIcon } from "../icons";

/**
 * Section — the single nearest upcoming event (= events.upcoming[0]). Flyer image
 * on top (shown at natural ratio so the whole poster is visible), text below.
 */
export function NextEvent() {
  const e = church.events.upcoming[0];
  const flyer = eventImages[e.id];

  return (
    <Section
      id="next-event"
      eyebrow="What's coming up"
      title="The next time to join us"
      className="bg-background"
    >
      <div className="mx-auto max-w-xl overflow-hidden rounded-3xl border border-border bg-card shadow-md">
        {flyer ? (
          <Image
            src={flyer}
            alt={`Flyer for ${e.title}`}
            placeholder="blur"
            sizes="(max-width: 640px) 100vw, 36rem"
            className="h-auto w-full"
          />
        ) : (
          <PhotoPlaceholder label={e.flyer} rounded="" className="aspect-[4/3] w-full" />
        )}

        <div className="p-7 sm:p-8">
          <h3 className="text-2xl font-semibold text-foreground sm:text-3xl">
            {e.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            {e.blurb}
          </p>

          <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/90">
            <div className="inline-flex items-center gap-2">
              <CalendarIcon size={18} className="text-accent" />
              <dt className="sr-only">Date</dt>
              <dd>{e.date}</dd>
            </div>
            <div className="inline-flex items-center gap-2">
              <ClockIcon size={18} className="text-accent" />
              <dt className="sr-only">Time</dt>
              <dd>{e.time}</dd>
            </div>
            <div className="inline-flex items-center gap-2">
              <MapPinIcon size={18} className="text-accent" />
              <dt className="sr-only">Location</dt>
              <dd>{e.location}</dd>
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
    </Section>
  );
}
