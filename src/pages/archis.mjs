import { icon } from "../layout.mjs";
import { heroGlow, afterHero, ctaBand } from "../ui.mjs";

// Archis's landing page. Unlike Shot Matrix, the tool is not embedded here: Archis is a
// React app of its own, served from archis.skylanex.com (repo: brandon95547/archis,
// deployed to /var/www/archis), so this page's job is to say what it does and send
// people to it. The screenshots are of the real thing, captured from the built app.

const APP = "https://archis.skylanex.com";
const REPO = "https://github.com/brandon95547/archis";

// The four stages, in the order a name goes through them. Same order and the same names
// as the repo's own README, so the page and the code describe one thing.
const STAGES = [
  {
    icon: "eye",
    title: "It reads the ideas, not the words",
    body: "Type what a name should carry. Phrases are read before single words, so <em>hidden knowledge</em> is concealment rather than two tags pulling in different directions. A query too thin to work with widens along the concepts nearest it, and says that it did.",
  },
  {
    icon: "layers",
    title: "It gathers roots from the old languages",
    body: "About 185 roots across sixteen traditions — Ancient Greek, Latin, Sanskrit, Pali, Ancient Egyptian, Sumerian, Akkadian, Avestan, Biblical Hebrew, Classical Chinese and more. No language may contribute more than four, or Greek and Latin would answer everything.",
  },
  {
    icon: "spark",
    title: "It blends them, never glues them",
    body: "Every join is negotiated: a doubled vowel is spent once, two vowels that English reads as one sound stay, and a consonant pair the mouth cannot make gets a linking vowel that matches the one before it. The output is judged as spelling, because someone has to say it out loud.",
  },
  {
    icon: "checkCircle",
    title: "It throws most of them away",
    body: "Rejected outright: anything close to an existing brand, vocabulary from invented languages, one syllable or more than four, crowded consonants, three vowels in a row, and two roots that mean the same thing — light joined to light is a stutter, not a meaning.",
  },
];

const DETAILS = [
  ["Every name is newly coined.", "The roots are real; the names are not. Nothing here is presented as a historical word, and each name's panel says what it was made from."],
  ["Nothing is sent anywhere.", "The engine runs in your browser. No account, no upload, no request to a server — the page is the whole product."],
  ["You steer it.", "Length, sound, how ancient it should feel, and how many to see. Change one and the list is coined again."],
  ["Keep what you like.", "Names you keep stay in the browser you kept them in, and copy out as plain text."],
];

