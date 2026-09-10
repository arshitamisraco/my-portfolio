"use client";

/**
 * Presenter view — a follower window.
 *
 * Keep this on the laptop and mirror /talk to the projector. It shows the clock
 * with drift, the notes for the current slide, and what is coming next, and it
 * can drive the deck so you never have to touch the projected window.
 */

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { formatClock, useDeckChannel, type DeckMessage } from "../deck-channel";
import { CUMULATIVE, SECTIONS, SLIDES, TOTAL_SECONDS } from "../slides";

export default function Presenter() {
  const [index, setIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [connected, setConnected] = useState(false);

  const send = useDeckChannel(
    useCallback((message: DeckMessage) => {
      if (message.type !== "state") return;
      setConnected(true);
      setIndex(message.index);
      setElapsed(message.elapsed);
      setRunning(message.running);
    }, []),
  );

  // Ask the deck for its current state as soon as this window opens.
  useEffect(() => {
    send({ type: "hello" });
  }, [send]);

  // Drive the deck from here too, so the presenter never touches the projector.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      switch (event.key) {
        case "ArrowRight":
        case " ":
          event.preventDefault();
          send({ type: "cmd", cmd: "next" });
          break;
        case "ArrowLeft":
          event.preventDefault();
          send({ type: "cmd", cmd: "prev" });
          break;
        case "t":
          send({ type: "cmd", cmd: "toggleTimer" });
          break;
        case "r":
          send({ type: "cmd", cmd: "resetTimer" });
          break;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [send]);

  const slide = SLIDES[index];
  const next = SLIDES[index + 1];
  const section = SECTIONS[slide.section];
  const drift = elapsed - CUMULATIVE[index];

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-bg px-6 py-6 text-ink">
      <div className="mx-auto grid max-w-4xl gap-5">
        {/* ---------- clock ---------- */}
        <header className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-frame border border-line bg-surface px-5 py-4">
          <div>
            <p className="text-style-eyebrow text-ink-muted">Elapsed</p>
            <p className="font-display text-h1 font-semibold leading-none tabular-nums text-ink">
              {formatClock(elapsed)}
            </p>
          </div>

          <div className="text-center">
            <p className="text-style-eyebrow text-ink-muted">
              Should be at {formatClock(CUMULATIVE[index])} by the end of this slide
            </p>
            <p
              className={`mt-1 font-display text-h3 font-semibold tabular-nums ${
                drift > 45
                  ? "text-peach-deep"
                  : drift < -45
                    ? "text-sky-deep"
                    : "text-mint-deep"
              }`}
            >
              {elapsed === 0
                ? "clock not started"
                : drift > 0
                  ? `${formatClock(drift)} behind`
                  : `${formatClock(-drift)} ahead`}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => send({ type: "cmd", cmd: "toggleTimer" })}
              className="rounded-pill bg-accent-strong px-4 py-2 text-caption font-medium text-on-accent"
            >
              {running ? "Pause" : "Start"}
            </button>
            <button
              type="button"
              onClick={() => send({ type: "cmd", cmd: "resetTimer" })}
              className="rounded-pill border border-line px-4 py-2 text-caption font-medium text-ink-muted hover:text-ink"
            >
              Reset
            </button>
          </div>
        </header>

        {!connected ? (
          <p className="rounded-frame border border-butter-deep/30 bg-butter-soft px-5 py-3 text-caption text-ink">
            Waiting for the deck. Open{" "}
            <Link href="/talk" className="font-medium underline">
              /talk
            </Link>{" "}
            in another window of this same browser — they sync over a BroadcastChannel,
            which does not cross browsers or private windows.
          </p>
        ) : null}

        {/* ---------- current slide ---------- */}
        <section className="rounded-frame border border-line bg-surface-raised p-6">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="rounded-pill bg-accent-soft px-3 py-1 text-eyebrow font-semibold uppercase tracking-[0.12em] text-accent-deep">
              {section.label}
            </span>
            <span className="text-caption tabular-nums text-ink-muted">
              {String(index + 1).padStart(2, "0")} / {SLIDES.length} ·{" "}
              {formatClock(slide.seconds)} planned
            </span>
            {slide.keep ? (
              <span className="text-caption font-semibold text-accent-deep">Never cut</span>
            ) : null}
            {slide.cut ? (
              <span className="text-caption text-ink-muted">Cut if behind</span>
            ) : null}
          </div>

          <h1 className="mt-3 font-display text-h2 font-semibold text-ink">{slide.label}</h1>

          <div className="mt-4 space-y-3 text-body-lg leading-relaxed text-ink">
            {slide.notes}
          </div>
        </section>

        {/* ---------- next ---------- */}
        <footer className="flex items-center justify-between gap-4 rounded-frame border border-line bg-surface px-5 py-4">
          <p className="min-w-0 text-body text-ink-muted">
            <span className="text-style-eyebrow">Next</span>
            <br />
            <span className="font-display text-h4 font-semibold text-ink">
              {next ? next.label : "End of deck"}
            </span>
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => send({ type: "cmd", cmd: "prev" })}
              className="rounded-pill border border-line px-5 py-2.5 text-caption font-medium hover:bg-surface-raised"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => send({ type: "cmd", cmd: "next" })}
              className="rounded-pill bg-accent-strong px-6 py-2.5 text-caption font-medium text-on-accent"
            >
              Next →
            </button>
          </div>
        </footer>

        <p className="text-caption text-ink-muted">
          Whole talk: {formatClock(TOTAL_SECONDS)} across {SLIDES.length} slides. Arrow keys
          and space work here too.
        </p>
      </div>
    </div>
  );
}
