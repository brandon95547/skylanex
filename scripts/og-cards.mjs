// og-cards.mjs — render one 1200x630 social card per page.
//
// WHY THIS EXISTS: og:image used to point at skylanex-logo.svg, and no major
// platform renders SVG in a link preview — X, LinkedIn, Facebook, Slack, iMessage
// and WhatsApp all showed an empty box. Every share of the site was a blank card.
//
// WHY IT IS NOT PART OF `npm run build`: this shells out to headless Chrome once
// per page. That is ~30s and a Chrome dependency, on a build that otherwise takes
// under a second and runs on every save in dev. Cards only change when a page's
// title or description changes, so this is its own command (`npm run og`) and the
// cards are committed like the rest of dist/.
//
//   npm run og            regenerate every card
//   npm run og -- /work   regenerate one route
//
// The card is composed as HTML and screenshotted rather than drawn, so it inherits
// the real site: the same brand field, the same constellation, the same eagle, the
// same two typefaces. A card drawn separately drifts from the site the first time
// the palette moves.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { site } from "../site.config.mjs";
import { eagleSprite, mark } from "../src/layout.mjs";
import { plexus } from "../src/ui.mjs";
import { pages, ogSlug } from "../src/pages-index.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "assets", "images", "og");

const CHROME =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const W = 1200;
const H = 630;

// Fonts are inlined as data URIs. Headless Chrome renders a file:// page, and a
// file:// @font-face request is blocked by default — embedding sidesteps the flag
// and makes the temp file self-contained.
function fontFace(family, file, weightRange) {
  const b64 = fs.readFileSync(path.join(ROOT, "assets", "fonts", file)).toString("base64");
  return `@font-face{font-family:"${family}";font-weight:${weightRange};font-display:block;
    src:url(data:font/woff2;base64,${b64}) format("woff2");}`;
}

