import Image from "next/image";
import { church, whatsappLink } from "../../content/church";
import { Section } from "../Section";
import { Reveal } from "../Reveal";
import { PhotoPlaceholder } from "../PhotoPlaceholder";
import { departmentImages } from "../departmentImages";
import { WhatsAppIcon } from "../icons";

/**
 * Get involved — the church's serving teams. Cards mirror the event card:
 * an image on top, text below. Each links to a low-friction WhatsApp message.
 *
 * Heading and surface are overridable so /about can reuse these exact ministry
 * cards without a second copy of them. Defaults are the homepage's current
 * values, so `<GetInvolved />` with no props is unchanged behaviour.
 */
export function GetInvolved({
  eyebrow = "Get involved",
  title = "Find your place in the family",
  intro = "There's a seat for you on Sunday, and a place to serve through the week.",
  // background, not muted: NextEvent above is now bg-muted/40.
  className = "bg-background",
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  className?: string;
} = {}) {
  return (
    <Section
      id="get-involved"
      eyebrow={eyebrow}
      title={title}
      intro={intro}
      className={className}
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {church.departments.map((d, i) => {
          // Departments without a real photo yet fall back to the placeholder panel.
          const photo = departmentImages[d.name];
          return (
            // `as="li"` so the reveal wrapper IS the list item — a div between
            // <ul> and <li> would be invalid markup and break the grid.
            <Reveal
              as="li"
              key={d.name}
              y={16}
              delay={i * 0.06}
              className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              {photo ? (
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    placeholder="blur"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`object-cover ${photo.objectPosition ?? "object-center"}`}
                  />
                </div>
              ) : (
                <PhotoPlaceholder
                  label={d.photo}
                  rounded=""
                  className="aspect-[16/10] w-full"
                />
              )}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold text-foreground">
                  {d.name}
                </h3>
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
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
