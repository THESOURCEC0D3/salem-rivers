/**
 * Inline SVG icon set — one consistent visual language (1.75 stroke, 24 grid).
 * No emoji as icons (design-system rule). Brand glyphs (WhatsApp etc.) are filled.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Stroke({ size = 24, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ClockIcon = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Stroke>
);

export const MapPinIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M20 10c0 5.5-8 11-8 11s-8-5.5-8-11a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Stroke>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </Stroke>
);

export const ChevronRightIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m9 6 6 6-6 6" />
  </Stroke>
);

export const MenuIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Stroke>
);

export const CloseIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Stroke>
);

export const CalendarIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
    <path d="M3 9h18M8 3v3M16 3v3" />
  </Stroke>
);

export const PlayIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
  </Stroke>
);

export const HeartIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 20s-7-4.6-9.3-9C1 8 2.6 4.5 6 4.5c2 0 3.3 1.2 4 2.4.7-1.2 2-2.4 4-2.4 3.4 0 5 3.5 3.3 6.5C19 15.4 12 20 12 20Z" />
  </Stroke>
);

export const ShirtIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M9 3 4 6l1.5 3L8 8v12h8V8l2.5 1L20 6l-5-3a3 3 0 0 1-6 0Z" />
  </Stroke>
);

export const BabyIcon = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="6" r="2.5" />
    <path d="M9 10.5c1.8 1.3 4.2 1.3 6 0" />
    <path d="M7 21v-4l-1.5-1.5a3 3 0 0 1 0-4.2M17 21v-4l1.5-1.5a3 3 0 0 0 0-4.2" />
  </Stroke>
);

export const PhoneIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M6.5 4h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z" />
  </Stroke>
);

export const QuoteIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M10 8c-2.2 0-4 1.8-4 4v4h4v-4H8a2 2 0 0 1 2-2V8ZM20 8c-2.2 0-4 1.8-4 4v4h4v-4h-2a2 2 0 0 1 2-2V8Z" />
  </Stroke>
);

export const NavigationIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M3 11 21 4l-7 17-2.5-7L3 11Z" />
  </Stroke>
);

export const CarIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M5 11l1.5-4.2A2 2 0 0 1 8.4 5.5h7.2a2 2 0 0 1 1.9 1.3L19 11" />
    <path d="M3 11h18v5a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1H6.5v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5Z" />
    <path d="M6.5 14h.01M17.5 14h.01" />
  </Stroke>
);

export const ShieldCheckIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 3l7 2.5V11c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V5.5L12 3Z" />
    <path d="m9 11.5 2 2 4-4" />
  </Stroke>
);

export const CheckIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m5 12.5 4 4 10-10" />
  </Stroke>
);

export const MusicIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M9 18V6l10-2v12" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="16" cy="16" r="3" />
  </Stroke>
);

/** A simple, non-denominational mark for the logo (open doorway + cross light). */
export const DoorMarkIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
    <path d="M4 21h16" />
    <path d="M12 7v5M10.5 9h3" />
  </Stroke>
);

export const beatIcons = {
  clock: ClockIcon,
  shirt: ShirtIcon,
  baby: BabyIcon,
  heart: HeartIcon,
} as const;

/* ---- Brand glyphs (filled) ---- */

export const WhatsAppIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
    <path d="M17.5 14.4c-.3-.15-1.7-.84-2-.94-.26-.1-.45-.15-.64.15-.19.28-.73.93-.9 1.12-.16.19-.33.21-.61.07-1.66-.83-2.75-1.48-3.84-3.36-.29-.5.29-.46.83-1.54.09-.19.05-.35-.02-.49-.07-.15-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.28-1 .98-1 2.38s1.02 2.76 1.17 2.95c.14.19 2 3.05 4.85 4.28.68.29 1.2.47 1.61.6.68.21 1.3.18 1.79.11.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34Z" />
    <path d="M12 2a10 10 0 0 0-8.5 15.26L2 22l4.85-1.27A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-2.88.75.77-2.8-.2-.31A8.2 8.2 0 1 1 12 20.2Z" />
  </svg>
);

export const FacebookIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
    <path d="M14 9V7.5c0-.7.5-1 1-1h2V3.5h-2.5C12 3.5 11 5.2 11 7v2H8.5v3H11v9h3v-9h2.3l.7-3H14Z" />
  </svg>
);

export const YoutubeIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
    <path d="M22 12c0-1.7-.1-3-.3-3.7a2.6 2.6 0 0 0-1.8-1.8C18.5 6 12 6 12 6s-6.5 0-7.9.5A2.6 2.6 0 0 0 2.3 8.3C2.1 9 2 10.3 2 12s.1 3 .3 3.7a2.6 2.6 0 0 0 1.8 1.8C5.5 18 12 18 12 18s6.5 0 7.9-.5a2.6 2.6 0 0 0 1.8-1.8c.2-.7.3-2 .3-3.7Zm-12 3V9l5 3-5 3Z" />
  </svg>
);

export const InstagramIcon = ({ size = 24, ...props }: IconProps) => (
  <Stroke size={size} {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="3.5" />
    <circle cx="17" cy="7" r="0.6" fill="currentColor" />
  </Stroke>
);
