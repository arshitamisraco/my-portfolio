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
  /** Stable key — the quote can change or be missing. */
  id: string;
  /** The quote is the piece's title — these aren't client projects. Omit it and only the music shows. */
  quote?: { text: string; author: string };
  /** Accessible name for the clip when there's no quote to borrow. */
  title: string;
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
    id: "open-up-the-door",
    title: "Open up the door",
    stack: ["MediaPipe", "Three.js"],
    tone: "pink",
    video: {
      src: "/videos/for-fun/open-up-the-door.mp4",
      poster: "/images/for-fun/posters/open-up-the-door.jpg",
      width: 1152,
      height: 748,
    },
    spotify: "https://open.spotify.com/track/7BRD7x5pt8Lqa1eGYC4dzj",
    description:
      "I frame the camera with my fingers and a pink halftone window stretches and tilts between my hands.",
  },
  {
    id: "amaze",
    quote: { text: "Amaze, amaze, amaze!", author: "Rocky, Project Hail Mary" },
    title: "Amaze, amaze, amaze!",
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
    id: "fields-of-flowers",
    quote: {
      text: "To wander in the fields of flowers, pull the thorns from your heart",
      author: "Rumi",
    },
    title: "To wander in the fields of flowers, pull the thorns from your heart",
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
            <Reveal key={reel.id} delay={i * 0.08}>
              <article className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-start md:gap-10">
                <div>
                  <CaseVideo
                    src={reel.video.src}
                    poster={reel.video.poster}
                    width={reel.video.width}
                    height={reel.video.height}
                    title={reel.title}
                    description={reel.description}
                    tone={reel.tone}
                    mode="autoplay"
                    flush
                  />
                </div>

                <div>
                  <SpotifyEmbed
                    url={reel.spotify}
                    title={`Music to play alongside “${reel.title}”`}
                    compact
                  />
                  {reel.quote && (
                    <>
                      <h2 className="mt-6 font-display text-h3 font-semibold text-ink">
                        &ldquo;{reel.quote.text}&rdquo;
                      </h2>
                      <p className="mt-2 text-caption text-ink-muted">— {reel.quote.author}</p>
                    </>
                  )}
                  <ul className={reel.quote ? "mt-5 flex flex-wrap gap-2" : "mt-6 flex flex-wrap gap-2"}>
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
