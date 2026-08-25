# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary — hiring managers and design leads** at AI/product companies, evaluating Arshita for a full-time product design role. They arrive from a résumé, a referral, or a LinkedIn link, usually mid-screen with several candidates open. They skim first and read second: they need to establish scope of ownership, evidence of shipped work, and whether the craft holds up, in under a minute.

**Primary — founders and early-stage/eng leaders** hiring a founding or early designer. Same skim behavior, different question: can this person operate across the whole system — research, product, UI, brand, and implementation — and ship without a full team behind them.

Both audiences arrive skeptical of portfolio polish and are looking for the load-bearing facts: what she actually owned, what actually shipped, and what changed as a result.

Secondary audiences (peer designers reading for craft, freelance clients) are welcome but do not set priorities.

## Product Purpose

The personal portfolio and professional site of Arshita Misra, product designer — live at **arshita.co**.

Its job right now is to convert an evaluating visitor into an interview. Success is a concrete outbound action: a case study read to the end, the résumé opened or downloaded, or the contact form sent. The site is optimized for an active job search, so recency, evidence, and legibility of ownership outrank breadth.

## Positioning

**"A product designer who engineers."** Not a designer who hands off, and not an engineer who designs — someone who owns a feature from research through interface through the prompts and code that make it real. The case studies are the proof of the claim, not a decoration on it: the work spans information architecture, UI, design systems, brand, LLM prompt design, and co-implementation.

The second, narrower claim: **founding designer at an AI company**, doing human-centered AI in production — the 0→1 range and the cross-system ownership that only early-stage work produces.

## Operating Context

- The site is the endpoint of an outbound job search: résumé → link, referral → link, LinkedIn → link. Most visits are short, single-session, and often on a phone between meetings.
- Evaluation is comparative. The visitor is holding this site next to other portfolios and will leave the moment the work stops being legible.
- The COROS AI work is ongoing and shipping incrementally, so parts of the site describe live, moving work rather than a finished archive. "In progress" is a real state the site must be able to represent honestly (`inProgress` on the My World case study).
- Content and structure are authored directly in TSX pages, not in a CMS. Case-study source drafts live in `content/*.md`; raw capture material lives in `content/images/` and `content/videos/`, and only the processed, web-safe subset is promoted into `public/`.

## Capabilities and Constraints

**Stack.** Next.js 15 App Router, React 19, TypeScript (strict), Tailwind CSS v4, Framer Motion. Deployed on Vercel. No CMS, no database, no auth.

**Design tokens are single-source and binding.** Every color, type scale, radius, and section rhythm value is defined in `app/globals.css` under `@theme`; Tailwind's default palette is deliberately wiped (`--color-*: initial`). Raw hex values must not appear anywhere outside that file. Raw palette tokens feed semantic tokens (`--color-accent`, `--color-ink`, `--color-surface`…) and components consume only the semantic layer. `/styleguide` renders the system for visual verification.

**Accessibility floor is non-negotiable.** WCAG AA contrast throughout, and `prefers-reduced-motion` fallbacks on every animation (cloud drift, marquee, scroll cue, reveal). Documented rule in `globals.css`: `--color-accent` (pink-400) is a decorative tint that fails contrast and must never be used for link or body text — use `--color-accent-strong` / `--color-accent-deep`. Skip-to-content link, visible focus rings, semantic landmarks, and labelled sections are already in place and must survive any redesign.

**Domain and URL contract.** Canonical domain `arshita.co` (`metadataBase`). Legacy `/work/coros-ai` and `/work/coros-ai/:slug` URLs permanently redirect to `/coros-ai` and `/projects/:slug`; those redirects must keep working.

**Résumé pipeline.** `/resume-print` is a print-targeted route rendered to `public/documents/Arshita-Misra-Resume.pdf` by `npm run resume:pdf` (headless Chrome, own dev server on :3199). The hosted "View PDF" link is a Google Drive share URL in `lib/resume.ts`. This flow must keep working end to end.

**Contact.** Form posts to Web3Forms — no backend. The public access key and destination inbox live in `lib/contact.ts`; a `mailto:` fallback is always live so the page degrades gracefully if the form is disabled.

