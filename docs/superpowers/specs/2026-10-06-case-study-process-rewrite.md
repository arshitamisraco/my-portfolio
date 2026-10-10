# Case-study rewrite: show the process, not just the result

Date: 2026-10-06
Status: plan, awaiting Arshita's review
Scope: Moritz intake, My World, Founding design, Design system (in that order). Gmail Job Tracker and Switcharoo get the same treatment in a later pass.

## 1. The feedback, translated

A senior designer read the site and said: the content looks generated, it does not engage, it shows the work without showing you, and it never says how you got from A to B. They want, per case study: problem statement, hypothesis, overall workflow, and how you reached the result, including why you chose one way over another ("if I do X, the user will be able to Y").

What that maps to on the site today:

| Symptom they named | Where it shows up |
| --- | --- |
| Reads as generated | Six pages, one template, one cadence. Clipped verdict sentences ("A library, not a game." "The prompts are the product."). Tile grids and pull quotes carry the argument instead of prose. No wrong turns, no dates, no "I thought". |
| Shows the work without you | Decisions appear as settled facts. Moritz: "All four complaints are one complaint" arrives with no path to it. Design system: "One rule: components never touch raw colors" with no account of why that rule or what it replaced. |
| No A to B | Only one section on the whole site tells a full arc: the personality slider in Founding design (three modes, one cut after testing, users called the slider binary, it became a toggle). That is the model. It is buried two-thirds down the longest page. |
| No hypothesis | Nothing is phrased as a bet before a screen appears. Hypotheses exist in your head; they are not on the page. |
| Missing process evidence | Thirteen Moritz ideation sketches sit unused in `content/images/moritz-ideation/`, including crossed-out cards annotated "no size morph" and "fires at top". Figma version history for COROS has never been mined. |

One constraint governs everything below (from PRODUCT.md): nothing gets invented. Every hypothesis, rejected option, and reaction has to come from you, which is why the plan starts with interviews, not drafts.

## 2. The narrative spine

Every rewritten case study follows the same six beats. The headings on the page can vary; the beats cannot.

1. **The problem, with evidence.** What was broken, who said so, what it cost. Existing quotes and numbers stay. New: when you heard it and what you first assumed it meant.
2. **The hypothesis.** One to three sentences, stated before any screen: "I believed that if I did X, the user would be able to Y." Written as a bet, with what would have proved it wrong.
3. **What I tried.** The options you considered and the ones you killed, with the reason each lost. Sketches, old Figma frames, abandoned directions, stakeholder pushback. This section is new on every page.
4. **What I built.** The shipped screens, each caption tied back to the hypothesis it tests. Most existing media stays; captions are rewritten.
5. **What happened.** Test reaction, metric, demo feedback, or an honest "not yet tested." Never a claim without a source.
6. **What I'd change.** The existing "what I'd do next" tiles, rewritten as consequences of what section 5 showed.

Each section answers one of the designer's questions literally. A reader who skims the eyebrows should be able to reconstruct the arc without reading a paragraph.

## 3. Voice rules

The register changes from clipped aphorism to first-person narrative. Concrete rules for the copy:

- First person, past tense, with time markers. "On the first morning I…", "By the second version…", "Two days in, the founder said…"
- At least one admitted wrong turn per case study, told plainly. "My first instinct was X. It was wrong because Y."
- Say who. Named roles (the founder, the two engineers, the alpha testers), not "stakeholders" or "the team".
- Hypotheses in the conditional: "I bet that if…, then…". Results in plain past: "It did." / "It didn't, so…"
- Fewer tiles, fewer pull quotes. A tile grid is allowed only for a genuine list (states, stored fields). Arguments go in prose.
- Sentences may be long when they carry reasoning. The clipped three-word sentence is reserved for a punch, once per section at most.
- No "not X, but Y" constructions, no "the rule I fought for", no rhetorical triplets, no sentence that could sit on any designer's site.
- Keep the existing warmth (PRODUCT.md: "unpolished on purpose"). Warm and specific, not warm and vague.

Example of the shift, using the Moritz "approach" paragraph. The facts in the rewrite are placeholders to show the shape; the real version comes from the interview.

Current:

> All four complaints are one complaint. The client can't see the process. So the redesign puts the process on screen everywhere the client looks: a story before they start, a receipt after every answer, a track after they submit, a lawyer's face at each of those moments.

Target shape:

> My first read of the four complaints was four bugs: add a confirmation, add a progress bar, move the upload button, warm up the copy. I sketched it that way on index cards on the first morning. Around the third card I noticed every fix was the same fix. The client couldn't see the process, so each screen had to show it. My bet was that if a client could always answer "where am I, and who has this," the four complaints would go away without four separate features. That became the test for everything I added over the next two days, and it is why two of the cards below are crossed out.

## 4. One new component, two reused ones

