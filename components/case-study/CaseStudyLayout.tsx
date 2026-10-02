import Link from "next/link";
import type { ReactNode } from "react";
import CountUp from "@/components/CountUp";
import TagChip from "@/components/TagChip";
import { getCaseStudy, getListingHref, getPrevNext } from "@/lib/projects";

interface MetaItem {
  label: string;
  value: ReactNode;
}

interface Stat {
  value: string;
  label: string;
}

/** Deprecated: replaced by `stats`. Rendered as a single label-less stat until pages migrate. */
interface Highlight {
  stat: ReactNode;
}

interface CaseStudyLayoutProps {
  slug: string;
  /** Serif page title (may differ slightly from the nav shortTitle). */
  title: string;
  eyebrow: string;
  summary: string;
  /** Up to 3 headline numbers shown under the summary for skimming recruiters. */
  stats?: Stat[];
  /** @deprecated Use `stats`. */
  highlight?: Highlight;
  meta: MetaItem[];
  /** Optional "The product" primer, rendered above the visual preview/hero. */
  productIntro?: ReactNode;
  /** Optional full-width photo/video hero, rendered above the content. */
  hero?: ReactNode;
  children: ReactNode;
}

export default function CaseStudyLayout({
  slug,
  title,
  eyebrow,
  summary,
  stats,
  highlight,
  meta,
  productIntro,
  hero,
  children,
}: CaseStudyLayoutProps) {
  const study = getCaseStudy(slug);
  const { prev, next } = getPrevNext(slug);
  const isBuild = study.category === "build";
  const shownStats: { value: ReactNode; label?: string }[] = stats?.length
    ? stats.slice(0, 3)
    : highlight
      ? [{ value: highlight.stat }]
      : [];

  return (
    <article>
      {/* ================= Header ================= */}
      <header className="relative overflow-hidden border-b border-line bg-surface">
        <div className="container-site relative py-14 md:py-20">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-caption text-ink-muted">
              <li>
                <Link href={getListingHref(study)} className="hover:text-accent-deep">
                  {isBuild ? "Builds" : "Work"}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              {study.company && (
                <>
                  <li>
                    <Link href={study.company.href} className="hover:text-accent-deep">
                      {study.company.name}
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                </>
              )}
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

          {shownStats.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
              {shownStats.map((stat, i) => (
                <div key={i}>
                  <p className="font-display text-h1 font-semibold leading-none text-ink">
                    {typeof stat.value === "string" ? <CountUp value={stat.value} /> : stat.value}
                  </p>
                  {stat.label && (
                    <p className="mt-2 text-caption text-ink-muted">{stat.label}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            {study.tags.slice(0, 3).map((tag) => (
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
        {productIntro}
        {hero}

        <div className="min-w-0">{children}</div>
      </div>

      {/* ================= Prev / Next ================= */}
      <nav aria-label={isBuild ? "More builds" : "More design projects"} className="border-t border-line bg-surface">
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
