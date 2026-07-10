import type { Metadata } from "next";
import CaseSection from "@/components/case-study/CaseSection";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import QuoteCard from "@/components/case-study/QuoteCard";
import TodoNote from "@/components/case-study/TodoNote";
import PullQuote from "@/components/PullQuote";
import VideoFrame from "@/components/VideoFrame";

export const metadata: Metadata = {
  title: "Founding AI Designer at COROS AI",
  description:
    "Designing COROS AI's 0→1 onboarding and personality system — user research, competitive analysis, and three features that shape how the AI coaches.",
};

const TOC = [
  { id: "context", label: "Context" },
  { id: "research-interviews", label: "Research: user interviews" },
  { id: "competitive-analysis", label: "Research: competitive analysis" },
  { id: "solution", label: "The solution framing" },
  { id: "dimensions", label: "Feature 1: Dimensions" },
  { id: "influences", label: "Feature 2: Influences" },
  { id: "personality", label: "Feature 3: Personality" },
  { id: "final-designs", label: "Final designs" },
  { id: "design-system", label: "Design system" },
  { id: "brand", label: "Logo & brand" },
  { id: "reflection", label: "Reflection" },
];

export default function FoundingDesign() {
  return (
    <CaseStudyLayout
      slug="founding-design"
      eyebrow="COROS AI · Case Study"
      title="Founding AI Designer — Designing UI and AI Behavior as One System"
      summary="How COROS AI learned to gather context before it coaches: three onboarding features, the prompt architecture behind them, and the brand around them."
      meta={[
        { label: "Role", value: "AI Designer · Founding Employee" },
        { label: "Timeline", value: "June 2025 – Present" },
        { label: "Company", value: "COROS AI" },
        { label: "Focus", value: "Product · UX · AI · Research · Brand" },
      ]}
      toc={TOC}
    >
      <CaseSection id="context" eyebrow="Context" title="Founding designer, many hats">
        <p>
          COROS AI is an ontological coaching platform that helps professionals navigate
          moods, repair relationships, and take action when they&rsquo;re stuck — built on
          the thesis that the transformation of human beings is the transformation of our
          language.
        </p>
        <p>
          I joined COROS AI as the founding designer after a 2-month apprenticeship,
          drawn to their core mission:{" "}
          <strong>
            we&rsquo;ve been working with machines for so long that we&rsquo;ve forgotten
            how to work with each other.
          </strong>{" "}
          As someone entering the AI era through human-centered design, I saw an
          opportunity to shape how AI could restore human connection rather than replace
          it. The role went well beyond traditional UX/UI:
        </p>
        <ul>
          <li>
            <strong>Product design</strong> — three flagship features (Dimensions,
            Influences, Personality Slider)
          </li>
          <li>
            <strong>UX design</strong> — end-to-end UX/UI (onboarding, chat interface,
            settings)
          </li>
          <li>
            <strong>AI</strong> — prompt engineering, memory algorithm design, RAG
            optimization
          </li>
          <li>
            <strong>User research</strong> — user interviews, user testing
          </li>
          <li>
            <strong>Visual identity</strong> — logo, brand, and design system
          </li>
        </ul>
      </CaseSection>

      <CaseSection
        id="research-interviews"
        eyebrow="Research #1 · User interviews"
        title="What users told us"
      >
        <p>
          Early users of COROS AI shared a consistent frustration: the AI was coaching
          too quickly without truly knowing them yet. While the insights were often
          thoughtful, guidance felt rushed, overly directive, and misaligned with
          users&rsquo; emotional readiness or personal context.
        </p>
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <QuoteCard>
            It feels like it&rsquo;s jumping ahead. I haven&rsquo;t even explained
            everything yet.
          </QuoteCard>
          <QuoteCard tone="lavender">
            It just hits all at once and makes me feel kind of awful.
          </QuoteCard>
          <QuoteCard tone="sky">
            I&rsquo;ll start talking about work, then suddenly I&rsquo;m spiraling about
            myself, it all a mess and I don&rsquo;t even know where to start.
          </QuoteCard>
          <QuoteCard>
            This doesn&rsquo;t really work for me. I come from an immigrant family, I
            can&rsquo;t deal with my parents like this.
          </QuoteCard>
        </div>
        <p className="border-l-4 border-accent pl-4 font-medium">
          The problem: the AI coached before understanding users — guidance felt rushed,
          generic, and misaligned with emotional readiness.
        </p>
      </CaseSection>

      <CaseSection
        id="competitive-analysis"
        eyebrow="Research #2 · Competitive analysis"
        title="Learning from other conversational AI"
      >
        <p>
          Before designing a solution, I analyzed existing AI coaching and companion
          products (Pi, Headspace, Claude, and others) to understand how they establish
          user context.
        </p>
        <ul>
          <li>
            <strong>Insight:</strong> most AI coaching and conversational AIs gather
            context through an onboarding.
          </li>
          <li>
            <strong>Caveat:</strong> this context is treated as static. It rarely updates
            as users&rsquo; situations evolve.
          </li>
        </ul>
      </CaseSection>

      <CaseSection
        id="solution"
        eyebrow="Solution"
        title="Designing UI and AI behavior as one system"
      >
        <p>
          The solution wasn&rsquo;t just introducing an onboarding flow — it was designing
          how the AI gathers and uses context to coach effectively. I created three core
          features that let users define their context upfront, then prompt engineered
          the AI to reference this information throughout coaching conversations.
        </p>
      </CaseSection>

      <CaseSection
        id="dimensions"
        eyebrow="Feature #1"
        title="The Seven Dimensions of Life"
      >
        <p>
          Dimensions lets users declare which areas of life matter most to them:{" "}
          <strong>Work, Family, Self, Health, Belonging, Meaning, World.</strong>
        </p>
        <p>
          <strong>How it works:</strong> users select their focus areas during
          onboarding. Throughout coaching conversations, the AI references these
          dimensions to anchor guidance in what&rsquo;s personally relevant — while also
          identifying which dimension a current struggle relates to, helping users see
          how challenges map across their life and track growth in specific areas over
          time.
        </p>
        <VideoFrame
          title="Updating dimensions after onboarding"
          description="Screen recording of the personalization settings, showing a user revisiting and updating their seven life dimensions after onboarding."
          src="/videos/founding-design/dimensions-settings.mp4"
          tone="pink"
        />
      </CaseSection>

      <CaseSection id="influences" eyebrow="Feature #2" title="Influences">
        <p>
          Influences lets users declare the thinkers, belief systems, or frameworks that
          shape their worldview — for example Brené Brown, Rumi, Stoicism, or Islamic
          values.
        </p>
        <p>
          <strong>How it works:</strong> users select their influences during onboarding.
          The AI references them sparingly and strategically — only when a specific quote
          or teaching would significantly deepen a key coaching point.
        </p>
      </CaseSection>

      <CaseSection
        id="personality"
        eyebrow="Feature #3"
        title="Personality Slider (then toggle)"
      >
        <p>
          The Personality Slider lets users control the AI&rsquo;s coaching intensity by
          choosing among <strong>Supportive</strong> (patient, gentle, calm),{" "}
          <strong>Balanced</strong> (grounded, curious, discerning), and{" "}
          <strong>Provocative</strong> (candid, bold, perturbing) modes.
        </p>
        <p>
          <strong>How it works:</strong> users select their preferred mode, which
          switches the entire AI prompt architecture:
        </p>
        <ul>
          <li>
            <strong>Supportive:</strong> &ldquo;I hear you. How are you doing as you
            bring this up? What&rsquo;s happening at work?&rdquo;
          </li>
          <li>
            <strong>Balanced:</strong> &ldquo;What really matters to you here?&rdquo; or
            &ldquo;I&rsquo;m hearing a mood of overwhelm – does that feel right?&rdquo;
          </li>
          <li>
            <strong>Provocative:</strong> &ldquo;Are you going to do it or not?&rdquo; or
            &ldquo;If you don&rsquo;t want to do anything about it, why are you
            here?&rdquo;
          </li>
        </ul>
        <h3>Iteration #1 — Supportive mode had to go</h3>
        <p>
          I initially designed three modes (Supportive, Balanced, Provocative), but
          through testing and stakeholder alignment, we discovered that a coddling
          &ldquo;supportive&rdquo; approach contradicted the ontological coaching
          framework, which requires challenging limiting beliefs to drive growth.
        </p>
        <h3>Iteration #2 — the slider wasn&rsquo;t a slider</h3>
        <p>Alpha user testing revealed a confusion:</p>
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <QuoteCard attribution="User A" tone="lavender">
            The aggressiveness slider isn&rsquo;t really a slider, it&rsquo;s binary.
          </QuoteCard>
          <QuoteCard attribution="User B" tone="sky">
            This question presents as a slider bar... Either this is not working, or it
            does not need a slider. If only two options, suggest you use radio buttons
            that let you pick one or the other.
          </QuoteCard>
        </div>
        <p>
          <strong>Result:</strong> the slider was redesigned as a Personality Toggle.
        </p>
        <VideoFrame
          title="The redesigned personality toggle"
          description="Interaction recording of the final two-mode personality toggle, replacing the original three-mode slider."
          src="/videos/founding-design/personality-toggle.mp4"
          tone="lavender"
        />
      </CaseSection>

      <CaseSection id="final-designs" eyebrow="Outcome" title="Final onboarding designs">
        <VideoFrame
          title="Final onboarding, end to end"
          description="Full walkthrough of the shipped onboarding flow — dimensions, influences, and personality selection working together as one context-gathering system."
          src="/videos/founding-design/onboarding-end-to-end.mp4"
          tone="pink"
        />
      </CaseSection>

      <CaseSection id="design-system" eyebrow="Craft" title="Design system snippets">
        <p>
          Alongside the flagship features, I built out the component language the product
          ships with — settings surfaces, buttons, inputs, and responsive behavior.
        </p>
        <VideoFrame
          title="Settings snippets"
          description="A tour through the settings surfaces built on the design system."
          src="/videos/founding-design/settings-snippets.mp4"
          tone="sky"
        />
        <div className="grid gap-6 md:grid-cols-2">
          <VideoFrame
            title="Buttons"
            description="Button variants and interactive states."
            src="/videos/founding-design/buttons.mp4"
            tone="pink"
          />
          <VideoFrame
            title="Inputs"
            description="Input components and their states."
            src="/videos/founding-design/inputs.mp4"
            tone="lavender"
          />
        </div>
        <VideoFrame
          title="Responsive UI snippets"
          description="Core surfaces adapting across desktop, tablet, and mobile breakpoints."
          src="/videos/founding-design/responsive-ui.mp4"
          tone="sky"
        />
      </CaseSection>

      <CaseSection id="brand" eyebrow="Visual identity" title="Designing a brand">
        <p>
          For COROS, I led the brand and logo design end-to-end to translate a
          philosophical product vision into a coherent, premium visual identity. I shaped
          the logo direction, color system, and brand language to reflect COROS&rsquo;s
          core stance: seriousness, care, and long-term commitment.
        </p>
        <VideoFrame
          title="The final COROS logo"
          description="The finished logo and its construction — how the mark reflects the brand's stance of seriousness, care, and long-term commitment."
          src="/videos/founding-design/final-logo.mp4"
          tone="pink"
        />
        <p>
          <TodoNote>link the complete Figma brand guide embed here</TodoNote>
        </p>
      </CaseSection>

      <CaseSection id="reflection" eyebrow="Reflection" title="What I learned">
        <p>
          Working at COROS was my first experience designing in a fast-moving startup,
          and it taught me how to operate under constraints I hadn&rsquo;t faced before.
        </p>
        <p>
          <strong>I learned to design alongside engineers, not in isolation.</strong> The
          product evolved quickly, often while being built. I had to involve engineers
          early, understanding what was hard, what was impossible, and where I could
          push. This meant fewer beautiful-but-unbuildable ideas and more solutions that
          actually shipped.
        </p>
        <p>
          <strong>I learned to let go of perfection.</strong> We didn&rsquo;t have time
          or resources to solve every edge case or polish every detail. I had to
          prioritize ruthlessly, focus on the core problem, define a realistic MVP, and
          make peace with compromises. Some of my favorite ideas didn&rsquo;t make it.
          That was hard, but necessary.
        </p>
        <p>
          <strong>I learned to move forward without all the answers.</strong>{" "}
          Requirements shifted. Direction changed. I didn&rsquo;t always have complete
          clarity before making decisions. Instead of waiting, I proposed directions,
          tested quickly, and adjusted based on what I learned. I got more comfortable
          with ambiguity and faster at recovering when I was wrong.
        </p>
        <p>
          <strong>I learned to stay grounded when everything else was shifting.</strong>{" "}
          What kept me anchored were the users. Their words, their confusion, their
          relief when something finally clicked. When debates got abstract or timelines
          got tight, I came back to what they actually said. That kept the work honest.
        </p>
        <PullQuote>
          COROS taught me how to design under pressure — and how to stay focused on what
          matters when everything around you is moving fast.
        </PullQuote>
      </CaseSection>
    </CaseStudyLayout>
  );
}
