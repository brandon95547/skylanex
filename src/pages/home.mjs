import { icon } from "../layout.mjs";
import { heading, ctaBand, statRow, heroGlow } from "../ui.mjs";
import { services, work, site, trustedBy, faqs } from "../../site.config.mjs";

function serviceCard(s) {
  return `<a href="/${s.slug}" class="reveal group flex flex-col rounded-2xl border border-surface-800 bg-surface-900/60 p-6 transition-colors hover:border-primary-500/50">
    <span class="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-primary-500/10 text-primary-300 transition-colors group-hover:bg-primary-500/20">${icon(s.icon)}</span>
    <h3 class="text-base font-semibold text-white">${s.eyebrow}</h3>
    <p class="mt-2 flex-1 text-sm leading-relaxed text-surface-400">${s.tagline}</p>
    <span class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-300">Learn more ${icon("arrow", "h-4 w-4 transition-transform group-hover:translate-x-0.5")}</span>
  </a>`;
}

export const home = {
  path: "/",
  file: "index.html",
  title: null,
  description: site.description,
  render: () => `
  ${heroGlow(`
    <div class="mx-auto max-w-6xl px-5 pb-16 pt-20 sm:px-8 sm:pt-28">
      <div class="mx-auto max-w-3xl text-center">
        <p class="reveal mb-5 inline-flex items-center gap-2 rounded-full border border-surface-800 bg-surface-900/60 px-4 py-1.5 text-xs font-medium text-surface-300">
          <span class="h-1.5 w-1.5 rounded-full bg-accent-400"></span> Independent AI software studio
        </p>
        <h1 class="reveal text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl">
          I build <span class="grad-text">intelligent software</span> that ships.
        </h1>
        <p class="reveal mx-auto mt-6 max-w-xl text-lg leading-relaxed text-surface-300">
          From custom AI applications to machine learning, NLP, and computer vision — I help teams turn AI from a buzzword into a product that works in production.
        </p>
        <div class="reveal mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="/contact" class="btn btn-primary">Start a project ${icon("arrow", "h-4 w-4")}</a>
          <a href="/work" class="btn btn-ghost">See the work</a>
        </div>
      </div>

      <!-- floating capability chips -->
      <div class="reveal mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-2.5 text-xs">
        ${["LLM apps & agents", "RAG & semantic search", "Predictive ML", "Document automation", "Computer vision", "Cloud deployment"]
          .map((t) => `<span class="rounded-full border border-surface-800 bg-surface-900/60 px-3.5 py-1.5 text-surface-300">${t}</span>`)
          .join("")}
      </div>
    </div>
  `)}

  <!-- TRUSTED BY -->
  <section class="border-y border-surface-800 px-5 py-8 sm:px-8">
    <div class="mx-auto max-w-5xl">
      <p class="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-surface-500">Trusted by teams &amp; products including</p>
      <div class="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        ${trustedBy.map((n) => `<span class="text-lg font-bold text-surface-400">${n}</span>`).join("")}
      </div>
    </div>
  </section>

  <!-- SERVICES -->
  <section class="px-5 py-20 sm:px-8">
    <div class="mx-auto max-w-6xl">
      ${heading({ eyebrow: "What I do", title: "AI, engineered for outcomes", sub: "Six focused capabilities — combined into whatever your problem actually needs." })}
      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        ${services.map(serviceCard).join("\n")}
      </div>
    </div>
  </section>

  <!-- FLAGSHIP: PHANSORA -->
  <section class="px-5 pb-20 sm:px-8">
    <div class="mx-auto max-w-6xl">
      <div class="reveal relative overflow-hidden rounded-3xl border border-surface-800 bg-surface-900/60 p-8 sm:p-12">
        <div class="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-primary-500/15 blur-3xl"></div>
        <div class="relative grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <p class="eyebrow mb-3 text-accent-400">Flagship venture</p>
            <h2 class="text-2xl font-bold text-white sm:text-3xl">Phansora — my AI product suite</h2>
            <p class="mt-4 max-w-xl leading-relaxed text-surface-300">
              Beyond client work, I build and run my own AI products. Phansora is a suite of four:
              Book Alchemy, Dossier Nova, Chrono Origin, and SpokenVerse — proof I ship real, self-serve AI, not just slide decks.
            </p>
            <a href="${site.phansoraUrl}" target="_blank" rel="noopener" class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-300 hover:text-primary-200">
              Visit Phansora ${icon("external", "h-4 w-4")}
            </a>
          </div>
          <div class="grid grid-cols-2 gap-3">
            ${["Book Alchemy", "Dossier Nova", "Chrono Origin", "SpokenVerse"]
              .map((p) => `<div class="rounded-xl border border-surface-800 bg-surface-950/60 px-4 py-5 text-center text-sm font-semibold text-surface-100">${p}</div>`)
              .join("")}
          </div>
        </div>
      </div>
    </div>
  </section>

  ${statRow()}

  <!-- PROCESS -->
  <section class="px-5 py-20 sm:px-8">
    <div class="mx-auto max-w-6xl">
      ${heading({ eyebrow: "How I work", title: "A simple, honest process" })}
      <div class="mt-12 grid gap-6 md:grid-cols-4">
        ${[
          { n: "01", t: "Discover", d: "We pin down the real problem and whether AI is the right tool." },
          { n: "02", t: "Design", d: "A pragmatic plan: scope, data, architecture, and cost." },
          { n: "03", t: "Build", d: "Iterative delivery you can see and steer every week." },
          { n: "04", t: "Ship & support", d: "Deployed to production, monitored, and improved." },
        ]
          .map(
            (step) => `<div class="reveal rounded-2xl border border-surface-800 bg-surface-900/40 p-6">
          <p class="text-sm font-bold text-primary-400">${step.n}</p>
          <h3 class="mt-2 text-base font-semibold text-white">${step.t}</h3>
          <p class="mt-2 text-sm leading-relaxed text-surface-400">${step.d}</p>
        </div>`
          )
          .join("")}
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="px-5 pb-4 sm:px-8">
    <div class="mx-auto max-w-3xl">
      ${heading({ eyebrow: "FAQ", title: "Questions, answered" })}
      <div class="mt-10 divide-y divide-surface-800 border-y border-surface-800">
        ${faqs
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

  ${ctaBand({})}
  `,
};
