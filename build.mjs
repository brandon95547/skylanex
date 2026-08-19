// build.mjs — static site generator.
// Renders every page through the shared layout into dist/*.html, copies assets,
// and writes a 404 + robots + sitemap. Tailwind builds dist/css/app.css separately.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { layout } from "./src/layout.mjs";
import { site, nav, services, designSolutions, industryPages } from "./site.config.mjs";
import { orgGraph, jsonLdForPage } from "./src/seo.mjs";
import { pages } from "./src/pages-index.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "dist");

// Dev mode (set by dev.mjs): skip the destructive clean and the heavy video
// copy so incremental HTML rebuilds are fast and don't race the tailwind watcher
// that owns dist/css/app.css.
const DEV = !!process.env.SKYLANEX_DEV;

function rmrf(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    entry.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}

// Per-URL <lastmod>, read from git rather than invented.
//
// dist/ is committed, so a built page's own commit date IS the date its output last
// changed — no per-page wiring, and it can't drift from the content the way a hand-kept
// date would. Two cases the naive version gets wrong:
//
//   - a page whose output differs from HEAD has changed NOW but has no commit yet, so
//     its committed date would be stale by exactly one deploy. Those get today.
//   - a build date for every page would claim the whole site changed on every rebuild,
//     which is the same as telling a crawler nothing.
//
// Falls back to today's date if git isn't available (a tarball checkout, say) — a wrong
// lastmod is worse than none, but an absent one costs the recrawl signal entirely.
function gitLastModified() {
  const git = (args) => execFileSync("git", args, { cwd: __dirname, encoding: "utf8" });
  const today = new Date().toISOString().slice(0, 10);
  const dates = new Map();
  try {
    // One walk of the history, newest commit first: the first time a path appears is
    // its most recent change. 27 pages x one `git log` each would be 27 processes.
    let when = null;
    for (const line of git(["log", "--format=%cI", "--name-only", "--", "dist"]).split("\n")) {
      const text = line.trim();
      if (!text) continue;
      if (/^\d{4}-\d{2}-\d{2}T/.test(text)) when = text.slice(0, 10);
      else if (when && !dates.has(text)) dates.set(text, when);
    }
    // Anything modified or untracked relative to HEAD changed in this build.
    for (const line of git(["status", "--porcelain", "--", "dist"]).split("\n")) {
      const file = line.slice(3).trim();
      if (file) dates.set(file, today);
    }
  } catch {
    return () => today;
  }
  return (rel) => dates.get(`dist/${rel}`) || today;
}

function build() {
  if (!DEV) rmrf(DIST);
  fs.mkdirSync(path.join(DIST, "css"), { recursive: true });

  // Render pages. Clean URLs via directory-index files:
  //   "/"        -> index.html
  //   "/services"-> services/index.html   (works on any static host)
  for (const page of pages) {
    const html = layout({
      title: page.title,
      metaTitle: page.metaTitle,
      description: page.description,
      path: page.path,
      content: page.render(),
      jsonLd: [orgGraph(), ...jsonLdForPage(page)],
    });
    const rel = page.path === "/" ? "index.html" : path.join(page.path.replace(/^\//, ""), "index.html");
    const out = path.join(DIST, rel);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html, "utf8");
    console.log("  •", rel, `(${(html.length / 1024).toFixed(1)}kb)`);
  }

  // 404
  fs.writeFileSync(
    path.join(DIST, "404.html"),
    layout({
      title: "Not found",
      path: "/404",
      content: `<section class="mx-auto flex max-w-lg flex-col items-center px-5 py-32 text-center">
        <p class="grad-text text-7xl font-extrabold">404</p>
        <h1 class="mt-4 text-2xl font-bold text-white">Page not found</h1>
        <p class="mt-2 text-surface-400">That page moved or never existed.</p>
        <a href="/" class="btn btn-primary mt-6">Back home</a>
      </section>`,
    }),
    "utf8"
  );

  // Assets
  copyDir(path.join(__dirname, "assets", "js"), path.join(DIST, "js"));
  copyDir(path.join(__dirname, "assets", "images"), path.join(DIST, "images"));
  copyDir(path.join(__dirname, "assets", "fonts"), path.join(DIST, "fonts"));
  // Videos are ~76MB. dist/ is committed, so dist/videos is gitignored and prod
  // re-creates it from assets/ during deploy — see deploy/prod-deploy.sh.
  // In dev the startup build already copied them; skip on incremental rebuilds.
  if (!DEV) copyDir(path.join(__dirname, "assets", "videos"), path.join(DIST, "videos"));

  // robots + sitemap
  fs.writeFileSync(
    path.join(DIST, "robots.txt"),
    `User-agent: *\nAllow: /\nSitemap: ${site.domain}/sitemap.xml\n`,
    "utf8"
  );

  // llms.txt — a curated markdown map for LLMs (llmstxt.org). Helps AI engines
  // understand what Skylanex is and find the canonical pages. Generated from the
  // same config as the site so it never drifts.
  const abs = (p) => `${site.domain}${p}`;
  const llms =
    `# Skylanex\n\n` +
    `> ${site.description}\n\n` +
    `Skylanex is an independent AI software studio led by ${site.owner}. We design and build websites, web and mobile apps, custom CRMs, dashboards, AI assistants, and e-commerce storefronts, and provide AI services from machine learning and NLP to computer vision. Contact: ${site.email}.\n\n` +
    `## Services\n` +
    services.map((s) => `- [${s.eyebrow}](${abs("/" + s.slug)}): ${s.summary}`).join("\n") +
    `\n\n## Design & build solutions\n` +
    designSolutions.map((s) => `- [${s.name}](${abs("/solutions#" + s.slug)}): ${s.summary}`).join("\n") +
    `\n\n## Website solutions by industry\n` +
    industryPages.map((p) => `- [${p.eyebrow}](${abs("/solutions/" + p.slug)}): ${p.description}`).join("\n") +
    `\n\n## Key pages\n` +
    [
      ["Solutions", "/solutions"],
      ["Websites built for your industry", "/website-solutions"],
      ["Services", "/services"],
      ["Work", "/work"],
      ["About", "/about"],
      ["Contact", "/contact"],
    ]
      .map(([name, p]) => `- [${name}](${abs(p)})`)
      .join("\n") +
    `\n`;
  fs.writeFileSync(path.join(DIST, "llms.txt"), llms, "utf8");

  // `changefreq` is deliberately absent: Google states outright that it ignores the
  // field, so emitting it only invited someone to keep it accurate for nothing.
  const lastModified = gitLastModified();
  const urls = pages.map((p) => (p.path === "/" ? "/" : p.path));
  fs.writeFileSync(
    path.join(DIST, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      urls
        .sort()
        .map((u) => {
          const rel = u === "/" ? "index.html" : `${u.replace(/^\//, "")}/index.html`;
          return `  <url><loc>${site.domain}${u}</loc><lastmod>${lastModified(rel)}</lastmod></url>`;
        })
        .join("\n") +
      `\n</urlset>\n`,
    "utf8"
  );

  console.log(`✅ Built ${pages.length} pages + 404, robots, sitemap, llms.txt → dist/`);
}

build();
