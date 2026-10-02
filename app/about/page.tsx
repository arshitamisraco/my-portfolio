import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import CaseVideo from "@/components/CaseVideo";
import HobbyIcon from "@/components/HobbyIcon";
import ImageFrame from "@/components/ImageFrame";
import PixelCloud from "@/components/PixelCloud";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { CONTACT_EMAIL } from "@/lib/contact";
import { PROJECTS_HREF } from "@/lib/projects";

export const metadata: Metadata = {
  title: "About",
  description:
    "Arshita Misra is a product designer and design engineer building human-centered AI, and was the founding designer at COROS AI from 2025 to 2026.",
};

interface TimelineEntry {
  date: string;
  title: string;
  body: React.ReactNode;
}

function TimelineItem({ date, title, body }: TimelineEntry) {
  return (
    <li>
      <p className="text-style-eyebrow text-accent-deep">{date}</p>
      <h2 className="mt-2 font-display text-h3 font-semibold text-ink">{title}</h2>
      <div className="mt-3 max-w-none space-y-4 text-body text-ink-muted">{body}</div>
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
          <SectionLabel>About me</SectionLabel>
          <h1 className="mt-6 max-w-3xl font-display text-display font-semibold text-ink">
            Hi, I&rsquo;m Arshita.
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg text-ink-muted">
            Product designer and design engineer. I build human-centered AI products end to
            end, from research to production code, and I&rsquo;m looking for my next founding
            or product design role.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            <Link
              href="/resume"
              className="text-body font-medium text-accent-deep underline-offset-4 hover:underline"
            >
              Résumé →
            </Link>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-body font-medium text-accent-deep underline-offset-4 hover:underline"
            >
              Email me →
            </a>
          </div>
        </div>
      </section>

      {/* ================= Timeline + right column ================= */}
      {/* Two-column grid: ~58% timeline (left) / ~42% right column. Collapses to a
          single column below lg, where source order gives the required mobile
          stack: timeline → hobbies → media. Both columns scroll
          normally — nothing is sticky. */}
      <section className="pb-section">
        <div className="container-site grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-36">
          {/* ---------- LEFT: timeline ---------- */}
          <div>
          {/* space-y-24 spaces each Reveal-wrapped entry uniformly (6rem). It lives
              on the <ol> — not as per-<li> padding — because every <li> is the lone
              child of its own Reveal wrapper, which made `last:pb-0` match them all
              and zero the padding out. */}
          <ol className="space-y-16">
            <Reveal>
              <TimelineItem
                date="Jul 2025 – Aug 2026"
                title="Founding product designer at COROS AI"
                body={
                  <>
                    <p>
                      Startup life taught me to think across the entire system. I&rsquo;ve
                      worn every hat and shipped end to end.
                    </p>
                    <ImageFrame
                      src="/images/about/coros-team.jpg"
                      alt="Some of the COROS AI team"
                      width={1017}
                      height={452}
                      caption="Some of the COROS AI team."
                      size="full"
                    />
                  </>
                }
              />
            </Reveal>

            <Reveal>
              <TimelineItem
                date="June 2025"
                title="Graduated in Human Centered Design & Engineering"
                body={
                  <>
                    <p>
                      UW taught me how to show up: wear any hat, rally a team around a
                      vision, and navigate the messy, human side of product work.
                    </p>
                    <ImageFrame
                      src="/images/about/graduation.jpg"
                      alt="Graduation day at UW Seattle"
                      width={1400}
                      height={933}
                      caption="Graduation day at UW Seattle."
                      size="md"
                    />
                  </>
                }
              />
            </Reveal>

            <Reveal>
              <TimelineItem
                date="March 2025"
                title="2nd of 100+ teams at RESNA"
                body={
                  <>
                    <p>
                      I designed a switch-accessible tablet app, co-designing with kids with
                      motor disabilities.
                    </p>
                    <ImageFrame
                      src="/images/about/resna.jpg"
                      alt="At the RESNA Student Accessibility Design Competition"
                      width={1400}
                      height={1050}
                      size="md"
                    />
                  </>
                }
              />
            </Reveal>

            <Reveal>
              <TimelineItem
                date="January 2025"
                title="Led a UW virtual museum capstone"
                body={
                  <>
                    <p>
                      My team scaled a local historical institution&rsquo;s virtual museum
                      from{" "}
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
                    />
                  </>
                }
              />
            </Reveal>

            <Reveal>
              <TimelineItem
                date="Spring 2024"
                title="UX/UI intern at Nitecapp"
                body={
                  <>
                    <p>
                      A system I designed (badges, streaks, and real-time feedback) lifted a
                      key engagement metric{" "}
                      <span className="font-medium text-accent-deep">15%</span> at the pilot
                      venue.
                    </p>
                    <ImageFrame
                      src="/images/about/nitecapp.jpg"
                      alt="The Nitecapp team"
                      width={1400}
                      height={1050}
                      caption="The Nitecapp team"
                      size="md"
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

          {/* ---------- RIGHT: hobbies, hobby media ---------- */}
          <aside className="space-y-14">
            {/* 1. Hobbies */}
            <Reveal>
              <div>
                <SectionLabel>Off the clock</SectionLabel>
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

            {/* 2. Hobby media — vertical vlog + cooking photos.
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
                    size="mobile"
                    flush
                  />
                  <ImageFrame
                    src="/images/about/cooking-2.jpg"
                    alt="The finished dish"
                    width={1399}
                    height={1866}
                    caption="After"
                    size="mobile"
                    flush
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
                Want to see the work?
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-4">
              <Button href={PROJECTS_HREF}>See the work</Button>
              <Button href="/resume" variant="secondary">
                Résumé
              </Button>
              <Button href={`mailto:${CONTACT_EMAIL}`} variant="secondary">
                Email me
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
