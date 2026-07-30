import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "./Container";

/**
 * The shared interior-page hero (HANDOFF §8b).
 *
 * One component, two skins, chosen by whether `image` is supplied:
 *
 *   image given  → full-bleed photo + scrim, WHITE text. Used where a page has a
 *                  real photograph worth leading with.
 *   no image     → the warm `purple-soft → background` gradient, DARK text. The
 *                  fallback, so a page without a photo still looks deliberate
 *                  rather than unfinished.
 *
 * This replaces what were becoming several near-identical bespoke heroes. Adding
 * a photo to a page is now a one-prop change, not a rewrite — which is the whole
 * point, since the Events photo has not arrived yet.
 *
 * `children` is the CTA row, and it is the CALLER'S job to style it: buttons on
 * the photo skin need white-on-dark treatment, buttons on the gradient skin need
 * the normal light-surface variants. Pushing that in here would mean this
 * component owning a button system it has no business owning.
 *
 * NOT used by the homepage `Hero` — that one is taller, left-weighted, carries
 * service-time chips and is the front door. It stays bespoke on purpose.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  align = "left",
  size = "compact",
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Supply to switch to the photo skin. `priority` defaults on — a hero is the route's LCP. */
  image?: {
    src: string;
    alt: string;
    priority?: boolean;
    /** Tailwind object-position class, e.g. "object-top". Defaults to centre. */
    objectPosition?: string;
  };
  align?: "left" | "center";
  size?: "compact" | "tall";
  children?: ReactNode;
}) {
  const hasPhoto = Boolean(image);
  const centered = align === "center";
  const tall = size === "tall";

  return (
    <section
      className={
        hasPhoto
          ? "relative isolate overflow-hidden bg-[#100a17]"
          : "border-b border-border bg-gradient-to-b from-purple-soft to-background"
      }
    >
      {hasPhoto && image && (
        <>
          {/* Solid dark base — what shows while the photo streams in, so text never flashes unreadable. */}
          <div className="absolute inset-0 -z-30 bg-[#100a17]" />

          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={image.priority ?? true}
            sizes="100vw"
            className={`-z-20 object-cover ${image.objectPosition ?? "object-center"}`}
          />

          {/*
            Two scrim layers: a flat wash for text contrast, then a bottom
            vignette so the photo settles into the section below instead of
            ending on a hard edge.
          */}
          <div className="absolute inset-0 -z-10 bg-black/60" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
        </>
      )}

      <Container>
        <div
          className={[
            "flex max-w-3xl flex-col",
            tall
              ? "min-h-[70svh] justify-center py-24 sm:py-28"
              : "py-16 sm:py-20 lg:py-24",
            centered ? "mx-auto items-center text-center" : "",
            hasPhoto ? "text-white" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {eyebrow && (
            <p
              className={`${tall ? "mb-4" : "mb-3"} text-xs font-bold uppercase tracking-[0.16em] ${
                hasPhoto ? "text-gold-soft" : "text-accent"
              }`}
            >
              {eyebrow}
            </p>
          )}

          <h1
            className={`text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl ${
              hasPhoto ? "" : "text-foreground"
            }`}
          >
            {title}
          </h1>

          {intro && (
            <p
              className={`${tall ? "mt-6 max-w-2xl" : "mt-5"} text-lg leading-relaxed ${
                hasPhoto ? "text-white/85" : "text-muted-foreground"
              }`}
            >
              {intro}
            </p>
          )}

          {children}
        </div>
      </Container>
    </section>
  );
}
