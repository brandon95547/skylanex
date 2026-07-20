import { icon } from "../layout.mjs";
import { heading, ctaBand, heroGlow } from "../ui.mjs";
import { work, site } from "../../site.config.mjs";

function ventureCard(v) {
  return `<a href="${v.href}" ${v.external ? 'target="_blank" rel="noopener"' : ""} class="reveal group relative col-span-full overflow-hidden rounded-3xl border border-surface-800 bg-surface-900/60 p-8 transition-colors hover:border-primary-500/50 sm:p-10">
    <div class="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-primary-500/15 blur-3xl"></div>
    <div class="relative">
      <p class="eyebrow text-accent-400">${v.kind}</p>
      <h3 class="mt-2 text-2xl font-bold text-white">${v.name}</h3>
      <p class="mt-3 max-w-2xl leading-relaxed text-surface-300">${v.blurb}</p>
      <span class="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-300">${v.external ? "Visit site" : "View"} ${icon(v.external ? "external" : "arrow", "h-4 w-4")}</span>
    </div>
  </a>`;
}

function productCard(p) {
  return `<a href="${p.href}" target="_blank" rel="noopener" class="reveal group flex flex-col rounded-2xl border border-surface-800 bg-surface-900/50 p-6 transition-colors hover:border-primary-500/50">
    <p class="eyebrow text-surface-500">${p.kind}</p>
    <h3 class="mt-2 text-lg font-bold text-white">${p.name}</h3>
    <p class="mt-2 text-sm leading-relaxed text-surface-400">${p.blurb}</p>
    <span class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-300">Visit site ${icon("external", "h-4 w-4")}</span>
  </a>`;
}

// Poster-led tile that opens the lightbox (assets/js/main.js). The video itself is
// never in the DOM until a card is activated, so the page loads no media bytes.
// The bottom scrim is deliberately heavy: source cuts carry burned-in captions in
// the lower third, and the title block masks them.
function creativeCard(c) {
  return `<button type="button"
    class="video-card reveal group relative block w-full overflow-hidden rounded-2xl border border-surface-800 bg-surface-900 text-left transition-colors hover:border-primary-500/50 focus-visible:border-primary-500"
    data-video="/videos/${c.slug}.mp4"
    data-poster="/images/videos/${c.slug}.webp"
    data-title="${c.name}"
    data-aspect="${c.aspect}"
    aria-label="Play ${c.name} — ${c.kind}, ${c.duration}">
    <img src="/images/videos/${c.slug}.webp" alt="" loading="lazy" decoding="async"
      class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
    <span class="video-card__scrim absolute inset-0"></span>
    <span class="absolute inset-0 grid place-items-center">
      <span class="grid h-14 w-14 place-items-center rounded-full border border-white/25 bg-surface-950/40 text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-primary-400/60 group-hover:bg-primary-500/25">
        ${icon("play", "h-6 w-6 translate-x-0.5")}
      </span>
    </span>
    <span class="absolute inset-x-0 bottom-0 p-4">
      <span class="flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-accent-300">
        ${c.kind}
        <span class="text-surface-600">•</span>
        <span class="text-surface-400 normal-case tracking-normal">${c.duration}</span>
      </span>
      <span class="mt-1 block text-base font-semibold leading-snug text-white">${c.name}</span>
      <span class="mt-1 block text-xs leading-relaxed text-surface-400">${c.blurb}</span>
    </span>
  </button>`;
}

export const workPage = {
  path: "/work",
  file: "work.html",
  title: "Work",
  description: "Selected work — AI products, enterprise applications, mobile apps, and creative production by " + site.owner + ".",
  render: () => `
  ${heroGlow(`
    <div class="mx-auto max-w-6xl px-5 pb-12 pt-20 text-center sm:px-8 sm:pt-24">
      <p class="eyebrow mb-3 text-primary-400">Work</p>
      <h1 class="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Products, platforms, and a few things I just had to build</h1>
      <p class="mx-auto mt-5 max-w-xl text-lg text-surface-300">Fourteen years of shipping — from enterprise apps to my own AI product suite.</p>
    </div>
  `)}

  <section class="px-5 pb-8 sm:px-8">
    <div class="mx-auto max-w-6xl">
      <div class="grid gap-5">
        ${work.ventures.map(ventureCard).join("\n")}
      </div>
    </div>
  </section>

  <section class="px-5 py-12 sm:px-8">
    <div class="mx-auto max-w-6xl">
      ${heading({ eyebrow: "The products", title: "Four AI tools, live and shipping", center: false, sub: "Each one is a production product under Phansora — built, launched, and maintained end to end." })}
      <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        ${work.products.map(productCard).join("\n")}
      </div>
    </div>
  </section>

  <section class="px-5 pb-16 sm:px-8">
    <div class="mx-auto max-w-6xl">
      ${heading({ eyebrow: "Creative & video", title: "Music videos & short films", center: false, sub: "Video production is part of the studio too — a creative outlet that keeps the storytelling sharp." })}
      <div class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        ${work.creative.map(creativeCard).join("\n")}
      </div>
    </div>
  </section>

  <!-- Lightbox. Empty until a card is activated; main.js injects the <video>. -->
  <div id="video-lightbox" class="video-lightbox" role="dialog" aria-modal="true" aria-hidden="true" aria-label="Video player">
    <div class="video-lightbox__backdrop" data-close></div>
    <div class="video-lightbox__panel" role="document">
      <div class="video-lightbox__stage"></div>
      <div class="mt-3 flex items-center justify-between gap-4">
        <p class="video-lightbox__title text-sm font-semibold text-white"></p>
        <button type="button" class="video-lightbox__close inline-grid h-9 w-9 shrink-0 place-items-center rounded-full border border-surface-700 bg-surface-900 text-surface-300 transition-colors hover:border-primary-500/60 hover:text-white" data-close aria-label="Close video">
          ${icon("close", "h-4 w-4")}
        </button>
      </div>
    </div>
  </div>

  ${ctaBand({ title: "Have something you want built?" })}
  `,
};
