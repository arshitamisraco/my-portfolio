"use client";

import { useEffect, useRef, useState } from "react";
import type { HeatPoint } from "@/lib/posthog-query";

// Warm ramp from DESIGN.md tokens: accent-soft → accent → accent-strong → peach-deep.
const RAMP: [number, [number, number, number]][] = [
  [0, [246, 198, 207]],
  [0.35, [226, 138, 155]],
  [0.7, [172, 81, 105]],
  [1, [146, 73, 42]],
];
const RADIUS = 28;
const VIEWPORT_HEIGHT = 800; // the preview's "screen" height before we stretch it

function colorAt(t: number): [number, number, number] {
  for (let i = 1; i < RAMP.length; i++) {
    const [t1, c1] = RAMP[i];
    const [t0, c0] = RAMP[i - 1];
    if (t <= t1) {
      const k = (t - t0) / (t1 - t0);
      return [0, 1, 2].map((j) => Math.round(c0[j] + (c1[j] - c0[j]) * k)) as [number, number, number];
    }
  }
  return RAMP[RAMP.length - 1][1];
}

export default function Heatmap({
  path,
  width,
  points,
}: {
  path: string;
  width: number;
  points: HeatPoint[];
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [pageHeight, setPageHeight] = useState(VIEWPORT_HEIGHT);
  const [scale, setScale] = useState(1);

  // Keep the admin's own browsing of the preview out of PostHog.
  useEffect(() => {
    try {
      const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
      if (key) localStorage.setItem(`__ph_opt_in_out_${key}`, "0");
    } catch {}
  }, []);

  // Fit the fixed-width page into the column.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(Math.min(1, el.clientWidth / width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  // Grow the iframe to the full page height so page-relative y lines up 1:1.
  function onLoad() {
    const doc = frame.current?.contentDocument;
    if (!doc) return;
    // Viewport-relative heights (vh, min-h-screen) would grow with the stretched
    // iframe; pin them to what they are at a normal screen height first.
    doc.querySelectorAll<HTMLElement>('[class*="vh]"], [class*="-screen"]').forEach((el) => {
      const cs = getComputedStyle(el);
      el.style.minHeight = cs.minHeight;
      if (/(^|\s)h-(screen|\[[\d.]+[sd]?vh\])/.test(el.className)) el.style.height = cs.height;
    });
    const measure = () => setPageHeight(doc.documentElement.scrollHeight);
    measure();
    new ResizeObserver(measure).observe(doc.body);
  }

  // The iframe can finish loading before React attaches onLoad.
  useEffect(() => {
    if (frame.current?.contentDocument?.readyState === "complete") onLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    c.width = width;
    c.height = pageHeight;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, width, pageHeight);
    if (!points.length) return;

    // 1) Accumulate intensity as alpha.
    const max = Math.max(...points.map((p) => p[3]));
    for (const [x, y, vw, count] of points) {
      // Desktop layouts are centered: keep the offset from the center.
      // Mobile layouts are fluid: scale proportionally.
      const px = width >= 768 ? x - vw / 2 + width / 2 : (x * width) / vw;
      const g = ctx.createRadialGradient(px, y, 0, px, y, RADIUS);
      const a = 0.15 + 0.6 * (count / max);
      g.addColorStop(0, `rgba(0,0,0,${a})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(px - RADIUS, y - RADIUS, RADIUS * 2, RADIUS * 2);
    }
    // 2) Map alpha onto the warm ramp.
    const img = ctx.getImageData(0, 0, width, pageHeight);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const alpha = d[i + 3];
      if (!alpha) continue;
      const [r, g, b] = colorAt(alpha / 255);
      d[i] = r;
      d[i + 1] = g;
      d[i + 2] = b;
      d[i + 3] = Math.min(220, 60 + alpha);
    }
    ctx.putImageData(img, 0, 0);
  }, [points, width, pageHeight]);

  return (
    <div ref={wrap} className="w-full overflow-hidden rounded-frame border border-line bg-surface-raised">
      <div style={{ height: pageHeight * scale }}>
        <div
          className="relative origin-top-left"
          style={{ width, height: pageHeight, transform: `scale(${scale})` }}
        >
          <iframe
            ref={frame}
            src={path}
            title={`Preview of ${path}`}
            onLoad={onLoad}
            scrolling="no"
            className="pointer-events-none absolute inset-0 border-0"
            style={{ width, height: pageHeight }}
          />
          <canvas ref={canvas} className="pointer-events-none absolute inset-0" style={{ width, height: pageHeight }} />
        </div>
      </div>
    </div>
  );
}