**Local dev quirk.** `next dev` writes to `.next.nosync` instead of `.next` (see `next.config.ts`) — a workaround for iCloud file eviction corrupting the build directory. Production builds on Vercel use `.next`.

**COROS AI material is publishable.** Confirmed — no confidentiality restriction applies to COROS AI screens, metrics, or product details, so future work may add COROS material without asking permission first. This is a clearance to publish, not a licence to invent: anything added must come from a real artifact in the repo or from the user. See Evidence on Hand for what actually exists.

## Brand Commitments

- **Name and voice.** First-person, warm, direct, unpolished on purpose. Existing copy sets the register: "I'm so glad you're here! I'm Arshita." / "I'd rather show you the real work than a prettier version of it." Confidence without corporate gloss; no growth-marketing tone.
- **The pixel cloud** is the site's signature motif — a soft pixel-art cloud used as ambient hero sky, section marker, and the dot of the "i" in "Arshita Misra" on hover (`components/PixelCloud.tsx`, `CloudI` in `app/page.tsx`). It is the identity, not decoration.
- **Type pairing.** Playfair Display (serif, display/headings) + Inter (sans, body/UI), loaded via `next/font/google` as `--font-display` / `--font-sans`.
- **Palette.** Pink-forward warm neutrals (`pink-50` ground, `pink-400/600/700` accents) with a supporting soft-pastel set — lavender, sky, mint, butter, peach — each paired with an AA-deep counterpart. Tones are assigned per case study (`ChipTone`) for consistent color identity across cards, chips, and frames.
- **COROS AI** is a real employer with its own logo and brand guide (`public/images/logos/coros-ai.png`, `public/documents/coros-brand-guide.pdf`); its identity is referenced, never restyled.

## Evidence on Hand

**Three real COROS AI case studies**, all first-hand work:
- `/projects/design-system` — MUI → shadcn rebuild across web, iOS, and Android. Stated: live in production on all three platforms, 54+ components, design-system ownership.
- `/projects/founding-design` — 0→1 onboarding and AI personality system, plus brand identity. Stated: 3 flagship features shipped 0→1. June 2025 – present.
- `/projects/my-world` — AI memory feature; IA, widget design, and the LLM prompts behind every card. April 2026 – present, in progress, shipping incrementally.

**Supporting assets:** real product screenshots and screen recordings under `public/images/` and `public/videos/` (with posters); the COROS carousel set; the résumé PDF and COROS brand guide under `public/documents/`; personal/timeline photography under `public/images/about/`; UW Human Centered Design & Engineering degree (June 2025), a switch-accessible tablet app co-designed with kids, and a scalable virtual-museum capstone.

**Absences future work must not fabricate:** no testimonials, no press, no named clients, no user-research quotes beyond what is already written, and no quantitative outcome metrics beyond the ones already stated on the case-study pages. If a number is not already in the repo, it does not exist.

## Product Principles

1. **Evidence over assertion.** Every claim on the site is backed by a shipped artifact, a real screenshot, or a stated scope of ownership. Nothing gets asserted that the case studies do not demonstrate.
2. **Legible in a skim, rewarding in a read.** The primary visitor decides in under a minute, so scope, role, and outcome must be extractable at a glance — while the full case study still holds up for someone who reads it end to end.
3. **The craft is the argument.** For a designer-who-engineers, the site's own implementation quality is a portfolio piece. Token discipline, accessibility, and motion restraint are evidence, not overhead.
4. **Honest about in-flight work.** Ongoing work is shown as ongoing. "In progress" is stated plainly rather than smoothed into a finished-looking narrative.
5. **One system, no one-offs.** New surfaces compose from the existing token set and component vocabulary. A page that needs a new color or a new primitive changes the system, not just itself.

## Accessibility & Inclusion

WCAG AA is the required standard and is already met: AA-passing contrast for all text (with the documented ban on `--color-accent` for text), visible focus-visible outlines, a skip-to-content link, semantic landmarks and labelled sections, and `prefers-reduced-motion` honored across every animation — clouds rest in place, the marquee stops, video falls back to poster + click-to-play. Autoplaying video is muted and in-view only.

This is also a product commitment, not just compliance: accessible design is part of the work being shown (switch-accessible tablet app, HCDE background), so the site failing it would contradict the portfolio.
