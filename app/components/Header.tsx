"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { church, navLinks, PLAN_VISIT_HREF } from "../content/church";
import { Button } from "./Button";
import { Container } from "./Container";
import { MenuIcon, CloseIcon, ArrowRightIcon } from "./icons";
/*
  The NAV asset, not `salem-logo-1.png`. The source file is a 500×500 canvas
  holding a 395×101 horizontal lockup — the artwork fills only 20% of its
  height, so sized by height here it would render about 8px tall. This is the
  same file trimmed to its alpha bounding box. If the church ever supplies a new
  logo export, trim it the same way rather than pointing this import at the
  untrimmed original.
*/
import salemLogo from "../../public/images/salem-logo-nav.png";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent background scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <Container>
        {/*
          h-20 (80px), raised from h-16. The logo could not get meaningfully
          bigger inside a 64px bar — 48px was already the ceiling there. If you
          change this, change the two `calc(100svh-5rem)` values that subtract
          it: Hero.tsx and give/page.tsx. That 5rem IS this height, and if they
          drift apart those sections stop filling the viewport exactly.
        */}
        <div className="flex h-20 items-center justify-between gap-4">
          {/*
            The logo replaces what used to be a DoorMarkIcon tile plus the
            church name in text.

            alt="" is deliberate, NOT an oversight. The link already carries an
            aria-label, which is what a screen reader announces; giving the
            image its own alt as well would announce the church name twice for
            one link. The artwork itself reads "Foundation Faith Church / Salem
            City of Faith", so the aria-label uses `name` to match it — a screen
            reader announcing a different name from the one sighted users can
            read is its own bug.

            Sized by HEIGHT with w-auto: the lockup is 3.91:1, so pinning the
            width instead would let the height drift with the viewport and
            fight the bar.

            THE DESKTOP NAV APPEARS AT lg, NOT md — that is what makes this
            size possible. Because the lockup is wide, its height is really a
            WIDTH budget, and a fifth nav link (Classes) blew that budget:

              5 links (~388px) + "Plan Your Visit" (~174px) + gaps (32px)
              = ~594px of fixed chrome. At md the container is only 720px,
              leaving ~126px — less than the logo needs at ANY size.

            So 768–1023px now shows the hamburger and gives the logo the whole
            row, and the nav returns at lg where the container is 960px and
            ~366px is left over. h-16 (64px → 250px wide) fits comfortably.

            On phones the ceiling is the 44px menu button: at 320px that
            leaves ~220px, so h-14 (56px → 219px) is the true maximum.

            BEFORE ADDING A SIXTH NAV LINK, redo this arithmetic. Each link
            costs roughly 90px and comes straight out of the logo's budget.
            NO loading/preload props — the Next default (lazy) is deliberate,
            and this was measured, not assumed. In this version of Next
            `loading="eager"` ALSO inserts a <link rel="preload"> for the image,
            and passing `preload={false}` alongside it does not suppress that.
            Verified against the built HTML: eager → the logo gets a preload
            emitted BEFORE the hero's, default → no preload at all.

            That matters because the route heroes are the LCP element on every
            page (Hero.tsx, PageHero.tsx) and hold the only preload worth
            having. Queueing a 44KB logo ahead of the image the score is
            actually measured on is a straight loss. The logo sits in the
            initial viewport, so a lazy image is fetched during first layout
            regardless — there is no real deferral to avoid here.

            Note for future edits: `priority` is DEPRECATED in Next 16 in favour
            of `preload` (see node_modules/next/dist/docs → components/image.md).
            Hero.tsx and PageHero.tsx still pass `priority` and should be
            migrated at some point; they work for now.
          */}
          <Link
            href="/"
            className="flex items-center rounded-md"
            aria-label={`${church.name}, home`}
          >
            <Image
              src={salemLogo}
              alt=""
              className="h-14 w-auto lg:h-16"
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`rounded-full px-3.5 py-2 text-[15px] font-semibold transition-colors hover:text-primary ${
                        active ? "text-primary" : "text-foreground/80"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <Button href={PLAN_VISIT_HREF} variant="primary" size="md">
              Plan Your Visit
              <ArrowRightIcon size={18} />
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-xl border border-border bg-surface text-foreground lg:hidden"
          >
            {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-border bg-background lg:hidden">
          <Container>
            <nav aria-label="Primary mobile" className="py-4">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                          active
                            ? "bg-purple-soft text-primary"
                            : "text-foreground hover:bg-muted"
                        }`}
                      >
                        {link.label}
                        <ArrowRightIcon size={18} className="opacity-50" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4">
                <Button href={PLAN_VISIT_HREF} variant="primary" size="lg" className="w-full">
                  Plan Your Visit
                  <ArrowRightIcon size={18} />
                </Button>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
