import { icon, assetUrl } from "../layout.mjs";
import { heroGlow, afterHero, ctaBand } from "../ui.mjs";

// Shot Matrix's own landing page, and the tool itself: type an address, get the page back
// from three engines at eight sizes, as one zip. The rendering happens in the shotmatrix
// service (github.com/brandon95547/shotmatrix), which nginx exposes at /api/shotmatrix and
// opens only to a signed-in account (the accounts are Phansora's; see ./account.mjs). The
// browser side is assets/js/shotmatrix.js.

const API = "/api/shotmatrix";
const REPO = "https://github.com/brandon95547/shotmatrix";

// A copy of the service's matrix (lib/matrix.mjs in that repo). The service refuses a key
// it does not know, so a size added there and not here fails loudly rather than quietly —
// but it does need adding here to be offered.
const ENGINES = [
  { key: "chromium", label: "Chromium", standsFor: "Chrome, Edge, Brave, Opera, Samsung Internet and every Android WebView" },
  { key: "firefox", label: "Firefox", standsFor: "Firefox, and nothing else" },
  { key: "webkit", label: "WebKit", standsFor: "Safari, and every browser on an iPhone or iPad" },
];

const VIEWPORTS = [
  { key: "desktop-1920", group: "Desktop", label: "Desktop", width: 1920, height: 1080, mobile: false },
  { key: "laptop-1440", group: "Desktop", label: "Laptop", width: 1440, height: 900, mobile: false },
  { key: "laptop-1280", group: "Desktop", label: "Small laptop", width: 1280, height: 800, mobile: false },
  { key: "tablet-landscape", group: "Tablet", label: "Tablet landscape", width: 1024, height: 768, mobile: true },
  { key: "tablet-portrait", group: "Tablet", label: "Tablet portrait", width: 820, height: 1180, mobile: true },
  { key: "phone-large", group: "Phone", label: "Large phone", width: 430, height: 932, mobile: true },
  { key: "phone-390", group: "Phone", label: "Phone", width: 390, height: 844, mobile: true },
  { key: "phone-small", group: "Phone", label: "Small phone", width: 360, height: 740, mobile: true },
];

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// A toggle that is a real checkbox underneath, so it is a checkbox to a screen reader and
// to the keyboard. The pill is the checkbox's next sibling and reads its state with
// peer-checked. The tick is the cue that is not colour alone, and it sits INSIDE the
// pill, where peer-checked cannot reach on its own — hence [&_svg]. Hidden rather than
// removed when off, so a chip keeps its width as it toggles.
function chip({ name, value, label, title }) {
  return `<label class="relative cursor-pointer select-none" title="${esc(title || label)}">
    <input type="checkbox" name="${name}" value="${value}" checked class="peer absolute inset-0 h-full w-full cursor-pointer opacity-0" aria-label="${esc(title || label)}" />
    <span class="inline-flex items-center gap-1.5 rounded-lg border border-surface-700 px-2.5 py-1.5 text-[0.9375rem] font-medium sm:px-3 text-fg-secondary transition-colors
      hover:border-surface-600 hover:text-fg
      peer-checked:border-primary-500/40 peer-checked:bg-primary-500/15 peer-checked:text-primary-100 peer-checked:[&_svg]:opacity-100
      peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-400">
      <svg class="h-3.5 w-3.5 opacity-0 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>${esc(label)}</span>
  </label>`;
}

// Each group's label sits above its chips on a phone and beside them from sm up. Beside
// them on a phone, "Desktop" plus three chips is wider than the form, and the third chip
// wrapped under the label, as if it belonged to no group.
function sizeGroups() {
  const groups = ["Desktop", "Tablet", "Phone"];
  return groups
    .map(
      (g) => `<div class="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center">
      <span class="text-sm text-fg-muted sm:mr-1">${g}</span>
      <div class="flex flex-wrap gap-1.5">
        ${VIEWPORTS.filter((v) => v.group === g)
          .map((v) => chip({ name: "viewports", value: v.key, label: String(v.width), title: `${v.label}, ${v.width} × ${v.height}` }))
          .join("")}
      </div>
    </div>`
    )
    .join("");
}

