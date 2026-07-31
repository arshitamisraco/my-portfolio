import type { Metadata } from "next";
import CaseSection from "@/components/case-study/CaseSection";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import HeroStills from "@/components/case-study/HeroStills";
import CaseVideo from "@/components/CaseVideo";
import ImageFrame from "@/components/ImageFrame";
import PullQuote from "@/components/PullQuote";

export const metadata: Metadata = {
  title: "Designing an AI That Remembers You",
  description:
    "One page that reflects a user's coaching history back to them, designed end to end: the architecture, the interface, and the prompts behind every card.",
};

const TOC = [
  { id: "problem", label: "The problem" },
  { id: "architecture", label: "How the AI organizes memory" },
  { id: "interface", label: "The interface" },
  { id: "ai", label: "The prompts" },
  { id: "implementation", label: "From mockups to code" },
  { id: "takeaway", label: "The takeaway" },
];

const STATS = [
  { value: "6", label: "widgets designed and shipping", bg: "bg-lavender-soft" },
  { value: "20+", label: "prompt versions engineered", bg: "bg-sky-soft" },
  {
    value: "One owner",
    label: "architecture → UI → prompts → code",
    bg: "bg-mint-soft",
  },
  { value: "Web + mobile", label: "fully responsive", bg: "bg-butter-soft" },
];

