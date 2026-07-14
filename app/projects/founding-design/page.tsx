import type { Metadata } from "next";
import CaseSection from "@/components/case-study/CaseSection";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import QuoteCard from "@/components/case-study/QuoteCard";
import ImageFrame from "@/components/ImageFrame";
import PullQuote from "@/components/PullQuote";

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
  { id: "dimensions", label: "Feature 1: Life mapping" },
  { id: "influences", label: "Feature 2: Relationships" },
  { id: "personality", label: "Feature 3: Personality" },
  { id: "final-designs", label: "Final designs" },
  { id: "design-system", label: "Design system" },
  { id: "brand", label: "Logo & brand" },
  { id: "pitch-deck", label: "Investment pitch deck" },
  { id: "reflection", label: "Reflection" },
];

export default function FoundingDesign() {
  return (
    <CaseStudyLayout
      slug="founding-design"
      eyebrow="COROS AI · Case Study"
      title="Founding designer: shaping the product and the AI together"
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
          moods, repair relationships, and take action when they&rsquo;re stuck, built on
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
            <strong>Product design</strong>: three flagship features (Dimensions,
            Influences, Personality Slider)
          </li>
          <li>
            <strong>UX design</strong>: end-to-end UX/UI (onboarding, chat interface,
            settings)
          </li>
          <li>
            <strong>AI</strong>: prompt engineering, memory algorithm design, RAG
            optimization
          </li>
          <li>
            <strong>User research</strong>: user interviews, user testing
          </li>
          <li>
            <strong>Visual identity</strong>: logo, brand, and design system
          </li>
        </ul>
        <p>
          The product itself is a conversation: users bring a real moment, and COROS coaches
          through it, on desktop and mobile.
        </p>
        <ImageFrame
          src="/images/founding-design/chat/web-chat.png"
          width={1520}
          height={953}
          alt="COROS AI desktop chat: the coach challenges a user's avoidance in a candid, provocative tone, referencing their Self and Belonging life dimensions."
          caption="The COROS AI chat on desktop: coaching that references a user's life dimensions in real time."
          size="lg"
          tone="lavender"
        />
        <div className="my-8 grid grid-cols-3 gap-3 sm:gap-4">
          <ImageFrame
            src="/images/founding-design/chat/mobile-1-home.png"
            width={401}
            height={860}
            alt="COROS AI mobile home screen: 'What's on your mind?' with a message being typed into the composer."
            caption="1 · Home"
            flush
            tone="sky"
          />
          <ImageFrame
            src="/images/founding-design/chat/mobile-2-user-message.png"
            width={401}
            height={860}
            alt="COROS AI mobile chat: the user has sent a message about working overtime and feeling stuck, and the coach is preparing a reply."
            caption="2 · The user opens up"
            flush
            tone="sky"
          />
          <ImageFrame
            src="/images/founding-design/chat/mobile-3-ai-response.png"
            width={401}
            height={860}
            alt="COROS AI mobile chat: the coach reflects the user's exhaustion back and asks clarifying questions to understand before advising."
            caption="3 · The coach responds"
            flush
            tone="sky"
          />
        </div>
        <ImageFrame
          src="/images/founding-design/chat/input-box.png"
          width={842}
          height={192}
          alt="The COROS AI chat composer: a 'What's on your mind?' prompt above an input field with a send button."
          caption="The chat composer: the front door to every coaching conversation."
          size="sm"
          tone="pink"
        />
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
          The problem: the AI coached before understanding users, so guidance felt rushed,
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
        <ImageFrame
          src="/images/founding-design/research/competitive-analysis.png"
          width={1472}
          height={754}
          alt="A competitive-analysis board comparing the onboarding flows of Pi, Duolingo, Headspace, Clementine, and Claude, screen by screen."
          caption="Auditing how Pi, Duolingo, Headspace, Clementine, and Claude gather context during onboarding."
          size="full"
          tone="sky"
        />
      </CaseSection>

      <CaseSection
        id="solution"
        eyebrow="Solution"
        title="Designing the interface and the AI together"
      >
        <p>
          The solution wasn&rsquo;t just introducing an onboarding flow; it was designing
          how the AI gathers and uses context to coach effectively. I created three core
          features that let users define their context upfront, then prompt engineered
          the AI to reference this information throughout coaching conversations.
        </p>
      </CaseSection>

      <CaseSection
        id="dimensions"
        eyebrow="Feature #1"
        title="Mapping what matters in a user's life"
      >
        <p>
          Dimensions lets users declare which areas of life matter most to them:{" "}
          <strong>Work, Family, Self, Health, Belonging, Meaning, World.</strong>
        </p>
        <p>
          <strong>How it works:</strong> users select their focus areas during
          onboarding. Throughout coaching conversations, the AI references these
          dimensions to anchor guidance in what&rsquo;s personally relevant, while also
          identifying which dimension a current struggle relates to, helping users see
          how challenges map across their life and track growth in specific areas over
          time.
        </p>
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <ImageFrame
            src="/images/founding-design/dimensions/dimensions-hexagons.png"
            width={737}
            height={669}
            alt="Early Dimensions concept: a honeycomb of seven colour-coded hexagons (Work, Belonging, Health, Self, World, Family, Meaning) with short descriptions."
            caption="Before: the first concept leaned on colour to distinguish dimensions."
            flush
            tone="pink"
          />
          <ImageFrame
            src="/images/founding-design/dimensions/dimensions-iterated.png"
            width={737}
            height={839}
            alt="Iterated Dimensions screen: uniform grey hexagons with a single selected dimension highlighted, a clear prompt, and a Continue button."
            caption="After: a calmer, selectable grid with a single highlight state."
            flush
            tone="lavender"
          />
        </div>
        <ImageFrame
          src="/images/founding-design/dimensions/dimensions-in-settings.png"
          width={640}
          height={267}
          alt="Personalization settings: 'Dimensions of Life' shown as selectable pills, with Self and Belonging chosen."
          caption="Post-onboarding, dimensions stay editable in settings as a user's priorities shift."
          size="md"
          tone="sky"
        />
      </CaseSection>

      <CaseSection id="influences" eyebrow="Feature #2" title="The people who shape a user">
        <p>
          Influences lets users declare the thinkers, belief systems, or frameworks that
          shape their worldview, for example Brené Brown, Rumi, Stoicism, or Islamic
          values.
        </p>
        <p>
          <strong>How it works:</strong> users select their influences during onboarding.
          The AI references them sparingly and strategically, only when a specific quote
          or teaching would significantly deepen a key coaching point.
        </p>
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <ImageFrame
            src="/images/founding-design/influences/influences-chosen.png"
            width={822}
            height={306}
            alt="Influences step with selections: chips for Christianity and Simon Sinek in the field, and an active Continue button."
            caption="Chosen: with influences added, the step advances."
            flush
            tone="lavender"
          />
          <ImageFrame
            src="/images/founding-design/influences/influences-unselected.png"
            width={758}
            height={328}
            alt="Influences step with nothing selected: an empty search field and a 'Skip for now' button, since influences are optional."
            caption="Unselected: influences are optional, so the step can be skipped."
            flush
            tone="pink"
          />
        </div>
        <ImageFrame
          src="/images/founding-design/influences/influences-dropdown.png"
          width={822}
          height={323}
          alt="Influences field with the suggestion dropdown open, listing Christianity, Simon Sinek, Brené Brown, Buddhism, and Mahatma Gandhi."
          caption="Typeahead suggestions span thinkers, belief systems, and cultural figures."
          size="md"
          tone="sky"
        />
      </CaseSection>

      <CaseSection
        id="personality"
        eyebrow="Feature #3"
        title="Tuning the AI's personality"
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
        <div className="my-8 grid gap-4 sm:grid-cols-3">
          <ImageFrame
            src="/images/founding-design/personality/slider-supportive.png"
            width={401}
            height={177}
            alt="Personality slider set to Supportive, described as Calm · Gentle · Patient."
            caption="Supportive"
            flush
            tone="sky"
          />
          <ImageFrame
            src="/images/founding-design/personality/slider-balanced.png"
            width={401}
            height={177}
            alt="Personality slider set to Balanced, described as Grounded · Curious · Discerning."
            caption="Balanced"
            flush
            tone="butter"
          />
          <ImageFrame
            src="/images/founding-design/personality/slider-provocative.png"
            width={401}
            height={177}
            alt="Personality slider set to Provocative, described as Candid · Bold · Perturbing."
            caption="Provocative"
            flush
            tone="peach"
          />
        </div>
        <p>The original design: a three-position slider spanning the three coaching modes.</p>
        <h3>Iteration 1: cutting supportive mode</h3>
        <p>
          I initially designed three modes (Supportive, Balanced, Provocative), but
          through testing and stakeholder alignment, we discovered that a coddling
          &ldquo;supportive&rdquo; approach contradicted the ontological coaching
          framework, which requires challenging limiting beliefs to drive growth.
        </p>
        <h3>Iteration 2: the slider wasn&rsquo;t a slider</h3>
        <p>
          With Supportive removed, only two modes remained, but the control still looked
          like a slider, sliding between just two end states:
        </p>
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <ImageFrame
            src="/images/founding-design/personality/slider-two-mode-supportive.png"
            width={462}
            height={140}
            alt="Two-mode personality slider with the handle at the Supportive end, between Supportive and Provocative labels."
            caption="Handle left: toward Supportive."
            flush
            tone="sky"
          />
          <ImageFrame
            src="/images/founding-design/personality/slider-two-mode-provocative.png"
            width={462}
            height={140}
            alt="Two-mode personality slider with the handle at the Provocative end, between Supportive and Provocative labels."
            caption="Handle right: toward Provocative."
            flush
            tone="peach"
          />
        </div>
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
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <ImageFrame
            src="/images/founding-design/personality/toggle-balanced.png"
            width={401}
            height={150}
            alt="Redesigned personality toggle set toward Supportive, described as Grounded · Curious · Discerning."
            caption="The toggle removes any illusion of a continuous scale."
            flush
            tone="lavender"
          />
          <ImageFrame
            src="/images/founding-design/personality/toggle-provocative.png"
            width={401}
            height={150}
            alt="Redesigned personality toggle set to Provocative, described as Candid · Bold · Perturbing."
            caption="Two clear states, one deliberate choice."
            flush
            tone="peach"
          />
        </div>
      </CaseSection>

      <CaseSection id="final-designs" eyebrow="Outcome" title="Final onboarding designs">
        <p>
          The shipped onboarding, end to end: welcome, a light warm-up, then the three
          context-gathering features (dimensions, influences, personality) working together
          as one system.
        </p>
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <ImageFrame
            src="/images/founding-design/onboarding/01-welcome-signup.png"
            width={1520}
            height={826}
            alt="COROS AI welcome screen: Google sign-up with an 18-or-older confirmation, beside a 'Manage Moments of Crisis' example conversation."
            caption="1 · Welcome & sign-up"
            flush
            tone="lavender"
          />
          <ImageFrame
            src="/images/founding-design/onboarding/02-intro.png"
            width={1520}
            height={826}
            alt="Onboarding intro: 'Hi, I'm COROS!' introducing the AI coach, with a 'Let's begin' button."
            caption="2 · Intro"
            flush
            tone="lavender"
          />
          <ImageFrame
            src="/images/founding-design/onboarding/03-name.png"
            width={1520}
            height={826}
            alt="Onboarding name step: 'What would you like me to call you?' with a name field and Back / Continue buttons."
            caption="3 · Name"
            flush
            tone="sky"
          />
          <ImageFrame
            src="/images/founding-design/onboarding/04-transition.png"
            width={1520}
            height={826}
            alt="Starfield transition screen: 'Great, Arshita. Let's take a moment to look at what matters to you most right now.'"
            caption="4 · Transition"
            flush
            tone="sky"
          />
          <ImageFrame
            src="/images/founding-design/onboarding/05-dimensions.png"
            width={1520}
            height={826}
            alt="Seven-dimensions selection: hexagons for Work, Belonging, Health, Self, World, Family, and Meaning, with World selected."
            caption="5 · Dimensions"
            flush
            tone="pink"
          />
          <ImageFrame
            src="/images/founding-design/onboarding/06-influences.png"
            width={1520}
            height={826}
            alt="Influences step: 'choose any voices that influence your thinking,' with Simon Sinek added as a chip."
            caption="6 · Influences"
            flush
            tone="pink"
          />
          <ImageFrame
            src="/images/founding-design/onboarding/07-personality.png"
            width={1520}
            height={826}
            alt="Tone step: a Supportive–Provocative toggle set to Provocative (Candid · Bold · Perturbing)."
            caption="7 · Personality"
            flush
            tone="peach"
          />
          <ImageFrame
            src="/images/founding-design/onboarding/08-configuring.png"
            width={1520}
            height={826}
            alt="Completion screen: 'Configuring COROS AI around what matters to you,' with the COROS mark."
            caption="8 · Configuring"
            flush
            tone="peach"
          />
        </div>
      </CaseSection>

      <CaseSection id="design-system" eyebrow="Craft" title="Design system snippets">
        <p>
          Alongside the flagship features, I built out the component language the product
          ships with: settings surfaces plus a full set of buttons, inputs, and action
          buttons specified across every size, intent, and state.
        </p>
        <h3>Settings surfaces</h3>
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <ImageFrame
            src="/images/founding-design/settings/personalization.png"
            width={921}
            height={736}
            alt="Personalization settings: AI response tone toggle, editable Dimensions of Life pills, and an Influences field."
            caption="Personalization: tone, dimensions, and influences all editable in one place."
            flush
            tone="sky"
          />
          <ImageFrame
            src="/images/founding-design/settings/subscription.png"
            width={921}
            height={736}
            alt="Subscription settings: a $100-per-month plan with next billing date, and Cancel / Update subscription buttons."
            caption="Subscription: plan, billing, and account actions."
            flush
            tone="lavender"
          />
        </div>
        <ImageFrame
          src="/images/founding-design/settings/personalization-influences-open.png"
          width={921}
          height={736}
          alt="Personalization settings with the Influences dropdown open, showing selected chips and a suggestion list."
          caption="The same surface with the influences typeahead open."
          size="md"
          tone="pink"
        />
        <h3>Component examples</h3>
        <p>
          Every component is specified as a full matrix: variants, intents, sizes, and
          interaction states, so engineering can build from a single source of truth.
        </p>
        <ImageFrame
          src="/images/founding-design/system/buttons.png"
          width={3398}
          height={1399}
          alt="A button specimen sheet: contained, outlined, and text variants across Primary, Secondary, Error, Warning, Info, Success, and Inherit intents, in large, medium, and small sizes with enabled, hovered, focused, pressed, and disabled states."
          caption="Buttons: every variant × intent × size × state on one sheet."
          size="full"
          tone="pink"
        />
        <div className="my-8 grid gap-4 sm:grid-cols-2 sm:items-start">
          <ImageFrame
            src="/images/founding-design/system/input-boxes.png"
            width={1284}
            height={1656}
            alt="An input-field specimen sheet: standard, filled, and outlined inputs in medium and small sizes, across enabled, hovered, focused, disabled, and error states, with and without a value."
            caption="Inputs: with/without value, across sizes and states."
            flush
            tone="lavender"
          />
          <ImageFrame
            src="/images/founding-design/system/fab-buttons.png"
            width={1552}
            height={3116}
            alt="A floating-action-button specimen sheet: extended and round FABs across default, primary, secondary, and inherit styles, in large, medium, and small sizes and every interaction state, with and without an icon."
            caption="Action buttons: extended and round FABs, fully specified."
            flush
            tone="sky"
          />
        </div>
      </CaseSection>

      <CaseSection id="brand" eyebrow="Visual identity" title="Designing a brand">
        <p>
          For COROS, I led the brand and logo design end-to-end to translate a
          philosophical product vision into a coherent, premium visual identity. I shaped
          the logo direction, color system, and brand language to reflect COROS&rsquo;s
          core stance: seriousness, care, and long-term commitment.
        </p>
        <ImageFrame
          src="/images/founding-design/research/brand-moodboard.png"
          width={2820}
          height={3620}
          alt="A brand-research moodboard collecting circular, portal, and swirl logo references and 'Hello I'm COROS' framing explorations."
          caption="Brand research: collecting references around a circular, portal-like mark."
          size="md"
          tone="lavender"
        />
        <ImageFrame
          src="/images/founding-design/research/logo-ideation.png"
          width={11382}
          height={6640}
          alt="A wide logo-ideation board with dozens of exploratory sketches: circles, orbits, atoms, and gradient orbs."
          caption="Ideation: exploring dozens of directions for the mark."
          size="full"
          tone="sky"
        />
        <ImageFrame
          src="/images/founding-design/research/logo-iterations.png"
          width={4192}
          height={3762}
          alt="A grid iterating the chosen crescent-and-droplet mark across construction guides and colour gradients on light and dark backgrounds."
          caption="Iteration: refining the chosen mark and its colour treatment."
          size="full"
          tone="pink"
        />
        <ImageFrame
          src="/images/founding-design/research/final-logos.png"
          width={3362}
          height={3159}
          alt="Final COROS AI logo lockups: the crescent mark with the COROS AI wordmark in blue, black, and white on light and dark backgrounds."
          caption="The final COROS AI lockups, tuned for light and dark surfaces."
          size="lg"
          tone="lavender"
        />
        <h3>Brand guide</h3>
        <p>
          These decisions were collected into a complete brand guide documenting the logo
          system, colour, and typography.
        </p>
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          {[
            "Logo section divider from the COROS brand guide.",
            "Full gradient logo: the hero crescent mark in blue-to-orange gradient, with use cases for homepage, splash, and video openers.",
            "Flat duo-tone logo: a two-tone dark-blue and electric-blue mark, with use cases for decks, packaging, and UI.",
            "Solid fill logo, dark mode: the white crescent mark on black, with print, embossing, and watermark use cases.",
            "Solid fill logo, light mode: the black crescent mark on white, with print, embossing, and watermark use cases.",
            "Colors section divider from the COROS brand guide.",
            "Colour system: primary (#03054A, #0822E6, #EA4A00), gradient (#05066C, #7DF9FF), and utility (#000000, #FFFFFF, #7A7A7A) swatches with roles.",
            "Gradients section divider from the COROS brand guide.",
            "Four brand gradient swatches: deep blue washes with warm red accents.",
            "Typography section divider from the COROS brand guide.",
            "Logo font: Clash Display Bold, shown across COROS wordmark lockups in blue, black, and white.",
            "DM Sans heading scale: Heading XL Black 80pt down to Heading S.",
          ].map((alt, i) => {
            const n = String(i + 1).padStart(2, "0");
            return (
              <ImageFrame
                key={n}
                src={`/images/founding-design/brand-guide/page-${n}.png`}
                width={1920}
                height={1080}
                alt={alt}
                flush
                tone="lavender"
              />
            );
          })}
        </div>
      </CaseSection>

      <CaseSection
        id="pitch-deck"
        eyebrow="Fundraising"
        title="Investment pitch deck"
      >
        <p>
          I also designed the company&rsquo;s investment pitch deck, extending the brand into
          fundraising materials.
        </p>
        <ImageFrame
          src="/images/founding-design/investment-pitch-deck/cover.png"
          width={1920}
          height={1080}
          alt="The COROS AI investment presentation cover slide."
          caption="The cover, carrying the COROS brand into the raise."
          size="lg"
          tone="lavender"
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
                tone="sky"
              />
            );
          })}
        </div>
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
          COROS taught me how to design under pressure, and how to stay focused on what
          matters when everything around you is moving fast.
        </PullQuote>
      </CaseSection>
    </CaseStudyLayout>
  );
}
