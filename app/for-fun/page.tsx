import type { Metadata } from "next";
import CaseVideo from "@/components/CaseVideo";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import SpotifyEmbed from "@/components/SpotifyEmbed";
import TagChip, { type ChipTone } from "@/components/TagChip";

export const metadata: Metadata = {
  title: "For fun",
  description:
    "Hand-tracking experiments built with MediaPipe and Three.js — things I make to cultivate taste.",
};

interface Reel {
  /** The quote is the piece's title — these aren't client projects. */
  quote: string;
  author: string;
  stack: string[];
  tone: ChipTone;
  video: { src: string; poster: string; width: number; height: number };
  /** A Spotify share URL. Null renders the placeholder. */
  spotify: string | null;
  /** What the clip shows — read by screen readers. */
  description: string;
}

const REELS: Reel[] = [
  {
    quote: "Amaze, amaze, amaze!",
    author: "Rocky, Project Hail Mary",
    stack: ["MediaPipe", "Three.js"],
    tone: "mint",
    video: {
      src: "/videos/for-fun/amaze.mp4",
      poster: "/images/for-fun/posters/amaze.jpg",
      width: 1152,
      height: 748,
    },
    spotify: "https://open.spotify.com/track/3B4cjvGlPvyBLNG3AzEgkZ",
    description:
      "A wireframe box I pinch and turn in mid-air, with panels lighting up inside it as my hands move.",
  },
  {
    quote: "To wander in the fields of flowers, pull the thorns from your heart",
    author: "Rumi",
    stack: ["MediaPipe", "Three.js"],
    tone: "lavender",
    video: {
      src: "/videos/for-fun/fields-of-flowers.mp4",
      poster: "/images/for-fun/posters/fields-of-flowers.jpg",
      width: 1152,
      height: 720,
    },
    spotify: "https://open.spotify.com/track/1wD57jwTmHdK8EjUyvzcYP",
    description:
      "Hand-tracked flowers bloom and scatter as my fingers move through the frame.",
  },
];

export default function ForFun() {
  return (
    <section className="py-section">
      <div className="container-site">
        <Reveal>
          <SectionLabel cloud>For fun</SectionLabel>
          <h1 className="mt-4 font-display text-h1 font-semibold text-ink">
            Things I do to cultivate <span className="text-accent-deep">taste</span>.
          </h1>
        </Reveal>

        <div className="mt-14 flex flex-col gap-16 md:gap-20">
          {REELS.map((reel, i) => (
            <Reveal key={reel.quote} delay={i * 0.08}>
              <article className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-start md:gap-10">
                <div>
                  <CaseVideo
                    src={reel.video.src}
                    poster={reel.video.poster}
                    width={reel.video.width}
                    height={reel.video.height}
                    title={reel.quote}
                    description={reel.description}
                    tone={reel.tone}
                    mode="autoplay"
                    flush
                  />
                </div>

                <div>
                  <SpotifyEmbed
                    url={reel.spotify}
                    title={`Music to play alongside “${reel.quote}”`}
                    compact
                  />
                  <h2 className="mt-6 font-display text-h3 font-semibold text-ink">
                    &ldquo;{reel.quote}&rdquo;
                  </h2>
                  <p className="mt-2 text-caption text-ink-muted">— {reel.author}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {reel.stack.map((tool) => (
                      <li key={tool}>
                        <TagChip tone={reel.tone}>{tool}</TagChip>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
