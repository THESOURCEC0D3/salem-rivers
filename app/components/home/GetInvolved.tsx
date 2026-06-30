import { church, whatsappLink } from "../../content/church";
import { Section } from "../Section";
import { PhotoPlaceholder } from "../PhotoPlaceholder";
import { WhatsAppIcon } from "../icons";

/**
 * Get involved — the church's serving teams. Cards mirror the event card:
 * an image on top, text below. Each links to a low-friction WhatsApp message.
 */
export function GetInvolved() {
  return (
    <Section
      id="get-involved"
      eyebrow="Get involved"
      title="Find your place in the family"
      intro="There's a seat for you on Sunday — and a place to serve through the week."
      className="bg-muted/40"
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {church.departments.map((d) => (
          <li
            key={d.name}
            className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            <PhotoPlaceholder label={d.photo} rounded="" className="aspect-[16/10] w-full" />
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-semibold text-foreground">{d.name}</h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                {d.blurb}
              </p>
              <a
                href={whatsappLink(
                  `Hello ${church.name}! I'd like to serve in the ${d.name} department.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-whatsapp-hover hover:underline"
              >
                <WhatsAppIcon size={18} />
                I&apos;d like to serve here
              </a>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
