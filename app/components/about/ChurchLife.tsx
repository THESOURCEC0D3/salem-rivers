import Link from "next/link";
import { church } from "../../content/church";
import { Section } from "../Section";
import {
  MusicIcon,
  BookIcon,
  SeedlingIcon,
  DropletIcon,
  BabyIcon,
  UsersIcon,
  NavigationIcon,
  HeartIcon,
  ClockIcon,
  ArrowRightIcon,
} from "../icons";

/**
 * Church life — how the local church actually runs, week to week.
 *
 * Six cards. The last one, Ministries & Departments, is a signpost rather than a
 * description: the real ministry cards are the homepage's `GetInvolved` component,
 * reused verbatim directly below this section, so the card anchors down to it
 * instead of restating (or worse, re-styling) it.
 *
 * Icon keys resolve here, same indirection as CoreValues.
 */
const lifeIcons = {
  music: MusicIcon,
  book: BookIcon,
  seedling: SeedlingIcon,
  droplet: DropletIcon,
  baby: BabyIcon,
  navigation: NavigationIcon,
  heart: HeartIcon,
  users: UsersIcon,
} as const;

/** The one card that points at the reused ministries section below. */
const MINISTRIES_TITLE = "Ministries & Departments";

export function ChurchLife() {
  return (
    <Section
      id="church-life"
      eyebrow="Week to week"
      title="Church Life"
      intro="What actually happens here, and how you can be part of any of it."
      className="bg-muted/40"
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {church.about.churchLife.map((item) => {
          const Icon = lifeIcons[item.icon as keyof typeof lifeIcons] ?? BookIcon;
          const isMinistries = item.title === MINISTRIES_TITLE;
          return (
            <li
              key={item.title}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              <span
                aria-hidden="true"
                className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent"
              >
                <Icon size={24} />
              </span>
              <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
                {item.title}
              </h3>

              {/*
                The schedule chip. Pulled out of the prose on purpose: a visitor
                scanning for "when is that?" should find it without reading a
                paragraph, and it keeps any "[to be confirmed]" marker visible
                rather than buried mid-sentence.
              */}
              {item.when && (
                <p className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-[13px] font-semibold text-accent">
                  <ClockIcon size={14} />
                  {item.when}
                </p>
              )}

              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                {item.body}
              </p>

              {isMinistries && (
                <Link
                  href="#get-involved"
                  className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  See the teams
                  <ArrowRightIcon size={16} />
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
