"use client";

import { useEffect, useState } from "react";
import type { Testimonial } from "../content/church";
import { QuoteIcon, ChevronRightIcon } from "./icons";

/**
 * Testimonies — a discrete auto-advancing carousel (one card slides to the next
 * every few seconds, not a continuous marquee). Pauses on hover/focus and when
 * the user prefers reduced motion. Manual controls + dots for accessibility.
 * Cards carry the warm gold→ivory gradient moved off the event card.
 */
export function Testimonials({ items }: { items: Testimonial[] }) {
  const count = items.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (count <= 1 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 3500);
    return () => window.clearInterval(id);
  }, [count, paused]);

  const go = (i: number) => setIndex((i + count) % count);

  return (
    <div
      className="relative mx-auto max-w-2xl"
      aria-roledescription="carousel"
      aria-label="What people say about Salem Rivers"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-3xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((t, i) => (
            <div
              key={i}
              className="w-full shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
            >
              <TestimonyCard {...t} />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <CarouselButton label="Previous testimony" onClick={() => go(index - 1)}>
          <ChevronRightIcon size={20} className="rotate-180" />
        </CarouselButton>

        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to testimony ${i + 1}`}
              aria-current={i === index}
              className={`h-2.5 cursor-pointer rounded-full transition-all duration-200 ${
                i === index ? "w-6 bg-primary" : "w-2.5 bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>

        <CarouselButton label="Next testimony" onClick={() => go(index + 1)}>
          <ChevronRightIcon size={20} />
        </CarouselButton>
      </div>
    </div>
  );
}

function CarouselButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {children}
    </button>
  );
}

function TestimonyCard({ quote, name, context, photo }: Testimonial) {
  return (
    <figure className="flex min-h-full flex-col rounded-3xl border border-border bg-gradient-to-br from-gold-soft to-card p-8 text-center sm:p-10">
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white/70 text-accent">
        <QuoteIcon size={26} />
      </span>
      <blockquote className="mt-5 flex-1 text-balance font-serif text-xl leading-snug text-foreground sm:text-2xl">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center justify-center gap-3">
        {photo && (
          <span
            className="photo-ph h-12 w-12 shrink-0 rounded-full"
            role="img"
            aria-label={`Placeholder — ${photo}`}
          />
        )}
        <span className="text-left">
          <span className="block font-semibold text-foreground">{name}</span>
          {context && (
            <span className="block text-sm text-muted-foreground">{context}</span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
