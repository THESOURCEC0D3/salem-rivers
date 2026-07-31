import Image from "next/image";
import { church } from "../../content/church";
import { leaderImages } from "../leaderImages";
import { Section } from "../Section";
import { Reveal } from "../Reveal";
import { PhotoPlaceholder } from "../PhotoPlaceholder";

/**
 * Meet our leadership — real photos + short intros build trust.
 *
 * Cards are portrait (4/5) rather than the old 4/3: the real source photos are
 * portraits of people, and a landscape crop cut heads off. Faces are anchored via
 * `objectPosition` in `leaderImages`.
 *
 * Leaders without a real photo fall back to the labelled PhotoPlaceholder, so the
 * section works today and improves as photos arrive — no code change needed.
 */
export function Leadership() {
  return (
    <Section
      id="leadership"
      eyebrow="Our leaders"
      title="Meet Our Leadership"
      intro="Real people you'll actually meet on a Sunday, here to welcome, teach, and pray with you."
      className="bg-muted/40"
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {church.about.leadership.map((leader, i) => {
          const photo = leaderImages[leader.name];
          return (
            // `as="li"` keeps the markup valid: the reveal wrapper IS the list item.
            <Reveal
              as="li"
              key={leader.name}
              y={16}
              delay={i * 0.06}
              className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              {photo ? (
                /*
                  Two rendering modes, one frame. Every card is the same 4/5 box
                  so the row stays even; only what happens INSIDE differs.

                  cutout → transparent PNG. object-contain (never crop a masked
                    subject), bottom-aligned so they stand on the card's base
                    rather than float, on a tinted gradient that gives the empty
                    alpha somewhere to be. No blur placeholder: the generated
                    blurDataURL has no alpha and would flash an opaque block.

                  photo  → ordinary opaque image. Cropped to fill, blur-up on.
                */
                <div
                  className={`relative aspect-[4/5] w-full overflow-hidden ${
                    photo.kind === "cutout"
                      ? "bg-gradient-to-b from-purple-soft to-muted"
                      : "bg-muted"
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    {...(photo.kind === "photo"
                      ? { placeholder: "blur" as const }
                      : {})}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className={
                      photo.kind === "cutout"
                        ? "object-contain object-bottom p-3"
                        : `object-cover ${photo.objectPosition ?? "object-center"}`
                    }
                  />
                </div>
              ) : (
                <PhotoPlaceholder
                  label={leader.photo}
                  rounded=""
                  className="aspect-[4/5] w-full"
                />
              )}

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-lg font-semibold leading-snug text-foreground">
                  {leader.name}
                </h3>
                {/*
                  Rendered only when there is a role. An empty string would still
                  emit a <p> with its top margin, leaving that card's bio sitting
                  a line lower than its neighbours' — a ragged row for no reason.
                */}
                {leader.role && (
                  <p className="mt-0.5 text-sm font-semibold text-accent">
                    {leader.role}
                  </p>
                )}
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                  {leader.bio}
                </p>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
