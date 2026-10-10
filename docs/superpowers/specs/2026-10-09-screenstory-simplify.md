# ScreenStory: simplify to one heading and three sentences

Date: 2026-10-09
Why: Arshita found each screen unreadable: too many type styles (serif H3, serif H4, Inter muted body, eyebrow, caption, chip) and too much text (a lead plus a second line, a media caption repeating the Fix, CONFIRM chips, dividers).
Supersedes the row copy in `2026-10-09-screenstory-leads.md` and the ScreenStory typography in `2026-10-09-design-system-pass.md`. Tones, JourneyMap and JourneyMarker stay as they are.

## The text column, after

```
PROBLEM                          ← eyebrow, Deep Rose
The breakthrough donut was       ← Playfair H3, ink. The only serif.
about to be cut.

APPROACH                         ← eyebrow, Deep Rose
Merge it with the Latest         ← Inter body, regular, ink
Breakthrough card…

FIX
One widget, two modes…

RESULT
The donut stayed…
```

Exactly three type styles in the column: eyebrow, H3 serif (Problem only), Inter body.

## Component: `components/case-study/ScreenStory.tsx`

- `problem`, `approach`, `fix`, `result` go back to plain `ReactNode` (one sentence each). Remove the `Row` type and `More`.
- Problem: label `LABEL`, then `mt-2 font-display text-h3 font-semibold text-ink`.
- Approach / Fix / Result: label `LABEL`, then `mt-2 text-body text-ink` (regular weight).
- No dividers between rows. Spacing only: `mt-8` between rows (Problem → Approach included).
- `where` caption: `mt-2 text-caption text-ink-muted`, text is just `{label}` (no "Where it lives:" prefix). Thumbnail unchanged otherwise.
- `before` caption unchanged ("Before").
- Update the styleguide demo to the new props.

## Pages

1. Inside every ScreenStory `media`, **remove the `caption` prop** from CaseVideo and ImageFrame. The Fix sentence already says it. (Keep `title`/`description`/`alt`; those are accessibility, not visible text.) Captions outside ScreenStories (sketch grid) stay.
2. **Remove the "Screen 3a · Receipts" / 3b / 4a / 4b eyebrows** on Moritz. The stage title covers it.
3. **CONFIRM tags leave the copy.** Remove every inline `Confirm`/CONFIRM from both pages (approach paragraph, sketch note, ScreenStories, results, implementation). Add one block at the very end of each page, rendered only in development:
   ```tsx
   {process.env.NODE_ENV === "development" && (
     <CaseSection id="open-questions" eyebrow="Open questions (dev only)" title="To confirm before publishing">
       <ol>…one <li> per question…</ol>
     </CaseSection>
   )}
   ```
   Moritz questions: (1) Did the "every fix is the same fix" realisation happen while sketching? (2) Are the readings of sketches 05, 11, 13 right? (3) Demo reaction from the founder or team; has any of it shipped? (4) Did the old agent re-ask questions the first message had already answered, or fill them in silently?
   My World questions: (1) "Topic is a situation": who disagreed, what settled it? (2) Table to bento: how many passes, what changed minds? (3) Why was the donut about to be cut? (4) Have reminders shipped; any use signal? (5) Does Revisit open a new session? (6) Which components did you build in code, and what did building change in the spec? (7) What is live today; any usage number?
   Where removing a CONFIRM leaves a sentence fragment in prose (e.g. "is the version that [CONFIRM]"), rewrite to end cleanly using only the text before it, or drop the sentence.
4. Replace every ScreenStory's four values with the copy below, verbatim.

## Copy

### Moritz

| Screen | Problem | Approach | Fix | Result |
|---|---|---|---|---|
| first-visit | New clients saw a "Start a case" button and nothing about what came after it. | Show the whole process first, ending on real people. | A six-second story that plays once: talk to Moritz, get a quote, meet your lawyers. | Clients see every step, and the lawyers, before typing a word. |
| start | A case didn't exist until it was submitted, so "did I submit?" had no answer. | Make the first message the start of the case. | Sending a message from home creates a draft tile right away. | A draft or a case number is always on screen. |
| answers 3a (steps.mp4) | Progress hid in a side panel, so clients lost their place. | Put progress in the conversation, where clients already look. | A one-line receipt after every answer, and a countdown in the brief. | Clients always know where they are, with no new agent capability. |
| answers 3b (working.mp4) | The agent re-asked questions the first message had already answered. | Use what the client said, and say what was taken. | Moritz fills in what it found, names it, and leaves every item editable. | Fewer questions, and nothing changes behind the client's back. |
| documents 4a (composer) | Clients with a contract in hand couldn't find where to upload it. | Offer upload in the first thing a client reads. | The placeholder reads "Describe your matter, or drop a document here." | Upload is visible before the client types a word. |
| documents 4b (brief panel) | Files were only accepted at the documents step. | Accept a file at any point. | The brief panel offers Attach files at every step. | Upload is open from the first message to review. |
| submit | After submitting, nothing said the case had gone anywhere. | Make submission something the client can point to. | A card with the case number and a track ending in the three lawyers it's heading to. | "Did I submit?" is answered the moment you do. |
| wait | The old card promised "Quote by tomorrow, 2:32 pm," a time nobody could keep. | Say what's happening and what's next, and drop the when. | Moritz narrates the agent's real steps, then says the quote is next. | No promise the firm can break. |
| return | Returning clients couldn't see where each case stood or who had it. | Let each tile change as the case moves. | Tiles show the track until a lawyer is assigned, then the lawyer's face. | The last screen answers the first question: where is my case? |

### My World

| Screen | Problem | Approach | Fix | Result |
|---|---|---|---|---|
| session-ends | Breakthroughs got buried in the transcript once a session ended. | Turn every session into a record the user can scan. | A session page written by a prompt that can only reflect what the user said or agreed to. | Every session is findable, and every card is true to the user. |
| topics | Work and relationship conversations sat in one undivided history. | Group sessions by the situation they're about. | Topics are named after situations, never feelings: "Conversation with dad", not "Self-worth". | That rule now governs topic detection. |
| open (keep `before`) | Early designs listed topics like a CRM, to be read row by row. | Make every block a widget you can scan. | Featured cards, then reminders, then topic cards filtered by life dimension. | The bento layout replaced the table. |
| look-back | The breakthrough donut was about to be cut. | Merge it with the Latest Breakthrough card, so the donut becomes how you browse. | One widget, two modes: browse everything, or click a segment to filter. | The donut stayed, with every edge case specced before handoff. |
| follow-through | Commitments made in a session stayed in that session. | Pool every reminder into one checklist. | Check one off for confetti; uncheck it and it returns to its place. | One list of everything the user said they'd do. |
| go-deeper | A memory page can become a dashboard you check once. | End the page on a question. | A Coaching Provocation drawn from recent sessions, with a Revisit action. | The last thing on the page starts the next session. |
| transcript-review | One wrong card and the user stops trusting the page. | Score every prompt against the same 20 real transcripts. | Fix each failure with one added clause, then re-run the batch. | One run found five must-fix issues; five clauses fixed them. |

`where` labels: look-back "Top band, left"; follow-through "Below the top band"; go-deeper "Top band, right".

## Verify

- `npx tsc --noEmit` passes.
- `grep -n "more:\|caption=" ` inside ScreenStory blocks returns nothing; `grep -c "CONFIRM"` in each page appears only inside the dev-only block.
