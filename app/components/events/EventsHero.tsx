import { church } from "../../content/church";
import { Container } from "../Container";

/** Events header — prove the church is alive; frame events as an easy first step. */
export function EventsHero() {
  return (
    <section className="border-b border-border bg-gradient-to-b from-purple-soft to-background">
      <Container>
        <div className="max-w-3xl py-16 sm:py-20 lg:py-24">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-accent">
            What&apos;s happening
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            Events
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            There&apos;s always something happening at {church.name}. An event
            can be an easy first step — come along, bring a friend, and meet the
            family.
          </p>
        </div>
      </Container>
    </section>
  );
}
