# Rebuilding COROS AI: From MUI Defaults to a Token-Driven Design System

**Product Design · Design Systems · Design Engineering**

**Role:** Product Designer (design system owner, end-to-end surface design, developer handoff)
**Company:** COROS AI — an ontological AI life-coaching platform ("Conversations that transform")
**Team:** Founder/CEO, two engineers, one collaborating designer (microinteractions)
**Platforms:** Web (desktop + tablet), iOS, Android
**Live product:** [app.coros.ai](https://app.coros.ai)
**Figma:** [COROS AI Design System](https://www.figma.com/design/m1CDYr9xf00a2oj3gDDAt8/COROS-AI-Design-system?node-id=4562-26816)

---

## TL;DR

COROS AI's first product was built on stock Material UI — dark-only, desktop-only, visually generic, and increasingly painful to iterate on. I led the full redesign onto a shadcn/Tailwind foundation, building the design system from raw color primitives up to a published multi-designer Figma library with 54+ semantic tokens, full light/dark theming, and responsive component architecture across four platforms. I redesigned every base surface — onboarding, chat, sidebar, and settings — and shipped an internal "Retrieved Context" transparency panel that lets the team inspect the RAG pipeline (retrieved chunks, memory scoring, session-boundary detection) directly inside the product for prompt QA.

The redesign is live in production. The onboarding rework contributed to a **2.5× increase in user return rate**, and the shared token system compressed design-to-review cycles from days to hours.

---

## 1. Context: Why the redesign happened

COROS AI is a pre-seed startup building an AI coach grounded in ontological coaching methodology. The product is fundamentally a conversation — which means the interface has one job: get out of the way of a deep, sometimes emotionally heavy dialogue, while still feeling like a considered, premium product.

The MUI-era product did the opposite. Early user testing surfaced it directly: testers reported that the dark, dim background with low-contrast text strained their eyes during long coaching sessions, and asked for lighter themes and better readability. Beyond the feedback, the internal problems were structural:

- **No theming architecture.** MUI's defaults were being overridden ad hoc. There was no light mode, no token layer, and no way to restyle the product without touching individual components.
- **Not responsive.** The product needed to live on web, iOS, and Android, but the UI had been designed desktop-first with no breakpoint system.
- **No shared design language.** With a second designer joining and engineers building against screenshots, every surface was drifting. There was no published library, no component contract, no naming convention.
- **Generic identity.** COROS has a strong brand — a specific blue (#0822E6), a specific orange (#EA4A00) — and none of it survived contact with Material defaults.

The engineering team was moving to shadcn/ui + Tailwind on the code side. My mandate was to build the design side of that migration: a Figma system that mirrored the code's token architecture one-to-one, and a redesign of every base surface on top of it.

## 2. Design system: three layers, zero shortcuts

I built the system on the Obra shadcn Figma kit, chosen deliberately because it mirrors how shadcn works in code — everything resolves through semantic tokens, and components never touch raw values. Rather than restyle the kit destructively, I extended it with a strict three-layer architecture:

**Raw primitives → Brand layer → Semantic tokens → Components**

**Raw primitives.** I generated complete 11-stop scales (50–950) for three new color groups — `coros-neutral`, `coros-blue`, `coros-orange` — with the exact brand hexes locked at the 600 stop. The neutrals aren't gray: they're blue-tinted at the brand hue (233°), so even "empty" surfaces carry COROS's temperature. When Obra's default destructive red clashed with the palette, I generated a custom cool-crimson scale (hue 352°) to replace it. Everything was added as new variable groups rather than overwriting kit defaults — a non-destructive practice that keeps the kit upgradeable.

**Brand layer.** Semantic tokens are forbidden from referencing raw scales directly; they resolve only through brand references (`brand-shades`, `brand-neutrals`). This one rule is what makes the system maintainable — a brand refresh becomes a single-layer repoint, not a token audit. I enforced it throughout the file, including catching and correcting several early mappings that bypassed the brand layer.

**Semantic tokens.** 54+ role-based tokens mapped for both light and dark modes using Figma variable modes: `primary` resolving to brand-shades/600 in light and 500 in dark, `background` to brand-neutrals/50 and 950, and so on. Where shadcn's vocabulary didn't cover the product, I extended it — chat is COROS's core surface, so I introduced product-specific tokens like `chat-bubble-coros` and `chat-bubble-user` rather than overloading `muted` or `card` with jobs they weren't designed for. Dark-mode details got real attention: primary CTAs use an off-white (#FCFCFD) rather than pure white against the locked dark background (#0A0B15), because pure white vibrates at that contrast.

The payoff of variable modes: every screen is designed once. Toggling the frame's mode re-resolves every token, so light/dark verification is a click, not a re-draw — which is the only way a team this small ships two full themes across four platforms.

I published the library to Figma as a shared team resource, with slash-notation variable grouping and naming conventions agreed upon with the second designer before either of us pushed pixels.

## 3. Component architecture: variants where structure changes, properties everywhere else

A design system lives or dies on how its components scale, so I set a discipline early: **variants only for structural change; component properties for everything else.**

The chat input bar is the clearest example. It needed to handle default, focused, with-text, and multiline states across mobile and desktop breakpoints — a naive build is a 2×4 variant explosion that grows multiplicatively with every new state. Instead:

- **State** is one variant axis only where the structure actually differs (multiline changes height and layout; it earns a variant).
- **Focus** is a boolean property — it's a ring style, not a structure.
- **Send button visibility, attachment button, placeholder text** are boolean and text properties.
- **Breakpoints** exist as variants only when structure changes; where the only difference is width, auto layout with min/max constraints handles it, so the component resizes instead of multiplying.

The same logic ran through message bubbles (asymmetric radii signaling speaker direction, avatar slots, timestamp rows), the sidebar navigation, and the settings shell. Iconography standardized on Lucide at a fixed spec — 20px icons in 32×32 ghost hit areas, `rounded-md` — benchmarked against production values from leading AI chat products rather than invented.

## 4. Redesigning the base surfaces

### Chat

Chat is the product, so it got the deepest treatment. Beyond the visible layout — COROS messages left-aligned, user messages right-aligned in iMessage-style bubbles — the work was in the state inventory: empty state (the first thing a new user ever sees), typing indicator vs. streaming text (two different "loading" moments that users read differently), error and retry states, message-level actions (read-aloud, settings) revealed below COROS messages, scroll-position handling and return-to-chat behavior, and rich content inside AI messages.

The user bubble color was a genuine debate. Full COROS blue read as heavy and shouting; I built an HTML comparison prototype of three alternatives (darker neutral, subtle blue tint, neutral with border) rendered in both themes, and brought two finalists to stakeholder review rather than asserting one. Small decision, but it set the working pattern for the project: disagreements get prototyped, not argued.

### Onboarding

The legacy flow was eight dark-only screens with awkward sequencing — it asked for the user's name *last*, after personalizing the entire flow. I restructured it to six screens: **Welcome → Name → Dimensions → Influences → Tone → Loading**, with the name moved up front so the rest of the flow can address the user personally, a filler transition screen cut, and theming following the system setting rather than adding a selection step.

Details recruiters won't see in a screenshot but users feel: the welcome greeting rotates through nine languages while "I'm COROS." stays static — communicating multilingual support without a language selector, and solving the layout jitter that different script widths would otherwise cause. The tone-selection screen (Supportive ↔ Provocative) teaches through interaction: the chosen card comes forward, the other dims, and the background tints blue or orange — the orbs themselves animate differently per personality (Supportive breathes; Provocative flickers). Navigation is a fixed bar decoupled from content, with Continue gated on per-screen state (name entered, at least one dimension selected). Every screen was designed for web desktop, web tablet, iOS, and Android simultaneously.

### Sidebar & settings

Settings was rebuilt as a modal shell with a persistent left nav — Account, Data control, Personalization, About, Terms & Privacy, My Memories — consistent across every tab so the frame never jumps. One placement decision I'm fond of: the Appearance toggle. It behaves differently from every other settings item (it acts inline; the others navigate), so burying it inside Personalization was wrong. I moved it into the sidebar flyout as a utility row — separated visually from the nav links above and the destructive Log out below — so switching themes never requires navigating anywhere. Three zones, three separators, self-explanatory hierarchy.

## 5. The Retrieved Context panel: designing for the team, inside the product

COROS's coaching quality depends on a memory pipeline — RAG retrieval over past sessions, a rolling summary, session-boundary detection, biographical memory. When a response goes wrong, the team's first question is always the same: *what did the model actually see?* Answering it used to mean an engineer digging through logs.

I designed a team-only transparency surface, reachable from a settings icon under any COROS response, that exposes the pipeline for that exact turn:

- **Associated Query** — the user query and COROS response pair under inspection, so the debugging session is anchored to a concrete exchange.
- **Memory Config** — whether the session-boundary detector fired, its probability score, the expandable short-term memory (turn-by-turn), and the past sessions retrieved into context, each with its semantic score, recency score, and final blended score. This is where the team validates retrieval thresholds against real conversations instead of synthetic tests.
- **Chunk Results** — the raw retrieved chunks from the knowledge base.
- **Personalization** — the active tone, dimensions, and influences shaping the prompt.
- **My Memories (team-only)** — the biographical memory object as the model sees it, plus session history summaries.

The design challenge was tonal: this is engineering telemetry living inside a warm consumer product. I kept it on the same design system — same tokens, same type, same modal shell as settings — so it reads as a native surface rather than a bolted-on debug console, while structuring the data hierarchy (scores as scannable inline metadata, turns and sessions as progressive-disclosure accordions) so a prompt engineer can diagnose a retrieval miss in seconds. Because I was also doing the prompt QA myself, I was designing this tool as its own primary user — every field on the panel corresponds to a question I'd actually had to answer during prompt iteration, including "did the topic switch when it should have?" (the session-change probability) and "why did it retrieve *that* session?" (the score breakdown).

This feature quietly changed how the team works: prompt regressions that used to be argued from vibes are now diagnosed from the panel.

## 6. Handoff

Designs shipped with a markdown design specification covering every surface: screen purpose, web-vs-mobile layout differences, full component inventory, UX states (empty, loading, error, disabled, edge cases), and interaction behavior — written to a consistent per-screen template so engineers always knew where to look. Documented sections were accepted by engineering without redesign requests, and open questions were logged explicitly with owners rather than left implicit.

## 7. Outcomes

- **Live in production** at [app.coros.ai](https://app.coros.ai) across web, iOS, and Android.
- **2.5× increase in user return rate** following launch, with the redesigned coaching-interview onboarding as a primary contributor.
- **A published, adopted design library** — the second designer and both engineers work from the same tokens; the microinteractions workstream builds on my components without detaching them.
- **Design-to-review cycles compressed from days to hours**, aided by functional HTML/CSS/JS prototypes for contested decisions.
- **A team that can see its own AI.** The Retrieved Context panel made prompt QA a first-class, in-product workflow.

## 8. What I'd tell you I learned

**Token discipline is a social contract, not a Figma feature.** The three-layer rule only holds if someone enforces it in review — the system's value came from the discipline, not the variables.

**Design the boring layer first.** Weeks spent on color architecture before drawing a single screen felt slow at a pre-seed startup. It was the single highest-leverage decision of the project — every surface after it was faster than the one before.

**Your internal users deserve product design too.** The team debug panel could have been a JSON dump. Treating the prompt-engineering team as users with real workflows produced a tool people actually open — and it made me a better prompt engineer, because I had to decide what information *mattered*.

**Prototype the disagreement.** Every contested visual decision (bubble color, tone selection, greeting animation) was resolved with a working prototype in front of stakeholders, not a debate. At startup speed, showing beats telling by a wide margin.
