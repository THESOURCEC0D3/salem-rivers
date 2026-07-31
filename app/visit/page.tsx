import type { Metadata } from "next";
import { church, whatsappLink } from "../content/church";
import { Container } from "../components/Container";
import {
  ClockIcon,
  MapPinIcon,
  NavigationIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "../components/icons";

export const metadata: Metadata = {
  title: "Plan Your Visit",
  description:
    "Where and when to find Salem Rivers in Port Harcourt: service times, our address, and a direct line to message us on WhatsApp. Come as you are.",
};

/**
 * Plan Your Visit — intentionally minimal: service times, address, and a direct
 * way to reach us (WhatsApp + call). No contact form — the whole site is
 * WhatsApp-first. Newcomers wanting the full picture go to About.
 */
export default function VisitPage() {
  return (
    <>
      <section className="border-b border-border bg-gradient-to-b from-purple-soft to-background">
        <Container>
          <div className="max-w-2xl py-16 sm:py-20">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-accent">
              We&apos;d love to have you
            </p>
            <h1 className="text-balance text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl">
              Plan your visit
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Here&apos;s where and when to find us. Come as you are, and if
              you have a question first, we&apos;re one message away.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-8">
              {/* Service times */}
              <article className="rounded-3xl border border-border bg-card p-7 shadow-sm sm:p-8">
                <h2 className="flex items-center gap-3 text-xl font-semibold text-foreground">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-purple-soft text-primary">
                    <ClockIcon size={20} />
                  </span>
                  Service times
                </h2>
                <ul className="mt-5 divide-y divide-border">
                  {church.serviceTimes.map((s) => (
                    <li
                      key={s.label}
                      className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                    >
                      <span className="text-[15px] text-foreground">{s.label}</span>
                      <span className="font-semibold text-foreground">{s.time}</span>
                    </li>
                  ))}
                </ul>
              </article>

              {/* Address */}
              <article className="rounded-3xl border border-border bg-card p-7 shadow-sm sm:p-8">
                <h2 className="flex items-center gap-3 text-xl font-semibold text-foreground">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-purple-soft text-primary">
                    <MapPinIcon size={20} />
                  </span>
                  Where to find us
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-foreground">
                  {church.address}
                </p>
                <a
                  href={church.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-on-primary shadow-md transition-[background-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <NavigationIcon size={18} />
                  Get directions
                </a>
              </article>

              {/* Contact — direct WhatsApp, no form */}
              <article className="rounded-3xl border border-border bg-card p-7 shadow-sm sm:p-8">
                <h2 className="text-xl font-semibold text-foreground">
                  Have a question? Talk to us
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  No forms to fill. Just message us directly on WhatsApp, or
                  give us a call. We&apos;re happy to help with anything before
                  you come.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={whatsappLink(
                      `Hello ${church.name}! I'm planning to visit and have a question.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-semibold text-white shadow-md transition-[background-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:bg-whatsapp-hover hover:shadow-lg focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-whatsapp"
                  >
                    <WhatsAppIcon size={20} />
                    Message us on WhatsApp
                  </a>
                  <a
                    href={church.phoneHref}
                    className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3 font-semibold text-foreground shadow-sm transition-[border-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-primary focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <PhoneIcon size={20} className="text-accent" />
                    Call us
                  </a>
                </div>
              </article>
            </div>

            {/* Lazy-loaded map */}
            <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
              <iframe
                src={church.mapEmbedUrl}
                title={`Map to ${church.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-80 w-full lg:h-full lg:min-h-[28rem]"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
