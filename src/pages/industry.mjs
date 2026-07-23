import { icon } from "../layout.mjs";
import { heading, ctaBand, heroGlow } from "../ui.mjs";
import { industryPages, solutions } from "../../site.config.mjs";

// Generic renderer for a dedicated industry landing page at /solutions/<slug>.
// Everything is driven by an industryPages[] entry, so the next category
// (construction, medical, …) is a data edit with no new template.

// A design concept: a static render of the concept, captioned with the
// practice-area it targets and the (fictional) firm it was written for, and
// linked to its own detail page at /solutions/<industrySlug>/<conceptSlug>.
//
// Every image is cropped to a uniform 1200x675 so the two-column rows line up —
// width/height are declared to reserve the box and keep the grid from shifting
// as they decode.
function concept(c, industrySlug) {
  const href = `/solutions/${industrySlug}/${c.slug}`;
  return `<figure class="reveal group">
    <a href="${href}" class="block overflow-hidden rounded-xl border border-surface-800 bg-surface-900 transition-colors group-hover:border-surface-600">
      <img src="/images/concepts/${c.slug}.webp" width="1200" height="675" loading="lazy" decoding="async"
        alt="${c.label} law firm website design concept for ${c.firm}"
        class="w-full transition-transform duration-500 group-hover:scale-[1.015]" />
    </a>
    <figcaption class="mt-3 flex flex-wrap items-baseline justify-between gap-2">
      <span class="text-sm font-semibold text-white">${c.label}</span>
      <span class="text-xs text-surface-500">${c.firm}</span>
    </figcaption>
    <a href="${href}" class="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-300 hover:text-primary-200">
      View design ${icon("arrow", "h-4 w-4")}
    </a>
  </figure>`;
}

