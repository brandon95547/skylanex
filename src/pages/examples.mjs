import { icon } from "../layout.mjs";
import { ctaBand, heroGlow } from "../ui.mjs";
import { solutions, industryPages } from "../../site.config.mjs";

// The industry landing page (and its lead preview image) for a solution, if one
// exists. `industryPages[].solution` points back at a solutions[] slug.
const landingFor = (s) => industryPages.find((p) => p.solution === s.slug);

// Examples gallery: industry tabs. The industries with a dedicated landing page
// (currently only attorneys → /solutions/law-firms) are live links; the rest are
// inert "coming soon" tabs until their pages are built. Driven by solutions[]
// in site.config, so a new industry going live is just adding its `landing`.

function tab(s) {
  if (s.landing) {
    return `<a href="/solutions/${s.landing}" class="pal-chip pal-chip--linked inline-flex items-center gap-2">
      <span class="text-primary-300">${icon(s.icon, "h-4 w-4")}</span>${s.name}
    </a>`;
  }
  return `<span class="pal-chip inline-flex cursor-default items-center gap-2 opacity-45" aria-disabled="true">
    <span>${icon(s.icon, "h-4 w-4")}</span>${s.name}
    <span class="ml-1 rounded-full bg-surface-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-surface-400">Soon</span>
  </span>`;
}

// Featured card for each live industry — a preview into its examples, using the
// first design concept from its landing page as the cover image.
function featured(s) {
  const page = landingFor(s);
  const cover = page && page.showcase[0] ? page.showcase[0].slug : "hawthorne";
  return `<a href="/solutions/${s.landing}" class="reveal group block overflow-hidden rounded-2xl border border-surface-800 bg-surface-900/50 transition hover:border-surface-600">
    <div class="overflow-hidden">
      <img src="/images/concepts/${cover}.webp" width="1200" height="675" loading="lazy" decoding="async"
        alt="${s.name} website design examples"
        class="w-full transition-transform duration-500 group-hover:scale-[1.02]" />
    </div>
    <div class="flex items-center justify-between gap-4 p-6">
      <div>
        <span class="mb-3 inline-grid h-11 w-11 place-items-center rounded-xl bg-primary-500/10 text-primary-300">${icon(s.icon, "h-5 w-5")}</span>
        <h3 class="text-xl font-bold text-white">${s.name}</h3>
        <p class="mt-2 max-w-xl text-sm leading-relaxed text-surface-400">${s.summary}</p>
      </div>
      <span class="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-primary-300 group-hover:text-primary-200 sm:inline-flex">
        View examples ${icon("arrow", "h-4 w-4")}
      </span>
    </div>
  </a>`;
}

export const examplesPage = {
  path: "/website-solutions",
  file: "website-solutions.html",
  title: "Website Solutions",
  metaTitle: "Website Solutions by Industry · Skylanex",
  description:
    "Design examples by industry — law firms, and more industries coming soon. See how Skylanex tailors a site to the way each industry actually sells.",
  render: () => {
    const live = solutions.filter((s) => s.landing);
    return `
  ${heroGlow(`
    <div class="mx-auto max-w-5xl px-5 pb-10 pt-20 sm:px-8 sm:pt-24">
      <a href="/solutions" class="inline-flex items-center gap-1.5 text-sm text-surface-400 hover:text-primary-300">${icon("arrow", "h-4 w-4 rotate-180")} Back to solutions</a>
      <p class="eyebrow mt-6 text-primary-400">Website Solutions</p>
      <h1 class="mt-2 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">Websites Built for Your Industry</h1>
      <p class="mt-5 max-w-2xl text-lg leading-relaxed text-surface-300">A law firm and a roofing company are not the same business, and they should not get the same website. Pick an industry to see the designs built for the way it actually sells — more are on the way.</p>
    </div>
  `)}

  <!-- Industry tabs -->
  <section class="px-5 pb-12 sm:px-8">
    <div class="mx-auto flex max-w-5xl flex-wrap justify-center gap-2.5">
      ${solutions.map(tab).join("\n")}
    </div>
  </section>

  <!-- Live examples -->
  <section class="px-5 pb-20 sm:px-8">
    <div class="mx-auto grid max-w-5xl gap-8">
      ${live.map(featured).join("\n")}
    </div>
  </section>

  ${ctaBand({
    title: "Don't see your industry yet?",
    sub: "More industry example pages are in the works. Tell me what you do and who you sell to, and I'll show you what your site should be doing differently.",
    primaryLabel: "Start a project",
  })}
  `;
  },
};
