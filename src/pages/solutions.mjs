import { icon } from "../layout.mjs";
import { heading, ctaBand, heroGlow } from "../ui.mjs";
import { designSolutions } from "../../site.config.mjs";

// One design solution: a static, modern WebP demo on one side and the case for
// it on the other. Rows alternate so the demos zig-zag down the page.
function solutionRow(s, i) {
  const flip = i % 2 === 1;
  return `<article id="${s.slug}" class="reveal grid scroll-mt-24 items-center gap-8 lg:grid-cols-2 lg:gap-12">
    <div class="${flip ? "lg:order-2" : ""}">
      <img src="${s.image}" width="1200" height="675" loading="lazy" decoding="async"
        alt="${s.name} — modern interface design demo"
        class="w-full rounded-2xl border border-surface-800 bg-surface-900 shadow-2xl shadow-black/40" />
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
      <div class="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a href="/contact" class="btn btn-primary">Start a project ${icon("arrow", "h-4 w-4")}</a>
        ${
          s.example
            ? `<a href="${s.example.href}" class="text-sm font-semibold text-primary-300 hover:text-primary-200">${s.example.label} ${icon("arrow", "h-4 w-4 inline")}</a>`
            : ""
        }
      </div>
    </div>
  </article>`;
}

const PROCESS = [
  { t: "Positioning", d: "Who you're for, what you're best at, and the one action the product exists to produce." },
  { t: "Design system", d: "A palette, type scale, and components — chosen for your brand, not a template." },
  { t: "Build & integrate", d: "Fast, modern build wired to booking, CRM, payments, and the tools you already run." },
  { t: "Launch & measure", d: "Analytics, search setup, and a plan for what earns traffic and conversions next." },
];

export const solutionsPage = {
  path: "/solutions",
  file: "solutions.html",
  title: "Solutions",
  metaTitle: "Design & Build Solutions — Websites, Apps, CRM & More · Skylanex",
  description:
    "What Skylanex designs and builds — modern websites, web & mobile apps, custom CRMs, dashboards, AI assistants, and e-commerce. See a demo of each.",
  render: () => `
  ${heroGlow(`
    <div class="mx-auto max-w-6xl px-5 pb-12 pt-20 text-center sm:px-8 sm:pt-24">
      <p class="eyebrow mb-3 text-primary-400">Solutions</p>
      <h1 class="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Design and build, for the way you actually work</h1>
      <p class="mx-auto mt-5 max-w-2xl text-lg text-surface-300">Websites, apps, CRMs, dashboards, AI assistants, and storefronts — each designed around the outcome it exists to produce. Every one below comes with a modern demo you can look at right now.</p>
      <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a href="/contact" class="btn btn-primary">Start a project ${icon("arrow", "h-4 w-4")}</a>
        <a href="/work" class="btn btn-ghost">See our work</a>
      </div>
    </div>
  `)}

  <!-- Jump nav -->
  <section class="px-5 pb-10 sm:px-8">
    <div class="mx-auto flex max-w-6xl flex-wrap justify-center gap-2">
      ${designSolutions
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
      ${designSolutions.map(solutionRow).join("\n")}
    </div>
  </section>

  <!-- Process -->
  <section class="border-t border-surface-800 px-5 py-20 sm:px-8">
    <div class="mx-auto max-w-6xl">
      ${heading({
        eyebrow: "How it works",
        title: "Four steps, no mystery",
        sub: "Same process whether it's a marketing site, a SaaS app, or a custom CRM — the difference is what we build, not how we get there.",
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
    title: "Tell me what you're building",
    sub: "Send a note with what you do and who you sell to. You'll get an honest read on what to build — and a fixed number to do it.",
    primaryLabel: "Start a project",
  })}
  `,
};
