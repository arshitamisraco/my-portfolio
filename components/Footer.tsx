import Link from "next/link";
import PixelCloud from "./PixelCloud";
import { RESUME_PDF_URL } from "@/lib/resume";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-site py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-h3 font-semibold text-ink">Arshita Misra</p>
            <p className="mt-2 text-body text-ink-muted">
              Product designer crafting technology that evolves humans.
            </p>
            <PixelCloud shape="puff" variant="pink" size={40} className="mt-6" />
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/work/coros-ai" className="text-body text-ink-muted hover:text-accent-deep">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-body text-ink-muted hover:text-accent-deep">
                  About
                </Link>
              </li>
              <li>
                <a
                  href={RESUME_PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body text-ink-muted hover:text-accent-deep"
                >
                  Resume
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/arshita-misra/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body text-ink-muted hover:text-accent-deep"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-body text-ink-muted hover:text-accent-deep">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-caption text-ink-muted">
          Designed &amp; built by Arshita Misra
        </p>
      </div>
    </footer>
  );
}
