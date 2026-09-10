"use client";

/**
 * The deck content.
 *
 * Authored on the fixed 1600×900 canvas defined in deck-ui, so sizes here are
 * absolute pixels. Each slide carries its own planned duration, which is what
 * the running clock is derived from. There is no second copy of the timings.
 * Speaker notes live beside the slide they belong to for the same reason.
 *
 * Voice: a plain heading, and at most one line under it. Everything else is
 * spoken: it lives in the notes, not on the wall.
 */

import {
  Centered,
  Chip,
  Item,
  Kicker,
  Lede,
  Points,
  Punch,
  Quote,
  Shot,
  SlideVideo,
  Split,
  Stack,
  Stacked,
  Stat,
  Title,
  toneBg,
  type Tone,
} from "./deck-ui";

/* ------------------------------------------------------------------ *
 * Sections
 * ------------------------------------------------------------------ */

export type SectionKey = "recap" | "brand" | "redesign" | "myworld" | "close";

export const SECTIONS: Record<SectionKey, { label: string; tone: Tone }> = {
  recap: { label: "Start", tone: "pink" },
  brand: { label: "The brand", tone: "peach" },
  redesign: { label: "The redesign", tone: "sky" },
  myworld: { label: "Memory", tone: "lavender" },
  close: { label: "Close", tone: "mint" },
};

export interface Slide {
  id: string;
  section: SectionKey;
  /** Short label for the overview grid and the presenter view. */
  label: string;
  /** Planned length in seconds. The running clock sums these. */
  seconds: number;
  /** Never cut this slide, even when running behind. */
  keep?: boolean;
  /** First to go when running behind. */
  cut?: boolean;
  notes: React.ReactNode;
  render: () => React.ReactNode;
}

/* ------------------------------------------------------------------ *
 * Slide-local pieces
 * ------------------------------------------------------------------ */

/** An 11-stop ramp built from a brand anchor, the way the COROS scales were. */
function Ramp({ name, anchor, hex }: { name: string; anchor: number; hex: string }) {
  const stops = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  return (
    <div>
      <div className="flex overflow-hidden rounded-[10px] border border-line">
        {stops.map((stop) => {
          // Stops lighter than the anchor mix toward white, darker toward black.
          const distance = (stop - anchor) / (stop < anchor ? anchor - 50 : 950 - anchor);
          // Asymmetric: tints can run close to white, but shades stopping at
          // pure black read as a rendering bug rather than a scale step.
          const mix = Math.round(Math.abs(distance) * (stop < anchor ? 88 : 66));
          const background =
            stop === anchor
              ? hex
              : `color-mix(in oklab, ${hex} ${100 - mix}%, ${stop < anchor ? "white" : "black"})`;
          return (
            <div
              key={stop}
              className="h-14 flex-1"
              style={{ background }}
              title={`${name} ${stop}`}
            />
          );
        })}
      </div>
      <p className="mt-3 flex items-baseline justify-between text-[19px] text-ink-muted">
        <span className="font-medium text-ink">{name}</span>
        <span className="font-mono tabular-nums">{hex}</span>
      </p>
    </div>
  );
}

/** Where I've been, three stops, on the cover. */
const JOURNEY: [string, string, string][] = [
  ["2024", "Nitecapp", "UX intern"],
  ["2025", "HuskyADAPT", "Switcharoo, 2nd of 100+ at RESNA"],
  ["2025 – 2026", "COROS AI", "First designer"],
];

/** What the next twenty minutes are, on the cover. */
const AGENDA: [string, string, Tone][] = [
  ["The brand", "Where the two colours came from", "peach"],
  ["The redesign", "Rebuilding the whole product", "sky"],
  ["Memory", "Helping people keep what they worked out", "lavender"],
];

/* ------------------------------------------------------------------ *
 * The deck
 * ------------------------------------------------------------------ */

