import type { Metadata } from "next";
import CaseVideo from "@/components/CaseVideo";
import CaseSection from "@/components/case-study/CaseSection";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import HeroMontage from "@/components/case-study/HeroMontage";
import ProductIntro from "@/components/case-study/ProductIntro";
import StateInventory from "@/components/case-study/StateInventory";
import ToneComparison from "@/components/case-study/ToneComparison";
import ImageFrame from "@/components/ImageFrame";

export const metadata: Metadata = {
  title: "COROS AI Redesign: MUI → shadcn",
  description:
    "The COROS AI product UI and design system, live on web, iOS, and Android.",
};

const CHAT_STATES = [
  {
    state: "Empty state",
    trigger: "A new conversation.",
    sees: "The greeting and the composer.",
  },
  {
    state: "Typing indicator",
    trigger: "Sent, awaiting the model.",
    sees: "An indicator for the wait.",
  },
  {
    state: "Streaming text",
    trigger: "The response arrives.",
    sees: "Text building in the bubble.",
  },
  {
    state: "Message-level actions",
    trigger: "A response completes.",
    sees: "Read-aloud and flag actions.",
  },
  {
    state: "Error and retry",
    trigger: "The response fails.",
    sees: "The failure in place, with retry.",
  },
  {
    state: "Scrolled away mid-response",
    trigger: "The user scrolls up mid-response.",
    sees: "A return-to-chat button.",
  },
];

