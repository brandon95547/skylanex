import { icon } from "../layout.mjs";
import { heading, ctaBand, heroGlow } from "../ui.mjs";
import { mockup, swatches } from "../mockup.mjs";
import { palettes } from "../../site.config.mjs";

const MOODS = [
  { key: "all", label: "All schemes" },
  { key: "dark", label: "Dark" },
  { key: "light", label: "Light" },
  { key: "warm", label: "Warm" },
  { key: "cool", label: "Cool" },
];

// Palette above, the same palette driving a full website below. The `data-mood`
// hook is what the filter chips in assets/js/main.js toggle against.
function paletteCard(p) {
  return `<article id="${p.slug}" class="pal-item reveal scroll-mt-24 rounded-3xl border border-surface-800 bg-surface-900/40 p-6 sm:p-8" data-mood="${p.mood}">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h3 class="text-xl font-bold text-white">${p.name}</h3>
        <p class="mt-1 text-sm text-surface-400">${p.best}</p>
      </div>
      <span class="rounded-full border border-surface-700 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-surface-400">${p.mood}</span>
    </div>

    <div class="mt-6">${swatches(p)}</div>

    <p class="mt-6 text-sm leading-relaxed text-surface-300">${p.note}</p>

    <div class="mt-6">${mockup(p)}</div>
  </article>`;
}

const RULES = [
  {
    icon: "layers",
    t: "The 60 / 30 / 10 split",
    d: "Sixty percent background, thirty percent surfaces and text, ten percent accent. Every scheme below follows it — that ratio is why one accent color can carry a whole site without shouting.",
  },
  {
    icon: "check",
    t: "Contrast is not optional",
    d: "Body text holds at least 4.5:1 against its background and buttons hold 3:1 against theirs. A palette that fails this is a redesign in twelve months, not a style choice.",
  },
  {
    icon: "bolt",
    t: "One accent, used sparingly",
    d: "The accent belongs on the primary action, key numbers, and rules. The moment it lands on a paragraph it stops meaning 'click here' and starts meaning nothing.",
  },
  {
    icon: "shield",
    t: "Match the buying emotion",
    d: "Navy and brass for a decision made out of trust. Safety orange for one made on capability. Cream and burgundy for one made on taste. The palette is a positioning tool.",
  },
];

export const palettesPage = {
  path: "/solutions/color-palettes",
  file: "solutions/color-palettes.html",
  title: "Website Color Palettes",
  metaTitle: "16 Website Color Schemes, Shown on Real Designs · Skylanex",
  description:
    "Sixteen popular website color palettes — navy and brass, safety orange, clinical blue, burgundy and cream, and more — each shown with its hex codes and a full website design using those colors.",
  render: () => `
  ${heroGlow(`
    <div class="mx-auto max-w-6xl px-5 pb-10 pt-20 text-center sm:px-8 sm:pt-24">
      <div class="flex justify-center">
        <a href="/solutions" class="inline-flex items-center gap-1.5 text-sm text-surface-400 hover:text-primary-300">${icon("arrow", "h-4 w-4 rotate-180")} All solutions</a>
      </div>
      <p class="eyebrow mb-3 mt-6 text-primary-400">Color schemes</p>
      <h1 class="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Sixteen palettes, each one shown on a real design</h1>
      <p class="mx-auto mt-5 max-w-2xl text-lg text-surface-300">Hex codes are easy to find. What's hard is knowing how a scheme feels once it's a whole website. So every palette here comes with one — a full page laid out in exactly those colors.</p>
    </div>
  `)}

  <!-- Filter -->
  <section class="sticky top-16 z-30 px-5 py-4 sm:px-8">
    <div class="mx-auto flex max-w-6xl flex-wrap justify-center gap-2 rounded-2xl border border-surface-800 bg-surface-950/85 p-3 backdrop-blur-md" id="palette-filter">
      ${MOODS.map(
        (m) => `<button type="button" class="pal-chip${m.key === "all" ? " is-active" : ""}" data-filter="${m.key}" aria-pressed="${m.key === "all"}">${m.label}</button>`
      ).join("")}
    </div>
  </section>

  <section class="px-5 pb-20 sm:px-8">
    <div class="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2" id="palette-grid">
      ${palettes.map(paletteCard).join("\n")}
    </div>
    <p class="mx-auto mt-8 max-w-2xl text-center text-sm text-surface-500">
      Every preview above is live HTML, not a screenshot — the same eight tokens that theme it are the ones your site would ship with.
    </p>
  </section>

  <!-- Rules -->
  <section class="border-t border-surface-800 px-5 py-20 sm:px-8">
    <div class="mx-auto max-w-6xl">
      ${heading({
        eyebrow: "Choosing well",
        title: "What makes a scheme work",
        sub: "Four rules behind every palette on this page. They're worth knowing even if you build the site yourself.",
      })}
      <div class="mt-12 grid gap-5 sm:grid-cols-2">
        ${RULES.map(
          (r) => `<div class="reveal rounded-2xl border border-surface-800 bg-surface-900/50 p-6">
          <span class="mb-4 inline-grid h-10 w-10 place-items-center rounded-lg bg-primary-500/10 text-primary-300">${icon(r.icon, "h-5 w-5")}</span>
          <h3 class="text-base font-semibold text-white">${r.t}</h3>
          <p class="mt-2 text-sm leading-relaxed text-surface-400">${r.d}</p>
        </div>`
        ).join("")}
      </div>
    </div>
  </section>

  ${ctaBand({
    title: "Found one you like?",
    sub: "Tell me which scheme caught your eye and what your business does — I'll come back with how it would look on your actual pages.",
    primaryLabel: "Start a project",
  })}
  `,
};
