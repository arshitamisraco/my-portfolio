import PixelCloud, { type CloudVariant } from "./PixelCloud";

interface SectionLabelProps {
  children: string;
  cloud?: boolean;
  cloudVariant?: CloudVariant;
  id?: string;
}

/** Eyebrow-style section label, optionally accompanied by a small pixel cloud. */
export default function SectionLabel({
  children,
  cloud = false,
  cloudVariant = "pink",
  id,
}: SectionLabelProps) {
  return (
    <p id={id} className="text-style-eyebrow flex items-center gap-3 text-accent-deep">
      {cloud && <PixelCloud shape="puff" variant={cloudVariant} size={28} />}
      {children}
    </p>
  );
}
