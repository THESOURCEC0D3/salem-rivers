import Image from "next/image";
import { church } from "../../content/church";
import { Section } from "../Section";
import { CalendarIcon, ClockIcon, MapPinIcon } from "../icons";
import classesFlyer from "../../../public/images/leadership-classes-image.jpeg";

/**
 * The three schools in full, plus who they are open to and how to register.
 *
 * Everything is read from `church.classes` — the array is mapped, not
 * transcribed, so retiring a school or adding a fourth is a content edit.
 *
 * `time` is rendered ONLY when it is not a [CONFIRM] placeholder. The flyer
 * prints the literal word "TIME" against all three schools and gives no hour,
 * so rather than show a bracket to visitors or silently drop the field, the
 * card says the time is confirmed at registration. Fill `time` in church.ts and
 * these switch to showing it with no code change.
 */
export function ClassList() {
  const { classes } = church;
  const { institute } = classes;
  const isPlaceholder = (v: string) => v.trim().startsWith("[");

  return (
    <>
      <Section id="the-schools" className="bg-gold-wash-1">
        {/*
          The flyer at its natural ratio — it is a designed poster, so no crop.
          Capped at a readable width rather than stretched across the container.
        */}
        <figure className="mx-auto mb-12 max-w-3xl overflow-hidden rounded-3xl border border-border shadow-md sm:mb-14">
          <Image
            src={classesFlyer}
            alt={`Flyer for ${classes.theme}, listing ${classes.schools
              .map((s) => s.name)
              .join(", ")}`}
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, 48rem"
            className="h-auto w-full"
          />
        </figure>

        {/*
          The institute's story, straight under the flyer.

          Two typographic rules do the work here and are worth keeping: the
          headed blocks are <section>s with real <h3>s (not styled divs) so the
          page has a usable outline, and every list is a <ul> so a screen reader
          announces "list, 5 items" instead of running the modules together.
        */}
        <div className="mx-auto max-w-3xl">
          {/*
            The three schools named in the church's own order (see
            `institute.nameOrder`), which differs from the flyer order the cards
            below follow. Names are looked up by id so they live in one place.
          */}
          <ul className="mb-10 flex flex-col gap-2">
            {institute.nameOrder.map((id) => {
              const school = classes.schools.find((x) => x.id === id);
              if (!school) return null;
              return (
                <li
                  key={id}
                  className="text-lg font-semibold leading-snug text-foreground"
                >
                  {school.name}{" "}
                  <span className="text-accent">({school.short})</span>
                </li>
              );
            })}
          </ul>

          <p className="text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            {institute.mandate}
          </p>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            {institute.objective}
          </p>

          <section className="mt-10">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              {institute.journey.heading}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              {institute.journey.body}
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              {institute.workforce.heading}
            </h2>
            {/*
              `names` was supplied as a dangling "staffers like …". While it is
              still a [CONFIRM] placeholder the sentence stops after "staffers",
              which stands on its own; fill it in and the clause appears.
            */}
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              {isPlaceholder(institute.workforce.names)
                ? institute.workforce.body
                : `${institute.workforce.body.replace(/.$/, "")} like ${institute.workforce.names}.`}
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              {institute.affiliation.heading}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              {institute.affiliation.body}
            </p>
          </section>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <section className="rounded-2xl border border-border bg-gold-wash-3 p-6">
              <h2 className="font-serif text-xl font-semibold text-foreground">
                {institute.certificates.heading}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {institute.certificates.note}
              </p>
              <ol className="mt-4 flex list-decimal flex-col gap-2 pl-5 text-[15px] leading-relaxed text-foreground/90 marker:font-semibold marker:text-accent">
                {institute.certificates.items.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ol>
            </section>

            <section className="rounded-2xl border border-border bg-gold-wash-3 p-6">
              <h2 className="font-serif text-xl font-semibold text-foreground">
                {institute.modules.heading}
              </h2>
              <ol className="mt-4 flex list-decimal flex-col gap-2 pl-5 text-[15px] leading-relaxed text-foreground/90 marker:font-semibold marker:text-accent">
                {institute.modules.items.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ol>
            </section>
          </div>

          <section className="mt-10">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              {institute.campusLife.heading}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {institute.campusLife.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border bg-gold-wash-3 px-4 py-2 text-[15px] font-medium text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <hr className="mx-auto my-12 max-w-3xl border-border sm:my-14" />

        <ul className="mx-auto flex max-w-3xl flex-col gap-6">
          {classes.schools.map((s) => (
            <li
              key={s.id}
              className="rounded-3xl border border-border bg-gold-wash-3 p-6 shadow-sm sm:p-8"
            >
              <p className="font-serif text-2xl font-semibold text-accent">
                {s.acronym}
              </p>
              <h3 className="mt-1 text-balance text-xl font-semibold leading-snug text-foreground sm:text-2xl">
                {s.name}
              </h3>


              <dl className="mt-5 flex flex-col gap-2 text-sm text-foreground/90 sm:flex-row sm:flex-wrap sm:gap-x-6">
                <div className="inline-flex items-start gap-2">
                  <CalendarIcon size={18} className="mt-0.5 shrink-0 text-accent" />
                  <dt className="sr-only">Season</dt>
                  <dd>
                    {s.season} {classes.year}
                  </dd>
                </div>
                <div className="inline-flex items-start gap-2">
                  <ClockIcon size={18} className="mt-0.5 shrink-0 text-accent" />
                  <dt className="sr-only">Meets</dt>
                  <dd>
                    {s.meets}
                    {isPlaceholder(s.time)
                      ? " · time confirmed at registration"
                      : ` · ${s.time}`}
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="who-its-for"
        eyebrow="Who can come"
        
        intro="The schools are open to anyone ready to be prepared for what is next, whether you lead in the church, at work, or in your own business."
        className="bg-gold-wash-2"
      >
        <ul className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
          {classes.openTo.map((who) => (
            <li
              key={who}
              className="rounded-full border border-border bg-gold-wash-1 px-5 py-2.5 text-[15px] font-semibold text-foreground shadow-sm"
            >
              {who}
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-border bg-gold-wash-1 p-6 text-center shadow-sm sm:p-8">
          <h3 className="font-serif text-2xl font-semibold text-foreground">
            Admission is open
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            {classes.register.how}
          </p>

          <p className="mt-5 inline-flex items-start justify-center gap-2 text-[15px] text-foreground/90">
            <MapPinIcon size={18} className="mt-0.5 shrink-0 text-accent" />
            {classes.register.address}
          </p>

          {/*
            The registrar's numbers, NOT church.phone — see the note on
            `classes` in church.ts. They belong to the college office, so they
            are labelled as such rather than sitting bare where a visitor would
            read them as the church's line.
          */}
          <p className="mt-4 text-[15px] text-foreground/90">
            <span className="text-muted-foreground">Registrar&apos;s office: </span>
            {classes.register.phones.map((n, i) => (
              <span key={n}>
                {i > 0 && <span className="text-muted-foreground"> · </span>}
                <a
                  href={`tel:+234${n.replace(/\D/g, "").slice(1)}`}
                  className="font-semibold text-accent hover:underline"
                >
                  {n}
                </a>
              </span>
            ))}
          </p>
        </div>
      </Section>
    </>
  );
}
