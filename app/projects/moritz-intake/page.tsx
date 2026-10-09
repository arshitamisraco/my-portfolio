import type { Metadata } from "next";
import CaseSection from "@/components/case-study/CaseSection";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import HeroStills from "@/components/case-study/HeroStills";
import LabeledTiles from "@/components/case-study/LabeledTiles";
import JourneyMap from "@/components/case-study/JourneyMap";
import ScreenStory from "@/components/case-study/ScreenStory";
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

const SKETCHES = [
  {
    n: "05",
    caption:
      "No size morph. A progress bar that grew across the top of the chat. Crossed out: it moved, but didn't tell you which steps were done.",
    alt: "Index-card sketch of a progress bar growing across the top of the chat, crossed out.",
  },
  {
    n: "11",
    caption:
      "Fires at top. Step confirmations as a banner at the top. Crossed out: they fired far from where you type, so you'd miss them. They moved into the thread.",
    alt: "Index-card sketch of step confirmations as a banner at the top of the screen, crossed out.",
  },
  {
    n: "13",
    caption:
      "No collapse. Progress rails that collapsed on both sides. Crossed out: a panel you have to open was one of the original complaints.",
    alt: "Index-card sketch of progress rails collapsing on both sides of the chat, crossed out.",
  },
  {
    n: "01",
    caption: "A receipt in the thread after each answer. Kept.",
    alt: "Index-card sketch of a one-line receipt appearing in the conversation after each answer.",
  },
  {
    n: "07",
    caption: "The case card, its track ending in faces. Shipped close to this.",
    alt: "Index-card sketch of the case card with a track that ends in lawyer faces.",
  },
  {
    n: "12",
    caption: "Home: greeting, lawyers, one action. Kept.",
    alt: "Index-card sketch of the home screen with a greeting, a row of lawyers and one action.",
  },
];

