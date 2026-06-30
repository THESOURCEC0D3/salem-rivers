import { church } from "../../content/church";
import { Section } from "../Section";
import { PhotoPlaceholder, PlaceholderNote } from "../PhotoPlaceholder";

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
        {church.photos.glimpse.map((label, i) => (
          <PhotoPlaceholder
            key={label}
            label={label}
            className={`aspect-[4/5] ${i === 0 ? "col-span-2 row-span-2 aspect-square lg:col-span-2 lg:aspect-[4/5]" : ""}`}
          />
        ))}
      </div>
      <div className="mt-6">
        <PlaceholderNote />
      </div>
    </Section>
  );
}
