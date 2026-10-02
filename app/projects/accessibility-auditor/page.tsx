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
    "Paste a URL and get every WCAG violation explained, with corrected HTML. Planned, designed and shipped in a day with Claude Code.",
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
  home: { src: "/images/accessibility-auditor/home.png", width: 2880, height: 3282 },
  issue: { src: "/images/accessibility-auditor/issue.png", width: 2264, height: 1324 },
  history: { src: "/images/accessibility-auditor/history.png", width: 2272, height: 618 },
  badges: { src: "/images/accessibility-auditor/badges.png", width: 2272, height: 660 },
  hero: { src: "/images/accessibility-auditor/hero.png", width: 992, height: 702 },
} as const;

export default function AccessibilityAuditor() {
  return (
    <CaseStudyLayout
      slug="accessibility-auditor"
      eyebrow="AI Accessibility Auditor · Case study"
      title="An accessibility auditor that writes the fix"
      summary="Paste a URL. axe-core finds every WCAG violation and Claude explains each one with corrected HTML."
      stats={[
        { value: "1 day", label: "from brief to deployed" },
        { value: "5", label: "pipeline steps" },
        { value: "0", label: "violations on its own pages" },
      ]}
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
                  "A URL is submitted. The results page shows Queued, Running, then the issue list.",
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
      <CaseSection id="problem" eyebrow="The problem" title="Audit reports that write the fix">
        <p>
          axe points at a selector. Developers still have to work out who it hurts and what to type.
        </p>
      </CaseSection>

      <CaseSection id="scan" eyebrow="Scan" title="Paste a URL and watch it run">
        <CaseVideo
          src={MEDIA.scan.src}
          poster={MEDIA.scan.poster}
          width={MEDIA.scan.width}
          height={MEDIA.scan.height}
          title="Running a scan"
          description="A URL is typed in. The results page shows Queued, Running, then the issue list."
          caption="Queued, running, done."
          tone="butter"
        />
      </CaseSection>

      <CaseSection id="fix" eyebrow="The fix" title="Every issue explained, with HTML to paste">
        <CaseVideo
          src={MEDIA.fix.src}
          poster={MEDIA.fix.poster}
          width={MEDIA.fix.width}
          height={MEDIA.fix.height}
          title="Copying a fix"
          description="An issue shows Claude's explanation, a fix summary and corrected HTML, and Copy is pressed."
          caption="Why it matters, the fix, the element to paste."
          tone="sky"
        />
        <p>
          Claude gets one violation at a time and answers in a Zod-checked shape.
        </p>
        <p>
          Most severe issues come first, capped per scan. Without an API key the scan still completes.
        </p>
      </CaseSection>

      <CaseSection id="compare" eyebrow="Over time" title="Scan again and see what changed">
        <CaseVideo
          src={MEDIA.compare.src}
          poster={MEDIA.compare.poster}
          width={MEDIA.compare.width}
          height={MEDIA.compare.height}
          title="Comparing two scans"
          description="Two scans are compared, with issues grouped under Fixed, New and Persisting."
          caption="Fixed, new, persisting."
          tone="mint"
        />
        <ImageFrame
          src={MEDIA.history.src}
          width={MEDIA.history.width}
          height={MEDIA.history.height}
          alt="A site's scan history with status, violation count, impact badges and a Compare link"
          caption="Every site keeps its history."
          tone="lavender"
        />
              </CaseSection>

      <CaseSection id="pipeline" eyebrow="Under the hood" title="Five steps behind one request">
        <ScanPipeline />
        <p>
          The route queues an event. An Inngest function runs retryable steps, so slow pages cannot time out the request.
        </p>
        <LabeledTiles
          tiles={[
            {
              label: "playwright-core + serverless Chromium",
              detail: "Full Playwright blows Vercel's 250 MB limit.",
            },
            { label: "Drizzle on Neon Postgres", detail: "Sites, scans, issues." },
            { label: "Private URLs rejected", detail: "Blocked in production." },
            { label: "Duplicate guard", detail: "A queued site returns that scan." },
          ]}
        />
      </CaseSection>

      <CaseSection id="eval" eyebrow="Does the fix work?" title="I tested whether the fixes actually work">
        <p>
          An eval harness scans fixture pages, applies every fix, and scans again. Each run appends a row to a tracked CSV.
        </p>
        <LabeledTiles
          tiles={[
            { label: "Strict", detail: "Rule plus selector gone from the re-scan." },
            { label: "Lenient", detail: "Fewer hits per rule, so rewritten elements count." },
            { label: "Introduced", detail: "New keys after the fix, an upper bound on regressions." },
          ]}
        />
      </CaseSection>

      <CaseSection id="system" eyebrow="The design system" title="A palette that passes its own audit">
        <StatCallout value="0" label="violations when I ran the auditor on itself" />
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
            caption="Each badge pairs a shape with its colour."
            size="sm"
            flush
            tone="sky"
          />
        </div>
        <p>
          Doodles on cream paper, 2px ink outlines, hard offset shadows, every text colour checked against WCAG AA.
        </p>
      </CaseSection>

      <CaseSection id="build" eyebrow="How I built it" title="A plan, four phases, a design spec">
        <p>
          I wrote the build plan and made the calls: the browser that fits on Vercel, the database, the queue, no auth for v1. Claude Code built each phase while I reviewed.
        </p>
        <p>
          Phases: scan pipeline, history, eval harness, analytics and deploy. I wrote the design spec for the redesign.
        </p>
      </CaseSection>

      <CaseSection id="links" eyebrow="See it" title="It's live">
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
