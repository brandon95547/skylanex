import { icon } from "../layout.mjs";
import { heroGlow, afterHero, ctaBand } from "../ui.mjs";

// Mercavo's landing page, written while Mercavo is still being built.
//
// The card on /products pointed at "#" until this existed, which is a link that goes
// nowhere and tells a visitor nothing. This page's job is smaller than Archis's: say what
// the thing is, say plainly that it is not finished, and give someone who wants it a way
// to say so. It deliberately does NOT describe features in the present tense — everything
// below is what Mercavo WILL do, and the page says which parts are still being written.
//
// No screenshots, for the same reason: there is nothing shipped to photograph, and a mock
// presented as a product is the one thing a "coming soon" page must not do.

const PLANNED = [
  {
    icon: "cart",
    title: "Products, cart and checkout",
    body: "A catalogue, a cart and a checkout that belong to the plugin rather than to a framework layered on top of it. Simple and variable products, stock counts, and a checkout that is one page.",
  },
  {
    icon: "list",
    title: "Orders and inventory",
    body: "Orders with a real status history, inventory that decrements when it should, and refunds that reverse both. The parts a shop discovers it needs in its second week, not its sixth month.",
  },
  {
    icon: "scale",
    title: "Tax and shipping",
    body: "Rates by region, per-product tax classes, and shipping priced by weight, by zone or by flat rate — configured in the admin rather than in a filter hook.",
  },
  {
    icon: "bolt",
    title: "No WooCommerce underneath",
    body: "Not a WooCommerce extension and not a fork. Mercavo is the commerce layer itself, so a site carries one plugin's tables, one plugin's admin and one plugin's updates.",
  },
];

// Said plainly. A "coming soon" page that implies more progress than exists is worse than
// no page, because the person reading it is deciding whether to wait.
const STATUS = [
  ["Where it is", "In active development. The data model and the product/cart layer are the parts being built now."],
  ["What is not decided", "Payment gateway coverage beyond the first integration, and whether migration from an existing WooCommerce store ships in the first release."],
  ["When", "No date yet. We would rather say nothing than name a month twice."],
];

export const mercavoPage = {
  path: "/products/mercavo",
  file: "products/mercavo.html",
  title: "Mercavo",
  metaTitle: "Mercavo — standalone WordPress commerce, in development · Skylanex",
  description:
    "Mercavo is standalone WordPress commerce — products, cart, checkout, orders, inventory, tax and shipping, with no WooCommerce underneath it. Currently in development.",
  render: () => `
  ${heroGlow(`
    <div class="mx-auto max-w-6xl px-5 pb-14 pt-16 sm:px-8 sm:pt-20">
      <nav aria-label="Breadcrumb" class="mb-6 text-sm text-fg-muted">
        <a href="/products" class="hover:text-fg">Products</a> <span aria-hidden="true" class="mx-1.5">/</span> <span class="text-fg-secondary">Mercavo</span>
      </nav>
      <p class="eyebrow mb-3 text-primary-200">WordPress plugin</p>
      <h1 class="max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-fg sm:text-5xl">Standalone WordPress commerce. Coming soon.</h1>
      <p class="mt-5 max-w-2xl text-lg leading-relaxed text-fg-secondary">Mercavo is a commerce plugin that owns its own stack — products, cart, checkout, orders, inventory, tax and shipping, with <span class="text-fg">no WooCommerce underneath it</span>. It is currently in development and is not available yet.</p>
      <div class="mt-9 flex flex-wrap items-center gap-3">
        <a href="/contact" class="btn btn-primary min-h-[3.25rem] px-6 text-base">Tell us you want it ${icon("arrow", "h-4 w-4")}</a>
        <a href="/products" class="btn btn-ghost min-h-[3.25rem] px-6 text-base">See what is shipping</a>
      </div>
      <!-- accent, not amber. The theme declares four ramps (surface / primary / secondary
           / accent) and reserves emerald and rose for success and error; amber is not in
           it. accent is violet and documented as the hue to reach for when something
           needs contrast AGAINST the blue, which is what a status chip beside a primary
           CTA is asking for. -->
      <p class="mt-5 inline-flex items-center gap-2 rounded-lg border border-accent-500/25 bg-accent-500/10 px-3 py-2 text-sm text-accent-200">
        ${icon("wrench", "h-4 w-4")} In development — no release date announced
      </p>
    </div>
  `)}

  <section class="${afterHero} px-5 pb-20 sm:px-8">
    <div class="mx-auto max-w-6xl">
      <h2 class="reveal text-2xl font-bold tracking-tight text-fg sm:text-3xl">What it will do</h2>
      <p class="reveal mt-3 max-w-2xl text-base leading-relaxed text-fg-secondary">Written as intent, not as a feature list of something you can install today.</p>
      <div class="mt-8 grid gap-5 sm:grid-cols-2">
        ${PLANNED.map(
          (f) => `<article class="reveal flex flex-col rounded-2xl border border-surface-800 bg-surface-900/50 p-6">
          <span class="grid h-11 w-11 place-items-center rounded-xl bg-surface-700/40 text-fg-secondary ring-1 ring-inset ring-surface-600/40">${icon(f.icon, "h-5 w-5")}</span>
          <h3 class="mt-5 text-lg font-bold text-fg">${f.title}</h3>
          <p class="mt-2 text-sm leading-relaxed text-fg-secondary">${f.body}</p>
        </article>`
        ).join("")}
      </div>
    </div>
  </section>

  <section class="px-5 pb-24 sm:px-8">
    <div class="mx-auto max-w-6xl">
      <h2 class="reveal text-2xl font-bold tracking-tight text-fg sm:text-3xl">Where it actually stands</h2>
      <dl class="reveal mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-3">
        ${STATUS.map(
          ([term, text]) => `<div>
          <dt class="text-sm font-semibold text-fg">${term}</dt>
          <dd class="mt-1 text-sm leading-relaxed text-fg-secondary">${text}</dd>
        </div>`
        ).join("")}
      </dl>
    </div>
  </section>

  ${ctaBand({
    title: "Need commerce on WordPress before Mercavo lands?",
    sub: "We build the shop as well as the plugin. Tell us what it has to sell and how, and we'll tell you honestly whether to wait for this or to build now.",
    primaryLabel: "Start a project",
  })}
  `,
};
