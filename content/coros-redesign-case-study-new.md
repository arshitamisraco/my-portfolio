# Rebuilding COROS AI: From MUI Defaults to a Token-Driven Design System

**Product Design · Design Systems · Design Engineering**

**Role:** Product Designer (design system owner, end-to-end surface design, developer handoff)
**Company:** COROS AI, an ontological AI life-coaching platform
**Team:** Founder/CEO, two engineers, one collaborating designer
**Platforms:** Web (desktop + tablet), iOS, Android
**Live product:** [app.coros.ai](https://app.coros.ai) · [Figma](https://www.figma.com/design/m1CDYr9xf00a2oj3gDDAt8/COROS-AI-Design-system?node-id=4562-26816)

---

## TL;DR

COROS AI's first product ran on stock Material UI: dark-only, desktop-only, and hard to iterate on. I led the full redesign onto a shadcn foundation, building the design system from color primitives up to a published Figma library with 54+ semantic tokens, full light/dark theming, and responsive components across four platforms. I redesigned every base surface (onboarding, chat, sidebar, settings) and designed an internal Retrieved Context panel that lets the team inspect the RAG pipeline inside the product.

The redesign is live in production. The onboarding rework contributed to a **2.5× increase in user return rate**, and the shared token system cut design-to-review cycles from days to hours.

## 1. Why the redesign happened

COROS is an AI coach. The interface has one job: stay out of the way of a deep, sometimes emotionally heavy conversation while still feeling premium. The MUI product did the opposite. Testers said the dim, low-contrast dark theme strained their eyes during long sessions, and there was no light mode to offer them.

The internal problems were structural. MUI defaults were overridden ad hoc with no token layer, so restyling anything meant touching individual components. The UI was desktop-only despite mobile plans. With a second designer joining and engineers building from screenshots, there was no shared library or naming convention, and the brand (COROS blue #0822E6, orange #EA4A00) had disappeared into Material defaults.

Engineering was moving to shadcn/Tailwind. My mandate was to build the design side of that migration and redesign every surface on top of it.

## 2. Design system: three layers, zero shortcuts

I built on the Obra shadcn Figma kit because it mirrors how shadcn works in code: components only reference semantic tokens, never raw values. I extended it with a strict architecture:

**Raw primitives → Brand layer → Semantic tokens → Components**

For primitives, I generated full 11-stop scales for new coros-neutral, coros-blue, and coros-orange groups, with brand hexes locked at the 600 stop. The neutrals are tinted at the brand's blue hue, so even empty surfaces feel like COROS. I also built a custom crimson scale for destructive states when the kit's red clashed. Everything was added as new groups instead of overwriting kit defaults, keeping the kit upgradeable.

Semantic tokens are forbidden from touching raw scales directly; they resolve only through the brand layer. That one rule makes a rebrand a single-layer repoint instead of a token audit. On top sit 54+ role-based tokens mapped for light and dark via Figma variable modes, including product-specific tokens like chat-bubble-coros and chat-bubble-user that shadcn doesn't ship.

The payoff: every screen is designed once. Toggling the frame's mode re-resolves every token, so verifying both themes is a click, not a redraw. That is the only way a team this small ships two themes across four platforms. I published the library for the whole team to build on.

## 3. Component architecture

My rule: variants only when structure changes, component properties for everything else. The chat input bar shows why. It needed default, focused, with-text, and multiline states across breakpoints, which naively explodes into a variant grid. Instead, multiline earned a variant (it changes structure), focus became a boolean (it's just a ring), send button and placeholder became properties, and width differences were handled by auto layout constraints rather than breakpoint variants. The same logic ran through bubbles, sidebar, and settings. Icons standardized on Lucide at 20px inside 32px ghost hit areas, benchmarked against production values from leading AI chat products.

## 4. Redesigning the base surfaces

**Chat.** The core surface got the deepest state inventory: empty state, typing indicator vs. streaming text, errors and retries, message actions, scroll and return-to-chat behavior. The user bubble color was a real debate. Full brand blue felt heavy, so I prototyped three alternatives in working HTML across both themes and brought finalists to stakeholder review. That set the project's working pattern: prototype disagreements, don't argue them.

**Onboarding.** The legacy flow was eight dark-only screens that asked for your name last, after personalizing everything. I restructured it to six: Welcome → Name → Dimensions → Influences → Tone → Loading, with the name up front so the flow can address you personally. The welcome greeting rotates through nine languages to signal multilingual support without a selector. The tone screen teaches through interaction: the chosen card comes forward, the background tints blue or orange, and each orb animates to match its personality. Every screen shipped for all four platforms.

**Sidebar and settings.** Settings became a modal shell with a persistent left nav (Account, Data control, Personalization, About, Terms, My Memories). The Appearance toggle moved out of settings into the sidebar as an inline utility row, since switching themes should never require navigating anywhere.

## 5. The Retrieved Context panel

COROS's coaching quality depends on a memory pipeline: RAG retrieval over past sessions, session-boundary detection, biographical memory. When a response went wrong, answering "what did the model actually see?" meant an engineer digging through logs.

I designed a team-only panel, opened from any COROS response, that exposes the pipeline for that exact turn: the query and response pair, whether the session-boundary detector fired and its probability, the short-term memory turn by turn, retrieved past sessions with their semantic, recency, and final scores, raw chunk results, and the biographical memory as the model sees it.

I was doing prompt QA myself, so I designed the tool as its own primary user. Every field answers a question I actually had during prompt iteration. It uses the same tokens and modal shell as settings, so it reads as a native surface, not a bolted-on debug console. Prompt regressions that used to be argued from vibes are now diagnosed from the panel.

## 6. Handoff and outcomes

Designs shipped with a markdown spec per surface covering layout differences, component inventory, UX states, and edge cases. Documented sections were accepted by engineering with zero redesign requests.

Results: live in production across web, iOS, and Android; a 2.5× increase in user return rate after launch; a published library the whole team builds on without detaching components; and review cycles cut from days to hours.

## 7. What I learned

Token discipline is a social contract, not a Figma feature; it only holds if someone enforces it in review. Designing the boring layer first felt slow at a pre-seed startup and turned out to be the highest-leverage decision of the project. And internal users deserve product design too: the debug panel could have been a JSON dump, but treating the team as real users produced a tool people actually open.
