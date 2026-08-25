---
name: Arshita Misra Portfolio
description: A warm pink-paper portfolio where pixel clouds are the identity and the craft is the argument.
colors:
  bg: "#fdf8f7"
  surface: "#faeeec"
  surface-raised: "#fefcfb"
  ink: "#2b2230"
  ink-muted: "#6e5b6f"
  accent: "#e28a9b"
  accent-strong: "#ac5169"
  accent-deep: "#96455c"
  accent-soft: "#f6c6cf"
  line: "#f0dddd"
  on-accent: "#fff7f5"
  cloud-pink-edge: "#efa6b4"
  cloud-lavender-edge: "#cdbfe8"
  cloud-sky-edge: "#b7d3ec"
  lavender-soft: "#e6ddf5"
  lavender-deep: "#5b4691"
  sky-soft: "#d9e9f7"
  sky-deep: "#33608a"
  mint-soft: "#dcefe3"
  mint-deep: "#2f6b4c"
  butter-soft: "#faedcf"
  butter-deep: "#715417"
  peach-soft: "#fbe1d3"
  peach-deep: "#92492a"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, Times New Roman, serif"
    fontSize: "clamp(2.5rem, 5.5vw + 1rem, 4.25rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.015em"
  h1:
    fontFamily: "Playfair Display, Georgia, Times New Roman, serif"
    fontSize: "clamp(2.125rem, 3vw + 1rem, 3rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  h2:
    fontFamily: "Playfair Display, Georgia, Times New Roman, serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.008em"
  h3:
    fontFamily: "Playfair Display, Georgia, Times New Roman, serif"
    fontSize: "1.35rem"
    fontWeight: 600
    lineHeight: 1.35
  h4:
    fontFamily: "Playfair Display, Georgia, Times New Roman, serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.45
  body-lg:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.7
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  caption:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  eyebrow:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.14em"
rounded:
  card: "12px"
  frame: "16px"
  inset: "10px"
  pill: "999px"
spacing:
  section: "clamp(4rem, 9vw, 7.5rem)"
  gutter: "1.5rem"
  gutter-md: "2.5rem"
  container: "1200px"
  measure: "68ch"
components:
  button-primary:
    backgroundColor: "{colors.accent-strong}"
    textColor: "{colors.on-accent}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.accent-deep}"
    textColor: "{colors.on-accent}"
  button-secondary:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-secondary-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.accent-deep}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-ghost-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.accent-deep}"
  chip-pink:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.accent-deep}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  chip-lavender:
    backgroundColor: "{colors.lavender-soft}"
    textColor: "{colors.lavender-deep}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  chip-sky:
    backgroundColor: "{colors.sky-soft}"
    textColor: "{colors.sky-deep}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  chip-mint:
    backgroundColor: "{colors.mint-soft}"
    textColor: "{colors.mint-deep}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  chip-butter:
    backgroundColor: "{colors.butter-soft}"
    textColor: "{colors.butter-deep}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  chip-peach:
    backgroundColor: "{colors.peach-soft}"
    textColor: "{colors.peach-deep}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  card:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.frame}"
    padding: "20px"
  input:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.card}"
    padding: "12px 16px"
  nav:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.body}"
    height: "64px"
---

# Design System: Arshita Misra Portfolio

## Overview

**Creative North Star: "The Pixel Sky"**

The world is a warm, pale-pink sheet of paper with weather on it. Soft 8-bit clouds drift behind the hero at glacial speed, mark the start of sections, and land as the dot of the "i" in the name — the same motif at three scales, doing three jobs. Everything else is quiet enough to let them be the only thing that moves. Playfair Display carries every statement and Inter carries every explanation, and the strict division between the two is what keeps a site this soft from reading as sentimental: the serif is warm, the sans is exact, and the seam between them is where the craft shows.

Density is generous and unhurried. Sections breathe on a fluid rhythm that scales with the viewport, prose is capped at 68 characters, and surfaces are separated by tone and a hairline rather than by shadow — three tinted planes stacked so precisely that depth arrives without weight. Nothing is sharp. Radii are large, buttons are pills, and hairline borders warm to accent under the cursor. The system is quietly responsive: everything answers to touch, and nothing announces it. Cards lift a few pixels, an arrow steps forward, a border changes temperature — three small motions that fire together or not at all.

