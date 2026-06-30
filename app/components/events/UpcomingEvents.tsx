import Image from "next/image";
import Link from "next/link";
import { church, whatsappLink, PLAN_VISIT_HREF } from "../../content/church";
import { eventImages } from "../eventImages";
import { Section } from "../Section";
import { PhotoPlaceholder } from "../PhotoPlaceholder";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  WhatsAppIcon,
  ArrowRightIcon,
} from "../icons";

/** Upcoming events, nearest first. Each funnels to WhatsApp ("I'd like to come"). */
export function UpcomingEvents() {
  return (
    <Section
      id="upcoming"
      eyebrow="Upcoming"
      title="What's coming up"
      className="bg-background"
    >
      <div className="space-y-8">
        {church.events.upcoming.map((e) => {
          const flyer = eventImages[e.id];
          return (
            <article
              key={e.id}
              className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm md:flex"
            >
              <div className="bg-muted md:w-2/5 md:shrink-0">
                {flyer ? (
                  <Image
                    src={flyer}
                    alt={`Flyer for ${e.title}`}
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 24rem"
                    className="h-auto w-full"
                  />
                ) : (
                  <PhotoPlaceholder
                    label={e.flyer}
                    rounded=""
                    className="aspect-[3/4] h-full w-full"
                  />
                )}
              </div>

              <div className="p-7 sm:p-8 md:flex-1">
                <h3 className="text-2xl font-semibold text-foreground">
                  {e.title}
                </h3>

                <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/90">
                  <div className="inline-flex items-center gap-2">
                    <CalendarIcon size={18} className="text-accent" />
                    <dt className="sr-only">Date</dt>
                    <dd>{e.date}</dd>
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <ClockIcon size={18} className="text-accent" />
                    <dt className="sr-only">Time</dt>
                    <dd>{e.time}</dd>
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <MapPinIcon size={18} className="text-accent" />
                    <dt className="sr-only">Location</dt>
                    <dd>{e.location}</dd>
                  </div>
                </dl>

                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                  {e.blurb}
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={whatsappLink(
                      `Hello ${church.name}! I'd like to come to ${e.title}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-semibold text-white shadow-md transition-[background-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:bg-whatsapp-hover hover:shadow-lg focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-whatsapp"
                  >
                    <WhatsAppIcon size={20} />
                    I&apos;d like to come
                  </a>
                  <Link
                    href={PLAN_VISIT_HREF}
                    className="inline-flex items-center gap-1.5 px-2 text-sm font-semibold text-primary hover:underline"
                  >
                    New here? Plan your visit
                    <ArrowRightIcon size={16} />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
