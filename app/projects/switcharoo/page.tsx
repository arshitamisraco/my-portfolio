import type { Metadata } from "next";
import CaseSection from "@/components/case-study/CaseSection";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import HeroStills from "@/components/case-study/HeroStills";
import LabeledTiles from "@/components/case-study/LabeledTiles";
import ResearchTimeline from "@/components/case-study/ResearchTimeline";
import StatCallout from "@/components/case-study/StatCallout";
import CaseVideo from "@/components/CaseVideo";
import ImageFrame from "@/components/ImageFrame";
import PullQuote from "@/components/PullQuote";

export const metadata: Metadata = {
  title: "One Switch, Infinite Possibilities",
  description:
    "A switch-accessible tablet game library for pre-K and kindergarten children with motor and cognitive disabilities. 2nd place out of 100+ teams at the RESNA Student Design Challenge.",
};

export default function Switcharoo() {
  return (
    <CaseStudyLayout
      slug="switcharoo"
      eyebrow="Accessibility · Case Study"
      title="One switch, infinite possibilities"
      summary="A switch-accessible tablet app with a library of games for pre-K and kindergarten children with motor and cognitive disabilities. Built to run on the iPad and switch a classroom already owns."
      highlight={{ stat: "2nd of 100+ teams · RESNA Student Design Challenge" }}
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
                alt: "The Switcharoo game library: six games in a shelf, each with a star to favorite it.",
                tone: "sky",
              },
              {
                src: "/images/switcharoo/favorites.png",
                width: 2388,
                height: 1668,
                alt: "The Favorites screen, showing three starred games.",
                tone: "peach",
              },
              {
                src: "/images/switcharoo/settings.png",
                width: 2388,
                height: 1668,
                alt: "Settings: high-contrast mode, sound, haptics, and switch pairing.",
                tone: "butter",
              },
              {
                src: "/images/switcharoo/selected-game-pop-the-balloon.png",
                width: 2388,
                height: 1668,
                alt: "The Pop the Balloon game card: press the switch to pop balloons.",
                tone: "mint",
              },
              {
                src: "/images/switcharoo/selected-game-sorting-game.png",
                width: 2388,
                height: 1668,
                alt: "The Sorting Game card: sort objects into the correct categories.",
                tone: "lavender",
              },
              {
                src: "/images/switcharoo/selected-game-crossy-roads.png",
                width: 2388,
                height: 1668,
                alt: "The Crossy Roads game card: press the switch to cross the road and avoid obstacles.",
                tone: "pink",
              },
            ],
          ]}
        />
      }
    >
      <CaseSection id="problem" eyebrow="The problem" title="Play, minus the on-ramp">
        <p>Users: pre-K to kindergarten children with motor and cognitive disabilities.</p>
        <p>
          They play with a single switch: one button standing in for every tap, drag, and
          swipe a tablet expects.
        </p>
        <StatCallout>
          9% fewer play opportunities for children with disabilities, and play is where
          motor and cognitive development happen.
        </StatCallout>
      </CaseSection>

      <CaseSection id="research" eyebrow="Research" title="Grounded in real classrooms">
        <ResearchTimeline
          steps={[
            {
              cloud: { shape: "puff", variant: "pink" },
              method: "Interviews",
              detail:
                "Educators and therapists on classroom routines, learning goals, and where play falls apart.",
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
              detail: "Watched children use tablets during playtime.",
              finding: "Children disengage immediately when a tool is cluttered or hard to press.",
            },
            {
              cloud: { shape: "wisp", variant: "lavender" },
              method: "Literature review",
              detail: "Studies on play, disability, and development.",
              finding: "Children with disabilities get 9% fewer play opportunities.",
            },
            {
              cloud: { shape: "puff", variant: "sky" },
              method: "Market analysis",
              detail:
                "Compared Papunet, OneSwitch, and Sensory App House on age range, price, and organization.",
              finding: "The existing apps are too expensive, too limited, or not iPad compatible.",
            },
          ]}
        />
      </CaseSection>

      <CaseSection id="approach" eyebrow="The approach" title="What we built">
        <p>
          The four methods pointed the same way: switch games exist, but they&rsquo;re
          scattered, costly, and each one teaches a single narrow skill.
        </p>
        <PullQuote>A library, not a game.</PullQuote>
        <StatCallout>
          If a child can&rsquo;t operate it with one switch, it doesn&rsquo;t belong on
          their screen.
        </StatCallout>

        <h3>Library</h3>
        <ImageFrame
          src="/images/switcharoo/library-single.png"
          width={2388}
          height={1668}
          alt="The Switcharoo game library: six games in a shelf, each with a star to favorite it."
          tone="sky"
        />

        <h3>Favorites</h3>
        <ImageFrame
          src="/images/switcharoo/favorites.png"
          width={2388}
          height={1668}
          alt="The Favorites screen, showing three starred games."
          tone="peach"
        />

        <h3>Settings</h3>
        <p>
          Settings sit behind Guided Access: the adult configures, the child plays.
        </p>
        <ImageFrame
          src="/images/switcharoo/settings.png"
          width={2388}
          height={1668}
          alt="Settings: high-contrast mode, sound, haptics, and switch pairing."
          tone="butter"
        />

        <h3>Game models</h3>
        <div className="my-8 grid gap-4 sm:grid-cols-3">
          <ImageFrame
            src="/images/switcharoo/selected-game-pop-the-balloon.png"
            width={2388}
            height={1668}
            alt="The Pop the Balloon game card: press the switch to pop balloons."
            flush
            tone="mint"
          />
          <ImageFrame
            src="/images/switcharoo/selected-game-sorting-game.png"
            width={2388}
            height={1668}
            alt="The Sorting Game card: sort objects into the correct categories."
            flush
            tone="lavender"
          />
          <ImageFrame
            src="/images/switcharoo/selected-game-stacking-blocks.png"
            width={2388}
            height={1668}
            alt="The Stacking Blocks game card: time your press to stack blocks as tall as possible."
            flush
            tone="butter"
          />
          <ImageFrame
            src="/images/switcharoo/selected-game-crossy-roads.png"
            width={2388}
            height={1668}
            alt="The Crossy Roads game card: press the switch to cross the road and avoid obstacles."
            flush
            tone="sky"
          />
          <ImageFrame
            src="/images/switcharoo/selected-game-treasure-hunt.png"
            width={2388}
            height={1668}
            alt="The Treasure Hunt game card: uncover hidden treasures on the map."
            flush
            tone="peach"
          />
          <ImageFrame
            src="/images/switcharoo/selected-game-music-play.png"
            width={2388}
            height={1668}
            alt="The Music Play game card: trigger sounds and experiment with combinations."
            flush
            tone="pink"
          />
        </div>
      </CaseSection>

      <CaseSection id="games" eyebrow="The games" title="Six games, one press">
        <div className="case-table overflow-x-auto">
          <table className="w-full text-left text-body">
            <thead>
              <tr className="text-style-eyebrow text-ink">
                <th className="py-2 pr-4 font-medium">Game</th>
                <th className="py-2 font-medium">Theme</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Pop the Balloon!", "Cause & effect"],
                ["Sorting Game", "Classification"],
                ["Stacking Blocks", "Timing"],
                ["Crossy Roads", "Timing & motor planning"],
                ["Treasure Hunt", "Exploration"],
                ["Music Play", "Creativity"],
              ].map(([game, theme]) => (
                <tr key={game} className="border-b border-line last:border-0">
                  <td className="py-2 pr-4 font-medium text-ink">{game}</td>
                  <td className="py-2 text-ink-muted">{theme}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Every game runs on one press. The complexity is in what the press does, never in
          what the child has to do.
        </p>
        <div className="my-8 grid gap-4 sm:grid-cols-3">
          <CaseVideo
            src="/videos/switcharoo/pop-the-balloon.mp4"
            poster="/images/switcharoo/posters/pop-the-balloon.jpg"
            width={500}
            height={714}
            title="Pop the Balloon, played"
            description="A single-switch press pops balloons drifting up the screen, one at a time."
            tone="mint"
            flush
          />
          <CaseVideo
            src="/videos/switcharoo/stacking-blocks.mp4"
            poster="/images/switcharoo/posters/stacking-blocks.jpg"
            width={504}
            height={696}
            title="Stacking Blocks, played"
            description="Timing a switch press to stack blocks as tall as possible."
            tone="lavender"
            flush
          />
          <CaseVideo
            src="/videos/switcharoo/crossy-roads.mp4"
            poster="/images/switcharoo/posters/crossy-roads.jpg"
            width={956}
            height={714}
            title="Crossy Roads, played"
            description="Pressing the switch to time a crossing between lanes of moving cars."
            tone="butter"
            flush
          />
        </div>
      </CaseSection>

      <CaseSection id="build" eyebrow="Build" title="Runs on what the classroom already has">
        <p>
          React Native (Expo). Wired, Bluetooth, and touchscreen switches. Runs on hardware
          the classroom already owns, which is the point: no purchase required.
        </p>
      </CaseSection>

      <CaseSection id="testing" eyebrow="Expert testing" title="Two reviews, two blind spots covered">
        <LabeledTiles
          columns={2}
          tiles={[
            {
              label: "Mobility tech researcher",
              detail:
                "Market context: high contrast, accessible text, an appealing and accessible UI, press duration as a real setting rather than a buried one.",
            },
            {
              label: "Occupational therapist",
              detail:
                "The children: keep games simple, make sound and corrective feedback immediate, hide settings behind Guided Access so a child can't wander out mid-play.",
            },
          ]}
        />
      </CaseSection>

      <CaseSection id="result" eyebrow="Result" title="Where it landed">
        <StatCallout size="lg">
          2nd place, 100+ teams at the RESNA Student Design Challenge, judged by the
          rehabilitation engineering and assistive technology community.
        </StatCallout>
        <p>
          Next: high-contrast mode, more games, multiplayer, difficulty levels, sorting the
          library by switch type, richer sound and haptics.
        </p>
      </CaseSection>
    </CaseStudyLayout>
  );
}
