import { church } from "../../content/church";
import { Section } from "../Section";
import {
  LeafIcon,
  BookIcon,
  FlameIcon,
  SunriseIcon,
  TrendingUpIcon,
  ScalesIcon,
  ShieldCheckIcon,
  TargetIcon,
  GiftIcon,
} from "../icons";

/**
 * Core values — nine cards, three across on desktop.
 *
 * The icon indirection mirrors `beatIcons`: `church.about.coreValues` stores a
 * string key and this map resolves it to a component, so the content file never
 * imports React. An unknown key falls back to a neutral glyph rather than
 * crashing the page.
 */
const valueIcons = {
  leaf: LeafIcon,
  book: BookIcon,
  flame: FlameIcon,
  sunrise: SunriseIcon,
  growth: TrendingUpIcon,
  scales: ScalesIcon,
  shield: ShieldCheckIcon,
  target: TargetIcon,
  gift: GiftIcon,
} as const;

export function CoreValues() {
  return (
    <Section
      id="core-values"
      eyebrow="How we live"
      title="Our Core Values"
      intro="The nine things we hold each other to, in the building and outside it."
      className="bg-muted/40"
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {church.about.coreValues.map((value) => {
          const Icon =
            valueIcons[value.icon as keyof typeof valueIcons] ?? ShieldCheckIcon;
          return (
            <li
              key={value.title}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              <span
                aria-hidden="true"
                className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary"
              >
                <Icon size={24} />
              </span>
              <h3 className="mt-4 text-balance font-serif text-lg font-semibold leading-snug text-foreground">
                {value.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {value.body}
              </p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
