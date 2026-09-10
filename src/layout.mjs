// layout.mjs — HTML shell (head, nav, mobile menu, footer) + icon set.
import { site, nav } from "../site.config.mjs";
import { ogSlug } from "./seo.mjs";

/* ---- inline SVG icons (stroke = currentColor) ---- */
const ICONS = {
  arrow: '<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>',
  app: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 7h6"/><path d="M9 11h6"/><path d="M9 15h4"/>',
  network: '<circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M12 7.5v4M12 11.5l-5 5M12 11.5l5 5"/>',
  workflow: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><path d="M10 6.5h5a2 2 0 0 1 2 2V14"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>',
  shield: '<path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"/><path d="M9 12l2 2 4-4"/>',
  external: '<path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/>',
  phone: '<path d="M4 4h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 2 6a2 2 0 0 1 2-2z"/>',
  play: '<path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" stroke="none"/>',
  pause: '<path d="M8.5 5h2.5v14H8.5zM13 5h2.5v14H13z" fill="currentColor" stroke="none"/>',
  headphones: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="2.5" y="14" width="4.5" height="6" rx="1.75"/><rect x="17" y="14" width="4.5" height="6" rx="1.75"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  /* industry marks for /solutions */
  scale: '<path d="M12 3.5v17"/><path d="M6 7h12"/><path d="M6 7l-3 6h6l-3-6z"/><path d="M18 7l-3 6h6l-3-6z"/><path d="M8.5 20.5h7"/>',
  hardhat: '<path d="M3.5 18.5h17"/><path d="M6 18.5v-3.2a6 6 0 0 1 12 0v3.2"/><path d="M9.5 10V5.8A1.8 1.8 0 0 1 11.3 4h1.4A1.8 1.8 0 0 1 14.5 5.8V10"/>',
  pulse: '<circle cx="12" cy="12" r="9"/><path d="M7.5 12h2l1.5-3 2 6 1.5-3h2"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7.2V12l3.4 2"/>',
  wrench: '<path d="M15.6 3.3a5.2 5.2 0 0 0-6 6.7L3 16.6V21h4.4l6.6-6.6a5.2 5.2 0 0 0 6.7-6l-3.2 3.2-2.9-.7-.7-2.9 3.2-3.2z"/>',
  home: '<path d="M3 10.6L12 3.2l9 7.4"/><path d="M5.6 9.4V20a1 1 0 0 0 1 1h10.8a1 1 0 0 0 1-1V9.4"/><path d="M9.8 21v-6.2h4.4V21"/>',
  utensils: '<path d="M6 3v6.5a2 2 0 0 0 4 0V3"/><path d="M8 11.5V21"/><path d="M17.5 3c1.4 1.7 2 3.7 2 6 0 1.9-.7 3-2 3V21"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13.5" rx="2"/><path d="M9 7V5.2A2.2 2.2 0 0 1 11.2 3h1.6A2.2 2.2 0 0 1 15 5.2V7"/><path d="M3 12.5h18"/>',
  dumbbell: '<path d="M4 9.5v5M7.2 6.5v11M16.8 6.5v11M20 9.5v5M7.2 12h9.6"/>',
  palette:
    '<path d="M12 3.2a8.8 8.8 0 1 0 0 17.6c1 0 1.8-.8 1.8-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.1 0-1 .8-1.8 1.8-1.8h1.5a4.7 4.7 0 0 0 4.7-4.7c0-3.9-4-7-8.8-7z"/><circle cx="7.6" cy="12.2" r=".9"/><circle cx="9.6" cy="8.4" r=".9"/><circle cx="14" cy="7.8" r=".9"/><circle cx="17.2" cy="11" r=".9"/>',
  layers: '<path d="M12 3.2l8.6 4.6L12 12.4 3.4 7.8 12 3.2z"/><path d="M3.4 12.4L12 17l8.6-4.6"/><path d="M3.4 16.6L12 21.2l8.6-4.6"/>',
  // Added for the product grid, where each card carries the mark of what it is.
  grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.6"/>',
  mic: '<rect x="9" y="2.8" width="6" height="11" rx="3"/><path d="M5.5 11.2a6.5 6.5 0 0 0 13 0"/><path d="M12 17.7v3.5"/>',
  clapper: '<path d="M3 9.5h18v9.3a1.7 1.7 0 0 1-1.7 1.7H4.7A1.7 1.7 0 0 1 3 18.8V9.5z"/><path d="M3.6 9.5l-.5-3.2 17.8-2.8.5 3.2-17.8 2.8z"/><path d="M8.4 5.1l1.5 3.9M13.6 4.3l1.5 3.9"/>',
  book: '<path d="M4 4.8A1.8 1.8 0 0 1 5.8 3H19v15.6H5.8A1.8 1.8 0 0 0 4 20.4V4.8z"/><path d="M4 18.6A1.8 1.8 0 0 0 5.8 21H19"/><path d="M8.2 7.6h6.6M8.2 11h4.4"/>',
  sliders: '<path d="M4 7.5h10M18.5 7.5H20"/><path d="M4 16.5h4M12.5 16.5H20"/><circle cx="16" cy="7.5" r="2.3"/><circle cx="10" cy="16.5" r="2.3"/>',
  dots: '<circle cx="6" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="18" cy="12" r="1.5" fill="currentColor" stroke="none"/>',
  // Added for the redesigned home page: the hero's assurance pills, the stat row, and the
  // footer's social links.
  checkCircle: '<circle cx="12" cy="12" r="8.6"/><path d="M8.6 12.2l2.4 2.4 4.4-4.8"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.2"/><path d="M3.5 9.6h17M8.4 3.2v3.6M15.6 3.2v3.6"/>',
  rocket: '<path d="M12 3.2c3.2 2 5 5.3 5 9.1 0 1.4-.2 2.6-.6 3.7H7.6c-.4-1.1-.6-2.3-.6-3.7 0-3.8 1.8-7.1 5-9.1z"/><circle cx="12" cy="10.2" r="1.9"/><path d="M7.6 16c-1.6 1-2.5 2.6-2.6 4.8 2-.2 3.5-1 4.5-2.4M16.4 16c1.6 1 2.5 2.6 2.6 4.8-2-.2-3.5-1-4.5-2.4"/>',
  code: '<path d="M8.6 8.2L4.4 12l4.2 3.8M15.4 8.2l4.2 3.8-4.2 3.8M13.6 5.4l-3.2 13.2"/>',
  // Brand glyphs, drawn as FILLED paths rather than the 2px strokes the rest of the set
  // uses — a stroked wordmark is not that company's logo, and these are recognised by
  // their solid silhouette or not at all.
  linkedin: '<path d="M4.5 8.9h3.3V20H4.5V8.9zM6.1 3.9a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8zM10.2 8.9h3.2v1.5h.05c.45-.85 1.55-1.75 3.2-1.75 3.4 0 4.05 2.25 4.05 5.15V20h-3.35v-5.35c0-1.28-.02-2.92-1.78-2.92-1.78 0-2.05 1.39-2.05 2.83V20h-3.32V8.9z" fill="currentColor" stroke="none"/>',
  github: '<path d="M12 2.6a9.4 9.4 0 0 0-2.97 18.32c.47.09.64-.2.64-.45v-1.6c-2.62.57-3.17-1.26-3.17-1.26-.43-1.09-1.05-1.38-1.05-1.38-.86-.59.07-.58.07-.58.95.07 1.45.98 1.45.98.84 1.45 2.21 1.03 2.75.79.09-.61.33-1.03.6-1.27-2.09-.24-4.29-1.05-4.29-4.65 0-1.03.37-1.87.97-2.53-.1-.24-.42-1.2.09-2.5 0 0 .79-.25 2.59.97a9 9 0 0 1 4.72 0c1.8-1.22 2.59-.97 2.59-.97.51 1.3.19 2.26.09 2.5.6.66.97 1.5.97 2.53 0 3.61-2.2 4.4-4.3 4.64.34.29.64.87.64 1.75v2.6c0 .25.17.55.65.45A9.4 9.4 0 0 0 12 2.6z" fill="currentColor" stroke="none"/>',
  youtube: '<path d="M21.2 7.9a2.6 2.6 0 0 0-1.83-1.84C17.75 5.6 12 5.6 12 5.6s-5.75 0-7.37.46A2.6 2.6 0 0 0 2.8 7.9C2.35 9.53 2.35 12 2.35 12s0 2.47.45 4.1a2.6 2.6 0 0 0 1.83 1.84c1.62.46 7.37.46 7.37.46s5.75 0 7.37-.46a2.6 2.6 0 0 0 1.83-1.84c.45-1.63.45-4.1.45-4.1s0-2.47-.45-4.1zM10.15 15.1V8.9l4.8 3.1-4.8 3.1z" fill="currentColor" stroke="none"/>',
  twitter: '<path d="M17.6 3.4h2.95l-6.45 7.37L21.7 20.6h-5.94l-4.65-6.08-5.32 6.08H2.83l6.9-7.89L2.3 3.4h6.09l4.2 5.56 4.99-5.56zm-1.04 15.42h1.63L7.5 5.09H5.75l10.81 13.73z" fill="currentColor" stroke="none"/>',
  /* design-solution marks for /solutions */
  browser: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 8.5h18"/><circle cx="6" cy="6.2" r=".6" fill="currentColor" stroke="none"/><circle cx="8.2" cy="6.2" r=".6" fill="currentColor" stroke="none"/>',
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><path d="M16 5.2a3.2 3.2 0 0 1 0 6"/><path d="M17.5 14.6A5.5 5.5 0 0 1 20.5 20"/>',
  chart: '<path d="M4 4v16h16"/><path d="M8 16v-4"/><path d="M12 16V8"/><path d="M16 16v-6"/>',
  cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M3 4h2l2.2 11.2a1 1 0 0 0 1 .8h9.1a1 1 0 0 0 1-.8L21 8H6"/>',
};

