import Image from "next/image";
import { church } from "../../content/church";
import { eventImages } from "../eventImages";
import { Section } from "../Section";
import { PhotoPlaceholder, PlaceholderNote } from "../PhotoPlaceholder";

/** Past events — photo evidence of community life. Below the upcoming list. */
export function PastEvents() {
  // Only show the placeholder disclaimer if something on screen is actually a
  // placeholder — with real imagery it would be a lie.
  const hasPlaceholder = church.events.past.some((p) => !eventImages[p.id]);

  return (
    <Section
      id="past"
      eyebrow="A look back"
      title="Past events"
      intro="A glimpse of what we've been up to."
      className="bg-muted/40"
    >
      {/*
        Centred flex-wrap, NOT a fixed grid. A grid always lays its tracks out
        whether or not there are items to fill them, so the single real past
        event would sit marooned in the left column with two empty tracks beside
        it. Fixed-width cards that wrap and centre look right at any count.
      */}
      <ul className="mx-auto flex max-w-5xl flex-wrap justify-center gap-5">
        {church.events.past.map((p) => {
          // Same lookup as UpcomingEvents: a real flyer/photo wins, otherwise
          // fall back to the labelled placeholder panel.
          const photo = eventImages[p.id];
          return (
            <li
              key={p.id}
              className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm sm:w-80"
            >
              {photo ? (
                <Image
                  src={photo}
                  alt={`${p.title} — ${p.date}`}
                  placeholder="blur"
                  sizes="(max-width: 640px) 100vw, 20rem"
                  className="h-auto w-full"
                />
              ) : (
                <PhotoPlaceholder
                  label={p.photo}
                  rounded=""
                  className="aspect-[4/3] w-full"
                />
              )}
              <div className="p-4">
                <p className="font-semibold text-foreground">{p.title}</p>
                <p className="text-sm text-muted-foreground">{p.date}</p>
              </div>
            </li>
          );
        })}
      </ul>
      {hasPlaceholder && (
        <div className="mt-6">
          <PlaceholderNote />
        </div>
      )}
    </Section>
  );
}
