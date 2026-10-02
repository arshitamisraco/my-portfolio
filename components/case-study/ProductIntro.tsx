/**
 * "The product" primer shown at the top of every COROS AI case study, above the
 * visual preview. One sentence plus a link into the live app.
 */
export default function ProductIntro() {
  return (
    <section aria-label="The product" className="mb-10 border-b border-line pb-8">
      <p className="text-style-eyebrow text-accent-deep">The product</p>
      <p className="mt-3 max-w-3xl text-body text-ink">
        COROS AI is an AI coach that helps professionals shift moods, repair
        relationships and act when they&rsquo;re stuck; I joined as founding designer in
        2025 and led product, UX, prompts, research and brand.
      </p>
      <a
        href="https://app.coros.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-4 inline-flex shrink-0 items-center gap-2 rounded-frame border border-line px-4 py-2 text-caption font-medium text-accent-deep transition-all duration-300 hover:border-accent hover:bg-surface-raised"
      >
        Try what I built
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
        >
          →
        </span>
      </a>
    </section>
  );
}
