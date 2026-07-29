import { church } from "../../content/church";
import { Section } from "../Section";

/**
 * Our passion — five short drives, as a numbered rhythm.
 *
 * Five items divide badly into a 2- or 3-up grid (one orphan on the last row), so
 * this is a list of rows rather than cards: a large gold ordinal, a title, and a
 * line of explanation. It stays readable at 375px and reads as a progression,
 * which matches what the five actually are.
 */
export function OurPassion() {
  return (
    <Section
      id="passion"
      eyebrow="What drives us"
      title="Our Passion"
      intro="Five things we give ourselves to, in this order."
      className="bg-background"
    >
      <ol className="mx-auto max-w-3xl divide-y divide-border rounded-3xl border border-border bg-card shadow-sm">
        {church.about.passion.map((item, i) => (
          <li
            key={item.title}
            className="flex items-start gap-5 p-6 sm:gap-6 sm:p-7"
          >
            <span
              aria-hidden="true"
              className="font-serif text-3xl font-semibold leading-none text-accent/40 sm:text-4xl"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1">
              <h3 className="font-serif text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
