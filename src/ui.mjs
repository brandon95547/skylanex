// ui.mjs — reusable content snippets shared across pages.
import { icon } from "./layout.mjs";
import { site, stats as statData } from "../site.config.mjs";

export function heading({ eyebrow, title, sub, center = true, light = false }) {
  return `<div class="${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}">
    ${eyebrow ? `<p class="eyebrow mb-3 text-primary-400">${eyebrow}</p>` : ""}
    <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">${title}</h2>
    ${sub ? `<p class="mt-4 text-lg leading-relaxed text-surface-300">${sub}</p>` : ""}
  </div>`;
}

export function ctaBand({ title, sub, primaryLabel = "Start a project", primaryHref = "/contact" } = {}) {
  return `<section class="px-5 pb-24 sm:px-8">
    <div class="reveal relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-primary-500/20 bg-gradient-to-br from-primary-900 via-surface-900 to-surface-950 px-6 py-14 text-center sm:px-12">
      <div class="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-accent-500/10 blur-3xl"></div>
      <div class="relative">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">${title || "Let’s build something intelligent"}</h2>
        <p class="mx-auto mt-4 max-w-xl text-lg text-surface-300">${sub || "Tell me what you’re working on — I’ll tell you honestly whether AI is the right tool, and how I’d build it."}</p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="${primaryHref}" class="btn btn-primary">${primaryLabel} ${icon("arrow", "h-4 w-4")}</a>
          <a href="mailto:${site.email}" class="btn btn-ghost">Email me</a>
        </div>
      </div>
    </div>
  </section>`;
}

export function statRow() {
  return `<section class="border-y border-surface-800 bg-surface-950 px-5 py-14 sm:px-8">
    <div class="mx-auto grid max-w-5xl grid-cols-2 gap-8 text-center sm:grid-cols-4">
      ${statData
        .map(
          (s) => `<div class="reveal">
        <p class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">${s.value}</p>
        <p class="mt-1 text-sm text-surface-400">${s.label}</p>
      </div>`
        )
        .join("")}
    </div>
  </section>`;
}

// A soft decorative gradient glow container for hero sections.
export function heroGlow(inner) {
  return `<section class="relative overflow-hidden">
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute left-1/2 top-[-10%] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary-600/20 blur-3xl"></div>
      <div class="absolute right-[-10%] top-[20%] h-[320px] w-[420px] rounded-full bg-accent-500/10 blur-3xl"></div>
    </div>
    <div class="relative">${inner}</div>
  </section>`;
}
