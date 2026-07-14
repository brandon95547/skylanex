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

function clientCard(c) {
  return `<div class="reveal rounded-2xl border border-surface-800 bg-surface-900/50 p-6">
    <p class="eyebrow text-surface-500">${c.kind}</p>
    <h3 class="mt-2 text-lg font-bold text-white">${c.name}</h3>
    <p class="mt-2 text-sm leading-relaxed text-surface-400">${c.blurb}</p>
  </div>`;
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
      ${heading({ eyebrow: "Client work", title: "Delivered for teams big and small", center: false })}
      <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        ${work.clients.map(clientCard).join("\n")}
      </div>
    </div>
  </section>

  <section class="px-5 pb-16 sm:px-8">
    <div class="mx-auto max-w-6xl">
      ${heading({ eyebrow: "Creative & video", title: "Music videos & short films", center: false, sub: "Video production is part of the studio too — a creative outlet that keeps the storytelling sharp." })}
      <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        ${work.creative
          .map(
            (c) => `<div class="reveal flex flex-col justify-between rounded-2xl border border-surface-800 bg-gradient-to-br from-surface-900 to-surface-950 p-6">
          <span class="inline-grid h-9 w-9 place-items-center rounded-lg bg-accent-500/10 text-accent-300">${icon("spark", "h-4 w-4")}</span>
          <div class="mt-8">
            <p class="text-xs text-surface-500">${c.kind}</p>
            <h3 class="mt-1 text-base font-semibold text-white">${c.name}</h3>
          </div>
        </div>`
          )
          .join("")}
      </div>
    </div>
  </section>

  ${ctaBand({ title: "Have something you want built?" })}
  `,
};
