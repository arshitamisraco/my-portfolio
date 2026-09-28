import type { Metadata } from "next";
import CaseSection from "@/components/case-study/CaseSection";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import ClassifierFlow from "@/components/case-study/ClassifierFlow";
import HeroStills from "@/components/case-study/HeroStills";
import LabeledTiles from "@/components/case-study/LabeledTiles";
import SessionNetwork from "@/components/case-study/SessionNetwork";
import StatCallout from "@/components/case-study/StatCallout";
import CaseVideo from "@/components/CaseVideo";
import ImageFrame from "@/components/ImageFrame";

export const metadata: Metadata = {
  title: "Gmail Job Tracker",
  description:
    "A kanban board that reads my Gmail and sorts every job application into Applied, Interviewing, Offer or Rejected. I designed the product and the build process, then directed a network of AI coding sessions to ship it in a day.",
};

/** Every media path and its intrinsic size, in one place. */
const MEDIA = {
  board: {
    src: "/videos/gmail-job-tracker/board.mp4",
    poster: "/images/gmail-job-tracker/posters/board.jpg",
    width: 1440,
    height: 900,
  },
  sync: {
    src: "/videos/gmail-job-tracker/sync.mp4",
    poster: "/images/gmail-job-tracker/posters/sync.jpg",
    width: 1440,
    height: 900,
  },
  drag: {
    src: "/videos/gmail-job-tracker/drag.mp4",
    poster: "/images/gmail-job-tracker/posters/drag.jpg",
    width: 1440,
    height: 900,
  },
  detail: {
    src: "/videos/gmail-job-tracker/detail.mp4",
    poster: "/images/gmail-job-tracker/posters/detail.jpg",
    width: 1440,
    height: 900,
  },
  ignore: {
    src: "/videos/gmail-job-tracker/ignore.mp4",
    poster: "/images/gmail-job-tracker/posters/ignore.jpg",
    width: 1440,
    height: 900,
  },
  boardFull: { src: "/images/gmail-job-tracker/board-full.png", width: 2880, height: 1800 },
  card: { src: "/images/gmail-job-tracker/card.png", width: 644, height: 236 },
  column: { src: "/images/gmail-job-tracker/column.png", width: 728, height: 1318 },
  detailPanel: { src: "/images/gmail-job-tracker/detail-panel.png", width: 896, height: 2080 },
  header: { src: "/images/gmail-job-tracker/header.png", width: 2880, height: 130 },
  contract: { src: "/images/gmail-job-tracker/contract.png", width: 1920, height: 1406 },
} as const;

