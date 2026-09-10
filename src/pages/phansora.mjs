import { icon } from "../layout.mjs";
import { heroGlow, afterHero, ctaBand } from "../ui.mjs";
import { products, site } from "../../site.config.mjs";

// The five products of the suite, in the order the platform itself lists them.
//
// `href` is each product's own public page on Phansora, taken from that app's product
// registry rather than guessed. Narrava Studio is the exception: it has no public page
// there (`publicPath: null`), so its link goes to the suite instead of to a 404.
const SUITE = [
  {
    name: "Narrava Studio",
    tagline: "Turn ideas into stunning videos.",
    blurb:
      "An all-in-one AI video studio for creating professional videos with scripts, media, AI narration, subtitles, transitions, and more.",
    href: site.phansoraUrl,
    icon: "clapper",
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
    name: "Chrono Origin",
    tagline: "Trace any claim back to its source.",
    blurb:
      "Follows a story, myth, or claim back to the earliest source the evidence allows, with grounded web search and a citation at every step.",
    href: `${site.phansoraUrl}/chrono-origin`,
    icon: "compass",
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

// What the editor in the screenshot actually does, named the way its own panels are.
const CAPABILITIES = [
  { icon: "book", title: "Script &amp; Storyboard", sub: "Turn your ideas into a story" },
  { icon: "mic", title: "AI Narration", sub: "Natural, realistic voices" },
  { icon: "grid", title: "Media Library", sub: "Stock, uploads, and AI images" },
  { icon: "sliders", title: "Effects &amp; Transitions", sub: "Cinematic and dynamic" },
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

  <section class="px-5 ${afterHero} sm:px-8">
    <div class="mx-auto max-w-6xl">
      <!-- Product 01. It gets the screenshot and the films; the other four are named
           below it, because there is no interface art for them and a placeholder box
           each would say less than a line of type. -->
      <div class="reveal grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
        <div>
          <p class="text-sm font-semibold tracking-wider text-fg-muted">
            <span class="text-primary-300">01</span> / ${pad(SUITE.length - 1)}
          </p>
          <h2 class="mt-2 text-3xl font-bold tracking-tight text-fg sm:text-4xl">${SUITE[0].name}</h2>
          <p class="mt-2 text-lg text-fg-secondary">${SUITE[0].tagline}</p>
        </div>
        <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <p class="max-w-md leading-relaxed text-fg-secondary">${SUITE[0].blurb}</p>
          <a href="${SUITE[0].href}" target="_blank" rel="noopener" class="btn btn-primary w-fit shrink-0">
            Explore ${SUITE[0].name} ${icon("arrow", "h-4 w-4")}
          </a>
        </div>
      </div>

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
          <div class="flex items-baseline justify-between gap-3">
            <h3 class="text-sm font-semibold text-fg">Made with Narrava Studio</h3>
            <span class="text-xs text-fg-muted">${products.creative.length} films</span>
          </div>
          <p class="mt-1 text-sm leading-relaxed text-fg-secondary">Short films cut in the editor on the left. Nothing loads until you press play.</p>
          <!-- One row, not two. Six of them stacked made this column half again as
               tall as the screenshot beside it, and the screenshot is what the section
               is actually about. Three is a taster; the count above says how many
               there are. -->
          <div class="mt-4 grid grid-cols-3 gap-2.5">
            ${products.creative.slice(0, 3).map((f) => film(f)).join("\n")}
          </div>
        </div>
      </div>

      <ul class="reveal mt-6 grid gap-px overflow-hidden rounded-2xl border border-surface-800 bg-surface-800 sm:grid-cols-2 lg:grid-cols-4">
        ${CAPABILITIES.map(
          (c) => `<li class="flex items-start gap-3 bg-surface-900/60 p-5">
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-500/10 text-primary-200 ring-1 ring-inset ring-primary-500/25">
            ${icon(c.icon, "h-4.5 w-4.5")}
          </span>
          <span class="min-w-0">
            <span class="block text-sm font-semibold text-fg">${c.title}</span>
            <span class="mt-0.5 block text-sm text-fg-secondary">${c.sub}</span>
          </span>
        </li>`
        ).join("")}
      </ul>
    </div>
  </section>

  <section class="px-5 py-14 sm:px-8">
    <div class="mx-auto max-w-6xl">
      <div class="flex items-center gap-5">
        <h2 class="shrink-0 text-2xl font-bold tracking-tight text-fg">The rest of the suite</h2>
        <span class="h-px flex-1 bg-surface-800" aria-hidden="true"></span>
      </div>
      <ul class="mt-8 grid gap-5 sm:grid-cols-2">
        ${SUITE.slice(1)
          .map(
            (p, i) => `<li class="reveal group relative flex flex-col rounded-2xl border border-surface-800 bg-surface-900/50 p-6 transition-colors hover:border-primary-500/50">
          <div class="flex items-center gap-3">
            <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-500/10 text-primary-200 ring-1 ring-inset ring-primary-500/25">
              ${icon(p.icon, "h-5 w-5")}
            </span>
            <span class="text-sm font-semibold tracking-wider text-fg-muted">
              <span class="text-primary-300">${pad(i + 1)}</span> / ${pad(SUITE.length - 1)}
            </span>
          </div>
          <h3 class="mt-4 text-xl font-bold tracking-tight text-fg">
            <a href="${p.href}" target="_blank" rel="noopener" class="after:absolute after:inset-0 focus:outline-none focus-visible:underline">${p.name}</a>
          </h3>
          <p class="mt-1 text-fg-secondary">${p.tagline}</p>
          <p class="mt-3 flex-1 text-sm leading-relaxed text-fg-secondary">${p.blurb}</p>
          <span class="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-200">Explore ${p.name} ${icon("arrow", "h-4 w-4")}</span>
        </li>`
          )
          .join("\n")}
      </ul>
    </div>
  </section>

  ${ctaBand({
    title: "Want something like this built?",
    sub: "Phansora is what this studio builds for itself. The same team builds it for other people.",
  })}
  `,
};
