import { church } from "../../content/church";
import { Section } from "../Section";
import { PhotoPlaceholder, PlaceholderNote } from "../PhotoPlaceholder";

/** Past events — photo evidence of community life. Below the upcoming list. */
export function PastEvents() {
  return (
    <Section
      id="past"
      eyebrow="A look back"
      title={`Life at ${church.name}`}
      intro="A glimpse of what we've been up to — this is the family you'd be joining."
      className="bg-muted/40"
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {church.events.past.map((p) => (
          <li
            key={p.id}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
          >
            <PhotoPlaceholder label={p.photo} rounded="" className="aspect-[4/3] w-full" />
            <div className="p-4">
              <p className="font-semibold text-foreground">{p.title}</p>
              <p className="text-sm text-muted-foreground">{p.date}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <PlaceholderNote />
      </div>
    </Section>
  );
}
