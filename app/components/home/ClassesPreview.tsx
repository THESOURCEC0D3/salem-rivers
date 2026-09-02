import Image from "next/image";
import { church } from "../../content/church";
import { Section } from "../Section";
import { Button } from "../Button";
import { ArrowRightIcon, CalendarIcon, ClockIcon } from "../icons";
import classesFlyer from "../../../public/images/leadership-classes-image.jpeg";

/**
 * Classes — the homepage trailer for /classes.
 *
 * Deliberately a SUMMARY: one line per school and nothing else. The full
 * descriptions, who each school is for, and how to register all live on
 * /classes, which the closing button hands the reader to. Repeating them here
 * would make the homepage the second-best version of that page.
 *
 * The flyer is shown at its natural ratio (h-auto, no crop) for the same reason
 * event flyers are — it is a designed poster and cropping it cuts text off.
 * It is NOT shrunk to a thumbnail either: at anything smaller than roughly this
 * the class names on it stop being legible, at which point it is decoration
 * pretending to be information.
 *
 * Renders `church.classes.schools` rather than three hardcoded blocks, so
 * adding or retiring a school is a content edit.
 */
export function ClassesPreview() {
  const { classes } = church;

  return (
    <Section
      id="classes"
      eyebrow="Grow with us"
      title={classes.theme}
      intro={`${classes.tagline}. Three schools run here across the year — one to ground you in Scripture, one to train you to lead, and one for those carrying a work.`}
      className="bg-gold-wash-2"
    >
      <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
        <figure className="overflow-hidden rounded-3xl border border-border shadow-md">
          <Image
            src={classesFlyer}
            alt={`Flyer for ${classes.theme}: the three schools running at ${church.shortName}`}
            placeholder="blur"
            sizes="(max-width: 1024px) 100vw, 30rem"
            className="h-auto w-full"
          />
        </figure>

        <ul className="flex flex-col gap-4">
          {classes.schools.map((s) => (
            <li
              key={s.id}
              className="rounded-2xl border border-border bg-gold-wash-1 p-5 shadow-sm sm:p-6"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-serif text-lg font-semibold text-accent">
                  {s.acronym}
                </span>
                <h3 className="text-lg font-semibold leading-snug text-foreground">
                  {s.name}
                </h3>
              </div>

              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {s.summary}
              </p>

              {/*
                Season and meeting day only. `time` is deliberately absent — the
                flyer prints the literal word "TIME" and no hour, so there is
                nothing true to put here. /classes says so in as many words
                rather than leaving a silent gap.
              */}
              <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-foreground/90">
                <div className="inline-flex items-center gap-1.5">
                  <CalendarIcon size={16} className="shrink-0 text-accent" />
                  <dt className="sr-only">Season</dt>
                  <dd>{s.season}</dd>
                </div>
                <div className="inline-flex items-center gap-1.5">
                  <ClockIcon size={16} className="shrink-0 text-accent" />
                  <dt className="sr-only">Meets</dt>
                  <dd>{s.meets}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 text-center">
        <Button href="/classes" variant="primary" size="lg">
          Learn more about our classes
          <ArrowRightIcon size={18} />
        </Button>
      </div>
    </Section>
  );
}
