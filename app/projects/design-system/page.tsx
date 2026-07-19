import type { Metadata } from "next";
import CaseVideo from "@/components/CaseVideo";
import CaseSection from "@/components/case-study/CaseSection";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import HeroMontage from "@/components/case-study/HeroMontage";
import ImageFrame from "@/components/ImageFrame";
import PullQuote from "@/components/PullQuote";

export const metadata: Metadata = {
  title: "Rebuilding the Design System Across Three Platforms",
  description:
    "Leading COROS AI's full redesign onto a shadcn/Tailwind foundation — 54+ semantic tokens, light/dark theming, responsive surfaces across four platforms, and a team-facing RAG debug panel.",
};

const TOC = [
  { id: "tldr", label: "TL;DR" },
  { id: "context", label: "Why the redesign happened" },
  { id: "tokens", label: "Three layers, zero shortcuts" },
  { id: "components", label: "Component architecture" },
  { id: "surfaces", label: "Redesigning the screens" },
  { id: "retrieved-context", label: "A debug panel for the team" },
  { id: "handoff", label: "Handoff & outcomes" },
  { id: "learnings", label: "What I learned" },
];

const STATS = [
  {
    value: "55%",
    label: "of early signups return the next day after the onboarding rework",
    bg: "bg-lavender-soft",
  },
  {
    value: "54+",
    label: "semantic tokens, themed for light and dark in one file",
    bg: "bg-sky-soft",
  },
  {
    value: "4",
    label: "platforms from one system: web desktop, tablet, iOS, and Android",
    bg: "bg-mint-soft",
  },
];

