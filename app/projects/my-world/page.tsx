import type { Metadata } from "next";
import CaseSection from "@/components/case-study/CaseSection";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import HeroStills from "@/components/case-study/HeroStills";
import ProductIntro from "@/components/case-study/ProductIntro";
import QuoteCard from "@/components/case-study/QuoteCard";
import ReviewLoop from "@/components/case-study/ReviewLoop";
import CaseVideo from "@/components/CaseVideo";
import ImageFrame from "@/components/ImageFrame";
import PullQuote from "@/components/PullQuote";

export const metadata: Metadata = {
  title: "Designing an AI That Remembers You",
  description:
    "A page that reflects a user's coaching history back to them, with the prompts behind every card.",
};

export default function MyWorld() {
  return (
    <CaseStudyLayout
      slug="my-world"
      eyebrow="COROS AI · Case Study"
      title="Designing an AI that remembers you"
      summary="My World remembers your COROS AI coaching conversations and shows your breakthroughs, reminders, and open concerns. I designed it end to end and shipped the front end in TypeScript and React on Next.js."
      stats={[
        { value: "25", label: "customer interviews" },
        { value: "20", label: "transcripts per eval batch" },
        { value: "5", label: "must-fix issues caught in one run" },
      ]}
      meta={[
        { label: "Role", value: "Product Designer · Prompt engineering · Front-end" },
        { label: "Team", value: "Founder/CEO · 2 engineers · 2 designers" },
        { label: "Timeline", value: "April – August 2026, shipped incrementally" },
        { label: "Tools", value: "Figma · Claude Code · Streamlit · TypeScript, React on Next.js" },
      ]}
      productIntro={<ProductIntro />}
      hero={
        <HeroStills
          ariaLabel="A first look at My World"
          fullBleed
          rows={[
            [
              {
                kind: "video",
                src: "/videos/my-world/reminders-widget.mp4",
                poster: "/images/my-world/posters/reminders-widget.jpg",
                width: 1440,
                height: 438,
                title: "Reminders widget",
                description: "A checklist of commitments from past sessions.",
              },
              {
                kind: "video",
                src: "/videos/my-world/breakthrough-widget.mp4",
                poster: "/images/my-world/posters/breakthrough-widget.jpg",
                width: 1322,
                height: 528,
                title: "Breakthroughs widget",
                description: "A donut of 26 breakthroughs by dimension, beside the latest quote.",
              },
              {
                src: "/images/my-world/hero/hero-provocation.png",
                width: 1404,
                height: 528,
                alt: "The Coaching Provocation card: 'Identity is built, not discovered,' ending in a question to the user.",
              },
            ],
            [
              {
                src: "/images/my-world/hero/hero-session.jpg",
                width: 1600,
                height: 998,
                alt: "A session detail page with summary, entry and exit moods, reminders, and a breakthrough quote.",
              },
              {
                src: "/images/my-world/hero/hero-page.jpg",
                width: 1600,
                height: 998,
                alt: "The My World page: a featured band with the breakthroughs donut, a quote, and provocation cards above the Reminders widget.",
              },
            ],
          ]}
        />
      }
    >
      <CaseSection id="problem" eyebrow="The problem" title="Users could not find their breakthroughs">
        <p>
          In 25 customer interviews, one thread kept returning: the coaching lands, but the
          product never shows it.
        </p>
        <QuoteCard>
          I had a difficult relationship with one of my nephews. From COROS, I had
          breakthroughs there. I can&rsquo;t find them anymore.
        </QuoteCard>
        <p>So I gave the conversation structure: sessions, topics, and My World.</p>
      </CaseSection>

      <CaseSection id="architecture" eyebrow="Architecture" title="Sessions, topics, and one home">
        <CaseVideo
          src="/videos/my-world/topic-to-session.mp4"
          poster="/images/my-world/posters/topic-to-session.jpg"
          width={1440}
          height={900}
          title="Topic to session"
          description="Opening a topic, then one session's detail page."
          caption="My World, a topic, then one session."
        />
        <p>
          A session is one conversation. A topic is a recurring situation, like
          &ldquo;Conversation with dad.&rdquo; That rule governs the detection pipeline.
        </p>
      </CaseSection>

      <CaseSection id="interface" eyebrow="The interface" title="A page you can scan">
        <CaseVideo
          src="/videos/my-world/page-tour.mp4"
          poster="/images/my-world/posters/page-tour.jpg"
          width={1440}
          height={900}
          title="My World, top to bottom"
          description="The featured band, reminders, and topics list."
          caption="Filters live inside widgets."
        />
        <CaseVideo
          src="/videos/my-world/breakthrough-widget.mp4"
          poster="/images/my-world/posters/breakthrough-widget.jpg"
          width={1322}
          height={528}
          title="Breakthrough widget"
          description="Browsing all breakthroughs, then a segment click filtering by dimension."
          caption="Mode A browses everything. Mode B filters by dimension."
        />
        <p>
          The breakthrough donut was about to be cut. I merged it with the Latest
          Breakthrough card and specced the state machine.
        </p>
        <CaseVideo
          src="/videos/my-world/reminders-widget.mp4"
          poster="/images/my-world/posters/reminders-widget.jpg"
          width={1440}
          height={438}
          title="Reminders widget"
          description="Checking off a reminder triggers confetti."
          caption="Done earns confetti. Delete exists because AI can be wrong."
        />
      </CaseSection>

      <CaseSection id="decluttering" eyebrow="Decluttering" title="From a data table to a bento box">
        <ImageFrame
          src="/images/my-world/topics-page-before.png"
          width={1440}
          height={1024}
          alt="An early topics page: a dense, spreadsheet-like list, closer to a CRM than a coaching tool."
          caption="Before: a dense table."
          flush
        />
        <CaseVideo
          src="/videos/my-world/topics-by-dimension.mp4"
          poster="/images/my-world/posters/topics-by-dimension.jpg"
          width={1440}
          height={536}
          title="Topics by dimension"
          description="Topics narrowing as dimension chips are clicked."
          caption="After: inline metadata, sticky CTAs, dimension filtering."
        />
        <p>
          Early designs showed topics like a CRM. I pitched a widget-style bento box for
          the whole page.
        </p>
      </CaseSection>

      <CaseSection id="ai" eyebrow="The AI" title="The prompts are the product">
        <ImageFrame
          src="/images/my-world/coaching-provocation.png"
          width={1404}
          height={528}
          alt="The Coaching Provocation widget: a synthesis across recent sessions that ends in a question and a Revisit action."
          caption="A provocation synthesized across sessions."
        />
        <ReviewLoop />
        <p>
          Every card comes from prompts I wrote: session summary (v6), topic summary (v7),
          topic detection, coaching invitation. An ownership gate limits each prompt to what
          the user said, because a wrong breakthrough manufactures a false memory.
        </p>
        <p>
          I test them in 20-transcript batches. One run surfaced 5 must-fix issues, each fixed
          with one added clause.
        </p>
        <p className="mt-6 text-caption text-ink-muted">
          Conversations are confidential, so examples are redacted or synthetic. The prompts
          are company IP.
        </p>
      </CaseSection>

      <CaseSection id="takeaway" eyebrow="Takeaway" title="What I owned end to end">
        <p>
          I wrote the doc engineers build from, the prompts, the QA tooling, and
          increasingly the code.
        </p>
        <PullQuote>
          At a pre-seed startup, the most valuable designer is the one who removes
          handoffs.
        </PullQuote>
      </CaseSection>
    </CaseStudyLayout>
  );
}
