import type { Metadata } from "next";
import CaseSection from "@/components/case-study/CaseSection";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import HeroStills from "@/components/case-study/HeroStills";
import ProductIntro from "@/components/case-study/ProductIntro";
import CaseVideo from "@/components/CaseVideo";
import ImageFrame from "@/components/ImageFrame";
import PullQuote from "@/components/PullQuote";
import ReviewLoop from "@/components/case-study/ReviewLoop";
import JourneyMap from "@/components/case-study/JourneyMap";
import ScreenStory from "@/components/case-study/ScreenStory";

export const metadata: Metadata = {
  title: "Designing an AI That Remembers You",
  description:
    "One page that reflects a user's coaching history back to them, designed end to end: the architecture, the interface, and the prompts behind every card.",
};

export default function MyWorld() {
  return (
    <CaseStudyLayout
      slug="my-world"
      eyebrow="COROS AI · Case Study"
      title="Designing an AI that remembers you"
      summary="My World is the page in COROS AI that remembers your coaching: the situations you keep coming back to, your breakthroughs, and what you said you’d do. I designed it end to end, from how memory is structured to the interface and the prompts that write every card, and built parts of it in code."
      stats={[
        { value: "25", label: "customer interviews" },
        { value: "20", label: "transcripts per eval batch" },
        { value: "5", label: "must-fix issues caught in one run" },
      ]}
      meta={[
        { label: "Role", value: "Product Designer · Prompt engineering · Front-end" },
        { label: "Team", value: "Founder/CEO · 2 engineers · 2 designers" },
        { label: "Timeline", value: "April – August 2026, shipped incrementally" },
        { label: "Tools", value: "Figma · Claude Code · Streamlit · TypeScript, React on Next.js" },
      ]}
      productIntro={<ProductIntro />}
      hero={
        <HeroStills
          ariaLabel="A first look at My World"
          fullBleed
          rows={[
            [
              {
                kind: "video",
                src: "/videos/my-world/reminders-widget.mp4",
                poster: "/images/my-world/posters/reminders-widget.jpg",
                width: 1440,
                height: 438,
                title: "Reminders widget",
                description: "A checklist of commitments from past sessions.",
              },
              {
                kind: "video",
                src: "/videos/my-world/breakthrough-widget.mp4",
                poster: "/images/my-world/posters/breakthrough-widget.jpg",
                width: 1322,
                height: 528,
                title: "Breakthroughs widget",
                description: "A donut of 26 breakthroughs by dimension, beside the latest quote.",
              },
              {
                src: "/images/my-world/hero/hero-provocation.png",
                width: 1404,
                height: 528,
                alt: "The Coaching Provocation card: 'Identity is built, not discovered,' ending in a question to the user.",
              },
            ],
            [
              {
                src: "/images/my-world/hero/hero-session.jpg",
                width: 1600,
                height: 998,
                alt: "A session detail page with summary, entry and exit moods, reminders, and a breakthrough quote.",
              },
              {
                src: "/images/my-world/hero/hero-page.jpg",
                width: 1600,
                height: 998,
                alt: "The My World page: a featured band with the breakthroughs donut, a quote, and provocation cards above the Reminders widget.",
              },
            ],
          ]}
        />
      }
    >
      <CaseSection
        id="problem"
        eyebrow="The problem"
        title="The coaching landed, then it disappeared."
      >
        <p>
          Across 25 customer interviews, users said the coaching helped and the product gave them no
          way to see it afterwards.
        </p>
        <PullQuote>
          &ldquo;I had a difficult relationship with one of my nephews. From COROS, I had
          breakthroughs there. I can&rsquo;t find them anymore.&rdquo;
        </PullQuote>
        <PullQuote>
          &ldquo;If I could separate work and relationship conversations into different threads,
          that would be really useful.&rdquo;
        </PullQuote>
        <p>What they wanted was a place to find the coaching they&rsquo;d already had.</p>
      </CaseSection>

      <CaseSection
        id="journey-map"
        eyebrow="First interaction to last"
        title="From the end of one session to the start of the next."
      >
        <p>
          My World sits between coaching sessions. Each section below starts with where it sits on
          this line.
        </p>
        <JourneyMap
          stages={[
            {
              id: "session-ends",
              label: "A session ends",
              detail: "The AI writes down what happened",
            },
            {
              id: "topics",
              label: "Sessions become topics",
              detail: "Grouped by situation",
            },
            {
              id: "open",
              label: "Open My World",
              detail: "Everything at a glance",
            },
            {
              id: "look-back",
              label: "Look back",
              detail: "Breakthroughs by life dimension",
            },
            {
              id: "follow-through",
              label: "Follow through",
              detail: "Reminders you can check off",
            },
            {
              id: "go-deeper",
              label: "Go deeper",
              detail: "A question that opens the next session",
            },
          ]}
        />
      </CaseSection>

      <CaseSection
        id="approach"
        eyebrow="Approach"
        title="A shape for memory first, then the screens."
      >
        <p>
          Before drawing anything, I gave conversations a structure the AI and the user could share:
        </p>
        <ul>
          <li>
            <strong>Session:</strong> one bounded conversation about one situation.
          </li>
          <li>
            <strong>Topic:</strong> the recurring situation many sessions belong to.
          </li>
          <li>
            <strong>My World:</strong> where topics, breakthroughs, provocations and open
            commitments live.
          </li>
        </ul>
        <p>Every screen below is a view onto those three things.</p>
      </CaseSection>

      <CaseSection
        id="session-ends"
        title="When a session ends, the AI writes down what happened."
        journey={{ step: 1, of: 6, label: "A session ends" }}
      >
        <ScreenStory
          tone="lavender"
          problem="Breakthroughs got buried in the transcript once a session ended."
          approach="Turn every session into a record the user can scan."
          fix="A session page written by a prompt that can only reflect what the user said or agreed to."
          result="Every session is findable, and every card is true to the user."
          media={
            <ImageFrame
              src="/images/my-world/hero/hero-session.jpg"
              width={1600}
              height={998}
              alt="A session detail page ('Exploring Visa Paths and Defining Your AI Offer') with summary, entry and exit moods, reminders, and a breakthrough quote."
              tone="lavender"
              flush
            />
          }
        />
      </CaseSection>

      <CaseSection
        id="topics"
        title="Sessions group into topics, named after situations."
        journey={{ step: 2, of: 6, label: "Sessions become topics" }}
      >
        <ScreenStory
          tone="lavender"
          problem="Work and relationship conversations sat in one undivided history."
          approach={<>Group sessions by the situation they&rsquo;re about.</>}
          fix={<>Topics are named after situations, never feelings: &ldquo;Conversation with dad&rdquo;, not &ldquo;Self-worth&rdquo;.</>}
          result="That rule now governs topic detection."
          media={
            <CaseVideo
              src="/videos/my-world/topic-to-session.mp4"
              poster="/images/my-world/posters/topic-to-session.jpg"
              width={1440}
              height={900}
              title="Navigating from a topic into a session"
              description="Opening a topic from My World: the territory view with its summary, moods, and session list, then clicking through to a single session's detail page with commitments and a breakthrough."
              tone="lavender"
              flush
            />
          }
        />
      </CaseSection>

      <CaseSection
        id="open"
        title="The page became widgets you scan instead of a table you read."
        journey={{ step: 3, of: 6, label: "Open My World" }}
      >
        <ScreenStory
          tone="lavender"
          before={{
            src: "/images/my-world/topics-page-before.png",
            width: 1440,
            height: 1024,
            alt: "An early version of the topics page: a dense, spreadsheet-like list with heavy metadata, closer to a CRM than a coaching tool.",
            caption: "Before: topics as a dense table, closer to a CRM.",
          }}
          problem="Early designs listed topics like a CRM, to be read row by row."
          approach="Make every block a widget you can scan."
          fix="Featured cards, then reminders, then topic cards filtered by life dimension."
          result="The bento layout replaced the table."
          media={
            <CaseVideo
              src="/videos/my-world/page-tour.mp4"
              poster="/images/my-world/posters/page-tour.jpg"
              width={1440}
              height={900}
              title="My World, top to bottom"
              description="A tour of the page: the featured band of reflective cards above the reminders widget and the stacked topics list."
              tone="lavender"
              flush
            />
          }
        />
      </CaseSection>

      <CaseSection
        id="look-back"
        title="Two breakthrough widgets became one."
        journey={{ step: 4, of: 6, label: "Look back" }}
      >
        <ScreenStory
          tone="lavender"
          where={{
            src: "/images/my-world/hero/hero-page.jpg",
            width: 1600,
            height: 998,
            alt: "The My World page with the featured band highlighted.",
            region: { x: 6.9, y: 17.7, w: 51.8, h: 33.1 },
            label: "Top band, left",
          }}
          problem="The breakthrough donut was about to be cut."
          approach="Merge it with the Latest Breakthrough card, so the donut becomes how you browse."
          fix="One widget, two modes: browse everything, or click a segment to filter."
          result="The donut stayed, with every edge case specced before handoff."
          media={
            <CaseVideo
              src="/videos/my-world/breakthrough-widget.mp4"
              poster="/images/my-world/posters/breakthrough-widget.jpg"
              width={1322}
              height={528}
              title="The combined breakthrough widget"
              description="The two-mode state machine in action: Mode A walking the full history, then a segment click entering Mode B with the donut's live selection following auto-advance across dimension boundaries."
              tone="lavender"
              flush
            />
          }
        />
      </CaseSection>

      <CaseSection
        id="follow-through"
        title="Every commitment from every session, in one checklist."
        journey={{ step: 5, of: 6, label: "Follow through" }}
      >
        <ScreenStory
          tone="lavender"
          where={{
            src: "/images/my-world/hero/hero-page.jpg",
            width: 1600,
            height: 998,
            alt: "The My World page with the Reminders widget highlighted.",
            region: { x: 6.9, y: 52.6, w: 90.1, h: 43.3 },
            label: "Below the top band",
          }}
          problem="Commitments made in a session stayed in that session."
          approach="Pool every reminder into one checklist."
          fix="Check one off for confetti; uncheck it and it returns to its place."
          result={<>One list of everything the user said they&rsquo;d do.</>}
          media={
            <CaseVideo
              src="/videos/my-world/reminders-widget.mp4"
              poster="/images/my-world/posters/reminders-widget.jpg"
              width={1440}
              height={438}
              title="Reminders widget interactions"
              description="Checking off a reminder in the widget: the row completes with a burst of confetti."
              tone="lavender"
              flush
            />
          }
        />
      </CaseSection>

      <CaseSection
        id="go-deeper"
        title="The page ends with a question that leads back into coaching."
        journey={{ step: 6, of: 6, label: "Go deeper" }}
      >
        <ScreenStory
          tone="lavender"
          where={{
            src: "/images/my-world/hero/hero-page.jpg",
            width: 1600,
            height: 998,
            alt: "The My World page with the Coaching Provocation cards highlighted.",
            region: { x: 59.8, y: 17.7, w: 37.2, h: 33.1 },
            label: "Top band, right",
          }}
          problem="A memory page can become a dashboard you check once."
          approach="End the page on a question."
          fix="A Coaching Provocation drawn from recent sessions, with a Revisit action."
          result="The last thing on the page starts the next session."
          media={
            <ImageFrame
              src="/images/my-world/coaching-provocation.png"
              width={1404}
              height={528}
              alt="The Coaching Provocation widget: 'Identity is built, not discovered,' a synthesis across recent sessions that ends in a question and a Revisit action."
              tone="lavender"
              flush
            />
          }
        />
      </CaseSection>

      <CaseSection
        id="transcript-review"
        eyebrow="Behind every card"
        title="I test every prompt against real transcripts."
      >
        <ScreenStory
          tone="lavender"
          problem="One wrong card and the user stops trusting the page."
          approach="Score every prompt against the same 20 real transcripts."
          fix="Fix each failure with one added clause, then re-run the batch."
          result="One run found five must-fix issues; five clauses fixed them."
          media={<ReviewLoop />}
        />
        <p className="mt-6 text-caption text-ink-muted">
          User conversations are confidential, so examples on this page are redacted or synthetic.
          The prompts are company IP.
        </p>
      </CaseSection>

      <CaseSection
        id="implementation"
        eyebrow="Co-implementation"
        title="I built parts of it myself."
      >
        <p>
          I wrote production front-end in TypeScript and React on Next.js.
        </p>
      </CaseSection>

      <CaseSection id="results" eyebrow="Results" title="Where it stands.">
        <p>
          I wrote the spec engineers build from, the prompts that generate the content, the QA loop
          that checks them, and parts of the code.
        </p>
        <PullQuote>
          At a pre-seed startup, the most valuable designer is the one who removes handoffs.
        </PullQuote>
      </CaseSection>
      {process.env.NODE_ENV === "development" && (
        <CaseSection
          id="open-questions"
          eyebrow="Open questions (dev only)"
          title="To confirm before publishing"
        >
          <ol>
            <li>&ldquo;Topic is a situation&rdquo;: who disagreed, what settled it?</li>
            <li>Table to bento: how many passes, what changed minds?</li>
            <li>Why was the donut about to be cut?</li>
            <li>Have reminders shipped; any use signal?</li>
            <li>Does Revisit open a new session?</li>
            <li>Which components did you build in code, and what did building change in the spec?</li>
            <li>What is live today; any usage number?</li>
          </ol>
        </CaseSection>
      )}
    </CaseStudyLayout>
  );
}
