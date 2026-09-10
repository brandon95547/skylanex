import { icon } from "../layout.mjs";
import { heroGlow, afterHero, ctaBand } from "../ui.mjs";
import { products, site } from "../../site.config.mjs";

// The five products of the suite, in the order this page presents them — which is not
// the platform's own order (phansora/src/products.js leads with Book Alchemy). The two
// with interface art to show lead here; the rest follow and are what the "/ 05" counts.
//
// A section's number is its index in this array, so moving an entry renumbers it. The
// three without art are still listed because a bare 05 with nothing naming the five it
// counts would be a number nobody could check.
//
// `href` is taken from that app's product registry rather than guessed. The two products
// this page actually shows the interface of link straight into their dashboard, so
// "Explore X" opens the thing the screenshot above it is a picture of; Phansora's
// `requireDashboardSession` sends a logged-out visitor to /login?next=<that path> and
// drops them back on the product once they are in, so the link works either way. The
// three without art still point at their marketing page — sending a stranger into a
// dashboard for a product they have not read a word about is a step too far.
const SUITE = [
  {
    name: "Narrava Studio",
    tagline: "Turn ideas into stunning videos.",
    blurb:
      "An all-in-one AI video studio for creating professional videos with scripts, media, AI narration, subtitles, transitions, and more.",
    href: `${site.phansoraUrl}/dashboard/narrava-studio`,
    icon: "clapper",
  },
  {
    name: "Chrono Origin",
    tagline: "Trace any story, claim, or idea back to its origins.",
    blurb:
      "Build evidence-based timelines that uncover where ideas began, how they evolved, and how sources connect — with citations at every step.",
    href: `${site.phansoraUrl}/dashboard/chrono-origin`,
    icon: "compass",
  },
  {
    name: "Book Alchemy",
    tagline: "Turn any book into a course you can listen to.",
    blurb:
      "Turns a book or long document into a structured, multi-session audio course — an AI-designed curriculum, narrated, and grounded in the author's own words.",
    href: `${site.phansoraUrl}/book-alchemy`,
    icon: "book",
  },
  {
    name: "Research Atlas",
    tagline: "Turn a pile of sources into a report.",
    blurb:
      "Upload your sources and Research Atlas organises them into a structured, attributed research report — every claim traceable to the document it came from.",
    href: `${site.phansoraUrl}/research-atlas`,
    icon: "layers",
  },
  {
    name: "SpokenVerse",
    tagline: "Your words, in a voice of your own.",
    blurb:
      "Natural text-to-speech with voice cloning — turn writing into narration that sounds like a person rather than a synthesiser.",
    href: `${site.phansoraUrl}/spokenverse`,
    icon: "mic",
  },
];

// What each editor in the screenshots actually does, named the way its own panels are.
const NARRAVA_CAPABILITIES = [
  { icon: "book", title: "Script &amp; Storyboard", sub: "Turn your ideas into a story" },
  { icon: "mic", title: "AI Narration", sub: "Natural, realistic voices" },
  { icon: "grid", title: "Media Library", sub: "Stock, uploads, and AI images" },
  { icon: "sliders", title: "Effects &amp; Transitions", sub: "Cinematic and dynamic" },
];

const CHRONO_CAPABILITIES = [
  { icon: "clock", title: "Origin Tracing", sub: "Find the earliest defensible source." },
  { icon: "workflow", title: "Evidence Timelines", sub: "Follow ideas through time." },
  { icon: "network", title: "Source Connections", sub: "See how records reference and influence one another." },
  { icon: "app", title: "Research &amp; Citations", sub: "Ground every step in verifiable sources." },
];

// The three timelines shown beside the Chrono Origin screenshot. The first is the one
// the screenshot has open, which is why it carries the ring the app gives a selection —
// the panel and the picture are showing the same thing.
const TIMELINES = [
  { name: "Ancient Israelite Religion", blurb: "From Canaanite roots to Second Temple Judaism." },
  { name: "The Flood Narrative", blurb: "A global story through time and cultures." },
  { name: "Jesus Parallels", blurb: "Comparative figures and influences across history." },
];

/** The four words down the right of the hero — what the suite is for, in order. */
const PILLARS = ["Ideas", "Knowledge", "Creation", "Real impact"];

const pad = (n) => String(n + 1).padStart(2, "0");

/**
 * One film, as a poster that becomes a player when it is asked to.
 *
 * The films are 6–13 MB each and there are seven of them, so nothing is fetched until
 * a visitor clicks: `preload="none"` and no `<source>` until then would still cost a
 * request per poster, so the video element is only written on click by main.js. Here
 * it is a button over an image, which is what it behaves like.
 */
