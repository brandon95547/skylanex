// ui.mjs — reusable content snippets shared across pages.
import { icon } from "./layout.mjs";
import { site, stats as statData } from "../site.config.mjs";

// Top padding for the section that directly follows a hero.
//
// Those sections used to declare only `pb-*`, which left their content with nothing
// above it and a gap below — so a filter-chip row read as part of the hero it was
// touching rather than as the control for the cards under it. Proximity decides
// grouping before anything else does, and the gap above a block has to beat the gap
// below it for the block to belong to what follows.
//
// It lives here rather than being typed into each page so the next page added after a
// hero starts correct, and so the whole set moves together if the rhythm changes.
// Deliberately NOT solved by padding the hero: that grows the hero's field and leaves
// the content welded to the boundary, just lower down.
export const afterHero = "pt-12 sm:pt-16";

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
      <div class="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-secondary-500/10 blur-3xl"></div>
      <div class="relative">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">${title || "Let’s build something intelligent"}</h2>
        <p class="mx-auto mt-4 max-w-xl text-lg text-surface-300">${sub || "Tell us what you’re working on — we’ll tell you honestly whether AI is the right tool, and how we’d build it."}</p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="${primaryHref}" class="btn btn-primary">${primaryLabel} ${icon("arrow", "h-4 w-4")}</a>
          <a href="mailto:${site.email}" class="btn btn-ghost">Email us</a>
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
export function heroGlow(inner) {
  return `<section class="brand-field relative overflow-hidden">
    ${plexus()}
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute left-1/2 top-[-10%] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary-600/15 blur-3xl"></div>
      <div class="absolute right-[-10%] top-[20%] h-[320px] w-[420px] rounded-full bg-secondary-500/10 blur-3xl"></div>
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
// Sits at the very bottom of the hero and is purely decorative, so it is aria-hidden
// and cannot take pointer events away from anything under it.
export function chevronRule() {
  return `<div class="pointer-events-none absolute inset-x-0 bottom-0 h-16 overflow-hidden" aria-hidden="true">
    <svg class="absolute inset-0 h-full w-full" viewBox="0 0 1440 64" preserveAspectRatio="none" fill="none">
      <path d="M0 63.5 L1010 63.5 L1136 6 L1440 6" stroke="url(#skx-chev)" stroke-width="1.25"/>
      <defs>
        <linearGradient id="skx-chev" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
          <stop stop-color="var(--color-primary-400)" stop-opacity="0"/>
          <stop offset="0.62" stop-color="var(--color-primary-400)" stop-opacity="0.5"/>
          <stop offset="0.78" stop-color="var(--color-secondary-300)" stop-opacity="0.85"/>
          <stop offset="1" stop-color="var(--color-primary-400)" stop-opacity="0.08"/>
        </linearGradient>
      </defs>
    </svg>
  </div>`;
}

// ── the hero's platform, and the CTA badge ──────────────────────────────────
//
// BOTH ARE PLACEHOLDERS FOR SUPPLIED ARTWORK. The mock's hero carries a rendered
// isometric platform — a floating plate with the mark lit on top, layered plates beneath
// and a light trail running off to the right — and its CTA carries a hexagonal badge.
// Neither is reproducible in SVG at the fidelity of the render, so these stand in: the
// same silhouette, the same weight in the layout, drawn from the brand mark and the token
// palette so the page reads finished rather than gappy.
//
// To replace: drop the asset in assets/images/ and swap the body of the function. Nothing
// else has to move — both are sized by their container, not by their own dimensions.

/** The isometric platform beside the hero headline. Placeholder — see above. */
export function heroArt() {
  return `<div class="pointer-events-none relative mx-auto w-full max-w-[520px] select-none" aria-hidden="true">
    <svg viewBox="0 0 520 420" class="w-full" fill="none">
      <defs>
        <linearGradient id="hp-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="var(--color-surface-700)"/>
          <stop offset="1" stop-color="var(--color-surface-900)"/>
        </linearGradient>
        <linearGradient id="hp-edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="var(--color-primary-500)"/>
          <stop offset="1" stop-color="var(--color-secondary-500)"/>
        </linearGradient>
        <radialGradient id="hp-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="var(--color-primary-500)" stop-opacity="0.42"/>
          <stop offset="1" stop-color="var(--color-primary-500)" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="262" cy="232" rx="215" ry="150" fill="url(#hp-glow)"/>
      <!-- Three plates, each a rhombus, offset downward. Isometric by construction:
           the two axes are the same length at the same angle, so nothing has to be
           perspective-corrected. -->
      <g opacity="0.35">
        <path d="M262 300 L438 348 L262 396 L86 348 Z" fill="url(#hp-face)" stroke="var(--color-surface-700)" stroke-width="1.5"/>
      </g>
      <g opacity="0.6">
        <path d="M262 250 L438 298 L262 346 L86 298 Z" fill="url(#hp-face)" stroke="var(--color-surface-700)" stroke-width="1.5"/>
      </g>
      <path d="M262 186 L438 234 L262 282 L86 234 Z" fill="url(#hp-face)" stroke="url(#hp-edge)" stroke-width="2"/>
      <path d="M262 282 L262 300 M86 234 L86 252 M438 234 L438 252" stroke="var(--color-surface-700)" stroke-width="2"/>
      <!-- The light trail the render carries off the right edge. -->
      <path d="M438 244 C 470 244, 486 214, 516 214" stroke="url(#hp-edge)" stroke-width="2" stroke-linecap="round" opacity="0.85"/>
      <g transform="translate(262 232) scale(0.115) translate(-576 -462)">
        <use href="#skx-eagle" fill="var(--color-primary-400)"/>
      </g>
      <g fill="var(--color-secondary-300)">
        <circle cx="470" cy="120" r="3" opacity="0.8"/><circle cx="70" cy="150" r="2.4" opacity="0.55"/>
        <circle cx="418" cy="72" r="2" opacity="0.5"/><circle cx="132" cy="76" r="2.6" opacity="0.6"/>
        <circle cx="492" cy="300" r="2.2" opacity="0.45"/>
      </g>
    </svg>
  </div>`;
}

/** The hexagon badge in the CTA band. Placeholder — see above. */
export function ctaBadge(cls = "h-24 w-24") {
  return `<span class="relative grid ${cls} shrink-0 place-items-center" aria-hidden="true">
    <svg viewBox="0 0 120 120" class="absolute inset-0 h-full w-full" fill="none">
      <defs>
        <linearGradient id="cb-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="var(--color-primary-400)"/>
          <stop offset="1" stop-color="var(--color-secondary-400)"/>
        </linearGradient>
      </defs>
      <path d="M60 6 L107 33 L107 87 L60 114 L13 87 L13 33 Z"
        fill="color-mix(in oklab, var(--color-primary-500) 12%, transparent)"
        stroke="url(#cb-edge)" stroke-width="2"/>
    </svg>
    <svg viewBox="0 0 1152 924" class="relative h-1/2 w-1/2 text-primary-300"><use href="#skx-eagle"/></svg>
  </span>`;
}