export default function DesignSystem() {
  return (
    <CaseStudyLayout
      slug="design-system"
      eyebrow="COROS AI · Case Study"
      title="COROS AI Redesign: MUI → shadcn"
      summary="Testers said v1 strained their eyes. As engineering moved to shadcn, I rebuilt the COROS AI product UI and its design system, live on web, iOS, and Android."
      stats={[
        { value: "3", label: "platforms live in production" },
        { value: "54+", label: "semantic tokens" },
        { value: "0", label: "redesign requests on handoff specs" },
      ]}
      meta={[
        { label: "Role", value: "Product Designer" },
        { label: "Ownership", value: "Design system owner" },
        { label: "Platforms", value: "Designed for 4: web, tablet, iOS, Android" },
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
      productIntro={<ProductIntro />}
      hero={
        <HeroMontage
          label="The live product"
          portrait={[
            {
              src: "/videos/design-system/onboarding-mobile-light.mp4",
              poster: "/images/design-system/posters/onboarding-mobile-light.jpg",
              width: 640,
              height: 1392,
              title: "Mobile onboarding",
              description: "Onboarding on mobile.",
            },
            {
              src: "/videos/design-system/chat-mobile-light.mp4",
              poster: "/images/design-system/posters/chat-mobile-light.jpg",
              width: 640,
              height: 1392,
              title: "Mobile chat",
              description: "Sending a chat message.",
            },
            {
              src: "/videos/design-system/influences-mobile-light.mp4",
              poster: "/images/design-system/posters/influences-mobile-light.jpg",
              width: 640,
              height: 1392,
              title: "Mobile influences",
              description: "Searching influences.",
            },
          ]}
          landscape={[
            {
              src: "/videos/design-system/landing-web-light.mp4",
              poster: "/images/design-system/posters/landing-web-light.jpg",
              width: 1440,
              height: 936,
              title: "First open on web",
              description: "The greeting streaming in.",
            },
            {
              src: "/videos/design-system/dictation-web-light.mp4",
              poster: "/images/design-system/posters/dictation-web-light.jpg",
              width: 1440,
              height: 936,
              title: "Dictation on web",
              description: "Dictating a message.",
            },
          ]}
        />
      }
    >
      <CaseSection id="tokens" eyebrow="Foundation" title="Tokens that mirror the code">
        <div className="my-8">
          <div className="grid gap-3 sm:grid-cols-2 sm:items-center sm:gap-4">
            <ImageFrame
              src="/images/design-system/figma/tokens-semantic-colors.png"
              width={1882}
              height={1890}
              alt="Figma variables editor showing the semantic colors collection with a shadcn (light) column and a shadcn-dark column, each token resolving to a brand-neutrals, brand-shades, coros-green, or coros-red reference."
              size="full"
              flush
            />
            <ImageFrame
              src="/images/design-system/figma/tokens-typography.png"
              width={1489}
              height={1890}
              alt="Figma variables editor showing the typography collection: font definitions for sans, serif, headings, body, and monospace, plus heading scales with weight, size, line-height, and letter-spacing tokens."
              size="full"
              flush
            />
          </div>
        </div>
        <ul>
          <li>Colors resolve through primitives, brand layer, then semantic tokens.</li>
          <li>Custom 11-stop scales for COROS blue, orange, and neutrals.</li>
          <li>54+ tokens in light and dark, published as a shared library.</li>
          <li>Variants only when structure changes: the chat input handles 4 states.</li>
        </ul>
      </CaseSection>

      <CaseSection id="onboarding" eyebrow="Screens" title="Eight onboarding screens became six">
        <CaseVideo
          src="/videos/design-system/onboarding-web-dark.mp4"
          poster="/images/design-system/posters/onboarding-web-dark.jpg"
          width={1440}
          height={936}
          title="Onboarding, web dark"
          description="The six-screen onboarding."
          size="lg"
          mode="click"
          caption="The greeting rotates through nine languages."
        />
        <div className="my-8">
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            <CaseVideo
              src="/videos/design-system/onboarding-mobile-light.mp4"
              poster="/images/design-system/posters/onboarding-mobile-light.jpg"
              width={640}
              height={1392}
              title="Onboarding, mobile"
              description="The mobile welcome."
              size="mobile"
              mode="click"
              flush
            />
            <ImageFrame
              src="/images/design-system/mobile/personalization-tone.png"
              width={1206}
              height={2622}
              alt="Mobile tone selection with Supportive and Provocative cards, each carrying an animated orb."
              size="mobile"
              flush
            />
            <ImageFrame
              src="/images/design-system/mobile/personalization-dimensions.png"
              width={1206}
              height={2622}
              alt="Mobile dimensions selection with seven pill options, several selected."
              size="mobile"
              flush
            />
          </div>
          <p className="mt-3 text-caption text-ink-muted">
            Mobile, light theme.
          </p>
        </div>
        <p>
          8 dark-only screens became 6 themed ones, with the name moved up front. On the
          tone screen, the orb and card respond.
        </p>
      </CaseSection>

      <CaseSection id="chat" eyebrow="Screens" title="Chat, designed state by state">
        <CaseVideo
          src="/videos/design-system/chat-web-dark.mp4"
          poster="/images/design-system/posters/chat-web-dark.jpg"
          width={1440}
          height={936}
          title="Chat, web dark"
          description="A coaching exchange with message actions."
          size="lg"
          mode="click"
          caption="Chat on web, dark theme."
        />
        <div className="my-8">
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            <ImageFrame
              src="/images/design-system/mobile/chat-conversation.png"
              width={1206}
              height={2622}
              alt="Mobile chat in light mode showing date dividers and read-aloud and flag actions beneath a COROS message."
              size="mobile"
              flush
            />
            <ImageFrame
              src="/images/design-system/mobile/chat-tone-switch.png"
              width={1206}
              height={2622}
              alt="Mobile chat with an inline tone quick-switch popover offering Supportive, Provocative, and More Personalization."
              size="mobile"
              flush
            />
            <CaseVideo
              src="/videos/design-system/chat-mobile-light.mp4"
              poster="/images/design-system/posters/chat-mobile-light.jpg"
              width={640}
              height={1392}
              title="Chat, mobile"
              description="Sending a message."
              size="mobile"
              flush
            />
          </div>
          <p className="mt-3 text-caption text-ink-muted">
            Message actions, tone quick-switch, composing.
          </p>
        </div>
        <p>I prototyped 3 user-bubble options in working HTML to settle a debate.</p>
        <h3>Every state a conversation can be in</h3>
        <StateInventory rows={CHAT_STATES} />
      </CaseSection>

      <CaseSection id="settings" eyebrow="Screens" title="Settings in one modal shell">
        <CaseVideo
          src="/videos/design-system/settings-web-light.mp4"
          poster="/images/design-system/posters/settings-web-light.jpg"
          width={1440}
          height={936}
          title="Settings, web"
          description="Moving between Account and Data control."
          size="lg"
          caption="Persistent nav; the Appearance toggle sits in the sidebar."
        />
        <CaseVideo
          src="/videos/design-system/personalization-web-light.mp4"
          poster="/images/design-system/posters/personalization-web-light.jpg"
          width={1440}
          height={936}
          title="Personalization, web"
          description="Tone, dimensions, and influences."
          size="lg"
          caption="Same modal shell."
        />
        <div className="my-8">
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            <ImageFrame
              src="/images/design-system/mobile/sidebar-flyout.png"
              width={1206}
              height={2622}
              alt="Mobile sidebar flyout with search chats, send feedback, and the user profile pinned at the bottom."
              size="mobile"
              flush
            />
            <ImageFrame
              src="/images/design-system/mobile/settings-account.png"
              width={1206}
              height={2622}
              alt="Mobile settings modal showing the profile header and the Account group."
              size="mobile"
              flush
            />
            <ImageFrame
              src="/images/design-system/mobile/settings-connected-accounts.png"
              width={1206}
              height={2622}
              alt="Mobile settings with Connected accounts expanded inline, listing Google, LinkedIn, Microsoft, and Apple."
              size="mobile"
              flush
            />
          </div>
          <p className="mt-3 text-caption text-ink-muted">
            Sidebar flyout, Account, inline Connected accounts.
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
              flush
            />
            <ImageFrame
              src="/images/design-system/mobile/personalization-influences-selected.png"
              width={1206}
              height={2622}
              alt="Mobile influences with selected chips: Martin Heidegger, Barbie Doll, and Brené Brown."
              size="mobile"
              flush
            />
            <ImageFrame
              src="/images/design-system/mobile/settings-delete-confirm.png"
              width={1206}
              height={2622}
              alt="Mobile delete-account confirmation dialog requiring the user to type delete, its confirm button on the destructive token."
              size="mobile"
              flush
            />
          </div>
          <p className="mt-3 text-caption text-ink-muted">
            Influences search, chips, type-to-confirm delete.
          </p>
        </div>
              </CaseSection>

      <CaseSection id="retrieved-context" eyebrow="Feature" title="A team-only Retrieved Context panel">
        <ImageFrame
          src="/images/design-system/my-memories-settings-web-light.png"
          width={3024}
          height={1964}
          alt="The team-only My Memories tab in settings, showing Biographical memory and Session History rows in the same modal shell as every user-facing tab."
          size="lg"
          caption="My Memories, in the settings shell."
        />
        <p>
          Debugging the AI meant digging through logs. For my own prompt QA, I
          designed a panel showing what the model saw:
        </p>
        <ul>
          <li>Retrieved sessions with semantic and recency scores.</li>
          <li>Session-boundary probability.</li>
          <li>Chunk results.</li>
          <li>Memory.</li>
        </ul>
      </CaseSection>

      <CaseSection id="tone" eyebrow="Tone" title="One system, two voices">
        <ToneComparison
          userMessage="I feel like I'm working overtime every single day, but my team just keeps giving me grunt work and I'm so pissed off."
          supportive="I hear you. How are you doing as you bring this up? What's happening at work?"
          provocative="Are you going to do it or not?"
        />
        <p>
          Tone swaps the response architecture: one reply asks for context, the other for a
          decision.
        </p>
      </CaseSection>

      <CaseSection id="results" eyebrow="Impact" title="Results">
        <ul>
          <li>
            <strong>Live in production on web, iOS, and Android</strong> at{" "}
            <a href="https://app.coros.ai" target="_blank" rel="noopener noreferrer">
              app.coros.ai
            </a>
            .
          </li>
          <li>
            <strong>Days to hours</strong> for design-to-review cycles.
          </li>
          <li>
            <strong>Zero redesign requests</strong> on documented handoff specs.
          </li>
        </ul>
      </CaseSection>
    </CaseStudyLayout>
  );
}
