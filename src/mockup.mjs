// mockup.mjs — renders a miniature, fully-styled website preview from a palette.
//
// Every mockup is real HTML in a browser frame, not a screenshot: the eight
// palette tokens are injected as CSS custom properties on the wrapper and the
// `.mk-*` rules in src/styles/app.css read them. That means a palette change is
// a one-line data edit, the previews stay crisp at any size, and the page ships
// no image bytes.
//
// Sizing is done entirely in container-query units (`cqw`) against `.mk` — see
// the design-width note in app.css — so one markup tree scales from a 320px
// phone card to a full-width feature panel with identical proportions.

import { palettes } from "../site.config.mjs";

export function paletteBySlug(slug) {
  return palettes.find((p) => p.slug === slug);
}

function vars(c) {
  return [
    `--mk-bg:${c.bg}`,
    `--mk-surface:${c.surface}`,
    `--mk-border:${c.border}`,
    `--mk-text:${c.text}`,
    `--mk-muted:${c.muted}`,
    `--mk-primary:${c.primary}`,
    `--mk-on-primary:${c.onPrimary}`,
    `--mk-accent:${c.accent}`,
  ].join(";");
}

/* ---------------------------------------------------------------- */
/* Abstract "photography" — geometric stand-ins drawn from the       */
/* palette itself, so an art block can never clash with its scheme.  */
/* ---------------------------------------------------------------- */
const ART = {
  arches: `<svg viewBox="0 0 100 76" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="100" height="76" fill="var(--mk-surface)"/>
    <path d="M0 76V34a18 18 0 0 1 36 0v42z" fill="var(--mk-primary)" opacity=".18"/>
    <path d="M32 76V26a22 22 0 0 1 44 0v50z" fill="var(--mk-primary)" opacity=".38"/>
    <path d="M70 76V44a15 15 0 0 1 30 0v32z" fill="var(--mk-accent)" opacity=".55"/>
    <rect y="70" width="100" height="6" fill="var(--mk-primary)"/>
  </svg>`,
  grid: `<svg viewBox="0 0 100 76" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="100" height="76" fill="var(--mk-surface)"/>
    <g stroke="var(--mk-primary)" stroke-width=".4" opacity=".3">
      ${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 12.5} 0V76"/>`).join("")}
      ${Array.from({ length: 7 }, (_, i) => `<path d="M0 ${i * 12.5}H100"/>`).join("")}
    </g>
    <rect x="14" y="30" width="34" height="34" fill="var(--mk-primary)" opacity=".85"/>
    <rect x="52" y="14" width="26" height="50" fill="var(--mk-accent)" opacity=".9"/>
    <path d="M14 22h64" stroke="var(--mk-accent)" stroke-width="1"/>
    <path d="M14 19v6M78 19v6" stroke="var(--mk-accent)" stroke-width="1"/>
  </svg>`,
  waves: `<svg viewBox="0 0 100 76" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="100" height="76" fill="var(--mk-surface)"/>
    <path d="M0 52c22-18 38 10 60-4s28-6 40-12v40H0z" fill="var(--mk-primary)" opacity=".22"/>
    <path d="M0 62c26-16 40 8 62-6s26-2 38-8v28H0z" fill="var(--mk-primary)" opacity=".5"/>
    <path d="M0 70c24-10 44 6 66-4s22 0 34-4v14H0z" fill="var(--mk-accent)" opacity=".8"/>
    <circle cx="76" cy="19" r="9" fill="var(--mk-accent)" opacity=".45"/>
  </svg>`,
  tiles: `<svg viewBox="0 0 100 76" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="100" height="76" fill="var(--mk-surface)"/>
    <rect x="6" y="8" width="42" height="30" rx="2" fill="var(--mk-primary)" opacity=".9"/>
    <rect x="54" y="8" width="40" height="46" rx="2" fill="var(--mk-primary)" opacity=".3"/>
    <rect x="6" y="44" width="42" height="26" rx="2" fill="var(--mk-accent)" opacity=".75"/>
    <rect x="54" y="60" width="40" height="10" rx="2" fill="var(--mk-accent)" opacity=".35"/>
  </svg>`,
  // The two below are drawn at their container's exact ratio. A 4:3 artwork
  // sliced into a letterbox band loses its whole composition, so wide slots get
  // wide art rather than a crop.
  band: `<svg viewBox="0 0 100 22" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="100" height="22" fill="var(--mk-surface)"/>
    <path d="M4 22V10a6 6 0 0 1 12 0v12z" fill="var(--mk-primary)" opacity=".22"/>
    <path d="M20 22V7a7 7 0 0 1 14 0v15z" fill="var(--mk-primary)" opacity=".45"/>
    <path d="M38 22V4a8 8 0 0 1 16 0v18z" fill="var(--mk-primary)" opacity=".72"/>
    <path d="M58 22V7a7 7 0 0 1 14 0v15z" fill="var(--mk-accent)" opacity=".55"/>
    <path d="M76 22V10a6 6 0 0 1 12 0v12z" fill="var(--mk-accent)" opacity=".3"/>
    <rect y="20.6" width="100" height="1.4" fill="var(--mk-primary)"/>
  </svg>`,
  panel: `<svg viewBox="0 0 100 32" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="100" height="32" fill="var(--mk-surface)"/>
    <rect x="6" y="18" width="7" height="10" rx="1" fill="var(--mk-primary)" opacity=".45"/>
    <rect x="16" y="12" width="7" height="16" rx="1" fill="var(--mk-primary)" opacity=".65"/>
    <rect x="26" y="20" width="7" height="8" rx="1" fill="var(--mk-primary)" opacity=".45"/>
    <rect x="36" y="8" width="7" height="20" rx="1" fill="var(--mk-primary)"/>
    <rect x="46" y="14" width="7" height="14" rx="1" fill="var(--mk-primary)" opacity=".6"/>
    <path d="M4 29.4h52" stroke="var(--mk-border)" stroke-width=".5"/>
    <rect x="62" y="5" width="34" height="23" rx="2" fill="none" stroke="var(--mk-border)" stroke-width=".6"/>
    <polyline points="66,23 72,17 78,20 84,11 92,8" fill="none" stroke="var(--mk-accent)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="92" cy="8" r="1.6" fill="var(--mk-accent)"/>
  </svg>`,
};

function art(kind = "tiles") {
  return `<div class="mk-art">${ART[kind] || ART.tiles}</div>`;
}

/* ---------------------------------------------------------------- */
/* Shared chrome                                                     */
/* ---------------------------------------------------------------- */
function bar(d, { serif = false, solid = false } = {}) {
  return `<div class="mk-bar${solid ? " mk-bar--solid" : ""}">
    <span class="mk-brand${serif ? " mk-serif" : ""}">${d.brand}</span>
    <span class="mk-nav">${d.nav.map((n) => `<span>${n}</span>`).join("")}</span>
    <span class="mk-btn mk-btn--sm">${d.cta}</span>
  </div>`;
}

function stats(d, mod = "") {
  return `<div class="mk-strip${mod}">
    ${d.stats.map((s) => `<span class="mk-stat"><b>${s.v}</b><i>${s.l}</i></span>`).join("")}
  </div>`;
}

function cards(d, { rule = false } = {}) {
  return `<div class="mk-cards">
    ${d.items
      .map(
        (i) => `<div class="mk-card">
      ${rule ? '<span class="mk-card__rule"></span>' : '<span class="mk-card__dot"></span>'}
      <b>${i.t}</b><i>${i.d}</i>
    </div>`
      )
      .join("")}
  </div>`;
}

function actions(d, { ghost = true } = {}) {
  return `<div class="mk-actions">
    <span class="mk-btn">${d.cta}</span>
    ${ghost && d.cta2 ? `<span class="mk-btn mk-btn--ghost">${d.cta2}</span>` : ""}
  </div>`;
}

/* ---------------------------------------------------------------- */
/* Layout variants — five distinct page architectures, so sixteen    */
/* palettes never read as sixteen copies of one template.            */
/* ---------------------------------------------------------------- */
const VARIANTS = {
  // Centered serif hero over a credential strip. The law-firm archetype.
  classic: (d) => `
    ${bar(d, { serif: true })}
    <div class="mk-hero mk-hero--center">
      <span class="mk-eyebrow">${d.eyebrow}</span>
      <h4 class="mk-h1 mk-serif">${d.headline}</h4>
      <p class="mk-sub">${d.sub}</p>
      ${actions(d)}
    </div>
    ${stats(d, " mk-strip--bordered")}
    ${cards(d, { rule: true })}`,

  // Slab headline against a full-bleed art block, numbers on a solid band.
  bold: (d) => `
    ${bar(d, { solid: true })}
    <div class="mk-split">
      <div class="mk-split__copy">
        <span class="mk-eyebrow mk-eyebrow--accent">${d.eyebrow}</span>
        <h4 class="mk-h1 mk-h1--slab">${d.headline}</h4>
        <p class="mk-sub">${d.sub}</p>
        ${actions(d)}
      </div>
      ${art("grid")}
    </div>
    ${stats(d, " mk-strip--solid")}
    ${cards(d)}`,

  // Copy left, art right, with a floating proof card. The service-business default.
  split: (d) => `
    ${bar(d)}
    <div class="mk-split">
      <div class="mk-split__copy">
        <span class="mk-eyebrow">${d.eyebrow}</span>
        <h4 class="mk-h1">${d.headline}</h4>
        <p class="mk-sub">${d.sub}</p>
        ${actions(d)}
      </div>
      <div class="mk-split__art">
        ${art("waves")}
        <span class="mk-float"><b>${d.stats[0].v}</b><i>${d.stats[0].l}</i></span>
      </div>
    </div>
    ${cards(d)}`,

  // Wide-tracked serif over a full-width art band. Hospitality and lifestyle.
  editorial: (d) => `
    ${bar(d, { serif: true })}
    <div class="mk-hero mk-hero--center mk-hero--tight">
      <span class="mk-eyebrow">${d.eyebrow}</span>
      <h4 class="mk-h1 mk-serif mk-h1--wide">${d.headline}</h4>
      <p class="mk-sub">${d.sub}</p>
      ${actions(d)}
    </div>
    <div class="mk-band">${art("band")}</div>
    ${stats(d, " mk-strip--bordered")}`,

  // Left-aligned, enormous whitespace, one CTA, a product panel below. SaaS.
  minimal: (d) => `
    ${bar(d)}
    <div class="mk-hero mk-hero--left">
      <span class="mk-eyebrow">${d.eyebrow}</span>
      <h4 class="mk-h1">${d.headline}</h4>
      <p class="mk-sub">${d.sub}</p>
      ${actions(d)}
    </div>
    <div class="mk-panel">
      <div class="mk-panel__side">${d.items.map((i) => `<span>${i.t}</span>`).join("")}</div>
      <div class="mk-panel__body">
        ${art("panel")}
        ${stats(d, " mk-strip--inset")}
      </div>
    </div>`,
};

/**
 * Render one website preview.
 * @param {object} palette  a palettes[] entry
 * @param {object} [opts]   { variant, demo, label } — override the palette's own
 *                          variant/demo when an industry card supplies its copy.
 */
export function mockup(palette, opts = {}) {
  const demo = opts.demo || palette.demo;
  const build = VARIANTS[opts.variant || palette.variant] || VARIANTS.split;
  return `<div class="mk" style="${vars(palette.colors)}" role="img" aria-label="${opts.label || `Website design preview in the ${palette.name} color scheme`}">
    <div class="mk-chrome" aria-hidden="true">
      <span class="mk-dot"></span><span class="mk-dot"></span><span class="mk-dot"></span>
      <span class="mk-url">${demo.domain}</span>
    </div>
    <div class="mk-canvas" aria-hidden="true">${build(demo)}</div>
  </div>`;
}

// Ordered token strip shown above each palette's preview.
// Labels stay short on purpose — seven of them share one card width, so
// "Background" would collide with its neighbour long before it wrapped.
const SWATCH_KEYS = [
  ["bg", "BG"],
  ["surface", "Surface"],
  ["text", "Text"],
  ["muted", "Muted"],
  ["border", "Border"],
  ["primary", "Primary"],
  ["accent", "Accent"],
];

export function swatches(palette) {
  return `<div class="mk-swatches">
    ${SWATCH_KEYS.map(([key, label]) => {
      const hex = palette.colors[key];
      return `<div class="mk-swatch">
        <span class="mk-swatch__chip" style="background:${hex}"></span>
        <span class="mk-swatch__label">${label}</span>
        <span class="mk-swatch__hex">${hex.toUpperCase()}</span>
      </div>`;
    }).join("")}
  </div>`;
}
