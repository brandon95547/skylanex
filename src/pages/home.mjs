import { icon } from "../layout.mjs";
import { heading, heroGlow, heroArt, ctaBadge } from "../ui.mjs";
import { services, site, trustedBy, stats } from "../../site.config.mjs";

function serviceCard(s) {
  return `<a href="/${s.slug}" class="reveal group flex flex-col rounded-2xl border border-surface-800 bg-surface-900/60 p-6 transition-colors hover:border-primary-500/50">
    <span class="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-primary-500/10 text-primary-300 transition-colors group-hover:bg-primary-500/20">${icon(s.icon)}</span>
    <h3 class="text-base font-semibold text-white">${s.eyebrow}</h3>
    <p class="mt-2 flex-1 text-sm leading-relaxed text-surface-300">${s.tagline}</p>
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
    <div class="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-20 sm:px-8 sm:pt-24 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
      <div>
        <p class="reveal eyebrow mb-4 text-primary-400">AI. Software. Outcomes.</p>
        <h1 class="reveal text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
          We build <span class="grad-text">intelligent software</span> that ships.
        </h1>
        <p class="reveal mt-6 max-w-lg text-lg leading-relaxed text-surface-300">
          From custom AI applications to scalable platforms and tools, we turn complex ideas into reliable software that drives real results.
        </p>
        <div class="reveal mt-8 flex flex-wrap items-center gap-3">
          <a href="/contact" class="btn btn-primary">Start a project ${icon("arrow", "h-4 w-4")}</a>
          <a href="/products" class="btn btn-ghost">Explore our products</a>
        </div>
        <!-- The assurances, in one bordered strip rather than as loose chips. Together
             they are a single claim about how the work is done; separated they read as
             four unrelated tags. -->
        <ul class="reveal mt-9 inline-flex max-w-full flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border border-surface-800 bg-surface-900/60 px-5 py-3 text-xs text-surface-200">
          ${["AI-Powered", "Scalable", "Secure", "Results Focused"]
            .map((t) => `<li class="inline-flex items-center gap-1.5">${icon("checkCircle", "h-4 w-4 text-primary-400")} ${t}</li>`)
            .join("")}
        </ul>
      </div>
      <div class="reveal order-first lg:order-none">${heroArt()}</div>
    </div>
  `)}

  <!-- TRUSTED BY -->
  <section class="border-y border-surface-800 px-5 py-8 sm:px-8">
    <div class="mx-auto max-w-5xl">
      <p class="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-surface-400">Trusted by teams &amp; products including</p>
      <div class="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        ${trustedBy.map((n) => `<span class="text-lg font-bold text-surface-300">${n}</span>`).join("")}
      </div>
    </div>
  </section>

  <!-- SERVICES -->
  <section class="px-5 py-20 sm:px-8">
    <div class="mx-auto max-w-6xl">
      ${heading({ eyebrow: "What we do", title: "AI solutions. Real impact.", sub: "Six core capabilities that help us build software that solves problems and drives growth." })}
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
            <p class="eyebrow mb-3 text-primary-400">Our flagship platform</p>
            <h2 class="text-2xl font-bold text-white sm:text-3xl">Phansora — The all-in-one AI product suite</h2>
            <p class="mt-4 max-w-xl leading-relaxed text-surface-300">
              A complete suite of tools for AI video production, narration, research, and automation. Built for creators, researchers, and enterprises.
            </p>
            <a href="${site.phansoraUrl}" target="_blank" rel="noopener" class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-300 hover:text-primary-200">
              Explore Phansora ${icon("arrow", "h-4 w-4")}
            </a>
          </div>
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            ${[
              { name: "Book Alchemy", sub: "Ebooks to audiobooks", icon: "book" },
              { name: "Research Atlas", sub: "Research dossiers", icon: "layers" },
              { name: "Chrono Origin", sub: "Origin tracing", icon: "compass" },
              { name: "SpokenVerse", sub: "Text-to-speech", icon: "mic" },
            ]
              .map(
                (p) => `<div class="flex items-center gap-3 rounded-xl border border-surface-800 bg-surface-950/60 px-4 py-3.5">
              <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-500/10 text-primary-300 ring-1 ring-inset ring-primary-500/20">${icon(p.icon, "h-4 w-4")}</span>
              <span class="min-w-0">
                <span class="block truncate text-sm font-semibold text-surface-50">${p.name}</span>
                <span class="block truncate text-xs text-surface-400">${p.sub}</span>
              </span>
            </div>`
              )
              .join("")}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- STATS -->
  <section class="border-y border-surface-800 bg-surface-950 px-5 py-12 sm:px-8">
    <div class="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
      ${stats
        .map(
          (st, i) => `<div class="reveal flex items-center gap-4${i ? " lg:border-l lg:border-surface-800 lg:pl-8" : ""}">
        <span class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-500/10 text-primary-300 ring-1 ring-inset ring-primary-500/20">${icon(["calendar", "rocket", "users", "code"][i] || "spark", "h-5 w-5")}</span>
        <span>
          <span class="block text-3xl font-extrabold tracking-tight text-white">${st.value}</span>
          <span class="block text-sm text-surface-400">${st.label}</span>
        </span>
      </div>`
        )
        .join("")}
    </div>
  </section>

  <!-- PROCESS -->
  <section class="px-5 py-20 sm:px-8">
    <div class="mx-auto max-w-6xl">
      ${heading({ eyebrow: "How we work", title: "A simple, transparent process" })}
      <!-- The rule runs BEHIND the numbers and stops at the first and last, so the four
           steps read as one sequence rather than four cards that happen to be adjacent.
           Hidden below md, where the steps stack and a horizontal line would connect
           nothing. -->
      <div class="relative mt-14">
        <span class="pointer-events-none absolute inset-x-[12.5%] top-5 hidden h-px bg-surface-800 md:block" aria-hidden="true"></span>
        <ol class="relative grid gap-10 md:grid-cols-4 md:gap-6">
          ${[
            { t: "Discover", d: "We dive deep into your problem and define what success looks like." },
            { t: "Design", d: "We craft a plan, scope, and architecture tailored to your goals." },
            { t: "Build", d: "We build iteratively with clean code, testing, and constant communication." },
            { t: "Ship & Support", d: "We deploy, monitor, and continue improving after launch." },
          ]
            .map(
              (step, i) => `<li class="reveal text-center">
            <span class="mx-auto grid h-10 w-10 place-items-center rounded-full bg-primary-500 text-sm font-bold text-white ring-4 ring-surface-950">${i + 1}</span>
            <h3 class="mt-4 text-base font-semibold text-white">${step.t}</h3>
            <p class="mx-auto mt-2 max-w-[15rem] text-sm leading-relaxed text-surface-300">${step.d}</p>
          </li>`
            )
            .join("")}
        </ol>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="px-5 pb-24 sm:px-8">
    <div class="reveal relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-primary-500/20 bg-gradient-to-br from-primary-900 via-surface-900 to-surface-950 px-6 py-10 sm:px-10">
      <div class="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-secondary-500/10 blur-3xl"></div>
      <div class="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:gap-10">
        ${ctaBadge("h-20 w-20")}
        <div class="min-w-0 flex-1">
          <h2 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">Have an idea in mind?</h2>
          <p class="mt-2 max-w-xl leading-relaxed text-surface-300">We build custom software, SaaS platforms, and AI tools that turn ideas into scalable solutions.</p>
        </div>
        <div class="flex shrink-0 flex-wrap gap-3">
          <a href="/contact" class="btn btn-primary">Start a project ${icon("arrow", "h-4 w-4")}</a>
          <a href="mailto:${site.email}" class="btn btn-ghost">Email us</a>
        </div>
      </div>
    </div>
  </section>
  `,
};
