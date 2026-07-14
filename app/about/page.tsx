import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import CaseVideo from "@/components/CaseVideo";
import HobbyIcon from "@/components/HobbyIcon";
import ImageFrame from "@/components/ImageFrame";
import PixelCloud from "@/components/PixelCloud";
import PrincipleCard from "@/components/PrincipleCard";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "About",
  description:
    "Arshita Misra is a product designer obsessed with human-centered AI — currently the founding designer at COROS AI.",
};

interface TimelineEntry {
  date: string;
  title: string;
  body: React.ReactNode;
}

function TimelineItem({ date, title, body }: TimelineEntry) {
  return (
    <li className="relative pl-8 md:pl-12">
      {/* pixel marker on the timeline rail */}
      <span
        aria-hidden="true"
        className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 border-2 border-bg bg-accent"
      />
      <p className="text-style-eyebrow text-accent-deep">{date}</p>
      <h2 className="mt-3 font-display text-h2 font-semibold text-ink">{title}</h2>
      {/* max-w-none: the timeline now lives in the ~58% grid column, so it no
          longer needs its own page-width cap — the column constrains it. */}
      <div className="mt-4 max-w-none space-y-4 text-body-lg text-ink-muted">{body}</div>
    </li>
  );
}

export default function About() {
  return (
    <>
      {/* ================= Intro ================= */}
      <section className="relative overflow-hidden py-section">
        <PixelCloud
          shape="wisp"
          variant="sky"
          size={160}
          className="absolute right-[8%] top-12 opacity-50"
          aria-hidden
        />
        <div className="container-site relative">
          <SectionLabel cloud>About me</SectionLabel>
          <h1 className="mt-6 max-w-3xl font-display text-display font-semibold text-ink">
            I&rsquo;m so glad you&rsquo;re here! I&rsquo;m Arshita.
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg text-ink-muted">
            I&rsquo;m a product designer obsessed with human-centered AI. I build products
            that help people think more clearly, relate more powerfully, and grow beyond
            what they thought possible. Currently doing that @{" "}
            <a
              href="/work/coros-ai"
              className="font-medium text-accent-deep underline decoration-accent underline-offset-4 hover:text-ink"
            >
              COROS AI
            </a>
            .
          </p>
        </div>
      </section>

      {/* ================= Timeline + right column ================= */}
      {/* Two-column grid: ~58% timeline (left) / ~42% right column. Collapses to a
          single column below lg, where source order gives the required mobile
          stack: timeline → principles → hobbies → media. Both columns scroll
          normally — nothing is sticky. */}
      <section className="pb-section">
        <div className="container-site grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-36">
          {/* ---------- LEFT: existing timeline (content unchanged) ---------- */}
          <div>
          {/* space-y-24 spaces each Reveal-wrapped entry uniformly (6rem). It lives
              on the <ol> — not as per-<li> padding — because every <li> is the lone
              child of its own Reveal wrapper, which made `last:pb-0` match them all
              and zero the padding out. */}
          <ol className="border-l-2 border-line space-y-24">
            <Reveal>
              <TimelineItem
                date="Now"
                title="What's next?"
                body={
                  <>
                    <p>
                      Happy at COROS AI, but always open to opportunities, good conversation
                      about design and AI, and whatever we could build together.
                    </p>
                    <Link
                      href="/contact"
                      className="inline-block font-medium text-accent-deep underline decoration-accent underline-offset-4 hover:text-ink"
                    >
                      Contact me
                    </Link>
                  </>
                }
              />
            </Reveal>

            <Reveal>
              <TimelineItem
                date="July 2025"
                title="Joined COROS AI as founding product designer"
                body={
                  <>
                    <p className="border-l-4 border-accent pl-4 font-display text-h4 font-medium text-ink">
                      Startup life taught me to think across the entire system.
                      I&rsquo;ve worn every hat and shipped end to end.
                    </p>
                    <ImageFrame
                      src="/images/about/coros-team.jpg"
                      alt="Some of the COROS AI team"
                      width={1017}
                      height={452}
                      caption="Some of the COROS AI team."
                      size="full"
                      tone="pink"
                    />
                  </>
                }
              />
            </Reveal>

            <Reveal>
              <TimelineItem
                date="June 2025"
                title="Graduated from UW in Human Centered Design & Engineering"
                body={
                  <>
                    <p>
                      UW taught me how to show up: wear any hat, rally a team around a
                      vision, and navigate the messy, human side of product work. I care
                      about craft, and I care even more about impact. What fuels me most
                      are the people I build with.
                    </p>
                    <ImageFrame
                      src="/images/about/graduation.jpg"
                      alt="Graduation day at UW Seattle"
                      width={1400}
                      height={933}
                      caption="Graduation day at UW Seattle."
                      size="md"
                      tone="lavender"
                    />
                  </>
                }
              />
            </Reveal>

            <Reveal>
              <TimelineItem
                date="March 2025"
                title="2nd of 100 teams, RESNA Student Accessibility Design Competition"
                body={
                  <>
                    <p>
                      I designed a switch-accessible tablet app, co-designing with kids
                      with motor disabilities. The lesson that stuck with me: accessibility
                      is designing with restraint, intention, and accountability to the
                      people you&rsquo;re designing with.
                    </p>
                    <ImageFrame
                      src="/images/about/resna.jpg"
                      alt="At the RESNA Student Accessibility Design Competition"
                      width={1400}
                      height={1050}
                      size="md"
                      tone="mint"
                    />
                  </>
                }
              />
            </Reveal>

            <Reveal>
              <TimelineItem
                date="January 2025"
                title="Led a UW capstone for a local historical institution"
                body={
                  <>
                    <p>
                      I led my capstone team in designing a scalable virtual museum
                      experience for a local historical institution, rallying a crew
                      around a shared vision and shipping it together. We scaled its
                      publishing capacity from{" "}
                      <span className="font-medium text-accent-deep">250 to 30,000+ items</span>{" "}
                      and secured a{" "}
                      <span className="font-medium text-accent-deep">$20K grant</span> to
                      keep it going.
                    </p>
                    <ImageFrame
                      src="/images/about/team-daves.jpg"
                      alt="Team Dave's 🐔, my UW capstone team"
                      width={1400}
                      height={1273}
                      caption="Team Dave's 🐔"
                      size="md"
                      tone="butter"
                    />
                  </>
                }
              />
            </Reveal>

            <Reveal>
              <TimelineItem
                date="Spring 2024"
                title="Interned at Nitecapp as a UX/UI intern"
                body={
                  <>
                    <p>
                      Nitecapp was my entry into startup life. As a UX/UI intern I
                      shipped real product work alongside a small, scrappy team and learned
                      what it takes to move an idea from concept to something people can
                      actually use. One system I designed &mdash; badges, streaks, and
                      real-time feedback &mdash; lifted a key engagement metric{" "}
                      <span className="font-medium text-accent-deep">15%</span> at the
                      pilot venue.
                    </p>
                    <ImageFrame
                      src="/images/about/nitecapp.jpg"
                      alt="The Nitecapp team"
                      width={1400}
                      height={1050}
                      caption="The Nitecapp team"
                      size="md"
                      tone="peach"
                    />
                  </>
                }
              />
            </Reveal>

            <Reveal>
              <TimelineItem
                date="August 2003"
                title="Born in India"
                body={<p>Where the whole story begins.</p>}
              />
            </Reveal>
          </ol>
          </div>

          {/* ---------- RIGHT: principles, hobbies, hobby media ---------- */}
          <aside className="space-y-14">
            {/* 1. Hobbies */}
            <Reveal>
              <div>
                {/* Placeholder eyebrow copy — rename freely. */}
                <SectionLabel cloud cloudVariant="sky">
                  Off the clock
                </SectionLabel>
                <ul className="mt-6 flex flex-wrap gap-6">
                  {[
                    { name: "gym", label: "Gym" },
                    { name: "hiking", label: "Hiking" },
                    { name: "vlogging", label: "Vlogging" },
                    { name: "cooking", label: "Cooking" },
                  ].map((h) => (
                    <li key={h.label} className="flex flex-col items-center gap-2">
                      <span className="flex h-16 w-16 items-center justify-center rounded-card border border-line bg-surface-raised">
                        <HobbyIcon
                          name={h.name as "gym" | "hiking" | "vlogging" | "cooking"}
                          size={40}
                        />
                      </span>
                      <span className="text-caption font-medium text-ink">{h.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* 2. Hobby media — vertical vlog + cooking photos + meta glasses.
                Stacked and matched to the same width because the right column is
                narrow; both center in the column. */}
            <Reveal>
              <div className="flex flex-col gap-6">
                {/* Vertical vlog. Autoplays muted in view (browsers block sound-on
                    autoplay); allowAudio adds a "Sound on/off" toggle below the frame.
                    Under prefers-reduced-motion it falls back to poster + click-to-play. */}
                <CaseVideo
                  src="/videos/about/hike.mp4"
                  poster="/images/about/hike-poster.jpg"
                  width={576}
                  height={1024}
                  size="mobile"
                  tone="lavender"
                  flush
                  allowAudio
                  title="Off-the-clock vlog"
                  description="A short vertical vlog from a hike outside of work."
                />

                {/* Cooking before/after, side by side. */}
                <div className="grid grid-cols-2 gap-4">
                  <ImageFrame
                    src="/images/about/cooking-1.jpg"
                    alt="Ingredients before cooking"
                    width={1399}
                    height={1866}
                    caption="Before"
                    tone="peach"
                    size="mobile"
                    flush
                  />
                  <ImageFrame
                    src="/images/about/cooking-2.jpg"
                    alt="The finished dish"
                    width={1399}
                    height={1866}
                    caption="After"
                    tone="peach"
                    size="mobile"
                    flush
                  />
                </div>

                {/* Trying on the Meta Ray-Ban glasses. */}
                <ImageFrame
                  src="/images/about/metaglasses.jpg"
                  alt="Wearing the Meta Ray-Ban smart glasses"
                  width={1400}
                  height={1866}
                  caption="Recording the world with my Meta glasses"
                  tone="mint"
                  size="mobile"
                  flush
                />
              </div>
            </Reveal>

            {/* 3. Principles */}
            <Reveal>
              <div>
                <SectionLabel cloud cloudVariant="lavender">
                  Principles
                </SectionLabel>
                <div className="mt-6 space-y-4">
                  <PrincipleCard
                    tone="pink"
                    heading="Authenticity over performance"
                    gloss="I'd rather show you the real work than a prettier version of it."
                  />
                  <PrincipleCard
                    tone="peach"
                    heading="Don't settle"
                    gloss="I'd rather sit in uncertainty than ship something mediocre."
                  />
                  <PrincipleCard
                    tone="mint"
                    heading="Do the hard thing anyway"
                    gloss="I hate starting things. I do them anyway."
                  />
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* ================= Closing CTA ================= */}
      <section className="border-t border-line bg-surface py-section">
        <div className="container-site flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <div className="flex items-start gap-5">
              <PixelCloud shape="puff" variant="lavender" size={56} className="mt-1 shrink-0" />
              <p className="max-w-xl font-display text-h2 font-medium text-ink">
                Curious what all of that looks like in practice?
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-4">
              <Button href="/work/coros-ai">See my work</Button>
              <Button
                href="https://www.linkedin.com/in/arshita-misra/"
                variant="secondary"
                external
              >
                LinkedIn
              </Button>
              {/* TODO: replace href with the hosted resume URL */}
              <Button href="#" variant="ghost">
                Resume
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
