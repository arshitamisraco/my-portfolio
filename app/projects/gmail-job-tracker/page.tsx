import type { Metadata } from "next";
import CaseSection from "@/components/case-study/CaseSection";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import ClassifierFlow from "@/components/case-study/ClassifierFlow";
import HeroStills from "@/components/case-study/HeroStills";
import LabeledTiles from "@/components/case-study/LabeledTiles";
import SessionNetwork from "@/components/case-study/SessionNetwork";
import CaseVideo from "@/components/CaseVideo";
import ImageFrame from "@/components/ImageFrame";

export const metadata: Metadata = {
  title: "Gmail Job Tracker",
  description:
    "A kanban board that reads Gmail and sorts every job application by stage. Built in a day by five AI sessions I directed.",
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
      summary="Reads your Gmail, finds every application email, and puts each company on a board by stage."
      stats={[
        { value: "1 day", label: "from brief to working app" },
        { value: "5", label: "agent sessions I directed" },
        { value: "4", label: "status columns" },
      ]}
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
                  "The populated board with application cards in four status columns.",
                tone: "sky",
              },
              [
                {
                  src: MEDIA.column.src,
                  width: MEDIA.column.width,
                  height: MEDIA.column.height,
                  alt: "The Interviewing column with three frosted-glass cards.",
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
        title="One application, six emails, four senders"
      >
        <p>
          Confirmations come from Greenhouse, invites from a recruiter, rejections from no-reply. Nothing says which company or stage.
        </p>
      </CaseSection>

      <CaseSection id="board" eyebrow="The board" title="One card per company, four columns">
        <CaseVideo
          src={MEDIA.board.src}
          poster={MEDIA.board.poster}
          width={MEDIA.board.width}
          height={MEDIA.board.height}
          title="The board loads"
          description="The board with a count on each column. Hovered cards lift slightly."
          caption="Cards lift on hover."
          tone="sky"
        />
        <p>Cards sort by the latest email.</p>
      </CaseSection>

      <CaseSection id="sync" eyebrow="Keeping up" title="New mail lands on the board">
        <CaseVideo
          src={MEDIA.sync.src}
          poster={MEDIA.sync.poster}
          width={MEDIA.sync.width}
          height={MEDIA.sync.height}
          title="Sync now"
          description={'A "1 new" toast and Sundial lands in Applied. Then "1 updated" and Halcyon moves to Interviewing.'}
          caption="Sundial arrives, then Halcyon moves to Interviewing."
          tone="mint"
        />
        <p>
          Gmail is polled every 2 minutes, or on Sync now. A new confirmation becomes a card.
        </p>
      </CaseSection>

      <CaseSection
        id="classifier"
        eyebrow="Reading the email"
        title="A small model reads each email once"
      >
        <ClassifierFlow />
        <p>
          Claude Haiku reads the subject, sender, snippet and first 2,000 characters, then answers through one fixed-schema tool call. A keyword heuristic takes over if the model is down.
        </p>
        <LabeledTiles
          tiles={[
            { label: "Applied", detail: "Confirms an application was received." },
            { label: "Interviewing", detail: "Invites or confirms an interview or call." },
            { label: "Offer", detail: "Extends a job offer." },
            { label: "Rejected", detail: "Says the company is moving on." },
          ]}
        />
      </CaseSection>

      <CaseSection id="correct" eyebrow="Correcting it" title="Drag it, edit it, it stays">
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <CaseVideo
            src={MEDIA.drag.src}
            poster={MEDIA.drag.poster}
            width={MEDIA.drag.width}
            height={MEDIA.drag.height}
            title="Drag between columns"
            description="Orbital is dragged from Applied to Interviewing and both counts change."
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
            description="The Halcyon card opens in a side panel. The role is retyped and saved."
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
          description="Nimbus Data is marked not job-related and leaves the board. Show ignored brings it back, dimmed."
          caption="One click hides a non-job email for good."
          tone="sky"
        />
        <p>
          Once you edit a card, sync never overwrites your version.
        </p>
      </CaseSection>

      <CaseSection id="privacy" eyebrow="What's stored" title="Only card data is stored">
        <ImageFrame
          src={MEDIA.contract.src}
          width={MEDIA.contract.width}
          height={MEDIA.contract.height}
          alt="The data-model contract from PROJECT.md: the SQL that defines the tables."
          caption="The data-model contract from PROJECT.md."
          tone="butter"
        />
        <p>
          The database holds subject, sender, date, a 200-character snippet, the classifier&rsquo;s decision and a Gmail link. Bodies are read once, in memory.
        </p>
      </CaseSection>

      <CaseSection
        id="system"
        eyebrow="The design system"
        title="Calm glass, with colour for status"
      >
        <ImageFrame
          src={MEDIA.boardFull.src}
          width={MEDIA.boardFull.width}
          height={MEDIA.boardFull.height}
          alt="The full board: pale blue canvas, blurred orbs, four frosted-glass columns, a glass header."
          caption="Canvas, orbs, glass."
          tone="sky"
        />
        <ImageFrame
          src={MEDIA.header.src}
          width={MEDIA.header.width}
          height={MEDIA.header.height}
          alt="The header bar with a sync toast, Show ignored toggle, Sync now and Sign out buttons."
          caption="The header."
          tone="butter"
        />
        <div className="my-8 grid items-start gap-4 sm:grid-cols-2">
          <ImageFrame
            src={MEDIA.column.src}
            width={MEDIA.column.width}
            height={MEDIA.column.height}
            alt="The Interviewing column with a yellow status dot and three cards."
            caption="A column."
            size="sm"
            flush
            tone="mint"
          />
          <ImageFrame
            src={MEDIA.detailPanel.src}
            width={MEDIA.detailPanel.width}
            height={MEDIA.detailPanel.height}
            alt="The Acme Corp side sheet: editable company, role, status, notes and two emails."
            caption="The detail sheet."
            size="sm"
            flush
            tone="lavender"
          />
        </div>
        <p>
          Pale blue canvas, frosted-glass cards. Status carries the only colour: yellow interviewing, green offer, red rejected.
        </p>
        <p>
          Radii run 10, 14, 20, 28 and pill. Springs come from one file.
        </p>
      </CaseSection>

      <CaseSection id="build" eyebrow="How I built it" title="I ran the build as five sessions">
        <SessionNetwork />
        <ul>
          <li>I wrote the brief; a planner froze stack, data model and API.</li>
          <li>Two coders built backend and frontend in parallel, each owning set files.</li>
          <li>An integration session ran both halves and fixed the seams with Playwright.</li>
          <li>A reviewer did a security pass, and the redesign reused the shape.</li>
        </ul>
      </CaseSection>
    </CaseStudyLayout>
  );
}
