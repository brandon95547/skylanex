import { icon } from "../layout.mjs";
import { heading, ctaBand, heroGlow } from "../ui.mjs";
import { mockup, paletteBySlug } from "../mockup.mjs";
import { solutions } from "../../site.config.mjs";

// One industry: live website preview on one side, the case for it on the other.
// The preview is rendered from the industry's referenced palette (site.config),
// so the design shown here and the palette page never drift apart.
function industryRow(s, i) {
  const palette = paletteBySlug(s.palette);
  const flip = i % 2 === 1;
  return `<article id="${s.slug}" class="reveal grid scroll-mt-24 items-center gap-8 lg:grid-cols-2 lg:gap-12">
    <div class="${flip ? "lg:order-2" : ""}">
      ${mockup(palette, { label: `${s.name} website design preview` })}
      <p class="mt-3 text-xs text-surface-500">
        Scheme: <a href="/solutions/color-palettes#${palette.slug}" class="text-primary-300 hover:text-primary-200">${palette.name}</a>
      </p>
    </div>
    <div class="${flip ? "lg:order-1" : ""}">
      <span class="mb-4 inline-grid h-12 w-12 place-items-center rounded-xl bg-primary-500/10 text-primary-300">${icon(s.icon, "h-6 w-6")}</span>
      <p class="eyebrow text-accent-400">${s.name}</p>
      <h3 class="mt-2 text-2xl font-bold text-white sm:text-3xl">${s.tagline}</h3>
      <p class="mt-4 leading-relaxed text-surface-300">${s.summary}</p>
      <ul class="mt-6 grid gap-2.5 sm:grid-cols-2">
        ${s.outcomes
          .map(
            (o) => `<li class="flex items-start gap-2.5 text-sm text-surface-200">
          <span class="mt-0.5 shrink-0 text-emerald-400">${icon("check", "h-4 w-4")}</span> ${o}
        </li>`
          )
          .join("")}
      </ul>
      <a href="/contact" class="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-300 hover:text-primary-200">
        Talk about a ${s.noun} site ${icon("arrow", "h-4 w-4")}
      </a>
    </div>
  </article>`;
}

const PROCESS = [
  { t: "Positioning", d: "Who you're for, what you're best at, and the one action the site exists to produce." },
  { t: "Design system", d: "A palette, type scale, and components — chosen for your industry, not a template." },
  { t: "Build & integrate", d: "Fast static or dynamic build wired to booking, CRM, and the tools you already run." },
  { t: "Launch & measure", d: "Analytics, search setup, and a plan for the pages that will earn traffic next." },
];

export const solutionsPage = {
  path: "/solutions",
  file: "solutions.html",
  title: "Solutions",
  metaTitle: "Industry Website Solutions — Attorney, Construction & More · Skylanex",
  description:
    "Website and AI solutions built for your industry — attorneys, construction, medical, home services, real estate, restaurants, professional services, and fitness. See live design previews and color schemes.",
  render: () => `
  ${heroGlow(`
    <div class="mx-auto max-w-6xl px-5 pb-12 pt-20 text-center sm:px-8 sm:pt-24">
      <p class="eyebrow mb-3 text-primary-400">Solutions</p>
      <h1 class="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Websites built for the way your industry actually sells</h1>
      <p class="mx-auto mt-5 max-w-2xl text-lg text-surface-300">A law firm and a roofing company are not the same business, and they should not get the same website. Below are eight industries, each with a live design preview you can look at right now.</p>
      <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a href="/contact" class="btn btn-primary">Start a project ${icon("arrow", "h-4 w-4")}</a>
        <a href="/solutions/color-palettes" class="btn btn-ghost">${icon("palette", "h-4 w-4")} Browse color schemes</a>
      </div>
    </div>
  `)}

  <!-- Jump nav -->
  <section class="px-5 pb-10 sm:px-8">
    <div class="mx-auto flex max-w-6xl flex-wrap justify-center gap-2">
      ${solutions
        .map(
          (s) => `<a href="#${s.slug}" class="pal-chip inline-flex items-center gap-2">
        <span class="text-primary-300">${icon(s.icon, "h-4 w-4")}</span>${s.name}
      </a>`
        )
        .join("")}
    </div>
  </section>

  <section class="px-5 pb-20 sm:px-8">
    <div class="mx-auto grid max-w-6xl gap-20 sm:gap-24">
      ${solutions.map(industryRow).join("\n")}
    </div>
  </section>

  <!-- Palette cross-link -->
  <section class="px-5 pb-20 sm:px-8">
    <div class="reveal mx-auto max-w-6xl overflow-hidden rounded-3xl border border-surface-800 bg-surface-900/50">
      <div class="grid items-center gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <span class="mb-4 inline-grid h-12 w-12 place-items-center rounded-xl bg-accent-500/10 text-accent-300">${icon("palette", "h-6 w-6")}</span>
          <h2 class="text-2xl font-bold text-white sm:text-3xl">Not sure what it should look like?</h2>
          <p class="mt-4 leading-relaxed text-surface-300">Sixteen proven color schemes — navy and brass for law, safety orange for construction, clinical blue for medical — each one shown on a full website design so you can see it working before you commit.</p>
          <a href="/solutions/color-palettes" class="btn btn-primary mt-6">See all 16 palettes ${icon("arrow", "h-4 w-4")}</a>
        </div>
        <div class="grid grid-cols-2 gap-4">
          ${["ivory-oxblood", "electric-violet", "ocean-coral", "slate-copper"]
            .map((slug) => mockup(paletteBySlug(slug), { label: `${paletteBySlug(slug).name} preview` }))
            .join("")}
        </div>
      </div>
    </div>
  </section>

  <!-- Process -->
  <section class="border-t border-surface-800 px-5 py-20 sm:px-8">
    <div class="mx-auto max-w-6xl">
      ${heading({
        eyebrow: "How it works",
        title: "Four steps, no mystery",
        sub: "Same process whether you're a two-attorney firm or a regional contractor — the difference is what we build, not how we get there.",
      })}
      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        ${PROCESS.map(
          (p, i) => `<div class="reveal rounded-2xl border border-surface-800 bg-surface-900/50 p-6">
          <p class="text-sm font-extrabold text-primary-400">0${i + 1}</p>
          <h3 class="mt-3 text-base font-semibold text-white">${p.t}</h3>
          <p class="mt-2 text-sm leading-relaxed text-surface-400">${p.d}</p>
        </div>`
        ).join("")}
      </div>
    </div>
  </section>

  ${ctaBand({
    title: "Tell me your industry",
    sub: "Send a note with what you do and who you sell to. You'll get an honest read on what your site should be doing differently — and a fixed number to do it.",
    primaryLabel: "Start a project",
  })}
  `,
};
