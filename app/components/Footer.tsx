import Link from "next/link";
import { church, navLinks, whatsappLink, PLAN_VISIT_HREF } from "../content/church";
import { Container } from "./Container";
import {
  DoorMarkIcon,
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  NavigationIcon,
  WhatsAppIcon,
  FacebookIcon,
  YoutubeIcon,
  InstagramIcon,
  ArrowRightIcon,
} from "./icons";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-border bg-muted/60">
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Identity + canonical contact (local SEO: consistent Name/Address/Phone) */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-on-primary">
                <DoorMarkIcon size={20} />
              </span>
              <span className="font-serif text-lg font-semibold">{church.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {church.identity}
            </p>
            <div className="mt-5 flex gap-2.5">
              <SocialLink href={church.socials.facebook} label="Facebook">
                <FacebookIcon size={18} />
              </SocialLink>
              <SocialLink href={church.socials.youtube} label="YouTube">
                <YoutubeIcon size={18} />
              </SocialLink>
              <SocialLink href={church.socials.instagram} label="Instagram">
                <InstagramIcon size={18} />
              </SocialLink>
            </div>
          </div>

          {/* Visit us */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-foreground">
              Visit us
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2.5">
                <MapPinIcon size={18} className="mt-0.5 shrink-0 text-accent" />
                <span>{church.address}</span>
              </li>
              <li className="flex gap-2.5">
                <PhoneIcon size={18} className="mt-0.5 shrink-0 text-accent" />
                <a href={church.phoneHref} className="hover:text-primary">
                  {church.phone}
                </a>
              </li>
            </ul>
            <a
              href={church.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              <NavigationIcon size={16} />
              Get directions
            </a>
          </div>

          {/* Service times */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-foreground">
              Service times
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {church.serviceTimes.map((s) => (
                <li key={s.label} className="flex gap-2.5">
                  <ClockIcon size={18} className="mt-0.5 shrink-0 text-accent" />
                  <span>
                    <span className="block text-foreground">{s.label}</span>
                    <span>{s.time}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore + CTAs */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-foreground">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.slice(1).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
              {/* CONDITIONAL — only rendered when the church clears Giving. */}
              {church.give.enabled && (
                <li>
                  <Link href={church.give.href} className="text-muted-foreground hover:text-primary">
                    Give
                  </Link>
                </li>
              )}
            </ul>

            <div className="mt-5 flex flex-col gap-2.5">
              <Link
                href={PLAN_VISIT_HREF}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Plan your visit
                <ArrowRightIcon size={16} />
              </Link>
              <a
                href={whatsappLink(`Hello ${church.name}! I have a question.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-whatsapp-hover hover:underline"
              >
                <WhatsAppIcon size={16} />
                Message us on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {church.name}, {church.city}, {church.state}.
          </p>
          <p className="text-xs">
            Built to point everything at one door — come and see.
          </p>
        </div>
      </Container>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-primary hover:text-primary"
    >
      {children}
    </a>
  );
}
