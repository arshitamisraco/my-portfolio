import Link from "next/link";
import type { ReactNode } from "react";
import TagChip, { type ChipTone } from "./TagChip";

interface ProjectCardProps {
  href: string;
  title: string;
  subtitle: string;
  description: string;
  tags: { label: string; tone?: ChipTone }[];
  /**
   * Cover slot — at launch a composed on-brand graphic; later swap in a
   * real product image or video without touching the card itself.
   */
  cover: ReactNode;
}

/** Full-width, image-forward featured project card. The whole card is one link. */
export default function ProjectCard({
  href,
  title,
  subtitle,
  description,
  tags,
  cover,
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-frame border border-line bg-surface-raised transition-all duration-300 hover:-translate-y-1 hover:border-accent motion-reduce:hover:translate-y-0"
    >
      <div className="overflow-hidden border-b border-line">{cover}</div>
      <div className="flex flex-col gap-4 p-6 md:flex-row md:items-end md:justify-between md:p-8">
        <div className="max-w-2xl">
          <p className="text-style-eyebrow text-accent-deep">{subtitle}</p>
          <h2 className="mt-2 font-display text-h2 font-semibold text-ink">{title}</h2>
          <p className="mt-2 text-body text-ink-muted">{description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <TagChip key={tag.label} tone={tag.tone}>
                {tag.label}
              </TagChip>
            ))}
          </div>
        </div>
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-pill border border-line bg-surface text-accent-deep transition-all duration-300 hover:bg-accent-soft hover:translate-x-1 motion-reduce:hover:translate-x-0"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M4 10h12m0 0l-5-5m5 5l-5 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
