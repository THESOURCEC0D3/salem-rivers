import { church } from "../../content/church";
import { Section } from "../Section";

/**
 * Our vision — the four pillars, as premium cards.
 *
 * The "highlighted" treatment reuses the gradient the old Vision section used
 * (gold-soft → card) rather than inventing a new one, plus a numbered gold
 * medallion per card. No new design language, just a richer arrangement of the
 * tokens already in the system.
 */
export function OurVision() {
  return (
    <Section
      id="vision"
      eyebrow="Our vision"
      title="Our Vision"
      intro={church.pastor.words}
      className="bg-background"
    >
      <ul className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
        {church.about.visionPillars.map((pillar, i) => (
          <li
            key={pillar.title}
            className="flex flex-col rounded-3xl border border-border bg-gradient-to-br from-gold-soft to-card p-7 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-8"
          >
            <span
              aria-hidden="true"
              className="grid h-11 w-11 place-items-center rounded-full bg-accent font-serif text-lg font-semibold text-on-accent shadow-sm"
            >
              {i + 1}
            </span>
            <h3 className="mt-5 text-balance font-serif text-xl font-semibold leading-snug text-foreground sm:text-2xl">
              {pillar.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              {pillar.body}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