export default function MyWorld() {
  return (
    <CaseStudyLayout
      slug="my-world"
      eyebrow="COROS AI · Case Study"
      title="Designing an AI that remembers you"
      summary="One page that reflects a user's coaching history back to them. Designed end to end: the architecture, the interface, and the prompts behind every card."
      meta={[
        {
          label: "Role",
          value: "Product Designer · Prompt engineering · Co-implementation",
        },
        {
          label: "Team",
          value: "Founder/CEO · 2 engineers · 2 designers",
        },
        {
          label: "Timeline",
          value: "April 2026 – Present (in progress, shipping incrementally)",
        },
        {
          label: "Tools",
          value: "Figma · Claude Code · Streamlit · HTML/CSS/JS",
        },
      ]}
      toc={TOC}
    >
      <HeroStills
        label="A first look at My World"
        ariaLabel="A first look at My World"
        rows={[
          [
            {
              src: "/images/my-world/hero/hero-page.jpg",
              width: 1600,
              height: 998,
              alt: "The My World page: a featured band with the My Breakthroughs donut, Latest Breakthrough, and Coaching Provocation cards above the Reminders widget.",
              tone: "lavender",
            },
            {
              src: "/images/my-world/hero/hero-session.jpg",
              width: 1600,
              height: 999,
              alt: "A session detail page ('Overcoming avoidance to write resume') with summary, entry and exit moods, a commitment, a breakthrough quote, and relationships.",
              tone: "sky",
            },
          ],
          [
            {
              src: "/images/my-world/hero/hero-breakthrough.jpg",
              width: 1318,
              height: 534,
              alt: "The My Breakthroughs donut showing 20 breakthroughs by dimension, beside the latest breakthrough quote.",
              tone: "pink",
            },
            {
              src: "/images/my-world/hero/hero-provocation.png",
              width: 1404,
              height: 528,
              alt: "The Coaching Provocation card: 'Identity is built, not discovered,' ending in a question back to the user.",
              tone: "butter",
            },
          ],
          [
            {
              src: "/images/my-world/hero/hero-reminders.jpg",
              width: 1600,
              height: 375,
              alt: "The Reminders widget mid-celebration: confetti falling as a reminder is checked off.",
              tone: "peach",
            },
          ],
        ]}
      />

      {/* Scope at a glance — a numeric read between the visual hero and the writing. */}
      <section aria-label="At a glance" className="mb-14">
        <p className="text-style-eyebrow text-ink-muted">At a glance</p>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-frame border border-line p-5 ${stat.bg}`}
            >
              <p className="font-display text-h3 font-semibold leading-tight text-ink">
                {stat.value}
              </p>
              <p className="mt-3 text-caption text-ink-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <CaseSection id="problem" eyebrow="The problem" title="Coaching that evaporates">
        <p>
          COROS is an AI life coach. Users have transformative conversations, then
          everything vanishes into chat history.
        </p>
        <p>My World reflects it back. My brief became the team&rsquo;s north star:</p>
        <PullQuote attribution="The design brief, and the team's north star">
          A mirror, not a filing cabinet.
        </PullQuote>
        <p>
          No filters on the page. No scores or streaks. Every card ends in a way back into
          coaching.
        </p>
      </CaseSection>

      <CaseSection
        id="architecture"
        eyebrow="Architecture"
        title="How the AI organizes memory"
      >
        <p>
          A <strong>Session</strong> is an event. A <strong>Topic</strong> is a territory
          the user keeps returning to.
        </p>
        <CaseVideo
          src="/videos/my-world/topic-to-session.mp4"
          poster="/images/my-world/posters/topic-to-session.jpg"
          width={1440}
          height={900}
          title="Navigating from a topic into a session"
          description="Opening a topic from My World: the territory view with its summary, moods, and session list, then clicking through to a single session's detail page with commitments and a breakthrough."
          tone="lavender"
          caption="My World → a topic's territory → one session's detail."
        />
        <p>
          The rule I fought for:{" "}
          <strong>a topic is a situation, never a feeling.</strong> &ldquo;Conversation
          with dad,&rdquo; not &ldquo;Self-worth.&rdquo; It now governs the detection
          pipeline.
        </p>
      </CaseSection>

      <CaseSection id="interface" eyebrow="The interface" title="The interface">
        <h3>The page</h3>
        <CaseVideo
          src="/videos/my-world/page-tour.mp4"
          poster="/images/my-world/posters/page-tour.jpg"
          width={1440}
          height={900}
          title="My World, top to bottom"
          description="A tour of the page: the featured band of reflective cards above the reminders widget and the stacked topics list."
          tone="lavender"
          caption="Featured band, reminders, topics. Filters live inside widgets, never on the page."
        />

        <h3>Two widgets became one</h3>
        <p>
          The breakthrough donut was about to be cut. Instead of defending it, I merged it
          with the Latest Breakthrough card and specced the full state machine.
        </p>
        <CaseVideo
          src="/videos/my-world/breakthrough-widget.mp4"
          poster="/images/my-world/posters/breakthrough-widget.jpg"
          width={1322}
          height={528}
          title="The combined breakthrough widget"
          description="The two-mode state machine in action: Mode A walking the full history, then a segment click entering Mode B with the donut's live selection following auto-advance across dimension boundaries."
          tone="pink"
          caption="Mode A: browse all breakthroughs. Mode B: click a segment to filter by dimension. Auto-advance moves the donut's selection live."
        />
        <ul>
          <li>
            Every edge case resolved before handoff: wrap, backward symmetry, empty
            dimensions.
          </li>
          <li>
            Settled a team debate and delivered cross-filtering without breaking the
            no-page-filters rule.
          </li>
        </ul>

        <h3>Reminders</h3>
        <CaseVideo
          src="/videos/my-world/reminders-widget.mp4"
          poster="/images/my-world/posters/reminders-widget.jpg"
          width={1440}
          height={398}
          title="Reminders widget interactions"
          description="Checking off a reminder in the widget: the row completes with a burst of confetti."
          tone="sky"
          caption="Pooled across all sessions. Done gets confetti. Delete exists because AI can be wrong."
        />
        <ul>
          <li>Unchecking re-inserts at original chronological position.</li>
          <li>
            I flagged the engineering implication (timestamp in shared state) in the spec
            myself.
          </li>
        </ul>

        <h3>Decluttering</h3>
        <CaseVideo
          src="/videos/my-world/topics-by-dimension.mp4"
          poster="/images/my-world/posters/topics-by-dimension.jpg"
          width={1440}
          height={536}
          title="Filtering topics by life dimension"
          description="The topics list narrowing as dimension chips are clicked (All, then Self) with each topic card showing its inline dimension, date, and session count."
          tone="mint"
          caption="Topic surfaces after repeated simplification passes: inline metadata, sticky CTAs, dimension filtering."
        />
      </CaseSection>

      <CaseSection id="ai" eyebrow="The AI" title="The prompts are the product">
        <p>
          Every card&rsquo;s content is LLM-generated from prompts I wrote: session summary
          (v6), topic summary (v7), topic detection, coaching invitation.
        </p>
        <ImageFrame
          src="/images/my-world/coaching-provocation.png"
          width={1404}
          height={528}
          alt="The Coaching Provocation widget: 'Identity is built, not discovered,' a synthesis across recent sessions that ends in a question and a Revisit action."
          tone="butter"
          caption="A provocation synthesized across sessions, ending in a question back to the user."
        />
        <p>
          The stakes: a wrong &ldquo;breakthrough&rdquo; manufactures a false memory. So the
          prompt has an <strong>ownership gate</strong>: it can only reflect what the user
          actually said or agreed to.
        </p>

        <h3>And I test them myself</h3>
        <CaseVideo
          src="/videos/my-world/playground.mp4"
          poster="/images/my-world/posters/playground.jpg"
          width={1440}
          height={936}
          title="The Streamlit QA playground"
          description="A tour of the playground: real session JSON loaded in, the editable prompts, a first-stage freeze, then a run whose results table shows per-session match decisions with similarity scores: 20 sessions, 12 matched, 8 new topics, 0 errored."
          tone="mint"
          caption="The Streamlit playground I built out with the dev team: real transcripts in, editable prompts, structured JSON out."
        />
        <ul>
          <li>
            Method: 20-session batches, every field checked against the prompt&rsquo;s own
            rules.
          </li>
          <li>
            One run surfaced 5 must-fix issues. Each fixed with a surgical clause, not a
            rewrite.
          </li>
        </ul>
      </CaseSection>

      <CaseSection
        id="implementation"
        eyebrow="Co-implementation"
        title="From mockups to shipped code"
      >
        <p>
          Using <strong>Claude Code</strong>, I implement widgets on localhost and ship
          working builds to engineers for review. I write implementation prompts the way I
          write specs: complete state machines, every assumption flagged as a one-line
          toggle.
        </p>
        <p>Engineers review a working reference, not a static frame.</p>
      </CaseSection>

      <CaseSection id="takeaway" eyebrow="Reflection" title="The takeaway">
        <p>
          I wrote the doc engineers build from, the prompts that generate the content, the
          QA tooling that validates them, and increasingly the code itself.
        </p>
        <PullQuote>
          At a pre-seed startup, the most valuable designer is the one who removes
          handoffs.
        </PullQuote>
      </CaseSection>
    </CaseStudyLayout>
  );
}
