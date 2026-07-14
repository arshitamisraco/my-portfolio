import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PixelCloud from "@/components/PixelCloud";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { CONTACT_EMAIL } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Arshita Misra — founding product designer at COROS AI. Send a message or email directly.",
};

export default function Contact() {
  return (
    <section className="relative overflow-hidden py-section">
      <PixelCloud
        shape="wisp"
        variant="lavender"
        size={160}
        className="absolute right-[8%] top-12 opacity-50"
        aria-hidden
      />
      <div className="container-site relative">
        <SectionLabel cloud>Contact</SectionLabel>
        <h1 className="mt-6 max-w-3xl font-display text-display font-semibold text-ink">
          Let&rsquo;s talk
        </h1>
        <p className="mt-6 max-w-2xl text-body-lg text-ink-muted">
          Whether it&rsquo;s about design, AI, a role, or something we could build together —
          I&rsquo;d love to hear from you. Fill out the form below and it lands straight in my
          inbox.
        </p>

        <div className="mt-12 max-w-2xl">
          <Reveal>
            {/* Direct-email escape hatch — always live, even before the form is wired up. */}
            <p className="text-body text-ink-muted">
              Or email me directly at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-accent-deep underline decoration-accent underline-offset-4 hover:text-ink"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>

            <div className="mt-6">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
