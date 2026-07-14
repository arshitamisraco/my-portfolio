import type { Metadata } from "next";
import CaseSection from "@/components/case-study/CaseSection";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import HeroStills from "@/components/case-study/HeroStills";
import TodoNote from "@/components/case-study/TodoNote";
import CaseVideo from "@/components/CaseVideo";
import ImageFrame from "@/components/ImageFrame";
import PullQuote from "@/components/PullQuote";

export const metadata: Metadata = {
  title: "My World — Designing an AI That Remembers You Back",
  description:
    "End-to-end design of the COROS AI surface that reflects a user's coaching history back to them — information architecture, widgets, and the LLM prompts behind every card.",
};

const TOC = [
  { id: "problem", label: "The problem" },
  { id: "architecture", label: "Architecture" },
  { id: "interface", label: "Interface" },
  { id: "ai", label: "The AI" },
  { id: "implementation", label: "Co-implementation" },
  { id: "outcomes", label: "Where it stands" },
  { id: "takeaway", label: "The takeaway" },
];

export default function MyWorld() {
  return (
    <CaseStudyLayout
      slug="my-world"
      eyebrow="COROS AI · Case Study"
      title="My World — Designing an AI That Remembers You Back"
      summary="A page that reflects a user's coaching history back to them at a pre-seed AI startup — designed end to end, from the information architecture to the prompts that generate every card."
      meta={[
        {
          label: "Role",
          value: "Product Designer — design, prompt engineering, prototyping, co-implementation",
        },
        {
          label: "Team",
          value: "Founder/CEO, 3 engineers, 2 designers — I owned My World end to end",
        },
        {
          label: "Timeline",
          value: (
            <>
              <TodoNote>fill in duration</TodoNote> 2026 — in progress, shipping
              incrementally
            </>
          ),
        },
        {
          label: "Tools",
          value:
            "Figma, Claude Code, Streamlit, HTML/CSS/JS prototyping, LLM prompt engineering (Gemini 2.5 Flash via LiteLLM)",
        },
      ]}
      toc={TOC}
    >
      <HeroStills
        label="My World, at a glance"
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
              alt: "A session detail page — 'Overcoming avoidance to write resume' — with summary, entry and exit moods, a commitment, a breakthrough quote, and relationships.",
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
              alt: "The Reminders widget mid-celebration — confetti falling as a reminder is checked off.",
              tone: "peach",
            },
          ],
        ]}
      />

      <CaseSection id="problem" eyebrow="The problem" title="Coaching that evaporates">
        <p>
          COROS is an AI life coach. Users have genuinely transformative conversations —
          they name a fear, make a commitment, see something about themselves for the
          first time. Then the session ends and all of it vanishes into chat history.
        </p>
        <p>
          My World reflects that history back. The brief I wrote for it became the
          team&rsquo;s north star:
        </p>
        <PullQuote attribution="The design brief, and the team's north star">
          A mirror, not a filing cabinet.
        </PullQuote>
        <p>
          Not a tracker, not a stats dashboard — a surface that shows you the pattern of
          your own transformation and invites you back into conversation. That one
          sentence settled dozens of downstream debates: no page-level filters, no scores
          or streaks, a ~100-word cap per widget, and every element ending in an on-ramp
          back to coaching.
        </p>
        <p>
          And this wasn&rsquo;t UI over an API. Every card&rsquo;s content is{" "}
          <strong>generated by LLM prompts I wrote</strong> — so I owned three layers at
          once:
        </p>
        <ol>
          <li>
            <strong>The information architecture</strong> — how raw conversations become
            structured, browsable objects.
          </li>
          <li>
            <strong>The interface</strong> — a responsive page of independent widgets.
          </li>
          <li>
            <strong>The prompts, plus the QA tooling</strong> — the generation layer
            behind every field on screen, and the harness that validates it.
          </li>
        </ol>
      </CaseSection>

      <CaseSection
        id="architecture"
        eyebrow="Layer 1 · Architecture"
        title="Sessions, Topics, and My World"
      >
        <p>
          I co-authored the product&rsquo;s design and implementation document through
          four versions, which engineering builds from directly. Its core distinction: a{" "}
          <strong>Session</strong> is an event — one conversation, factually summarized
          into a structured object with summary, moods, breakthrough, reminders, and
          relationships. A <strong>Topic</strong> is a territory — a situation the user
          keeps returning to, like &ldquo;Navigating a difficult conversation with
          dad.&rdquo;
        </p>
        <p>
          The rule I fought hardest for:{" "}
          <strong>a topic is a situational territory, never a feeling.</strong> Early
          model outputs kept producing topics like &ldquo;Self-worth&rdquo; —
          navigationally useless and subtly harmful. I codified this as the{" "}
          <em>identity-vs-texture</em> rule: feelings may color a summary, but never
          become the title. It now governs the topic prompts and the two-stage detection
          pipeline (embedding search feeding an LLM match decision).
        </p>
        <CaseVideo
          src="/videos/my-world/topic-to-session.mp4"
          poster="/images/my-world/posters/topic-to-session.jpg"
          width={1440}
          height={900}
          title="Navigating from a topic into a session"
          description="Opening a topic from My World: the territory view with its summary, moods, and session list, then clicking through to a single session's detail page with commitments and a breakthrough."
          tone="lavender"
          caption="The hierarchy in navigation: My World → a topic's territory → one session's detail."
        />
        <p>
          I also framed My World as a <strong>federated portal</strong>: each widget ships
          independently with its own prompt, logic, and documented rationale, so engineers
          could build one widget without waiting on another to stabilize.
        </p>
      </CaseSection>

      <CaseSection
        id="interface"
        eyebrow="Layer 2 · Interface"
        title="Three iterations that mattered"
      >
        <h3>The top level</h3>
        <p>
          A <strong>featured band</strong> of three reflective cards (My Breakthroughs,
          Coaching Provocation, Latest Breakthrough) above a full-width stacked{" "}
          <strong>Topics list</strong>, filterable by seven life dimensions (Family, Work,
          Self, Health, Meaning, Belonging, World) and by status. Topics are never tiled
          as a grid; each gets room to breathe. A cross-page filtering concept tested well,
          but I argued to defer it and hold a stricter rule:{" "}
          <strong>filters belong to individual widgets, not the page.</strong>
        </p>
        <CaseVideo
          src="/videos/my-world/page-tour.mp4"
          poster="/images/my-world/posters/page-tour.jpg"
          width={1440}
          height={900}
          title="My World, top to bottom"
          description="A tour of the page: the featured band of reflective cards above the reminders widget and the stacked topics list."
          tone="lavender"
          caption="The page, top to bottom: featured band, reminders, topics."
        />

        <h3>Merging the donut and the Latest Breakthrough</h3>
        <p>
          We had two separate widgets, and the donut was under threat from a line-chart
          alternative. Instead of choosing, I merged them into{" "}
          <strong>one widget with two modes</strong> and specced the full state machine:
        </p>
        <ul>
          <li>
            <strong>Mode A:</strong> donut inert, the panel shows the newest breakthrough,
            arrows walk the whole history.
          </li>
          <li>
            <strong>Mode B:</strong> clicking a segment filters the panel to that
            dimension, and auto-advancing past a dimension&rsquo;s last breakthrough{" "}
            <strong>moves the donut&rsquo;s live selection in real time</strong>,
            traversing dimensions in palette order.
          </li>
        </ul>
        <p>
          I resolved every edge case before handoff: backward symmetry, wrap behavior, and
          empty dimensions absent from the ring and the traversal alike. The merge settled
          the chart debate and delivered cross-filtering as an{" "}
          <em>intra-widget</em> interaction — honoring the no-page-level-filters rule.
        </p>
        <CaseVideo
          src="/videos/my-world/breakthrough-widget.mp4"
          poster="/images/my-world/posters/breakthrough-widget.jpg"
          width={1322}
          height={528}
          title="The combined breakthrough widget"
          description="The two-mode state machine in action: Mode A walking the full history, then a segment click entering Mode B with the donut's live selection following auto-advance across dimension boundaries."
          tone="pink"
          caption="Both modes of the state machine — including the donut's live selection following auto-advance across a dimension boundary."
        />

        <h3>The Reminders widget</h3>
        <p>
          When the team reframed <code>commitments</code> into <code>reminders</code>{" "}
          (which can also be stances — &ldquo;Notice the voice of fear and keep going
          anyway&rdquo;), I designed the widget that carries them: reminders pooled across
          all sessions, newest first, <strong>paginated inside the widget</strong>. Two
          actions, <strong>Done</strong> and <strong>Delete</strong> — Delete exists
          because these are AI-generated and can be wrong, so users need an honest way out.
          Both update shared state across the widget <em>and</em> the originating session.
        </p>
        <p>
          One detail I&rsquo;m proud of: an unchecked reminder{" "}
          <strong>re-enters at its original chronological position</strong>, so position
          always encodes creation order. I flagged the engineering implication myself — the
          creation timestamp must live in shared state, not be derived from visible
          position — and it went straight into the build spec.
        </p>
        <CaseVideo
          src="/videos/my-world/reminders-widget.mp4"
          poster="/images/my-world/posters/reminders-widget.jpg"
          width={1440}
          height={398}
          title="Reminders widget interactions"
          description="Checking off a reminder in the widget — the row completes with a burst of confetti."
          tone="sky"
          caption="A reminder checked off — completion gets confetti."
        />

        <h3>Decluttering the topic surface</h3>
        <p>
          Alongside these, I ran repeated decluttering passes on the topic card and detail
          views in weekly triage with the founder: labels stripped to inline values,{" "}
          &ldquo;Archive&rdquo; renamed to &ldquo;Box&rdquo; to fit the product&rsquo;s
          language, sticky bottom CTAs held because users decide to continue only{" "}
          <em>after</em> reading. The whole design is <strong>responsive</strong>, specced
          with breakpoint behavior across desktop and mobile rather than as two designs.
        </p>
        <CaseVideo
          src="/videos/my-world/topics-by-dimension.mp4"
          poster="/images/my-world/posters/topics-by-dimension.jpg"
          width={1440}
          height={536}
          title="Filtering topics by life dimension"
          description="The topics list narrowing as dimension chips are clicked — All, then Self — with each topic card showing its inline dimension, date, and session count."
          tone="mint"
          caption="Widget-level filtering: the topics list narrowing by life dimension."
        />
      </CaseSection>

      <CaseSection
        id="ai"
        eyebrow="Layer 3 · The AI"
        title="Prompts, playground, and QA"
      >
        <h3>Prompt engineering as design work</h3>
        <p>
          I wrote and iterated the prompts that generate everything on screen: the session
          summary (six versions, now the canonical data artifact), the topic summary (seven
          versions), topic detection, and the coaching invitation prompt now in progress.
          The craft is closer to spec-writing than copywriting —{" "}
          <strong>silence in a gate is an admission</strong>: if you don&rsquo;t explicitly
          name an exclusion with examples, the model walks through it.
        </p>
        <p>
          The <code>breakthrough_insight</code> field shows the stakes. A breakthrough
          shown back to a user is a claim about their life; get it wrong and you
          manufacture a false memory. I built it around a strict{" "}
          <strong>ownership gate</strong> (only what the user said or explicitly agreed
          to), bans on inceptive language (&ldquo;began to&rdquo;) and victory language
          (&ldquo;freedom from&rdquo;), and a required ontological rather than
          psychological register.
        </p>
        <ImageFrame
          src="/images/my-world/coaching-provocation.png"
          width={1404}
          height={528}
          alt="The Coaching Provocation widget: 'Identity is built, not discovered,' a synthesis across recent sessions that ends in a question and a Revisit action."
          tone="butter"
          caption="What the invitation prompt produces: a provocation synthesized across recent sessions, ending in a question — and an on-ramp back to coaching."
        />

        <h3>Building my own QA tooling</h3>
        <p>
          To validate all of this, I built out our <strong>Streamlit playground</strong> —
          a QA harness that runs real conversation transcripts through the entire My World
          pipeline (session summary, two-stage topic detection, and topic summary),
          exporting structured JSON. I later added an Invitation tab for the provocation
          prompt with a five-line additive diff.
        </p>
        <CaseVideo
          src="/videos/my-world/playground.mp4"
          poster="/images/my-world/posters/playground.jpg"
          width={1440}
          height={936}
          title="The Streamlit QA playground"
          description="A tour of the playground: real session JSON loaded in, the editable Appendix A/B/C prompts, a step-1 freeze, then a run whose results table shows per-session match decisions with cosine scores — 20 sessions, 12 matched, 8 new topics, 0 errored."
          tone="mint"
          caption="The Streamlit playground: real transcripts in, editable prompts, structured JSON out — with a per-session results table for field-level compliance checks."
        />
        <p>
          My method: run a batch of ~20 sessions, then check every output field against
          the prompt&rsquo;s own rules. A recent run surfaced five must-fix issues — each
          traced to a specific missing clause and fixed with a surgical insert, not a
          rewrite.{" "}
          <TodoNote>optional: add hit-rate / accuracy numbers you&rsquo;re comfortable publishing</TodoNote>
        </p>
      </CaseSection>

      <CaseSection
        id="implementation"
        eyebrow="Co-implementation"
        title="From mockups to merge requests"
      >
        <p>
          Midway through, I stopped ending my work at the Figma handoff. Using{" "}
          <strong>Claude Code</strong>, I began implementing widgets on localhost —{" "}
          <TodoNote>confirm stack detail: e.g., React + Tailwind on the shadcn-based Obra design system</TodoNote>{" "}
          — and shipping working builds to engineers for review{" "}
          <TodoNote>confirm detail: PRs / branch handoff to Maaz and Zain</TodoNote>.
        </p>
        <p>
          The technique that made it work: I write{" "}
          <strong>implementation prompts the way I write design specs.</strong> The
          combined breakthrough widget went to code as a complete state machine, with every
          assumption flagged as a one-line toggle if wrong. Engineers now review a working
          reference instead of interpreting a static frame.{" "}
          <TodoNote>metric if usable: &ldquo;reduced design-to-review cycles from days to hours&rdquo;</TodoNote>
        </p>
      </CaseSection>

      <CaseSection id="outcomes" eyebrow="Status" title="Where it stands">
        <p>
          My World is <strong>live in development</strong>: the featured band, Reminders
          widget, and topic surfaces are implemented; the invitation prompt and mood
          taxonomy integration are in progress.{" "}
          <TodoNote>add outcome metrics here if available — e.g., retention movement, sessions processed</TodoNote>
        </p>
      </CaseSection>

      <CaseSection
        id="takeaway"
        eyebrow="Reflection"
        title="What I'd want a hiring team to take from this"
      >
        <p>
          The takeaway I&rsquo;d offer a hiring team is the shape of the work: I wrote the
          product doc engineers build from, the prompts that generate the content, the QA
          tooling that validates them, and increasingly the code itself.
        </p>
        <PullQuote>
          At a pre-seed startup, the most valuable designer is the one who removes
          handoffs. That&rsquo;s the designer I&rsquo;ve become — and the design engineer
          I&rsquo;m becoming.
        </PullQuote>
      </CaseSection>
    </CaseStudyLayout>
  );
}
