# Design-system pass on the journey rewrite

Date: 2026-10-09
Source of truth: `DESIGN.md`. Every item below is a rule the new work broke, and the fix.

## ScreenStory (`components/case-study/ScreenStory.tsx`)

1. **Eyebrows are always Deep Rose.** All four row labels (Problem, Approach, Fix, Result) use `LABEL` (`text-style-eyebrow text-accent-deep`). Delete `MUTED_LABEL`.
2. **Serif for statements, Inter for explanations.** Every lead is a statement, so every lead is Playfair:
   - Problem lead: `font-display text-h3 font-semibold text-ink` (H3, the case-study sub-heading token; one step above the others so the problem reads first).
   - Approach / Fix / Result lead: `font-display text-h4 font-semibold text-ink`.
   - `more` stays Inter: `text-body text-ink-muted`.
   - This also removes the off-scale weight (Inter body-lg at 600 is not in the type scale).
3. **Spacing from the set only** (`mt-2, mt-3, mt-4, mt-6, mt-8, mt-10, mt-12`): label → lead `mt-2`; lead → more `mt-2` (was `mt-1.5`, `mt-1`); lead group `space-y-6` (was `space-y-5`); rest group `lg:mt-6` (was `lg:mt-5`).
4. **`where` thumbnail:**
   - Remove the 2px radius (fourth radius), the black 40% `shadow-[0_0_0_9999px…]` (neutral black shadow, not in the vocabulary) and the 2px outline (borders are always 1px).
   - Frame it like `ImageFrame`: `rounded-frame` outer with the tone mat (`p-2` + `TONES[tone]`), image inside at `rounded-[10px]` (the sanctioned nested radius).
   - Mark the region with the selection wash: `border border-accent-strong bg-accent-soft/40`, square corners. No dimming of the rest.
   - Width `max-w-xs` (was `max-w-[240px]`).
5. **`before` thumbnail:** width `max-w-xs` (was `max-w-[280px]`). Mat and nested radius already correct.

## JourneyMap (`components/case-study/JourneyMap.tsx`)

1. **No mono font.** The stage number becomes `text-style-eyebrow text-accent-deep` (was `font-mono text-caption text-ink-muted`).
2. **Stage labels are link text, so Inter:** `text-body font-semibold text-ink group-hover:text-accent-deep` with `transition-colors` (was Playfair H4).
3. **Tag:** `mt-2 text-caption text-ink-muted`, rendered as `Answers {tag}` (two eyebrows in one stage was a second Deep Rose voice competing with the number). Data stays `"02 04"`; render it as "Answers 02, 04" by joining on ", ".
4. **Dot:** `rounded-pill` (not `rounded-full`), no `border-2` (borders are 1px; the fill alone is enough), halo `ring-4 ring-bg` (the ground it sits on, not `surface`).

## JourneyMarker (`components/case-study/JourneyMarker.tsx`)

- `rounded-pill` instead of `rounded-full`. Nothing else.

## Pages

1. **One tone per study.** Every `tone` inside the body sections uses the study's tone from `lib/projects.ts`:
   - `app/projects/moritz-intake/page.tsx`: all `peach` (sketch grid, every ScreenStory, every ImageFrame and CaseVideo).
   - `app/projects/my-world/page.tsx`: all `lavender` (every ScreenStory, ImageFrame, CaseVideo, `before`, `where`).
   - Leave the My World `hero` (HeroStills) untouched; it predates this work. Note it in the report.
2. **CONFIRM tags follow the chip pattern** (pill, soft/deep pair; the old span had a 4px radius and ink-muted on butter, which breaks the Paired Pastel Rule). Replace the local `Confirm` helper's markup in both pages with `<TagChip tone="butter">{"[CONFIRM: …]"}</TagChip>` (import `TagChip` from `@/components/TagChip`; children must be a string). Keep it inline where it is now.
3. **Screen labels** ("Screen 3a · Receipts" etc. on Moritz) are eyebrows, so `text-style-eyebrow text-accent-deep`.
4. Update `app/styleguide/page.tsx` demos if they pass removed props or use old classes.

## Verify

- `npx tsc --noEmit` passes.
- `grep -nE 'rounded-full|rounded "|rounded-\[2px\]|font-mono|rgb\(|#[0-9a-fA-F]{3,6}|text-ink-muted[^"]*text-style-eyebrow|text-style-eyebrow[^"]*text-ink-muted|mt-1\.5|max-w-\[2[48]0px\]'` over the five changed files returns nothing (comments excepted).
- `grep -o 'tone="[a-z]*"'` in each page body returns only the study tone (My World hero excepted).
