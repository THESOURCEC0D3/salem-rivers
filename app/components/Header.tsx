"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { church, navLinks, PLAN_VISIT_HREF } from "../content/church";
import { Button } from "./Button";
import { Container } from "./Container";
import { DoorMarkIcon, MenuIcon, CloseIcon, ArrowRightIcon } from "./icons";

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
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-md text-foreground"
            aria-label={`${church.name}, home`}
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-on-primary">
              <DoorMarkIcon size={20} />
            </span>
            <span className="font-serif text-lg font-semibold tracking-tight">
              {church.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden md:block">
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

          <div className="hidden md:block">
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
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-xl border border-border bg-surface text-foreground md:hidden"
          >
            {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-border bg-background md:hidden">
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
