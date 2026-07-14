import { icon } from "../layout.mjs";
import { heading, ctaBand, heroGlow } from "../ui.mjs";
import { services } from "../../site.config.mjs";

function row(s, i) {
  const flip = i % 2 === 1;
  return `<div class="reveal grid items-center gap-8 rounded-3xl border border-surface-800 bg-surface-900/40 p-8 sm:p-10 lg:grid-cols-2">
    <div class="${flip ? "lg:order-2" : ""}">
      <span class="mb-4 inline-grid h-12 w-12 place-items-center rounded-xl bg-primary-500/10 text-primary-300">${icon(s.icon, "h-6 w-6")}</span>
      <p class="eyebrow text-accent-400">${s.eyebrow}</p>
      <h3 class="mt-2 text-2xl font-bold text-white">${s.title}</h3>
      <p class="mt-3 leading-relaxed text-surface-300">${s.summary}</p>
      <a href="/${s.slug}" class="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-300 hover:text-primary-200">Explore ${s.eyebrow} ${icon("arrow", "h-4 w-4")}</a>
    </div>
    <ul class="grid gap-3 ${flip ? "lg:order-1" : ""}">
      ${s.deliverables
        .map(
          (d) => `<li class="flex items-center gap-3 rounded-xl border border-surface-800 bg-surface-950/50 px-4 py-3 text-sm text-surface-200">
        <span class="text-emerald-400">${icon("check", "h-4 w-4")}</span> ${d}
      </li>`
        )
        .join("")}
    </ul>
  </div>`;
}

export const servicesPage = {
  path: "/services",
  file: "services.html",
  title: "Services",
  description: "AI application development, machine learning, process automation, NLP, computer vision, and AI strategy consulting.",
  render: () => `
  ${heroGlow(`
    <div class="mx-auto max-w-6xl px-5 pb-12 pt-20 text-center sm:px-8 sm:pt-24">
      <p class="eyebrow mb-3 text-primary-400">Services</p>
      <h1 class="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Everything you need to put AI to work</h1>
      <p class="mx-auto mt-5 max-w-xl text-lg text-surface-300">Six capabilities, one partner — from first strategy conversation to production and beyond.</p>
    </div>
  `)}
  <section class="px-5 pb-20 sm:px-8">
    <div class="mx-auto grid max-w-6xl gap-6">
      ${services.map(row).join("\n")}
    </div>
  </section>
  ${ctaBand({ title: "Not sure which you need?", sub: "That’s fine — most projects blend a few. Tell me the problem and I’ll map it to the right approach.", primaryLabel: "Book a call" })}
  `,
};