export const SLIDES: Slide[] = [
  /* ---------------- Start ---------------- */
  {
    id: "cover",
    section: "recap",
    label: "Cover",
    seconds: 60,
    notes: (
      <>
        <p>
          <b>No introduction. You met last week.</b> Read the three stops fast, one clause
          each, and do not explain any of them.
        </p>
        <p>
          The heading is the whole pitch: <b>you design it and then you build it.</b> Say it
          once, plainly, and let the rest of the deck prove it.
        </p>
        <p>
          Then the three cards, in the order they happened. The brand is quick. The redesign
          is most of it. Memory is the newest, and it was still going out in pieces when I
          left in August.
        </p>
      </>
    ),
    render: () => (
      <Centered>
        <Stack className="flex flex-col items-center gap-10">
          <Item>
            <Kicker>Arshita Misra</Kicker>
          </Item>
          <Item>
            <Title className="text-[86px]">Product designer who engineers</Title>
          </Item>
          <Item className="w-full">
            <div className="mx-auto grid max-w-[1220px] grid-cols-3 divide-x divide-line border-y border-line">
              {JOURNEY.map(([when, where, what]) => (
                <div key={where} className="px-8 py-5 text-left">
                  <p className="text-[16px] font-semibold uppercase tracking-[0.12em] tabular-nums text-accent-deep">
                    {when}
                  </p>
                  <p className="mt-2 font-display text-[27px] font-semibold leading-tight text-ink">
                    {where}
                  </p>
                  <p className="mt-1 text-[18px] leading-snug text-pretty text-ink-muted">
                    {what}
                  </p>
                </div>
              ))}
            </div>
          </Item>
          <Item className="w-full">
            <div className="grid grid-cols-3 gap-6 text-left">
              {AGENDA.map(([name, what, tone], i) => (
                <div
                  key={name}
                  className={`flex min-h-[190px] flex-col rounded-[18px] border border-line p-8 ${toneBg(tone)}`}
                >
                  <p className="text-[16px] font-semibold tabular-nums text-ink-muted">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 font-display text-[36px] font-semibold leading-tight text-ink">
                    {name}
                  </p>
                  <p className="mt-3 text-[20px] leading-snug text-pretty text-ink-muted">
                    {what}
                  </p>
                </div>
              ))}
            </div>
          </Item>
        </Stack>
      </Centered>
    ),
  },

  /* ---------------- The brand ---------------- */
  {
    id: "brand-brief",
    section: "brand",
    label: "The direction I was given",
    seconds: 60,
    notes: (
      <>
        <p>
          <b>Keep this short.</b> It is the oldest work in the deck and it is here because
          those two colours turn into the whole product later.
        </p>
        <p>
          The brief, plainly: dark orange and dark blue, handed to me, not a choice. And
          three words: portal, transformation, orb. Abstract enough that it could have
          meant almost anything.
        </p>
        <p>
          So I went circular and drew everything I could think of before letting myself
          pick. The board on the right is that.
        </p>
      </>
    ),
    render: () => (
      <Split
        ratio="5fr 7fr"
        left={
          <Stack className="flex flex-col gap-8">
            <Item>
              <Kicker tone="peach">The brand</Kicker>
            </Item>
            <Item>
              <Title>The direction I was given</Title>
            </Item>
            <Item>
              <div className="grid grid-cols-2 gap-5">
                {(
                  [
                    ["Dark orange", "#EA4A00"],
                    ["Dark blue", "#0822E6"],
                  ] as [string, string][]
                ).map(([name, hex]) => (
                  <div key={hex} className="overflow-hidden rounded-[14px] border border-line">
                    <div className="h-24" style={{ background: hex }} />
                    <div className="bg-surface px-5 py-4">
                      <p className="text-[20px] font-semibold leading-tight text-ink">
                        {name}
                      </p>
                      <p className="mt-1 font-mono text-[16px] tabular-nums text-ink-muted">
                        {hex}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Item>
            <Item>
              <div className="flex flex-wrap gap-3">
                <Chip tone="peach">Portal</Chip>
                <Chip tone="lavender">Transformation</Chip>
                <Chip tone="sky">Orb</Chip>
              </div>
            </Item>
          </Stack>
        }
        right={
          <Stack className="grid gap-4">
            <Item grow>
              <Shot
                src="/images/founding-design/research/logo-ideation.png"
                alt="A wide logo-ideation board with dozens of exploratory sketches: circles, orbits, atoms, and gradient orbs."
                ratio="11382 / 6640"
                tone="sky"
                priority
                contain
              />
            </Item>
            <Item grow>
              <div className="grid grid-cols-2 gap-4">
                <Shot
                  src="/images/founding-design/research/brand-moodboard.png"
                  alt="A brand-research moodboard collecting circular, portal, and swirl logo references."
                  ratio="16 / 9"
                  tone="lavender"
                />
                <Shot
                  src="/images/founding-design/research/logo-iterations.png"
                  alt="A grid iterating the chosen crescent-and-droplet mark across construction guides and colour gradients."
                  ratio="16 / 9"
                  tone="pink"
                />
              </div>
            </Item>
          </Stack>
        }
      />
    ),
  },

  {
    id: "brand-guide",
    section: "brand",
    label: "The brand guide",
    seconds: 45,
    notes: (
      <>
        <p>
          <b>Quick.</b> Drew a lot of logos, narrowed them down, finalised one, then built
          the guide around it: logo, colour, gradients, typography. Thirteen pages.
        </p>
        <p>
          Clash Display for the wordmark, DM Sans everywhere in the product.
        </p>
        <p>
          <b>Then move on.</b> The next section is what happened to those two colours once
          there was a product to put them in.
        </p>
      </>
    ),
    render: () => (
      <Split
        ratio="4.5fr 7.5fr"
        left={
          <Stack className="flex flex-col gap-8">
            <Item>
              <Kicker tone="peach">The brand</Kicker>
            </Item>
            <Item>
              <Title>The brand guide</Title>
            </Item>
            <Item>
              <Points
                tone="peach"
                items={[
                  <>Drew every version of the logo I could, then picked one.</>,
                  <>Typography, colour, gradients: thirteen pages of guide.</>,
                ]}
              />
            </Item>
          </Stack>
        }
        right={
          <Stack className="grid gap-4">
            <Item grow>
              <Shot
                src="/images/founding-design/research/final-logos.png"
                alt="Final COROS AI logo lockups: the crescent mark with the wordmark in blue, black, and white on light and dark backgrounds."
                ratio="16 / 8"
                tone="lavender"
                contain
              />
            </Item>
            <Item grow>
              <div className="grid grid-cols-3 gap-4">
                <Shot
                  src="/images/founding-design/brand-guide/page-02.png"
                  alt="Brand guide: the full gradient logo and its hero use cases."
                  ratio="16 / 9"
                  tone="peach"
                  contain
                />
                <Shot
                  src="/images/founding-design/brand-guide/page-03.png"
                  alt="Brand guide: the flat duo-tone logo and its UI use cases."
                  ratio="16 / 9"
                  tone="sky"
                  contain
                />
                <Shot
                  src="/images/founding-design/brand-guide/page-07.png"
                  alt="Brand guide: the colour system with primary, gradient, and utility swatches."
                  ratio="16 / 9"
                  tone="butter"
                  contain
                />
              </div>
            </Item>
          </Stack>
        }
      />
    ),
  },

  /* ---------------- The redesign ---------------- */
  {
    id: "why",
    section: "redesign",
    label: "MUI to shadcn",
    seconds: 75,
    notes: (
      <>
        <p>
          <b>The decision the rest of the section carries out.</b>
        </p>
        <p>
          MUI was slowing engineering down. Rigid, hard to override, every change a fight
          with the library. And v1 had only ever been built in dark mode, so testers kept
          telling us it hurt their eyes and there was no cheap way to add a light theme.
        </p>
        <p>
          Engineering was already pulling MUI out for shadcn.{" "}
          <b>I argued for redesigning the whole product while the front-end was open</b>{" "}
          rather than patching now and rebuilding in six months.
        </p>
      </>
    ),
    render: () => (
      <Split
        ratio="5.5fr 6.5fr"
        left={
          <Stack className="flex flex-col gap-8">
            <Item>
              <Kicker tone="sky">The redesign</Kicker>
            </Item>
            <Item>
              <Title>MUI to shadcn</Title>
            </Item>
            <Item>
              <Points
                tone="sky"
                items={[
                  <>MUI was rigid, and hard for engineering to work with.</>,
                  <>v1 was only ever built in dark mode.</>,
                  <>So we moved the whole product across, and redesigned it on the way.</>,
                ]}
              />
            </Item>
          </Stack>
        }
        right={
          <Stack>
            <Item grow>
              <SlideVideo
                src="/videos/design-system/landing-web-light.mp4"
                poster="/images/design-system/posters/landing-web-light.jpg"
                ratio="1440 / 936"
                tone="mint"
              />
            </Item>
          </Stack>
        }
      />
    ),
  },

  {
    id: "tokens-chain",
    section: "redesign",
    label: "Rebuilding the colour system",
    seconds: 105,
    keep: true,
    notes: (
      <>
        <p>
          <b>The most important slide in this section. Take your time.</b>
        </p>
        <p>
          The real problem was never the theme. Every colour in v1 was written where it was
          used, so a second theme meant finding all of them by hand and getting all of them
          right. <b>The wiring was the problem.</b>
        </p>
        <p>
          Walk the three layers. <b>Primitives</b>: the raw colours, the only place a hex
          code exists. <b>Semantics</b>: names for jobs, the colour of a card, of a border,
          of muted text. <b>Components</b>: they only ever ask for the job. Nothing in the
          interface knows a hex.
        </p>
        <p>
          Then the bit an engineer cares about: the Figma file is structured the same as the
          codebase, so someone opening the variables panel is reading their own names back.
          That is what took reviews from days to minutes.
        </p>
      </>
    ),
    render: () => (
      <Split
        ratio="6.5fr 5.5fr"
        left={
          <Stack className="flex flex-col gap-8">
            <Item>
              <Kicker tone="sky">The redesign</Kicker>
            </Item>
            <Item>
              <Title>Rebuilding the colour system</Title>
            </Item>
            <Item>
              <div className="grid grid-cols-3 gap-8">
                {["Primitives", "Semantics", "Components"].map((name, i) => (
                  <div key={name} className="border-t border-line pt-4">
                    <p className="text-[16px] font-semibold tabular-nums text-ink-muted">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-3 font-display text-[28px] font-semibold leading-tight text-ink">
                      {name}
                    </p>
                  </div>
                ))}
              </div>
            </Item>
            <Item>
              <div className="grid grid-cols-[1fr_1fr_1.3fr] gap-3">
                <Stat value="54+" label="named colours, light and dark" tone="lavender" />
                <Stat value="3" label="platforms out of one library" tone="sky" />
                <Stat value="Days → minutes" label="to get a screen reviewed" tone="mint" />
              </div>
            </Item>
          </Stack>
        }
        right={
          <Stack>
            <Item grow>
              <Shot
                src="/images/design-system/figma/tokens-semantic-colors.png"
                alt="Figma variables editor showing the semantic colors collection with a shadcn light column and a shadcn-dark column, each token resolving to a brand reference."
                ratio="1882 / 1890"
                tone="lavender"
                className="mx-auto max-h-[640px]"
                contain
              />
            </Item>
          </Stack>
        }
      />
    ),
  },

  {
    id: "scales",
    section: "redesign",
    label: "Type, spacing, and colour",
    seconds: 75,
    keep: true,
    notes: (
      <>
        <p>
          <b>Call back to the brand slide out loud.</b> &ldquo;Those two colours I was
          handed? This is where they went.&rdquo;
        </p>
        <p>
          Orange and blue get you a logo. One button needs a resting colour, a hover, a
          pressed, a disabled, a border, and a background that does not fight the text on
          top of it. So: eleven steps of each, mixed by hand rather than generated, because
          generated ramps go muddy in the middle. Plus greys with the blue mixed in, so the
          quiet parts of the product still belong to the brand.
        </p>
        <p>
          Type and spacing are built the same way. <b>All of it is global variables</b>, and
          light and dark are two settings of the same ones, so I design once and flip a
          switch. That is genuinely the only reason one person could rebuild two themes
          across three platforms.
        </p>
      </>
    ),
    render: () => (
      <Stacked>
        <Stack className="flex h-full flex-col justify-center gap-10">
          <Item>
            <Kicker tone="sky">The redesign</Kicker>
            <Title className="mt-3">Type, spacing, and colour</Title>
          </Item>
          <Item>
            <Lede className="max-w-[62ch] text-[26px]">
              All of it global variables. Light and dark are two settings of the same ones.
            </Lede>
          </Item>
          <Item className="w-full">
            <div className="grid gap-7">
              <Ramp name="COROS blue" anchor={600} hex="#0822E6" />
              <Ramp name="COROS orange" anchor={600} hex="#EA4A00" />
              <Ramp name="Greys, with the blue mixed in" anchor={900} hex="#03054A" />
            </div>
          </Item>
        </Stack>
      </Stacked>
    ),
  },

  {
    id: "onboarding",
    section: "redesign",
    label: "Introducing an onboarding",
    seconds: 105,
    notes: (
      <>
        <p>
          Let the video run and <b>keep talking over it.</b> Do not stop and watch it with
          them.
        </p>
        <p>
          What people told us: it jumped straight into coaching and never got to know them.
          It also asked for your name on the last screen, so the whole thing talked to you
          like a form.
        </p>
        <p>
          So there is a proper onboarding now: six screens, both themes, name on the
          second. <b>The tone screen is the one to point at.</b> It used to describe the
          choice. Now it demonstrates it: pick Supportive or Provocative and the orb, the
          card and the background change while you are looking at them.
        </p>
        <p>
          <b>Then the numbers, and be honest that it is a small base.</b> Next-day return
          went to 55% and weekly actives to 40% after this went in. And in interviews people
          said it set the stage for what the product was going to be.
        </p>
      </>
    ),
    render: () => (
      <Split
        ratio="5fr 7fr"
        left={
          <Stack className="flex flex-col gap-8">
            <Item>
              <Kicker tone="sky">The redesign</Kicker>
            </Item>
            <Item>
              <Title>Introducing an onboarding</Title>
            </Item>
            <Item>
              <Punch>
                People felt it jumped straight into coaching without getting to know them.
              </Punch>
            </Item>
            <Item>
              <div className="grid grid-cols-2 gap-4">
                <Stat value="55%" label="come back the next day" tone="lavender" />
                <Stat value="40%" label="are there every week" tone="butter" />
              </div>
            </Item>
          </Stack>
        }
        right={
          <Stack>
            <Item grow>
              <SlideVideo
                src="/videos/design-system/onboarding-web-dark.mp4"
                poster="/images/design-system/posters/onboarding-web-dark.jpg"
                ratio="1440 / 936"
                tone="lavender"
              />
            </Item>
          </Stack>
        }
      />
    ),
  },

  {
    id: "platforms",
    section: "redesign",
    label: "Three platforms",
    seconds: 45,
    cut: true,
    notes: (
      <>
        <p>
          <b>Short. Let the videos do it.</b>
        </p>
        <p>
          Everything came out of the same library, drawn for all three at the same time.
          Nothing here is a desktop screen that got squeezed down later.
        </p>
        <p>
          Mobile is React Native, so iOS and Android got their own designs rather than the
          web ones scaled: different navigation, different keyboard behaviour, different
          touch targets.
        </p>
      </>
    ),
    render: () => (
      <Stacked>
        <Stack className="flex h-full flex-col justify-center gap-7">
          <Item className="text-center">
            <Kicker tone="sky">The redesign</Kicker>
            <Title className="mt-3">Three platforms</Title>
          </Item>
          <Item grow className="min-h-0">
            <div className="mx-auto grid h-full max-w-[720px] grid-cols-3 gap-6">
              <SlideVideo
                src="/videos/design-system/onboarding-mobile-light.mp4"
                poster="/images/design-system/posters/onboarding-mobile-light.jpg"
                ratio="640 / 1392"
                tone="pink"
              />
              <SlideVideo
                src="/videos/design-system/chat-mobile-light.mp4"
                poster="/images/design-system/posters/chat-mobile-light.jpg"
                ratio="640 / 1392"
                tone="sky"
              />
              <SlideVideo
                src="/videos/design-system/influences-mobile-light.mp4"
                poster="/images/design-system/posters/influences-mobile-light.jpg"
                ratio="640 / 1392"
                tone="lavender"
              />
            </div>
          </Item>
          <Item className="text-center">
            <Lede className="mx-auto max-w-[70ch] text-center">
              Mobile is React Native, so iOS and Android got their own designs.
            </Lede>
          </Item>
        </Stack>
      </Stacked>
    ),
  },

  {
    id: "retrieved-context",
    section: "redesign",
    label: "A debugging panel for the AI",
    seconds: 90,
    notes: (
      <>
        <p>Your favourite thing in the product. Say that. It reads as real.</p>
        <p>
          <b>You do the prompt testing.</b> So a few times a week you would get an answer
          that felt off and have no way to find out why without asking an engineer to go and
          read logs.
        </p>
        <p>
          So you designed a panel inside the product, team accounts only, that shows what
          the model actually saw: which past conversations it pulled in and how strongly,
          whether it thought this was a new subject or the same one, what it remembered.
        </p>
        <p>
          <b>Everyone reviews the AI with it now.</b> It is how we do quality assurance on
          the model, and it is the reason a bad answer turns into a fix instead of a ticket.
        </p>
      </>
    ),
    render: () => (
      <Split
        ratio="5.5fr 6.5fr"
        left={
          <Stack className="flex flex-col gap-8">
            <Item>
              <Kicker tone="sky">The redesign · team only</Kicker>
            </Item>
            <Item>
              <Title>A debugging panel for the AI</Title>
            </Item>
            <Item>
              <Lede className="max-w-[52ch] text-[24px]">
                A panel that shows what the model actually saw. Everyone reviews the AI with
                it now.
              </Lede>
            </Item>
          </Stack>
        }
        right={
          <Stack>
            <Item grow>
              <SlideVideo
                src="/videos/design-system/retrieved-context-web-light.mp4"
                poster="/images/design-system/posters/retrieved-context-web-light.jpg"
                ratio="1440 / 936"
                tone="lavender"
              />
            </Item>
          </Stack>
        }
      />
    ),
  },

  /* ---------------- Memory ---------------- */
  {
    id: "mw-ask",
    section: "myworld",
    label: "What people asked for",
    seconds: 120,
    keep: true,
    notes: (
      <>
        <p>
          Change gear. This is the newest work, and it was still going out in pieces when I
          left. Call it
          what it does: <b>the part that remembers.</b> Internally it is called My World, and
          that name is on the screens.
        </p>
        <p>
          <b>Read the quote and then stop.</b> Do not explain it. Twenty-five interviews, and
          the same shape kept coming back: the coaching works, and then it disappears. Nobody
          asked for better coaching. They asked to find the thing they had already worked
          out.
        </p>
        <p>
          The reason it disappears is that a coaching chat is one long scroll. There is
          nothing to point at, so there is nothing to come back to. So I gave it a shape.{" "}
          <b>Three words, said slowly.</b> A session is one conversation about one thing. A
          topic is the thing that keeps coming back. My World is the page they all live on.
        </p>
        <p>
          Then the decision I pushed hardest for:{" "}
          <b>a topic is a situation, not a feeling.</b> &ldquo;Conversation with dad,&rdquo;
          not &ldquo;Self-worth.&rdquo; Feelings as topics gives you a product that tells
          people what they are. A coach does not do that, and there is nothing you can do
          with it.
        </p>
      </>
    ),
    render: () => (
      <Split
        ratio="5.5fr 6.5fr"
        left={
          <Stack className="flex flex-col gap-8">
            <Item>
              <Kicker tone="lavender">The part that remembers</Kicker>
            </Item>
            <Item>
              <Title>What people asked for</Title>
            </Item>
            <Item>
              <Quote attribution="Customer interview, 1 of 25">
                &ldquo;I had breakthroughs with COROS about my nephew. I can&rsquo;t find them
                anymore.&rdquo;
              </Quote>
            </Item>
            <Item>
              <Points
                tone="lavender"
                items={[
                  <>
                    <b>A session</b>: one conversation about one thing.
                  </>,
                  <>
                    <b>A topic</b>: the thing that keeps coming back.
                  </>,
                  <>
                    <b>My World</b>: the page they all live on.
                  </>,
                ]}
              />
            </Item>
          </Stack>
        }
        right={
          <Stack>
            <Item grow>
              <Shot
                src="/images/my-world/hero/hero-page.jpg"
                alt="The My World page: a featured band with the My Breakthroughs donut, a breakthrough quote, and a Coaching Provocation card, above the My Reminders list."
                ratio="1600 / 998"
                tone="lavender"
              />
            </Item>
          </Stack>
        }
      />
    ),
  },

  {
    id: "mw-breakthrough",
    section: "myworld",
    label: "The breakthrough card",
    seconds: 60,
    cut: true,
    notes: (
      <>
        <p>
          <b>One idea, and it is about knowing when a thing is worth keeping.</b>
        </p>
        <p>
          A chart of breakthroughs over time is interesting to look at and hard to justify.
          On its own it is a graph on a page that is already busy. But the data behind it was
          the most valuable thing on the page, so instead of arguing for the chart I found it
          a job.
        </p>
        <p>
          It went inside the Latest Breakthrough card, something people already open, so
          the chart sits next to the thing it is counting instead of taking a slot of its
          own. <b>Say what the donut actually does here.</b> Then I worked out every state
          it could end up in before handoff: long labels wrapping, a dimension going
          backwards, a dimension with nothing in it yet.
        </p>
      </>
    ),
    render: () => (
      <Stacked>
        <Stack className="flex h-full flex-col justify-center gap-9">
          <Item className="text-center">
            <Kicker tone="lavender">The part that remembers</Kicker>
            <Title className="mt-3">The breakthrough card</Title>
          </Item>
          <Item className="w-full">
            <div className="mx-auto max-w-[1160px]">
              <SlideVideo
                src="/videos/my-world/breakthrough-widget.mp4"
                poster="/images/my-world/posters/breakthrough-widget.jpg"
                ratio="1322 / 528"
                tone="pink"
                loop
              />
            </div>
          </Item>
        </Stack>
      </Stacked>
    ),
  },

  {
    id: "mw-prompts",
    section: "myworld",
    label: "Writing and testing the prompts",
    seconds: 135,
    keep: true,
    notes: (
      <>
        <p>
          <b>Your strongest answer on AI. Never cut it, and do not rush.</b> Nothing on the
          slide but the heading and the output itself. The topic titles, the reminders, the
          provocation: every word on there came out of a prompt you wrote.
        </p>
        <p>
          Start with the stakes, because they are unusual:{" "}
          <b>
            if the product tells you that you had a breakthrough you did not have, it has put
            a memory in your head that is not yours.
          </b>{" "}
          That is the worst thing this product could do to someone.
        </p>
        <p>
          So the rule inside the prompt is that it can only reflect back something the person
          actually said or agreed to. Nothing invented, nothing inferred.
        </p>
        <p>
          Then the testing, and be concrete: 20 real transcripts in, every field scored
          against the rule it is supposed to follow, a sample read by hand.{" "}
          <b>The last run found five things that had to be fixed.</b> Each one got a single
          extra sentence rather than a rewrite, so I could tell which change did what. Then
          the same twenty go through again.
        </p>
        <p>
          <i>If asked:</i> conversations are confidential and the prompts are company
          property, so anything shown is redacted or made up.
        </p>
      </>
    ),
    render: () => (
      <Stacked>
        <Stack className="flex h-full flex-col justify-center gap-8">
          <Item className="text-center">
            <Kicker tone="lavender">The part that remembers</Kicker>
            <Title className="mt-3">Writing and testing the prompts</Title>
          </Item>
          <Item className="w-full">
            <div className="grid grid-cols-2 items-start gap-6">
              <div className="grid gap-4">
                <Shot
                  src="/images/my-world/posters/topics-by-dimension.jpg"
                  alt="The topics list: six topic cards, each with its dimension tag, date, and session count, above a dimension filter."
                  ratio="1440 / 536"
                  tone="lavender"
                />
                <Shot
                  src="/images/my-world/hero/hero-reminders.jpg"
                  alt="The Reminders widget: four checkable reminders written out of a session, one of them just ticked off."
                  ratio="1600 / 375"
                  tone="mint"
                />
              </div>
              <Shot
                src="/images/my-world/coaching-provocation.png"
                alt="The Coaching Provocation widget: 'Identity is built, not discovered,' a synthesis across recent sessions ending in a question."
                ratio="1404 / 528"
                tone="butter"
              />
            </div>
          </Item>
        </Stack>
      </Stacked>
    ),
  },

  /* ---------------- Close ---------------- */
  {
    id: "owned",
    section: "close",
    label: "What I owned, end to end",
    seconds: 45,
    notes: (
      <>
        <p>
          <b>The one summarising slide in the deck. Read the five, then stop.</b>
        </p>
        <p>
          Say it as a fact, not a boast: over the year you owned the brand, the design
          system, the prompt engineering, the feature design, and the development.{" "}
          <b>End to end.</b>
        </p>
        <p>
          Do not add a pitch after it. The next slide is thank you.
        </p>
      </>
    ),
    render: () => (
      <Centered align="start">
        <Stack className="flex w-full flex-col items-start gap-10 text-left">
          <Item>
            <Kicker tone="mint">Close</Kicker>
          </Item>
          <Item>
            <Title className="text-[76px]">What I owned, end to end</Title>
          </Item>
          <Item>
            {/* Sized by hand rather than with <Points>, so five words can carry
                the slide on their own. */}
            <ul className="grid gap-5">
              {[
                "Brand",
                "Design system",
                "Prompt engineering",
                "Feature design",
                "Development",
              ].map((name) => (
                <li key={name} className="relative pl-11 text-[34px] leading-tight text-ink">
                  <span
                    aria-hidden
                    className="absolute left-0 top-[0.45em] h-4 w-4 rounded-full border-2 border-accent-strong bg-mint-soft"
                  />
                  {name}
                </li>
              ))}
            </ul>
          </Item>
        </Stack>
      </Centered>
    ),
  },

  {
    id: "thanks",
    section: "close",
    label: "Thank you",
    seconds: 180,
    notes: (
      <>
        <p>
          Say thank you, ask for questions, and then <b>stop talking.</b> Let the silence go
          on longer than is comfortable. It always gets filled.
        </p>
        <p>
          If nothing comes, offer the thing you skipped, whichever they leaned into: the full
          brand guide, or the debugging panel in detail.
        </p>
        <p>
          <b>Have open:</b> app.coros.ai in a tab, and the Figma file one click away.
        </p>
        <p>
          <b>Credit the team once, and mean it:</b> a founder, two engineers, another
          designer. Saying it is what makes every &ldquo;I&rdquo; in the last twenty minutes
          believable.
        </p>
      </>
    ),
    render: () => (
      <Centered>
        <Stack className="flex flex-col items-center gap-10">
          <Item>
            <Title className="text-[104px]">Thank you</Title>
          </Item>
          <Item>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Chip tone="pink">arshita.co</Chip>
            </div>
          </Item>
        </Stack>
      </Centered>
    ),
  },
];

/** Cumulative end time, in seconds, for each slide index. */
export const CUMULATIVE: number[] = SLIDES.reduce<number[]>((acc, slide, i) => {
  acc.push((i === 0 ? 0 : acc[i - 1]) + slide.seconds);
  return acc;
}, []);

export const TOTAL_SECONDS = CUMULATIVE[CUMULATIVE.length - 1];
