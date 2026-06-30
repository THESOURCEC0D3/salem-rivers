import { church } from "../../content/church";
import { Section } from "../Section";
import { PhotoPlaceholder } from "../PhotoPlaceholder";

/** Leadership — real photos + short intros build trust. */
export function Leadership() {
  return (
    <Section
      id="leadership"
      eyebrow="Our leaders"
      title="The people who serve us"
      intro="Real people you'll actually meet on a Sunday — here to welcome, teach, and pray with you."
      className="bg-background"
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {church.about.leadership.map((leader) => (
          <li
            key={`${leader.role}-${leader.name}`}
            className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
          >
            <PhotoPlaceholder label={leader.photo} rounded="" className="aspect-[4/3] w-full" />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground">{leader.name}</h3>
              <p className="text-sm font-semibold text-accent">{leader.role}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {leader.bio}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
