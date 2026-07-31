"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Scroll reveal: a slight fade + slide as an element enters the viewport.
 *
 * ONE client component for the whole site, reused everywhere. Every section and
 * image wraps its children in this rather than becoming a client component
 * itself, so all the page sections stay server-rendered and the only JavaScript
 * added is this file plus Framer Motion.
 *
 * Deliberately restrained: 24px of travel and a 0.5s ease. This is a church site
 * for first-time visitors, not a showcase. Anything springier reads as a
 * distraction over the top of the actual message.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * CONTENT IS NEVER HIDDEN UNLESS JS HAS PROVEN IT CAN SHOW IT AGAIN.
 * Do not "simplify" the mount gate away. It exists because of a real bug.
 *
 * The obvious way to write this is to hand Framer `initial={{opacity: 0}}` and
 * let it render that server-side. That ships `style="opacity:0"` in the HTML,
 * which means ANY failure between SSR and Framer's first frame leaves the section
 * permanently blank — a hydration error, a chunk that 404s, a stale bundle, or
 * simply slow JS on the patchy mobile data this site targets. That is exactly
 * what happened to the department cards: correct markup, correct CSS, working
 * image URLs, invisible page.
 *
 * So: `canAnimate` starts false, and only an effect (which requires successful
 * hydration) flips it. Until then the children render in a plain, fully visible
 * wrapper. Every failure mode now degrades to "content visible, no animation"
 * instead of "content gone".
 *
 * The cost is that the reveal cannot run before hydration, so anything already on
 * screen at load fades in a beat late rather than on arrival. That is why the
 * heroes are not wrapped — they are above the fold and would be the only place
 * you would notice.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * `useReducedMotion` — a visitor with prefers-reduced-motion gets the content
 * with no animation at all, not a faster one. `globals.css` already neuters CSS
 * transitions for them; this extends the same courtesy to Framer, which drives
 * animation in JS and would otherwise ignore that CSS.
 *
 * `once: true` so content settles and never re-animates on scroll back up.
 * `amount: 0.15` plus a negative bottom margin starts the reveal slightly before
 * the element is fully on screen, so it finishes as the reader arrives.
 */
export function Reveal({
  children,
  className,
  /** Vertical travel in px. Pass 0 for a pure fade (good for full-bleed images). */
  y = 24,
  /** Seconds of delay. Use to stagger siblings, e.g. `delay={i * 0.08}`. */
  delay = 0,
  /** Render as a different element where a div would break layout (e.g. "li"). */
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  as?: "div" | "li" | "section" | "article" | "span";
}) {
  const reduceMotion = useReducedMotion();
  const [canAnimate, setCanAnimate] = useState(false);

  // Runs only after a successful hydration. If anything upstream broke, it never
  // runs, and the visible fallback below is what the visitor keeps.
  useEffect(() => setCanAnimate(true), []);

  if (!canAnimate || reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as];

  return (
    <MotionTag
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -80px 0px" }}
      transition={{
        duration: 0.5,
        // Standard decelerate curve: quick out of the gate, soft landing.
        ease: [0.22, 0.61, 0.36, 1],
        delay,
      }}
    >
      {children}
    </MotionTag>
  );
}
