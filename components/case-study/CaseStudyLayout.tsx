import Link from "next/link";
import type { ReactNode } from "react";
import PixelCloud from "@/components/PixelCloud";
import TagChip from "@/components/TagChip";
import { COROS_HUB_HREF, getCaseStudy, getPrevNext, PROJECTS_HREF } from "@/lib/coros";

interface MetaItem {
  label: string;
  value: ReactNode;
}

interface Highlight {
  /** The headline metric, quantitative ("55% next-day return") or qualitative. */
  stat: ReactNode;
}

interface CaseStudyLayoutProps {
  slug: string;
  /** Serif page title (may differ slightly from the nav shortTitle). */
  title: string;
  eyebrow: string;
  summary: string;
  /** Headline impact metric shown at the top of the header for skimming recruiters. */
  highlight?: Highlight;
  meta: MetaItem[];
  /** Optional full-width photo/video hero, rendered above the content. */
  hero?: ReactNode;
  children: ReactNode;
}

export default function CaseStudyLayout({
  slug,
  title,
  eyebrow,
  summary,
  highlight,
  meta,
  hero,
  children,
}: CaseStudyLayoutProps) {
  const study = getCaseStudy(slug);
  const { prev, next } = getPrevNext(slug);

  return (
    <article>
      {/* ================= Header ================= */}
      <header className="relative overflow-hidden border-b border-line bg-surface">
        <PixelCloud
          shape="wisp"
          variant="lavender"
          size={150}
          className="absolute right-[6%] top-8 opacity-40"
          aria-hidden
        />
        <div className="container-site relative py-14 md:py-20">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-caption text-ink-muted">
              <li>
                <Link href={PROJECTS_HREF} className="hover:text-accent-deep">
                  Projects
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={COROS_HUB_HREF} className="hover:text-accent-deep">
                  COROS AI
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">
                {study.shortTitle}
              </li>
            </ol>
          </nav>

          <p className="text-style-eyebrow mt-10 text-accent-deep">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-display text-h1 font-semibold text-ink">
            {title}
          </h1>
          <p className="mt-4 max-w-4xl text-body-lg text-ink-muted">{summary}</p>

          {highlight && (
            <aside
              aria-label="Impact highlight"
              className="mt-8 max-w-2xl rounded-frame border border-line border-l-4 border-l-accent bg-surface-raised p-5 md:p-6"
            >
              <p className="text-style-eyebrow text-accent-deep">Impact</p>
              <p className="mt-2 font-display text-h3 font-semibold text-ink">
                {highlight.stat}
              </p>
            </aside>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <TagChip key={tag} tone={study.tone}>
                {tag}
              </TagChip>
            ))}
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="text-style-eyebrow text-ink-muted">{item.label}</dt>
                <dd className="mt-2 text-body text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* ================= Body ================= */}
      <div className="container-site py-14 md:py-20">
        {hero}

        <div className="min-w-0">{children}</div>
      </div>

      {/* ================= Prev / Next ================= */}
      <nav aria-label="More COROS AI case studies" className="border-t border-line bg-surface">
        <div className="container-site grid gap-4 py-12 md:grid-cols-2">
          <Link
            href={prev.href}
            className="group rounded-frame border border-line bg-surface-raised p-6 transition-colors hover:border-accent"
          >
            <p className="text-style-eyebrow text-ink-muted">← Previous</p>
            <p className="mt-2 font-display text-h4 font-semibold text-ink group-hover:text-accent-deep">
              {prev.shortTitle}
            </p>
          </Link>
          <Link
            href={next.href}
            className="group rounded-frame border border-line bg-surface-raised p-6 text-right transition-colors hover:border-accent"
          >
            <p className="text-style-eyebrow text-ink-muted">Next →</p>
            <p className="mt-2 font-display text-h4 font-semibold text-ink group-hover:text-accent-deep">
              {next.shortTitle}
            </p>
          </Link>
        </div>
      </nav>
    </article>
  );
}
