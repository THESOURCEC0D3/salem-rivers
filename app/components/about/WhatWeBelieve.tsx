import { church } from "../../content/church";
import { Section } from "../Section";

/** What we believe — concise, plain language, not a theology dump. */
export function WhatWeBelieve() {
  return (
    <Section
      id="beliefs"
      eyebrow="The heart of our faith"
      title="What We Believe"
      intro="Plainly stated, without the jargon."
      className="bg-background"
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {church.about.beliefs.map((b) => (
          <li
            key={b.title}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <h3 className="font-serif text-xl font-semibold text-foreground">
              {b.title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              {b.body}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
