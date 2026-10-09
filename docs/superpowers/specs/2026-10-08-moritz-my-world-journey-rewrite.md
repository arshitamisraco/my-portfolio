# Moritz + My World: journey-ordered, problem/approach/fix/result rewrite

Date: 2026-10-08
Status: draft copy, awaiting Arshita's truth pass on every [CONFIRM]
Builds on: `2026-10-06-case-study-process-rewrite.md` (voice rules in section 3 still apply)

## 1. Feedback this answers

1. "Videos are good, but they cut abruptly" → refine every loop (section 3).
2. "Where in the product, where in the journey is it?" → a journey map at the top, a journey marker on every feature section, and a "where it lives" thumbnail for cropped widget videos.
3. "Put it in the context of the product" → full-page context for every cropped clip.
4. "First interaction to last interaction" → sections ordered by the user's journey, not by design topic.
5. Arshita: short; every feature says Problem → Approach → Fix → Result.

## 2. Page template (both case studies)

1. Header (title, summary, meta): unchanged layout, new summary copy.
2. **The problem**: evidence, two or three sentences.
3. **The journey**: `JourneyMap`, one row per stage, each linking to its section.
4. **Approach**: one short section on how I worked (Moritz: sketches; My World: the memory model).
5. **One section per journey stage**, in order. Each = journey marker → headline → one `ScreenStory` per screen. A ScreenStory puts that one screen's Problem / Approach / Fix / Result directly beside the screen (desktop) or the Problem directly above it (mobile). Every screen carries its own problem; nothing relies on the page-level problem.
6. **Results**: what exists now, honestly.
7. **Next**: three tiles max.

Removed from Moritz: customer section (folded into problem), before/after table (replaced by the journey map), step-mark state tiles, standalone Human and Voice sections, 11 secondary images.
Removed from My World: "Two widgets became one", "Decluttering", bullet lists, duplicate "test them myself" block.

## 3. Video refinement

Problem: clips end on the last frame and jump straight back to the first.
Fix for every file in `public/videos/moritz-intake/` and `public/videos/my-world/`:
- hold the first frame 0.5s
- hold the last frame 1.5s
- crossfade the final 0.5s into the first frame, so the loop restart is invisible

Script (`scratchpad/smooth-loop.sh`, run per file, writes to a temp file then replaces the original; originals stay in git):

```bash
#!/bin/bash
set -e
in="$1"; tmp="${in%.mp4}.smooth.mp4"
d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$in")
total=$(echo "$d + 2.0" | bc)
off=$(echo "$total - 0.5" | bc)
first=$(mktemp -t first).png
ffmpeg -v error -y -i "$in" -frames:v 1 "$first"
ffmpeg -v error -y -i "$in" -loop 1 -t "$total" -i "$first" -filter_complex \
 "[0:v]tpad=start_duration=0.5:start_mode=clone:stop_duration=1.5:stop_mode=clone,format=yuv420p,setsar=1[v];\
  [1:v]scale=iw:ih,format=yuv420p,setsar=1,fps=30[f];\
  [v]fps=30[v30];[v30][f]xfade=transition=fade:duration=0.5:offset=$off[out]" \
 -map "[out]" -an -c:v libx264 -crf 22 -preset slow -movflags +faststart "$tmp"
mv "$tmp" "$in"
```

Posters stay valid (first frame unchanged). Verify: watch each loop twice in the browser; if a recording itself ends mid-motion (cursor still moving, a transition half done), flag it for re-recording rather than padding it.

## 4. New components (Sonnet 5.5 subagent)

All use existing semantic tokens only, `tone` prop like other case-study blocks.

- `components/case-study/JourneyMap.tsx`
  Props: `stages: { id: string; label: string; detail: string; tag?: string }[]`.
  Desktop: horizontal row of step marks joined by a hairline rail, label under each mark, detail under label. Mobile (<640px): vertical list, same marks on a vertical rail. Each stage is an `<a href="#id">`. Reuse the Moritz step-mark look (filled ring + rail) so the overview echoes the product.
- `components/case-study/JourneyMarker.tsx`
  Props: `step: number; of: number; label: string`. One line: a row of `of` small dots with dots ≤ step filled, then "Step 3 of 7 · Answer questions" in eyebrow style. Rendered by `CaseSection` when it receives a new optional `journey` prop; it replaces the eyebrow.