// One concept's detail page: a large render, the design rationale, the colour
// direction, and a CTA to adapt it. `p` is the industryPages[] entry; `c` is one
// of its showcase[] concepts.
function conceptDetail(p, c) {
  const palette = c.palette;
  const swatchKeys = [
    ["bg", "Base"],
    ["surface", "Surface"],
    ["primary", "Primary"],
    ["accent", "Accent"],
    ["text", "Ink"],
  ];
  return `
  ${heroGlow(`
    <div class="mx-auto max-w-5xl px-5 pb-10 pt-20 sm:px-8 sm:pt-24">
      <a href="/solutions/${p.slug}#concepts" class="inline-flex items-center gap-1.5 text-sm text-surface-400 hover:text-primary-300">${icon("arrow", "h-4 w-4 rotate-180")} All ${p.eyebrow} concepts</a>
      <p class="eyebrow mt-6 text-accent-400">${c.label}</p>
      <h1 class="mt-2 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">${c.firm}</h1>
      <p class="mt-5 max-w-2xl text-lg leading-relaxed text-surface-300">${c.blurb}</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href="/contact" class="btn btn-primary">Design mine ${icon("arrow", "h-4 w-4")}</a>
        <a href="/solutions/${p.slug}#concepts" class="btn btn-ghost">See other concepts</a>
      </div>
    </div>
  `)}

  <!-- Large preview -->
  <section class="px-5 pb-6 sm:px-8">
    <div class="mx-auto max-w-6xl">
      <figure class="reveal overflow-hidden rounded-2xl border border-surface-800 bg-surface-900 shadow-2xl shadow-black/40">
        <img src="/images/concepts/${c.slug}.webp" width="1200" height="675" decoding="async"
          alt="${c.label} law firm website design concept for ${c.firm}"
          class="w-full" />
      </figure>
      <p class="mt-4 max-w-3xl text-sm leading-relaxed text-surface-500">
        This is an original design concept — ${c.firm} is a fictional firm created to show the direction, not a past client. Your build starts from your name, your practice areas, and your market.
      </p>
    </div>
  </section>

  <!-- Rationale + colour direction -->
  <section class="px-5 py-14 sm:px-8">
    <div class="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <h2 class="text-2xl font-bold text-white sm:text-3xl">What this concept does</h2>
        <ul class="mt-8 space-y-5">
          ${c.points
            .map(
              (pt) => `<li class="flex items-start gap-3">
            <span class="mt-0.5 shrink-0 text-emerald-400">${icon("check", "h-5 w-5")}</span>
            <p class="leading-relaxed text-surface-300">${pt}</p>
          </li>`
            )
            .join("")}
        </ul>
      </div>
      ${
        palette
          ? `<aside class="h-fit rounded-2xl border border-surface-800 bg-surface-900/40 p-6">
        <h3 class="text-sm font-semibold text-white">Colour direction</h3>
        <p class="mt-1 text-xs text-surface-500">${palette.name}</p>
        <div class="mt-5 flex gap-2">
          ${swatchKeys
            .map(
              ([k, label]) => `<div class="min-w-0 flex-1">
            <div class="h-12 rounded-lg border border-surface-700/60" style="background:${palette.colors[k]}"></div>
            <p class="mt-1.5 truncate text-[11px] text-surface-500">${label}</p>
          </div>`
            )
            .join("")}
        </div>
        <p class="mt-5 text-xs leading-relaxed text-surface-500">A starting direction. Your palette is chosen with you — this is where the conversation begins, not where it ends.</p>
      </aside>`
          : ""
      }
    </div>
  </section>

  ${ctaBand({
    title: "Want a site like this for your firm?",
    sub: `This direction was built for ${c.label.toLowerCase()}. Tell me your practice areas and the market you want to win, and I'll adapt it — your name, your colours, your content — into a site built to turn a search into a signed client. You get a fixed number, not an hourly meter.`,
    primaryLabel: "Design mine",
  })}
  `;
}

function detail(p) {
  const parent = solutions.find((s) => s.slug === p.solution);
  return `
  ${heroGlow(`
    <div class="mx-auto max-w-5xl px-5 pb-12 pt-20 sm:px-8 sm:pt-24">
      <a href="/solutions" class="inline-flex items-center gap-1.5 text-sm text-surface-400 hover:text-primary-300">${icon("arrow", "h-4 w-4 rotate-180")} All solutions</a>
      <div class="mt-6 flex items-start gap-5">
        <span class="hidden h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary-500/10 text-primary-300 sm:grid">${icon(p.icon, "h-7 w-7")}</span>
        <div>
          <p class="eyebrow text-accent-400">${p.eyebrow}</p>
          <h1 class="mt-2 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">${p.h1}</h1>
          <p class="mt-5 max-w-2xl text-lg leading-relaxed text-surface-300">${p.lede}</p>
        </div>
      </div>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href="/contact" class="btn btn-primary">Start a project ${icon("arrow", "h-4 w-4")}</a>
        <a href="#concepts" class="btn btn-ghost">See the designs</a>
      </div>
      <div class="mt-12 grid max-w-2xl grid-cols-3 gap-6 border-t border-surface-800 pt-8">
        ${p.heroStats
          .map(
            (s) => `<div>
          <p class="text-3xl font-extrabold tracking-tight text-white">${s.v}</p>
          <p class="mt-1 text-xs text-surface-400">${s.l}</p>
        </div>`
          )
          .join("")}
      </div>
    </div>
  `)}

  <!-- Design concepts -->
  <section id="concepts" class="scroll-mt-24 px-5 py-16 sm:px-8">
    <div class="mx-auto max-w-6xl">
      ${heading({
        eyebrow: "Design concepts",
        title: "Built for Law Firms. Designed to Grow Your Practice.",
        center: false,
        sub: "Each targets a different practice area and a different kind of client — a different tone, structure, and first impression.",
      })}
      <div class="mt-10 grid gap-10 lg:grid-cols-2">
        ${p.showcase.map((c) => concept(c, p.slug)).join("\n")}
      </div>
      <p class="mt-8 max-w-3xl text-sm leading-relaxed text-surface-500">
        These are design concepts, not past client work — the firms shown are fictional. Real engagements start from your name, your practice areas, and your market.
      </p>
    </div>
  </section>

  <!-- Practice areas -->
  <section class="border-y border-surface-800 px-5 py-16 sm:px-8">
    <div class="mx-auto max-w-5xl text-center">
      <p class="eyebrow text-primary-400">Practice areas</p>
      <h2 class="mt-3 text-2xl font-bold text-white sm:text-3xl">Every practice area gets its own page</h2>
      <p class="mx-auto mt-4 max-w-2xl text-surface-300">Nobody searches for "law firm." They search for the thing that happened to them. Each of these becomes a real page, written and structured to be found.</p>
      <div class="mt-8 flex flex-wrap justify-center gap-2">
        ${p.segments
          .map((s) => `<span class="rounded-full border border-surface-700 px-3.5 py-1.5 text-sm text-surface-300">${s}</span>`)
          .join("")}
      </div>
    </div>
  </section>

  <!-- Why this vertical is different -->
  <section class="px-5 py-20 sm:px-8">
    <div class="mx-auto max-w-6xl">
      ${heading({
        eyebrow: "What makes it different",
        title: "A legal site is not a business site with a gavel on it",
        center: false,
      })}
      <div class="mt-10 grid gap-5 sm:grid-cols-2">
        ${p.differentiators
          .map(
            (d) => `<div class="reveal rounded-2xl border border-surface-800 bg-surface-900/50 p-6">
          <span class="mb-4 inline-grid h-10 w-10 place-items-center rounded-lg bg-primary-500/10 text-primary-300">${icon(d.icon, "h-5 w-5")}</span>
          <h3 class="text-base font-semibold text-white">${d.t}</h3>
          <p class="mt-2 text-sm leading-relaxed text-surface-400">${d.d}</p>
        </div>`
          )
          .join("")}
      </div>
    </div>
  </section>

  <!-- Included + SEO -->
  <section class="px-5 pb-20 sm:px-8">
    <div class="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.25fr_1fr]">
      <div>
        <h2 class="text-2xl font-bold text-white sm:text-3xl">What ships</h2>
        <div class="mt-8 grid gap-4 sm:grid-cols-2">
          ${p.included
            .map(
              (i) => `<div class="rounded-2xl border border-surface-800 bg-surface-900/40 p-5">
            <div class="flex items-start gap-2.5">
              <span class="mt-0.5 shrink-0 text-emerald-400">${icon("check", "h-4 w-4")}</span>
              <div>
                <h3 class="text-sm font-semibold text-white">${i.t}</h3>
                <p class="mt-1.5 text-sm leading-relaxed text-surface-400">${i.d}</p>
              </div>
            </div>
          </div>`
            )
            .join("")}
        </div>
      </div>
      <aside>
        <h2 class="text-2xl font-bold text-white sm:text-3xl">Found, not just built</h2>
        <ul class="mt-8 space-y-4">
          ${p.seoPoints
            .map(
              (s) => `<li class="rounded-xl border border-surface-800 bg-surface-950/60 p-4">
            <h3 class="text-sm font-semibold text-white">${s.t}</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-surface-400">${s.d}</p>
          </li>`
            )
            .join("")}
        </ul>
      </aside>
    </div>
  </section>

  <!-- FAQ -->
  <section class="px-5 pb-16 sm:px-8">
    <div class="mx-auto max-w-3xl">
      ${heading({ eyebrow: "FAQ", title: "Questions firms actually ask" })}
      <div class="mt-10 divide-y divide-surface-800 border-y border-surface-800">
        ${p.faqs
          .map(
            (f) => `<details class="group">
          <summary class="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-semibold text-surface-100 marker:hidden">
            <span>${f.q}</span>
            <span class="shrink-0 text-primary-400 transition-transform group-open:rotate-45">${icon("spark", "h-5 w-5")}</span>
          </summary>
          <p class="pb-5 -mt-1 max-w-2xl text-sm leading-relaxed text-surface-400">${f.a}</p>
        </details>`
          )
          .join("")}
      </div>
    </div>
  </section>

  <!-- Back to the parent card -->
  <section class="px-5 pb-8 sm:px-8">
    <div class="mx-auto max-w-3xl text-center">
      <a href="/solutions#${p.solution}" class="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-300 hover:text-primary-200">
        ${icon("arrow", "h-4 w-4 rotate-180")} Back to ${parent ? parent.name : "all solutions"}
      </a>
    </div>
  </section>

  ${ctaBand({
    title: "Let's talk about your firm",
    sub: "Tell me your practice areas and the markets you want to win. You'll get an honest read on what your site should be doing differently — and a fixed number to do it.",
    primaryLabel: "Start a project",
  })}
  `;
}

export const industryLandingPages = industryPages.map((p) => ({
  path: `/solutions/${p.slug}`,
  file: `solutions/${p.slug}.html`,
  title: p.eyebrow,
  metaTitle: p.metaTitle,
  description: p.description,
  render: () => detail(p),
}));

// One detail page per showcase concept, at /solutions/<industry>/<concept>.
export const conceptDetailPages = industryPages.flatMap((p) =>
  p.showcase.map((c) => ({
    path: `/solutions/${p.slug}/${c.slug}`,
    title: `${c.firm} — ${c.label}`,
    metaTitle: `${c.firm} · ${p.eyebrow} concept · Skylanex`,
    description: c.blurb,
    render: () => conceptDetail(p, c),
  }))
);
