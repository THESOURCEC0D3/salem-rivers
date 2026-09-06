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
              className="flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm sm:w-80"
            >
              {/*
                Fixed 4:3 frame, matching the upcoming cards. These wrap into
                rows, and flex already stretches every card in a row to the
                tallest — so without a fixed frame the images sat at different
                heights and the titles below them never lined up.
              */}
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-muted">
                {photo ? (
                  <Image
                    src={photo}
                    alt={`${p.title}, ${p.date}`}
                    placeholder="blur"
                    fill
                    sizes="(max-width: 640px) 100vw, 20rem"
                    className="object-contain"
                  />
                ) : (
                  <PhotoPlaceholder
                    label={p.photo}
                    rounded=""
                    className="h-full w-full"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
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
