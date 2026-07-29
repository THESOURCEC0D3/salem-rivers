import { church } from "../../content/church";
import { Section } from "../Section";
import { ChevronDownIcon } from "../icons";

/**
 * FAQs — a native <details>/<summary> accordion.
 *
 * NO "use client", and that is the point. A JS accordion would make this the
 * third client component on a site that deliberately ships only two, for zero
 * gain: <details> opens and closes natively, is keyboard operable, announces its
 * expanded state to screen readers, and works before (or without) hydration. On a
 * cheap Android over patchy data, "works before hydration" is the whole argument.
 *
 * Each panel is independent — no `name` attribute — so a visitor can open several
 * answers at once and compare them. Closing one to read another is friction.
 *
 * The chevron rotates via `group-open:` rather than any JS state.
 */
export function FaqAccordion() {
  return (
    <Section
      id="faq"
      eyebrow="Before you come"
      title="Frequently Asked Questions"
      intro="The things people usually want to know before a first visit."
      className="bg-background"
    >
      <div className="mx-auto max-w-3xl space-y-3">
        {church.about.faqs.map((faq) => (
          <details
            key={faq.q}
            className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-200 open:shadow-md"
          >
            <summary
              className={
                // list-none + the webkit rule kill the default disclosure triangle
                // in every engine; without both, Safari keeps its own marker.
                "flex cursor-pointer list-none items-center justify-between gap-4 p-5 " +
                "font-serif text-lg font-semibold text-foreground " +
                "transition-colors duration-200 hover:text-primary " +
                "focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-ring " +
                "sm:p-6 [&::-webkit-details-marker]:hidden"
              }
            >
              <span className="text-balance">{faq.q}</span>
              <span
                aria-hidden="true"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition-transform duration-200 ease-out group-open:rotate-180"
              >
                <ChevronDownIcon size={18} />
              </span>
            </summary>

            <div className="border-t border-border px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                {faq.a}
              </p>
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
