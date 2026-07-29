import { church } from "../../content/church";
import { Container } from "../Container";
import { GlobeIcon } from "../icons";

/**
 * Our mission — the 300-million statement, given a whole band to itself.
 *
 * Full-bleed brand blue, no card, no grid. It is the only section on the page
 * built this way, which is the entire point: the statement gets weight from
 * isolation rather than from a new visual style. Same surface as ReadyToJoin, so
 * it is still the site's existing language.
 *
 * The statement is set in the serif display face at hero scale and is a <blockquote>
 * because it is a stated commitment, not body copy.
 */
export function OurMission() {
  return (
    <section
      id="mission"
      className="bg-primary py-20 text-on-primary sm:py-24 lg:py-28"
    >
      <Container>
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <span
            aria-hidden="true"
            className="grid h-14 w-14 place-items-center rounded-full border border-white/25 bg-white/10 text-gold-soft backdrop-blur-sm"
          >
            <GlobeIcon size={26} />
          </span>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-gold-soft">
            Our mission
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Our Mission
          </h2>

          <blockquote className="mt-8">
            <p className="text-balance font-serif text-2xl font-semibold leading-snug sm:text-3xl lg:text-4xl">
              {church.about.missionStatement}
            </p>
          </blockquote>

          <p className="mt-8 max-w-2xl border-t border-white/20 pt-8 text-lg leading-relaxed text-white/85">
            {church.about.missionSupport}
          </p>
        </div>
      </Container>
    </section>
  );
}
