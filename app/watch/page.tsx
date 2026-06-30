import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "../components/Container";
import { ArrowRightIcon } from "../components/icons";
import { PLAN_VISIT_HREF } from "../content/church";

export const metadata: Metadata = {
  title: "Watch",
  description:
    "Our livestream and latest services are coming soon. In the meantime, plan a visit — the best seat is in the room.",
};

/**
 * Watch — placeholder for now. The real two-state live page (schedule-based live /
 * not-live, YouTube embeds) is a deliberate later build. Keeps the visit primary.
 */
export default function WatchPage() {
  return (
    <section className="flex min-h-[calc(100svh-4rem)] items-center justify-center bg-gradient-to-b from-purple-soft to-background py-20">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-accent">
            Watch
          </p>

          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2.5 shadow-sm">
            {/* Red pulsing "live" indicator (static under prefers-reduced-motion) */}
            <span className="relative flex h-3 w-3" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
            </span>
            <span className="font-serif text-lg font-semibold text-foreground">
              Coming soon
            </span>
          </div>

          <h1 className="mt-8 text-balance text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl">
            Our livestream is on the way
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Watch live and catch the latest services here soon — but the best
            seat is always in the room.
          </p>

          <Link
            href={PLAN_VISIT_HREF}
            className="mt-8 inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-on-primary shadow-md transition-[background-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Plan Your Visit
            <ArrowRightIcon size={18} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
