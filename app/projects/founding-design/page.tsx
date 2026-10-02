import type { Metadata } from "next";
import CaseSection from "@/components/case-study/CaseSection";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import OnboardingFlowDiagram from "@/components/case-study/OnboardingFlowDiagram";
import ProductIntro from "@/components/case-study/ProductIntro";
import QuoteCard from "@/components/case-study/QuoteCard";
import ImageFrame from "@/components/ImageFrame";
import PullQuote from "@/components/PullQuote";

export const metadata: Metadata = {
  title: "Founding AI Designer at COROS AI",
  description:
    "COROS AI's 0→1 onboarding and personality system: research, competitive analysis, and three features that shape how the AI coaches.",
};

const BRAND_GUIDE_ALTS = [
  "Logo section divider.",
  "Full gradient logo, blue to orange.",
  "Flat duo-tone logo, dark and electric blue.",
  "Solid fill logo, dark mode.",
  "Solid fill logo, light mode.",
  "Colors section divider.",
  "Colour system swatches.",
  "Gradients section divider.",
  "Brand gradient swatches.",
  "Typography section divider.",
  "Logo font: Clash Display Bold.",
  "DM Sans heading scale.",
];

export default function FoundingDesign() {
  return (
    <CaseStudyLayout
      slug="founding-design"
      eyebrow="COROS AI · Case Study"
      title="Founding designer: shaping the product and the AI together"
      summary="How COROS AI learned to gather context before it coaches: three onboarding features, the prompt architecture behind them, and the brand around them."
      stats={[
        { value: "3", label: "features shipped 0→1" },
        { value: "55%", label: "next-day return" },
        { value: "40%", label: "weekly active users" },
      ]}
      meta={[
        { label: "Role", value: "AI Designer · Founding Employee" },
        { label: "Timeline", value: "June 2025 – Aug 2026" },
        { label: "Company", value: "COROS AI" },
        { label: "Focus", value: "Product · UX · AI · Research · Brand" },
      ]}
      productIntro={<ProductIntro />}
    >
      <CaseSection id="context" eyebrow="Context" title="Founding designer at COROS AI">
        <p>
          COROS AI is an ontological coaching platform that helps professionals navigate
          moods, repair relationships, and take action when they&rsquo;re stuck.
        </p>
        <p>
          I joined as the founding designer after a 2-month apprenticeship and owned product,
          UX, prompts, research, and brand.
        </p>
        <ImageFrame
          src="/images/founding-design/chat/web-chat.png"
          width={1520}
          height={953}
          alt="COROS AI desktop chat: the coach challenges a user's avoidance in a candid, provocative tone, referencing their Self and Belonging life dimensions."
          caption="The desktop chat references a user's life dimensions in real time."
          size="lg"
        />
        <div className="my-8 grid grid-cols-3 gap-3 sm:gap-4">
          <ImageFrame
            src="/images/founding-design/chat/mobile-1-home.png"
            width={401}
            height={860}
            alt="COROS AI mobile home screen: 'What's on your mind?' with a message being typed into the composer."
            caption="1 · Home"
            flush
          />
          <ImageFrame
            src="/images/founding-design/chat/mobile-2-user-message.png"
            width={401}
            height={860}
            alt="COROS AI mobile chat: the user has sent a message about working overtime and feeling stuck, and the coach is preparing a reply."
            caption="2 · The user opens up"
            flush
          />
          <ImageFrame
            src="/images/founding-design/chat/mobile-3-ai-response.png"
            width={401}
            height={860}
            alt="COROS AI mobile chat: the coach reflects the user's exhaustion back and asks clarifying questions to understand before advising."
            caption="3 · The coach responds"
            flush
          />
        </div>
        <ImageFrame
          src="/images/founding-design/chat/input-box.png"
          width={842}
          height={192}
          alt="The COROS AI chat composer: a 'What's on your mind?' prompt above an input field with a send button."
          caption="The composer: the front door to every conversation."
          size="sm"
        />
      </CaseSection>

      <CaseSection
        id="research-interviews"
        eyebrow="Research #1 · User interviews"
        title="Users said the AI coached too fast"
      >
        <QuoteCard>
          It feels like it&rsquo;s jumping ahead. I haven&rsquo;t even explained everything yet.
        </QuoteCard>
        <QuoteCard>It just hits all at once and makes me feel kind of awful.</QuoteCard>
        <p>
          Guidance felt rushed and misaligned with users&rsquo; emotional readiness and
          personal context.
        </p>
      </CaseSection>

      <CaseSection
        id="competitive-analysis"
        eyebrow="Research #2 · Competitive analysis"
        title="Auditing how other AI products onboard"
      >
        <ImageFrame
          src="/images/founding-design/research/competitive-analysis.png"
          width={1472}
          height={754}
          alt="A competitive-analysis board comparing the onboarding flows of Pi, Duolingo, Headspace, Clementine, and Claude, screen by screen."
          caption="Pi, Duolingo, Headspace, Clementine, and Claude, screen by screen."
          size="full"
        />
        <p>
          Most conversational AIs gather context in onboarding, then treat it as static.
        </p>
      </CaseSection>

      <CaseSection
        id="flow"
        eyebrow="Solution"
        title="Designing the interface and the AI together"
      >
        <OnboardingFlowDiagram />
        <p className="text-caption text-ink-muted">
          Eight steps, an optional Influences detour, and one Back path.
        </p>
        <p>
          Three features let users define their context upfront, and I prompt engineered the
          AI to use it throughout coaching. Name comes first so every screen can address the
          user.
        </p>
      </CaseSection>

      <CaseSection
        id="dimensions"
        eyebrow="Feature #1"
        title="Mapping what matters in a user's life"
      >
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <ImageFrame
            src="/images/founding-design/dimensions/dimensions-hexagons.png"
            width={737}
            height={669}
            alt="Early Dimensions concept: a honeycomb of seven colour-coded hexagons (Work, Belonging, Health, Self, World, Family, Meaning) with short descriptions."
            caption="Before: colour distinguished each dimension."
            flush
          />
          <ImageFrame
            src="/images/founding-design/dimensions/dimensions-iterated.png"
            width={737}
            height={839}
            alt="Iterated Dimensions screen: uniform grey hexagons with a single selected dimension highlighted, a clear prompt, and a Continue button."
            caption="After: a calmer, selectable grid."
            flush
          />
        </div>
        <ImageFrame
          src="/images/founding-design/dimensions/dimensions-in-settings.png"
          width={640}
          height={267}
          alt="Personalization settings: 'Dimensions of Life' shown as selectable pills, with Self and Belonging chosen."
          caption="Dimensions stay editable in settings."
          size="md"
        />
        <p>
          Users pick the areas of life that matter most: Work, Family, Self, Health,
          Belonging, Meaning, World.
        </p>
        <p>
          The AI anchors guidance in them and tags which dimension each struggle belongs to,
          so users can track growth over time.
        </p>
      </CaseSection>

      <CaseSection id="influences" eyebrow="Feature #2" title="The people who shape a user">
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <ImageFrame
            src="/images/founding-design/influences/influences-chosen.png"
            width={822}
            height={306}
            alt="Influences step with selections: chips for Christianity and Simon Sinek in the field, and an active Continue button."
            caption="Chosen: the step advances."
            flush
          />
          <ImageFrame
            src="/images/founding-design/influences/influences-unselected.png"
            width={758}
            height={328}
            alt="Influences step with nothing selected: an empty search field and a 'Skip for now' button, since influences are optional."
            caption="Unselected: optional, so skippable."
            flush
          />
        </div>
        <ImageFrame
          src="/images/founding-design/influences/influences-dropdown.png"
          width={822}
          height={323}
          alt="Influences field with the suggestion dropdown open, listing Christianity, Simon Sinek, Brené Brown, Buddhism, and Mahatma Gandhi."
          caption="Typeahead spans thinkers, belief systems, and cultural figures."
          size="md"
        />
        <p>
          Users name the thinkers, belief systems, or frameworks that shape their worldview,
          such as Brené Brown, Rumi, Stoicism, or Islamic values.
        </p>
        <p>
          The AI references them sparingly, only when a specific quote or teaching would
          deepen a key coaching point.
        </p>
      </CaseSection>

      <CaseSection id="personality" eyebrow="Feature #3" title="Tuning the AI's personality">
        <div className="my-8 grid gap-4 sm:grid-cols-3">
          <ImageFrame
            src="/images/founding-design/personality/slider-supportive.png"
            width={401}
            height={177}
            alt="Personality slider set to Supportive, described as Calm · Gentle · Patient."
            caption="Supportive"
            flush
          />
          <ImageFrame
            src="/images/founding-design/personality/slider-balanced.png"
            width={401}
            height={177}
            alt="Personality slider set to Balanced, described as Grounded · Curious · Discerning."
            caption="Balanced"
            flush
          />
          <ImageFrame
            src="/images/founding-design/personality/slider-provocative.png"
            width={401}
            height={177}
            alt="Personality slider set to Provocative, described as Candid · Bold · Perturbing."
            caption="Provocative"
            flush
          />
        </div>
        <p>
          The original slider set coaching intensity. Each mode
          switches the entire AI prompt architecture.
        </p>
        <h3>Voice and tone rules</h3>
        <ul>
          <li>Supportive: calm, gentle, patient. Acknowledges first, then asks for context.</li>
          <li>Balanced: grounded, curious. Names what it hears and checks the read.</li>
          <li>Provocative: candid, bold. Closes the loop and asks for a commitment.</li>
        </ul>
        <h3>Iteration 1: cutting Supportive</h3>
        <ul>
          <li>Testing and stakeholders showed a coddling Supportive mode contradicted the framework.</li>
          <li>Ontological coaching challenges limiting beliefs to drive growth, leaving two modes.</li>
        </ul>
        <h3>Iteration 2: from slider to toggle</h3>
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <ImageFrame
            src="/images/founding-design/personality/slider-two-mode-supportive.png"
            width={462}
            height={140}
            alt="Two-mode personality slider with the handle at the Supportive end, between Supportive and Provocative labels."
            caption="Handle left: toward Supportive."
            flush
          />
          <ImageFrame
            src="/images/founding-design/personality/slider-two-mode-provocative.png"
            width={462}
            height={140}
            alt="Two-mode personality slider with the handle at the Provocative end, between Supportive and Provocative labels."
            caption="Handle right: toward Provocative."
            flush
          />
        </div>
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <ImageFrame
            src="/images/founding-design/personality/toggle-balanced.png"
            width={401}
            height={150}
            alt="Redesigned personality toggle set toward Supportive, described as Grounded · Curious · Discerning."
            caption="The toggle: two clear states."
            flush
          />
          <ImageFrame
            src="/images/founding-design/personality/toggle-provocative.png"
            width={401}
            height={150}
            alt="Redesigned personality toggle set to Provocative, described as Candid · Bold · Perturbing."
            caption="One deliberate choice."
            flush
          />
        </div>
        <ul>
          <li>Alpha testers called the slider &ldquo;binary&rdquo; and asked for radio buttons.</li>
          <li>I redesigned it as a Personality Toggle with two clear states.</li>
        </ul>
      </CaseSection>

      <CaseSection id="final-designs" eyebrow="Outcome" title="Final onboarding designs">
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <ImageFrame
            src="/images/founding-design/onboarding/01-welcome-signup.png"
            width={1520}
            height={826}
            alt="COROS AI welcome screen: Google sign-up with an 18-or-older confirmation, beside a 'Manage Moments of Crisis' example conversation."
            caption="1 · Welcome & sign-up"
            flush
          />
          <ImageFrame
            src="/images/founding-design/onboarding/02-intro.png"
            width={1520}
            height={826}
            alt="Onboarding intro: 'Hi, I'm COROS!' introducing the AI coach, with a 'Let's begin' button."
            caption="2 · Intro"
            flush
          />
          <ImageFrame
            src="/images/founding-design/onboarding/03-name.png"
            width={1520}
            height={826}
            alt="Onboarding name step: 'What would you like me to call you?' with a name field and Back / Continue buttons."
            caption="3 · Name"
            flush
          />
          <ImageFrame
            src="/images/founding-design/onboarding/04-transition.png"
            width={1520}
            height={826}
            alt="Starfield transition screen: 'Great, Arshita. Let's take a moment to look at what matters to you most right now.'"
            caption="4 · Transition"
            flush
          />
          <ImageFrame
            src="/images/founding-design/onboarding/05-dimensions.png"
            width={1520}
            height={826}
            alt="Seven-dimensions selection: hexagons for Work, Belonging, Health, Self, World, Family, and Meaning, with World selected."
            caption="5 · Dimensions"
            flush
          />
          <ImageFrame
            src="/images/founding-design/onboarding/06-influences.png"
            width={1520}
            height={826}
            alt="Influences step: 'choose any voices that influence your thinking,' with Simon Sinek added as a chip."
            caption="6 · Influences"
            flush
          />
          <ImageFrame
            src="/images/founding-design/onboarding/07-personality.png"
            width={1520}
            height={826}
            alt="Tone step: a Supportive–Provocative toggle set to Provocative (Candid · Bold · Perturbing)."
            caption="7 · Personality"
            flush
          />
          <ImageFrame
            src="/images/founding-design/onboarding/08-configuring.png"
            width={1520}
            height={826}
            alt="Completion screen: 'Configuring COROS AI around what matters to you,' with the COROS mark."
            caption="8 · Configuring"
            flush
          />
        </div>
        <p>
          Welcome, a light warm-up, then dimensions, influences, and personality as one
          system.
        </p>
      </CaseSection>

      <CaseSection id="design-system" eyebrow="Craft" title="Design system snippets">
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <ImageFrame
            src="/images/founding-design/settings/personalization.png"
            width={921}
            height={736}
            alt="Personalization settings: AI response tone toggle, editable Dimensions of Life pills, and an Influences field."
            caption="Personalization settings."
            flush
          />
          <ImageFrame
            src="/images/founding-design/settings/subscription.png"
            width={921}
            height={736}
            alt="Subscription settings: a $100-per-month plan with next billing date, and Cancel / Update subscription buttons."
            caption="Subscription settings."
            flush
          />
        </div>
        <ImageFrame
          src="/images/founding-design/settings/personalization-influences-open.png"
          width={921}
          height={736}
          alt="Personalization settings with the Influences dropdown open, showing selected chips and a suggestion list."
          caption="Influences typeahead open."
          size="md"
        />
        <ImageFrame
          src="/images/founding-design/system/buttons.png"
          width={3398}
          height={1399}
          alt="A button specimen sheet: contained, outlined, and text variants across Primary, Secondary, Error, Warning, Info, Success, and Inherit intents, in large, medium, and small sizes with enabled, hovered, focused, pressed, and disabled states."
          caption="Buttons: every variant, intent, size, and state."
          size="full"
        />
        <div className="my-8 grid gap-4 sm:grid-cols-2 sm:items-start">
          <ImageFrame
            src="/images/founding-design/system/input-boxes.png"
            width={1284}
            height={1656}
            alt="An input-field specimen sheet: standard, filled, and outlined inputs in medium and small sizes, across enabled, hovered, focused, disabled, and error states, with and without a value."
            caption="Inputs across sizes and states."
            flush
          />
          <ImageFrame
            src="/images/founding-design/system/fab-buttons.png"
            width={1552}
            height={3116}
            alt="A floating-action-button specimen sheet: extended and round FABs across default, primary, secondary, and inherit styles, in large, medium, and small sizes and every interaction state, with and without an icon."
            caption="Extended and round action buttons."
            flush
          />
        </div>
        <p>
          Every component is specified as a full matrix for engineering.
        </p>
      </CaseSection>

      <CaseSection id="brand" eyebrow="Visual identity" title="Designing a brand">
        <ImageFrame
          src="/images/founding-design/research/brand-moodboard.png"
          width={2820}
          height={3620}
          alt="A brand-research moodboard collecting circular, portal, and swirl logo references and 'Hello I'm COROS' framing explorations."
          caption="Moodboard: circular, portal-like references."
          size="md"
        />
        <ImageFrame
          src="/images/founding-design/research/logo-ideation.png"
          width={11382}
          height={6640}
          alt="A wide logo-ideation board with dozens of exploratory sketches: circles, orbits, atoms, and gradient orbs."
          caption="Ideation: dozens of directions for the mark."
          size="full"
        />
        <ImageFrame
          src="/images/founding-design/research/logo-iterations.png"
          width={4192}
          height={3762}
          alt="A grid iterating the chosen crescent-and-droplet mark across construction guides and colour gradients on light and dark backgrounds."
          caption="Iteration: refining the mark and its colour."
          size="full"
        />
        <ImageFrame
          src="/images/founding-design/research/final-logos.png"
          width={3362}
          height={3159}
          alt="Final COROS AI logo lockups: the crescent mark with the COROS AI wordmark in blue, black, and white on light and dark backgrounds."
          caption="Final lockups for light and dark surfaces."
          size="lg"
        />
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          {BRAND_GUIDE_ALTS.map((alt, i) => {
            const n = String(i + 1).padStart(2, "0");
            return (
              <ImageFrame
                key={n}
                src={`/images/founding-design/brand-guide/page-${n}.png`}
                width={1920}
                height={1080}
                alt={alt}
                flush
              />
            );
          })}
        </div>
        <p>
          I led the brand and logo end to end, then documented it in a complete brand guide.
        </p>
      </CaseSection>

      <CaseSection id="pitch-deck" eyebrow="Fundraising" title="Investment pitch deck">
        <ImageFrame
          src="/images/founding-design/investment-pitch-deck/cover.png"
          width={1920}
          height={1080}
          alt="The COROS AI investment presentation cover slide."
          caption="The cover carries the brand into the raise."
          size="lg"
        />
        <div className="my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 10 }, (_, i) => {
            const n = String(i + 1).padStart(2, "0");
            return (
              <ImageFrame
                key={n}
                src={`/images/founding-design/investment-pitch-deck/slide-${n}.png`}
                width={1920}
                height={1080}
                alt={`Investment pitch deck, slide ${i + 1}.`}
                caption={`Slide ${i + 1}`}
                flush
              />
            );
          })}
        </div>
        <p>I also designed the investment pitch deck.</p>
      </CaseSection>

      <CaseSection id="reflection" eyebrow="Reflection" title="Takeaways">
        <ul>
          <li>Involve engineers early, and ideas ship.</li>
          <li>Propose directions, test quickly, and adjust as requirements shift.</li>
          <li>Users&rsquo; own words keep the work honest.</li>
        </ul>
        <PullQuote>
          COROS taught me how to design under pressure, and how to stay focused on what
          matters when everything around you is moving fast.
        </PullQuote>
      </CaseSection>
    </CaseStudyLayout>
  );
}
