import Link from "next/link";
import { church, whatsappLink, PLAN_VISIT_HREF } from "../../content/church";
import { Container } from "../Container";
import { ArrowRightIcon, WhatsAppIcon } from "../icons";

/**
 * Closing CTA for /about — "We'd Love to Welcome You".
 *
 * Same purple-band treatment as `ReadyToJoin` (which closes Home and Events) so
 * the page ends in the site's established language, but with this page's own
 * wording. `ReadyToJoin` is NOT also rendered here — two identical brand-colour
 * CTA bands stacked at the bottom of one page would read as a mistake.
 *
 * "Contact Us" is a WhatsApp deep link, not a /contact route: there is no contact
 * page by design (HANDOFF §6 — the footer carries the canonical address/phone,
 * and the site is WhatsApp-first with no forms anywhere). A button labelled
 * Contact Us that 404s would be worse than one that opens a chat.
 */
export function FinalCta() {
  return (
    <section className="bg-primary py-16 text-on-primary sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
            We&apos;d Love to Welcome You
          </h2>

          <p className="max-w-2xl text-lg leading-relaxed text-white/85">
            Whether you&apos;re exploring faith, looking for a church home, or
            simply searching for hope, there&apos;s a place for you at{" "}
            {church.name} Church.
          </p>

          <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              href={PLAN_VISIT_HREF}
              className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-primary shadow-lg transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Plan Your Visit
              <ArrowRightIcon size={18} />
            </Link>

            <a
              href={whatsappLink(
                `Hello ${church.name}! I've been reading your About page and I'd like to ask a question.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-[background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <WhatsAppIcon size={20} />
              Contact Us
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
