// build.mjs — static site generator.
// Renders every page through the shared layout into dist/*.html, copies assets,
// and writes a 404 + robots + sitemap. Tailwind builds dist/css/app.css separately.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { layout } from "./src/layout.mjs";
import { site, nav } from "./site.config.mjs";
import { orgGraph, jsonLdForPage } from "./src/seo.mjs";
import { home } from "./src/pages/home.mjs";
import { servicesPage } from "./src/pages/services.mjs";
import { servicePages } from "./src/pages/service.mjs";
import { solutionsPage } from "./src/pages/solutions.mjs";
import { palettesPage } from "./src/pages/palettes.mjs";
import { industryLandingPages } from "./src/pages/industry.mjs";
import { workPage } from "./src/pages/work.mjs";
import { aboutPage } from "./src/pages/about.mjs";
import { contactPage } from "./src/pages/contact.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "dist");

const pages = [home, servicesPage, ...servicePages, solutionsPage, ...industryLandingPages, palettesPage, workPage, aboutPage, contactPage];

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

function build() {
  rmrf(DIST);
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
  // Videos are ~76MB. dist/ is committed, so dist/videos is gitignored and prod
  // re-creates it from assets/ during deploy — see deploy/prod-deploy.sh.
  copyDir(path.join(__dirname, "assets", "videos"), path.join(DIST, "videos"));

  // robots + sitemap
  fs.writeFileSync(
    path.join(DIST, "robots.txt"),
    `User-agent: *\nAllow: /\nSitemap: ${site.domain}/sitemap.xml\n`,
    "utf8"
  );
  const urls = pages.map((p) => (p.path === "/" ? "/" : p.path));
  fs.writeFileSync(
    path.join(DIST, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      urls
        .sort()
        .map((u) => `  <url><loc>${site.domain}${u}</loc><changefreq>monthly</changefreq></url>`)
        .join("\n") +
      `\n</urlset>\n`,
    "utf8"
  );

  console.log(`✅ Built ${pages.length} pages + 404, robots, sitemap → dist/`);
}

build();
