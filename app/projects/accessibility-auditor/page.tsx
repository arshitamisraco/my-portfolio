import type { Metadata } from "next";
import Button from "@/components/Button";
import CaseSection from "@/components/case-study/CaseSection";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import HeroStills from "@/components/case-study/HeroStills";
import LabeledTiles from "@/components/case-study/LabeledTiles";
import ScanPipeline from "@/components/case-study/ScanPipeline";
import StatCallout from "@/components/case-study/StatCallout";
import CaseVideo from "@/components/CaseVideo";
import ImageFrame from "@/components/ImageFrame";

export const metadata: Metadata = {
  title: "AI Accessibility Auditor",
  description:
    "Paste a URL and get every WCAG violation explained in plain language, with the corrected HTML to paste back. I planned it, designed it and shipped it in a day with Claude Code, then built an eval harness to check the fixes actually work.",
};

/** Every media path and its intrinsic size, in one place. */
const MEDIA = {
  scan: {
    src: "/videos/accessibility-auditor/scan.mp4",
    poster: "/images/accessibility-auditor/posters/scan.jpg",
    width: 1440,
    height: 900,
  },
  fix: {
    src: "/videos/accessibility-auditor/fix.mp4",
    poster: "/images/accessibility-auditor/posters/fix.jpg",
    width: 1440,
    height: 900,
  },
  compare: {
    src: "/videos/accessibility-auditor/compare.mp4",
    poster: "/images/accessibility-auditor/posters/compare.jpg",
    width: 1440,
    height: 900,
  },
  home: { src: "/images/accessibility-auditor/home.png", width: 1440, height: 900 }, // TODO(dims)
  issue: { src: "/images/accessibility-auditor/issue.png", width: 1440, height: 900 }, // TODO(dims)
  compareShot: { src: "/images/accessibility-auditor/compare.png", width: 1440, height: 900 }, // TODO(dims)
  history: { src: "/images/accessibility-auditor/history.png", width: 1440, height: 900 }, // TODO(dims)
  badges: { src: "/images/accessibility-auditor/badges.png", width: 1440, height: 900 }, // TODO(dims)
  hero: { src: "/images/accessibility-auditor/hero.png", width: 1440, height: 900 }, // TODO(dims)
} as const;

