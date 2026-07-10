"use client";

import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  label: string;
}

/**
 * Table of contents: sticky rail on desktop with a scrollspy highlight,
 * collapsible <details> on mobile.
 */
export default function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const list = (
    <ul className="flex flex-col gap-1">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={active === item.id ? "true" : undefined}
            className={`block rounded-card border-l-2 py-1.5 pl-4 text-caption transition-colors ${
              active === item.id
                ? "border-accent-strong font-medium text-accent-deep"
                : "border-line text-ink-muted hover:text-accent-deep"
            }`}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Mobile: collapsible */}
      <details className="rounded-card border border-line bg-surface-raised p-4 lg:hidden">
        <summary className="cursor-pointer text-style-eyebrow text-accent-deep">
          On this page
        </summary>
        <nav aria-label="Table of contents" className="mt-4">
          {list}
        </nav>
      </details>

      {/* Desktop: sticky rail */}
      <nav
        aria-label="Table of contents"
        className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto lg:block"
      >
        <p className="text-style-eyebrow mb-4 text-accent-deep">On this page</p>
        {list}
      </nav>
    </>
  );
}
