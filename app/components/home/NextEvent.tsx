import Image from "next/image";
import Link from "next/link";
import { church } from "../../content/church";
import { eventImages } from "../eventImages";
import { Section } from "../Section";
import { PhotoPlaceholder } from "../PhotoPlaceholder";
import { CalendarIcon, ClockIcon, MapPinIcon, ArrowRightIcon } from "../icons";

/**
 * Section — the upcoming events, nearest first (= church.events.upcoming).
 *
 * Two states, and `church.events.upcoming` is the only switch between them:
 *   • array has entries → one flyer card per event, side by side from lg up
 *   • array is empty    → "no event coming up" + a route to the events archive
 *
 * So publishing or retiring an event is a content edit in church.ts, never a code
 * change here. The array renders in order, so keep it sorted nearest-first.
 *
 * NOTE: pages/home.md item 6 specifies "the single nearest upcoming event". This
 * shows the whole list by request. Nothing is capped — a third event wraps onto
 * a second row rather than being silently hidden.
 */
export function NextEvent() {
  const upcoming = church.events.upcoming;

  return (
    <Section
      id="next-event"
      eyebrow="What's coming up"
      title="Upcoming events"
      // muted, not background: GlimpseStrip above is bg-background, so this has
      // to be the muted half of the alternation (see page.tsx).
      className="bg-muted/40"
    >
      {upcoming.length > 0 ? (
        <>
          {/*
            items-center, deliberately — do not "fix" this to stretch.

            These are real flyers shown at their natural ratio (no crop), and the
            current two are shaped very differently: the campus outreach poster is
            portrait (864×1080, 0.80) while the thanksgiving one is landscape
            (2048×1365, 1.50). At equal card width that is 1.25×W of image height
            against 0.67×W — the taller card is ~1.9× the height of the shorter.

            Stretching to equal heights would dump all ~280px of that difference
            below the shorter card's text as one dead pool. Centring splits it
            evenly above and below, so the short card reads as balanced against
            its neighbour instead of unfinished. Cards still hug their own content.
          */}
          <div className="mx-auto grid max-w-5xl items-center gap-6 sm:gap-8 lg:grid-cols-2">
            {upcoming.map((e) => {
              const flyer = eventImages[e.id];
              return (
                <article
                  key={e.id}
                  className="overflow-hidden rounded-3xl border border-border bg-card shadow-md"
                >
                  {/*
                    A flyer is a designed poster — shown at its natural ratio
                    (h-auto, no crop) so no text gets cut off. Events without a
                    real flyer fall back to the labelled placeholder.
                  */}
                  {flyer ? (
                    <Image
                      src={flyer}
                      alt={`Flyer for ${e.title}`}
                      placeholder="blur"
                      sizes="(max-width: 1024px) 100vw, 30rem"
                      className="h-auto w-full"
                    />
                  ) : (
                    <PhotoPlaceholder
                      label={e.flyer}
                      rounded=""
                      className="aspect-[4/3] w-full"
                    />
                  )}

                  <div className="p-6 sm:p-7">
                    <h3 className="text-balance text-2xl font-semibold leading-snug text-foreground">
                      {e.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                      {e.blurb}
                    </p>

                    <dl className="mt-5 flex flex-col gap-2 text-sm text-foreground/90">
                      <div className="inline-flex items-start gap-2">
                        <CalendarIcon
                          size={18}
                          className="mt-0.5 shrink-0 text-accent"
                        />
                        <dt className="sr-only">Date</dt>
                        <dd>{e.date}</dd>
                      </div>
                      <div className="inline-flex items-start gap-2">
                        <ClockIcon
                          size={18}
                          className="mt-0.5 shrink-0 text-accent"
                        />
                        <dt className="sr-only">Time</dt>
                        <dd>{e.time}</dd>
                      </div>
                      <div className="inline-flex items-start gap-2">
                        <MapPinIcon
                          size={18}
                          className="mt-0.5 shrink-0 text-accent"
                        />
                        <dt className="sr-only">Location</dt>
                        <dd>{e.location}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              );
            })}
          </div>

          {/*
            One CTA for the whole section, not one per card — two identical
            buttons side by side would just be noise.
          */}
          <div className="mt-10 text-center">
            <Link
              href="/events"
              className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-on-primary shadow-md transition-[background-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              See all events
              <ArrowRightIcon size={18} />
            </Link>
          </div>
        </>
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
