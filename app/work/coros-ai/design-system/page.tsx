import type { Metadata } from "next";
import CaseVideo from "@/components/CaseVideo";
import CaseSection from "@/components/case-study/CaseSection";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import ImageFrame from "@/components/ImageFrame";
import PullQuote from "@/components/PullQuote";

export const metadata: Metadata = {
  title: "Rebuilding COROS AI — From MUI Defaults to a Token-Driven Design System",
  description:
    "Leading COROS AI's full redesign onto a shadcn/Tailwind foundation — 54+ semantic tokens, light/dark theming, responsive surfaces across four platforms, and a team-facing RAG debug panel.",
};

const TOC = [
  { id: "tldr", label: "TL;DR" },
  { id: "context", label: "Why the redesign happened" },
  { id: "tokens", label: "Three layers, zero shortcuts" },
  { id: "components", label: "Component architecture" },
  { id: "surfaces", label: "Redesigning the surfaces" },
  { id: "retrieved-context", label: "The Retrieved Context panel" },
  { id: "handoff", label: "Handoff" },
  { id: "outcomes", label: "Outcomes" },
  { id: "learnings", label: "What I learned" },
];

export default function DesignSystem() {
  return (
    <CaseStudyLayout
      slug="design-system"
      eyebrow="COROS AI · Case Study"
      title="Rebuilding COROS AI: From MUI Defaults to a Token-Driven Design System"
      summary="Product Design · Design Systems · Design Engineering — migrating a live AI coaching product onto a semantic-token foundation across four platforms."
      meta={[
        {
          label: "Role",
          value:
            "Product Designer — design system owner, end-to-end surface design, developer handoff",
        },
        {
          label: "Team",
          value: "Founder/CEO, two engineers, one collaborating designer (microinteractions)",
        },
        { label: "Platforms", value: "Web (desktop + tablet), iOS, Android" },
        {
          label: "Links",
          value: (
            <>
              <a
                href="https://app.coros.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-deep underline decoration-accent underline-offset-2 hover:decoration-accent-deep"
              >
                Live product
              </a>
              {" · "}
              <a
                href="https://www.figma.com/design/m1CDYr9xf00a2oj3gDDAt8/COROS-AI-Design-system?node-id=4562-26816"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-deep underline decoration-accent underline-offset-2 hover:decoration-accent-deep"
              >
                Figma system
              </a>
            </>
          ),
        },
      ]}
      toc={TOC}
    >
      <CaseSection id="tldr" eyebrow="Summary" title="TL;DR">
        <p>
          COROS AI&rsquo;s first product was built on stock Material UI — dark-only,
          desktop-only, visually generic, and increasingly painful to iterate on. I led
          the full redesign onto a shadcn/Tailwind foundation, building the design system
          from raw color primitives up to a published multi-designer Figma library with
          54+ semantic tokens, full light/dark theming, and responsive component
          architecture across four platforms. I redesigned every base surface —
          onboarding, chat, sidebar, and settings — and shipped an internal
          &ldquo;Retrieved Context&rdquo; transparency panel that lets the team inspect
          the RAG pipeline (retrieved chunks, memory scoring, session-boundary detection)
          directly inside the product for prompt QA.
        </p>
        <p>
          The redesign is live in production. The onboarding rework contributed to a{" "}
          <strong>2.5× increase in user return rate</strong>, and the shared token system
          compressed design-to-review cycles from days to hours.
        </p>
      </CaseSection>

      <CaseSection id="context" eyebrow="Context" title="Why the redesign happened">
        <p>
          COROS AI is a pre-seed startup building an AI coach grounded in ontological
          coaching methodology. The product is fundamentally a conversation — which means
          the interface has one job: get out of the way of a deep, sometimes emotionally
          heavy dialogue, while still feeling like a considered, premium product.
        </p>
        <p>
          The MUI-era product did the opposite. Early user testing surfaced it directly:
          testers reported that the dark, dim background with low-contrast text strained
          their eyes during long coaching sessions, and asked for lighter themes and
          better readability. Beyond the feedback, the internal problems were structural:
        </p>
        <ul>
          <li>
            <strong>No theming architecture.</strong> MUI&rsquo;s defaults were being
            overridden ad hoc. There was no light mode, no token layer, and no way to
            restyle the product without touching individual components.
          </li>
          <li>
            <strong>Not responsive.</strong> The product needed to live on web, iOS, and
            Android, but the UI had been designed desktop-first with no breakpoint
            system.
          </li>
          <li>
            <strong>No shared design language.</strong> With a second designer joining
            and engineers building against screenshots, every surface was drifting. There
            was no published library, no component contract, no naming convention.
          </li>
          <li>
            <strong>Generic identity.</strong> COROS has a strong brand — a specific
            blue (#0822E6), a specific orange (#EA4A00) — and none of it survived contact
            with Material defaults.
          </li>
        </ul>
        <p>
          The engineering team was moving to shadcn/ui + Tailwind on the code side. My
          mandate was to build the design side of that migration: a Figma system that
          mirrored the code&rsquo;s token architecture one-to-one, and a redesign of
          every base surface on top of it.
        </p>
      </CaseSection>

      <CaseSection id="tokens" eyebrow="Design system" title="Three layers, zero shortcuts">
        <p>
          I built the system on the Obra shadcn Figma kit, chosen deliberately because it
          mirrors how shadcn works in code — everything resolves through semantic tokens,
          and components never touch raw values. Rather than restyle the kit
          destructively, I extended it with a strict three-layer architecture:
        </p>
        <PullQuote>
          Raw primitives → Brand layer → Semantic tokens → Components
        </PullQuote>
        <p>
          <strong>Raw primitives.</strong> I generated complete 11-stop scales (50–950)
          for three new color groups — <code>coros-neutral</code>,{" "}
          <code>coros-blue</code>, <code>coros-orange</code> — with the exact brand hexes
          locked at the 600 stop. The neutrals aren&rsquo;t gray: they&rsquo;re
          blue-tinted at the brand hue (233°), so even &ldquo;empty&rdquo; surfaces carry
          COROS&rsquo;s temperature. When Obra&rsquo;s default destructive red clashed
          with the palette, I generated a custom cool-crimson scale (hue 352°) to replace
          it. Everything was added as new variable groups rather than overwriting kit
          defaults — a non-destructive practice that keeps the kit upgradeable.
        </p>
        <p>
          <strong>Brand layer.</strong> Semantic tokens are forbidden from referencing
          raw scales directly; they resolve only through brand references (
          <code>brand-shades</code>, <code>brand-neutrals</code>). This one rule is what
          makes the system maintainable — a brand refresh becomes a single-layer repoint,
          not a token audit. I enforced it throughout the file, including catching and
          correcting several early mappings that bypassed the brand layer.
        </p>
        <p>
          <strong>Semantic tokens.</strong> 54+ role-based tokens mapped for both light
          and dark modes using Figma variable modes: <code>primary</code> resolving to
          brand-shades/600 in light and 500 in dark, <code>background</code> to
          brand-neutrals/50 and 950, and so on. Where shadcn&rsquo;s vocabulary
          didn&rsquo;t cover the product, I extended it — chat is COROS&rsquo;s core
          surface, so I introduced product-specific tokens like{" "}
          <code>chat-bubble-coros</code> and <code>chat-bubble-user</code> rather than
          overloading <code>muted</code> or <code>card</code> with jobs they weren&rsquo;t
          designed for. Dark-mode details got real attention: primary CTAs use an
          off-white (#FCFCFD) rather than pure white against the locked dark background
          (#0A0B15), because pure white vibrates at that contrast.
        </p>
        <p>
          The payoff of variable modes: every screen is designed once. Toggling the
          frame&rsquo;s mode re-resolves every token, so light/dark verification is a
          click, not a re-draw — which is the only way a team this small ships two full
          themes across four platforms.
        </p>
        <p>
          I published the library to Figma as a shared team resource, with slash-notation
          variable grouping and naming conventions agreed upon with the second designer
          before either of us pushed pixels.
        </p>
        <div className="my-8">
          <div className="grid gap-3 sm:grid-cols-3 sm:items-center sm:gap-4">
            <ImageFrame
              src="/images/design-system/figma/tokens-semantic-colors.png"
              width={1882}
              height={1890}
              alt="Figma variables editor showing the semantic colors collection with a shadcn (light) column and a shadcn-dark column, each token resolving to a brand-neutrals, brand-shades, coros-green, or coros-red reference."
              size="full"
              tone="lavender"
              flush
            />
            <ImageFrame
              src="/images/design-system/figma/tokens-typography.png"
              width={1489}
              height={1890}
              alt="Figma variables editor showing the typography collection: font definitions for sans, serif, headings, body, and monospace, plus heading scales with weight, size, line-height, and letter-spacing tokens."
              size="full"
              tone="mint"
              flush
            />
            <ImageFrame
              src="/images/design-system/figma/tokens-semantic-spacing.png"
              width={1889}
              height={1890}
              alt="Figma variables editor showing the semantic spacing collection with separate sm (mobile) and lg (desktop) columns for padding, layout, and gap tokens."
              size="full"
              tone="sky"
              flush
            />
          </div>
          <p className="mt-3 text-caption text-ink-muted">
            The variable library at a glance — semantic colors holding a value per token
            for both the shadcn (light) and shadcn-dark modes, typography resolving
            through shared font definitions, and spacing carrying separate sm (mobile)
            and lg (desktop) values. Every color resolves through a brand reference,
            never a raw hex.
          </p>
        </div>
      </CaseSection>

      <CaseSection
        id="components"
        eyebrow="Component architecture"
        title="Variants where structure changes, properties everywhere else"
      >
        <p>
          A design system lives or dies on how its components scale, so I set a
          discipline early:{" "}
          <strong>
            variants only for structural change; component properties for everything
            else.
          </strong>
        </p>
        <p>
          The chat input bar is the clearest example. It needed to handle default,
          focused, with-text, and multiline states across mobile and desktop breakpoints
          — a naive build is a 2×4 variant explosion that grows multiplicatively with
          every new state. Instead:
        </p>
        <ul>
          <li>
            <strong>State</strong> is one variant axis only where the structure actually
            differs (multiline changes height and layout; it earns a variant).
          </li>
          <li>
            <strong>Focus</strong> is a boolean property — it&rsquo;s a ring style, not a
            structure.
          </li>
          <li>
            <strong>Send button visibility, attachment button, placeholder text</strong>{" "}
            are boolean and text properties.
          </li>
          <li>
            <strong>Breakpoints</strong> exist as variants only when structure changes;
            where the only difference is width, auto layout with min/max constraints
            handles it, so the component resizes instead of multiplying.
          </li>
        </ul>
        <p>
          The same logic ran through message bubbles (asymmetric radii signaling speaker
          direction, avatar slots, timestamp rows), the sidebar navigation, and the
          settings shell. Iconography standardized on Lucide at a fixed spec — 20px icons
          in 32×32 ghost hit areas, <code>rounded-md</code> — benchmarked against
          production values from leading AI chat products rather than invented.
        </p>
      </CaseSection>

      <CaseSection id="surfaces" eyebrow="Surfaces" title="Redesigning the base surfaces">
        <h3>Chat</h3>
        <p>
          Chat is the product, so it got the deepest treatment. Beyond the visible layout
          — COROS messages left-aligned, user messages right-aligned in iMessage-style
          bubbles — the work was in the state inventory: empty state (the first thing a
          new user ever sees), typing indicator vs. streaming text (two different
          &ldquo;loading&rdquo; moments that users read differently), error and retry
          states, message-level actions (read-aloud, settings) revealed below COROS
          messages, scroll-position handling and return-to-chat behavior, and rich
          content inside AI messages.
        </p>
        <p>
          The user bubble color was a genuine debate. Full COROS blue read as heavy and
          shouting; I built an HTML comparison prototype of three alternatives (darker
          neutral, subtle blue tint, neutral with border) rendered in both themes, and
          brought two finalists to stakeholder review rather than asserting one. Small
          decision, but it set the working pattern for the project: disagreements get
          prototyped, not argued.
        </p>
        <CaseVideo
          src="/videos/design-system/chat-web-dark.mp4"
          poster="/images/design-system/posters/chat-web-dark.jpg"
          width={1440}
          height={936}
          title="The chat surface on web, dark theme"
          description="A coaching exchange on web in dark mode: the COROS greeting, a user message, a streamed response, and the read-aloud and flag actions revealed beneath it."
          size="lg"
          tone="sky"
          caption="Chat in motion on web (dark theme) — the greeting, a streamed reply, and the message-level actions beneath each COROS response."
        />
        <div className="my-8">
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            <ImageFrame
              src="/images/design-system/mobile/chat-conversation.png"
              width={1206}
              height={2622}
              alt="Mobile chat in light mode showing date dividers and read-aloud and flag actions beneath a COROS message."
              size="mobile"
              tone="pink"
              flush
            />
            <ImageFrame
              src="/images/design-system/mobile/chat-tone-switch.png"
              width={1206}
              height={2622}
              alt="Mobile chat with an inline tone quick-switch popover offering Supportive, Provocative, and More Personalization."
              size="mobile"
              tone="lavender"
              flush
            />
            <CaseVideo
              src="/videos/design-system/chat-mobile-light.mp4"
              poster="/images/design-system/posters/chat-mobile-light.jpg"
              width={640}
              height={1392}
              title="Composing a message on mobile, light theme"
              description="Typing and sending a message in the mobile chat in light mode."
              size="mobile"
              tone="sky"
              flush
            />
          </div>
          <p className="mt-3 text-caption text-ink-muted">
            The same surface on mobile (light theme): date-grouped history with message
            actions, the inline tone quick-switch, and composing a message — one component
            system, both themes.
          </p>
        </div>

        <h3>Onboarding</h3>
        <p>
          The legacy flow was eight dark-only screens with awkward sequencing — it asked
          for the user&rsquo;s name <em>last</em>, after personalizing the entire flow. I
          restructured it to six screens:{" "}
          <strong>Welcome → Name → Dimensions → Influences → Tone → Loading</strong>,
          with the name moved up front so the rest of the flow can address the user
          personally, a filler transition screen cut, and theming following the system
          setting rather than adding a selection step.
        </p>
        <p>
          Details recruiters won&rsquo;t see in a screenshot but users feel: the welcome
          greeting rotates through nine languages while &ldquo;I&rsquo;m COROS.&rdquo;
          stays static — communicating multilingual support without a language selector,
          and solving the layout jitter that different script widths would otherwise
          cause. The tone-selection screen (Supportive ↔ Provocative) teaches through
          interaction: the chosen card comes forward, the other dims, and the background
          tints blue or orange — the orbs themselves animate differently per personality
          (Supportive breathes; Provocative flickers). Navigation is a fixed bar
          decoupled from content, with Continue gated on per-screen state (name entered,
          at least one dimension selected). Every screen was designed for web desktop,
          web tablet, iOS, and Android simultaneously.
        </p>
        <CaseVideo
          src="/videos/design-system/onboarding-web-dark.mp4"
          poster="/images/design-system/posters/onboarding-web-dark.jpg"
          width={1440}
          height={936}
          title="The six-screen onboarding on web, dark theme"
          description="The full onboarding on web in dark mode: the rotating multilingual welcome, name, dimensions, influences, tone selection with its animated orbs, and the loading hand-off into chat."
          size="lg"
          tone="lavender"
          caption="Welcome through Loading on web (dark theme): the rotating multilingual greeting, gated navigation, and the tone cards whose orbs animate per personality."
        />
        <div className="my-8">
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            <CaseVideo
              src="/videos/design-system/onboarding-mobile-light.mp4"
              poster="/images/design-system/posters/onboarding-mobile-light.jpg"
              width={640}
              height={1392}
              title="Onboarding on mobile, light theme"
              description="The onboarding welcome on mobile in light mode, greeting rotating through languages."
              size="mobile"
              tone="pink"
              flush
            />
            <ImageFrame
              src="/images/design-system/mobile/personalization-tone.png"
              width={1206}
              height={2622}
              alt="Mobile tone selection with Supportive and Provocative cards, each carrying an animated orb."
              size="mobile"
              tone="sky"
              flush
            />
            <ImageFrame
              src="/images/design-system/mobile/personalization-dimensions.png"
              width={1206}
              height={2622}
              alt="Mobile dimensions selection with seven pill options, several selected."
              size="mobile"
              tone="lavender"
              flush
            />
          </div>
          <p className="mt-3 text-caption text-ink-muted">
            The same flow on mobile (light theme) — the multilingual welcome, tone cards, and
            dimension pills. Every screen was designed for web desktop, web tablet, iOS, and
            Android at once, so the token system is what keeps them identical.
          </p>
        </div>

        <h3>Sidebar &amp; settings</h3>
        <p>
          Settings was rebuilt as a modal shell with a persistent left nav — Account,
          Data control, Personalization, About, Terms &amp; Privacy, My Memories —
          consistent across every tab so the frame never jumps. One placement decision
          I&rsquo;m fond of: the Appearance toggle. It behaves differently from every
          other settings item (it acts inline; the others navigate), so burying it inside
          Personalization was wrong. I moved it into the sidebar flyout as a utility row
          — separated visually from the nav links above and the destructive Log out below
          — so switching themes never requires navigating anywhere. Three zones, three
          separators, self-explanatory hierarchy.
        </p>
        <CaseVideo
          src="/videos/design-system/settings-web-light.mp4"
          poster="/images/design-system/posters/settings-web-light.jpg"
          width={1440}
          height={936}
          title="Account and Data control settings on web, light theme"
          description="The settings modal on web in light mode, navigating between Account and Data control with its persistent left nav."
          size="lg"
          tone="mint"
          caption="The settings modal shell on web (light theme) — a persistent left nav that never jumps between tabs."
        />
        <CaseVideo
          src="/videos/design-system/personalization-web-light.mp4"
          poster="/images/design-system/posters/personalization-web-light.jpg"
          width={1440}
          height={936}
          title="Personalization settings on web, light theme"
          description="The Personalization tab on web in light mode: tone, dimensions, and influences, with the tone orbs animating."
          size="lg"
          tone="butter"
          caption="Personalization on web (light theme) — tone, dimensions, and influences share the same modal shell as settings."
        />
        <div className="my-8">
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            <ImageFrame
              src="/images/design-system/mobile/sidebar-flyout.png"
              width={1206}
              height={2622}
              alt="Mobile sidebar flyout with search chats, send feedback, and the user profile pinned at the bottom."
              size="mobile"
              tone="pink"
              flush
            />
            <ImageFrame
              src="/images/design-system/mobile/settings-account.png"
              width={1206}
              height={2622}
              alt="Mobile settings modal showing the profile header and the Account group."
              size="mobile"
              tone="mint"
              flush
            />
            <ImageFrame
              src="/images/design-system/mobile/settings-connected-accounts.png"
              width={1206}
              height={2622}
              alt="Mobile settings with Connected accounts expanded inline, listing Google, LinkedIn, Microsoft, and Apple."
              size="mobile"
              tone="sky"
              flush
            />
          </div>
          <p className="mt-3 text-caption text-ink-muted">
            The settings shell on mobile: the sidebar flyout, the profile and Account group,
            and Connected accounts expanding inline rather than pushing to a new screen.
          </p>
        </div>
        <div className="my-8">
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            <ImageFrame
              src="/images/design-system/mobile/personalization-influences-search.png"
              width={1206}
              height={2622}
              alt="Mobile influences search with a live results dropdown of historical and cultural figures."
              size="mobile"
              tone="lavender"
              flush
            />
            <ImageFrame
              src="/images/design-system/mobile/personalization-influences-selected.png"
              width={1206}
              height={2622}
              alt="Mobile influences with selected chips: Martin Heidegger, Barbie Doll, and Brené Brown."
              size="mobile"
              tone="sky"
              flush
            />
            <ImageFrame
              src="/images/design-system/mobile/settings-delete-confirm.png"
              width={1206}
              height={2622}
              alt="Mobile delete-account confirmation dialog requiring the user to type delete, its confirm button on the destructive token."
              size="mobile"
              tone="peach"
              flush
            />
          </div>
          <p className="mt-3 text-caption text-ink-muted">
            States, not just screens: searching influences, the selected chips, and the
            type-to-confirm delete dialog rendered on its own destructive token.
          </p>
        </div>
      </CaseSection>

      <CaseSection
        id="retrieved-context"
        eyebrow="Feature"
        title="The Retrieved Context panel: designing for the team, inside the product"
      >
        <p>
          COROS&rsquo;s coaching quality depends on a memory pipeline — RAG retrieval
          over past sessions, a rolling summary, session-boundary detection, biographical
          memory. When a response goes wrong, the team&rsquo;s first question is always
          the same: <em>what did the model actually see?</em> Answering it used to mean
          an engineer digging through logs.
        </p>
        <p>
          I designed a team-only transparency surface, reachable from a settings icon
          under any COROS response, that exposes the pipeline for that exact turn:
        </p>
        <ul>
          <li>
            <strong>Associated Query</strong> — the user query and COROS response pair
            under inspection, so the debugging session is anchored to a concrete
            exchange.
          </li>
          <li>
            <strong>Memory Config</strong> — whether the session-boundary detector fired,
            its probability score, the expandable short-term memory (turn-by-turn), and
            the past sessions retrieved into context, each with its semantic score,
            recency score, and final blended score. This is where the team validates
            retrieval thresholds against real conversations instead of synthetic tests.
          </li>
          <li>
            <strong>Chunk Results</strong> — the raw retrieved chunks from the knowledge
            base.
          </li>
          <li>
            <strong>Personalization</strong> — the active tone, dimensions, and
            influences shaping the prompt.
          </li>
          <li>
            <strong>My Memories (team-only)</strong> — the biographical memory object as
            the model sees it, plus session history summaries.
          </li>
        </ul>
        <p>
          The design challenge was tonal: this is engineering telemetry living inside a
          warm consumer product. I kept it on the same design system — same tokens, same
          type, same modal shell as settings — so it reads as a native surface rather
          than a bolted-on debug console, while structuring the data hierarchy (scores as
          scannable inline metadata, turns and sessions as progressive-disclosure
          accordions) so a prompt engineer can diagnose a retrieval miss in seconds.
          Because I was also doing the prompt QA myself, I was designing this tool as its
          own primary user — every field on the panel corresponds to a question I&rsquo;d
          actually had to answer during prompt iteration, including &ldquo;did the topic
          switch when it should have?&rdquo; (the session-change probability) and
          &ldquo;why did it retrieve <em>that</em> session?&rdquo; (the score breakdown).
        </p>
        <p>
          This feature quietly changed how the team works: prompt regressions that used
          to be argued from vibes are now diagnosed from the panel.
        </p>
      </CaseSection>

      <CaseSection id="handoff" eyebrow="Process" title="Handoff">
        <p>
          Designs shipped with a markdown design specification covering every surface:
          screen purpose, web-vs-mobile layout differences, full component inventory, UX
          states (empty, loading, error, disabled, edge cases), and interaction behavior
          — written to a consistent per-screen template so engineers always knew where to
          look. Documented sections were accepted by engineering without redesign
          requests, and open questions were logged explicitly with owners rather than
          left implicit.
        </p>
      </CaseSection>

      <CaseSection id="outcomes" eyebrow="Impact" title="Outcomes">
        <ul>
          <li>
            <strong>Live in production</strong> at{" "}
            <a href="https://app.coros.ai" target="_blank" rel="noopener noreferrer">
              app.coros.ai
            </a>{" "}
            across web, iOS, and Android.
          </li>
          <li>
            <strong>2.5× increase in user return rate</strong> following launch, with the
            redesigned coaching-interview onboarding as a primary contributor.
          </li>
          <li>
            <strong>A published, adopted design library</strong> — the second designer
            and both engineers work from the same tokens; the microinteractions
            workstream builds on my components without detaching them.
          </li>
          <li>
            <strong>Design-to-review cycles compressed from days to hours</strong>, aided
            by functional HTML/CSS/JS prototypes for contested decisions.
          </li>
          <li>
            <strong>A team that can see its own AI.</strong> The Retrieved Context panel
            made prompt QA a first-class, in-product workflow.
          </li>
        </ul>
      </CaseSection>

      <CaseSection id="learnings" eyebrow="Reflection" title="What I'd tell you I learned">
        <p>
          <strong>Token discipline is a social contract, not a Figma feature.</strong>{" "}
          The three-layer rule only holds if someone enforces it in review — the
          system&rsquo;s value came from the discipline, not the variables.
        </p>
        <p>
          <strong>Design the boring layer first.</strong> Weeks spent on color
          architecture before drawing a single screen felt slow at a pre-seed startup. It
          was the single highest-leverage decision of the project — every surface after
          it was faster than the one before.
        </p>
        <p>
          <strong>Your internal users deserve product design too.</strong> The team debug
          panel could have been a JSON dump. Treating the prompt-engineering team as
          users with real workflows produced a tool people actually open — and it made me
          a better prompt engineer, because I had to decide what information{" "}
          <em>mattered</em>.
        </p>
        <p>
          <strong>Prototype the disagreement.</strong> Every contested visual decision
          (bubble color, tone selection, greeting animation) was resolved with a working
          prototype in front of stakeholders, not a debate. At startup speed, showing
          beats telling by a wide margin.
        </p>
      </CaseSection>
    </CaseStudyLayout>
  );
}
