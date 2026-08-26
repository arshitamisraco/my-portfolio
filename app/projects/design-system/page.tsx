import type { Metadata } from "next";
import CaseVideo from "@/components/CaseVideo";
import CaseSection from "@/components/case-study/CaseSection";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import HeroMontage from "@/components/case-study/HeroMontage";
import ImageFrame from "@/components/ImageFrame";
import PullQuote from "@/components/PullQuote";

export const metadata: Metadata = {
  title: "COROS AI Redesign: MUI → shadcn",
  description:
    "Rebuilding the entire COROS AI product UI and its design system: 54+ semantic tokens in light and dark, every core surface redesigned, live on web, iOS, and Android.",
};

const STATS = [
  {
    value: "54+",
    label: "semantic tokens, light and dark",
    bg: "bg-lavender-soft",
  },
  {
    value: "Days → hours",
    label: "design-to-review cycles",
    bg: "bg-sky-soft",
  },
  {
    value: "4",
    label: "platforms: web, tablet, iOS, Android",
    bg: "bg-mint-soft",
  },
];

export default function DesignSystem() {
  return (
    <CaseStudyLayout
      slug="design-system"
      eyebrow="COROS AI · Case Study"
      title="COROS AI Redesign: MUI → shadcn"
      summary="AI life coaching app. I rebuilt the entire product UI and its design system, live on web, iOS, and Android."
      highlight={{ stat: "Live in production on web, iOS, and Android" }}
      meta={[
        {
          label: "Role",
          value: "Product Designer",
        },
        {
          label: "Ownership",
          value: "Design system owner",
        },
        { label: "Platforms", value: "4 platforms: web, tablet, iOS, Android" },
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
                app.coros.ai
              </a>
              {" · "}
              <a
                href="https://www.figma.com/design/m1CDYr9xf00a2oj3gDDAt8/COROS-AI-Design-system?node-id=4562-26816"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-deep underline decoration-accent underline-offset-2 hover:decoration-accent-deep"
              >
                Figma
              </a>
            </>
          ),
        },
      ]}
      hero={
        <HeroMontage
          label="The live product, in light and dark"
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
      }
    >
      {/* Scope at a glance — a numeric read after the visual hero. */}
      <section aria-label="At a glance" className="mb-14">
        <p className="text-style-eyebrow text-ink-muted">At a glance</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3 sm:gap-4">
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

      <CaseSection id="problem" eyebrow="Context" title="The problem">
        <p>
          Testers said the v1 product strained their eyes. Engineering was moving to
          shadcn, and I owned the design side of the migration.
        </p>
      </CaseSection>

      <CaseSection id="tokens" eyebrow="Foundation" title="Design system">
        <p>
          One rule: components never touch raw colors. Everything resolves through
          primitives → brand layer → semantic tokens, mirroring the code exactly.
        </p>
        <PullQuote>
          Raw primitives → Brand layer → Semantic tokens → Components
        </PullQuote>
        <div className="my-8">
          <div className="grid gap-3 sm:grid-cols-2 sm:items-center sm:gap-4">
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
          </div>
          <p className="mt-3 text-caption text-ink-muted">
            The system in Figma: semantic colors holding a value per token for both light
            and dark modes, and typography resolving through shared font definitions.
          </p>
        </div>
        <ul>
          <li>
            Custom 11-stop scales for COROS blue, orange, and blue-tinted neutrals.
          </li>
          <li>
            54+ tokens across light and dark via Figma variable modes: design once, toggle
            themes with one click.
          </li>
          <li>
            Published as a shared library; the whole team builds on it without detaching.
          </li>
        </ul>
      </CaseSection>

      <CaseSection id="components" eyebrow="Architecture" title="Components">
        <p>
          Variants only when structure changes. Everything else is a property. The chat
          input handles 4 states × all breakpoints without a variant explosion.
        </p>
      </CaseSection>

      <CaseSection id="onboarding" eyebrow="Screens" title="Onboarding">
        <p>
          8 dark-only screens → 6 themed screens, name moved up front so the flow addresses
          you personally.
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
          caption="Welcome through Loading on web (dark theme), including the greeting that rotates through nine languages and the tone selection."
        />
        <p>
          The tone screen teaches by interaction: pick Supportive or Provocative and the
          orb, card, and background respond.
        </p>
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
            The same flow on mobile (light theme): the multilingual welcome, the tone cards
            with their orbs, and the dimension pills. Every screen was designed for web,
            tablet, iOS, and Android at once.
          </p>
        </div>
      </CaseSection>

      <CaseSection id="chat" eyebrow="Screens" title="Chat">
        <p>
          Designed the full state inventory: empty, streaming, errors, message actions,
          return-to-chat. Prototyped 3 user-bubble options in working HTML to settle the
          debate.
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
          caption="Chat on web (dark theme): the greeting, a streamed reply, and the message actions beneath each COROS response."
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
            actions, the inline tone quick-switch, and composing a message. One component
            system, both themes.
          </p>
        </div>
      </CaseSection>

      <CaseSection id="settings" eyebrow="Screens" title="Settings">
        <p>
          Modal shell with persistent nav. Appearance toggle moved into the sidebar so
          switching themes never requires navigating.
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
          caption="Personalization on web (light theme): tone, dimensions, and influences share the same modal shell."
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
            The settings shell on mobile: the sidebar flyout, the profile and Account
            group, and Connected accounts expanding inline rather than pushing to a new
            screen.
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
            type-to-confirm delete dialog on its own destructive token.
          </p>
        </div>
      </CaseSection>

      <CaseSection
        id="retrieved-context"
        eyebrow="Feature"
        title="Retrieved Context panel (team-only)"
      >
        <p>
          My favorite piece. Debugging the AI meant engineers digging through logs. I
          designed an in-product panel that shows exactly what the model saw for any
          response:
        </p>
        <ul>
          <li>Retrieved sessions with semantic and recency scores.</li>
          <li>Session-boundary probability.</li>
          <li>Chunk results.</li>
          <li>Memory.</li>
        </ul>
        <p>
          I did prompt QA myself, so I designed it as my own user. Every field answers a
          question I actually had.
        </p>
        <ImageFrame
          src="/images/design-system/my-memories-settings-web-light.png"
          width={3024}
          height={1964}
          alt="The team-only My Memories tab in settings, showing Biographical memory and Session History rows in the same modal shell as every user-facing tab."
          size="lg"
          tone="lavender"
          caption="My Memories (team-only): biographical memory and session history, in the same settings shell as every user-facing tab."
        />
      </CaseSection>

      <CaseSection id="results" eyebrow="Impact" title="Results">
        <ul>
          <li>
            <strong>Live in production on 4 platforms</strong> at{" "}
            <a href="https://app.coros.ai" target="_blank" rel="noopener noreferrer">
              app.coros.ai
            </a>
            .
          </li>
          <li>
            <strong>Zero redesign requests</strong> on documented handoff specs.
          </li>
          <li>
            <strong>A library the whole team ships from</strong>.
          </li>
        </ul>
      </CaseSection>
    </CaseStudyLayout>
  );
}