export function icon(name, cls = "h-5 w-5") {
  const body = ICONS[name] || ICONS.spark;
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

function navLinks(currentPath, mobile = false) {
  return nav
    .map((item) => {
      const active = item.path === currentPath;
      if (mobile) {
        return `<a href="${item.path}" class="m-link flex items-center justify-between border-b border-surface-800 py-5 text-2xl font-semibold ${active ? "text-primary-200" : "text-surface-100"} hover:text-primary-200">
          <span>${item.label}</span>
          <span class="text-fg-muted">${icon("arrow", "h-5 w-5")}</span>
        </a>`;
      }
      return `<a href="${item.path}" class="text-sm font-medium transition-colors ${active ? "text-primary-200" : "text-fg-secondary hover:text-fg"}">${item.label}</a>`;
    })
    .join("\n");
}

// Skylanex mark: the eagle emblem from the brand banner.
//
// Rendered from a <symbol> defined once per page (eagleSprite) rather than inlining
// the path at both call sites — it is a single ~1.5KB path and the header and footer
// would otherwise carry it twice. `fill="currentColor"` on the <use> is what lets the
// footer dim it without a second copy of the artwork.
//
// No badge, no gradient chip. The banner sets the eagle directly on the dark field at
// full contrast, and boxing it in a rounded square is what made the old mark read as a
// generic app icon rather than a crest.
export function mark(size = "h-9 w-9", tone = "text-fg") {
  return `<svg class="${size} ${tone} shrink-0 transition-colors" viewBox="0 0 1152 924" aria-hidden="true">
    <use href="#skx-eagle" />
  </svg>`;
}

// Defined once, immediately inside <body>, and referenced by every mark().
export function eagleSprite() {
  return `<svg width="0" height="0" class="absolute" aria-hidden="true" focusable="false"><symbol id="skx-eagle" viewBox="0 0 1152 924"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M 616 588 L 584 653 L 584 899 L 691 788 Z M 535 588 L 460 788 L 567 899 L 567 653 Z M 516 551 L 511 555 L 378 704 L 434 760 L 435 760 L 449 729 L 452 725 L 461 704 L 476 675 L 476 673 L 487 652 L 487 650 L 525 571 L 525 568 Z M 635 550 L 625 570 L 666 655 L 666 657 L 679 682 L 679 684 L 694 713 L 694 715 L 716 760 L 717 760 L 773 704 Z M 641 235 L 532 235 L 516 240 L 502 255 L 475 260 L 481 298 L 491 285 L 523 289 L 539 317 L 506 376 L 576 505 L 663 349 L 613 255 Z M 504 255 L 505 254 L 553 254 L 554 255 L 560 255 L 561 256 L 561 273 L 562 274 L 561 275 L 557 275 L 556 274 L 554 274 L 553 273 L 551 273 L 550 272 L 548 272 L 547 271 L 544 271 L 543 270 L 541 270 L 540 269 L 538 269 L 537 268 L 536 268 L 535 267 L 533 267 L 532 266 L 530 266 L 529 265 L 527 265 L 526 264 L 524 264 L 523 263 L 521 263 L 520 262 L 519 262 L 518 261 L 516 261 L 515 260 L 514 260 L 513 259 L 511 259 L 510 258 L 509 258 L 508 257 L 506 257 Z M 24 24 L 69 133 L 405 321 L 82 171 L 130 270 L 439 387 L 154 310 L 213 396 L 475 450 L 269 436 L 358 511 L 494 489 L 387 529 L 460 574 L 514 519 L 575 624 L 638 519 L 692 574 L 765 529 L 658 488 L 793 511 L 883 436 L 679 450 L 939 396 L 998 311 L 717 387 L 1023 270 L 1071 171 L 753 322 L 1085 132 L 1127 25 L 735 259 L 576 553 L 425 257 Z"/></symbol></svg>`;
}

function logo() {
  return `<a href="/" class="group flex items-center gap-2.5" aria-label="${site.name} home">
    ${mark()}
    <span class="font-display text-lg font-semibold uppercase leading-none tracking-[0.22em] text-fg">Skylanex</span>
  </a>`;
}

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

export function layout({ title, metaTitle, description, path = "/", content = "", jsonLd = [] }) {
  const pageTitle = metaTitle || (title ? `${title} · ${site.name}` : `${site.name} — AI Software Studio`);
  const desc = description || site.description;
  const canonical = path === "/" ? `${site.domain}/` : `${site.domain}${path}`;
  // Per-page social card (scripts/og-cards.mjs). Absolute, because scrapers do not
  // resolve relative URLs. /404 has no card of its own and falls back to the home
  // one — a missing file renders as a blank preview, the exact failure this replaced.
  const ogImage = `${site.domain}/images/og/${path === "/404" ? "home" : ogSlug(path)}.jpg`;
  const ldScripts = jsonLd
    .filter(Boolean)
    .map((obj) => `  <script type="application/ld+json">${JSON.stringify(obj)}</script>`)
    .join("\n");
  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(pageTitle)}</title>
  <meta name="description" content="${esc(desc)}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <meta name="theme-color" content="#0a0b12" />
  <link rel="canonical" href="${canonical}" />
  <link rel="icon" href="/images/skylanex-mark.svg" type="image/svg+xml" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${site.name}" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:title" content="${esc(pageTitle)}" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(pageTitle)}" />
  <meta name="twitter:description" content="${esc(desc)}" />
  <meta name="twitter:image" content="${ogImage}" />
  <!-- Fonts are self-hosted (see src/styles/app.css). Preloaded because a webfont
       is otherwise discovered only after the CSS parses, which puts it a full
       round trip behind the stylesheet that asks for it. -->
  <link rel="preload" href="/fonts/inter-var-latin.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="/css/app.css" />