export const archisPage = {
  path: "/products/archis",
  file: "products/archis.html",
  title: "Archis",
  metaTitle: "Archis — new names, built from ancient roots · Skylanex",
  description:
    "Free tool: describe what a name should carry and Archis blends real roots from Ancient Greek, Latin, Sanskrit, Egyptian and a dozen more into words that have never been said — and shows exactly what each one was made from.",
  render: () => `
  ${heroGlow(`
    <div class="mx-auto max-w-6xl px-5 pb-14 pt-16 sm:px-8 sm:pt-20">
      <nav aria-label="Breadcrumb" class="mb-6 text-sm text-fg-muted">
        <a href="/products" class="hover:text-fg">Products</a> <span aria-hidden="true" class="mx-1.5">/</span> <span class="text-fg-secondary">Archis</span>
      </nav>
      <p class="eyebrow mb-3 text-primary-200">Free naming tool</p>
      <h1 class="max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-fg sm:text-5xl">Names that have never been said, from roots that have.</h1>
      <p class="mt-5 max-w-2xl text-lg leading-relaxed text-fg-secondary">Tell Archis what a name should carry — <span class="text-fg">truth, wisdom, hidden knowledge</span> — and it finds the roots that hold those ideas across the old languages, then blends them into a word that is new. Click any name and it shows the roots, the languages, and the join.</p>
      <div class="mt-9 flex flex-wrap items-center gap-3">
        <a href="${APP}" class="btn btn-primary min-h-[3.25rem] px-6 text-base">Open Archis ${icon("arrow", "h-4 w-4")}</a>
        <a href="${REPO}" target="_blank" rel="noopener" class="btn btn-ghost min-h-[3.25rem] px-6 text-base">${icon("github", "h-4 w-4")} View on GitHub</a>
      </div>
    </div>
  `)}

  <section class="px-5 ${afterHero} pb-20 sm:px-8">
    <div class="mx-auto max-w-6xl">
      <figure class="reveal overflow-hidden rounded-2xl border border-surface-800 bg-surface-950">
        <img src="/images/products/archis-coining.webp"
          srcset="/images/products/archis-coining-940.webp 940w, /images/products/archis-coining.webp 1920w"
          sizes="(min-width: 1024px) 72rem, 100vw"
          width="1920" height="1200" loading="lazy" decoding="async"
          alt="Archis coining names for “truth, wisdom, hidden knowledge”: dials for length, sound, feel and how many, then cards reading Sophoty, Sophota and Gnosapi, each with its pronunciation and meaning."
          class="block w-full" />
      </figure>
    </div>
  </section>

  <section class="px-5 pb-20 sm:px-8">
    <div class="mx-auto max-w-6xl">
      <h2 class="max-w-2xl text-3xl font-bold tracking-tight text-fg sm:text-4xl">How a name is made</h2>
      <div class="mt-10 grid gap-5 md:grid-cols-2">
        ${STAGES.map(
          (s, i) => `<article class="reveal rounded-2xl border border-surface-800 bg-surface-900/60 p-6">
          <div class="flex items-center gap-3">
            <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-500/10 text-primary-200 ring-1 ring-inset ring-primary-500/25">${icon(s.icon, "h-5 w-5")}</span>
            <span class="text-sm font-semibold tracking-wider text-fg-muted">Stage ${i + 1}</span>
          </div>
          <h3 class="mt-4 text-lg font-bold text-fg">${s.title}</h3>
          <p class="mt-2 leading-relaxed text-fg-secondary">${s.body}</p>
        </article>`
        ).join("")}
      </div>
    </div>
  </section>

  <section class="px-5 pb-20 sm:px-8">
    <div class="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:items-center">
      <div>
        <p class="eyebrow text-primary-200">Show your work</p>
        <h2 class="mt-3 text-2xl font-bold tracking-tight text-fg sm:text-3xl">Every name opens up</h2>
        <p class="mt-3 leading-relaxed text-fg-secondary">A coined name is only worth having if you can say where it came from. Open one and Archis names both roots, the language and century each was pulled from, the stem it was allowed to cut, and what happened where the two met.</p>
        <p class="mt-3 leading-relaxed text-fg-secondary"><span class="text-fg">Gnosapi</span>, for instance, is <em>gnôsis</em> — knowing, from Ancient Greek — carrying Latin <em>sapientia</em>, wisdom, cut back to <span class="whitespace-nowrap">-api</span> so the two meet cleanly.</p>
      </div>
      <figure class="reveal overflow-hidden rounded-2xl border border-surface-800 bg-surface-950">
        <img src="/images/products/archis-detail.webp"
          srcset="/images/products/archis-detail-940.webp 940w, /images/products/archis-detail.webp 1920w"
          sizes="(min-width: 1024px) 44rem, 100vw"
          width="1920" height="1200" loading="lazy" decoding="async"
          alt="The Archis detail panel for Gnosapi: built from gnôsis, Ancient Greek for knowing, and sapientia, Latin for wisdom, with the blendable stems and how they were joined."
          class="block w-full" />
      </figure>
    </div>
  </section>

  <section class="px-5 pb-24 sm:px-8">
    <div class="reveal mx-auto max-w-6xl rounded-2xl border border-surface-800 bg-surface-900/40 p-6 sm:p-8">
      <h2 class="text-lg font-bold text-fg">Good to know</h2>
      <dl class="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2">
        ${DETAILS.map(
          ([term, text]) => `<div>
          <dt class="font-semibold text-fg">${term}</dt>
          <dd class="mt-1 text-sm leading-relaxed text-fg-secondary">${text}</dd>
        </div>`
        ).join("")}
      </dl>
    </div>
  </section>

  ${ctaBand({
    title: "Naming something bigger?",
    sub: "A name is the easy part. If you're building the product behind it, tell us what it has to do and we'll tell you honestly how we'd build it.",
    primaryLabel: "Start a project",
  })}
  `,
};
