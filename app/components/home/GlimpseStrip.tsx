import Image from "next/image";
import { Section } from "../Section";
import { Reveal } from "../Reveal";
import { glimpseImages } from "../glimpseImages";

/**
 * Life at Salem Rivers — real faces and moments, not the building.
 * `bg-background` keeps the light/muted alternation correct now that the
 * About section (muted) sits directly above this one.
 *
 * The heading props are overridable so /about can reuse this gallery verbatim
 * with its own wording and surface. Every default is the homepage's current
 * value, so calling `<GlimpseStrip />` with no props is unchanged behaviour —
 * do not "simplify" these back to hardcoded strings.
 */
export function GlimpseStrip({
  eyebrow = "A glimpse of us",
  title = "Life at Salem Rivers",
  intro = "Take a glimpse into our worship, community, ministries, and moments of fellowship.",
  className = "bg-background",
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  className?: string;
} = {}) {
  return (
    <Section
      id="glimpse"
      eyebrow={eyebrow}
      title={title}
      intro={intro}
      className={className}
    >
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {glimpseImages.map((photo, i) => {
          // The first tile is the featured one: double-wide, and square on mobile.
          const featured = i === 0;
          return (
            /*
              Per-tile reveal, staggered 70ms apart so the grid fills in as a
              sweep rather than all at once. y=16 (less than the 24 default)
              because these are small tiles in a tight grid; more travel reads as
              the layout shifting rather than settling.
            */
            <Reveal
              key={photo.src.src}
              y={16}
              delay={i * 0.07}
              className={`relative overflow-hidden rounded-2xl ${
                featured
                  ? "col-span-2 row-span-2 aspect-square lg:col-span-2 lg:aspect-[4/5]"
                  : "aspect-[4/5]"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                placeholder="blur"
                fill
                sizes={
                  featured
                    ? "(max-width: 1024px) 100vw, 50vw"
                    : "(max-width: 1024px) 50vw, 25vw"
                }
                className="object-cover"
              />
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
