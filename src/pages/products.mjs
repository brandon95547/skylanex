import { icon } from "../layout.mjs";
import { heroGlow, afterHero } from "../ui.mjs";
import { products, site } from "../../site.config.mjs";

// Colour lanes for the grid, keyed by CATEGORY rather than per product.
//
// The mock gives every card its own hue, which is seven of them and outside the brand
// ramps. This does the same job inside the palette the rest of the site is built from:
// the four categories the filter already offers get one lane each, so the tile and its
// badge say what kind of thing a card is before a word of it is read — and two SaaS
// platforms now look like two SaaS platforms rather than like two unrelated products.
//
// Written out in full rather than composed from the key, because `bg-${x}-500/15` is a
// string Tailwind's scanner never sees and would compile to nothing. Written literally
// they need no safelist entry: this file is already covered by `@source "../**/*.mjs"`.
const LANES = {
  saas: { tile: "bg-primary-500/15 text-primary-300 ring-primary-500/25", badge: "bg-primary-500/10 text-primary-300 ring-primary-500/20" },
  ai: { tile: "bg-accent-500/15 text-accent-300 ring-accent-500/25", badge: "bg-accent-500/10 text-accent-300 ring-accent-500/20" },
  dev: { tile: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/25", badge: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/20" },
  other: { tile: "bg-surface-700/40 text-surface-300 ring-surface-600/40", badge: "bg-surface-800 text-surface-300 ring-surface-700" },
};

// The filter row. Buttons rather than links: this filters what is already on the page and
// changes no URL, so a link would promise a destination it does not go to. The first one
// is pressed on load, and `aria-pressed` is what says so to anything not looking at colour.
function filters() {
  return `<div class="reveal flex w-full flex-wrap items-center gap-1.5 rounded-2xl border border-surface-800 bg-surface-900/60 p-1.5" role="group" aria-label="Filter products by type">
    ${products.categories
      .map(
        (c, i) => `<button type="button" data-filter="${c.id}" aria-pressed="${i === 0 ? "true" : "false"}"
      class="filter-chip rounded-xl px-4 py-2 text-sm font-medium transition-colors">${c.label}</button>`
      )
      .join("")}
  </div>`;
}

// The platform everything else sits under, so it gets the width and the screenshot rather
// than a slot in the grid beside its own components.
function featuredCard() {
  const f = products.featured;
  return `<article class="reveal overflow-hidden rounded-3xl border border-surface-800 bg-surface-900/60">
    <div class="grid gap-0 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)]">
      <div class="relative m-4 overflow-hidden rounded-2xl border border-surface-800 bg-surface-950 lg:m-5">
        <img src="${f.image}" width="1440" height="900" alt="${f.alt}" loading="lazy" decoding="async"
          class="block h-full w-full object-cover object-left-top" />
      </div>
      <div class="flex flex-col justify-center p-6 sm:p-8 lg:py-10 lg:pr-10">
        <span class="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-300 ring-1 ring-inset ring-primary-500/25">
          ${icon("spark", "h-3.5 w-3.5")} ${f.badge}
        </span>
        <h2 class="mt-4 text-3xl font-bold tracking-tight text-white">${f.name}</h2>
        <p class="mt-3 max-w-md leading-relaxed text-surface-300">${f.blurb}</p>
        <ul class="mt-5 flex flex-wrap gap-1.5">
          ${f.chips
            .map(
              (c) => `<li class="inline-flex items-center gap-1.5 rounded-lg border border-surface-800 bg-surface-950/60 px-2 py-1.5 text-xs text-surface-200">
            ${icon(c.icon, "h-3.5 w-3.5 text-surface-400")} ${c.label}
          </li>`
            )
            .join("")}
        </ul>
        <a href="${f.href}" target="_blank" rel="noopener" class="btn btn-ghost mt-7 w-fit">${f.cta} ${icon("arrow", "h-4 w-4")}</a>
      </div>
    </div>
  </article>`;
}