**New: `DecisionLog`** (`components/case-study/DecisionLog.tsx`). A bordered block in the existing frame style with four labelled rows: Hypothesis, Tried, Saw, Decided. "Tried" accepts a list where each item can be marked rejected, rendered muted with its reason. Uses existing semantic tokens only; `tone` prop like other case-study blocks. Used once or twice per case study at the key forks, not on every section.

**Reused: `ImageFrame` in a sketch strip.** A two- or three-column grid of sketch photos with captions that quote the note on the card. No new component; a `sketch` size preset if the aspect ratio needs it.

**Reused: `StatCallout`** for "what happened" lines that have a number or a quote attached.

`CaseStudyLayout` gains nothing new. The `highlight` box stays for the skim reader.

## 5. Per case study

### 5.1 Moritz intake (first)

Why first: smallest page, most recent memory, and the only one with process artifacts already on disk.

Keep: the four complaints list, the before/after table (moved after the hypothesis), all videos and screens, the voice section, the "what I'd do next" tiles.

Add:
- A "first morning" section with the index-card sketches. Convert the 13 HEIC files to web JPEGs in `public/images/moritz-intake/sketches/`, pick the five or six that show a direction being tried and crossed out.
- A `DecisionLog` on the journey animation (static stepper vs. played-once story) and one on the step mark (six existing drawings vs. one component).
- A short "what got cut in three days" paragraph.
- A "what happened" section: the founder's or firm's reaction to the demo, and the honest state (behind a design switch, untested with clients).

Rewrite: the summary, the approach section, every caption that currently describes the screen instead of the reason for it.

Interview questions:
1. What did you actually receive as the brief? Were the four complaints from the firm, from support, or your own read of the flow?
2. What was your first instinct for fixing it, before the sketches? Was it right?
3. Walk me through the index cards in order. Which ones did you cross out, and what do "no size morph" and "fires at top" mean?
4. How did you decide what fit in three days? What did you want to do and leave out?
5. The journey animation: did it start as a static stepper or a paragraph? Why did it become a six-second story that plays once?
6. The step dot existed six ways. What did the worst one look like, and why build one component instead of fixing each?
7. Who at Moritz pushed back on anything, and what did they say?
8. What did the founder say when you demoed it? Has any client seen it?
9. What surprised you about working inside their codebase?
10. For each of journey, receipts, attach, submitted card: finish the sentence "if I do this, the client will be able to…".

### 5.2 My World (second)

Why second: strongest research on the site, thinnest body after it. The arc is nearly there; the forks are missing.

Keep: the 25-interview opener and both quotes, the Session/Topic/My World definitions, all videos, the transcript review loop, the confidentiality note.

Add:
- The first IA you proposed and what it lost to (threads? folders? tags?), as a `DecisionLog`.
- The "topic is a situation, never a feeling" fight: who disagreed, the example that settled it.
- The donut widget story as a proper arc: who wanted it cut, why, what merging solved, what the state machine cost in engineering.
- The CRM table to bento path with the actual passes, pulled from Figma history (ask for the frames).
- One redactable example of a prompt failure from the five must-fix issues and the clause that fixed it.
- A real co-implementation section: what you built in code, which components, and how writing it changed the spec.
- Current state: what is live, what is in progress, any usage signal (or none).

Rewrite: the "Two widgets became one" and "Decluttering" sections, which currently state outcomes in bullets. The takeaway pull quote stays if it survives the voice rules.

Interview questions:
1. The 25 interviews: who ran them, how many did you sit in on, how did you synthesize them?
2. What was the first structure you proposed for memory? What were the alternatives and why did they lose?
3. Why did "a topic is a situation, never a feeling" need fighting for? Who disagreed, and what example convinced them?
4. The donut: who wanted it cut and why? What did you argue? What did merging it with Latest Breakthrough solve that keeping both didn't?
5. The topics table to bento: how many passes, what did the CEO or engineers want, what did you show that changed their mind?
6. Prompts went to v6 and v7. What did v1 get wrong? Give me one of the five must-fix issues in terms you can publish.
7. What did you build in code yourself? Which parts? Did writing it change the spec?
8. What is shipped today, what is still in progress, and is there any number on use?
9. What would you tell someone who said "this is a dashboard, not coaching"?

### 5.3 Founding design (third)

Why third: it already has the best process story on the site. The job is to make that story the spine and trim what dilutes it.

Keep: the user quotes, the competitive analysis, the onboarding flow diagram, the Dimensions before/after, the full personality slider arc, the final onboarding screens, the reflection (rewritten shorter).

Cut or move: the "many hats" bullet list in Context (it is a résumé, not a story); the component specimen sheets, brand, and pitch deck sections, which move to a compact "Also at COROS" strip at the end with one image each and a link, or to the COROS hub page. The brand work deserves its own small page later if you want it; it does not belong inside the onboarding arc.