${ldScripts}
</head>
<body class="min-h-screen bg-surface-950 text-surface-100 antialiased">
  ${eagleSprite()}

  <!-- ===== NAV ===== -->
  <header id="site-nav" class="sticky top-0 z-50 border-b border-transparent transition-colors">
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
      ${logo()}
      <div class="hidden items-center gap-8 md:flex">
        ${navLinks(path)}
      </div>
      <div class="hidden md:block">
        <a href="/contact" class="btn btn-primary">Let's talk ${icon("arrow", "h-4 w-4")}</a>
      </div>
      <!-- burger -->
      <button id="menu-toggle" class="burger relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
        <span class="block h-0.5 w-6 rounded bg-surface-100"></span>
        <span class="block h-0.5 w-6 rounded bg-surface-100"></span>
        <span class="block h-0.5 w-6 rounded bg-surface-100"></span>
      </button>
    </nav>
  </header>

  <!-- ===== MOBILE MENU ===== -->
  <div id="mobile-menu" class="fixed inset-0 z-40 flex flex-col bg-surface-950/98 px-6 pb-10 pt-24 backdrop-blur-xl md:hidden">
    <nav class="flex flex-col">
      ${navLinks(path, true)}
    </nav>
    <div class="mt-auto space-y-4 pt-8">
      <a href="/contact" class="btn btn-primary w-full">Start a project ${icon("arrow", "h-4 w-4")}</a>
      <p class="text-center text-sm text-fg-muted">${site.email}</p>
    </div>
  </div>

  <main>
    ${content}
  </main>

  ${footer(path)}

  <script src="/js/main.js" defer></script>