// The form. Everything the script needs to know about the matrix rides on data
// attributes, so the list lives in exactly one place on this side.
function tool() {
  const engines = ENGINES.map(({ key, label }) => ({ key, label }));
  const viewports = VIEWPORTS.map(({ key, label, width, height, mobile }) => ({ key, label, width, height, mobile }));
  return `<form id="sm-form" class="mt-9 rounded-3xl border border-surface-800 bg-surface-900/80 p-4 shadow-xl backdrop-blur sm:p-6" novalidate
    data-api="${API}" data-login="/login/" data-pow="${assetUrl("/js/shotmatrix-pow.js")}" data-engines="${esc(JSON.stringify(engines))}" data-viewports="${esc(JSON.stringify(viewports))}">
    <div class="flex flex-col gap-3 sm:flex-row">
      <label for="sm-url" class="sr-only">Address of the page to capture</label>
      <div class="relative min-w-0 flex-1">
        <span class="pointer-events-none absolute inset-y-0 left-4 grid place-items-center text-fg-muted">${icon("link", "h-5 w-5")}</span>
        <input id="sm-url" name="url" type="url" inputmode="url" autocomplete="url" autocapitalize="off" spellcheck="false" required
          placeholder="https://your-site.com"
          class="w-full rounded-xl border border-surface-700 bg-surface-950/80 py-3.5 pl-12 pr-4 text-base text-fg placeholder:text-fg-muted outline-none transition-colors focus:border-primary-400" />
      </div>
      <button id="sm-go" type="submit" class="btn btn-primary min-h-[3.25rem] shrink-0 px-6 text-base">
        <span data-label>Capture screenshots</span> ${icon("arrow", "h-4 w-4")}
      </button>
    </div>

    <div class="mt-5 grid gap-4 border-t border-surface-800 pt-5 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-x-10">
      <fieldset class="min-w-0">
        <legend class="mb-2 text-sm font-semibold text-fg">Browsers</legend>
        <div class="flex flex-wrap gap-1.5">
          ${ENGINES.map((e) => chip({ name: "engines", value: e.key, label: e.label, title: `${e.label}: ${e.standsFor}` })).join("")}
        </div>
      </fieldset>
      <fieldset class="min-w-0">
        <legend class="mb-2 text-sm font-semibold text-fg">Screen widths</legend>
        <div class="flex flex-wrap gap-x-5 gap-y-2">${sizeGroups()}</div>
      </fieldset>
    </div>

    <!-- Honeypot: hidden from people and screen readers, skipped by tab. Bots fill every
         input they find, and the service refuses any run that has this set. -->
    <div class="hidden" aria-hidden="true">
      <label>Website<input name="website" type="text" tabindex="-1" autocomplete="off" /></label>
    </div>

    <p id="sm-note" class="mt-4 min-h-[1.5rem] text-sm text-fg-muted" role="status" aria-live="polite">
      Free with an account. Public pages only. You get one zip, and our copy is deleted as it downloads.
    </p>
    <!-- Who is signed in, or the way to sign in. Filled by the script once it knows. -->
    <p id="sm-account" class="mt-1 text-sm text-fg-secondary" hidden></p>
  </form>`;
}

// The run's progress and then its report live here once a run starts; the script builds
// them. `hidden` until then, so a visitor who never presses the button never sees an empty
// frame. The screenshots themselves are never shown: they arrive as one zip, downloaded
// the moment the run finishes, and the service deletes its copy as the download completes.
function results() {
  return `<section id="sm-results" class="scroll-mt-24 px-5 ${afterHero} sm:px-8" hidden aria-labelledby="sm-results-title">
    <div class="mx-auto max-w-6xl">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div class="min-w-0">
          <p class="eyebrow text-primary-200">Results</p>
          <h2 id="sm-results-title" class="mt-2 truncate text-2xl font-bold tracking-tight text-fg sm:text-3xl" data-host></h2>
          <p class="mt-1 text-fg-secondary" data-status role="status" aria-live="polite"></p>
        </div>
        <div class="flex shrink-0 flex-wrap gap-2" data-actions hidden>
          <button type="button" class="btn btn-primary" data-save>${icon("download", "h-4 w-4")} Save zip</button>
        </div>
      </div>
      <div class="mt-5 h-1.5 overflow-hidden rounded-full bg-surface-800" role="progressbar" aria-label="Screenshots rendered" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" data-bar>
        <div class="h-full w-0 rounded-full bg-primary-500 transition-[width] duration-500" data-fill></div>
      </div>
      <p class="mt-3 text-sm text-fg-secondary" data-download role="status" aria-live="polite"></p>
      <div class="mt-8 space-y-8" data-report></div>
    </div>
  </section>`;
}

const CHECKS = [
  {
    icon: "browser",
    title: "Three engines cover every browser",
    body: "Every browser you can name runs on one of three engines. <strong class=\"font-semibold text-fg\">Chromium</strong> stands for Chrome, Edge, Brave and Android. <strong class=\"font-semibold text-fg\">WebKit</strong> is Safari, and every browser on an iPhone, because Apple requires it. <strong class=\"font-semibold text-fg\">Firefox</strong> is Firefox.",
  },
  {
    icon: "grid",
    title: "Eight widths people actually have",
    body: "From a 1920 desktop down to 360px, the narrow Android floor where layouts break first. Tablet and phone sizes get touch and a mobile user agent, because plenty of sites change their menu on either.",
  },
  {
    icon: "eye",
    title: "What a picture can’t show",
    body: "Each shot is flagged if the page scrolls sideways, if a stylesheet, font, script or image failed to load, if it threw a JavaScript error, or if the server answered with an error page. The page lists what it found; the zip’s report.json has every detail.",
  },
];

