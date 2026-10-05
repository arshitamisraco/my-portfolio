import type { Metadata } from "next";
import CaseSection from "@/components/case-study/CaseSection";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import HeroStills from "@/components/case-study/HeroStills";
import QuoteCard from "@/components/case-study/QuoteCard";
import CaseVideo from "@/components/CaseVideo";
import ImageFrame from "@/components/ImageFrame";

export const metadata: Metadata = {
  title: "Redesigning a law firm's front door",
  description:
    "Moritz is an AI-native law firm whose clients left intake unsure what had happened. I redesigned the flow end to end and built a working prototype in three days.",
};

const COMPLAINTS = [
  "I'm not sure my case was actually submitted.",
  "I don't know which step I'm on, or how many are left.",
  "I can't find where to upload my documents.",
  "It feels sterile. Like a form.",
];

export default function MoritzIntake() {
  return (
    <CaseStudyLayout
      slug="moritz-intake"
      eyebrow="Moritz · Case study"
      title="Redesigning a law firm's front door"
      summary="Moritz is an AI-native law firm. I redesigned its client intake end to end and built it as a working prototype in the firm's own codebase."
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
      <CaseSection id="customer" eyebrow="The customer" title="Moritz is an AI-native law firm">
        <ImageFrame
          src="/images/moritz-intake/lawyer-row.png"
          width={1520}
          height={450}
          alt="Five Moritz lawyers with their backgrounds: Daniel, Kyle, Max, Aélita, Catarina."
          caption="The lawyers behind the agent."
        />
        <p>
          Clients type what happened, an agent builds the case notes, and a lawyer takes over.
          Intake is the first thing they do with Moritz, and the only part they do alone.
        </p>
      </CaseSection>

      <CaseSection
        id="problem"
        eyebrow="The problem"
        title="Clients finished intake unsure what happened"
      >
        <ul>
          {COMPLAINTS.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </CaseSection>

      <CaseSection id="approach" eyebrow="The approach" title="The process is now on screen">
        <ul>
          <li>A story before the client starts.</li>
          <li>A receipt after every answer.</li>
          <li>A case number and track after submitting.</li>
          <li>A lawyer&rsquo;s face at each moment.</li>
        </ul>
        <ImageFrame
          src="/images/moritz-intake/sketches/sketch-home-new-case.jpg"
          width={1600}
          height={988}
          alt="Index-card sketch of the home page: a greeting, two chips, a composer, and a 'New case' panel with a 0/11 count and a vertical step list."
          caption="Day one, on an index card: the composer under the greeting, the brief panel beside it, a count at the top."
          size="md"
        />
      </CaseSection>

      <CaseSection id="journey" eyebrow="The story" title="A six-second story plays once">
        <CaseVideo
          src="/videos/moritz-intake/journey.mp4"
          poster="/images/moritz-intake/posters/journey.jpg"
          width={1920}
          height={1200}
          title="The case journey"
          description="On a first visit, three beats play under the greeting: talk to Moritz, receive a quote and pay, lawyers take on your case."
          caption="First visit. The story plays once."
        />
        <ImageFrame
          src="/images/moritz-intake/journey-beats.png"
          width={2780}
          height={260}
          alt="The three beats: Talk to Moritz, Receive a quote and pay, Our lawyers take on your case."
          caption="Three beats, ending in people."
        />
      </CaseSection>

      <CaseSection id="step-mark" eyebrow="One mark" title="One step mark, five states">
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <ImageFrame
            src="/images/moritz-intake/brief-skipped.png"
            width={730}
            height={240}
            alt="A skipped optional step in the brief panel, drawn with a dashed ring."
            caption="In the brief panel: skipped, still counted."
            flush
          />
          <ImageFrame
            src="/images/moritz-intake/receipt.png"
            width={1560}
            height={330}
            alt="A step receipt in the thread: a green check and 'Saved timeline'."
            caption="In the thread: a receipt after each answer."
            flush
          />
        </div>
        <ImageFrame
          src="/images/moritz-intake/track.png"
          width={1400}
          height={150}
          alt="The four-step track: Case submitted, Estimating quote, Accept and pay, Meet your lawyer."
          caption="On the card: the same mark, four steps."
        />
        <ImageFrame
          src="/images/moritz-intake/sketches/sketch-track-states.jpg"
          width={1600}
          height={980}
          alt="Index-card sketch of the case track drawn twice: once at submitted, once at quote and payment."
          caption="The track, sketched twice: submitted, then quote and payment."
          size="md"
        />
        <p>
          The step dot was drawn six different ways across the app. I built one component with
          five states (filled, current, dashed, outline, ghost) and used it everywhere.
        </p>
      </CaseSection>

      <CaseSection id="start" eyebrow="Starting" title="One typed message opens the case">
        <CaseVideo
          src="/videos/moritz-intake/start.mp4"
          poster="/images/moritz-intake/posters/start.jpg"
          width={1920}
          height={1200}
          title="Starting a case"
          description="A client types their matter into the composer and sends it. The intake conversation opens with the brief panel beside it."
          caption="The first message starts the case."
        />
        <p>
          The composer sits under the greeting on every visit. A draft tile appears on the first
          message and the case number appears on submit.
        </p>
      </CaseSection>

      <CaseSection id="receipts" eyebrow="Where am I" title="Every answer gets a receipt">
        <CaseVideo
          src="/videos/moritz-intake/steps.mp4"
          poster="/images/moritz-intake/posters/steps.jpg"
          width={1920}
          height={1200}
          title="Step receipts"
          description="The client answers a question. A receipt with a green check appears, the brief's count goes up, and Moritz asks the next question."
          caption="Answer, receipt, next question."
        />
        <ImageFrame
          src="/images/moritz-intake/brief-count.png"
          width={730}
          height={96}
          alt="The case brief header with its step count."
          caption="The count, top of the brief panel."
          size="lg"
        />
        <ImageFrame
          src="/images/moritz-intake/sketches/sketch-receipt-in-thread.jpg"
          width={1600}
          height={984}
          alt="Index-card sketch of a conversation thread with a step receipt sitting inline between messages."
          caption="The receipt was always going to live in the thread."
          size="md"
        />
        <p>
          Each receipt is one line in the thread, and the count in the brief moves. A skipped
          step still counts as done.
        </p>
      </CaseSection>

      <CaseSection
        id="transparency"
        eyebrow="Transparency"
        title="Moritz says what it filled in"
      >
        <CaseVideo
          src="/videos/moritz-intake/working.mp4"
          poster="/images/moritz-intake/posters/working.jpg"
          width={1920}
          height={1200}
          title="Moritz names what it took"
          description="A long first message fills several brief items at once. Moritz names which ones it took, and the client clicks one to edit it."
          caption="One message, three items filled, one line saying so."
        />
        <ImageFrame
          src="/images/moritz-intake/attribution.png"
          width={1350}
          height={240}
          alt="Moritz: 'I took what you need and other side from your message. Change anything I've got wrong.'"
          caption="The line, in the script."
        />
        <p>
          A small model pulls answers out of the message. A hand-written script decides what
          Moritz says next, so the flow works even if the model is slow or wrong.
        </p>
      </CaseSection>

      <CaseSection
        id="attachments"
        eyebrow="Uploading"
        title="Upload is available at every step"
      >
        <ImageFrame
          src="/images/moritz-intake/composer.png"
          width={1570}
          height={380}
          alt="The composer: 'Describe your matter, or drop a document here', with an Attach file button."
          caption="Describe your matter, or drop a document here."
        />
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <ImageFrame
            src="/images/moritz-intake/panel-docs-before.png"
            width={730}
            height={370}
            alt="The brief panel mid-intake, with an Attach files button under Documents."
            caption="Brief panel, any step: Attach files."
            flush
          />
          <ImageFrame
            src="/images/moritz-intake/panel-docs-after.png"
            width={730}
            height={390}
            alt="The brief panel after a file is attached, with an Add more files button."
            caption="Brief panel, after: Add more files."
            flush
          />
        </div>
        <p>
          The attach control sits in the placeholder, in Moritz&rsquo;s first message, and in the
          brief panel. For contract matters, the document is the first question.
        </p>
      </CaseSection>

      <CaseSection id="submission" eyebrow="Submitting" title="Submitting ends in a case number">
        <CaseVideo
          src="/videos/moritz-intake/submit.mp4"
          poster="/images/moritz-intake/posters/submit.jpg"
          width={1920}
          height={1200}
          title="Submitting a case"
          description="The review card is submitted. A card appears with a green check, the case number, and a four-step track ending in three lawyer photos."
          caption="The moment of submission."
        />
        <ImageFrame
          src="/images/moritz-intake/card-top.png"
          width={1424}
          height={540}
          alt="The submitted card: 'Case submitted', case number M-2026-0127, and a four-step track ending in three lawyer faces."
          caption="The track ends in the three lawyers."
        />
        <ImageFrame
          src="/images/moritz-intake/sketches/sketch-card-three-faces.jpg"
          width={1600}
          height={980}
          alt="Index-card sketch of the submitted card: a four-step track ending in three faces."
          caption="The card, as sketched: four steps ending in three faces."
          size="md"
        />
      </CaseSection>

      <CaseSection id="waiting" eyebrow="Waiting" title="Moritz narrates the wait">
        <ImageFrame
          src="/images/moritz-intake/processing.png"
          width={1450}
          height={420}
          alt="Moritz lists two finished steps, 'Read your documents' and 'Case notes ready', then hands the case to the lawyers."
          caption="Three real steps, then a handover."
        />
        <p>
          Moritz lists each step the agent takes and says you can leave. The old card promised a
          quote time nobody could keep; the new one says where the quote will arrive.
        </p>
      </CaseSection>

      <CaseSection id="home" eyebrow="Coming back" title="Every case tile shows stage and lawyer">
        <ImageFrame
          src="/images/moritz-intake/tiles.png"
          width={1570}
          height={760}
          alt="Your cases: a hero tile with the four-step track, 'Ready for payment', and 'Aélita is on your case'."
          caption="Your cases, right after submitting."
        />
        <ImageFrame
          src="/images/moritz-intake/returning.png"
          width={1570}
          height={300}
          alt="A returning client's cases, each with the lawyer's photo."
          caption="A returning client. A lawyer on every case."
        />
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <ImageFrame
            src="/images/moritz-intake/sketches/sketch-two-tiles.jpg"
            width={1600}
            height={1011}
            alt="Index-card sketch of two case tiles: a full tile with a step track and a slim tile with a face."
            caption="A full tile with the track, a slim one with a face."
            flush
          />
          <ImageFrame
            src="/images/moritz-intake/sketches/sketch-home-your-cases.jpg"
            width={1600}
            height={992}
            alt="Index-card sketch of a 'Your cases' section on the home page, with case tiles and a view-all link."
            caption="Your cases on the home page, with a view-all link."
            flush
          />
        </div>
        <p>A tile shows a track until a lawyer is assigned, then a name and a face.</p>
      </CaseSection>

      <CaseSection id="human" eyebrow="Human" title="A real person at every step">
        <ImageFrame
          src="/images/moritz-intake/card-lawyers.png"
          width={1440}
          height={370}
          alt="The bottom of the submitted card: the three lawyers the case is heading toward, and what happens next."
          caption="Who the case is going to, and what happens next."
        />
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <ImageFrame
            src="/images/moritz-intake/brief-bottom.png"
            width={650}
            height={130}
            alt="The brief panel footer: three lawyer faces and a line about the quote."
            caption="Brief panel, every step."
            flush
          />
          <ImageFrame
            src="/images/moritz-intake/tile-hero.png"
            width={1550}
            height={355}
            alt="A case tile after submit, its track ending in three lawyer faces."
            caption="Case tile, after submit."
            flush
          />
        </div>
        <ImageFrame
          src="/images/moritz-intake/sketches/sketch-home-lawyers.jpg"
          width={1600}
          height={1001}
          alt="Index-card sketch of the home page showing a row of five lawyer portraits before any case exists."
          caption="Five lawyers on the home page, before a case exists."
          size="md"
        />
        <p>
          The same three faces follow a case from card to tile. A lawyer is named only once one is
          assigned.
        </p>
      </CaseSection>

      <CaseSection id="voice" eyebrow="Voice" title="Moritz sounds like a firm">
        <QuoteCard attribution="Moritz, after the first message">
          I took the timeline and other side from your message. Change anything I&rsquo;ve got wrong.
        </QuoteCard>
      </CaseSection>

      <CaseSection id="crossed-out" eyebrow="Rejected" title="Three ideas I crossed out">
        <div className="my-8 grid gap-4 sm:grid-cols-3">
          <ImageFrame
            src="/images/moritz-intake/sketches/sketch-no-size-morph.jpg"
            width={1600}
            height={995}
            alt="Index-card sketch of a composer that changes size, crossed out with a large X and the handwritten label NO SIZE MORPH."
            caption="A composer that changes size."
            flush
          />
          <ImageFrame
            src="/images/moritz-intake/sketches/sketch-fires-at-top.jpg"
            width={1600}
            height={970}
            alt="Index-card sketch of a receipt that appears at the top of the page, crossed out with a large X and the handwritten label FIRES AT TOP."
            caption="A receipt that fires at the top of the page."
            flush
          />
          <ImageFrame
            src="/images/moritz-intake/sketches/sketch-no-collapse.jpg"
            width={1600}
            height={1000}
            alt="Index-card sketch of a brief panel collapsing into a rail, crossed out with a large X and the handwritten label NO COLLAPSE."
            caption="A brief panel that collapses into a rail."
            flush
          />
        </div>
        <p>
          Drawn and crossed out on the same cards. The composer stays one size, the receipt lands
          in the thread, and the brief panel stays open.
        </p>
      </CaseSection>

      <CaseSection id="next" eyebrow="Next" title="Three next steps">
        <ul>
          <li>Watch strangers use it, starting with a Maze or UX Army run.</li>
          <li>One primary action per screen.</li>
          <li>Email at each milestone: submitted, quote ready, lawyer assigned.</li>
        </ul>
      </CaseSection>
    </CaseStudyLayout>
  );
}