function productCard(p) {
  const lane = LANES[p.category] || LANES.other;
  const out = !!p.external;
  return `<article data-category="${p.category}" class="product-card reveal group flex flex-col rounded-2xl border border-surface-800 bg-surface-900/50 p-6 transition-colors hover:border-primary-500/50">
    <span class="grid h-12 w-12 place-items-center rounded-xl ring-1 ring-inset ${lane.tile}">${icon(p.icon, "h-5 w-5")}</span>
    <h3 class="mt-5 text-lg font-bold text-white">
      <a href="${p.href}" ${out ? 'target="_blank" rel="noopener"' : ""} class="after:absolute after:inset-0 focus:outline-none focus-visible:underline">${p.name}</a>
    </h3>
    <p class="mt-2 text-sm leading-relaxed text-surface-300">${p.blurb}</p>
    <span class="mt-4 inline-flex w-fit items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${lane.badge}">${p.badge}</span>
    <!-- One arrow on every card, as the mock draws it. The mix of arrows and jump-out
         marks made a uniform row of cards look like two different kinds of thing; that a
         link leaves the site is already carried by target/rel and by the hostname in the
         status bar. -->
    <span class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-300">${p.cta || "View details"} ${icon("arrow", "h-4 w-4")}</span>
  </article>`;
}

export const productsPage = {
  path: "/products",
  file: "products.html",
  title: "Products",
  description:
    "Products, platforms, and tools built for impact — the AI software, SaaS platforms, and developer tools designed and built by " + site.owner + ".",
  render: () => `
  ${heroGlow(`
    <div class="mx-auto max-w-6xl px-5 pb-12 pt-20 sm:px-8 sm:pt-24">
      <p class="eyebrow mb-3 text-primary-400">Our products</p>
      <h1 class="max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">Products, platforms, and tools built for impact.</h1>
      <p class="mt-5 max-w-md text-lg leading-relaxed text-surface-300">Explore the software, SaaS platforms, and AI tools we’ve designed and developed.</p>
    </div>
  `)}

  <section class="px-5 ${afterHero} sm:px-8">
    <div class="mx-auto max-w-6xl">
      ${filters()}
      <div class="mt-6">${featuredCard()}</div>
    </div>
  </section>

  <section class="px-5 py-12 sm:px-8">
    <div class="mx-auto max-w-6xl">
      <div class="flex items-center gap-5">
        <h2 class="shrink-0 text-2xl font-bold tracking-tight text-white">Tools &amp; Projects</h2>
        <span class="h-px flex-1 bg-surface-800" aria-hidden="true"></span>
      </div>
      <div id="product-grid" class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        ${products.items.map(productCard).join("\n")}
      </div>
      <!-- Only ever seen with a filter on, and only when that filter matches nothing.
           Written in the markup rather than built by the script so it is one string in
           one place, and so it exists for a reader with no JavaScript. -->
      <p id="product-empty" class="mt-8 hidden text-center text-sm text-surface-400">Nothing in that category yet.</p>
    </div>
  </section>

  <section class="px-5 pb-24 sm:px-8">
    <div class="reveal relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-primary-500/20 bg-gradient-to-br from-primary-900 via-surface-900 to-surface-950 px-6 py-10 sm:px-10">
      <div class="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-accent-500/10 blur-3xl"></div>
      <div class="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:gap-10">
        <span class="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-primary-500/10 text-primary-300 ring-1 ring-inset ring-primary-500/25">
          ${icon("layers", "h-9 w-9")}
        </span>
        <div class="min-w-0 flex-1">
          <h2 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">Have an idea in mind?</h2>
          <p class="mt-2 max-w-xl leading-relaxed text-surface-300">We build custom software, SaaS platforms, and AI tools that turn ideas into scalable solutions.</p>
        </div>
        <div class="flex shrink-0 flex-wrap gap-3">
          <a href="/contact" class="btn btn-primary">Start a Project ${icon("arrow", "h-4 w-4")}</a>
          <a href="/services" class="btn btn-ghost">Learn More</a>
        </div>
      </div>
    </div>
  </section>
  `,
};
