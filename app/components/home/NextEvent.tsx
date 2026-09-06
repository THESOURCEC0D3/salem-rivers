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
      // gold-wash-3, the strongest step. FeaturedSermon above is wash-2, so
      // this stays distinct from it (see the surface order in page.tsx).
      className="bg-gold-wash-3"
    >
      {upcoming.length > 0 ? (
        <>
          {/*
            EQUAL-HEIGHT CARDS. This replaces an earlier `items-center` layout
            where every card hugged its own flyer and the row came out ragged.

            The reason cards could not match before: flyers were rendered at
            their natural ratio, and the real set runs from 0.59 (Let The Fire
            Fall, tall portrait) to 3.16 (Going Beyond Your Fathers, wide
            banner). At equal card width that is a 5.4× spread in image height,
            so no amount of alignment could square it.

            Now every flyer sits in the same fixed 4:3 frame (see the card
            below), so the images are identical in size and the only variable
            left is text length — which `flex-1` on the text block absorbs.
          */}
          <div className="mx-auto grid max-w-5xl gap-6 sm:gap-8 lg:grid-cols-2">
            {upcoming.map((e, i) => {
              const flyer = eventImages[e.id];
              /*
                An odd-numbered list leaves the last card alone on its own row.
                Left in place it sits in the left-hand track at half width with
                an empty track beside it, which reads as a card that failed to
                load. Let it span both tracks instead and centre it, capped at
                one column's width (50% minus half the 2rem lg gap) so it stays
                the same size as the cards above rather than stretching wide.
              */
              const isOrphan =
                upcoming.length % 2 === 1 && i === upcoming.length - 1;
              return (
                <article
                  key={e.id}
                  className={`flex flex-col overflow-hidden rounded-3xl border border-border bg-gold-wash-1 shadow-md ${
                    isOrphan ? "lg:col-span-2 lg:mx-auto lg:w-[calc(50%-1rem)]" : ""
                  }`}
                >
                  {/*
                    FIXED 4:3 FRAME + object-contain. A flyer is a designed
                    poster, so it is still never cropped — every word survives.
                    What changed is that it now sits inside a frame of a known
                    size instead of dictating one.

                    4:3 is not arbitrary: it is the geometric mean of the real
                    flyer ratios (1.28), i.e. the frame that wastes the least
                    space across the actual set. The cost is honest — a 3.16
                    banner fills ~42% of the frame height and a 0.59 portrait
                    ~44% of its width, so both letterbox against the bg-muted
                    mat. That is the price of uniform cards with uncropped
                    posters; there is no third option.
                  */}
                  <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-muted">
                    {flyer ? (
                      <Image
                        src={flyer}
                        alt={`Flyer for ${e.title}`}
                        placeholder="blur"
                        fill
                        sizes="(max-width: 1024px) 100vw, 30rem"
                        className="object-contain"
                      />
                    ) : (
                      <PhotoPlaceholder
                        label={e.flyer}
                        rounded=""
                        className="h-full w-full"
                      />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
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
        <div className="mx-auto max-w-xl rounded-3xl border border-border bg-gold-wash-1 p-8 text-center shadow-md sm:p-10">
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