- `components/case-study/ScreenStory.tsx` (replaces the earlier FeatureBreakdown idea)
  Props: `problem, approach, fix, result: ReactNode; media: ReactNode; before?: { src, width, height, alt }; where?: { src, width, height, alt, region: { x, y, w, h } /* % */, label }; tone?`.
  Desktop (≥1024px): `grid grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 items-start`, text left, screen right, always in that order so the eye scans the same way every time. Text column is `lg:sticky lg:top-28` so the problem stays beside the screen while stacked media scrolls past.
  Text column, top to bottom: optional `where` thumbnail (max-w ~240px full-page screenshot, region outlined 2px in accent, rest dimmed to 40%, caption "Where it lives: {label}"); **Problem** (eyebrow label, value in `text-body-lg` ink, the visual lead); optional `before` thumbnail under the problem, captioned "Before"; then Approach, Fix, Result in `text-body`, hairline-divided, label style from `DecisionLog` (export its `LABEL`/`ROW` constants). Result label in `text-accent-deep`.
  Mobile (<1024px): Problem (and `where`/`before`) → media → Approach / Fix / Result. Use grid areas so the source order stays one component.
  Media inside uses `flush` frames (no `my-8`). Two media items stack in the media column with `gap-4`.
  Margin: `my-12` between ScreenStories.

Add all four to `app/styleguide/page.tsx`.

## 5. Moritz copy

### Header
- summary: "Moritz is an AI-native law firm. A client describes their matter to an agent, and one of the firm's lawyers takes it from there. Clients kept finishing intake unsure what had happened. In three days I redesigned the flow from first visit to return visit and built it as a working prototype inside the firm's own codebase."
- highlight, meta: unchanged.

### The problem (`id="problem"`)
eyebrow: The problem
title: Clients finished intake and still didn't know what had happened.
body: Intake is the first thing a client does with Moritz, and the only part they do alone. The flow worked, but client feedback kept landing on the same four things:
[COMPLAINTS list, unchanged]
body: I had to make submitting a case clearer without making the firm feel more like a form.

### The journey (`id="journey-map"`)
eyebrow: First interaction to last
title: Seven moments, from first visit to coming back.
body: I mapped every moment a client touches and fixed them in order. Each section below starts with where it sits on this line.
JourneyMap:
1. first-visit · First visit · See the whole process before you start · 02 04
2. start · Start a case · One message opens a case · 01
3. answers · Answer questions · A receipt after every answer · 02
4. documents · Add documents · Upload from anywhere, at any step · 03
5. submit · Submit · A case number and a track · 01
6. wait · Wait · Moritz says what it's doing · 01
7. return · Come back · Every case shows its stage and its lawyer · 02 04

### Approach (`id="approach"`)
eyebrow: Approach
title: Four complaints, one cause: the client couldn't see the process.
body: I started on index cards, one per screen, before opening the codebase. Drawing them side by side, every fix pointed at the same gap, so I stopped treating the complaints as four bugs. The test for every screen became one question: can the client tell where they are, and who has their case? [CONFIRM: true to how it happened]
Sketch grid, 3 columns, `size="sketch"` if needed:
- sketch-05 · "No size morph." A progress bar that grew across the top of the chat. Crossed out: it moved, but didn't tell you which steps were done. [CONFIRM]
- sketch-11 · "Fires at top." Step confirmations as a banner at the top. Crossed out: they fired far from where you type, so you'd miss them. They moved into the thread. [CONFIRM]
- sketch-13 · "No collapse." Progress rails that collapsed on both sides. Crossed out: a panel you have to open was one of the original complaints. [CONFIRM]
- sketch-01 · A receipt in the thread after each answer. Kept.
- sketch-07 · The case card, its track ending in faces. Shipped close to this.
- sketch-12 · Home: greeting, lawyers, one action. Kept.

