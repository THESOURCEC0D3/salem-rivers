import Link from "next/link";
import { Section } from "../Section";
import { ArrowRightIcon } from "../icons";

/**
 * Section — upcoming events. Nothing is scheduled at the moment, so this is the
 * empty state: one plain line, plus a route through to the events archive.
 * To bring the flyer card back, restore this file from git and make sure
 * `church.events.upcoming[0]` is the event you want featured.
 */
export function NextEvent() {
  return (
    <Section
      id="next-event"
      eyebrow="What's coming up"
      title="The next time to join us"
      className="bg-background"
    >
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
    </Section>
  );
}
