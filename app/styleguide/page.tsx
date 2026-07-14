import type { Metadata } from "next";
import Button from "@/components/Button";
import ImageFrame from "@/components/ImageFrame";
import PixelCloud, { type CloudShape, type CloudVariant } from "@/components/PixelCloud";
import PullQuote from "@/components/PullQuote";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import TagChip, { type ChipTone } from "@/components/TagChip";
import VideoFrame from "@/components/VideoFrame";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false },
};

const RAW_PINKS = [
  { name: "pink-50", cls: "bg-pink-50", hex: "#FDF8F7" },
  { name: "pink-100", cls: "bg-pink-100", hex: "#FAEEEC" },
  { name: "pink-200", cls: "bg-pink-200", hex: "#F6C6CF" },
  { name: "pink-300", cls: "bg-pink-300", hex: "#EFA6B4" },
  { name: "pink-400", cls: "bg-pink-400", hex: "#E28A9B" },
  { name: "pink-600", cls: "bg-pink-600", hex: "#AC5169" },
  { name: "pink-700", cls: "bg-pink-700", hex: "#96455C" },
];

const SEMANTIC = [
  { name: "bg", cls: "bg-bg" },
  { name: "surface", cls: "bg-surface" },
  { name: "surface-raised", cls: "bg-surface-raised" },
  { name: "ink", cls: "bg-ink" },
  { name: "ink-muted", cls: "bg-ink-muted" },
  { name: "accent", cls: "bg-accent" },
  { name: "accent-strong", cls: "bg-accent-strong" },
  { name: "accent-deep", cls: "bg-accent-deep" },
  { name: "accent-soft", cls: "bg-accent-soft" },
  { name: "line", cls: "bg-line" },
  { name: "on-accent", cls: "bg-on-accent" },
];

const PASTEL_PAIRS = [
  { name: "lavender", soft: "bg-lavender-soft", deepText: "text-lavender-deep" },
  { name: "sky", soft: "bg-sky-soft", deepText: "text-sky-deep" },
  { name: "mint", soft: "bg-mint-soft", deepText: "text-mint-deep" },
  { name: "butter", soft: "bg-butter-soft", deepText: "text-butter-deep" },
  { name: "peach", soft: "bg-peach-soft", deepText: "text-peach-deep" },
];

const TYPE_SCALE = [
  { name: "display / Playfair Display", cls: "font-display text-display font-semibold" },
  { name: "h1 / Playfair Display", cls: "font-display text-h1 font-semibold" },
  { name: "h2 / Playfair Display", cls: "font-display text-h2 font-semibold" },
  { name: "h3 / Inter", cls: "text-h3 font-semibold" },
  { name: "h4 / Inter", cls: "text-h4 font-semibold" },
  { name: "body-lg / Inter", cls: "text-body-lg" },
  { name: "body / Inter", cls: "text-body" },
  { name: "caption / Inter", cls: "text-caption text-ink-muted" },
];

const RADII = [
  { name: "radius-card (12px)", cls: "rounded-card" },
  { name: "radius-frame (16px)", cls: "rounded-frame" },
  { name: "radius-pill (999px)", cls: "rounded-pill" },
];

