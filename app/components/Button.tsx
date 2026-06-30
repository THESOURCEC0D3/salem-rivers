import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "whatsapp" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold cursor-pointer " +
  "transition-[background-color,color,transform,box-shadow] duration-200 ease-out " +
  "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ring " +
  "active:translate-y-0";

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-[15px] min-h-11", // min-h-11 = 44px touch target
  lg: "px-7 py-3.5 text-base min-h-12",
};

const variants: Record<Variant, string> = {
  // The "Plan Your Visit" CTA — the one button the whole site funnels to.
  primary:
    "bg-primary text-on-primary shadow-md hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-lg",
  // Subordinate (e.g. on light surfaces next to primary).
  secondary:
    "bg-surface text-foreground border border-border shadow-sm hover:border-primary hover:-translate-y-0.5 hover:shadow-md",
  // WhatsApp — recognizable green, the persistent "reach a human" fallback.
  whatsapp:
    "bg-whatsapp text-white shadow-md hover:bg-whatsapp-hover hover:-translate-y-0.5 hover:shadow-lg",
  // Quiet link-style (used for the subordinate livestream nudge).
  ghost: "text-foreground hover:text-primary underline-offset-4 hover:underline",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
  className = "",
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
