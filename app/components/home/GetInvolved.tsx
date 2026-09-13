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
                /*
                  Three rendering modes, ONE FRAME — every card keeps the same
                  16:10 box so the grid stays even; only what happens inside it
                  differs. See the measurements in departmentImages.ts.

                  photo   → a real photograph, cropped to fill. Losing a little
                    background is fine, and `objectPosition` steers the crop.

                  graphic → a designed banner carrying a wordmark. NOT cropped:
                    these are 1.78 wide against a 1.60 frame and their ink runs
                    past what a centre crop keeps, so cover slices the last
                    letter off. object-contain on a warm frame whose colour sits
                    near the artwork's own edges, so the ~5% bars read as a mat
                    around a poster rather than as a failure to fill.

                  logo    → a square mark. Also not cropped. Black frame, which
                    joins the logo's own flat black backdrop invisibly.
                */
                <div
                  className={`relative aspect-[16/10] w-full overflow-hidden ${
                    photo.kind === "logo"
                      ? "bg-[#010101]"
                      : photo.kind === "graphic"
                        ? "bg-gold-soft"
                        : ""
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    placeholder="blur"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={
                      photo.kind === "photo"
                        ? `object-cover ${photo.objectPosition ?? "object-center"}`
                        : "object-contain"
                    }
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
                  /*
                    The visible text is the same on all six cards, which is right
                    — it reads well in context. But six links with identical
                    accessible names and six different destinations is what
                    Lighthouse means by "identical links have the same purpose":
                    a screen-reader user tabbing the list hears the same phrase
                    six times. aria-label names the department; the visible copy
                    is untouched.
                  */
                  aria-label={`Message us on WhatsApp about serving in the ${d.name} department`}
                  className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-whatsapp-text hover:underline"
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
