import Image from "next/image";
import { Section } from "../Section";
import { glimpseImages } from "../glimpseImages";

/** Section 3 — "A glimpse of us." Real faces and moments, not the building. */
export function GlimpseStrip() {
  return (
    <Section
      id="glimpse"
      eyebrow="A glimpse of us"
      title="Real people, real Sundays"
      intro="This is who you'll meet — a family that worships, prays, and does life together."
      className="bg-muted/40"
    >
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {glimpseImages.map((photo, i) => {
          // The first tile is the featured one: double-wide, and square on mobile.
          const featured = i === 0;
          return (
            <div
              key={photo.src.src}
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
            </div>
          );
        })}
      </div>
    </Section>
  );
}
