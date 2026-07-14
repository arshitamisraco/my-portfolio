"use client";

import { useState } from "react";
import {
  CONTACT_EMAIL,
  CONTACT_FORM_ENABLED,
  WEB3FORMS_ACCESS_KEY,
} from "@/lib/contact";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_CLASSES =
  "w-full rounded-card border border-line bg-surface-raised px-4 py-3 text-body text-ink placeholder:text-ink-muted transition-colors focus:border-accent";

const LABEL_CLASSES = "block text-caption font-semibold text-ink";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New portfolio message from ${data.get("name") || "someone"}`,
          from_name: "Arshita Misra — Portfolio",
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
          botcheck: data.get("botcheck"),
        }),
      });
      const result = await res.json();

      if (result.success) {
        setStatus("success");
        setMessage("Thanks for reaching out — your message is on its way. I'll be in touch soon.");
        form.reset();
      } else {
        setStatus("error");
        setMessage(
          "Something went wrong sending your message. Please try the direct email link above."
        );
      }
    } catch {
      setStatus("error");
      setMessage(
        "Couldn't reach the mail service. Please check your connection or use the direct email link above."
      );
    }
  }

  // Before a Web3Forms key is configured, keep the page honest: the direct
  // email link above still works, so point people there rather than showing
  // a submit button that can't succeed.
  if (!CONTACT_FORM_ENABLED) {
    return (
      <div className="rounded-frame border border-line bg-surface-raised p-6 text-body text-ink-muted">
        The message form isn&rsquo;t connected yet. For now, please reach me directly at{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-medium text-accent-deep underline decoration-accent underline-offset-4 hover:text-ink"
        >
          {CONTACT_EMAIL}
        </a>
        .
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot — hidden from people, catches bots that fill every field. */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        aria-hidden="true"
      />

      <div>
        <label htmlFor="contact-name" className={LABEL_CLASSES}>
          Name <span className="text-accent-strong">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          className={`mt-2 ${FIELD_CLASSES}`}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className={LABEL_CLASSES}>
          Email <span className="text-accent-strong">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={`mt-2 ${FIELD_CLASSES}`}
        />
      </div>

      <div>
        <label htmlFor="contact-phone" className={LABEL_CLASSES}>
          Phone <span className="font-normal text-ink-muted">(optional)</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="(555) 123-4567"
          className={`mt-2 ${FIELD_CLASSES}`}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={LABEL_CLASSES}>
          Message <span className="text-accent-strong">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          placeholder="What would you like to talk about?"
          className={`mt-2 resize-y ${FIELD_CLASSES}`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-2 rounded-pill border border-accent-strong bg-accent-strong px-6 py-3 text-body font-medium text-on-accent transition-colors duration-200 hover:border-accent-deep hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>

        {status === "success" && (
          <span className="text-caption font-medium text-mint-deep">Message sent</span>
        )}
      </div>

      {/* Status announced to assistive tech without stealing focus. */}
      <p
        aria-live="polite"
        className={
          status === "success"
            ? "rounded-card bg-mint-soft px-4 py-3 text-body text-mint-deep"
            : status === "error"
            ? "rounded-card bg-peach-soft px-4 py-3 text-body text-peach-deep"
            : "sr-only"
        }
      >
        {message}
      </p>
    </form>
  );
}