function esc(s) {
  return String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

// The label above the headline. Derived from the route rather than stored per page:
// the section a page belongs to is already encoded in its path.
function eyebrowFor(page) {
  const p = page.path;
  if (p === "/") return "Independent AI software studio";
  if (p.startsWith("/solutions/")) return "Website concept";
  if (p === "/solutions" || p === "/website-solutions") return "Design & build";
  // Never "Skylanex" here — it would sit directly under the wordmark, spending the
  // card's one label on a word the mark above it already says.
  const named = {
    "/services": "What I do",
    "/work": "Selected work",
    "/about": "About the studio",
    "/contact": "Start a project",
  };
  return named[p] || "AI services";
}

// The home page has no `title` (its <title> is the brand line), so it needs its own
// headline — "Skylanex" alone would waste the largest type on the card on a word the
// wordmark already says.
function headlineFor(page) {
  if (page.path === "/") return "I build intelligent software that ships.";
  return page.title || site.name;
}

function subFor(page) {
  const d = String(page.description || "");
  if (d.length <= 120) return d;
  // Cut on a word boundary; a mid-word ellipsis reads as a rendering bug.
  return d.slice(0, 119).replace(/\s+\S*$/, "") + "…";
}

function cardHtml(page) {
  const headline = headlineFor(page);
  // Long headlines need to step down or they overflow the card. Three buckets beat a
  // continuous scale here: the type stays on a rhythm instead of landing on arbitrary
  // sizes that make a row of cards look inconsistent.
  const size = headline.length > 52 ? 54 : headline.length > 30 ? 66 : 78;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    ${fontFace("Inter", "inter-var-latin.woff2", "400 800")}
    ${fontFace("Saira", "saira-var-latin.woff2", "500 800")}
    *{margin:0;padding:0;box-sizing:border-box}
    html,body{width:${W}px;height:${H}px;overflow:hidden}
    body{
      position:relative;
      font-family:"Inter",sans-serif;
      color:#e7eef5;
      background:
        radial-gradient(90% 70% at 82% 8%, rgba(21,79,121,.32) 0%, transparent 62%),
        radial-gradient(70% 60% at 6% 96%, rgba(5,50,70,.42) 0%, transparent 58%),
        #06090e;
    }
    /* The constellation, masked away from the type exactly as the site's hero does. */
    .plexus{position:absolute;inset:0;overflow:hidden;pointer-events:none;
      -webkit-mask-image:radial-gradient(120% 100% at 78% 22%, #000 0%, #000 42%, transparent 78%);
      mask-image:radial-gradient(120% 100% at 78% 22%, #000 0%, #000 42%, transparent 78%);}
    .plexus svg{width:100%;height:100%}
    .plexus-line{stroke:#61c7ff;stroke-width:1;opacity:.18}
    .plexus-node{fill:#a3b6cb;opacity:.55}
    .plexus-node--lit{fill:#5ee7ff;opacity:.95}
    .glow{position:absolute;border-radius:9999px;filter:blur(80px);pointer-events:none}
    .glow-a{left:50%;top:-18%;width:720px;height:420px;transform:translateX(-50%);background:rgba(21,143,224,.15)}
    .glow-b{right:-8%;top:16%;width:420px;height:320px;background:rgba(11,180,219,.10)}
    .wrap{position:relative;height:100%;display:flex;flex-direction:column;
      justify-content:space-between;padding:64px 72px}
    .brand{display:flex;align-items:center;gap:16px}
    .brand svg{width:52px;height:52px;color:#fff}
    .brand span{font-family:"Saira",sans-serif;font-weight:600;font-size:26px;
      letter-spacing:.22em;text-transform:uppercase;color:#fff;line-height:1}
    .eyebrow{font-family:"Saira",sans-serif;font-weight:600;font-size:17px;
      letter-spacing:.18em;text-transform:uppercase;color:#5ee7ff;margin-bottom:20px}
    h1{font-family:"Saira",sans-serif;font-weight:800;font-size:${size}px;line-height:1.06;
      letter-spacing:.005em;color:#fff;max-width:960px;text-wrap:balance}
    .sub{margin-top:22px;font-size:24px;line-height:1.45;color:#a3b6cb;max-width:820px}
    .foot{display:flex;align-items:flex-end;justify-content:space-between}
    .domain{font-family:"Saira",sans-serif;font-weight:600;font-size:19px;
      letter-spacing:.14em;text-transform:uppercase;color:#7389a4}
    /* The banner's diagonal, as a lit hairline — the same motif that seams the hero. */
    .chev{position:absolute;left:0;right:0;bottom:0;height:70px;pointer-events:none}
  </style></head><body>
    ${eagleSprite()}
    ${plexus({ nodes: 34, width: 1200, height: 630, seed: 11 })}
    <div class="glow glow-a"></div><div class="glow glow-b"></div>
    <svg class="chev" viewBox="0 0 1440 64" preserveAspectRatio="none" fill="none">
      <path d="M0 63.5 L1010 63.5 L1136 6 L1440 6" stroke="url(#g)" stroke-width="1.25"/>
      <defs><linearGradient id="g" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
        <stop stop-color="#61c7ff" stop-opacity="0"/>
        <stop offset=".62" stop-color="#61c7ff" stop-opacity=".5"/>
        <stop offset=".78" stop-color="#5ee7ff" stop-opacity=".85"/>
        <stop offset="1" stop-color="#61c7ff" stop-opacity=".08"/>
      </linearGradient></defs>
    </svg>
    <div class="wrap">
      <div class="brand">${mark("", "")}<span>Skylanex</span></div>
      <div>
        <p class="eyebrow">${esc(eyebrowFor(page))}</p>
        <h1>${esc(headline)}</h1>
        <p class="sub">${esc(subFor(page))}</p>
      </div>
      <div class="foot"><span class="domain">skylanex.com</span></div>
    </div>
  </body></html>`;
}

// JPEG, not PNG. Chrome only screenshots PNG, and its 24-bit output of a card that is
// mostly a smooth dark gradient runs ~256KB — 14MB across both committed copies of 27
// cards, and git would keep every regeneration of that forever. At q90 the same card is
// ~105KB with no visible difference, and every platform that reads og:image takes JPEG.
//
// `sips` is macOS-only, which matches this script's Chrome default; where it is missing
// the PNG is kept rather than failing, and CARD_EXT reflects what was actually written.
const HAS_SIPS = (() => {
  try {
    execFileSync("which", ["sips"], { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
})();
export const CARD_EXT = HAS_SIPS ? "jpg" : "png";

function shoot(page, tmpDir) {
  const slug = ogSlug(page.path);
  const htmlPath = path.join(tmpDir, `${slug}.html`);
  fs.writeFileSync(htmlPath, cardHtml(page), "utf8");
  const png = path.join(HAS_SIPS ? tmpDir : OUT, `${slug}.png`);
  execFileSync(
    CHROME,
    [
      "--headless",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      `--window-size=${W},${H}`,
      `--screenshot=${png}`,
      `file://${htmlPath}`,
    ],
    { stdio: "pipe" }
  );
  if (HAS_SIPS) {
    execFileSync(
      "sips",
      ["-s", "format", "jpeg", "-s", "formatOptions", "90", png, "--out", path.join(OUT, `${slug}.jpg`)],
      { stdio: "pipe" }
    );
  }
  return slug;
}

function main() {
  if (!fs.existsSync(CHROME)) {
    console.error(`Chrome not found at ${CHROME}. Set CHROME_PATH to override.`);
    process.exit(1);
  }
  const only = process.argv.slice(2);
  const targets = only.length ? pages.filter((p) => only.includes(p.path)) : pages;
  if (!targets.length) {
    console.error(`No page matched ${only.join(", ")}`);
    process.exit(1);
  }

  fs.mkdirSync(OUT, { recursive: true });
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "skx-og-"));
  try {
    for (const page of targets) {
      const slug = shoot(page, tmpDir);
      const kb = fs.statSync(path.join(OUT, `${slug}.${CARD_EXT}`)).size / 1024;
      console.log(`  • ${slug}.${CARD_EXT}  ${kb.toFixed(0)}kb`);
    }
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
  console.log(`✅ ${targets.length} card(s) → assets/images/og/  (run \`npm run build\` to copy into dist/)`);
}

main();
