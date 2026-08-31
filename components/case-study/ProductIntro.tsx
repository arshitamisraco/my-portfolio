/**
 * "The product" primer shown at the top of every COROS AI case study, above the
 * visual preview. Same copy across all three studies, plus a link into the live app.
 */
export default function ProductIntro() {
  return (
    <section aria-labelledby="the-product-title" className="mb-14 border-b border-line pb-12">
      <p className="text-style-eyebrow text-accent-deep">The product</p>
      <h2
        id="the-product-title"
        className="mt-3 font-display text-h2 font-semibold text-ink"
      >
        COROS AI: an AI life coach that helps you navigate relationships and
        communication.
      </h2>
      <div className="case-prose mt-6">
        <p>
          It is a B2C AI-native coaching platform with a chat-based interface, where
          people have long, ongoing conversations by text and voice. I joined as the
          founding product designer, and my work has spanned product design, UX, prompt
          engineering, user research, and brand.
        </p>
      </div>
      <a
        href="https://app.coros.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-6 inline-flex shrink-0 items-center gap-2 rounded-frame border border-line px-4 py-2 text-caption font-medium text-accent-deep transition-all duration-300 hover:border-accent hover:bg-surface-raised"
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
