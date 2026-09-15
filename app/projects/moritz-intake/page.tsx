import type { Metadata } from "next";
import CaseSection from "@/components/case-study/CaseSection";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import LabeledTiles from "@/components/case-study/LabeledTiles";
import QuoteCard from "@/components/case-study/QuoteCard";
import StatCallout from "@/components/case-study/StatCallout";
import CaseVideo from "@/components/CaseVideo";
import ImageFrame from "@/components/ImageFrame";

export const metadata: Metadata = {
  title: "Redesigning a law firm's front door",
  description:
    "Moritz is an AI-native law firm whose clients came out of intake unsure what had happened. I redesigned the flow end to end and built it as a working prototype in three days.",
};

const COMPLAINTS = [
  "I'm not sure my case was actually submitted.",
  "I don't know which step I'm on, or how many are left.",
  "I can't find where to upload my documents.",
  "It feels sterile. Like a form, not a firm.",
];

export default function MoritzIntake() {
  return (
    <CaseStudyLayout
      slug="moritz-intake"
      eyebrow="Moritz · Case study"
      title="Redesigning a law firm's front door"
      summary="Moritz is an AI-native law firm. A client describes their matter, an agent drafts a first pass, and a lawyer finishes it. Intake is the only part clients drive themselves, and too many came out of it unsure what had just happened. I redesigned it end to end and built it as a working prototype inside the firm's own codebase."
      highlight={{
        stat: "Brief to prototype in 3 days",
      }}
      meta={[
        { label: "Role", value: "Product design · Design engineering · UX writing" },
        { label: "Client", value: "Moritz, an AI-native law firm" },
        { label: "Timeline", value: "3 days · September 2026" },
        {
          label: "Delivered",
          value: "A working TypeScript prototype in the firm's codebase, behind a design switch",
        },
      ]}
    >
      <CaseSection
        id="customer"
        eyebrow="The customer"
        title="Moritz is a law firm where you talk to an agent before you meet a lawyer."
      >
        <p>
          Its clients run businesses. They arrive with a contract dispute, an employment
          question, a supplier who wants out, and no legal team of their own. They type what
          happened, an agent builds the case notes, and one of the firm&rsquo;s lawyers takes it
          from there. Intake is the first thing a client ever does with Moritz, and the only
          part they do alone.
        </p>
        <ImageFrame
          src="/images/moritz-intake/lawyer-row.png"
          width={1520}
          height={450}
          alt="'The lawyers who take on cases like yours. You'll see a quote before you pay anything.' Five lawyers with their backgrounds: Daniel, Kyle, Max, Aélita, Catarina."
          caption="The people behind the agent. A client now meets them before typing a word."
          tone="peach"
        />
      </CaseSection>

      <CaseSection
        id="problem"
        eyebrow="The problem"
        title="Clients finished intake and still didn't know what had happened."
      >
        <p>
          The flow worked. People got through it. But the feedback coming back from real
          clients kept landing on the same four things:
        </p>
        <ol className="my-10 list-none space-y-5 pl-0">
          {COMPLAINTS.map((line, i) => (
            <li
              key={line}
              className="flex items-baseline gap-5 border-b border-line pb-5 last:border-0 last:pb-0"
            >
              <span className="text-style-eyebrow shrink-0 text-accent-deep">0{i + 1}</span>
              <span className="font-display text-h2 font-semibold text-ink">{line}</span>
            </li>
          ))}
        </ol>
        <p>
          Two goals, pulling against each other. Make submitting a case as clear as possible.
          Make it feel like a premium firm, not a web form. Most fixes for one make the other
          worse. That tension was the design problem.
        </p>
      </CaseSection>

      <CaseSection
        id="approach"
        eyebrow="The approach"
        title="Show people where they are, at every step, with real people in it."
      >
        <p>
          All four complaints are one complaint. The client can&rsquo;t see the process. So the
          redesign puts the process on screen everywhere the client looks: a story before they
          start, a receipt after every answer, a track after they submit, a lawyer&rsquo;s face
          at each of those moments. Here&rsquo;s what changed, moment by moment.
        </p>
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
                  "Nothing on screen said so",
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

      <CaseSection
        id="journey"
        eyebrow="The story, in three beats"
        title="Before you type anything, the journey plays once: talk, quote, lawyers."
      >
        <p>
          A brand-new client lands on an empty home screen. Instead of a button, they get a
          six-second story: talk to Moritz, receive a quote and pay, our lawyers take on your
          case. It ends on three real faces, and the composer slides in underneath.
        </p>
        <CaseVideo
          src="/videos/moritz-intake/journey.mp4"
          poster="/images/moritz-intake/posters/journey.jpg"
          width={1920}
          height={1200}
          title="The case journey"
          description="On a new client's first visit, three beats play in sequence under the greeting: Talk to Moritz about your case, Receive a quote and pay, Our lawyers take on your case. The last beat shows three lawyer photos."
          caption="First visit. The story plays once, then gets out of the way."
          tone="peach"
        />
        <ImageFrame
          src="/images/moritz-intake/journey-beats.png"
          width={2780}
          height={260}
          alt="The three beats of the case journey: Talk to Moritz about your case, Receive a quote and pay, Our lawyers take on your case."
          caption="Three beats. It ends in people, not a checkmark."
          tone="butter"
        />
        <p>
          This one animation answers all four complaints at once. You see the steps before you
          take them. You see there is a submit, a quote, a person at the end. And it feels like
          being welcomed, not being processed. It never repeats, so it never becomes noise.
        </p>
      </CaseSection>

      <CaseSection
        id="step-mark"
        eyebrow="One mark, everywhere"
        title="One small dot tells you what's done, what's next, and what you skipped."
      >
        <p>
          The step dot and its rail were drawn six different ways across the app. I made one
          foundation component and gave it five states, then used it everywhere a client asks
          &ldquo;where am I?&rdquo;: in the brief panel, in the receipts in the thread, on the
          track of the submitted card, and on the case tiles at home.
        </p>
        <LabeledTiles
          columns={3}
          tiles={[
            { label: "Filled", detail: "Green, with a check. This step is done." },
            { label: "Current", detail: "A ring with a pip and a soft halo. You are here." },
            { label: "Dashed", detail: "A dashed ring. You skipped it, and that still counts." },
            { label: "Outline", detail: "An empty ring. Still to come." },
            { label: "Ghost", detail: "Just the glyph, no ring. A note, not a step." },
            { label: "The rail", detail: "The hairline between two marks. It turns green once the run above it is done." },
          ]}
        />
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <ImageFrame
            src="/images/moritz-intake/brief-skipped.png"
            width={730}
            height={240}
            alt="A skipped optional step in the brief panel, drawn with a dashed ring, still counted as done."
            caption="In the brief panel: skipped, still counted."
            flush
            tone="sky"
          />
          <ImageFrame
            src="/images/moritz-intake/receipt.png"
            width={1560}
            height={330}
            alt="A step receipt in the thread: a green check, 'Saved timeline', then Moritz: 'Got it, you need to resolve this by end of week. We have what we need.'"
            caption="In the thread: a receipt after each answer."
            flush
            tone="mint"
          />
        </div>
        <ImageFrame
          src="/images/moritz-intake/track.png"
          width={1400}
          height={150}
          alt="The four-step track: Case submitted, Estimating quote, Accept and pay, Meet your lawyer."
          caption="On the card, laid out sideways: the same mark, four steps, ending in people."
          tone="lavender"
        />
      </CaseSection>

      <CaseSection
        id="start"
        eyebrow="Starting"
        title="One typed message, and the case exists."
      >
        <p>
          The composer sits under the greeting on every visit. You type what happened, and the
          conversation opens with your words already at the top and the brief panel already
          filling in.
        </p>
        <CaseVideo
          src="/videos/moritz-intake/start.mp4"
          poster="/images/moritz-intake/posters/start.jpg"
          width={1920}
          height={1200}
          title="Starting a case"
          description="A client types a description of their matter into the composer on the home screen and sends it; the intake conversation opens with the brief panel on the right."
          caption="The first message starts the case. Nothing to click first."
          tone="peach"
        />
        <StatCallout>
          A case exists from the first typed message, not from submission. A draft tile appears
          the moment you start, and the case number appears the moment you submit. So
          &ldquo;did I submit?&rdquo; always has a visible answer.
        </StatCallout>
      </CaseSection>

      <CaseSection
        id="receipts"
        eyebrow="Where am I"
        title="Every answer gets a receipt in the conversation."
      >
        <p>
          Each answer leaves a one-line receipt in the thread, and the count in the brief
          moves. Skip a step and it still counts. You chose, so it&rsquo;s done.
        </p>
        <CaseVideo
          src="/videos/moritz-intake/steps.mp4"
          poster="/images/moritz-intake/posters/steps.jpg"
          width={1920}
          height={1200}
          title="Step receipts"
          description="The client answers a question; a receipt line with a green check appears in the conversation, the brief panel's count goes up, and Moritz asks the next question."
          caption="Answer, receipt, next question. The brief fills in as you talk."
          tone="peach"
        />
        <ImageFrame
          src="/images/moritz-intake/brief-count.png"
          width={730}
          height={96}
          alt="The case brief header with its step count."
          caption="The count, top of the brief panel."
          size="lg"
          tone="sky"
        />
        <p>
          The receipts aren&rsquo;t a new capability. The agent already knew what it had saved.
          It just never said so.
        </p>
      </CaseSection>

      <CaseSection
        id="transparency"
        eyebrow="Transparency"
        title="When Moritz fills something in for you, it says so."
      >
        <p>
          A long first message often answers three questions at once. Moritz takes them, names
          which ones it took, and leaves them editable. Anything it filled in is yours to
          correct.
        </p>
        <CaseVideo
          src="/videos/moritz-intake/working.mp4"
          poster="/images/moritz-intake/posters/working.jpg"
          width={1920}
          height={1200}
          title="Moritz names what it took"
          description="A long first message is read, several brief items fill in at once, Moritz says which ones it took from the message, and the client clicks one in the brief panel to edit it."
          caption="One message, three items filled, one line saying so. Then a click to correct one."
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
        <StatCallout>
          Claude reads, a script decides. A small model pulls answers out of the message; a
          hand-written script decides what Moritz says next. If the model is slow or wrong, the
          flow still works.
        </StatCallout>
      </CaseSection>

      <CaseSection
        id="attachments"
        eyebrow="Uploading"
        title="The upload button is now the first thing you read."
      >
        <p>
          It&rsquo;s in the placeholder, in Moritz&rsquo;s first message, and in the brief panel
          at every step. A file is accepted at any point, not only at the documents step.
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
          For contract matters, the document is the very first question. A contract usually
          already exists, and asking for it late means re-asking everything it would have
          answered.
        </p>
      </CaseSection>

      <CaseSection
        id="submission"
        eyebrow="Submitting"
        title="Submitted. A case number, a track, and the lawyers it's heading to."
      >
        <p>
          Submitting used to end in a page that looked like the one before it. Now it ends in a
          card: a check, a number, a four-step track, and the three people your case is going
          to.
        </p>
        <CaseVideo
          src="/videos/moritz-intake/submit.mp4"
          poster="/images/moritz-intake/posters/submit.jpg"
          width={1920}
          height={1200}
          title="Submitting a case"
          description="The review card is submitted. A card appears with a green check, 'Case submitted', the case number, and a four-step track ending in three lawyer photos."
          caption="The moment of submission."
          tone="peach"
        />
        <ImageFrame
          src="/images/moritz-intake/card-top.png"
          width={1424}
          height={540}
          alt="The submitted card: a check, 'Case submitted', the title 'Northwind Fulfilment Termination', case number M-2026-0127, and a track: Case submitted, Estimating quote, Accept and pay, Meet your lawyer, ending in three lawyer faces."
          caption="The card. The track ends in the three lawyers the case is heading toward."
          tone="lavender"
        />
      </CaseSection>

      <CaseSection
        id="waiting"
        eyebrow="Waiting"
        title="While the agent works, the wait is narrated, not promised."
      >
        <p>
          After submit, the agent needs a few minutes. Instead of a spinner, Moritz says what
          it&rsquo;s doing, step by step, and tells you that you don&rsquo;t need to stay.
        </p>
        <ImageFrame
          src="/images/moritz-intake/processing.png"
          width={1450}
          height={420}
          alt="Moritz: 'We're getting your case ready for the lawyers. It takes a few minutes and you don't need to stay.' Then two green checks, 'Read your documents' and 'Case notes ready', then 'Your case notes are with the lawyers now. Your quote is next.'"
          caption="Three real steps, in plain words, then a handover."
          tone="mint"
        />
        <StatCallout>
          The old card promised &ldquo;Quote by tomorrow, 2:32 pm.&rdquo; Nobody could stand
          behind that. Now it says where the quote will arrive, not when.
        </StatCallout>
      </CaseSection>

      <CaseSection
        id="home"
        eyebrow="Coming back"
        title="Back home, every case shows its stage and its lawyer."
      >
        <p>
          A case tile changes shape as the case moves: a track before a lawyer is assigned, a
          name and a face after. Every tile shows when it last moved, so there&rsquo;s no
          wondering where a case is.
        </p>
        <ImageFrame
          src="/images/moritz-intake/tiles.png"
          width={1570}
          height={760}
          alt="Your cases: a hero tile for the newest case with the four-step track, a compact row that says 'Ready for payment' with three faces, and a row that says 'Aélita is on your case' with one face."
          caption="Your cases, the moment after submitting. Newest on top, with its track."
          tone="sky"
        />
        <ImageFrame
          src="/images/moritz-intake/returning.png"
          width={1570}
          height={300}
          alt="A returning client's cases: 'Aélita is on your case' and 'Daniel is on your case', each with the lawyer's photo."
          caption="A returning client. A lawyer on every case."
          tone="peach"
        />
      </CaseSection>

      <CaseSection
        id="human"
        eyebrow="Human"
        title="A real person at every step, and never a promise of one before it's true."
      >
        <p>
          A lawyer&rsquo;s face shows up on home, in the brief panel, on the submitted card, on
          every case tile, and on every case you come back to. The same three faces follow a
          case from the card to the tile, so they never shuffle.
        </p>
        <ImageFrame
          src="/images/moritz-intake/card-lawyers.png"
          width={1440}
          height={370}
          alt="The bottom of the submitted card: the three lawyers the case is heading toward, and what happens next."
          caption="The bottom of the submitted card: who it's going to, and what happens next."
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
        <p>
          One thing I refused: a named lawyer on the brief before one is assigned. It would
          have promised a person the firm hadn&rsquo;t given you yet. So the track ends in the
          three lawyers the case is heading toward, and a name appears only when it&rsquo;s
          real.
        </p>
      </CaseSection>

      <CaseSection id="voice" eyebrow="Voice" title="Moritz sounds like a firm, not a form.">
        <p>
          Most of what Moritz says is scripted by hand, and the model only fills in what it
          pulled from your message. A few of the lines:
        </p>
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

      <CaseSection id="next" eyebrow="What I'd do next" title="Five things, in order.">
        <LabeledTiles
          columns={3}
          tiles={[
            {
              label: "Watch strangers use it",
              detail:
                "Start with a Maze or UX Army run, then make small changes from what people actually do.",
            },
            {
              label: "Give the canvas some depth",
              detail:
                "The app is white on white right now. A light grey ground and a tighter token map would help.",
            },
            {
              label: "One primary action per screen",
              detail:
                "Redo the nav and the screens so the black button is the one thing to do, and everything else drops to secondary.",
            },
            {
              label: "Email at every milestone",
              detail: "One at each milestone: submitted, quote ready, lawyer assigned.",
            },
            {
              label: "Give Moritz a voice",
              detail:
                "Prompt the model for a slightly formal, conversational tone, cut the em dashes, and sharpen the extraction.",
            },
          ]}
        />
      </CaseSection>
    </CaseStudyLayout>
  );
}