function film(f, featured = false) {
  return `<button type="button" class="film group relative block w-full overflow-hidden rounded-xl border border-surface-800 bg-surface-950 text-left transition-colors hover:border-primary-400/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
    style="aspect-ratio:9/16" data-video="/videos/${f.slug}.mp4" data-title="${f.name}">
    <img src="/images/videos/${f.slug}.webp" width="540" height="960" alt="${f.name} — a short film made in Narrava Studio"
      loading="lazy" decoding="async" class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
    <span class="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/20 to-transparent"></span>
    <span class="pointer-events-none absolute inset-0 grid place-items-center">
      <span class="grid ${featured ? "h-14 w-14" : "h-9 w-9"} place-items-center rounded-full bg-surface-950/70 text-fg ring-1 ring-inset ring-white/25 backdrop-blur-sm transition-transform group-hover:scale-110">
        ${icon("play", featured ? "h-6 w-6" : "h-4 w-4")}
      </span>
    </span>
    <span class="pointer-events-none absolute inset-x-0 bottom-0 p-3">
      <span class="block truncate text-${featured ? "sm" : "xs"} font-semibold text-fg">${f.name}</span>
      <span class="mt-0.5 block text-[11px] text-surface-300">${f.kind} · ${f.duration}</span>
    </span>
  </button>`;
}

/**
 * The block that opens a product's section: its number, name, tagline, blurb and link.
 *
 * Identical for every product, so it is written once here rather than copied per
 * section — the only thing that varies is which entry of SUITE it is handed.
 */
function sectionHead(i) {
  const p = SUITE[i];
  return `<div class="reveal grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
    <div>
      <p class="text-sm font-semibold tracking-wider text-fg-muted">
        <span class="text-primary-300">${pad(i)}</span> / ${pad(SUITE.length - 1)}
      </p>
      <h2 class="mt-2 text-3xl font-bold tracking-tight text-fg sm:text-4xl">${p.name}</h2>
      <p class="mt-2 text-lg text-fg-secondary">${p.tagline}</p>
    </div>
    <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <p class="max-w-md leading-relaxed text-fg-secondary">${p.blurb}</p>
      <a href="${p.href}" target="_blank" rel="noopener" class="btn btn-primary w-fit shrink-0">
        Explore ${p.name} ${icon("arrow", "h-4 w-4")}
      </a>
    </div>
  </div>`;
}

/** The four-up strip of what a product does, under its screenshot. */
function capabilityStrip(items) {
  return `<ul class="reveal mt-6 grid gap-px overflow-hidden rounded-2xl border border-surface-800 bg-surface-800 sm:grid-cols-2 lg:grid-cols-4">
    ${items
      .map(
        (c) => `<li class="flex items-start gap-3 bg-surface-900/60 p-5">
      <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-500/10 text-primary-200 ring-1 ring-inset ring-primary-500/25">
        ${icon(c.icon, "h-4.5 w-4.5")}
      </span>
      <span class="min-w-0">
        <span class="block text-sm font-semibold text-fg">${c.title}</span>
        <span class="mt-0.5 block text-sm text-fg-secondary">${c.sub}</span>
      </span>
    </li>`
      )
      .join("")}
  </ul>`;
}

/** One example timeline. Static copy, not a link — the button above goes to the app. */
function timeline(t, i) {
  const open = i === 0;
  return `<div class="flex items-start gap-3 rounded-xl border ${
    open ? "border-primary-400/70 bg-surface-900/80 ring-1 ring-primary-400/30" : "border-surface-800 bg-surface-950"
  } p-4">
    <span class="min-w-0 flex-1">
      <span class="block text-sm font-semibold text-fg">${t.name}</span>
      <span class="mt-1 block text-sm leading-relaxed text-fg-secondary">${t.blurb}</span>
    </span>
    <span class="grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${
      open ? "bg-primary-500/20 text-primary-200 ring-1 ring-inset ring-primary-400/40" : "bg-surface-800 text-fg-muted"
    }">${i + 1}</span>
  </div>`;
}

