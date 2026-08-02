/**
 * Renders /resume-print to public/documents/Arshita-Misra-Resume.pdf
 * using headless Chrome. Usage: npm run resume:pdf
 *
 * Boots its own dev server on PORT so it never fights the one you
 * have running, and shuts it down when done.
 */
import { execFileSync, spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = 3199;
const URL = `http://localhost:${PORT}/resume-print`;
const OUT = path.join(ROOT, "public", "documents", "Arshita-Misra-Resume.pdf");
const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const server = spawn(path.join(ROOT, "node_modules", ".bin", "next"), ["dev", "-p", String(PORT)], {
  cwd: ROOT,
  stdio: "ignore",
  detached: true,
});

async function waitForPage(timeoutMs = 120_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(URL);
      if (res.ok) return;
    } catch {
      /* server not up yet */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`Timed out waiting for ${URL}`);
}

try {
  await waitForPage();
  // Second hit returns fast once the route is compiled, so Chrome's
  // virtual-time budget is spent on fonts/paint rather than compilation.
  await fetch(URL);

  mkdirSync(path.dirname(OUT), { recursive: true });
  const chromeArgs = [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--print-to-pdf=${OUT}`,
    URL,
  ];
  try {
    // Virtual time makes fonts/paint deterministic, but occasionally hangs;
    // fall back to a plain run if it does.
    execFileSync(CHROME, ["--virtual-time-budget=15000", ...chromeArgs], {
      timeout: 60_000,
    });
  } catch {
    console.log("Chrome timed out with virtual time, retrying without it...");
    execFileSync(CHROME, chromeArgs, { timeout: 60_000 });
  }
  console.log(`Wrote ${OUT}`);
} finally {
  try {
    process.kill(-server.pid, "SIGTERM");
  } catch {
    /* already gone */
  }
}
