import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "../components/Container";
import { ArrowRightIcon } from "../components/icons";
import { PLAN_VISIT_HREF } from "../content/church";

export const metadata: Metadata = {
  title: "Give",
  description:
    "Online giving is coming soon. Thank you for your generosity, which fuels everything we do.",
};

/**
 * Give — placeholder for now. Secure online giving (Paystack/Flutterwave) is a
 * deliberate later build. Mirrors the /watch coming-soon page.
 */
export default function GivePage() {
  return (
    <section className="flex min-h-[calc(100svh-4rem)] items-center justify-center bg-gradient-to-b from-purple-soft to-background py-20">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-accent">
            Give
          </p>

          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2.5 shadow-sm">
            {/* Pulsing "coming soon" indicator (static under prefers-reduced-motion) */}
            <span className="relative flex h-3 w-3" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
            </span>
            <span className="font-serif text-lg font-semibold text-foreground">
              Coming soon
            </span>
          </div>

          <h1 className="mt-8 text-balance text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl">
            Online giving is on the way
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Soon you&apos;ll be able to give securely online. Until then, thank
            you for your generosity, which fuels everything we do.
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
