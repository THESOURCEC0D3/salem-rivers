import Link from "next/link";
import { church } from "../../content/church";
import { Section } from "../Section";
import { ArrowRightIcon } from "../icons";

/**
 * About Salem Rivers — the short "who we are" beat, straight after the Bishop's
 * welcome. Four one-sentence cards rather than paragraphs: the homepage is the
 * trailer, /about is the full picture (which the closing link hands the reader
 * to, so the section is never a dead end).
 *
 * The four beats mirror the first four sections of /about in the same order —
 * identity, heritage, vision, mission — so a reader who clicks through finds the
 * page expanding on exactly what they just skimmed, not a different argument.
 *
 * The mission card is deliberately last and quotes `missionStatement` VERBATIM
 * (the same string /about renders at display size). It is a stated commitment —
 * summarising it here and stating it there would make the church look like it
 * has two different missions.
 */
export function AboutSalemRivers() {
  const { about } = church;

  const beats = [
    { title: "Who we are", body: about.identitySummary },
    { title: "Our heritage", body: about.heritageSummary },
    { title: "Our vision", body: about.visionSummary },
    { title: "Our mission", body: about.missionStatement },
  ];

  return (
    <Section
      id="about"
      eyebrow={`About ${church.name}`}
      title="A family"
      intro={about.intro[1]}
      className="bg-muted/40"
    >
      <ul className="grid gap-5 sm:grid-cols-2">
        {beats.map((beat) => (
          <li
            key={beat.title}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <h3 className="font-serif text-xl font-semibold text-foreground">
              {beat.title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              {beat.body}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-center">
        <Link
          href="/about"
          className="inline-flex items-center gap-1.5 text-base font-semibold text-primary hover:underline"
        >
          More about who we are
          <ArrowRightIcon size={18} />
        </Link>
      </p>
    </Section>
  );
}
