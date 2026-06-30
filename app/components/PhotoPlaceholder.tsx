import { church } from "../content/church";

/**
 * Honest stand-in for a real photo until the church supplies images.
 * Renders a warm gradient panel with a clear caption of what belongs here.
 * To go live: replace each usage with
 *   <Image src="/photos/hero.webp" alt="…" fill className="object-cover" />
 * (see church.photos for the shot list).
 */
export function PhotoPlaceholder({
  label,
  className = "",
  rounded = "rounded-2xl",
}: {
  label: string;
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={`photo-ph ${rounded} ${className}`}
      role="img"
      aria-label={`Placeholder — ${label}`}
    >
      <div className="absolute inset-0 grid place-items-center p-4 text-center">
        <span className="max-w-[18rem] rounded-full bg-black/30 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white/90 backdrop-blur-sm">
          Photo · {label}
        </span>
      </div>
    </div>
  );
}

/** Tiny corner note clarifying placeholders are intentional, for the build review. */
export function PlaceholderNote() {
  return (
    <p className="text-center text-xs text-muted-foreground">
      Gradient panels are placeholders — swap in real photos of {church.name}{" "}
      (faces, not the building). See <code>app/content/church.ts</code>.
    </p>
  );
}
