import { icon } from "../layout.mjs";
import { ctaBand, heroGlow } from "../ui.mjs";
import { services } from "../../site.config.mjs";

// Renders one service detail page. Also lists the other services at the bottom.
function detail(s) {
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 3);
  return `
  ${heroGlow(`
    <div class="mx-auto max-w-5xl px-5 pb-10 pt-20 sm:px-8 sm:pt-24">
      <a href="/services" class="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-primary-200">${icon("arrow", "h-4 w-4 rotate-180")} All services</a>
      <div class="mt-6 flex items-start gap-5">
        <span class="hidden h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary-500/10 text-primary-200 sm:grid">${icon(s.icon, "h-7 w-7")}</span>
        <div>
          <p class="eyebrow text-secondary-400">${s.eyebrow}</p>
          <h1 class="mt-2 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-fg sm:text-5xl">${s.title}</h1>
          <p class="mt-4 max-w-2xl text-lg leading-relaxed text-fg-secondary">${s.tagline}</p>
        </div>
      </div>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href="/contact" class="btn btn-primary">Start a project ${icon("arrow", "h-4 w-4")}</a>
        <a href="/products" class="btn btn-ghost">See related products</a>
      </div>
    </div>
  `)}

  <section class="px-5 py-16 sm:px-8">
    <div class="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1.2fr_1fr]">
      <div>
        <h2 class="text-2xl font-bold text-fg">What this looks like</h2>
        <p class="mt-4 leading-relaxed text-fg-secondary">${s.summary}</p>
        <div class="mt-8 grid gap-4 sm:grid-cols-3">
          ${s.highlights
            .map(
              (h) => `<div class="rounded-2xl border border-surface-800 bg-surface-900/50 p-5">
            <span class="mb-3 inline-grid h-9 w-9 place-items-center rounded-lg bg-primary-500/10 text-primary-200">${icon("bolt", "h-4 w-4")}</span>
            <h3 class="text-sm font-semibold text-fg">${h.title}</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-fg-muted">${h.text}</p>
          </div>`
            )
            .join("")}
        </div>
      </div>
      <aside>
        <div class="rounded-2xl border border-surface-800 bg-surface-900/60 p-6">
          <h3 class="eyebrow text-fg-secondary">Typical deliverables</h3>
          <ul class="mt-4 space-y-3">
            ${s.deliverables
              .map((d) => `<li class="flex items-center gap-3 text-sm text-surface-200"><span class="text-primary-200">${icon("check", "h-4 w-4")}</span> ${d}</li>`)
              .join("")}
          </ul>
          <a href="/contact" class="btn btn-primary mt-6 w-full">Discuss your project ${icon("arrow", "h-4 w-4")}</a>
        </div>
      </aside>
    </div>
  </section>

  <section class="px-5 pb-4 sm:px-8">
    <div class="mx-auto max-w-5xl">
      <h2 class="text-lg font-semibold text-fg">Explore other services</h2>
      <div class="mt-5 grid gap-4 sm:grid-cols-3">
        ${others
          .map(
            (o) => `<a href="/${o.slug}" class="group rounded-2xl border border-surface-800 bg-surface-900/50 p-5 transition-colors hover:border-primary-500/50">
          <span class="mb-3 inline-grid h-9 w-9 place-items-center rounded-lg bg-primary-500/10 text-primary-200">${icon(o.icon, "h-4 w-4")}</span>
          <h3 class="text-sm font-semibold text-fg">${o.eyebrow}</h3>
          <span class="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary-200">Learn more ${icon("arrow", "h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5")}</span>
        </a>`
          )
          .join("")}
      </div>
    </div>
  </section>

  ${ctaBand({ title: `Ready to talk ${s.eyebrow.toLowerCase()}?` })}
  `;
}

// Export one page object per service.
export const servicePages = services.map((s) => ({
  path: `/${s.slug}`,
  file: `${s.slug}.html`,
  title: s.eyebrow,
  description: s.summary,
  render: () => detail(s),
}));
