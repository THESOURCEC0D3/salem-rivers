import { church } from "../../content/church";
import { Container } from "../Container";

/** "Who we are" — a short, human introduction. */
export function AboutHero() {
  return (
    <section className="border-b border-border bg-gradient-to-b from-purple-soft to-background">
      <Container>
        <div className="max-w-3xl py-16 sm:py-20 lg:py-24">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-accent">
            About {church.name}
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            Who we are
          </h1>
          <div className="mt-6 space-y-4">
            {church.about.intro.map((para) => (
              <p key={para} className="text-lg leading-relaxed text-muted-foreground">
                {para}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