const DETAILS = [
  ["Nothing is clicked.", "Cookie banners and pop-ups appear exactly as a first-time visitor sees them."],
  ["Public pages only.", "It can’t reach anything behind a login, on localhost, or on a private network."],
  ["Rendered at 1x.", "Full-page shots stop at 10,000px tall. The terminal version below has no limit and uses each device’s real pixel density."],
  ["Firefox has no mobile mode.", "Its phone-width shots get the width, which is what most responsive CSS keys on, but not touch."],
  ["WebKit is the engine, not the app.", "These are Playwright’s builds of Safari’s engine. Read those shots as “WebKit says”, not “Safari says”."],
  ["Yours, then gone.", "Up to six runs an hour per account, one at a time. The zip is the only copy: ours is deleted the moment it downloads, or 10 minutes after the run if it never does."],
];

export const shotMatrixPage = {
  path: "/products/shot-matrix",
  file: "products/shot-matrix.html",
  title: "Shot Matrix",
  metaTitle: "Shot Matrix — free screenshots in every browser, at every size · Skylanex",
  description:
    "Free tool: screenshot any public page in Chromium, Firefox and WebKit at eight real device widths, delivered as one zip, and catch the sideways scroll, failed requests and script errors a picture can’t show.",
  scripts: ["/js/shotmatrix.js"],
  render: () => `
  ${heroGlow(`
    <div class="mx-auto max-w-6xl px-5 pb-14 pt-16 sm:px-8 sm:pt-20">
      <nav aria-label="Breadcrumb" class="mb-6 text-sm text-fg-muted">
        <a href="/products" class="hover:text-fg">Products</a> <span aria-hidden="true" class="mx-1.5">/</span> <span class="text-fg-secondary">Shot Matrix</span>
      </nav>
      <p class="eyebrow mb-3 text-primary-200">Free developer tool</p>
      <h1 class="max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-fg sm:text-5xl">Screenshot any page in every browser, at every size.</h1>
      <p class="mt-5 max-w-2xl text-lg leading-relaxed text-fg-secondary">Shot Matrix loads a page in Chromium, Firefox and WebKit at eight real device widths and hands you every screenshot in one zip, so the layout that breaks at 360px turns up here instead of on a customer’s phone.</p>
      ${tool()}
    </div>
  `)}

  ${results()}

  <section class="px-5 pb-20 pt-20 sm:px-8">
    <div class="mx-auto max-w-6xl">
      <h2 class="max-w-2xl text-3xl font-bold tracking-tight text-fg sm:text-4xl">Twenty-four screenshots, and what they can’t show you</h2>
      <div class="mt-10 grid gap-5 md:grid-cols-3">
        ${CHECKS.map(
          (c) => `<article class="reveal rounded-2xl border border-surface-800 bg-surface-900/60 p-6">
          <span class="grid h-11 w-11 place-items-center rounded-xl bg-primary-500/10 text-primary-200 ring-1 ring-inset ring-primary-500/25">${icon(c.icon, "h-5 w-5")}</span>
          <h3 class="mt-5 text-lg font-bold text-fg">${c.title}</h3>
          <p class="mt-2 leading-relaxed text-fg-secondary">${c.body}</p>
        </article>`
        ).join("")}
      </div>

      <div class="reveal mt-12 rounded-2xl border border-surface-800 bg-surface-900/40 p-6 sm:p-8">
        <h2 class="text-lg font-bold text-fg">Good to know</h2>
        <dl class="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          ${DETAILS.map(
            ([term, text]) => `<div>
            <dt class="font-semibold text-fg">${term}</dt>
            <dd class="mt-1 text-sm leading-relaxed text-fg-secondary">${text}</dd>
          </div>`
          ).join("")}
        </dl>
      </div>
    </div>
  </section>

  <section class="px-5 pb-24 sm:px-8">
    <div class="reveal mx-auto grid max-w-6xl gap-8 rounded-3xl border border-surface-800 bg-surface-900/60 p-6 sm:p-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-center">
      <div>
        <p class="eyebrow text-primary-200">Open source</p>
        <h2 class="mt-3 text-2xl font-bold tracking-tight text-fg sm:text-3xl">Run it from your terminal</h2>
        <p class="mt-3 leading-relaxed text-fg-secondary">The same matrix with no limits. It uses real pixel densities, can render dark mode, and takes a <code class="whitespace-nowrap rounded bg-surface-800 px-1.5 py-0.5 text-[0.9em] text-fg">--dismiss</code> selector for cookie banners. Each run writes a contact sheet you open locally.</p>
        <a href="${REPO}" target="_blank" rel="noopener" class="btn btn-ghost mt-6">${icon("github", "h-4 w-4")} View on GitHub</a>
      </div>
      <pre class="overflow-x-auto rounded-2xl border border-surface-800 bg-surface-950 p-5 text-sm leading-7 text-fg"><code><span class="text-fg-muted"># Node 18+ and about 400 MB of browsers</span>
git clone ${REPO}
cd shotmatrix && npm install
npx playwright install chromium firefox webkit

node shot.mjs https://your-site.com</code></pre>
    </div>
  </section>

  ${ctaBand({
    title: "Found something broken?",
    sub: "We fix responsive layouts and build sites that hold up at every width. Send us what the screenshots showed.",
    primaryLabel: "Get in touch",
  })}
  `,
};