### Stage sections
(Each: `journey={{ step, of: 7, label }}`, title, then one ScreenStory per screen. "media" lines below are that ScreenStory's `media`; the four bullets are its text column. Stages 03 and 04 hold two screens each, split below.)

**01 `id="first-visit"` · First visit**
title: Before typing anything, a new client sees the whole process.
media: journey.mp4 · caption "First visit only. It plays once, ends on three real lawyers, then the composer slides in."
- Problem: A new client landed on a "Start a case" button with no idea what came after it. The only faces in the product were on the confirmation page.
- Approach: Show the steps before the client takes them, and end on people so it reads as a firm.
- Fix: A six-second story under the greeting: talk to Moritz, receive a quote and pay, our lawyers take on your case. It plays once per client and never repeats.
- Result: Complaints 02 and 04 are answered before the first message is typed, and lawyers now appear on home.

**02 `id="start"` · Start a case**
title: One typed message, and the case exists.
media: start.mp4 · caption "The composer sits under the greeting. Sending opens the conversation with the brief already filling in."
- Problem: Starting a case took a button a few clicks deep, and a case didn't exist until it was submitted, so "did I submit?" had no visible answer.
- Approach: Make the first message the start of the case, and give the case something visible from that moment.
- Fix: The composer is on home on every visit. Sending creates a draft tile right away; submitting adds the case number.
- Result: No clicks before the first message. A draft or a case number is always on screen, so complaint 01 always has an answer.

**03 `id="answers"` · Answer questions**
title: Every answer leaves a receipt, and the brief counts down.
Screen 3a · Receipts
media: steps.mp4 · caption "Answer, receipt, next question. The count in the brief moves with each one."
- Problem: Progress lived in a side panel clients had to open, so they lost track of which step they were on.
- Approach: Put progress where the client is already looking, in the conversation. The agent already knew what it had saved; it just never said so.
- Fix: A one-line receipt after every answer, and a count in the brief ("Two left: documents, then review"). Skipped steps count as done. Behind it, I replaced six versions of the step dot with one component with five states, used in the brief, the receipts, the card and the tiles.
- Result: Complaint 02 answered with no new agent capability. One mark now means the same thing on every screen.

Screen 3b · Moritz names what it took
media: working.mp4 · caption "One message fills three items. Moritz says which, and one click corrects them."
- Problem: A long first message often answered several questions at once, and the agent asked them again anyway. [CONFIRM: re-asked, or filled them in silently?]
- Approach: Use what the client already said, and say out loud what was taken so nothing changes behind their back.
- Fix: Moritz fills in the answers it found, names them ("I took what you need and other side from your message"), and leaves each one editable in the brief.
- Result: Fewer questions for clients who write a lot up front, and nothing filled in that the client can't see or correct.

**04 `id="documents"` · Add documents**
title: Upload is offered from the first line a client reads.
Screen 4a · The composer
media: composer.png · caption "Describe your matter, or drop a document here."
- Problem: The attach control was easy to miss, so clients with a contract in hand didn't know where it went.
- Approach: Offer upload in the first thing a client reads.
- Fix: The composer placeholder says "Describe your matter, or drop a document here", and Moritz's first message asks for the document. For contract matters it is the first question, because the contract answers most of the others.
- Result: Upload is visible before the client types a word. Answers complaint 03.

Screen 4b · The brief panel
media: panel-docs-before.png stacked over panel-docs-after.png · captions "Any step: Attach files." / "After: Add more files."
- Problem: Files were only accepted at the documents step, so a client who found a file later had nowhere to put it.
- Approach: Accept a file at any point in the flow.
- Fix: The brief panel offers Attach files at every step, and switches to Add more files once something is attached.
- Result: Upload is open from the first message to review.

**05 `id="submit"` · Submit**
title: Submitting ends in a case number, a track, and the lawyers it's going to.
media: submit.mp4 · caption "The moment of submission."
- Problem: After submitting, the page looked like the one before it. Nothing said the case had gone anywhere.
- Approach: Make submission a distinct object the client can point to, and show what happens next.
- Fix: A card with a check, "Case submitted", the case number, and a four-step track: submitted, estimating quote, accept and pay, meet your lawyer. The track ends in the three lawyers the case is heading to. I refused to show one named lawyer before the firm had assigned one.
- Result: Complaint 01 answered directly. The same three faces follow the case onto its home tile, so they never shuffle.

**06 `id="wait"` · Wait**
title: While the agent works, Moritz says what it's doing.
media: processing.png · caption "Real steps in plain words, then a handover."
- Problem: The old card promised "Quote by tomorrow, 2:32 pm." Nobody at the firm could stand behind that time.
- Approach: Tell the client what is happening and where the next thing will arrive, and drop the when.
- Fix: Moritz narrates the agent's real steps ("Read your documents", "Case notes ready"), says you don't need to stay, and ends with "Your case notes are with the lawyers now. Your quote is next."
- Result: No promise the firm can break, and the client leaves knowing the next step.

**07 `id="return"` · Come back**
title: Back home, every case shows its stage and its lawyer.
media: tiles.png · caption "Newest case on top with its track. Older cases show who has them."
- Problem: Lawyers only appeared on the confirmation page, so a returning client couldn't see who had their case or where it stood.
- Approach: Let each case tile change shape as the case moves.
- Fix: Before a lawyer is assigned, the tile shows the track. After, it shows the lawyer's name and face ("Aélita is on your case"). Every tile shows when it last moved.
- Result: The last interaction answers the same question as the first: where is my case, and who has it?

### Results (`id="results"`)
eyebrow: Results
title: A working prototype in the firm's codebase, in three days.
body: I built it in TypeScript inside Moritz's own app, behind a design switch so the team could compare it with the live flow. Each of the four complaints now has a visible answer at the moment it used to come up. [CONFIRM: what the founder or team said at the demo; whether any of it has shipped.] No client has used it yet, so it is untested.
StatCallout: Claude reads, a script decides. A small model pulls answers out of the client's message, and a hand-written script decides what Moritz says next, so the flow still works when the model is slow or wrong.

### Next (`id="next"`)
eyebrow: What I'd do next
title: Three things, in order.
- Watch strangers use it: A Maze or UX Army run first, then small changes from what people actually do.
- One primary action per screen: Redo the nav so the black button is the one thing to do and everything else drops to secondary.
- Email at every milestone: Submitted, quote ready, lawyer assigned.

## 6. My World copy

### Header
- summary: My World is the page in COROS AI that remembers your coaching: the situations you keep coming back to, your breakthroughs, and what you said you'd do. I designed it end to end, from how memory is structured to the interface and the prompts that write every card, and built parts of it in code.
- meta, ProductIntro, hero: unchanged.

### The problem (`id="problem"`)
eyebrow: The problem
title: The coaching landed, then it disappeared.
body: Across 25 customer interviews, users said the coaching helped and the product gave them no way to see it afterwards.
PullQuote ×2 (unchanged).
body: What they wanted was a place to find the coaching they'd already had.

### The journey (`id="journey-map"`)
eyebrow: First interaction to last
title: From the end of one session to the start of the next.
body: My World sits between coaching sessions. Each section below starts with where it sits on this line.
JourneyMap:
1. session-ends · A session ends · The AI writes down what happened
2. topics · Sessions become topics · Grouped by situation
3. open · Open My World · Everything at a glance
4. look-back · Look back · Breakthroughs by life dimension
5. follow-through · Follow through · Reminders you can check off
6. go-deeper · Go deeper · A question that opens the next session

### Approach (`id="approach"`)
eyebrow: Approach
title: A shape for memory first, then the screens.
body: Before drawing anything, I gave conversations a structure the AI and the user could share:
- Session: one bounded conversation about one situation.
- Topic: the recurring situation many sessions belong to.
- My World: where topics, breakthroughs, provocations and open commitments live.
body: Every screen below is a view onto those three things.

### Stage sections (`of: 6`)

**01 `id="session-ends"` · A session ends**
title: When a session ends, the AI writes down what happened.
media: hero/hero-session.jpg · caption "A session page: summary, entry and exit mood, reminders, and the breakthrough in the user's words."
- Problem: Users had breakthroughs in a session and couldn't find them later. Once the conversation ended, they were buried in the transcript.
- Approach: Have the AI turn each session into a record the user can scan, and never let it claim something the user didn't say.
- Fix: A session summary prompt (now on v6) with an ownership gate: it can only reflect what the user said or agreed to.
- Result: A wrong breakthrough would plant a false memory. The gate stops that at the prompt, before it reaches a card.

**02 `id="topics"` · Sessions become topics**
title: Sessions group into topics, named after situations.
media: topic-to-session.mp4 · caption "My World, into a topic, into one session inside it."
- Problem: Users wanted work conversations kept apart from relationship conversations. The product had one undivided history.
- Approach: Group sessions by the situation they're about, the way users described them in interviews.
- Fix: Topic detection and topic summaries (v7), from prompts I wrote, with one rule: a topic is a situation, never a feeling. "Conversation with dad", not "Self-worth". [CONFIRM: who disagreed, and what settled it]
- Result: The rule now governs the detection pipeline, so topics read like the user's life rather than a diagnosis.

**03 `id="open"` · Open My World**
title: The page became widgets you scan instead of a table you read.
before (thumbnail in the text column, under Problem): topics-page-before.png · caption "Before: topics as a dense table, closer to a CRM."
media: page-tour.mp4 · caption "After: featured cards, reminders, then topics. Filters live inside widgets, never on the page."
- Problem: Early designs listed topics like a CRM: heavy metadata, read row by row.
- Approach: I pitched stakeholders a bento layout where every block is a widget you can scan, with no page-level filters. [CONFIRM: how many passes, and what changed their mind]
- Fix: A featured band of reflective cards, then reminders, then topic cards with inline dimension, date and session count, filterable by life dimension.
- Result: The bento layout replaced the table and is the version that [CONFIRM: shipped / is shipping].

**04 `id="look-back"` · Look back**
title: Two breakthrough widgets became one.
where (thumbnail at top of the text column): hero/hero-page.jpg, region = the donut + quote band, label "the featured band, top of My World".
media: breakthrough-widget.mp4 · caption "Mode A browses every breakthrough. Clicking a segment enters Mode B, and the donut's selection follows auto-advance."
- Problem: The breakthrough donut was about to be cut, and a separate Latest Breakthrough card showed one quote with no context. [CONFIRM: why it was going to be cut]
- Approach: Merge them, so the donut becomes the way you browse the quotes.
- Fix: One widget with two modes, and a full state machine specced before handoff, edge cases included: wrap-around, going backwards, empty dimensions.
- Result: The donut stayed, the team debate was settled, and cross-filtering worked without breaking the no-page-filters rule.

**05 `id="follow-through"` · Follow through**
title: Every commitment from every session, in one checklist.
where (thumbnail at top of the text column): hero/hero-page.jpg, region = the Reminders widget, label "below the featured band".
media: reminders-widget.mp4 · caption "Done gets confetti. Unchecked items go back to where they were."
- Problem: Commitments made in a session stayed in that session. Nothing reminded users what they'd said they'd do.
- Approach: Pool reminders from all sessions into one list on My World.
- Fix: Check one off and it completes with confetti; uncheck it and it returns to its original place in time. Delete exists because the AI can be wrong. I flagged in the spec that unchecking needed a timestamp in shared state.
- Result: Engineering had the state requirement before building. [CONFIRM: shipped? any use signal?]

**06 `id="go-deeper"` · Go deeper**
title: The page ends with a question that leads back into coaching.
media: coaching-provocation.png · caption "A provocation drawn from recent sessions, ending in a question and a Revisit action."
- Problem: A memory page can turn into a dashboard you look at once. Coaching has to keep moving.
- Approach: Close the loop: end the page on something that asks the user a question.
- Fix: A Coaching Provocation card, synthesized across recent sessions ("Identity is built, not discovered"), ending in a question and a Revisit action. [CONFIRM: Revisit opens a new session?]
- Result: The last thing on the page is the first step of the next session.

### Behind every card (`id="transcript-review"`)
eyebrow: Behind every card
title: I test every prompt against real transcripts.
ScreenStory with media = ReviewLoop (unchanged):
- Problem: An inaccurate card is a trust failure. One wrong field and the user stops believing the page.
- Approach: Run the same 20 real transcripts through every prompt, score each field against its rule, and read a stratified sample by hand.
- Fix: Each failure gets one added clause, then the same 20 sessions are re-run to check it held.
- Result: One run surfaced five must-fix issues. All five were fixed with single clauses, each traceable to one behavior.
note (caption style): User conversations are confidential, so examples on this page are redacted or synthetic. The prompts are company IP.

### Built in code (`id="implementation"`)
eyebrow: Co-implementation
title: I built parts of it myself.
body: I wrote production front-end in TypeScript and React on Next.js. [CONFIRM: which components, and one thing writing the code changed in the spec.]

### Results (`id="results"`)
eyebrow: Results
title: Where it stands.
body: [CONFIRM: what is live today, what is in progress, any usage number or "none yet".] I wrote the spec engineers build from, the prompts that generate the content, the QA loop that checks them, and parts of the code.
PullQuote (kept): At a pre-seed startup, the most valuable designer is the one who removes handoffs.

## 7. [CONFIRM] list (answer before implementation)

Moritz
1. The approach paragraph: did the "same fix" realisation happen while sketching?
2. Sketch 05 "No size morph", 11 "Fires at top", 13 "No collapse": are my readings right?
3. Demo reaction from the founder or team; has any of it shipped?
3b. Screen 3b: before the redesign, did the agent re-ask questions a first message had already answered, or fill them in silently?

My World
4. "Topic is a situation": who disagreed, what example settled it?
5. Table → bento: how many passes, what changed stakeholders' minds?
6. Why was the donut about to be cut?
7. Reminders: shipped? any signal?
8. Does Revisit on the provocation open a new session?
9. Which components did you build in code, and what did building change in the spec?
10. What is live today, and is there any usage number?

## 8. Implementation order (after the CONFIRMs)

1. Subagent (Sonnet 5.5): build JourneyMap, JourneyMarker (+ `journey` prop on CaseSection), ScreenStory (with `where` and `before`); add to styleguide.
2. Subagent: run smooth-loop.sh on all 11 videos.
3. Subagent: rewrite `app/projects/moritz-intake/page.tsx` with section 5 copy, then `app/projects/my-world/page.tsx` with section 6 copy.
4. Verify in the browser: journey links scroll to the right section, mobile at 375px (vertical journey map, no horizontal scroll), each video loop watched twice, `npm run build` passes.
5. Commit per case study.