export default function AccessibilityAuditor() {
  return (
    <CaseStudyLayout
      slug="accessibility-auditor"
      eyebrow="AI Accessibility Auditor · Case study"
      title="An accessibility auditor that writes the fix"
      summary="Paste a URL. The app runs axe-core in headless Chromium, keeps every WCAG violation, and asks Claude to explain each one and hand back corrected HTML. Scan again later and it tells you what got fixed."
      highlight={{
        stat: "From URL to corrected HTML in one pipeline, built and deployed in a day",
      }}
      meta={[
        { label: "Role", value: "Product design · Full-stack build · Agent orchestration" },
        { label: "Type", value: "Full stack product" },
        { label: "Timeline", value: "1 day · October 2026" },
        {
          label: "Stack",
          value: "Next.js 16 · axe-core · Playwright · Claude · Neon Postgres · Inngest",
        },
      ]}
      hero={
        <HeroStills
          ariaLabel="A first look at the AI Accessibility Auditor"
          rows={[
            [
              {
                kind: "video",
                src: MEDIA.scan.src,
                poster: MEDIA.scan.poster,
                width: MEDIA.scan.width,
                height: MEDIA.scan.height,
                title: "Scanning a page",
                description:
                  "A URL is submitted from the scan form. The results page shows Queued, then Running, then the completed summary and the list of issues.",
                tone: "butter",
              },
              [
                {
                  src: MEDIA.issue.src,
                  width: MEDIA.issue.width,
                  height: MEDIA.issue.height,
                  alt: "One issue with Claude's explanation, a fix summary and the corrected HTML.",
                  tone: "sky",
                },
                {
                  src: MEDIA.badges.src,
                  width: MEDIA.badges.width,
                  height: MEDIA.badges.height,
                  alt: "Summary stats and impact badges for a scan.",
                  tone: "mint",
                },
              ],
            ],
          ]}
        />
      }
    >
      <CaseSection
        id="problem"
        eyebrow="The problem"
        title="Audit reports say what's broken. Not how to fix it."
      >
        <p>
          axe finds the violation and points at a selector. A developer who is new to
          accessibility still has to work out who it hurts and what to type.
        </p>
        <LabeledTiles
          columns={3}
          tiles={[
            {
              label: "image-alt",
              detail: "Images must have alternative text. It doesn't say what to write.",
            },
            {
              label: "color-contrast",
              detail: "The ratio is too low. It doesn't say which colour to pick.",
            },
            {
              label: "label",
              detail: "Form fields need a label. It doesn't show the markup.",
            },
          ]}
        />
      </CaseSection>

      <CaseSection id="scan" eyebrow="Scan" title="Paste a URL. Watch it run.">
        <p>
          The scan is queued, Chromium loads the page, axe runs, and the page updates itself until
          the results land.
        </p>
        <CaseVideo
          src={MEDIA.scan.src}
          poster={MEDIA.scan.poster}
          width={MEDIA.scan.width}
          height={MEDIA.scan.height}
          title="Running a scan"
          description="A URL is typed into the scan form. The results page shows Queued, then Running, then the completed summary and the list of issues."
          caption="Queued, running, done. The page polls until the results arrive."
          tone="butter"
        />
      </CaseSection>

      <CaseSection
        id="fix"
        eyebrow="The fix"
        title="Every issue explained, with the HTML to paste."
      >
        <p>
          Claude gets one violation at a time: the rule, the failing element and axe&rsquo;s
          failure summary. It has to answer in a fixed shape.
        </p>
        <LabeledTiles
          columns={3}
          tiles={[
            {
              label: "explanation",
              detail: "Two to four plain sentences: what's wrong and who it affects.",
            },
            { label: "fixSummary", detail: "One sentence." },
            {
              label: "fixCode",
              detail: "The corrected element only. Valid HTML, no fences, no commentary.",
            },
          ]}
        />
        <CaseVideo
          src={MEDIA.fix.src}
          poster={MEDIA.fix.poster}
          width={MEDIA.fix.width}
          height={MEDIA.fix.height}
          title="Copying a fix"
          description="The results page scrolls to an issue. Claude's explanation, a fix summary and the corrected HTML are shown, and the Copy button is pressed."
          caption="Why it matters, the fix in a sentence, and the element to paste."
          tone="sky"
        />
        <StatCallout>
          Most severe first, capped per scan. Without an API key the scan still completes and the
          issue is marked skipped.
        </StatCallout>
      </CaseSection>

      <CaseSection id="compare" eyebrow="Over time" title="Scan it again. See what changed.">
        <p>
          Each site keeps its history. Compare two scans and every issue sorts into fixed, new or
          persisting, keyed by rule and selector.
        </p>
        <CaseVideo
          src={MEDIA.compare.src}
          poster={MEDIA.compare.poster}
          width={MEDIA.compare.width}
          height={MEDIA.compare.height}
          title="Comparing two scans"
          description="From a site's history, two scans are compared. Issues are grouped under Fixed, New and Persisting."
          caption="Fixed, new, persisting."
          tone="mint"
        />
        <div className="my-8 grid items-start gap-4 sm:grid-cols-2">
          <ImageFrame
            src={MEDIA.history.src}
            width={MEDIA.history.width}
            height={MEDIA.history.height}
            alt="A site's scan history: each scan with its status, violation count and date"
            caption="History."
            flush
            tone="lavender"
          />
          <ImageFrame
            src={MEDIA.compareShot.src}
            width={MEDIA.compareShot.width}
            height={MEDIA.compareShot.height}
            alt="The compare page: counts for fixed, new and persisting, then each group's issues"
            caption="Compare."
            flush
            tone="butter"
          />
        </div>
      </CaseSection>

      <CaseSection
        id="pipeline"
        eyebrow="Under the hood"
        title="One request, five steps, nothing blocking the browser."
      >
        <p>
          The route only queues an event. An Inngest function does the work in retryable steps, so
          a slow page or a flaky model call never times out the request.
        </p>
        <ScanPipeline />
        <LabeledTiles
          columns={3}
          tiles={[
            {
              label: "playwright-core + a serverless Chromium",
              detail: "Full Playwright blows Vercel's 250 MB limit.",
            },
            { label: "Drizzle on Neon Postgres", detail: "Sites, scans, issues." },
            {
              label: "Structured output via Zod",
              detail: "The model's answer is parsed, never regexed.",
            },
            {
              label: "Private URLs rejected",
              detail: "Localhost and private ranges never get scanned in production.",
            },
            {
              label: "Duplicate guard",
              detail: "Submit a site that is already queued or running and you get that scan back.",
            },
            {
              label: "PostHog, hostnames only",
              detail: "Never full URLs or issue HTML.",
            },
          ]}
        />
      </CaseSection>

      <CaseSection
        id="eval"
        eyebrow="Does the fix work?"
        title="I didn't want to take the model's word for it."
      >
        <p>
          An eval harness scans fixture pages, applies every suggested fix to the HTML, and scans
          again. Two numbers come out, and I read them as a floor and a ceiling.
        </p>
        <LabeledTiles
          columns={3}
          tiles={[
            { label: "Strict", detail: "Rule plus selector gone from the re-scan." },
            {
              label: "Lenient",
              detail: "Fewer hits per rule, so a rewritten element still counts.",
            },
            {
              label: "Introduced",
              detail: "New keys after the fix. An upper bound on regressions.",
            },
          ]}
        />
        <StatCallout>
          Each real run appends one row to a tracked CSV, so prompt and model changes show up as a
          trend in git.
        </StatCallout>
      </CaseSection>

      <CaseSection
        id="system"
        eyebrow="The design system"
        title="Bold outlines, flat fills, and a palette that passes its own audit."
      >
        <p>
          Hand-drawn doodles on cream paper, hard offset shadows instead of blur, and every text
          colour checked against WCAG AA before it went in. Status is never colour alone.
        </p>
        <ImageFrame
          src={MEDIA.home.src}
          width={MEDIA.home.width}
          height={MEDIA.home.height}
          alt="The home page: a bold headline with the word fix highlighted in yellow, the scan form, a flat illustration of four people, and three numbered step cards"
          caption="Cream paper, ink outlines, one yellow highlight."
          tone="butter"
        />
        <div className="my-8 grid items-start gap-4 sm:grid-cols-2">
          <ImageFrame
            src={MEDIA.hero.src}
            width={MEDIA.hero.width}
            height={MEDIA.hero.height}
            alt="The hero illustration: four people with disabilities drawn in flat colour with bold outlines"
            caption="The illustration."
            size="sm"
            flush
            tone="pink"
          />
          <ImageFrame
            src={MEDIA.badges.src}
            width={MEDIA.badges.width}
            height={MEDIA.badges.height}
            alt="Summary stats and impact badges; each badge pairs a label with a small shape"
            caption="Badges carry a shape, not just a colour."
            size="sm"
            flush
            tone="sky"
          />
        </div>
        <LabeledTiles
          columns={3}
          tiles={[
            { label: "Fredoka and Nunito" },
            { label: "2px ink outline, everywhere" },
            { label: "Offset shadow, no blur" },
            { label: "AA ratio listed per token" },
            { label: "Badge = label + glyph" },
            { label: "Reduced motion in MotionConfig and CSS" },
          ]}
        />
      </CaseSection>

      <CaseSection
        id="build"
        eyebrow="How I built it"
        title="A plan, four phases, and a design spec before a redesign."
      >
        <p>
          I wrote the build plan and made the calls that mattered: the browser that fits on
          Vercel, the database, the queue, no auth for v1. Claude Code built each phase while I
          reviewed, fixed the deploy, and wrote the design spec the redesign was built from.
        </p>
        <LabeledTiles
          columns={2}
          tiles={[
            {
              label: "Phase 1",
              detail: "URL scan pipeline: axe-core, Inngest, Claude explanations.",
            },
            { label: "Phase 2", detail: "Scan history, re-scan, and comparison." },
            { label: "Phase 3 and 4", detail: "Eval harness, analytics, deploy." },
            {
              label: "Redesign",
              detail: "Tokens and a spec first, then primitives, then every page.",
            },
          ]}
        />
      </CaseSection>

      <CaseSection id="next" eyebrow="What I'd do next" title="Three things, in order.">
        <LabeledTiles
          columns={3}
          tiles={[
            {
              label: "Show the model the page",
              detail:
                "It only sees the failing element, so heading order and landmark rules score low.",
            },
            {
              label: "Run the eval in CI",
              detail: "The harness exists. It should block a prompt change that makes fixes worse.",
            },
            {
              label: "Fix the whole file",
              detail: "The applier already rewrites HTML in the harness. Put it in the product.",
            },
          ]}
        />
      </CaseSection>

      <CaseSection id="links" eyebrow="See it" title="It's live.">
        <div className="my-6 flex flex-wrap gap-3">
          <Button href="https://wcag-liard.vercel.app" external>
            Open the app
          </Button>
          <Button href="https://github.com/arshitamisraco/wcag" external variant="secondary">
            Read the code
          </Button>
        </div>
      </CaseSection>
    </CaseStudyLayout>
  );
}
