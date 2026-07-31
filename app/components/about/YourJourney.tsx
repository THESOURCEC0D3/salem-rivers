import { church } from "../../content/church";
import { Section } from "../Section";

/**
 * Your journey — the path from first visit to sent-out believer.
 *
 * ONE list, two layouts, no duplicated markup:
 *   • mobile  → vertical rail down the left, node + card per step
 *   • lg up   → 4-across grid with a horizontal rail running behind the nodes
 *
 * The rails are separate absolutely-positioned elements toggled by breakpoint
 * (`lg:hidden` / `hidden lg:block`) because a single element cannot be both a
 * vertical and a horizontal line. The content itself is never duplicated — that
 * would double it for screen readers and double the DOM for no gain.
 *
 * Eight steps at 4 columns gives two clean rows of four, so the horizontal rail is
 * drawn per row rather than across the whole grid.
 */
export function YourJourney() {
  const steps = church.about.journey;

  return (
    <Section
      id="journey"
      eyebrow="What's next"
      title="Your Journey at Salem Rivers"
      intro="Nobody is rushed through this. Most people take it one step at a time, and every step has someone walking it with you."
      className="bg-muted/40"
    >
      <ol className="relative mx-auto max-w-6xl lg:grid lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
        {/* Mobile rail — vertical, behind the nodes. */}
        <span
          aria-hidden="true"
          className="absolute left-[15px] top-3 bottom-3 w-px bg-border lg:hidden"
        />

        {steps.map((step, i) => (
          <li
            key={step.title}
            className="relative flex gap-5 pb-8 last:pb-0 lg:flex-col lg:gap-0 lg:pb-0"
          >
            {/*
              Desktop rail segment — drawn per item, from this node to the next.
              Hidden on the last item of each row (every 4th) so the line never
              runs off the end of a row into empty space.
            */}
            {(i + 1) % 4 !== 0 && i !== steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-6 hidden h-px w-full bg-border lg:block"
              />
            )}

            <span
              aria-hidden="true"
              className="relative z-10 mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-primary bg-card font-serif text-sm font-semibold text-primary shadow-sm lg:mx-auto lg:mt-0 lg:h-12 lg:w-12 lg:text-base"
            >
              {i + 1}
            </span>

            <div className="flex-1 lg:mt-5 lg:text-center">
              <h3 className="font-serif text-lg font-semibold leading-snug text-foreground">
                {step.title}
              </h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