Add:
- A hypothesis section after the research: what you bet an onboarding would change in the coaching, and how you would have known it failed.
- Dimensions as a `DecisionLog`: why hexagons, why colour was dropped, what testing showed.
- Influences: was it ever required, what happened, why it became optional.
- Name-first: was it always first, what did v1 look like.
- "What happened": the 55% next-day return and 40% weekly active from the hub page, stated with what was measured before and after and whether it is attributable. If it is not attributable, the copy says "after", not "because of".

Interview questions:
1. Before the onboarding existed, what did a first conversation look like, and what did you bet onboarding would change?
2. Dimensions: why hexagons? What did the first coloured version do in testing that the grey one fixed?
3. Was Influences ever required? What happened?
4. Was Name always first? What was the v1 flow order, and what moved?
5. Who decided to cut Supportive, and what was the test or conversation that did it?
6. The 55% and 40% on the hub page: what was measured before, what after, and over what window? Can you honestly tie it to onboarding?
7. What did you get wrong in the first onboarding that the second fixed?
8. Are you happy moving brand and pitch deck out of this page into a short strip or their own page?

### 5.4 Design system (fourth)

Why last: biggest rewrite, and the one that needs the most from memory and Figma history. Right now it is a gallery with a one-sentence problem.

Keep: the hero montage, the token screenshots, the chat state inventory, the settings videos, the retrieved-context panel, the tone comparison.

Add:
- A real problem section: what "strained their eyes" meant concretely (dark-only, contrast, density), how many testers, how you heard it. A v1 "before" screenshot is required; pull from Figma history or an old build.
- Why shadcn and whether that was your call or engineering's, and what you argued for inside that decision.
- Token architecture as a `DecisionLog`: what you tried first, what broke, why three layers.
- The three user-bubble prototypes in HTML, as its own section with images if the prototypes still exist. This is the best process story on the page and it is one sentence today.
- The retrieved-context panel: the question logs could not answer, and one bug it caught.
- Rollout: surface by surface or all at once, what broke, how long.
- "What happened": define "days to hours" with the before and after cycle, and say how you know "zero redesign requests".

Rewrite: the one-line sections (Components, Onboarding, Settings) into paragraphs that carry a reason. The "At a glance" stats stay.

Interview questions:
1. "Strained their eyes": what exactly did testers say, how many, and how did you hear it?
2. Was moving to shadcn your decision or engineering's? What did you argue for inside it?
3. Do you have a v1 screenshot or Figma frame? What did v1 look like?
4. Tokens: what did you try first, and what broke that led to primitives, brand layer, semantic?
5. The three user-bubble options: what were they, what did the team argue about, which won and why? Do the HTML prototypes exist?
6. The retrieved-context panel: what question were you asking that logs couldn't answer? What did it catch?
7. How did it roll out? What broke on the way?
8. "Days to hours": what was a cycle before and after, concretely?
9. "Zero redesign requests": how do you know?

## 6. Order of work

For each case study, in the order above:

1. **Interview** in this chat. I ask the questions in section 5; you answer roughly, in your words. I follow up where an answer hides a fork.
2. **Pull material.** You send Figma frames or links for the rejected versions I ask for. I convert sketches and screenshots into web assets and name them.
3. **Draft copy** here, as the full section-by-section text with captions, plus the `DecisionLog` contents. You read it for truth first, voice second.
4. **One revision pass** on your corrections.
5. **Implementation plan** written to the scratchpad with final copy, exact file paths, full TSX for the new sections, media commands, and verify and commit steps, then dispatched to a Sonnet 5.5 coding subagent. Copy and decisions stay in this chat; the subagent only edits.
6. **Verify** the built page in the browser against the draft, then commit.

Moritz first, end to end, before starting My World. One finished page teaches us what the template needs before the other three.

Before the Moritz interview starts, one shared task: build `DecisionLog` once and convert the Moritz sketches to web assets, on a Sonnet 5.5 subagent, so every page gets the same block. This does not depend on any interview answer, so it starts now.

## 7. What I need from you

- Figma links or exported frames for: My World topics page passes, the donut and Latest Breakthrough widgets before merging, the first memory IA; Founding design v1 flow order and the coloured Dimensions; Design system v1 screens and the three user-bubble prototypes if they exist.
- Permission to move brand and pitch deck out of Founding design.
- The before and after for the 55% and 40% figures, or the decision to present them as "after", not "because of".
- Roughly 30 to 45 minutes per case study for the interview.

## 8. Out of scope for this pass

Gmail Job Tracker and Switcharoo (same treatment later). The COROS hub page beyond moving the brand strip if we choose to. Any visual redesign of `CaseStudyLayout`. New metrics: if a number is not already on the site or in your records, it does not appear.

## 9. Done when

A reader of any rewritten page can answer, from the eyebrows alone: what was broken, what you bet, what you tried and dropped, what shipped, what happened, and what you'd change. The senior designer's four complaints each have a section that answers them. No sentence on the page could be lifted onto another designer's site unchanged.
