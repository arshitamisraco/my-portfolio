import type { Metadata } from "next";
import CaseSection from "@/components/case-study/CaseSection";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import HeroStills from "@/components/case-study/HeroStills";
import LabeledTiles from "@/components/case-study/LabeledTiles";
import QuoteCard from "@/components/case-study/QuoteCard";
import StatCallout from "@/components/case-study/StatCallout";
import CaseVideo from "@/components/CaseVideo";
import ImageFrame from "@/components/ImageFrame";
import PullQuote from "@/components/PullQuote";

export const metadata: Metadata = {
  title: "Redesigning a law firm's front door",
  description:
    "A one-week design take-home for Moritz, an AI-native law firm: the case intake flow redesigned end to end and built as a working TypeScript prototype.",
};

const LIVE_URL = "https://legal-intake-design.vercel.app/en/client/fresh";

export default function MoritzIntake() {
  return (
    <CaseStudyLayout
      slug="moritz-intake"
      eyebrow="Design Take-Home · Case Study"
      title="Redesigning a law firm's front door"
      summary="Moritz is an AI-native law firm. Clients describe a matter, agents do the first pass, lawyers finish it. Intake is the only step the client drives, and clients weren't sure what had just happened. In one week I redesigned it end to end and built it as a working prototype inside the firm's own Next.js design playground: one composer as the front door, a receipt for every answer, an attach button you can actually see, and a submission moment that says what happens next."
      highlight={{
        stat: "Built, not mocked: a working prototype in 5 days · 54 commits · four complaints from the brief, each answered in the flow",
      }}
      meta={[
        { label: "Role", value: "Product design · Design engineering · UX writing" },
        { label: "For", value: "Moritz (Casei AI), design take-home" },
        { label: "Timeline", value: "One week · September 2026" },
        {
          label: "Live prototype",
          value: (
            <>
              <a
                href={LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-deep underline decoration-accent underline-offset-4 hover:text-accent-strong"
              >
                legal-intake-design.vercel.app
              </a>
              <span className="block text-caption text-ink-muted">password 123</span>
            </>
          ),
        },
      ]}
      hero={
        <HeroStills
          ariaLabel="A first look at the redesigned Moritz intake"
          fullBleed
          rows={[
            [
              {
                kind: "video",
                src: "/videos/moritz-intake/start.mp4",
                poster: "/images/moritz-intake/posters/start.jpg",
                width: 1440,
                height: 900,
                title: "Starting a case",
                description:
                  "A new client types into the composer under the greeting; the case-journey animation plays once and the intake conversation begins.",
                tone: "peach",
              },
              {
                src: "/images/moritz-intake/new-user-home.png",
                width: 2880,
                height: 1800,
                alt: "A new client's home screen: 'Good evening, Alex', a composer that says 'Describe your matter, or drop a document here', matter chips, and a row of five lawyers with their backgrounds.",
                tone: "sky",
              },
            ],
            [
              {
                kind: "video",
                src: "/videos/moritz-intake/submit.mp4",
                poster: "/images/moritz-intake/posters/submit.jpg",
                width: 1440,
                height: 900,
                title: "Submitting a case",
                description:
                  "The review card is submitted; a card with the case number and a four-step track appears, then Moritz narrates the processing steps.",
                tone: "lavender",
              },
              [
                {
                  src: "/images/moritz-intake/receipt.png",
                  width: 1560,
                  height: 330,
                  alt: "A step receipt in the thread: a green check, 'Saved timeline', then Moritz's next message.",
                  tone: "mint",
                },
                {
                  src: "/images/moritz-intake/attribution.png",
                  width: 1350,
                  height: 240,
                  alt: "Moritz: 'I took what you need and other side from your message. Change anything I've got wrong.'",
                  tone: "butter",
                },
                {
                  src: "/images/moritz-intake/processing.png",
                  width: 1450,
                  height: 420,
                  alt: "After submit: 'Read your documents', 'Case notes ready', then 'Your case notes are with the lawyers now.'",
                  tone: "pink",
                },
              ],
            ],
            [
              {
                src: "/images/moritz-intake/tiles.png",
                width: 1570,
                height: 760,
                alt: "Your cases: a hero tile with a four-step track ending in three lawyers, a compact row that says 'Ready for payment', and a row that says 'Aélita is on your case'.",
                tone: "sky",
              },
              {
                kind: "video",
                src: "/videos/moritz-intake/after.mp4",
                poster: "/images/moritz-intake/posters/after.jpg",
                width: 1440,
                height: 900,
                title: "Home, after submitting",
                description:
                  "Back on the home screen, the new case sits at the top with its stage, its lawyers, and its last update.",
                tone: "peach",
              },
            ],
          ]}
        />
      }
    >
      <CaseSection id="brief" eyebrow="The brief" title="Four complaints, from real clients">
        <p>
          Moritz&rsquo;s intake worked. It just didn&rsquo;t feel like a premium product, and too
          many people weren&rsquo;t sure what had happened. The feedback was specific:
        </p>
        <LabeledTiles
          columns={2}
          tiles={[
            { label: "01 · Not sure it was submitted." },
            { label: "02 · Not sure which step, or where." },
            { label: "03 · Can't find the upload." },
            { label: "04 · Feels sterile." },
          ]}
        />
        <p>
          Two goals, pulling against each other: make submitting a case as clear as possible,
          and make it feel premium and human. That tension was the design problem.
        </p>
        <PullQuote attribution="The brief">
          Clear and concise beats clever. If a decision makes the flow prettier but less obvious,
          make the other decision.
        </PullQuote>
        <p>
          The format was blunt: not Figma screens, a working prototype in TypeScript, built on
          the firm&rsquo;s existing design playground. One week.
        </p>
      </CaseSection>

      <CaseSection id="before-after" eyebrow="What changed" title="Before and after, in one table">
        <div className="case-table overflow-x-auto">
          <table className="w-full text-left text-body">
            <thead>
              <tr className="text-style-eyebrow text-ink">
                <th className="py-2 pr-4 font-medium">Moment</th>
                <th className="py-2 pr-4 font-medium">Before</th>
                <th className="py-2 font-medium">After</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Starting a case",
                  "A 'Start a case' button, a few clicks deep",
                  "One composer under the greeting, on every visit",
                ],
                [
                  "Knowing you've submitted",
                  "A state changed somewhere",
                  "A case number, a card that says Case submitted, a track that shows what's next",
                ],
                [
                  "Knowing where you are",
                  "A side panel you had to open",
                  "A receipt in the thread after every answer, and a count in the brief",
                ],
                [
                  "Uploading",
                  "An attach control people couldn't find",
                  "In the placeholder, in Moritz's first message, in the brief panel, at any step",
                ],
                [
                  "Waiting",
                  "A promised time nobody could keep",
                  "Three narrated steps, then 'your notes are with the lawyers'",
                ],
                [
                  "Who's behind it",
                  "Faces on the confirmation only",
                  "Real lawyers on home, in the brief, on the card, on every tile",
                ],
              ].map(([moment, before, after]) => (
                <tr key={moment} className="border-b border-line align-top last:border-0">
                  <td className="py-3 pr-4 font-medium text-ink">{moment}</td>
                  <td className="py-3 pr-4 text-ink-muted">{before}</td>
                  <td className="py-3 text-ink">{after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CaseSection>

      <CaseSection id="start" eyebrow="Starting a case" title="One box, one message. The case has started.">
        <p>
          Before, &ldquo;Start a case&rdquo; was buried a few clicks deep. Now the composer sits
          under the greeting. The journey plays once, in three beats, and the lawyers are
          already there.
        </p>
        <CaseVideo
          src="/videos/moritz-intake/start.mp4"
          poster="/images/moritz-intake/posters/start.jpg"
          width={1440}
          height={900}
          title="Starting a case"
          description="A new client types into the composer under the greeting; the case-journey animation plays once and the intake conversation begins."
          caption="A new client's first visit. The first message starts the case."
          tone="peach"
        />
        <ImageFrame
          src="/images/moritz-intake/journey-beats.png"
          width={2780}
          height={260}
          alt="The three beats of the case journey: Talk to Moritz about your case, Receive a quote and pay, Our lawyers take on your case."
          caption="The journey, three beats. It ends in people, not a checkmark."
          tone="butter"
        />
        <StatCallout>
          A case exists from the first typed message, not from submission. A draft tile appears
          the moment you start, so &ldquo;did I submit?&rdquo; has a visible answer: the number
          appears when you do.
        </StatCallout>
      </CaseSection>

      <CaseSection id="receipts" eyebrow="Where am I" title="Every answer gets a receipt.">
        <p>
          Each answer leaves a one-line receipt in the thread, and the count in the brief moves.
          Skip a step and it still counts. You chose, so it&rsquo;s done.
        </p>
        <CaseVideo
          src="/videos/moritz-intake/steps.mp4"
          poster="/images/moritz-intake/posters/steps.jpg"
          width={1440}
          height={900}
          title="Step receipts"
          description="As the client answers, a receipt appears in the conversation and the case brief on the right fills in and counts up."
          caption="The brief fills in as you talk."
          tone="peach"
        />
        <ImageFrame
          src="/images/moritz-intake/receipt.png"
          width={1560}
          height={330}
          alt="A step receipt in the thread: a green check, 'Saved timeline', then Moritz: 'Got it, you need to resolve this by end of week. We have what we need.'"
          caption="The receipt, in the thread."
          tone="mint"
        />
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <ImageFrame
            src="/images/moritz-intake/brief-count.png"
            width={730}
            height={96}
            alt="The case brief header with its step count."
            caption="The count."
            flush
            tone="sky"
          />
          <ImageFrame
            src="/images/moritz-intake/brief-skipped.png"
            width={730}
            height={240}
            alt="A skipped optional step in the brief, drawn with a dashed ring, still counted as done."
            caption="Skipped, still counted."
            flush
            tone="lavender"
          />
        </div>
        <p>
          The receipts aren&rsquo;t a new capability. The agent already knew what it had saved.
          It just never said so.
        </p>
      </CaseSection>

      <CaseSection id="transparency" eyebrow="Transparency" title="Moritz shows its working.">
        <p>
          When it pulls answers out of your first message, it says which ones. Anything it filled
          in is yours to correct.
        </p>
        <CaseVideo
          src="/videos/moritz-intake/working.mp4"
          poster="/images/moritz-intake/posters/working.jpg"
          width={1440}
          height={900}
          title="Moritz names what it took"
          description="A long first message is read, several brief items fill in at once, and Moritz says which ones it took from the message."
          caption="One message, several items, and a line saying so."
          tone="peach"
        />
        <ImageFrame
          src="/images/moritz-intake/attribution.png"
          width={1350}
          height={240}
          alt="Moritz: 'Got it, early termination notice with a fee dispute, deadline end of next week. I took what you need and other side from your message. Change anything I've got wrong. What would a good outcome look like? Feel free to skip if you're not sure yet.'"
          caption="The line, in the script."
          tone="butter"
        />
      </CaseSection>

      <CaseSection id="attachments" eyebrow="Attachments" title="A button you can see, and the first thing you read.">
        <p>
          In the placeholder. In Moritz&rsquo;s first message. In the brief panel, at every step,
          before and after. A file is accepted at any point, not only at the documents step.
        </p>
        <ImageFrame
          src="/images/moritz-intake/composer.png"
          width={1570}
          height={380}
          alt="The composer: 'Describe your matter, or drop a document here', an Attach file button, a microphone, and a black 'Start a new case' button, with matter chips below."
          caption="Describe your matter, or drop a document here."
          tone="peach"
        />
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <ImageFrame
            src="/images/moritz-intake/panel-docs-before.png"
            width={730}
            height={370}
            alt="The brief panel mid-intake: Timeline is current, Documents is optional with an Attach files button, Review and submit is next."
            caption="Brief panel, any step: Attach files."
            flush
            tone="sky"
          />
          <ImageFrame
            src="/images/moritz-intake/panel-docs-after.png"
            width={730}
            height={390}
            alt="The brief panel after a file is attached: the document listed under Documents, with an Add more files button."
            caption="Brief panel, after: Add more files."
            flush
            tone="mint"
          />
        </div>
        <p>
          For contract matters, the very first question is the document. A contract usually
          already exists, and asking for it late means re-asking everything it would have
          answered.
        </p>
      </CaseSection>

      <CaseSection id="submission" eyebrow="The moment of submission" title="Submitted. Here's what happens next.">
        <p>
          A number, a track, the people. Then the wait is narrated, step by step, instead of a
          spinner.
        </p>
        <CaseVideo
          src="/videos/moritz-intake/submit.mp4"
          poster="/images/moritz-intake/posters/submit.jpg"
          width={1440}
          height={900}
          title="Submitting a case"
          description="The review card is submitted; a card with the case number and a four-step track appears, then Moritz narrates the processing steps."
          caption="The moment of submission, start to finish."
          tone="peach"
        />
        <ImageFrame
          src="/images/moritz-intake/card-top.png"
          width={1424}
          height={540}
          alt="The submitted card: a check, 'Case submitted', the title 'Northwind Fulfilment Termination', case number M-2026-0127, and a track: Case submitted, Estimating quote, Accept and pay, Meet your lawyer, ending in three lawyer faces."
          caption="The track. It ends in the three lawyers the case is heading toward."
          tone="lavender"
        />
        <ImageFrame
          src="/images/moritz-intake/processing.png"
          width={1450}
          height={420}
          alt="Moritz: 'We're getting your case ready for the lawyers. It takes a few minutes and you don't need to stay.' Then two green checks, 'Read your documents' and 'Case notes ready', then 'Your case notes are with the lawyers now. Your quote is next.'"
          caption="While the agent works. Three real steps, in plain words."
          tone="mint"
        />
        <StatCallout>
          The old card promised &ldquo;Quote by tomorrow, 2:32 pm.&rdquo; Nobody could stand
          behind that. Now it says where the quote will arrive, not when.
        </StatCallout>
      </CaseSection>

      <CaseSection id="home" eyebrow="Home" title="Every case, its progress, on the home screen.">
        <p>Stage, lawyer, last update. No wondering where a case is.</p>
        <CaseVideo
          src="/videos/moritz-intake/after.mp4"
          poster="/images/moritz-intake/posters/after.jpg"
          width={1440}
          height={900}
          title="Home, after submitting"
          description="Back on the home screen, the new case sits at the top with its stage, its lawyers, and its last update."
          caption="Back home. The new case is at the top, with its track."
          tone="peach"
        />
        <ImageFrame
          src="/images/moritz-intake/tiles.png"
          width={1570}
          height={760}
          alt="Your cases: a hero tile for the newest case with the four-step track, a compact row that says 'Ready for payment' with three faces, and a row that says 'Aélita is on your case' with one face."
          caption="Your cases. A tile changes shape as the case moves: a track before a lawyer is assigned, a name after."
          tone="sky"
        />
      </CaseSection>

      <CaseSection id="human" eyebrow="Human" title="A person at every step.">
        <p>
          Home, brief panel, submitted card, every case tile, and every case you come back to.
          The client is never looking at a form alone. The same three faces follow a case from
          the card to the tile, seeded by its number, so they never shuffle.
        </p>
        <ImageFrame
          src="/images/moritz-intake/lawyer-row.png"
          width={1520}
          height={450}
          alt="'The lawyers who take on cases like yours. You'll see a quote before you pay anything.' Five lawyers with their backgrounds: Daniel, Kyle, Max, Aélita, Catarina."
          caption="Home, before the first message."
          tone="peach"
        />
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <ImageFrame
            src="/images/moritz-intake/brief-bottom.png"
            width={650}
            height={130}
            alt="The brief panel footer: three lawyer faces and a line about the quote."
            caption="Brief panel, every step."
            flush
            tone="butter"
          />
          <ImageFrame
            src="/images/moritz-intake/tile-hero.png"
            width={1550}
            height={355}
            alt="A case tile after submit, its track ending in three lawyer faces."
            caption="Case tile, after submit."
            flush
            tone="mint"
          />
        </div>
        <ImageFrame
          src="/images/moritz-intake/returning.png"
          width={1570}
          height={300}
          alt="A returning client's cases: 'Aélita is on your case' and 'Daniel is on your case', each with the lawyer's photo."
          caption="Home, returning client: a lawyer on every case."
          tone="sky"
        />
        <p>
          One thing I refused: a named lawyer attached to the brief before one is assigned. It
          would have promised a person the pipeline hadn&rsquo;t given you yet.
        </p>
      </CaseSection>

      <CaseSection id="voice" eyebrow="Voice" title="Sounds like a firm, not a form.">
        <p>Every line Moritz says was written, not generated. A few of them:</p>
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <QuoteCard attribution="Brief panel" tone="pink">
            Your brief fills in as you talk.
          </QuoteCard>
          <QuoteCard attribution="Brief panel, mid-way" tone="lavender">
            Two left: documents, then review.
          </QuoteCard>
          <QuoteCard attribution="Moritz, after the first message" tone="sky">
            I took the timeline and other side from your message. Change anything I&rsquo;ve got wrong.
          </QuoteCard>
          <QuoteCard attribution="Brief panel, after you submit" tone="pink">
            Quote first, then we assign your lawyer.
          </QuoteCard>
          <QuoteCard attribution="Moritz, after submit" tone="lavender">
            We&rsquo;re getting your case ready for the lawyers. It takes a few minutes and you don&rsquo;t need to stay.
          </QuoteCard>
          <QuoteCard attribution="Composer, at review" tone="sky">
            Anything to add or change? Tell me here.
          </QuoteCard>
        </div>
      </CaseSection>

      <CaseSection id="gaps" eyebrow="The open parts" title="Assume, decide, and say so.">
        <p>
          The brief was deliberately incomplete, and the team was slow to answer by design. Where
          it was open, I made a call and wrote it down.
        </p>
        <LabeledTiles
          columns={2}
          tiles={[
            {
              label: "A case starts at the first message",
              detail:
                "Not at submit. The draft tile has no number until you submit, and then it does.",
            },
            {
              label: "No promised turnaround",
              detail:
                "The deadline box was deleted, not softened, so a future promise has to be made on purpose.",
            },
            {
              label: "Documents first, when one probably exists",
              detail: "For contract matters, Moritz asks for the contract before anything else.",
            },
            {
              label: "No named lawyer before assignment",
              detail: "The track ends in the three lawyers the case is heading toward instead.",
            },
            {
              label: "One timestamp per surface",
              detail:
                "'Submitted' lives on the card, as an event. Tiles show only 'Updated'. Two clocks make you guess which one matters.",
            },
            {
              label: "Filled gaps, and said so",
              detail:
                "Where the plan was silent, Moritz still answers and never re-posts a card. Each of those calls is in the notes I left the team.",
            },
          ]}
        />
      </CaseSection>

      <CaseSection id="build" eyebrow="Built, not mocked" title="It runs.">
        <p>
          The whole thing is TypeScript, inside Moritz&rsquo;s existing Next.js design playground,
          behind one design switch. Off restores the old flow, so the team can compare.
        </p>
        <LabeledTiles
          columns={3}
          tiles={[
            {
              label: "Claude reads, a script decides",
              detail:
                "Haiku 4.5 classifies the matter and pulls answers out of the first message; Sonnet 5 writes the recap. Everything falls back to a deterministic script, so the flow never depends on the model.",
            },
            {
              label: "One step mark, not six",
              detail:
                "The step dot and rail were drawn six different ways across the app. I added a foundation component, adopted it in the new surfaces, and left the migration as a note.",
            },
            {
              label: "Fixed what I found",
              detail:
                "Two accessibility bugs in the intake shell: an aria-controls pointing at nothing, and aria-hidden over live controls. Fixed, with a comment on why.",
            },
          ]}
        />
        <p>
          <a
            href={LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-deep underline decoration-accent underline-offset-4 hover:text-accent-strong"
          >
            Click through the prototype
          </a>{" "}
          (password 123). It starts you as a brand-new client with no cases.
        </p>
      </CaseSection>

      <CaseSection id="next" eyebrow="What I'd do next" title="Five things, in order">
        <LabeledTiles
          columns={2}
          tiles={[
            {
              label: "Watch strangers use it",
              detail: "A Maze or UX Army run first, then small changes from what they do.",
            },
            {
              label: "Give the canvas some depth",
              detail:
                "The app is white on white. A light grey ground, like Legora, and a more consistent token map.",
            },
            {
              label: "One primary action per screen",
              detail:
                "Redo the nav and the screens so the black button is the one thing to do, and everything else drops to secondary.",
            },
            {
              label: "Email at every milestone",
              detail: "Submitted, quote ready, lawyer assigned.",
            },
            {
              label: "Give Moritz a voice",
              detail:
                "Prompt the model for a slightly formal, conversational tone. No em dashes. Sharper extraction.",
            },
          ]}
        />
      </CaseSection>
    </CaseStudyLayout>
  );
}
