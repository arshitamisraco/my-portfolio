import type { Metadata } from "next";
import CaseSection from "@/components/case-study/CaseSection";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import ImageFrame from "@/components/ImageFrame";
import { notFound } from "next/navigation";
import { getCaseStudy, isHidden } from "@/lib/projects";

export const metadata: Metadata = {
  ...(isHidden(getCaseStudy("foryou-playmat")) ? { robots: { index: false } } : {}),
  title: "Designing play that doesn't stop when it rains",
  description:
    "An Arduino-powered sensory play mat of hand-sewn textures for preschoolers with neurodivergence and motor and cognitive disabilities, built with the EEU in Seattle.",
};

export default function ForYouPlaymat() {
  if (isHidden(getCaseStudy("foryou-playmat"))) notFound();
  return (
    <CaseStudyLayout
      slug="foryou-playmat"
      eyebrow="Inclusive Design · Case Study"
      title="Designing play that doesn't stop when it rains"
      summary="Seattle rain cut outdoor playtime short. I researched, designed, and sewed an interactive floor-is-lava mat for preschoolers with sensory differences."
      stats={[
        { value: "~50%", label: "more playtime" },
        { value: "150", label: "children" },
        { value: "10+", label: "classrooms" },
      ]}
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
            alt="The four-person project team beside their research poster at the HuskyADAPT showcase."
            caption="The team at the HuskyADAPT showcase."
          />
        </div>
      }
    >
      <CaseSection id="overview" eyebrow="Overview" title="Rain cut play short">
        <ImageFrame
          src="/images/foryou-playmat/poster.jpg"
          width={2600}
          height={1950}
          alt="The full project research poster: background, observations, methods, prototyping, and user testing."
          caption="The full research poster (HuskyADAPT, Spring 2023)."
        />
        <p>
          Rain cancelled outdoor play routinely, and indoor play had no answer for sensory
          difference. Neurodivergent students disengaged while their peers kept playing.
        </p>
      </CaseSection>

      <CaseSection id="research" eyebrow="Research" title="Interviews, surveys, and observation">
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <ImageFrame
            src="/images/foryou-playmat/classroom.jpg"
            width={2000}
            height={1500}
            alt="An EEU classroom with child-height tables packed close together and a grey, rainy yard outside."
            caption="Indoors on a rain day: little floor space."
            flush
          />
          <ImageFrame
            src="/images/foryou-playmat/playground.jpg"
            width={2000}
            height={1349}
            alt="The EEU's covered outdoor play area with turf mounds and a winding blue path."
            caption="The covered area works in light rain only."
            flush
          />
        </div>
        <p>
          I interviewed teachers and occupational therapists, ran teacher surveys, and observed
          indoor and outdoor free play.
        </p>
      </CaseSection>

      <CaseSection id="constraints" eyebrow="Decision factors" title="Four choices for ages 3 to 4">
        <ul>
          <li>No screens, instructions, or reading.</li>
          <li>Many textures that kids select themselves.</li>
          <li>Floor-level, whole-body play with no fine motor requirement.</li>
          <li>Wipeable, rolls up, and several kids can play at once.</li>
        </ul>
      </CaseSection>

      <CaseSection id="design" eyebrow="Design decisions" title="The floor is lava">
        <ImageFrame
          src="/images/foryou-playmat/concept-sketch.jpg"
          width={1600}
          height={1236}
          alt="Concept sketch: a red dotted 'lava' mat with LED strips and detachable sensory 'rock' blocks."
          caption="LED lava, detachable sensory rocks the kids arrange."
        />
        <ImageFrame
          src="/images/foryou-playmat/material-tests.jpg"
          width={2000}
          height={1500}
          alt="Three team members at a workbench testing gel sheets, fabrics, and cardboard."
          caption="Testing what reads as lava and what reads as safe."
        />
        <ImageFrame
          src="/images/foryou-playmat/layers-whiteboard.jpg"
          width={1350}
          height={1800}
          alt="A team member sketching the mat's cross-section on a whiteboard."
          caption="Working out the layer stack."
          size="sm"
        />
        <p>
          The mat lights up as lava, and kids place the sensory rocks wherever they like. The
          layers are wipeable polyethylene, lights, and a cushioned base.
        </p>
      </CaseSection>

      <CaseSection id="woz" eyebrow="Wizard of Oz test" title="We faked all of it first">
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <ImageFrame
            src="/images/foryou-playmat/woz-textures.jpg"
            width={1350}
            height={1800}
            alt="Four cardboard block stand-ins, each wrapped in a different texture."
            caption="Cardboard rocks wrapped in real textures."
            flush
          />
          <ImageFrame
            src="/images/foryou-playmat/woz-mat.jpg"
            width={1350}
            height={1800}
            alt="A clear sheet over green string lights, with three sewn texture cushions on top."
            caption="Lights under a poly sheet, switched by hand."
            flush
          />
        </div>
        <p>
          A team member triggered the lights by hand while the kids played. They invented
          floor-is-lava on the spot, before we wrote any Arduino code.
        </p>
      </CaseSection>

      <CaseSection id="build" eyebrow="Prototype" title="Arduino, and a lot of sewing">
        <div className="my-8 grid gap-4 sm:grid-cols-3">
          <ImageFrame
            src="/images/foryou-playmat/build-sewing.jpg"
            width={1350}
            height={1800}
            alt="Hands guiding fabric through a sewing machine in a makerspace."
            caption="Learning to sew, then sewing every cushion."
            flush
          />
          <ImageFrame
            src="/images/foryou-playmat/build-layout.jpg"
            width={1350}
            height={1800}
            alt="Two team members laying out the white mat fabric over plastic sheeting."
            caption="Cutting and laying up the full mat."
            flush
          />
          <ImageFrame
            src="/images/foryou-playmat/final-mat.jpg"
            width={1350}
            height={1800}
            alt="The finished mat: a clear wipeable top over a lit LED grid with texture cushions."
            caption="The finished mat."
            flush
          />
        </div>
        <p>
          Arduino-driven lights respond to pressure and motion. I learned to sew and sewed every
          cushion, and the mat packs down to the size of a classroom cupboard.
        </p>
      </CaseSection>

      <CaseSection id="impact" eyebrow="Impact" title="Still in use today">
        <p>
          The mat reached 150 children across 10+ classrooms. The ~50% playtime increase
          recovered time lost to rain.
        </p>
      </CaseSection>

      <CaseSection id="learned" eyebrow="Takeaways" title="Three things to carry forward">
        <ul>
          <li>Fake the system before you build it.</li>
          <li>Observe when your users are three.</li>
          <li>Fabrication is design work.</li>
        </ul>
      </CaseSection>
    </CaseStudyLayout>
  );
}
