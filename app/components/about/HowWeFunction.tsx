import Link from "next/link";
import { church } from "../../content/church";
import { Section } from "../Section";
import { CheckIcon, ArrowRightIcon } from "../icons";

/**
 * How the church functions — membership + weekly rhythm, then the serving units.
 * The departments are reused from `church.departments` (also on the homepage), shown
 * here compactly to describe structure rather than recruit.
 */
export function HowWeFunction() {
  const { howWeFunction } = church.about;
  const blocks = [howWeFunction.membership, howWeFunction.rhythms];

  return (
    <Section
      id="how-we-function"
      eyebrow="How the church works"
      title="How we function"
      intro={howWeFunction.intro}
      className="bg-muted/40"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {blocks.map((block) => (
          <article
            key={block.title}
            className="rounded-2xl border border-border bg-card p-7 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-foreground">{block.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              {block.body}
            </p>
          </article>
        ))}
      </div>

      {/* Serving units / departments */}
      <div className="mt-10">
        <h3 className="text-center text-lg font-semibold text-foreground">
          Our departments &amp; units
        </h3>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {church.departments.map((d) => (
            <li
              key={d.name}
              className="flex gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <CheckIcon size={15} />
              </span>
              <div>
                <p className="font-semibold text-foreground">{d.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {d.blurb}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center">
          <Link
            href="/#get-involved"
            className="inline-flex items-center gap-1.5 text-base font-semibold text-primary hover:underline"
          >
            Find a place to serve
            <ArrowRightIcon size={18} />
          </Link>
        </p>
      </div>
    </Section>
  );
}
