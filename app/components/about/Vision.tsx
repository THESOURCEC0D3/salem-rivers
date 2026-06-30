import { church } from "../../content/church";
import { Container } from "../Container";

/** Our heart / vision — a few warm lines. */
export function Vision() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-gradient-to-br from-gold-soft to-card p-8 text-center shadow-sm sm:p-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-accent">
            Our heart
          </p>
          <h2 className="text-balance font-serif text-2xl leading-snug text-foreground sm:text-3xl">
            {church.about.vision}
          </h2>
        </div>
      </Container>
    </section>
  );
}
