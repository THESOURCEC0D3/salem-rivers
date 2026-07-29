import Link from "next/link";
import { church, PLAN_VISIT_HREF } from "../../content/church";
import { Container } from "../Container";
import { PlayIcon, ArrowRightIcon } from "../icons";

/**
 * Closing CTA — "Ready to join the family" on the purple brand background.
 * Physical visit stays primary; the livestream sits quietly below as the fallback.
 */
export function ReadyToJoin() {
  return (
    <section className="bg-primary py-16 text-on-primary sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
            Ready to join the family?
          </h2>
          {/*
            The tagline used to be concatenated in front of this line. It no
            longer ends in a full stop, which produced a run-on ("…Word and
            Prayer Come and see…"), and it already leads the hero at the top of
            the same page — so this closing line now stands on its own.
          */}
          <p className="max-w-xl text-lg text-white/85">
            Come and see — there&apos;s a seat saved for you, and we&apos;d love
            to meet you this Sunday.
          </p>

          <Link
            href={PLAN_VISIT_HREF}
            className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-primary shadow-lg transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Plan Your Visit
            <ArrowRightIcon size={18} />
          </Link>

          <div className="mt-3 flex flex-col items-center gap-1 border-t border-white/20 pt-5 text-white/75">
            <p className="text-sm">Can&apos;t make it in person?</p>
            <Link
              href="/watch"
              className="inline-flex items-center gap-2 text-sm font-medium text-white hover:underline"
            >
              <PlayIcon size={16} />
              Watch live or catch the latest service
            </Link>
            <p className="text-xs text-white/60">{church.watch.nextLiveLabel}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