export const phansoraPage = {
  path: "/phansora",
  file: "phansora.html",
  title: "Phansora — the AI creation suite",
  description:
    "Phansora is a suite of AI-powered tools for creators, researchers, and thinkers — video production, audio courses, research reports, origin tracing, and speech.",
  render: () => `
  ${heroGlow(`
    <div class="mx-auto max-w-6xl px-5 pb-14 pt-20 sm:px-8 sm:pt-24">
      <!-- The eyebrow and the pillars flank the headline on a wide screen and stack
           above and below it on a narrow one, which is the only arrangement that keeps
           the headline centred without pushing it off-centre to make room. -->
      <div class="lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-start lg:gap-8">
        <p class="eyebrow text-primary-200 lg:pt-3">The AI creation suite</p>
        <div class="mt-6 text-center lg:mt-0">
          <h1 class="text-4xl font-extrabold leading-[1.05] tracking-tight text-fg sm:text-6xl">
            Discover <span class="bg-gradient-to-r from-primary-300 via-primary-200 to-accent-400 bg-clip-text text-transparent">Phansora</span>
          </h1>
          <p class="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-fg-secondary">
            A suite of AI-powered tools for creators, researchers, and thinkers.
          </p>
        </div>
        <ul class="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-1.5 lg:mt-1 lg:flex-col lg:items-end lg:justify-start lg:gap-1.5">
          ${PILLARS.map(
            (p) =>
              `<li class="text-[11px] font-semibold uppercase tracking-[0.18em] text-surface-300">${p}</li>`
          ).join("")}
        </ul>
      </div>
    </div>
  `)}

  <section class="px-5 ${afterHero} pb-20 sm:px-8">
    <div class="mx-auto max-w-6xl">
      <!-- Product 01. Screenshot left, its films right. -->
      ${sectionHead(0)}

      <div class="reveal mt-8 grid items-start gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <!-- The editor itself. Native resolution is 1672 wide and the card never
             renders wider than that, so there is no 2x variant to serve — the smaller
             file is for phones, where the full one is four times the pixels needed. -->
        <figure class="overflow-hidden rounded-2xl border border-surface-800 bg-surface-950">
          <img src="/images/phansora/narrava-studio.webp"
            srcset="/images/phansora/narrava-studio-940.webp 940w, /images/phansora/narrava-studio.webp 1672w"
            sizes="(min-width: 1024px) 56vw, 100vw"
            width="1672" height="941" loading="lazy" decoding="async"
            alt="The Narrava Studio editor: a media library of generated clips, a preview of a cloaked figure before a mountain castle reading “Ideas Become Reality”, and a multi-track timeline with narration, text, and a cinematic look applied."
            class="block w-full" />
        </figure>

        <div class="flex flex-col rounded-2xl border border-surface-800 bg-surface-900/60 p-5">
          <h3 class="text-sm font-semibold text-fg">Made with Narrava Studio</h3>
          <p class="mt-1 text-sm leading-relaxed text-fg-secondary">Short films cut in the editor on the left. Nothing loads until you press play.</p>
          <!-- One row, not two. Six of them stacked made this column half again as
               tall as the screenshot beside it, and the screenshot is what the section
               is actually about. Three is a taster, not an inventory. -->
          <div class="mt-4 grid grid-cols-3 gap-2.5">
            ${products.creative.slice(0, 3).map((f) => film(f)).join("\n")}
          </div>
        </div>
      </div>

      ${capabilityStrip(NARRAVA_CAPABILITIES)}

      <!-- Product 02. The sides swap: the panel leads and the screenshot follows, so
           two sections running down the page do not read as the same shape twice. The
           timeline picture is also wider than the editor one (2:1 against 16:9), so it
           takes the larger share of the row here. -->
      <div class="mt-24">${sectionHead(1)}</div>

      <div class="reveal mt-8 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)]">
        <div class="flex flex-col gap-3 rounded-2xl border border-surface-800 bg-surface-900/60 p-5">
          ${TIMELINES.map((t, i) => timeline(t, i)).join("\n")}
        </div>

        <figure class="overflow-hidden rounded-2xl border border-surface-800 bg-surface-950">
          <img src="/images/phansora/chrono-origin.webp"
            srcset="/images/phansora/chrono-origin-940.webp 940w, /images/phansora/chrono-origin.webp 1774w"
            sizes="(min-width: 1024px) 64vw, 100vw"
            width="1774" height="887" loading="lazy" decoding="async"
            alt="Chrono Origin tracing Ancient Israelite Religion: five evidence cards from Canaanite Religion, marked first trace, through the Tel Dan and Mesha steles and the Hebrew Bible to Second Temple Judaism, plotted on a dated axis from 1600 BCE to 400 CE above a density strip and a count of 42 sources."
            class="block w-full" />
        </figure>
      </div>

      ${capabilityStrip(CHRONO_CAPABILITIES)}
    </div>
  </section>

  ${ctaBand({
    title: "Want something like this built?",
    sub: "Phansora is what this studio builds for itself. The same team builds it for other people.",
  })}
  `,
};