export default function DesignSystem() {
  return (
    <CaseStudyLayout
      slug="design-system"
      eyebrow="COROS AI · Case Study"
      title="Rebuilding the design system across three platforms"
      summary="Product Design · Design Systems · Design Engineering. Migrating a live AI coaching product onto a scalable design system across four platforms."
      highlight={{ stat: "55% of early signups return the next day" }}
      meta={[
        {
          label: "Role",
          value:
            "Product Designer · Design system ownership · Surface design · Developer handoff",
        },
        {
          label: "Team",
          value: "Founder/CEO · 2 engineers · 1 designer",
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
          COROS AI&rsquo;s first product ran on stock Material UI: dark-only,
          desktop-only, and hard to iterate on. I led the full redesign onto a shadcn
          foundation, building the design system from raw color primitives up to a
          published Figma library with 54+ semantic tokens, full light/dark theming, and
          responsive components across four platforms. I redesigned every base surface
          (onboarding, chat, sidebar, and settings) and designed an internal
          &ldquo;Retrieved Context&rdquo; panel that lets the team inspect the RAG
          pipeline directly inside the product.
        </p>
        <p>
          The redesign is live in production. After the onboarding rework,{" "}
          <strong>55% of early signups return the next day</strong> and{" "}
          <strong>40% of registered users are weekly actives</strong>, and the shared
          token system cut design-to-review cycles from days to hours.
        </p>
      </CaseSection>

      {/* Scope + impact at a glance — a numeric read leading into the visual hero. */}
      <div className="mb-14 grid gap-3 sm:grid-cols-3 sm:gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.value}
            className={`rounded-frame border border-line p-5 sm:p-6 ${stat.bg}`}
          >
            <p className="font-display text-h1 font-semibold leading-none text-ink">
              {stat.value}
            </p>
            <p className="mt-3 text-caption text-ink-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <HeroMontage
        label="The redesign, at a glance"
        portrait={[
          {
            src: "/videos/design-system/onboarding-mobile-light.mp4",
            poster: "/images/design-system/posters/onboarding-mobile-light.jpg",
            width: 640,
            height: 1392,
            tone: "pink",
            title: "Onboarding on mobile, light theme",
            description:
              "The redesigned onboarding flow on mobile in light mode, from the rotating multilingual welcome onward.",
          },
          {
            src: "/videos/design-system/chat-mobile-light.mp4",
            poster: "/images/design-system/posters/chat-mobile-light.jpg",
            width: 640,
            height: 1392,
            tone: "sky",
            title: "Chat on mobile, light theme",
            description:
              "Composing and sending a message in the mobile chat, with COROS thinking and replying.",
          },
          {
            src: "/videos/design-system/influences-mobile-light.mp4",
            poster: "/images/design-system/posters/influences-mobile-light.jpg",
            width: 640,
            height: 1392,
            tone: "lavender",
            title: "Choosing influences on mobile, light theme",
            description:
              "Searching influences on mobile with live results and selected chips filling the field.",
          },
        ]}
        landscape={[
          {
            src: "/videos/design-system/landing-web-light.mp4",
            poster: "/images/design-system/posters/landing-web-light.jpg",
            width: 1440,
            height: 936,
            tone: "mint",
            title: "First open on web, light theme",
            description:
              "The personalized COROS greeting streaming into the empty chat on web in light mode.",
          },
          {
            src: "/videos/design-system/dictation-web-light.mp4",
            poster: "/images/design-system/posters/dictation-web-light.jpg",
            width: 1440,
            height: 936,
            tone: "butter",
            title: "Dictation on web, light theme",
            description:
              "Dictating a message in the web chat, the live waveform running in the input bar.",
          },
        ]}
      />

      <CaseSection id="context" eyebrow="Context" title="Why the redesign happened">
        <p>
          COROS is an AI coach. The interface has one job: stay out of the way of a deep,
          sometimes emotionally heavy conversation while still feeling premium. The MUI
          product did the opposite. Testers said the dim, low-contrast dark theme strained
          their eyes during long sessions, and there was no light mode to offer them.
        </p>
        <p>
          The internal problems were structural. MUI defaults were overridden ad hoc with
          no token layer, so restyling anything meant touching individual components. The
          UI was desktop-only despite mobile plans. With a second designer joining and
          engineers building from screenshots, there was no shared library or naming
          convention, and the brand (COROS blue #0822E6, orange #EA4A00) had disappeared
          into Material defaults.
        </p>
        <p>
          Engineering was moving to shadcn/Tailwind. My mandate was to build the design
          side of that migration and redesign every surface on top of it.
        </p>
      </CaseSection>

      <CaseSection id="tokens" eyebrow="Design system" title="Three layers, zero shortcuts">
        <p>
          I built on the Obra shadcn Figma kit because it mirrors how shadcn works in code:
          components only reference semantic tokens, never raw values. I extended it with a
          strict architecture.
        </p>
        <PullQuote>
          Raw primitives → Brand layer → Semantic tokens → Components
        </PullQuote>
        <p>
          For primitives, I generated full 11-stop scales for new{" "}
          <code>coros-neutral</code>, <code>coros-blue</code>, and{" "}
          <code>coros-orange</code> groups, with the brand hexes locked at the 600 stop.
          The neutrals aren&rsquo;t gray; they&rsquo;re tinted at the brand&rsquo;s blue
          hue, so even &ldquo;empty&rdquo; surfaces feel like COROS. I also built a custom
          crimson scale for destructive states when the kit&rsquo;s red clashed. Everything
          was added as new groups instead of overwriting kit defaults, keeping the kit
          upgradeable.
        </p>
        <p>
          Semantic tokens are forbidden from touching raw scales directly; they resolve
          only through the brand layer. That one rule makes a rebrand a single-layer
          repoint instead of a token audit. On top sit 54+ role-based tokens mapped for
          light and dark via Figma variable modes, including product-specific tokens like{" "}
          <code>chat-bubble-coros</code> and <code>chat-bubble-user</code> that shadcn
          doesn&rsquo;t ship.
        </p>
        <p>
          The payoff: every screen is designed once. Toggling the frame&rsquo;s mode
          re-resolves every token, so verifying both themes is a click, not a redraw. That
          is the only way a team this small ships two themes across four platforms. I
          published the library for the whole team to build on.
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
            The variable library at a glance: semantic colors holding a value per token
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
        title="How the components were built"
      >
        <p>
          My rule:{" "}
          <strong>
            variants only when structure changes, component properties for everything
            else.
          </strong>{" "}
          The chat input bar shows why: it needed default, focused, with-text, and
          multiline states across breakpoints, which naively explodes into a variant grid.
          Instead:
        </p>
        <ul>
          <li>
            <strong>Multiline</strong> earned a variant: it changes the component&rsquo;s
            height and layout.
          </li>
          <li>
            <strong>Focus</strong> became a boolean: it&rsquo;s just a ring, not a new
            structure.
          </li>
          <li>
            <strong>Send button and placeholder</strong> became component properties.
          </li>
          <li>
            <strong>Width differences</strong> were handled by auto-layout constraints
            rather than breakpoint variants, so the component resizes instead of
            multiplying.
          </li>
        </ul>
        <p>
          The same logic ran through message bubbles, the sidebar, and settings. Icons
          standardized on Lucide at 20px inside 32px ghost hit areas, benchmarked against
          production values from leading AI chat products rather than invented.
        </p>
      </CaseSection>

      <CaseSection id="surfaces" eyebrow="Screens" title="Redesigning the core screens">
        <h3>Chat</h3>
        <p>
          Chat is the product, so it got the deepest state inventory: empty state, typing
          indicator vs. streaming text, errors and retries, message-level actions, and
          scroll and return-to-chat behavior. The user bubble color was a real debate:
          full brand blue felt heavy, so I prototyped three alternatives in working HTML
          across both themes and brought the finalists to stakeholder review. That set the
          project&rsquo;s working pattern:{" "}
          <strong>prototype disagreements, don&rsquo;t argue them.</strong>
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
          caption="Chat in motion on web (dark theme): the greeting, a streamed reply, and the message-level actions beneath each COROS response."
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
            actions, the inline tone quick-switch, and composing a message: one component
            system, both themes.
          </p>
        </div>

        <h3>Onboarding</h3>
        <p>
          The legacy flow was eight dark-only screens that asked for the user&rsquo;s name{" "}
          <em>last</em>, after personalizing everything. I restructured it to six:{" "}
          <strong>Welcome → Name → Dimensions → Influences → Tone → Loading</strong>, with
          the name up front so the rest of the flow can address the user personally. The
          welcome greeting rotates through nine languages to signal multilingual support
          without a selector. The tone screen teaches through interaction: the chosen card
          comes forward, the background tints blue or orange, and each orb animates to
          match its personality. Every screen shipped for all four platforms.
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
            The same flow on mobile (light theme): the multilingual welcome, tone cards, and
            dimension pills. Every screen was designed for web desktop, web tablet, iOS, and
            Android at once, so the token system is what keeps them identical.
          </p>
        </div>

        <h3>Sidebar &amp; settings</h3>
        <p>
          Settings became a modal shell with a persistent left nav (Account, Data control,
          Personalization, About, Terms, and My Memories) consistent across every tab so
          the frame never jumps. The Appearance toggle moved out of settings and into the
          sidebar as an inline utility row, since switching themes should never require
          navigating anywhere.
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
          caption="The settings modal shell on web (light theme): a persistent left nav that never jumps between tabs."
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
          caption="Personalization on web (light theme): tone, dimensions, and influences share the same modal shell as settings."
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
        title="A debug panel for the team, built into the product"
      >
        <p>
          COROS&rsquo;s coaching quality depends on a retrieval-and-memory pipeline: the
          model pulls in relevant past context before it responds. When a response went
          wrong, answering <em>&ldquo;what did the model actually see?&rdquo;</em> meant an
          engineer digging through logs.
        </p>
        <p>
          I designed a team-only panel, opened from any COROS response, that exposes the
          pipeline for that exact turn:
        </p>
        <ul>
          <li>
            <strong>The query and response pair</strong> under inspection, so the debugging
            session is anchored to a concrete exchange.
          </li>
          <li>
            <strong>Whether the model treated this as a new topic</strong> or a continuation
            of an earlier one.
          </li>
          <li>
            <strong>The short-term memory</strong>, turn by turn.
          </li>
          <li>
            <strong>The past context it retrieved</strong>, ranked by how relevant each piece
            was to the moment.
          </li>
          <li>
            <strong>The longer-term memory</strong> as the model sees it.
          </li>
        </ul>
        <CaseVideo
          src="/videos/design-system/retrieved-context-web-light.mp4"
          poster="/images/design-system/posters/retrieved-context-web-light.jpg"
          width={1440}
          height={936}
          title="The Retrieved Context panel on web, light theme"
          description="Navigating the Retrieved Context panel: the query and response pair, whether the model treated the turn as a new topic, expandable short-term memory turns, and the past context it retrieved."
          size="lg"
          tone="peach"
          caption="The panel in use: from the query and response pair into the model's context — new-topic handling, turn-by-turn short-term memory, and retrieved past context, one tab away."
        />
        <p>
          I was doing the prompt QA myself, so I designed the tool as its own primary user:
          every field answers a question I actually had during prompt iteration:
          &ldquo;did it treat this as a new topic when it should have?&rdquo; and &ldquo;why
          did it pull in <em>that</em> past session?&rdquo; It uses the same tokens and modal
          shell as settings, so it reads as a native surface, not a bolted-on debug console.
        </p>
        <CaseVideo
          src="/videos/design-system/my-memories-web-light.mp4"
          poster="/images/design-system/posters/my-memories-web-light.jpg"
          width={1440}
          height={936}
          title="The team-only My Memories tab on web, light theme"
          description="Scrolling the team-only My Memories tab in settings: the longer-term memory accordion, then dated session summaries the model keeps for each conversation."
          size="lg"
          tone="lavender"
          caption="My Memories (team-only): longer-term memory and dated session summaries, living in the same settings shell as every user-facing tab."
        />
        <p>
          The feature quietly changed how the team works: prompt regressions that used to be
          argued from vibes are now diagnosed from the panel.
        </p>
      </CaseSection>

      <CaseSection id="handoff" eyebrow="Impact" title="Handoff & outcomes">
        <p>
          Designs shipped with a markdown spec per surface (layout differences, component
          inventory, UX states, and edge cases) written to a consistent template so
          engineers always knew where to look. Documented sections were accepted by
          engineering with <strong>zero redesign requests</strong>.
        </p>
        <p>Results:</p>
        <ul>
          <li>
            <strong>Live in production</strong> at{" "}
            <a href="https://app.coros.ai" target="_blank" rel="noopener noreferrer">
              app.coros.ai
            </a>{" "}
            across web, iOS, and Android.
          </li>
          <li>
            <strong>55% of early signups return the next day</strong> and{" "}
            <strong>40% of registered users are weekly actives</strong> after launch, with
            the onboarding rework as a primary contributor.
          </li>
          <li>
            <strong>A published library the whole team builds on</strong>: the second
            designer and both engineers work from the same tokens, without detaching
            components.
          </li>
          <li>
            <strong>Review cycles cut from days to hours</strong>, aided by working HTML
            prototypes for contested decisions.
          </li>
        </ul>
      </CaseSection>

      <CaseSection id="learnings" eyebrow="Reflection" title="What I learned">
        <p>
          <strong>Token discipline is a social contract, not a Figma feature.</strong> It
          only holds if someone enforces it in review: the system&rsquo;s value came from
          the discipline, not the variables.
        </p>
        <p>
          <strong>Design the boring layer first.</strong> Weeks spent on color architecture
          before drawing a single screen felt slow at a pre-seed startup, and it turned out
          to be the highest-leverage decision of the project: every surface after it was
          faster than the one before.
        </p>
        <p>
          <strong>Internal users deserve product design too.</strong> The debug panel could
          have been a JSON dump; treating the team as real users produced a tool people
          actually open, and it made me a better prompt engineer, because I had to decide
          what information <em>mattered</em>.
        </p>
      </CaseSection>
    </CaseStudyLayout>
  );
}
