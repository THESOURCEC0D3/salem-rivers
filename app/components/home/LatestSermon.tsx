import Link from "next/link";
import { church, type Sermon } from "../../content/church";
import { Section } from "../Section";
import { YouTubeFacade } from "../YouTubeFacade";
import { CalendarIcon, ArrowRightIcon, PlayIcon } from "../icons";

/**
 * ⛔ PARKED — NOT RENDERED. Do not re-add to the homepage without reading this.
 *
 * This was on the homepage briefly and was removed. Three reasons, all in the
 * project's own docs:
 *   1. design-system/salem-rivers/pages/home.md specifies 8 homepage sections
 *      and none of them is a sermon block.
 *   2. HANDOFF §8c files a sermon feature under "only if the church clears
 *      them" — no clearance is recorded anywhere.
 *   3. HANDOFF §1: "the livestream is always a subordinate fallback, never a
 *      co-equal call to action." A card-led section with a primary-purple CTA
 *      in the middle of the funnel is exactly the co-equal treatment the spec
 *      rules out. home.md item 7 even says "no big gold button."
 *
 * Kept intact (not deleted) so it can be restored whole if the church clears a
 * sermon feature. Its data lives at `church.sermons`, also parked. Before
 * reviving: fix the "Browse all sermons" link, which points at /watch because
 * no /sermons route exists.
 *
 * ---
 *
 * Latest sermon — a featured message for anyone who missed Sunday or who wants
 * to hear the teaching before visiting.
 *
 * Plays IN PAGE via `YouTubeFacade`: a poster and a play button until tapped,
 * then the real player. No YouTube code is downloaded unless someone chooses to
 * watch, so the ~95% who scroll past pay nothing for it.
 *
 * Reusable: pass a `sermon` to feature a different one (e.g. on a future
 * /sermons page); defaults to `church.sermons.latest`.
 *
 * TO ADD A POSTER STILL:
 *   1. drop the image in public/images/ (e.g. sermon-latest.jpg)
 *   2. `import sermonPoster from "../../../public/images/sermon-latest.jpg"`
 *   3. pass `poster={sermonPoster}` to <YouTubeFacade> below
 * Until then the facade shows the labelled placeholder panel.
 */
export function LatestSermon({
  sermon = church.sermons.latest,
}: {
  sermon?: Sermon;
}) {
  const hasVideo = Boolean(sermon.youtubeId);

  return (
    <Section
      id="latest-sermon"
      eyebrow="Latest sermon"
      title="Catch up on Sunday"
      className="bg-muted/40"
    >
      {/*
        max-w-6xl (was 5xl) and an even 2-column split: at ~1024-1280px the old
        1.1fr/1fr grid squeezed the text column so the title ran to three lines
        and pushed the CTA down out of view. Even halves at the Container width
        keep the button comfortably in the card.
      */}
      <article className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-border bg-card shadow-md lg:grid-cols-2">
        <YouTubeFacade
          youtubeId={sermon.youtubeId}
          label={sermon.thumbnail}
          title={sermon.title}
          sizes="(max-width: 1024px) 100vw, 34rem"
          className="lg:h-full"
        />

        <div className="flex flex-col p-7 sm:p-8">
          <h3 className="text-balance font-serif text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
            {sermon.title}
          </h3>

          <dl className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-foreground/90">
            <div className="inline-flex items-center gap-2">
              <dt className="sr-only">Speaker</dt>
              <dd className="font-semibold">{sermon.speaker}</dd>
            </div>
            <div className="inline-flex items-center gap-2">
              <CalendarIcon size={18} className="text-accent" />
              <dt className="sr-only">Date</dt>
              <dd>{sermon.date}</dd>
            </div>
          </dl>

          <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted-foreground">
            {sermon.description}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            {/*
              With a video the player itself is the primary action, so this
              becomes a quiet pointer to it rather than a competing button.
              Without one, it stays a full CTA to /watch so the card still leads
              somewhere.
            */}
            {hasVideo ? (
              <p className="text-sm text-muted-foreground">
                <PlayIcon
                  size={16}
                  className="mr-1.5 inline-block align-[-2px] text-accent"
                />
                Press play to watch here, no need to leave the page.
              </p>
            ) : (
              <Link
                href={sermon.watchHref}
                className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-on-primary shadow-md transition-[background-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <PlayIcon size={18} />
                Watch now
              </Link>
            )}

            <Link
              href={church.sermons.archiveHref}
              className="inline-flex items-center gap-1.5 px-2 text-sm font-semibold text-primary hover:underline sm:ml-auto"
            >
              Browse all sermons
              <ArrowRightIcon size={16} />
            </Link>
          </div>
        </div>
      </article>
    </Section>
  );
}
