import { chromium } from "playwright";
const b = await chromium.launch(); const p = await b.newPage();
await p.goto("http://127.0.0.1:8123/index.html"); await p.evaluate(() => window.ready);
const r = await p.evaluate(() => { const REAL = window.REAL; const inv = st => { let lo = 0, hi = REAL; for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; storyAt(m) < st ? lo = m : hi = m; } return +lo.toFixed(3); };
 const ev = { real: REAL, s1wipe: 1.9, s2start: 2.3, manifestOut: 3.25, beat1: 3.4, beat2: 3.75, beat3: 4.1, beat4: 4.45, radial: 4.7, s3: 4.9, stat1: 6.05, stat2: 6.35, stat3: 6.65, callout: 7.1, zoom: 8.15, flash: 8.45, s4: 8.7, p2: 9.75, p3: 10.8, stamp1: 9.0, stamp2: 10.05, stamp3: 11.1, mint: 11.6, s5: 11.9, fwipe: 13.12, fun: 13.4, fun1: 13.48, fun2: 13.55, fun3: 13.62, fun4: 13.69, s6: 14.9, collapse: 15.5, lockup: 15.75, button: 16.13, end: 16.8 };
 const o = {}; for (const k in ev) o[k] = k === "real" ? REAL : inv(ev[k]); return o; });
(await import("fs")).writeFileSync("events.json", JSON.stringify(r)); console.log(JSON.stringify(r)); await b.close();
