import Image from "next/image";
import { church } from "../../content/church";
import { Section } from "../Section";
import { CheckIcon } from "../icons";

/**
 * Who we are — the identity beat, straight after the hero.
 *
 * Two columns from lg up: short statements on the left, a real photo on the
 * right. Paragraphs are deliberately one line each (see `about.whoWeAre`) so the
 * section skims on a phone instead of becoming a wall of text.
 */
export function WhoWeAre() {
  return (
    <Section
      id="who-we-are"
      eyebrow="Our identity"
      title="Who We Are"
      className="bg-background"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <ul className="space-y-4">
          {church.about.whoWeAre.map((line) => (
            <li key={line} className="flex gap-3">
              <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <CheckIcon size={15} />
              </span>
              <p className="text-[17px] leading-relaxed text-muted-foreground">
                {line}
              </p>
            </li>
          ))}
        </ul>

        {/*
          A real congregation photo rather than a placeholder panel — this is the
          first thing under the hero and it has to look finished. Cropped to 4/3
          with object-cover because it is decorative framing, not a flyer whose
          text must survive (contrast the event cards, which never crop).
        */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border shadow-lg">
          <Image
            src="/images/congregationImage.jpg"
            alt={`The ${church.name} congregation worshipping together on a Sunday`}
            fill
            sizes="(max-width: 1024px) 100vw, 32rem"
            className="object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
