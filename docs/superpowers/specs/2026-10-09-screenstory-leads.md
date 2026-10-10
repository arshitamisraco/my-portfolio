# ScreenStory: one-sentence leads

Date: 2026-10-09
Supersedes the Problem / Approach / Fix / Result text in `2026-10-08-moritz-my-world-journey-rewrite.md` sections 5 and 6. Everything else in that spec stands.

## Rule

Each row is one clear sentence, styled as a lead (the "heading"). A body appears under it only when the lead can't stand alone. Most rows have no body.

## Component change: `components/case-study/ScreenStory.tsx`

Each of `problem`, `approach`, `fix`, `result` becomes `{ lead: ReactNode; more?: ReactNode }`.

- Label: unchanged (eyebrow).
- Problem lead: `font-display text-h4 font-semibold text-ink`.
- Approach / Fix / Result lead: `text-body-lg font-semibold text-ink`.
- `more` (only when given): `mt-1.5 text-body text-ink-muted`.
- Everything else unchanged.
- Update the styleguide demo to the new shape, one row with `more` and three without.

`[CONFIRM ...]` stays rendered as the existing butter span, placed inside `more` (or appended to `lead` when there is no `more`).

## Moritz (`app/projects/moritz-intake/page.tsx`)

**first-visit**
- P: New clients saw a "Start a case" button and nothing about what came after it.
- A: Show the whole process before the client starts, ending on real people.
- F: A six-second story under the greeting: talk to Moritz, get a quote and pay, meet your lawyers.
  - more: It plays once per client and never repeats.
- R: Clients see every step, and the firm's lawyers, before typing a word.

**start**
- P: A case didn't exist until it was submitted, so "did I submit?" had no visible answer.
  - more: Starting one also took a button a few clicks deep.
- A: Make the first message the start of the case.
- F: The composer sits on home, and sending creates a draft tile right away.
  - more: Submitting adds the case number.
- R: A draft or a case number is always on screen.

**answers · 3a Receipts**
- P: Progress lived in a side panel, so clients lost track of which step they were on.
- A: Put progress in the conversation, where clients are already looking.
  - more: The agent already knew what it had saved; it just never said so.
- F: A one-line receipt after every answer, and a countdown in the brief.
  - more: Skipped steps count as done. Behind it, six versions of the step dot became one component with five states, used on every screen.
- R: Clients always know where they are, with no new agent capability.

**answers · 3b Moritz names what it took**
- P: When a first message answered several questions, the agent asked them again anyway.
  - more: [CONFIRM: re-asked, or filled them in silently?]
- A: Use what the client already said, and say what was taken.
- F: Moritz fills in what it found and names it: "I took what you need and other side from your message."
  - more: Each item stays editable in the brief.
- R: Fewer questions, and nothing changes that the client can't see or correct.

**documents · 4a The composer**
- P: Clients with a contract in hand couldn't find where to upload it.
- A: Offer upload in the first thing a client reads.
- F: The placeholder reads "Describe your matter, or drop a document here."
  - more: For contract matters, the document is Moritz's first question, because the contract answers most of the rest.
- R: Upload is visible before the client types a word.

**documents · 4b The brief panel**
- P: Files were only accepted at the documents step.
- A: Accept a file at any point in the flow.
- F: The brief panel offers Attach files at every step.
  - more: It switches to Add more files once something is attached.
- R: Upload is open from the first message to review.

**submit**
- P: After submitting, nothing on screen said the case had gone anywhere.
- A: Turn submission into something the client can point to.
- F: A card with the case number and a four-step track ending in the three lawyers it's heading to.
  - more: I refused to name one lawyer before the firm had assigned one.
- R: "Did I submit?" is answered the moment you do.

**wait**
- P: The old card promised a quote time nobody at the firm could stand behind.
  - more: It said "Quote by tomorrow, 2:32 pm."
- A: Say what's happening and what comes next, and drop the when.
- F: Moritz narrates the agent's real steps, then hands over: "Your case notes are with the lawyers now. Your quote is next."
- R: The client leaves knowing the next step, with no promise the firm can break.

**return**
- P: Returning clients couldn't see where each case stood or who had it.
- A: Let each case tile change as the case moves.
- F: Tiles show the track until a lawyer is assigned, then the lawyer's name and face.
  - more: Every tile shows when it last moved.
- R: The last screen answers the first question: where is my case, and who has it?

## My World (`app/projects/my-world/page.tsx`)

**session-ends**
- P: Breakthroughs got buried in the transcript once a session ended.
- A: Have the AI turn every session into a record the user can scan.
- F: A session page with the summary, moods, reminders, and the breakthrough in the user's words.
  - more: The summary prompt (v6) has an ownership gate: it can only reflect what the user said or agreed to.
- R: Every session is findable, and no card claims something the user didn't say.

**topics**
- P: Work and relationship conversations lived in one undivided history.
- A: Group sessions by the situation they're about.
- F: Topics are named after situations, never feelings: "Conversation with dad", not "Self-worth".
  - more: I wrote the detection and summary prompts (v7). [CONFIRM: who disagreed, and what settled it]
- R: That rule now governs the detection pipeline.

**open** (keep `before`)
- P: Early designs listed topics like a CRM, to be read row by row.
- A: Make every block a widget you can scan, with no page-level filters.
  - more: [CONFIRM: how many passes, and what changed stakeholders' minds]
- F: Featured cards, then reminders, then topic cards you can filter by life dimension.
- R: The bento layout replaced the table. [CONFIRM: shipped / shipping]

**look-back**
- P: The breakthrough donut was about to be cut.
  - more: Next to it, a separate Latest Breakthrough card showed one quote with no context. [CONFIRM: why it was going to be cut]
- A: Merge them, so the donut becomes how you browse the quotes.
- F: One widget with two modes: browse everything, or click a segment to filter by dimension.
  - more: I specced the full state machine before handoff, including wrap-around, going backwards and empty dimensions.
- R: The donut stayed, and cross-filtering worked without page filters.

**follow-through**
- P: Commitments made in a session stayed in that session.
- A: Pool every reminder into one checklist.
- F: Check one off for confetti; uncheck it and it returns to its place in time.
  - more: Delete exists because the AI can be wrong. I flagged in the spec that unchecking needed a timestamp in shared state.
- R: Engineering had the state requirement before building. [CONFIRM: shipped? any use signal?]

**go-deeper**
- P: A memory page can become a dashboard you check once.
- A: End the page on a question.
- F: A Coaching Provocation drawn from recent sessions, ending in a question and a Revisit action. [CONFIRM: does Revisit open a new session?]
- R: The last thing on the page starts the next session.

**transcript-review**
- P: One wrong card and the user stops trusting the page.
- A: Run the same 20 real transcripts through every prompt and score each field against its rule.
  - more: I read a stratified sample by hand to check the scores.
- F: Each failure gets one added clause, then the batch is re-run.
- R: One run surfaced five must-fix issues, and five single clauses fixed them.
