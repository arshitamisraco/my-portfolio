import type { Metadata } from "next";
import CaseSection from "@/components/case-study/CaseSection";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import LabeledTiles from "@/components/case-study/LabeledTiles";
import StatCallout from "@/components/case-study/StatCallout";
import ImageFrame from "@/components/ImageFrame";
import PullQuote from "@/components/PullQuote";

export const metadata: Metadata = {
  title: "Designing play that doesn't stop when it rains",
  description:
    "An Arduino-powered sensory play mat of hand-sewn textures for preschoolers with neurodivergence and motor and cognitive disabilities, built with the EEU in Seattle.",
};

export default function ForYouPlaymat() {
  return (
    <CaseStudyLayout
      slug="foryou-playmat"
      eyebrow="Inclusive Design · Case Study"
      title="Designing play that doesn't stop when it rains"
      summary="Seattle rain cut outdoor playtime short, and the indoor alternative left kids with sensory differences playing far less actively than their peers. I interviewed teachers and occupational therapists, observed play indoors and out, and prototyped an interactive 'floor is lava' mat: a light-up surface with hand-sewn sensory blocks the kids place themselves."
      highlight={{ stat: "~50% more playtime · 10+ classrooms · 150 children · still in use today" }}
      meta={[
        { label: "Role", value: "Research · Concept · Prototyping · Fabrication" },
        { label: "Team", value: "With Sabrina Lin, Mishti Dhawan, Nupur Gorkar · HuskyADAPT" },
        { label: "Partner", value: "Experimental Education Unit (EEU), Seattle" },
        { label: "Timeline", value: "Spring 2023" },
      ]}
      hero={
        <div className="mb-14">
          <ImageFrame
            src="/images/foryou-playmat/hero-team.jpg"
            width={2200}
            height={1650}
            alt="The four-person project team standing beside their research poster at the HuskyADAPT showcase."
            caption="The team at the HuskyADAPT showcase — Sabrina Lin, Arshita Misra, Mishti Dhawan, Nupur Gorkar."
            tone="butter"
          />
        </div>
      }
    >
      <CaseSection id="overview" eyebrow="Overview" title="Weather owned the schedule">
        <p>Rain cancelled outdoor play routinely, and the indoor alternative wasn&rsquo;t equivalent.</p>
        <p>
          Indoor play wasn&rsquo;t built for sensory difference. Neurodivergent students disengaged
          where non-disabled students kept playing.
        </p>
        <p>Play is how motor, sensory, and social development happens at this age.</p>
        <ImageFrame
          src="/images/foryou-playmat/poster.jpg"
          width={2600}
          height={1950}
          alt="The full project research poster: background, observations, methods, prototyping photos, and user-testing notes."
          caption="The full research poster (HuskyADAPT, Spring 2023)."
          tone="butter"
        />
        <PullQuote>
          How do we give these kids active, physical, social play indoors — on rainy days, on
          their terms?
        </PullQuote>
      </CaseSection>

      <CaseSection id="research" eyebrow="Research" title="I watched before I asked">
        <p>
          I interviewed classroom teachers and occupational therapists who work with these
          children daily, and ran teacher surveys.
        </p>
        <p>
          I observed indoor and outdoor free play, watching how kids engaged with the space and
          each other.
        </p>
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <ImageFrame
            src="/images/foryou-playmat/classroom.jpg"
            width={2000}
            height={1500}
            alt="An EEU classroom: child-height wooden tables and chairs packed close together, tall windows onto a grey, rain-bare yard."
            caption="Indoors on a rain day — limited floor space, little of it for whole-body play."
            flush
            tone="sky"
          />
          <ImageFrame
            src="/images/foryou-playmat/playground.jpg"
            width={2000}
            height={1349}
            alt="The EEU's covered outdoor play area: turf mounds and a winding blue path under a roof overhang."
            caption="The covered outdoor area works in light rain, not a downpour."
            flush
            tone="mint"
          />
        </div>
      </CaseSection>

      <CaseSection id="constraints" eyebrow="Decision factors" title="Constraints → choices">
        <div className="case-table overflow-x-auto">
          <table className="w-full text-left text-body">
            <thead>
              <tr className="text-style-eyebrow text-ink">
                <th className="py-2 pr-4 font-medium">Constraint</th>
                <th className="py-2 font-medium">Choice</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Ages 3–4", "No screens, no instructions, no reading"],
                [
                  "Wide range of sensory needs",
                  "Many textures, self-selected — never one prescribed input",
                ],
                [
                  "Motor and cognitive disabilities",
                  "Floor-level, whole-body, no fine motor requirement",
                ],
                [
                  "Indoor classroom, limited space",
                  "Rolls up for storage, wipeable, durable",
                ],
                ["Play is social", "Multiple kids on the mat at once, building the space together"],
              ].map(([constraint, choice]) => (
                <tr key={constraint} className="border-b border-line last:border-0">
                  <td className="py-2 pr-4 font-medium text-ink">{constraint}</td>
                  <td className="py-2 text-ink-muted">{choice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CaseSection>

      <CaseSection id="design" eyebrow="Design decisions" title="The floor is lava">
        <h3>A game, not an instruction</h3>
        <p>
          The mat lights up as &ldquo;lava.&rdquo; Sensory blocks are the &ldquo;rocks&rdquo; —
          detachable, and the kids choose where to place them.
        </p>
        <ImageFrame
          src="/images/foryou-playmat/concept-sketch.jpg"
          width={1600}
          height={1236}
          alt="Concept sketch: a red dotted mat labelled 'lava' (LED strips, colour-changing), with detachable 'rock' blocks made of sensory material like fur that students position themselves."
          caption="The concept: LED 'lava', detachable sensory 'rocks' the kids arrange."
          tone="peach"
        />

        <h3>Textures the kids choose</h3>
        <p>Sensory variety is the feature. Kids find their own input instead of being handed one.</p>
        <ImageFrame
          src="/images/foryou-playmat/material-tests.jpg"
          width={2000}
          height={1500}
          alt="Three team members at a workbench testing coloured gel sheets, fabrics, and cardboard."
          caption="Testing what reads as lava and what reads as a safe zone."
          tone="mint"
        />

        <h3>A layered mat</h3>
        <p>
          Wipeable polyethylene on top, lights in the middle, cushioned base. Teachers flagged
          spills early, so the surface had to clean up fast.
        </p>
        <ImageFrame
          src="/images/foryou-playmat/layers-whiteboard.jpg"
          width={1350}
          height={1800}
          alt="A team member at a whiteboard sketching the mat's cross-section: vinyl, felt, lights, vinyl, carpet."
          caption="Working out the layer stack."
          size="sm"
          tone="sky"
        />

        <h3>Light as feedback</h3>
        <p>Immediate, non-verbal, legible to a three-year-old.</p>
      </CaseSection>

      <CaseSection id="woz" eyebrow="Wizard of Oz test" title="We faked all of it first">
        <p>
          Cardboard stand-ins for the sensory blocks, each with a real texture. A mat with
          lights, no sensors. A team member off to the side, triggering the lights by hand.
        </p>
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <ImageFrame
            src="/images/foryou-playmat/woz-textures.jpg"
            width={1350}
            height={1800}
            alt="Four cardboard block stand-ins on a table, each wrapped in a different texture: rounded pins, foam hearts, wound yarn, plastic strips."
            caption="Cardboard 'rocks' wrapped in real textures."
            flush
            tone="peach"
          />
          <ImageFrame
            src="/images/foryou-playmat/woz-mat.jpg"
            width={1350}
            height={1800}
            alt="A clear polyethylene sheet laid over a grid of green string lights, with three sewn texture cushions placed on top."
            caption="Lights under a poly sheet, sewn cushions on top, switched by hand."
            flush
            tone="butter"
          />
        </div>
        <PullQuote>
          The kids invented floor-is-lava on the spot — and fully believed the mat was reacting
          to them.
        </PullQuote>
        <p>
          The response loop was the thing. Kids didn&rsquo;t need to be taught; they made up their
          own rules and played together. We had that signal before writing a line of Arduino code.
        </p>
      </CaseSection>

      <CaseSection id="build" eyebrow="Prototype" title="Arduino, and a lot of sewing">
        <p>Arduino-driven lights, with the interaction planned around pressure and motion on the mat.</p>
        <p>Hand-sewn sensory cushions. I learned to sew for this project and sewed every one.</p>
        <p>Modular construction: cushions and mat sections that pack down to the size of a classroom cupboard.</p>
        <div className="my-8 grid gap-4 sm:grid-cols-3">
          <ImageFrame
            src="/images/foryou-playmat/build-sewing.jpg"
            width={1350}
            height={1800}
            alt="Hands guiding fabric through a Brother sewing machine in a makerspace."
            caption="Learning to sew, then sewing every cushion."
            flush
            tone="sky"
          />
          <ImageFrame
            src="/images/foryou-playmat/build-layout.jpg"
            width={1350}
            height={1800}
            alt="Two team members laying out the full white mat fabric over plastic sheeting on a makerspace floor."
            caption="Cutting and laying up the full mat."
            flush
            tone="peach"
          />
          <ImageFrame
            src="/images/foryou-playmat/final-mat.jpg"
            width={1350}
            height={1800}
            alt="The finished mat: a clear wipeable top over a lit green LED grid, with rainbow-fur, sherpa, and blue-velvet texture cushions on top."
            caption="The finished mat — wipeable top, LED grid, texture cushions."
            flush
            tone="butter"
          />
        </div>
      </CaseSection>

      <CaseSection id="impact" eyebrow="Impact" title="Where it landed">
        <StatCallout size="lg">
          ~50% increase in playtime, recovering time lost to rain.
        </StatCallout>
        <LabeledTiles
          columns={3}
          tiles={[
            { label: "10+ classrooms", detail: "using the mat" },
            {
              label: "150 children",
              detail: "with neurodivergence and motor and cognitive disabilities",
            },
            { label: "Still in use today", detail: "years after the pilot" },
          ]}
        />
      </CaseSection>

      <CaseSection id="learned" eyebrow="What I learned" title="Three things I'd carry forward">
        <LabeledTiles
          columns={3}
          tiles={[
            {
              label: "Fake the system before you build it",
              detail:
                "One person switching lights by hand told us more than a working prototype would have.",
            },
            {
              label: "Watch, don't ask — when your users are three",
              detail: "The interviews framed the problem; the observations defined it.",
            },
            {
              label: "Fabrication is design work",
              detail: "The sensory range came out of the sewing, not the spec.",
            },
          ]}
        />
      </CaseSection>
    </CaseStudyLayout>
  );
}
