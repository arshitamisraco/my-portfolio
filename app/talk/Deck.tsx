"use client";

/**
 * The deck shell: keyboard navigation, the running clock, the overview grid,
 * and the speaker-notes drawer.
 *
 * Rendered as a fixed overlay rather than in the normal page flow, so it covers
 * the site's nav and footer without needing a second root layout.
 */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActiveSlideContext, Stage, toneBg, toneInk } from "./deck-ui";
import { formatClock, useDeckChannel, type DeckMessage } from "./deck-channel";
import { CUMULATIVE, SECTIONS, SLIDES, TOTAL_SECONDS } from "./slides";

const SHORTCUTS: [string, string][] = [
  ["→ · space · J", "Next slide"],
  ["← · K", "Previous slide"],
  ["Home · End", "First · last slide"],
  ["G", "Overview grid"],
  ["N", "Speaker notes"],
  ["P", "Open presenter window"],
  ["T", "Start / pause the clock"],
  ["R", "Reset the clock"],
  ["F", "Fullscreen"],
  ["?", "This list"],
];

export default function Deck() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [overview, setOverview] = useState(false);
  const [notes, setNotes] = useState(false);
  const [help, setHelp] = useState(false);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  // Bumped when a presenter window says hello, to force a state broadcast at a
  // moment when nothing else would have triggered one (clock stopped).
  const [ping, setPing] = useState(0);

  const reduced = useReducedMotion();
  const slide = SLIDES[index];
  const next = SLIDES[index + 1];

  const go = useCallback((to: number) => {
    setIndex((current) => {
      const clamped = Math.max(0, Math.min(SLIDES.length - 1, to));
      setDirection(clamped >= current ? 1 : -1);
      return clamped;
    });
  }, []);

  /* ---------------- clock ---------------- */

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setElapsed((n) => n + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  // Behind (positive) or ahead (negative) of where the plan says you should be
  // by the end of the current slide.
  const target = CUMULATIVE[index];
  const drift = elapsed - target;

  /* ---------------- cross-window sync ---------------- */

  const send = useDeckChannel(
    useCallback(
      (message: DeckMessage) => {
        if (message.type === "hello") {
          setPing((n) => n + 1);
          return;
        }
        if (message.type !== "cmd") return;

        switch (message.cmd) {
          case "next":
            go(index + 1);
            break;
          case "prev":
            go(index - 1);
            break;
          case "goto":
            go(message.index);
            break;
          case "toggleTimer":
            setRunning((on) => !on);
            break;
          case "resetTimer":
            setElapsed(0);
            setRunning(false);
            break;
        }
      },
      [go, index],
    ),
  );

  // Keep any presenter window in step: on every slide change, every clock tick,
  // and whenever a presenter window announces itself.
  useEffect(() => {
    send({ type: "state", index, elapsed, running });
  }, [send, index, elapsed, running, ping]);

  /* ---------------- keyboard ---------------- */

  const overlayOpen = overview || help;

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable='true']")) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const key = event.key;

      if (key === "Escape") {
        if (help) setHelp(false);
        else if (overview) setOverview(false);
        else if (notes) setNotes(false);
        return;
      }

      switch (key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
        case "j":
          event.preventDefault();
          go(index + 1);
          break;
        case "ArrowLeft":
        case "PageUp":
        case "k":
          event.preventDefault();
          go(index - 1);
          break;
        case "Home":
          event.preventDefault();
          go(0);
          break;
        case "End":
          event.preventDefault();
          go(SLIDES.length - 1);
          break;
        case "g":
          setOverview((on) => !on);
          break;
        case "n":
          setNotes((on) => !on);
          break;
        case "p":
          window.open("/talk/presenter", "coros-talk-presenter", "width=900,height=760");
          break;
        case "t":
          setRunning((on) => !on);
          break;
        case "r":
          setElapsed(0);
          setRunning(false);
          break;
        case "f":
          if (document.fullscreenElement) void document.exitFullscreen();
          else void document.documentElement.requestFullscreen().catch(() => {});
          break;
        case "?":
          setHelp((on) => !on);
          break;
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, help, overview, notes]);

  /* ---------------- click / swipe ---------------- */

  const touchStart = useRef<number | null>(null);

  const section = SECTIONS[slide.section];
  const enterX = reduced ? 0 : direction * 40;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-bg text-ink"
      onTouchStart={(e) => {
        touchStart.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const from = touchStart.current;
        if (from == null) return;
        const delta = e.changedTouches[0].clientX - from;
        if (Math.abs(delta) > 60) go(index + (delta < 0 ? 1 : -1));
        touchStart.current = null;
      }}
    >
      {/* ---------- progress rail ---------- */}
      <div className="flex h-[5px] w-full shrink-0 gap-[2px] bg-line/60 px-[2px] pt-[2px]">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Go to slide ${i + 1}: ${s.label}`}
            onClick={() => go(i)}
            className={`h-full rounded-full transition-opacity ${
              i <= index ? toneBg(SECTIONS[s.section].tone) : "bg-line"
            } ${i === index ? "opacity-100" : "opacity-70 hover:opacity-100"}`}
            style={{ flexGrow: s.seconds }}
          />
        ))}
      </div>

      {/* ---------- stage ---------- */}
      <main className="relative min-h-0 flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.section
            key={slide.id}
            aria-label={`Slide ${index + 1}: ${slide.label}`}
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0, x: enterX }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -enterX }}
            transition={{ duration: reduced ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <ActiveSlideContext.Provider value={!overlayOpen}>
              <Stage>{slide.render()}</Stage>
            </ActiveSlideContext.Provider>
          </motion.section>
        </AnimatePresence>

        {/* Invisible click targets: tap the right third to advance, left to go back. */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => go(index - 1)}
          className="absolute inset-y-0 left-0 w-[8vw] cursor-w-resize opacity-0 focus-visible:opacity-100 focus-visible:bg-accent-soft/40"
        />
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => go(index + 1)}
          className="absolute inset-y-0 right-0 w-[8vw] cursor-e-resize opacity-0 focus-visible:opacity-100 focus-visible:bg-accent-soft/40"
        />
      </main>

      {/* ---------- speaker notes drawer ---------- */}
      <AnimatePresence>
        {notes ? (
          <motion.aside
            key="notes"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "34vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0 overflow-hidden border-t-2 border-line bg-surface"
          >
            <div className="flex h-full flex-col gap-2 overflow-y-auto px-[4vw] py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
                Speaker notes · {slide.label}
              </p>
              <div className="max-w-[100ch] space-y-3 text-body leading-relaxed text-ink">
                {slide.notes}
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      {/* ---------- status bar ---------- */}
      <footer className="flex shrink-0 items-center gap-4 border-t border-line bg-bg px-[2vw] py-2 text-xs text-ink-muted">
        <span
          className={`rounded-pill px-3 py-1 font-semibold uppercase tracking-[0.12em] ${toneBg(
            section.tone,
          )} ${toneInk(section.tone)}`}
        >
          {section.label}
        </span>

        <span className="tabular-nums">
          <b className="text-ink">{String(index + 1).padStart(2, "0")}</b> / {SLIDES.length}
        </span>

        <span className="min-w-0 flex-1 truncate">{slide.label}</span>

        {slide.keep ? (
          <span className="rounded-pill bg-accent-soft px-2.5 py-0.5 font-semibold uppercase tracking-[0.1em] text-accent-deep">
            Never cut
          </span>
        ) : null}
        {slide.cut ? (
          <span className="rounded-pill border border-line px-2.5 py-0.5 font-semibold uppercase tracking-[0.1em]">
            Cut if behind
          </span>
        ) : null}

        <button
          type="button"
          onClick={() => setRunning((on) => !on)}
          className="rounded-pill border border-line px-3 py-1 font-medium tabular-nums transition-colors hover:bg-surface"
          title="Start or pause the clock (T)"
        >
          {running ? "❚❚" : "▶"} {formatClock(elapsed)}{" "}
          <span className="text-ink-muted">/ {formatClock(TOTAL_SECONDS)}</span>
        </button>

        <span
          className={`w-[9ch] text-right font-semibold tabular-nums ${
            drift > 45 ? "text-peach-deep" : drift < -45 ? "text-sky-deep" : "text-mint-deep"
          }`}
        >
          {elapsed === 0
            ? "—"
            : drift > 0
              ? `+${formatClock(drift)} behind`
              : `${formatClock(-drift)} ahead`}
        </span>

        <span className="hidden gap-3 lg:flex">
          <button type="button" onClick={() => setNotes((on) => !on)} className="hover:text-ink">
            N notes
          </button>
          <button type="button" onClick={() => setOverview(true)} className="hover:text-ink">
            G grid
          </button>
          <button type="button" onClick={() => setHelp(true)} className="hover:text-ink">
            ? keys
          </button>
        </span>
      </footer>

      {/* ---------- overview grid ---------- */}
      <AnimatePresence>
        {overview ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            className="absolute inset-0 z-20 overflow-y-auto bg-bg/97 px-[4vw] py-[4vh] backdrop-blur-sm"
          >
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="font-display text-h2 font-semibold text-ink">
                {SLIDES.length} slides · {formatClock(TOTAL_SECONDS)}
              </h2>
              <button
                type="button"
                onClick={() => setOverview(false)}
                className="text-sm text-ink-muted hover:text-ink"
              >
                Close (Esc)
              </button>
            </div>
            <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {SLIDES.map((s, i) => {
                const tone = SECTIONS[s.section].tone;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => {
                        go(i);
                        setOverview(false);
                      }}
                      className={`h-full w-full rounded-frame border-2 p-4 text-left transition-transform hover:-translate-y-0.5 ${toneBg(
                        tone,
                      )} ${i === index ? "border-accent-strong" : "border-line"}`}
                    >
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="font-semibold tabular-nums text-ink">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="tabular-nums text-ink-muted">
                          {formatClock(s.seconds)}
                        </span>
                      </div>
                      <p className="mt-2 font-display text-base font-semibold leading-snug text-ink">
                        {s.label}
                      </p>
                      <p className={`mt-2 text-xs font-semibold uppercase tracking-[0.1em] ${toneInk(tone)}`}>
                        {SECTIONS[s.section].label}
                        {s.keep ? " · keep" : s.cut ? " · cuttable" : ""}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ol>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* ---------- shortcuts ---------- */}
      <AnimatePresence>
        {help ? (
          <motion.div
            key="help"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.18 }}
            className="absolute inset-0 z-30 grid place-items-center bg-ink/45 backdrop-blur-sm"
            onClick={() => setHelp(false)}
          >
            <div
              className="w-[min(30rem,86vw)] rounded-frame border border-line bg-bg p-7 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="font-display text-h3 font-semibold text-ink">Keyboard</h2>
              <dl className="mt-5 grid gap-2.5 text-sm">
                {SHORTCUTS.map(([keys, what]) => (
                  <div key={keys} className="flex items-baseline justify-between gap-6">
                    <dt className="font-mono text-xs text-accent-deep">{keys}</dt>
                    <dd className="text-ink-muted">{what}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-ink-muted">
                Press <b className="text-ink">P</b> to pop out the presenter view on your
                laptop, then move this window to the projector. The two stay in sync.
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Next-slide hint for the presenter, only when notes are open. */}
      {notes && next ? (
        <div className="pointer-events-none absolute bottom-[calc(34vh+2.75rem)] right-[2vw] rounded-pill border border-line bg-bg/90 px-3 py-1 text-xs text-ink-muted">
          Next → {next.label}
        </div>
      ) : null}
    </div>
  );
}
