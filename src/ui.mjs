// ui.mjs — reusable content snippets shared across pages.
import { icon } from "./layout.mjs";
import { site, stats as statData } from "../site.config.mjs";

export function heading({ eyebrow, title, sub, center = true, light = false }) {
  return `<div class="${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}">
    ${eyebrow ? `<p class="eyebrow mb-3 text-primary-400">${eyebrow}</p>` : ""}
    <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">${title}</h2>
    ${sub ? `<p class="mt-4 text-lg leading-relaxed text-surface-300">${sub}</p>` : ""}
  </div>`;
}

export function ctaBand({ title, sub, primaryLabel = "Start a project", primaryHref = "/contact" } = {}) {
  return `<section class="px-5 pb-24 sm:px-8">
    <div class="reveal relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-primary-500/20 bg-gradient-to-br from-primary-900 via-surface-900 to-surface-950 px-6 py-14 text-center sm:px-12">
      <div class="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-accent-500/10 blur-3xl"></div>
      <div class="relative">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">${title || "Let’s build something intelligent"}</h2>
        <p class="mx-auto mt-4 max-w-xl text-lg text-surface-300">${sub || "Tell me what you’re working on — I’ll tell you honestly whether AI is the right tool, and how I’d build it."}</p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="${primaryHref}" class="btn btn-primary">${primaryLabel} ${icon("arrow", "h-4 w-4")}</a>
          <a href="mailto:${site.email}" class="btn btn-ghost">Email me</a>
        </div>
      </div>
    </div>
  </section>`;
}

export function statRow() {
  return `<section class="border-y border-surface-800 bg-surface-950 px-5 py-14 sm:px-8">
    <div class="mx-auto grid max-w-5xl grid-cols-2 gap-8 text-center sm:grid-cols-4">
      ${statData
        .map(
          (s) => `<div class="reveal">
        <p class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">${s.value}</p>
        <p class="mt-1 text-sm text-surface-400">${s.label}</p>
      </div>`
        )
        .join("")}
    </div>
  </section>`;
}

// The banner's constellation field, as markup.
//
// Laid out with a SEEDED prng, never Math.random: a static site generator that emits
// different markup on every run makes diffs unreadable and busts caches for nothing.
// Same seed in, same field out, forever.
//
// Edges connect any two nodes within a radius rather than each node to its nearest N.
// Nearest-N gives every node the same degree, which reads as a woven mesh; a radius
// leaves the clusters and empty stretches that make the banner's network look like a
// constellation. Line opacity falls off with length for the same reason — uniformly
// bright edges flatten it.
export function plexus({ nodes = 38, width = 900, height = 560, seed = 7 } = {}) {
  let s = seed >>> 0;
  const rnd = () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
  const pts = Array.from({ length: nodes }, () => ({
    x: rnd() * width,
    y: rnd() * height,
    lit: rnd() > 0.84,
    r: 1.4 + rnd() * 1.9,
  }));

  const LINK = Math.min(width, height) * 0.3;
  const lines = [];
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
      if (d >= LINK) continue;
      const o = (1 - d / LINK) * 0.22;
      lines.push(
        `<line class="plexus-line" x1="${pts[i].x.toFixed(1)}" y1="${pts[i].y.toFixed(1)}" x2="${pts[j].x.toFixed(1)}" y2="${pts[j].y.toFixed(1)}" style="opacity:${o.toFixed(3)}"/>`
      );
    }
  }
  const dots = pts
    .map(
      (p) =>
        `<circle class="plexus-node${p.lit ? " plexus-node--lit" : ""}" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${(p.lit ? p.r * 1.25 : p.r).toFixed(2)}"/>`
    )
    .join("");

  return `<div class="plexus" aria-hidden="true">
    <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid slice" fill="none">
      <g>${lines.join("")}</g>
      <g>${dots}</g>
    </svg>
  </div>`;
}

// Hero container: the deep blue-black field, the constellation, and the two soft
// blooms that keep the corners from going dead flat.
//
// `pb-10` is the seam's breathing room, and it belongs HERE rather than as a `pt` on
// each page's first section. The diagonal below runs flat along the hero's bottom
// edge for most of its width, so any following content that starts at the hero's
// bottom lands exactly on that line — which is what every page whose first section
// declared only `pb-*` was doing. Fixing it per page works until the next page is
// added with the same shape, and the failure is subtle enough to ship unnoticed.
export function heroGlow(inner) {
  return `<section class="brand-field relative overflow-hidden pb-10">
    ${plexus()}
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute left-1/2 top-[-10%] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary-600/15 blur-3xl"></div>
      <div class="absolute right-[-10%] top-[20%] h-[320px] w-[420px] rounded-full bg-accent-500/10 blur-3xl"></div>
    </div>
    <div class="relative">${inner}</div>
    ${chevronRule()}
  </section>`;
}

// The banner's diagonal, as the seam under the hero.
//
// A lit hairline rather than a filled wedge: in the banner the diagonal is where two
// near-black panels meet and catch an edge of light, so what you actually read is the
// LINE, not a shape. Filling it turns the hero into a badge.
//
// Purely decorative, so it is aria-hidden and cannot take pointer events away from
// anything under it.
//
// `bottom-10`, matching the hero's `pb-10` — NOT `bottom-0`. An absolutely positioned
// element resolves its offsets against the containing block's PADDING box, so
// `bottom-0` would sit flush at the section's bottom edge and slide down with any
// padding added above it, leaving the seam touching whatever follows. Offsetting it by
// the same amount is what actually puts clear field between the line and the next
// section. Keep the two values in step.
export function chevronRule() {
  return `<div class="pointer-events-none absolute inset-x-0 bottom-10 h-16 overflow-hidden" aria-hidden="true">
    <svg class="absolute inset-0 h-full w-full" viewBox="0 0 1440 64" preserveAspectRatio="none" fill="none">
      <path d="M0 63.5 L1010 63.5 L1136 6 L1440 6" stroke="url(#skx-chev)" stroke-width="1.25"/>
      <defs>
        <linearGradient id="skx-chev" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
          <stop stop-color="var(--color-primary-400)" stop-opacity="0"/>
          <stop offset="0.62" stop-color="var(--color-primary-400)" stop-opacity="0.5"/>
          <stop offset="0.78" stop-color="var(--color-accent-300)" stop-opacity="0.85"/>
          <stop offset="1" stop-color="var(--color-primary-400)" stop-opacity="0.08"/>
        </linearGradient>
      </defs>
    </svg>
  </div>`;
}
