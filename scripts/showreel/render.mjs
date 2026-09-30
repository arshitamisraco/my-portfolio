import { chromium } from "playwright";
import { spawn } from "child_process";
import fs from "fs";
const FF = process.env.FF;
const mode = process.argv[2] || "preview";
const browser = await chromium.launch({ args: ["--disable-web-security"] });
const page = await browser.newPage({ viewport: { width: 1000, height: 600 } });
page.on("console", m => { if (m.type() === "warning" || m.type() === "error") console.log("PAGE:", m.text()); });
page.on("pageerror", e => console.log("PAGEERR:", e.message));
await page.goto("http://127.0.0.1:8123/index.html");
await page.evaluate(() => window.ready);
const toBuf = async () => Buffer.from((await page.evaluate(() => frameJPEG())).split(",")[1], "base64");
if (mode === "preview") {
  const times = process.argv.slice(3).map(Number);
  fs.mkdirSync("prev", { recursive: true });
  for (const t of times) { await page.evaluate(f => renderFrame(f), Math.round(t * 60)); fs.writeFileSync(`prev/${t.toFixed(2)}.jpg`, await toBuf()); }
} else {
  const total = await page.evaluate(() => TOTAL);
  const ff = spawn(FF, ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", "60", "-c:v", "mjpeg", "-i", "-",
    "-c:v", "libx264", "-preset", "slow", "-crf", "17", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "out.mp4"], { stdio: ["pipe", "inherit", "inherit"] });
  const t0 = Date.now();
  for (let f = 0; f < total; f++) {
    await page.evaluate(f => renderFrame(f), f);
    const b = await toBuf();
    if (!ff.stdin.write(b)) await new Promise(r => ff.stdin.once("drain", r));
    if (f % 60 === 0) console.log(`frame ${f}/${total} ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  ff.stdin.end(); await new Promise(r => ff.on("close", r));
}
await browser.close();
