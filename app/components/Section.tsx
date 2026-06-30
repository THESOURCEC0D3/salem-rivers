import type { ReactNode } from "react";
import { Container } from "./Container";

/** A vertical-rhythm section wrapper with an optional gold eyebrow + serif heading. */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
  containerClassName = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${className}`}>
      <Container className={containerClassName}>
        {(eyebrow || title || intro) && (
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            {eyebrow && (
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-accent">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                {title}
              </h2>
            )}
            {intro && (
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {intro}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
