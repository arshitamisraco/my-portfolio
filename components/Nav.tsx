"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PROJECTS_HREF } from "@/lib/projects";

const LINKS = [
  { label: "For fun", href: "/for-fun" },
  { label: "Projects", href: PROJECTS_HREF },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/arshita-misra/", external: true },
];

const CONTACT_LINK = { label: "Contact me", href: "/contact" };

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href !== "#" && !href.startsWith("http") && pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <nav aria-label="Main" className="container-site flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-h4 font-semibold tracking-tight text-ink transition-colors hover:text-accent-deep"
        >
          Arshita Misra
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {LINKS.map((link) => (
              <li key={link.label}>
                {link.external ? (
                  <a
                    href={link.href}
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-body text-ink-muted transition-colors hover:text-accent-deep"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`text-body transition-colors hover:text-accent-deep ${
                      isActive(link.href) ? "font-medium text-accent-deep" : "text-ink-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Link
            href={CONTACT_LINK.href}
            aria-current={isActive(CONTACT_LINK.href) ? "page" : undefined}
            className="inline-flex items-center rounded-pill border border-line bg-surface-raised px-4 py-2 text-body font-medium text-ink transition-colors hover:border-accent hover:bg-surface"
          >
            {CONTACT_LINK.label}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-card text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {open ? (
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-line bg-bg md:hidden">
          <ul className="container-site flex flex-col gap-1 py-4">
            {LINKS.map((link) => (
              <li key={link.label}>
                {link.external ? (
                  <a
                    href={link.href}
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="block rounded-card px-3 py-3 text-body-lg text-ink-muted hover:bg-surface"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`block rounded-card px-3 py-3 text-body-lg hover:bg-surface ${
                      isActive(link.href) ? "font-medium text-accent-deep" : "text-ink-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <Link
                href={CONTACT_LINK.href}
                aria-current={isActive(CONTACT_LINK.href) ? "page" : undefined}
                className={`block rounded-card px-3 py-3 text-body-lg hover:bg-surface ${
                  isActive(CONTACT_LINK.href) ? "font-medium text-accent-deep" : "text-ink-muted"
                }`}
              >
                {CONTACT_LINK.label}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