</body>
</html>`;
}

function footer(path) {
  // Four link columns and a social rail, as the mock draws it. Every href points at a
  // page that exists — the mock's "Careers" is the one label with nothing behind it yet,
  // so it is absent rather than dead.
  const cols = [
    {
      title: "Services",
      links: [
        { label: "AI App Development", href: "/ai-application-development" },
        { label: "Machine Learning", href: "/machine-learning-data-science" },
        { label: "Process Automation", href: "/intelligent-process-automation" },
        { label: "NLP", href: "/natural-language-processing" },
        { label: "Computer Vision", href: "/computer-vision-solutions" },
        { label: "AI Consulting", href: "/ai-consulting-strategy" },
      ],
    },
    {
      // The mock lists the product CATEGORIES here, which are the filters on the products
      // page — so each one deep-links to that filter's own view rather than to a page that
      // would have to repeat it.
      title: "Solutions",
      links: [
        { label: "SaaS Platforms", href: "/products#saas" },
        { label: "AI Tools", href: "/products#ai" },
        { label: "Developer Tools", href: "/products#dev" },
        { label: "Design Systems", href: "/solutions" },
        { label: "Law Firm Websites", href: "/solutions/law-firms" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Products", href: "/products" },
        { label: "Contact", href: "/contact" },
        { label: "Phansora ↗", href: site.phansoraUrl },
      ],
    },
  ];

  // Placeholders. The accounts exist; their URLs have not been supplied, so these are
  // marked aria-disabled rather than pointed at a guess — a social icon that goes to the
  // wrong account is worse than one that does not go yet.
  const social = [
    { label: "LinkedIn", icon: "linkedin", href: "#" },
    { label: "GitHub", icon: "github", href: "#" },
    { label: "YouTube", icon: "youtube", href: "#" },
    { label: "X", icon: "twitter", href: "#" },
  ];

  return `<footer class="border-t border-surface-800 bg-surface-950">
    <div class="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
        <div>
          ${logo()}
          <p class="mt-4 max-w-xs text-sm leading-relaxed text-fg-secondary">Independent AI software studio building intelligent applications that empower businesses and creators.</p>
          <div class="mt-5 flex flex-col gap-2.5 text-sm text-fg-secondary">
            <a href="mailto:${site.email}" class="inline-flex items-center gap-2 hover:text-fg">${icon("mail", "h-4 w-4 text-primary-200")} ${site.email}</a>
            <p class="inline-flex items-center gap-2">${icon("compass", "h-4 w-4 text-primary-200")} ${site.location}</p>
          </div>
        </div>
        ${cols
          .map(
            (c) => `<div>
          <h3 class="eyebrow text-fg-secondary">${c.title}</h3>
          <ul class="mt-4 space-y-2.5 text-sm">
            ${c.links.map((l) => `<li><a href="${l.href}" class="text-surface-50 hover:text-primary-200">${l.label}</a></li>`).join("")}
          </ul>
        </div>`
          )
          .join("")}
        <div>
          <h3 class="eyebrow text-fg-secondary">Follow</h3>
          <ul class="mt-4 flex gap-2">
            ${social
              .map(
                (sn) => `<li><a href="${sn.href}" aria-label="${sn.label}" class="grid h-9 w-9 place-items-center rounded-full border border-surface-800 bg-surface-900 text-fg-secondary transition-colors hover:border-primary-500/60 hover:text-fg">${icon(sn.icon, "h-4 w-4")}</a></li>`
              )
              .join("")}
          </ul>
        </div>
      </div>
      <div class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-surface-800 pt-6 text-xs text-fg-secondary sm:flex-row">
        <p>© ${new Date().getFullYear()} ${site.name}. All rights reserved.</p>
        <div class="flex items-center gap-6">
          <a href="/privacy" class="hover:text-fg">Privacy Policy</a>
          <a href="/terms" class="hover:text-fg">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>`;
}
