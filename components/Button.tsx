import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-strong text-on-accent border border-accent-strong hover:bg-accent-deep hover:border-accent-deep",
  secondary:
    "bg-surface-raised text-ink border border-line hover:border-accent hover:bg-surface",
  ghost: "bg-transparent text-accent-deep border border-transparent hover:bg-surface",
};

interface ButtonProps {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
  external?: boolean;
}

export default function Button({
  href,
  variant = "primary",
  children,
  className = "",
  external = false,
}: ButtonProps) {
  const classes = `inline-flex items-center gap-2 rounded-pill px-6 py-3 text-body font-medium transition-colors duration-200 ${VARIANT_CLASSES[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
