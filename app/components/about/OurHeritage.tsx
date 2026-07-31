import Image from "next/image";
import { church } from "../../content/church";
import { Section } from "../Section";
import founders from "../../../public/images/Archbishop-and-his-wife.png";

/**
 * Our heritage — a vertical timeline of the line Salem Rivers stands in.
 *
 * Vertical at every breakpoint, on purpose. Seven entries with real prose will
 * not survive a horizontal rail on a phone, and a layout that only works on a
 * desktop is the wrong trade for this audience. The year sits in a gold pill on
 * the rail; the card sits beside it.
 *
 * Structure is an <ol> because the order carries the meaning.
 */
export function OurHeritage() {
  const { heritage } = church.about;

  return (
    <Section
      id="heritage"
      eyebrow="Where we come from"
      title="Our Heritage"
      intro={heritage.intro}
      className="bg-muted/40"
    >
      {/*
        Founders panel. The source is a CUT-OUT PNG with a transparent
        background, so it must not be treated like a photograph: no object-cover
        crop (it would slice their heads), no `placeholder="blur"` (the blur-up
        data URL has no alpha, so it would flash an opaque rectangle behind the
        transparency). Instead it stands at natural ratio on a designed gradient
        panel, bottom-aligned so they appear grounded rather than floating.
      */}
      <div className="mx-auto mb-14 max-w-4xl overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-purple-soft to-card shadow-md">
        <div className="grid items-end gap-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div className="relative mx-auto w-full max-w-[18rem] px-6 pt-8 sm:mx-0 sm:max-w-none sm:px-0 sm:pl-8 sm:pt-10">
            <Image
              src={founders}
              alt={`${church.about.heritage.founders.names}, ${church.about.heritage.founders.role}`}
              sizes="(max-width: 640px) 18rem, 24rem"
              className="h-auto w-full object-contain"
            />
          </div>

          <div className="p-7 sm:py-10 sm:pr-10 sm:pl-2">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
              {church.about.heritage.founders.role}
            </p>
            <h3 className="mt-2 text-balance font-serif text-2xl font-semibold leading-snug text-foreground">
              {church.about.heritage.founders.names}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              {church.about.heritage.founders.body}
            </p>
          </div>
        </div>
      </div>

      <ol className="relative mx-auto max-w-3xl">
        {/*
          The rail. Pinned behind the markers and inset so it starts and ends
          inside the first and last node rather than dangling past them.
        */}
        <span
          aria-hidden="true"
          className="absolute left-[15px] top-3 bottom-3 w-px bg-border sm:left-[19px]"
        />

        {heritage.timeline.map((entry) => (
          <li key={entry.year} className="relative flex gap-5 pb-8 last:pb-0">
            {/* Marker — sits on the rail. */}
            <span
              aria-hidden="true"
              className="relative z-10 mt-1.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-accent bg-background sm:h-10 sm:w-10"
            >
              <span className="h-2 w-2 rounded-full bg-accent sm:h-2.5 sm:w-2.5" />
            </span>

            <div className="flex-1 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                {entry.year}
              </p>
              <h3 className="mt-1.5 font-serif text-xl font-semibold text-foreground">
                {entry.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {entry.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
