import { icon } from "../layout.mjs";
import { ctaBand, statRow, heroGlow, heading } from "../ui.mjs";
import { site } from "../../site.config.mjs";

const values = [
  { icon: "compass", t: "Honest about AI", d: "If a simpler tool wins, I’ll say so. I care about the outcome, not shipping AI for its own sake." },
  { icon: "bolt", t: "Ship, then iterate", d: "Working software every week beats a perfect spec. You steer as it takes shape." },
  { icon: "shield", t: "Production-minded", d: "Security, cost, and maintainability from day one — not bolted on at the end." },
];

const stack = [
  "Python", "TypeScript", "Node.js", "React", "PostgreSQL", "FastAPI",
  "PyTorch", "LLMs & RAG", "Vector search", "Docker", "AWS", "CI/CD",
];

export const aboutPage = {
  path: "/about",
  file: "about.html",
  title: "About",
  description: `About ${site.owner} — an AI software developer and founder building intelligent products and applications.`,
  render: () => `
  ${heroGlow(`
    <div class="mx-auto max-w-5xl px-5 pb-10 pt-20 sm:px-8 sm:pt-24">
      <div class="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p class="eyebrow mb-3 text-primary-400">About</p>
          <h1 class="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">Hi, I’m ${site.owner} — I build AI that earns its keep.</h1>
          <p class="mt-5 max-w-xl text-lg leading-relaxed text-surface-300">
            I’m an independent AI software developer and founder. For over a decade I’ve shipped web and mobile applications for enterprises and startups — and today I focus on making AI genuinely useful: apps, models, and automation that hold up in production.
          </p>
          <p class="mt-4 max-w-xl leading-relaxed text-surface-400">
            When I’m not building for clients, I build my own products under <a href="${site.phansoraUrl}" target="_blank" rel="noopener" class="text-primary-300 hover:text-primary-200">Phansora</a> — a suite of AI tools that proves this stuff works, not just in a demo.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a href="/contact" class="btn btn-primary">Work with me ${icon("arrow", "h-4 w-4")}</a>
            <a href="/work" class="btn btn-ghost">See the work</a>
          </div>
        </div>
        <div class="relative mx-auto w-full max-w-xs">
          <div class="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary-500/20 to-accent-500/10 blur-2xl"></div>
          <div class="relative grid aspect-square place-items-center rounded-3xl border border-surface-800 bg-gradient-to-br from-surface-900 to-surface-950">
            <span class="grad-text text-7xl font-extrabold">${site.owner.split(" ").map((w) => w[0]).join("")}</span>
          </div>
        </div>
      </div>
    </div>
  `)}

  ${statRow()}

  <section class="px-5 py-20 sm:px-8">
    <div class="mx-auto max-w-6xl">
      ${heading({ eyebrow: "How I work", title: "What you can count on" })}
      <div class="mt-12 grid gap-5 md:grid-cols-3">
        ${values
          .map(
            (v) => `<div class="reveal rounded-2xl border border-surface-800 bg-surface-900/50 p-6">
          <span class="mb-4 inline-grid h-11 w-11 place-items-center rounded-xl bg-primary-500/10 text-primary-300">${icon(v.icon)}</span>
          <h3 class="text-base font-semibold text-white">${v.t}</h3>
          <p class="mt-2 text-sm leading-relaxed text-surface-400">${v.d}</p>
        </div>`
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="px-5 pb-20 sm:px-8">
    <div class="mx-auto max-w-6xl rounded-3xl border border-surface-800 bg-surface-900/40 p-8 sm:p-10">
      ${heading({ eyebrow: "Toolbox", title: "A pragmatic, modern stack", center: false })}
      <div class="mt-6 flex flex-wrap gap-2.5">
        ${stack.map((t) => `<span class="rounded-full border border-surface-800 bg-surface-950/60 px-4 py-2 text-sm text-surface-200">${t}</span>`).join("")}
      </div>
    </div>
  </section>

  ${ctaBand({ title: "Let’s build something together" })}
  `,
};