Motion here is evidence of care, and it is engineered as such. Every animation is declared off and switched on only inside a no-preference media query, so reduced motion is the default state of the stylesheet rather than a patch applied over it. The clouds take between 115 and 200 seconds to cross the screen. That restraint is not decoration on the portfolio — for a designer whose claim is that she engineers, it is part of the argument.

The world explicitly refuses three neighboring looks: the dark-mode AI startup (near-black ground, neon-violet gradient, glow, glass), agency-portfolio maximalism (scroll-jacking, kinetic type, cursor followers, spectacle in place of evidence), and the corporate SaaS template (blue-gray neutrals, stock illustration, badge rows, competence with no author in it). The pink paper ground is a direct answer to the first, and the quiet is a direct answer to the second.

**Key Characteristics:**
- Warm pink paper ground (#fdf8f7) — never white, never dark, no dark mode
- Pixel clouds as identity: ambient sky, section marker, and letterform, all crisp-edged
- Playfair for statements, Inter for everything else, no overlap
- Flat tonal layering with hairline borders; depth from temperature, not shadow
- Six tone families (pink, lavender, sky, mint, butter, peach), each a soft/deep pair
- One tone assigned per case study, held across every surface it appears on
- Motion off by default at the CSS level, on only under no-preference
- Three radii, no fourth: 12px, 16px, 999px

## Colors

A single warm rose family carries the whole identity, supported by five pastel tone families that exist to give each case study its own color signature without ever introducing a second brand color.

### Primary

- **Palest Warm Pink** (#fdf8f7): The page ground. Every surface in the system sits on it, and no page ever uses white. Applied to `html` and `body` so there is no flash of a different ground on load.
- **Soft Rose Tint** (#e28a9b): The decorative accent. Cloud fill, underline decoration, quote rules, hover borders — surfaces and strokes only. See the Decorative Tint Rule below; this color never carries a word.
- **Muted Rose** (#ac5169): The working accent. Inline links, primary button fill, focus rings, required-field markers. This is the color that does the load-bearing accent work because it passes contrast on the ground.
- **Deep Rose** (#96455c): The emphatic accent. Eyebrows, active nav, prose links, card arrows, and hover state of the primary button. The darkest voice in the family.
- **Pale Rose Wash** (#f6c6cf): Selection highlight and the fill an arrow well takes on hover. The soft counterpart to Deep Rose.

### Secondary

The five supporting pastels. Each ships as a soft surface and an AA-deep counterpart, and the two are used only together.

- **Soft Lavender / Deep Violet** (#e6ddf5 / #5b4691): Case-study tone, chip family, image-frame mat, cloud variant.
- **Soft Sky / Deep Slate Blue** (#d9e9f7 / #33608a): Case-study tone, chip family, image-frame mat, cloud variant.
- **Soft Mint / Deep Green** (#dcefe3 / #2f6b4c): Case-study tone and chip family. Also the system's only status color — the "Current project" pill and the contact form's success message.
- **Soft Butter / Deep Olive** (#faedcf / #715417): Case-study tone, chip family, image-frame mat.
- **Soft Peach / Deep Terracotta** (#fbe1d3 / #92492a): Case-study tone, chip family, image-frame mat.

### Neutral

- **Deep Plum Ink** (#2b2230): All body and heading text. A warm near-black with violet in it, never a true black — it belongs to the same warm world as the ground.
- **Muted Plum** (#6e5b6f): Secondary text, descriptions, captions, inactive nav, placeholders. The one step down from ink, and there is no second step.
- **Blush Hairline** (#f0dddd): Every border, divider, and section rule in the system. A pink-tinted line, never a gray one.
- **Lifted Paper** (#fefcfb): The raised plane — cards, inputs, and any surface that should read as sitting above the ground. Note it is *lighter* than the ground, not darker.
- **Warm White** (#fff7f5): Text on filled accent surfaces. The only near-white in the system, and it appears only on top of Muted Rose or Deep Rose.

### Named Rules

**The Decorative Tint Rule.** Soft Rose Tint (#e28a9b) never carries text. It is a fill, a border, a cloud, an underline decoration — never a word. Link and body text use Muted Rose (#ac5169) or Deep Rose (#96455c), which pass AA on the ground. This is documented in `globals.css` and is the single most load-bearing color rule in the system. Test: if any resolved `color` on a text node is #e28a9b, it is a bug.

**The Paired Pastel Rule.** Every supporting pastel is a soft/deep pair and is used only as a pair. A `lavender-soft` background carries `lavender-deep` text and nothing else. Never cross families inside one chip, frame, or card, and never put ink on a pastel where the pastel's own deep counterpart exists.

**The One Tone Per Study Rule.** Each case study owns exactly one tone, declared once as its `ChipTone`, and it holds across its listing card, its chips, its image frames, and its carousel clips site-wide. A study's color is an identifier, not a decoration, so it never varies by surface.

**The No Raw Hex Rule.** Hex values appear in exactly one file: `app/globals.css`, inside `@theme`. Everywhere else, color arrives as a semantic Tailwind utility (`text-ink`, `bg-surface-raised`, `border-line`). Raw palette tokens feed semantic tokens; components consume only the semantic layer. Tailwind's default palette is deliberately wiped (`--color-*: initial`), so a stray `bg-blue-500` does not silently work — it produces nothing.

## Typography

**Display Font:** Playfair Display (with Georgia, Times New Roman, serif)
**Body Font:** Inter (with ui-sans-serif, system-ui, sans-serif)

Both are loaded through `next/font/google` and exposed as `--font-display` and `--font-sans`.

**Character:** A high-contrast transitional serif over a neutral grotesque. Playfair's sharp thick-thin modulation gives the headings a printed, editorial confidence; Inter's flat, unfussy letterforms keep everything explanatory legible and modern. The pairing works because the two fonts disagree — the serif is expressive and the sans refuses to be, and that tension is what keeps a pale-pink site from reading as soft-focus.

### Hierarchy

- **Display** (600, `clamp(2.5rem, 5.5vw + 1rem, 4.25rem)`, 1.08, -0.015em): Page-opening statements. Tightened tracking because Playfair at scale opens up on its own.
- **H1** (600, `clamp(2.125rem, 3vw + 1rem, 3rem)`, 1.15, -0.01em): Page titles and hero sub-statements. Also used at 500 weight for the hero's supporting line.
- **H2** (600, 1.75rem, 1.25, -0.008em): Section headings and card titles — the most-used heading in the system. Fixed, not fluid.
- **H3** (600, 1.35rem, 1.35): Sub-headings inside case-study prose.
- **H4** (600, 1.125rem, 1.45): The wordmark in the nav, and the smallest serif in the system.
- **Body Large** (400, 1.125rem, 1.7): Section intros, hero supporting copy, mobile nav links. The generous 1.7 leading is what makes the long intros readable at that size.
- **Body** (400, 1rem, 1.65): All default text. Set on `body`, so it is the floor everything else departs from.
- **Caption** (400, 0.875rem, 1.5): Figure captions, chips, form labels (at 600), status messages.
- **Eyebrow** (600, 0.75rem, 1.2, 0.14em, uppercase): Section labels and card subtitles, always in Deep Rose. Packaged as the `text-style-eyebrow` utility so the size, tracking, case, and weight can never drift apart.

The homepage hero carries one deliberate override outside this scale — `clamp(3.5rem, 9vw + 1rem, 7rem)` at 1.05 leading — because the name is the largest thing on the site by design. It is the only arbitrary type value in the system and should stay that way.

### Named Rules

**The Serif-For-Statements Rule.** Playfair sets the display line, every section H2, card titles, the wordmark, and pull quotes. It never sets body copy, captions, labels, buttons, or any UI text — those are Inter without exception. If a serif appears in a control, it is wrong.

**The 68ch Rule.** Every reading column in the system is capped at 68 characters, via `measure-prose` or `.case-prose`. Case-study prose picks up the type system from plain markup with no per-element classes, which is what keeps a long-form page from accumulating one-off text styles.

**The One Muted Step Rule.** Text has exactly two colors: Deep Plum Ink and Muted Plum. There is no third, lighter gray for "even less important" text. When something needs to recede further, it gets smaller or moves, it does not fade.

## Layout

The whole site lives inside `container-site`: a 1200px max-width column, centered, with 1.5rem inline gutters that open to 2.5rem at 48rem and above. There is no 12-column grid in force — layouts are built from flex columns that switch to rows at `md`, which is why the system stays legible on a phone without a separate mobile design.

Vertical rhythm runs on a single fluid token, `--spacing-section` (`clamp(4rem, 9vw, 7.5rem)`), applied as `py-section` to every major band. Section-internal spacing steps in a small, repeated set — `mt-2`, `mt-3`, `mt-4`, `mt-6`, `mt-8`, `mt-10`, `mt-12` — so the space between an eyebrow and its heading is the same everywhere it occurs.

Content columns cap well inside the container: `max-w-2xl` for card copy, `max-w-3xl` for section headings, `max-w-4xl` for the case-study list, `max-w-5xl` for hero statements. The hero itself is sized by viewport (`min-h-[78vh]`) rather than by content, so the first screen is composed rather than merely filled.

Case-study pages add a sticky table of contents beside the prose column and `scroll-mt-28` on every section so an anchored jump lands below the sticky header rather than under it.

Breakpoints are Tailwind's defaults; only `sm` (640px), `md` (768px), and `lg` (1024px) are actually in use, and `md` carries almost all of the structural change — it is the point at which stacked cards become split rows and the mobile menu is replaced by the desktop link list.

### Named Rules

**The 1200 Rule.** Everything is inside `container-site`. The only things that break the container are the hero's cloud sky and full-width tinted section bands, and in both cases the *content* inside them is still in the container.

**The Section Rhythm Rule.** Space between major sections is always `py-section`. Never a hand-picked padding value. If a section needs different breathing room, the token changes, not the section.

## Elevation & Depth

The system is flat, and depth comes from a ladder of three tinted planes separated by a hairline: the ground (#fdf8f7), the recessed band (#faeeec), and the raised surface (#fefcfb). The ladder's direction is the interesting part — the raised plane is *lighter* than the ground while the recessed band is *darker*, so surfaces read as coming forward into the light rather than as casting shadow downward. That is the whole depth model, and it is why a site with almost no shadows still has a clear front and back.

The `--color-line` hairline (#f0dddd) does the rest of the work. It is a pink-tinted border rather than a gray one, so an edge never introduces a color that isn't in the world.

Shadows exist but are deliberately underdeveloped, and this is a known open area rather than a settled invariant. Today `shadow-sm` appears in exactly three places — the carousel's framed clips, and the floating mute controls on hero montages and case videos — in each case on media that sits on top of a tinted mat and needs to separate from it. The print-only résumé sheet uses `shadow-xl` and is outside the web system entirely.

**Future work may give elevation more room.** If a shadow vocabulary is developed, it should stay warm (tinted toward the rose family, never neutral black at high opacity), stay tied to state rather than decorating things at rest, and never replace the tonal ladder as the primary depth mechanism.

### Shadow Vocabulary

- **Separation** (`box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`): Media resting on a tinted mat, and floating controls over video. The only shadow in the shipped web system.

### Named Rules

**The Tonal Ladder Rule.** Depth is `bg` → `surface` → `surface-raised`, separated by `line`. Reach for a plane and a hairline before reaching for a shadow. A surface that needs to feel raised gets lighter, not shadowed.

## Shapes

Three radii, and no fourth. **12px** (`rounded-card`) for controls and inline surfaces — inputs, mobile nav items, the menu button. **16px** (`rounded-frame`) for containers and media — cards, image frames, video frames, section panels. **999px** (`rounded-pill`) for anything that reads as a token or an action — every button, every chip, the circular arrow wells, the status dot.

Borders are always 1px and always `--color-line`, with one exception: the pull quote's 4px left rule in Soft Rose Tint, which is the only heavy stroke in the system.

Media inside a frame is inset — an image sits in a 16px frame with 8px of pastel mat (12px at `sm`) and takes a 10px radius of its own, so the inner curve nests inside the outer instead of fighting it. That mat is the tone-carrying surface, which is how a screenshot picks up its case study's color without being tinted itself.

The pixel cloud is the system's one hard-edged form: an SVG grid of 1×1 rects rendered with `shapeRendering="crispEdges"`, in three shapes (cumulus 12×6, puff 8×5, wisp 16×4) and three variants. Cells touching the sky are filled one step deeper than the interior, which is what produces the dithered 8-bit outline.

### Named Rules

**The Three Radii Rule.** 12px, 16px, 999px. Any other corner value is drift. The single arbitrary radius in the system (10px, on media inside a frame) exists only to nest concentrically inside 16px and is not a general-purpose step.

**The Crisp Edge Rule.** The pixel cloud never anti-aliases, never gains a gradient, never gets a blur, and never scales to a non-integer grid. It is pixel art, and softening it destroys the one thing that makes it a signature instead of a decoration.

## Components

### Buttons

- **Shape:** Fully rounded pill (999px), 12px vertical and 24px horizontal padding, body size at 500 weight, with a 1px border on every variant so the three sit on the same optical footprint.
- **Primary:** Muted Rose fill (#ac5169) with Warm White text (#fff7f5), border matching the fill. Hover deepens both fill and border to Deep Rose (#96455c).
- **Secondary:** Lifted Paper fill (#fefcfb) with ink text and a Blush Hairline border. Hover warms the border to Soft Rose Tint and drops the fill to the recessed surface — the border changes temperature before the fill changes value.
- **Ghost:** Transparent with a transparent border and Deep Rose text. Hover fills to the recessed surface only.
- **Transition:** `transition-colors` at 200ms on all three. Buttons change color; they do not move.
- **Disabled:** 60% opacity with `cursor-not-allowed` (contact form submit).

### Chips

- **Style:** Pill, 4px/12px padding, caption size at 500 weight, no border. Color comes entirely from a soft/deep pair.
- **Tones:** Six families — pink (recessed surface + Deep Rose), lavender, sky, mint, butter, peach. Tone is passed in, never chosen locally.
- **Status variant:** The "Current project" pill is a mint chip with a 6px pulsing mint dot, and it is the only chip that animates. It renders only when a study is genuinely in progress.

### Cards / Containers

- **Corner Style:** 16px frame radius with `overflow-hidden`, so a cover image is clipped by the card's own curve.
- **Background:** Lifted Paper (#fefcfb) with a Blush Hairline border, and a second hairline under the cover separating media from copy.
- **Shadow Strategy:** None. See the Tonal Ladder Rule.
- **Internal Padding:** 20px, opening to 28px at `md` (listing cards) or 24px → 32px (project cards).
- **Hover:** Lifts 4px, border warms to Soft Rose Tint, title shifts to Deep Rose, and the arrow well steps 4px right and fills with Pale Rose Wash — all at 300ms, all cancelled under `motion-reduce`.

### Inputs / Fields

- **Style:** Full-width, Lifted Paper fill, Blush Hairline border, 12px card radius, 12px/16px padding, body size, Muted Plum placeholder.
- **Focus:** Border warms to Soft Rose Tint via `transition-colors`, on top of the global 2px Muted Rose focus ring at 3px offset.
- **Labels:** Caption size at 600 weight in ink, sitting 8px above the field. Required fields carry a Muted Rose asterisk; optional fields say "(optional)" in Muted Plum rather than leaving the user to infer it.
- **Error / Success:** Status text at caption size — Deep Rose for errors, Deep Green for success. A `mailto:` fallback renders in place of the whole form if it is disabled.

### Navigation

- **Style:** Sticky, 64px tall, 85% opacity ground with `backdrop-blur-md` and a Blush Hairline bottom border. The wordmark is Playfair at H4 weight 600.
- **States:** Links are Muted Plum at rest and Deep Rose on hover; the active route is Deep Rose at 500 weight and carries `aria-current="page"`.
- **Mobile:** Below `md`, links collapse behind an icon button into a full-width panel of 12px-radius rows at body-large size. The panel closes automatically on route change.

### Pixel Cloud (signature)

The identity component. An SVG of 1×1 rects on a pixel grid, always `aria-hidden`, in three shapes (`cumulus`, `puff`, `wisp`) and three color variants (pink, lavender, sky), sized by a single `size` prop in pixels with height derived from the grid's aspect. Edge cells — any cell with an unfilled orthogonal neighbor — render in the variant's deeper edge color, producing the dithered outline.

It appears at three scales doing three different jobs: full-size drifting across the hero sky, at 28px as a section marker beside an eyebrow label, and as the dot of the "i" in "Arshita Misra" on hover. That range is the point — it is the identity, not an ornament.

### Section Label (signature)

An eyebrow in Deep Rose with an optional 28px puff cloud sitting 12px to its left. This is the system's section opener, and pairing the cloud with the label is what keeps the motif present on pages that have no hero sky.

### Named Rules

**The Whole Card Is The Link Rule.** Listing cards are a single `<Link>` wrapping cover and copy together. The cover carousel is `aria-hidden` so the card keeps exactly one accessible name, and the arrow is `aria-hidden` because it is an affordance, not a second destination.

**The Reciprocal Hover Rule.** On card hover, three things move together: the card lifts, the border warms, and the arrow steps forward into a filled well. All three, or none. And all three are explicitly cancelled with `motion-reduce:` variants — the color changes survive, the movement does not.

**The Off-By-Default Rule.** Every keyframe animation in the system is declared `animation: none` at the top level and enabled only inside `@media (prefers-reduced-motion: no-preference)`. Reduced motion is the stylesheet's resting state, not an override applied on top of it. New animations follow the same shape: define the class as `none`, then switch it on under no-preference.

## Do's and Don'ts

### Do:

- **Do** define every new color in `app/globals.css` under `@theme`, as a raw token feeding a semantic token, and consume only the semantic name in components.
- **Do** use Muted Rose (#ac5169) or Deep Rose (#96455c) for any accent-colored text, and reserve Soft Rose Tint (#e28a9b) for fills, borders, and decoration.
- **Do** ship supporting pastels as soft/deep pairs and use them together — `bg-sky-soft` with `text-sky-deep`, never with ink.
- **Do** give each case study exactly one tone and hold it across every surface that study appears on.
- **Do** set every statement in Playfair and every explanation in Inter, with no crossover into buttons, labels, or captions.
- **Do** cap reading columns at 68 characters using `measure-prose` or `.case-prose`.
- **Do** space major sections with `py-section` and nothing else.
- **Do** reach for a tonal plane and a hairline before reaching for a shadow.
- **Do** declare new animations as `animation: none` first and enable them only under `@media (prefers-reduced-motion: no-preference)`, and pair every hover transform with a `motion-reduce:` cancel.
- **Do** keep pixel clouds on the integer grid with `shapeRendering="crispEdges"`.
- **Do** wrap listing cards in one link and `aria-hidden` the decorative cover and arrow so the card has a single accessible name.
- **Do** state in-progress work as in-progress, using the mint status chip.

### Don't:

- **Don't** put a hex value anywhere outside `app/globals.css`.
- **Don't** use `--color-accent` (#e28a9b) as a text color, ever. It fails contrast on the ground and the rule is documented in the stylesheet.
- **Don't** introduce a fourth radius. 12px, 16px, and 999px cover every case.
- **Don't** introduce a third text color. Ink and Muted Plum are the whole vocabulary; recede by size or position, not by fading further.
- **Don't** add a dark mode or a white ground. The warm pink paper is the world, and there is no dark variant of it.
- **Don't** use a gray border. Every line in the system is Blush Hairline (#f0dddd).
- **Don't** reach for Tailwind's default palette — it is wiped, and `bg-blue-500` will silently produce nothing.
- **Don't** add another arbitrary type value. The homepage hero's `clamp(3.5rem, 9vw + 1rem, 7rem)` is the one sanctioned exception.
- **Don't** drift toward the dark-mode AI startup look: near-black grounds, neon-violet gradients, glow, or glassmorphism. The pink paper ground exists specifically to refuse it.
- **Don't** drift toward agency-portfolio maximalism: scroll-jacking, cursor followers, kinetic type, or autoplaying full-bleed spectacle. Evidence carries this site, not effects.
- **Don't** drift toward the corporate SaaS template: blue-gray neutrals, stock illustration, gradient-on-white heroes, or badge rows.
- **Don't** soften, blur, gradient, or off-grid the pixel cloud.
- **Don't** animate anything at a speed that asks for attention. The slowest cloud takes 200 seconds to cross the screen, and that is the register.
