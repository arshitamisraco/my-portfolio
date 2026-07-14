import type { Metadata } from "next";
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
    <li className="relative pb-16 pl-8 last:pb-0 md:pl-12">
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
            <span className="font-medium text-accent-deep">COROS AI</span>.
          </p>
        </div>
      </section>

      {/* ================= Timeline + right column ================= */}
      {/* Two-column grid: ~58% timeline (left) / ~42% right column. Collapses to a
          single column below lg, where source order gives the required mobile
          stack: timeline → principles → hobbies → media. Both columns scroll
          normally — nothing is sticky. */}
      <section className="pb-section">
        <div className="container-site grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          {/* ---------- LEFT: existing timeline (content unchanged) ---------- */}
          <div>
          <ol className="border-l-2 border-line">
            <Reveal>
              <TimelineItem
                date="July 2025"
                title="Joined COROS AI as founding product designer"
                body={
                  <>
                    <p>
                      I joined COROS AI as the sole product designer, the founding
                      designer on a team moving fast through ambiguity. Startup life
                      taught me to think across the entire system: connecting human
                      behavior, engineering constraints, and business goals in the same
                      breath. I&rsquo;ve worn every hat and shipped end to end.
                    </p>
                    <p className="border-l-4 border-accent pl-4 font-display text-h4 font-medium text-ink">
                      Great design isn&rsquo;t just craft: it&rsquo;s clarity,
                      collaboration, and conviction.
                    </p>
                    <ImageFrame
                      alt="Arshita with the COROS AI co-founders"
                      plannedSrc="/images/about/coros-cofounders.jpg"
                      caption="With the co-founders at COROS AI."
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
                    <div className="grid gap-4 sm:grid-cols-2">
                      <ImageFrame
                        alt="Graduation day at UW Seattle"
                        plannedSrc="/images/about/uw-graduation.jpg"
                        tone="lavender"
                      />
                      <ImageFrame
                        alt="Celebrating with my HCDE cohort"
                        plannedSrc="/images/about/hcde-cohort.jpg"
                        tone="sky"
                      />
                    </div>
                  </>
                }
              />
            </Reveal>

            <Reveal>
              <TimelineItem
                date="March 2025"
                title="2nd place, RESNA Student Accessibility Design Competition"
                body={
                  <p>
                    I designed a switch-accessible tablet app, co-designing with kids
                    with motor disabilities. The lesson that stuck with me: accessibility
                    is designing with restraint, intention, and accountability to the
                    people you&rsquo;re designing with.
                  </p>
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
                      around a shared vision and shipping it together.
                    </p>
                    <ImageFrame
                      alt="Team Dave's 🐔, my UW capstone team"
                      plannedSrc="/images/about/team-daves.jpg"
                      caption="Team Dave's 🐔"
                      tone="butter"
                    />
                  </>
                }
              />
            </Reveal>
          </ol>
          </div>

          {/* ---------- RIGHT: principles, hobbies, hobby media ---------- */}
          <aside className="space-y-14">
            {/* 1. Principles */}
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

            {/* 2. Hobbies */}
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
                  ].map((h) => (
                    <li key={h.label} className="flex flex-col items-center gap-2">
                      <span className="flex h-16 w-16 items-center justify-center rounded-card border border-line bg-surface-raised">
                        <HobbyIcon name={h.name as "gym" | "hiking" | "vlogging"} size={40} />
                      </span>
                      <span className="text-caption font-medium text-ink">{h.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* 3. Hobby media — vertical vlog (existing video frame) + optional gym
                photo. Stacked and matched to the same width because the right
                column is narrow; both center in the column. */}
            <Reveal>
              <div className="flex flex-col gap-6">
                {/* Vertical mobile vlog. CaseVideo (the frame around all videos)
                    handles autoplay/muted/loop/playsInline + poster, and shows the
                    poster only under prefers-reduced-motion.
                    TODO: drop the real clip at  public/videos/about/hobby-vlog.mp4
                    The poster below is a solid placeholder — replace it at
                    public/images/about/hobby-vlog-poster.png (or point to a .jpg). */}
                <CaseVideo
                  src="/videos/about/hobby-vlog.mp4"
                  poster="/images/about/hobby-vlog-poster.png"
                  width={1080}
                  height={1920}
                  size="mobile"
                  tone="lavender"
                  flush
                  title="A mobile vlog"
                  description="A short vertical vlog from off-the-clock life."
                />

                {/* OPTIONAL — delete this whole block to remove the gym photo.
                    TODO: drop the photo at  public/images/about/gym.jpg
                    then pass it as `src` (with width/height) instead of plannedSrc. */}
                <ImageFrame
                  alt="At the gym"
                  plannedSrc="/images/about/gym.jpg"
                  aspect="square"
                  tone="mint"
                  size="mobile"
                  flush
                />
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