const CLOUD_SHAPES: CloudShape[] = ["cumulus", "puff", "wisp"];
const CLOUD_VARIANTS: CloudVariant[] = ["pink", "lavender", "sky"];
const CHIP_TONES: ChipTone[] = ["pink", "lavender", "sky", "mint", "butter", "peach"];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-12">
      <h2 className="font-display text-h2 font-semibold text-ink">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function Styleguide() {
  return (
    <div className="container-site py-16">
      <SectionLabel cloud>Internal QA</SectionLabel>
      <h1 className="mt-4 font-display text-h1 font-semibold text-ink">Styleguide</h1>
      <p className="mt-3 max-w-lg text-body-lg text-ink-muted">
        Every token, type style, and component state in one place. Unlinked from the
        site nav — for design QA only.
      </p>

      <div className="mt-12">
        <Section title="Raw palette: pink family">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {RAW_PINKS.map((c) => (
              <div key={c.name}>
                <div className={`h-20 rounded-card border border-line ${c.cls}`} />
                <p className="mt-2 text-caption font-medium text-ink">{c.name}</p>
                <p className="text-caption text-ink-muted">{c.hex}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Semantic tokens">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {SEMANTIC.map((c) => (
              <div key={c.name}>
                <div className={`h-16 rounded-card border border-line ${c.cls}`} />
                <p className="mt-2 text-caption font-medium text-ink">--color-{c.name}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Supporting pastels: soft surface + AA text pair">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PASTEL_PAIRS.map((p) => (
              <div
                key={p.name}
                className={`rounded-card border border-line p-4 ${p.soft}`}
              >
                <p className={`text-body font-semibold ${p.deepText}`}>{p.name}</p>
                <p className={`text-caption ${p.deepText}`}>
                  Deep-on-soft text passes AA.
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Type scale">
          <div className="flex flex-col gap-6">
            {TYPE_SCALE.map((t) => (
              <div key={t.name}>
                <p className="text-caption text-ink-muted">{t.name}</p>
                <p className={`${t.cls} text-ink`}>Conversations that transform</p>
              </div>
            ))}
            <div>
              <p className="text-caption text-ink-muted">eyebrow / Inter</p>
              <p className="text-style-eyebrow text-accent-deep">Selected Work</p>
            </div>
          </div>
        </Section>

        <Section title="Radii & elevation">
          <div className="grid gap-4 sm:grid-cols-3">
            {RADII.map((r) => (
              <div
                key={r.name}
                className={`flex h-24 items-center justify-center border border-line bg-surface-raised ${r.cls}`}
              >
                <p className="text-caption text-ink-muted">{r.name}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-caption text-ink-muted">
            Elevation is 1px pink-tinted borders + background shifts. No drop shadows.
          </p>
        </Section>

        <Section title="Pixel clouds: 3 shapes × 3 variants">
          <div className="flex flex-col gap-8">
            {CLOUD_SHAPES.map((shape) => (
              <div key={shape} className="flex flex-wrap items-end gap-10">
                <p className="w-24 text-caption font-medium text-ink">{shape}</p>
                {CLOUD_VARIANTS.map((variant) => (
                  <PixelCloud key={variant} shape={shape} variant={variant} size={110} />
                ))}
              </div>
            ))}
            <div className="flex items-end gap-6">
              <p className="w-24 text-caption font-medium text-ink">sizes</p>
              <PixelCloud shape="puff" size={28} />
              <PixelCloud shape="puff" size={48} />
              <PixelCloud shape="puff" size={80} />
            </div>
            <div className="flex items-center gap-6">
              <p className="w-24 text-caption font-medium text-ink">bob (hover motif)</p>
              <PixelCloud shape="puff" size={48} className="cloud-bob" />
            </div>
          </div>
        </Section>

        <Section title="Buttons">
          <div className="flex flex-wrap items-center gap-4">
            <Button href="#">Primary action</Button>
            <Button href="#" variant="secondary">
              Secondary action
            </Button>
            <Button href="#" variant="ghost">
              Ghost action
            </Button>
          </div>
          <p className="mt-4 text-caption text-ink-muted">
            Hover: background/border shift. Focus: 2px pink ring, 3px offset (tab to
            verify).
          </p>
        </Section>

        <Section title="Tag chips">
          <div className="flex flex-wrap gap-3">
            {CHIP_TONES.map((tone) => (
              <TagChip key={tone} tone={tone}>
                {tone}
              </TagChip>
            ))}
          </div>
        </Section>

        <Section title="Section label">
          <div className="flex flex-col gap-4">
            <SectionLabel>Without cloud</SectionLabel>
            <SectionLabel cloud>With cloud</SectionLabel>
          </div>
        </Section>

        <Section title="Pull quote">
          <PullQuote attribution="Design brief, My World">
            A mirror, not a filing cabinet.
          </PullQuote>
        </Section>

        <Section title="Video frame (placeholder state)">
          <VideoFrame
            title="Sample video slot"
            description="Demonstrates the placeholder treatment: gradient surface, play affordance, title, description, and target file path."
            src="/videos/example/sample-clip.mp4"
            tone="lavender"
          />
        </Section>

        <Section title="Image frame (placeholder state)">
          <ImageFrame
            alt="Sample photo slot — a real photo caption would describe the image here"
            plannedSrc="/images/example/sample-photo.jpg"
            caption="Caption text sits below the frame in muted ink."
            tone="sky"
          />
        </Section>

        <Section title="Reveal (scroll motion)">
          <Reveal>
            <div className="rounded-card border border-line bg-surface-raised p-6">
              <p className="text-body text-ink">
                This card fades up on scroll. Under reduced motion it renders static.
              </p>
            </div>
          </Reveal>
        </Section>
      </div>
    </div>
  );
}
