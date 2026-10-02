import type { Metadata } from "next";
import CaseSection from "@/components/case-study/CaseSection";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import HeroStills from "@/components/case-study/HeroStills";
import LabeledTiles from "@/components/case-study/LabeledTiles";
import ResearchTimeline from "@/components/case-study/ResearchTimeline";
import StatCallout from "@/components/case-study/StatCallout";
import CaseVideo from "@/components/CaseVideo";
import ImageFrame from "@/components/ImageFrame";

export const metadata: Metadata = {
  title: "One Switch, Infinite Possibilities",
  description:
    "A switch-accessible game library for children with disabilities.",
};

export default function Switcharoo() {
  return (
    <CaseStudyLayout
      slug="switcharoo"
      eyebrow="Accessibility · Case Study"
      title="One switch, infinite possibilities"
      summary="A switch-accessible game library for pre-K children with disabilities, built for hardware classrooms already own."
      stats={[
        { value: "2nd", label: "of 100+ teams, RESNA" },
        { value: "40", label: "weeks, Sept 2024 to June 2025" },
        { value: "6", label: "games on one switch" },
      ]}
      meta={[
        { label: "Role", value: "UX research and design lead" },
        { label: "Team", value: "Student team" },
        { label: "Timeline", value: "40 weeks · Sept 2024 – June 2025" },
        { label: "Tools", value: "Figma · FigJam · React Native (Expo)" },
      ]}
      hero={
        <HeroStills
          ariaLabel="A first look at Switcharoo"
          fullBleed
          rows={[
            [
              {
                src: "/images/switcharoo/library-single.png",
                width: 2388,
                height: 1668,
                alt: "The game library.",
              },
              {
                src: "/images/switcharoo/favorites.png",
                width: 2388,
                height: 1668,
                alt: "The Favorites screen.",
              },
              {
                src: "/images/switcharoo/settings.png",
                width: 2388,
                height: 1668,
                alt: "The Settings screen.",
              },
              {
                src: "/images/switcharoo/selected-game-pop-the-balloon.png",
                width: 2388,
                height: 1668,
                alt: "The Pop the Balloon game card.",
              },
              {
                src: "/images/switcharoo/selected-game-sorting-game.png",
                width: 2388,
                height: 1668,
                alt: "The Sorting Game card.",
              },
              {
                src: "/images/switcharoo/selected-game-crossy-roads.png",
                width: 2388,
                height: 1668,
                alt: "The Crossy Roads game card.",
              },
            ],
          ]}
        />
      }
    >
      <CaseSection id="problem" eyebrow="The problem" title="One switch stands in for every tap">
        <p>
          Children with motor and cognitive disabilities play with one switch. They get 9% fewer
          play opportunities.
        </p>
      </CaseSection>

      <CaseSection id="research" eyebrow="Research" title="Four methods, one direction">
        <ResearchTimeline
          steps={[
            {
              cloud: { shape: "puff", variant: "sky" },
              method: "Interviews",
              detail: "Educators and therapists.",
              finding: (
                <>
                  &ldquo;It would be incredible to have a variety of games, because no two
                  kids learn the same way.&rdquo;
                  <span className="mt-1 block text-caption font-normal text-ink-muted">
                    — Pre-K educator
                  </span>
                </>
              ),
            },
            {
              cloud: { shape: "cumulus", variant: "sky" },
              method: "Field observations",
              detail: "Children using tablets at playtime.",
              finding: "Children disengage when a tool is cluttered.",
            },
            {
              cloud: { shape: "wisp", variant: "sky" },
              method: "Literature review",
              detail: "Play, disability, and development.",
              finding: "Play drives motor and cognitive development.",
            },
            {
              cloud: { shape: "puff", variant: "sky" },
              method: "Market analysis",
              detail: "Papunet, OneSwitch, and Sensory App House.",
              finding: "Existing apps are costly, limited, or not iPad compatible.",
            },
          ]}
        />
      </CaseSection>

      <CaseSection id="approach" eyebrow="The approach" title="One library of switch games">
        <ImageFrame
          src="/images/switcharoo/library-single.png"
          width={2388}
          height={1668}
          alt="The game library: six games, each with a favorite star."
          caption="The library."
        />
        <ImageFrame
          src="/images/switcharoo/favorites.png"
          width={2388}
          height={1668}
          alt="The Favorites screen with three starred games."
          caption="Favorites."
        />
        <ImageFrame
          src="/images/switcharoo/settings.png"
          width={2388}
          height={1668}
          alt="Settings: high contrast, sound, haptics, switch pairing."
          caption="Settings sit behind Guided Access."
        />
        <div className="my-8 grid gap-4 sm:grid-cols-3">
          <ImageFrame
            src="/images/switcharoo/selected-game-pop-the-balloon.png"
            width={2388}
            height={1668}
            alt="The Pop the Balloon game card."
            flush
          />
          <ImageFrame
            src="/images/switcharoo/selected-game-sorting-game.png"
            width={2388}
            height={1668}
            alt="The Sorting Game card."
            flush
          />
          <ImageFrame
            src="/images/switcharoo/selected-game-stacking-blocks.png"
            width={2388}
            height={1668}
            alt="The Stacking Blocks game card."
            flush
          />
          <ImageFrame
            src="/images/switcharoo/selected-game-crossy-roads.png"
            width={2388}
            height={1668}
            alt="The Crossy Roads game card."
            flush
          />
          <ImageFrame
            src="/images/switcharoo/selected-game-treasure-hunt.png"
            width={2388}
            height={1668}
            alt="The Treasure Hunt game card."
            flush
          />
          <ImageFrame
            src="/images/switcharoo/selected-game-music-play.png"
            width={2388}
            height={1668}
            alt="The Music Play game card."
            flush
          />
        </div>
        <p>Existing switch games are scattered and each teaches one skill.</p>
      </CaseSection>

      <CaseSection id="games" eyebrow="The games" title="Six games, one press">
        <div className="my-8 grid gap-4 sm:grid-cols-3">
          <CaseVideo
            src="/videos/switcharoo/pop-the-balloon.mp4"
            poster="/images/switcharoo/posters/pop-the-balloon.jpg"
            width={500}
            height={714}
            title="Pop the Balloon, played"
            description="One switch press pops each balloon drifting up the screen."
            flush
          />
          <CaseVideo
            src="/videos/switcharoo/stacking-blocks.mp4"
            poster="/images/switcharoo/posters/stacking-blocks.jpg"
            width={504}
            height={696}
            title="Stacking Blocks, played"
            description="Timing a switch press to stack blocks."
            flush
          />
          <CaseVideo
            src="/videos/switcharoo/crossy-roads.mp4"
            poster="/images/switcharoo/posters/crossy-roads.jpg"
            width={956}
            height={714}
            title="Crossy Roads, played"
            description="Timing a switch press to cross lanes of moving cars."
            flush
          />
        </div>
      </CaseSection>

      <CaseSection id="testing" eyebrow="Expert testing" title="Two expert reviews shaped it">
        <LabeledTiles
          tiles={[
            {
              label: "Mobility tech researcher",
              detail: "High contrast, accessible text, press duration as a setting.",
            },
            {
              label: "Occupational therapist",
              detail: "Simple games, immediate feedback, locked settings.",
            },
          ]}
        />
      </CaseSection>

      <CaseSection id="result" eyebrow="Result" title="Second place at RESNA">
        <StatCallout value="2nd" label="of 100+ teams, RESNA" size="lg" />
        <p>Next: multiplayer, difficulty levels, richer sound and haptics.</p>
      </CaseSection>
    </CaseStudyLayout>
  );
}