export default function GmailJobTracker() {
  return (
    <CaseStudyLayout
      slug="gmail-job-tracker"
      eyebrow="Gmail Job Tracker · Case study"
      title="Gmail Job Tracker"
      summary="Job hunting turns your inbox into a filing problem. This app signs into Gmail, finds every application email, works out the company, role and stage, and puts each one on a board. You drag a card when it's wrong, and it never overrides you again."
      highlight={{
        stat: "Brief to working app in one day, built by a five-session agent network I designed",
      }}
      meta={[
        { label: "Role", value: "Product design · Design engineering · Agent orchestration" },
        { label: "Type", value: "Full stack product" },
        { label: "Timeline", value: "1 day · September 2026" },
        { label: "Stack", value: "Next.js 16 · Gmail API · Claude Haiku · SQLite · Motion" },
      ]}
      hero={
        <HeroStills
          ariaLabel="A first look at Gmail Job Tracker"
          rows={[
            [
              {
                kind: "video",
                src: MEDIA.board.src,
                poster: MEDIA.board.poster,
                width: MEDIA.board.width,
                height: MEDIA.board.height,
                title: "The board",
                description:
                  "The populated board: application cards in Applied, Interviewing, Offer and Rejected columns on a pale blue canvas. The cursor drifts over Orbital and Parallax.",
                tone: "sky",
              },
              [
                {
                  src: MEDIA.column.src,
                  width: MEDIA.column.width,
                  height: MEDIA.column.height,
                  alt: "The Interviewing column: three frosted-glass cards for Parallax, Bluepeak Analytics and Acme Corp under a yellow status dot and a count.",
                  tone: "lavender",
                },
                {
                  src: MEDIA.card.src,
                  width: MEDIA.card.width,
                  height: MEDIA.card.height,
                  alt: "One application card: Acme Corp, Design Technologist, 2 emails.",
                  tone: "mint",
                },
              ],
            ],
          ]}
        />
      }
    >
      <CaseSection
        id="problem"
        eyebrow="The problem"
        title="Every application ends up as six emails from four senders."
      >
        <p>
          Confirmations come from Greenhouse. Interview invites come from a recruiter. Rejections
          come from no-reply. Nothing in the inbox says which company or which stage.
        </p>
        <LabeledTiles
          columns={3}
          tiles={[
            {
              label: "“Thank you for applying to Acme Corp!”",
              detail: "From no-reply@greenhouse.io. Read as Applied · Acme Corp · Design Technologist.",
            },
            {
              label: "“Let's schedule an interview - Acme Corp”",
              detail: "From a recruiter. Read as Interviewing · Acme Corp. Same card, moved over.",
            },
            {
              label: "“Regarding your Design Technologist application at Brightwater”",
              detail: "From a person. Read as Rejected · Brightwater. The subject never says so.",
            },
          ]}
        />
      </CaseSection>

      <CaseSection
        id="board"
        eyebrow="The board"
        title="One card per company. Four columns. Nothing to file."
      >
        <p>
          Cards sort themselves by the latest email. The count on each column is the only number
          on the page.
        </p>
        <CaseVideo
          src={MEDIA.board.src}
          poster={MEDIA.board.poster}
          width={MEDIA.board.width}
          height={MEDIA.board.height}
          title="The board loads"
          description="The populated board with cards in Applied, Interviewing, Offer and Rejected, each column showing a count. The cursor drifts and hovers Orbital and Parallax, which lift slightly."
          caption="Cards lift on hover. Colour appears only on the status dot and pill."
          tone="sky"
        />
      </CaseSection>

      <CaseSection
        id="sync"
        eyebrow="Keeping up"
        title="New mail lands on the board by itself."
      >
        <p>
          The app checks Gmail every two minutes, or when you press Sync now. A new confirmation
          becomes a new card. An interview invite moves a card over.
        </p>
        <CaseVideo
          src={MEDIA.sync.src}
          poster={MEDIA.sync.poster}
          width={MEDIA.sync.width}
          height={MEDIA.sync.height}
          title="Sync now"
          description={'Pressing Sync now shows a "1 new" toast and Sundial lands at the top of Applied. A second Sync now shows "1 updated" and Halcyon moves from Applied to Interviewing.'}
          caption="Sync now: Sundial arrives, then Halcyon moves to Interviewing."
          tone="mint"
        />
        <StatCallout>
          Polling, not push. A two-minute poll was the honest choice for a single user. Gmail push
          needs a public endpoint and a Pub/Sub topic.
        </StatCallout>
      </CaseSection>

      <CaseSection
        id="classifier"
        eyebrow="Reading the email"
        title="A small model reads each email once and fills in a form."
      >
        <p>
          Claude Haiku gets the subject, sender, snippet and the first 2,000 characters of the
          body. It must answer through one tool call with a fixed schema. The prompt&rsquo;s
          hardest rule: the sender is usually an applicant-tracking system, so the company is the
          one named in the email, never the domain.
        </p>
        <ClassifierFlow />
        <LabeledTiles
          columns={2}
          tiles={[
            { label: "Applied", detail: "Confirms an application was submitted or received." },
            { label: "Interviewing", detail: "Invites you to schedule or confirms an interview, phone screen or call." },
            { label: "Offer", detail: "Extends a job offer." },
            { label: "Rejected", detail: "Says you weren't selected, or the company is moving forward with others." },
          ]}
        />
        <StatCallout>
          If the model is down or there&rsquo;s no key, a keyword heuristic takes over. The board
          never depends on the API.
        </StatCallout>
      </CaseSection>

      <CaseSection
        id="correct"
        eyebrow="Correcting it"
        title="Drag it. Edit it. It stays."
      >
        <p>
          The model gets things wrong. So every card is editable, and once you touch one, sync
          never overwrites your version.
        </p>
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <CaseVideo
            src={MEDIA.drag.src}
            poster={MEDIA.drag.poster}
            width={MEDIA.drag.width}
            height={MEDIA.drag.height}
            title="Drag between columns"
            description="The Orbital card is dragged from Applied to Interviewing. The target column shows a yellow ring, and both counts change to four."
            caption="Drag between columns."
            flush
            tone="lavender"
          />
          <CaseVideo
            src={MEDIA.detail.src}
            poster={MEDIA.detail.poster}
            width={MEDIA.detail.width}
            height={MEDIA.detail.height}
            title="Edit a card"
            description="The Halcyon card opens in a side panel. The role is retyped to Design Technologist and saved, and the card then shows the new role and an edited pill."
            caption="Open a card, fix the role, see it save."
            flush
            tone="butter"
          />
        </div>
        <CaseVideo
          src={MEDIA.ignore.src}
          poster={MEDIA.ignore.poster}
          width={MEDIA.ignore.width}
          height={MEDIA.ignore.height}
          title="Mark not job-related"
          description="Nimbus Data is opened and marked not job-related, and its card leaves the board. Turning on Show ignored brings it back, dimmed, in an Ignored column."
          caption="Not job-related? One click hides it. The email is remembered, so it never comes back."
          tone="sky"
        />
      </CaseSection>

      <CaseSection
        id="privacy"
        eyebrow="What's stored"
        title="The board never keeps your email."
      >
        <p>The database holds enough to draw a card and link back to Gmail.</p>
        <p className="text-style-eyebrow mt-8 mb-0 text-ink-muted">Stored</p>
        <LabeledTiles
          columns={2}
          tiles={[
            { label: "Subject and sender" },
            { label: "Received date" },
            { label: "Gmail's own snippet, 200 characters" },
            { label: "What the classifier decided" },
            { label: "A link to the message in Gmail" },
          ]}
        />
        <p className="text-style-eyebrow mt-8 mb-0 text-ink-muted">Never stored</p>
        <LabeledTiles
          columns={2}
          tiles={[
            {
              label: "Email bodies",
              detail: "Read once, in memory, for classification.",
            },
          ]}
        />
        <ImageFrame
          src={MEDIA.contract.src}
          width={MEDIA.contract.width}
          height={MEDIA.contract.height}
          alt="The data-model contract from PROJECT.md, rendered as a frosted card: the SQL that defines the tables."
          caption="The data-model contract from PROJECT.md."
          tone="butter"
        />
      </CaseSection>

      <CaseSection
        id="system"
        eyebrow="The design system"
        title="Calm glass, and colour only where it means something."
      >
        <p>
          The canvas is a pale blue with blurred orbs. Cards and panels are frosted glass. The
          only real colour is status: yellow for interviewing, green for offer, red for rejected.
          It lives on the column dot and the pills, never on the card. Cards keep their identity
          as they move between columns. Every animation respects reduced motion.
        </p>
        <ImageFrame
          src={MEDIA.boardFull.src}
          width={MEDIA.boardFull.width}
          height={MEDIA.boardFull.height}
          alt="The full board: a pale blue canvas with soft blurred orbs, four frosted-glass columns of application cards, and a glass header bar."
          caption="Canvas, orbs, glass. Status colour only on the dots and pills."
          tone="sky"
        />
        <ImageFrame
          src={MEDIA.header.src}
          width={MEDIA.header.width}
          height={MEDIA.header.height}
          alt="The header bar: an Up to date toast, Synced now, a Show ignored toggle, and the Sync now and Sign out buttons."
          caption="The header."
          tone="butter"
        />
        <div className="my-8 grid items-start gap-4 sm:grid-cols-2">
          <ImageFrame
            src={MEDIA.column.src}
            width={MEDIA.column.width}
            height={MEDIA.column.height}
            alt="The Interviewing column with a yellow status dot and three cards: Parallax, Bluepeak Analytics and Acme Corp."
            caption="A column."
            size="sm"
            flush
            tone="mint"
          />
          <ImageFrame
            src={MEDIA.detailPanel.src}
            width={MEDIA.detailPanel.width}
            height={MEDIA.detailPanel.height}
            alt="The side sheet for Acme Corp: editable company, role, status and notes, and two emails with Open in Gmail links."
            caption="The detail sheet."
            size="sm"
            flush
            tone="lavender"
          />
        </div>
        <LabeledTiles
          columns={3}
          tiles={[
            { label: "Canvas and orbs" },
            { label: "Glass: fill, hairline, top highlight" },
            { label: "Status tones: neutral, yellow, green, red" },
            { label: "Radii: 10 · 14 · 20 · 28 · pill" },
            { label: "Springs: calm and soft, from one file" },
            { label: "Reduced motion, in CSS and in code" },
          ]}
        />
      </CaseSection>

      <CaseSection
        id="build"
        eyebrow="How I built it"
        title="I designed the process, then ran it as a network of sessions."
      >
        <p>
          I wrote the brief and the constraints. A planner turned them into a contract: stack,
          data model, API, and which files each coder owns. Two coders built the backend and the
          frontend in parallel, without seeing each other&rsquo;s code. An integration session ran
          both halves together and fixed the seams with Playwright. A reviewer did a security
          pass.
        </p>
        <p>
          The redesign used the same shape: a design doc, one session for primitives, two for
          screens, a screenshot review. Everything shipped the same day.
        </p>
        <SessionNetwork />
        <p className="text-style-eyebrow mt-8 mb-0 text-ink-muted">Two contracts</p>
        <LabeledTiles
          columns={3}
          tiles={[
            { label: "Stack decided up front" },
            { label: "Data model as SQL, frozen" },
            { label: "API routes and shapes" },
            { label: "File ownership per session" },
            { label: "Tokens once, in one file" },
            { label: "Component props as a table" },
          ]}
        />
      </CaseSection>

      <CaseSection id="next" eyebrow="What I'd do next" title="Three things, in order.">
        <LabeledTiles
          columns={3}
          tiles={[
            {
              label: "Show the model's confidence",
              detail: "The classifier already returns it. Low-confidence cards should ask for a check.",
            },
            {
              label: "Gmail push",
              detail: "Replace the two-minute poll with a Pub/Sub subscription once it's more than one user.",
            },
            {
              label: "Watch someone else use it",
              detail: "It's built around my inbox. Other people's mail will break assumptions I can't see.",
            },
          ]}
        />
      </CaseSection>
    </CaseStudyLayout>
  );
}
