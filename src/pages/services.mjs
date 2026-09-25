import { icon } from "../layout.mjs";
import { heading, ctaBand, heroGlow, afterHero } from "../ui.mjs";
import { services, serviceGroups } from "../../site.config.mjs";

function row(s, i) {
  const flip = i % 2 === 1;
  return `<div class="reveal grid items-center gap-8 rounded-3xl border border-surface-800 bg-surface-900/40 p-8 sm:p-10 lg:grid-cols-2">
    <div class="${flip ? "lg:order-2" : ""}">
      <span class="mb-4 inline-grid h-12 w-12 place-items-center rounded-xl bg-primary-500/10 text-primary-200">${icon(s.icon, "h-6 w-6")}</span>
      <p class="eyebrow text-secondary-400">${s.eyebrow}</p>
      <h3 class="mt-2 text-2xl font-bold text-fg">${s.title}</h3>
      <p class="mt-3 leading-relaxed text-fg-secondary">${s.summary}</p>
      <a href="/${s.slug}" class="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-200 hover:text-primary-200">Explore ${s.eyebrow} ${icon("arrow", "h-4 w-4")}</a>
    </div>
    <ul class="grid gap-3 ${flip ? "lg:order-1" : ""}">
      ${s.deliverables
        .map(
          (d) => `<li class="flex items-center gap-3 rounded-xl border border-surface-800 bg-surface-950/50 px-4 py-3 text-sm text-surface-200">
        <span class="text-primary-200">${icon("check", "h-4 w-4")}</span> ${d}
      </li>`
        )
        .join("")}
    </ul>
  </div>`;
}

// The smaller groups get cards rather than full rows: seven alternating rows of AI
// disciplines would bury the care plans at the bottom of a very long page.
function card(s) {
  return `<a href="/${s.slug}" class="reveal group flex flex-col rounded-2xl border border-surface-800 bg-surface-900/60 p-6 transition-colors hover:border-primary-500/50">
    <span class="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-primary-500/10 text-primary-200 transition-colors group-hover:bg-primary-500/20">${icon(s.icon)}</span>
    <h3 class="text-base font-semibold text-fg">${s.eyebrow}</h3>
    <p class="mt-2 flex-1 text-sm leading-relaxed text-fg-secondary">${s.tagline}</p>
    <span class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-200">Learn more ${icon("arrow", "h-4 w-4 transition-transform group-hover:translate-x-0.5")}</span>
  </a>`;
}

// Each group sits under its own h2, so the rows and cards beneath are h3s.
function group(g) {
  const list = services.filter((s) => s.group === g.key);
  const body =
    g.key === "build"
      ? `<div class="mt-10 grid gap-6">${list.map(row).join("\n")}</div>`
      : `<div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">${list.map(card).join("\n")}</div>`;
  return `<section class="px-5 pb-20 sm:px-8">
    <div class="mx-auto max-w-6xl">
      ${heading({ eyebrow: g.eyebrow, title: g.title, center: false })}
      ${body}
    </div>
  </section>`;
}

export const servicesPage = {
  path: "/services",
  file: "services.html",
  title: "Services",
  metaTitle: "Services: Websites, Apps, Software & AI · Skylanex",
  description: "Website design, WordPress, custom software, mobile apps, e-commerce, AI chatbots and automation, and website care plans — one studio from first call to launch.",
  render: () => `
  ${heroGlow(`
    <div class="mx-auto max-w-6xl px-5 pb-12 pt-20 text-center sm:px-8 sm:pt-24">
      <p class="eyebrow mb-3 text-primary-200">Services</p>
      <h1 class="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">Websites, apps, software, and AI — built by one studio</h1>
      <p class="mx-auto mt-5 max-w-xl text-lg text-fg-secondary">From a new website to a custom platform, one partner from the first conversation through launch and beyond.</p>
    </div>
  `)}
  <div class="${afterHero}"></div>
  ${serviceGroups.map(group).join("\n")}
  ${ctaBand({ title: "Not sure which you need?", sub: "That’s fine — most projects blend a few. Tell us the problem and we’ll map it to the right approach.", primaryLabel: "Book a call" })}
  `,
};