export default function MoritzIntake() {
  return (
    <CaseStudyLayout
      slug="moritz-intake"
      eyebrow="Moritz · Case study"
      title="Redesigning a law firm's front door"
      summary="Moritz is an AI-native law firm. A client describes their matter to an agent, and one of the firm's lawyers takes it from there. Clients kept finishing intake unsure what had happened. In three days I redesigned the flow from first visit to return visit and built it as a working prototype inside the firm's own codebase."
      stats={[
        { value: "3 days", label: "from brief to working prototype" },
        { value: "4", label: "client complaints addressed" },
        { value: "5", label: "states in one step mark" },
      ]}
      meta={[
        { label: "Role", value: "Product design · Design engineering · UX writing" },
        { label: "Client", value: "Moritz, an AI-native law firm" },
        { label: "Timeline", value: "3 days · September 2026" },
        { label: "Delivered", value: "A working TypeScript prototype behind a design switch" },
      ]}
      hero={
        <HeroStills
          ariaLabel="A first look at the Moritz intake prototype"
          rows={[
            [
              {
                kind: "video",
                src: "/videos/moritz-intake/journey.mp4",
                poster: "/images/moritz-intake/posters/journey.jpg",
                width: 1920,
                height: 1200,
                title: "The case journey",
                description: "On a first visit, three beats play under the greeting: talk to Moritz, receive a quote and pay, lawyers take on your case.",
                tone: "peach",
              },
              {
                kind: "video",
                src: "/videos/moritz-intake/steps.mp4",
                poster: "/images/moritz-intake/posters/steps.jpg",
                width: 1920,
                height: 1200,
                title: "Step receipts",
                description: "The client answers a question. A receipt with a green check appears, the brief's count goes up, and Moritz asks the next question.",
                tone: "lavender",
              },
              {
                kind: "video",
                src: "/videos/moritz-intake/submit.mp4",
                poster: "/images/moritz-intake/posters/submit.jpg",
                width: 1920,
                height: 1200,
                title: "Submitting a case",
                description: "The review card is submitted. A card appears with a green check, the case number, and a four-step track ending in three lawyer photos.",
                tone: "sky",
              },
            ],
          ]}
        />
      }
    >
      <CaseSection
        id="problem"
        eyebrow="The problem"
        title="Clients finished intake and still didn't know what had happened."
      >
        <p>
          Intake is the first thing a client does with Moritz, and the only part they do alone. The
          flow worked, but client feedback kept landing on the same four things:
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
          I had to make submitting a case clearer without making the firm feel more like a form.
        </p>
      </CaseSection>

      <CaseSection
        id="journey-map"
        eyebrow="First interaction to last"
        title="Seven moments, from first visit to coming back."
      >
        <p>
          I mapped every moment a client touches and fixed them in order. Each section below starts
          with where it sits on this line.
        </p>
        <JourneyMap
          stages={[
            {
              id: "first-visit",
              label: "First visit",
              detail: "See the whole process before you start",
              tag: "02 04",
            },
            {
              id: "start",
              label: "Start a case",
              detail: "One message opens a case",
              tag: "01",
            },
            {
              id: "answers",
              label: "Answer questions",
              detail: "A receipt after every answer",
              tag: "02",
            },
            {
              id: "documents",
              label: "Add documents",
              detail: "Upload from anywhere, at any step",
              tag: "03",
            },
            {
              id: "submit",
              label: "Submit",
              detail: "A case number and a track",
              tag: "01",
            },
            {
              id: "wait",
              label: "Wait",
              detail: "Moritz says what it\u2019s doing",
              tag: "01",
            },
            {
              id: "return",
              label: "Come back",
              detail: "Every case shows its stage and its lawyer",
              tag: "02 04",
            },
          ]}
        />
      </CaseSection>

      <CaseSection
        id="approach"
        eyebrow="Approach"
        title="Four complaints, one cause: the client couldn't see the process."
      >
        <p>
          I started on index cards, one per screen, before opening the codebase. Drawing them side
          by side, every fix pointed at the same gap, so I stopped treating the complaints as four
          bugs. The test for every screen became one question: can the client tell where they are,
          and who has their case?
        </p>
        <div className="my-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {SKETCHES.map((sk) => (
            <ImageFrame
              key={sk.n}
              src={`/images/moritz-intake/sketches/sketch-${sk.n}.jpg`}
              width={1600}
              height={1200}
              alt={sk.alt}
              caption={sk.caption}
              flush
              tone="peach"
            />
          ))}
        </div>
      </CaseSection>

      <CaseSection
        id="first-visit"
        journey={{ step: 1, of: 7, label: "First visit" }}
        title="Before typing anything, a new client sees the whole process."
      >
        <ScreenStory
          tone="peach"
          problem={<>New clients saw a &ldquo;Start a case&rdquo; button and nothing about what came after it.</>}
          approach="Show the whole process first, ending on real people."
          fix="A six-second story that plays once: talk to Moritz, get a quote, meet your lawyers."
          result="Clients see every step, and the lawyers, before typing a word."
          media={
            <CaseVideo
              src="/videos/moritz-intake/journey.mp4"
              poster="/images/moritz-intake/posters/journey.jpg"
              width={1920}
              height={1200}
              title="The case journey"
              description="On a new client's first visit, three beats play in sequence under the greeting: Talk to Moritz about your case, Receive a quote and pay, Our lawyers take on your case. The last beat shows three lawyer photos."
              tone="peach"
              flush
            />
          }
        />
      </CaseSection>

      <CaseSection
        id="start"
        journey={{ step: 2, of: 7, label: "Start a case" }}
        title="One typed message, and the case exists."
      >
        <ScreenStory
          tone="peach"
          problem={<>A case didn&rsquo;t exist until it was submitted, so &ldquo;did I submit?&rdquo; had no answer.</>}
          approach="Make the first message the start of the case."
          fix="Sending a message from home creates a draft tile right away."
          result="A draft or a case number is always on screen."
          media={
            <CaseVideo
              src="/videos/moritz-intake/start.mp4"
              poster="/images/moritz-intake/posters/start.jpg"
              width={1920}
              height={1200}
              title="Starting a case"
              description="A client types a description of their matter into the composer on the home screen and sends it; the intake conversation opens with the brief panel on the right."
              tone="peach"
              flush
            />
          }
        />
      </CaseSection>

      <CaseSection
        id="answers"
        journey={{ step: 3, of: 7, label: "Answer questions" }}
        title="Every answer leaves a receipt, and the brief counts down."
      >
        <ScreenStory
          tone="peach"
          problem="Progress hid in a side panel, so clients lost their place."
          approach="Put progress in the conversation, where clients already look."
          fix="A one-line receipt after every answer, and a countdown in the brief."
          result="Clients always know where they are, with no new agent capability."
          media={
            <CaseVideo
              src="/videos/moritz-intake/steps.mp4"
              poster="/images/moritz-intake/posters/steps.jpg"
              width={1920}
              height={1200}
              title="Step receipts"
              description="The client answers a question; a receipt line with a green check appears in the conversation, the brief panel's count goes up, and Moritz asks the next question."
              tone="peach"
              flush
            />
          }
        />
        <ScreenStory
          tone="peach"
          problem="The agent re-asked questions the first message had already answered."
          approach="Use what the client said, and say what was taken."
          fix="Moritz fills in what it found, names it, and leaves every item editable."
          result={<>Fewer questions, and nothing changes behind the client&rsquo;s back.</>}
          media={
            <CaseVideo
              src="/videos/moritz-intake/working.mp4"
              poster="/images/moritz-intake/posters/working.jpg"
              width={1920}
              height={1200}
              title="Moritz names what it took"
              description="A long first message is read, several brief items fill in at once, Moritz says which ones it took from the message, and the client clicks one in the brief panel to edit it."
              tone="peach"
              flush
            />
          }
        />
      </CaseSection>

      <CaseSection
        id="documents"
        journey={{ step: 4, of: 7, label: "Add documents" }}
        title="Upload is offered from the first line a client reads."
      >
        <ScreenStory
          tone="peach"
          problem={<>Clients with a contract in hand couldn&rsquo;t find where to upload it.</>}
          approach="Offer upload in the first thing a client reads."
          fix={<>The placeholder reads &ldquo;Describe your matter, or drop a document here.&rdquo;</>}
          result="Upload is visible before the client types a word."
          media={
            <ImageFrame
              src="/images/moritz-intake/composer.png"
              width={1570}
              height={380}
              alt="The composer: 'Describe your matter, or drop a document here', an Attach file button, a microphone, and a black 'Start a new case' button, with matter chips below."
              tone="peach"
              flush
            />
          }
        />
        <ScreenStory
          tone="peach"
          problem="Files were only accepted at the documents step."
          approach="Accept a file at any point."
          fix="The brief panel offers Attach files at every step."
          result="Upload is open from the first message to review."
          media={
            <div className="grid gap-4">
              <ImageFrame
                src="/images/moritz-intake/panel-docs-before.png"
                width={730}
                height={370}
                alt="The brief panel mid-intake: Timeline is current, Documents is optional with an Attach files button, Review and submit is next."
                flush
                tone="peach"
              />
              <ImageFrame
                src="/images/moritz-intake/panel-docs-after.png"
                width={730}
                height={390}
                alt="The brief panel after a file is attached: the document listed under Documents, with an Add more files button."
                flush
                tone="peach"
              />
            </div>
          }
        />
      </CaseSection>

      <CaseSection
        id="submit"
        journey={{ step: 5, of: 7, label: "Submit" }}
        title="Submitting ends in a case number, a track, and the lawyers it's going to."
      >
        <ScreenStory
          tone="peach"
          problem="After submitting, nothing said the case had gone anywhere."
          approach="Make submission something the client can point to."
          fix={<>A card with the case number and a track ending in the three lawyers it&rsquo;s heading to.</>}
          result={<>&ldquo;Did I submit?&rdquo; is answered the moment you do.</>}
          media={
            <CaseVideo
              src="/videos/moritz-intake/submit.mp4"
              poster="/images/moritz-intake/posters/submit.jpg"
              width={1920}
              height={1200}
              title="Submitting a case"
              description="The review card is submitted. A card appears with a green check, 'Case submitted', the case number, and a four-step track ending in three lawyer photos."
              tone="peach"
              flush
            />
          }
        />
      </CaseSection>

      <CaseSection
        id="wait"
        journey={{ step: 6, of: 7, label: "Wait" }}
        title="While the agent works, Moritz says what it's doing."
      >
        <ScreenStory
          tone="peach"
          problem={<>The old card promised &ldquo;Quote by tomorrow, 2:32 pm,&rdquo; a time nobody could keep.</>}
          approach={<>Say what&rsquo;s happening and what&rsquo;s next, and drop the when.</>}
          fix={<>Moritz narrates the agent&rsquo;s real steps, then says the quote is next.</>}
          result="No promise the firm can break."
          media={
            <ImageFrame
              src="/images/moritz-intake/processing.png"
              width={1450}
              height={420}
              alt="Moritz: 'We're getting your case ready for the lawyers. It takes a few minutes and you don't need to stay.' Then two green checks, 'Read your documents' and 'Case notes ready', then 'Your case notes are with the lawyers now. Your quote is next.'"
              tone="peach"
              flush
            />
          }
        />
      </CaseSection>

      <CaseSection
        id="return"
        journey={{ step: 7, of: 7, label: "Come back" }}
        title="Back home, every case shows its stage and its lawyer."
      >
        <ScreenStory
          tone="peach"
          problem={<>Returning clients couldn&rsquo;t see where each case stood or who had it.</>}
          approach="Let each tile change as the case moves."
          fix={<>Tiles show the track until a lawyer is assigned, then the lawyer&rsquo;s face.</>}
          result="The last screen answers the first question: where is my case?"
          media={
            <ImageFrame
              src="/images/moritz-intake/tiles.png"
              width={1570}
              height={760}
              alt="Your cases: a hero tile for the newest case with the four-step track, a compact row that says 'Ready for payment' with three faces, and a row that says 'Aélita is on your case' with one face."
              tone="peach"
              flush
            />
          }
        />
      </CaseSection>

      <CaseSection
        id="results"
        eyebrow="Results"
        title="A working prototype in the firm's codebase, in three days."
      >
        <p>
          I built it in TypeScript inside Moritz&rsquo;s own app, behind a design switch so the team
          could compare it with the live flow. Each of the four complaints now has a visible answer
          at the moment it used to come up. No client has used it yet, so it is untested.
        </p>
        <StatCallout>
          Claude reads, a script decides. A small model pulls answers out of the client&rsquo;s
          message, and a hand-written script decides what Moritz says next, so the flow still works
          when the model is slow or wrong.
        </StatCallout>
      </CaseSection>

      <CaseSection id="next" eyebrow="What I'd do next" title="Three things, in order.">
        <LabeledTiles
          columns={3}
          tiles={[
            {
              label: "Watch strangers use it",
              detail:
                "A Maze or UX Army run first, then small changes from what people actually do.",
            },
            {
              label: "One primary action per screen",
              detail:
                "Redo the nav so the black button is the one thing to do and everything else drops to secondary.",
            },
            {
              label: "Email at every milestone",
              detail: "Submitted, quote ready, lawyer assigned.",
            },
          ]}
        />
      </CaseSection>
      {process.env.NODE_ENV === "development" && (
        <CaseSection
          id="open-questions"
          eyebrow="Open questions (dev only)"
          title="To confirm before publishing"
        >
          <ol>
            <li>Did the &ldquo;every fix is the same fix&rdquo; realisation happen while sketching?</li>
            <li>Are the readings of sketches 05, 11, 13 right?</li>
            <li>Demo reaction from the founder or team; has any of it shipped?</li>
            <li>Did the old agent re-ask questions the first message had already answered, or fill them in silently?</li>
          </ol>
        </CaseSection>
      )}
    </CaseStudyLayout>
  );
}
