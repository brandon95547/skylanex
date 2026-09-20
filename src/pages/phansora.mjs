import { icon } from "../layout.mjs";
import { heroGlow, afterHero, ctaBand } from "../ui.mjs";
import { products, site } from "../../site.config.mjs";

// The five products of the suite, in the order this page presents them — which is not
// the platform's own order (phansora/src/products.js leads with Book Alchemy). It is
// the order the reference mocks number them in, 01 to 05. All five have interface art
// now, so each has a section of its own and the "/ 05" counts exactly what is on the
// page.
//
// A section's number is its index in this array, so moving an entry renumbers it.
// SpokenVerse was 04 until its rebuilt reference put it at 05, behind Research Atlas.
//
// `href` is taken from that app's product registry rather than guessed, and every one
// of them now goes to a dashboard: "Explore X" opens the thing the screenshot above it
// is a picture of. Phansora's `requireDashboardSession` sends a logged-out visitor to
// /login?next=<that path> and drops them back on the product once they are in, so the
// link works either way.
const SUITE = [
  {
    name: "Narrava Studio",
    tagline: "Turn ideas into stunning videos.",
    blurb:
      "An all-in-one AI video studio for creating professional videos with scripts, media, AI narration, subtitles, transitions, and more.",
    href: `${site.phansoraUrl}/dashboard/narrava-studio`,
    icon: "clapper",
  },
  {
    name: "Chrono Origin",
    tagline: "Trace any story, claim, or idea back to its origins.",
    blurb:
      "Build evidence-based timelines that uncover where ideas began, how they evolved, and how sources connect — with citations at every step.",
    href: `${site.phansoraUrl}/dashboard/chrono-origin`,
    icon: "compass",
  },
  {
    name: "Book Alchemy",
    tagline: "Transform written knowledge into immersive audio.",
    blurb:
      "Turn any book, document, or manuscript into natural-sounding audio with AI narration. Learn, listen, and absorb knowledge anywhere.",
    href: `${site.phansoraUrl}/dashboard/book-alchemy`,
    icon: "book",
  },
  {
    // Tagline and blurb are the reference's own copy.
    name: "Research Atlas",
    tagline: "Turn complex research into a visual map of connected knowledge.",
    blurb:
      "Explore sources, ideas, evidence, and relationships on an interactive canvas. Follow connections and see how the research fits together.",
    href: `${site.phansoraUrl}/dashboard/research-atlas`,
    icon: "network",
  },
  {
    // Tagline and blurb are the reference's own copy.
    name: "SpokenVerse",
    tagline: "Turn your words into lifelike speech.",
    blurb:
      "Create natural, expressive voiceovers for videos, audiobooks, podcasts, and more with advanced AI voices.",
    href: `${site.phansoraUrl}/dashboard/spokenverse`,
    icon: "mic",
  },
];

// What each editor in the screenshots actually does, named the way its own panels are.
const NARRAVA_CAPABILITIES = [
  { icon: "book", title: "Script &amp; Storyboard", sub: "Turn your ideas into a story" },
  { icon: "mic", title: "AI Narration", sub: "Natural, realistic voices" },
  { icon: "grid", title: "Media Library", sub: "Stock, uploads, and AI images" },
  { icon: "sliders", title: "Effects &amp; Transitions", sub: "Cinematic and dynamic" },
];

const CHRONO_CAPABILITIES = [
  { icon: "clock", title: "Origin Tracing", sub: "Find the earliest defensible source." },
  { icon: "workflow", title: "Evidence Timelines", sub: "Follow ideas through time." },
  { icon: "network", title: "Source Connections", sub: "See how records reference and influence one another." },
  { icon: "app", title: "Research &amp; Citations", sub: "Ground every step in verifiable sources." },
];

// The three timelines shown beside the Chrono Origin screenshot. The first is the one
// the screenshot has open, which is why it carries the ring the app gives a selection —
// the panel and the picture are showing the same thing.
const TIMELINES = [
  { name: "Ancient Israelite Religion", blurb: "From Canaanite roots to Second Temple Judaism." },
  { name: "The Flood Narrative", blurb: "A global story through time and cultures." },
  { name: "Jesus Parallels", blurb: "Comparative figures and influences across history." },
];

const BOOK_ALCHEMY_CAPABILITIES = [
  { icon: "book", title: "Multiple Formats", sub: "Import PDFs, EPUB, DOCX, TXT and more." },
  { icon: "mic", title: "Natural AI Voices", sub: "High-quality, realistic narration with multiple voice options." },
  { icon: "list", title: "Smart Chapters", sub: "Automatic chapter detection and easy navigation." },
  { icon: "download", title: "Your Audio Library", sub: "Listen online or download for offline use." },
];

// The three books beside the Book Alchemy screenshot. Covers, page counts and running
// times are the reference's own. Its pull quote under each play button is not here:
// the panel has to stand the same height as the screenshot beside it, and the quote
// is what made it taller. The three are in this file's history if they come back.
//
// PLACEHOLDER AUDIO. The files under assets/audio/book-alchemy are 90-second excerpts
// of unrelated narration, standing in until the real samples land — which is why the
// button says "a sample of" and the card's running time is the book's, not the file's.
// `seconds` is the length of the file that is actually there: it is what the scrubber
// reads out, so it moves when the file does.
const EXAMPLES = [
  {
    slug: "kybalion",
    title: "The Kybalion",
    meta: "342 pages · 2h 18m",
    cover: "The Kybalion, a black clothbound cover lettered in gold above a triangle set in a circle.",
    seconds: 90,
  },
  {
    slug: "art-of-war",
    title: "The Art of War",
    meta: "273 pages · 1h 52m",
    cover: "The Art of War, an aged paper cover with an ink-wash rider on horseback carrying a standard.",
    seconds: 90,
  },
  {
    slug: "meditations",
    title: "Meditations",
    meta: "256 pages · 1h 46m",
    cover: "Meditations, a dark cover lettered in gold over a marble bust of Marcus Aurelius.",
    seconds: 90,
  },
];
// The reference's own four, wording and all.
const SPOKENVERSE_CAPABILITIES = [
  { icon: "mic", title: "Realistic AI Voices", sub: "Human-like, natural speech across languages." },
  { icon: "sliders", title: "Voice Customization", sub: "Adjust tone, emotion, speed, and pitch." },
  { icon: "app", title: "Multiple Formats", sub: "Export as MP3, WAV and more." },
  { icon: "folder", title: "Creative Freedom", sub: "Perfect for videos, audiobooks, podcasts, and other projects." },
];

// The clips in the SpokenVerse player, in the order Phansora's own homepage shows them
// (phansora/views/partials/voice-showcase-home.ejs). The files under
// assets/videos/spokenverse are byte-for-byte copies of that page's /demos, renamed —
// copies rather than links, because this site's CSP is media-src 'self'.
//
// The reference names its three "A Small Voice", "The Lost Library" and "Beyond Earth",
// films that do not exist. These are named for what each clip demonstrates, shortened
// from the showcase's own headings so a chip's title fits in two lines. `seconds` is the
// file's own length, floored the way the player's clock floors it.
//
// The posters are real frames, as the Bible asks, and caption-free where the clip has
// such a frame. The third has a burned-in caption on every frame worth showing, so its
// poster carries a one-letter "A" rather than a frame out of the fade to black.
const REEL = [
  { slug: "video-narration", title: "Video Narration", seconds: 20 },
  { slug: "audio-courses", title: "Audio Courses", seconds: 13 },
  { slug: "character-voices", title: "Character Voices", seconds: 18 },
];

// All four are the reference's own, down to the wording. "link" is the chain glyph it
// draws for Relationship Mapping; `network` is already the map's own mark above it, and
// a section cannot use one icon for two different rows.
const RESEARCH_ATLAS_CAPABILITIES = [
  { icon: "network", title: "Visual Research Maps", sub: "Turn complex research into clear, connected diagrams." },
  { icon: "app", title: "Source Intelligence", sub: "Keep findings connected to the material they came from." },
  { icon: "link", title: "Relationship Mapping", sub: "See how people, events, claims, and ideas connect." },
  { icon: "download", title: "Research Library", sub: "Save and revisit your maps and discoveries." },
];

/** The four words down the right of the hero — what the suite is for, in order. */
const PILLARS = ["Ideas", "Knowledge", "Creation", "Real impact"];

const pad = (n) => String(n + 1).padStart(2, "0");

/**
 * One film, as a poster that becomes a player when it is asked to.
 *
 * The films are 6–13 MB each and there are seven of them, so nothing is fetched until
 * a visitor clicks: `preload="none"` and no `<source>` until then would still cost a
 * request per poster, so the video element is only written on click by main.js. Here
 * it is a button over an image, which is what it behaves like.
 */
function film(f, featured = false) {
  return `<button type="button" class="film group relative block w-full overflow-hidden rounded-xl border border-surface-800 bg-surface-950 text-left transition-colors hover:border-primary-400/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
    style="aspect-ratio:9/16" data-video="/videos/${f.slug}.mp4" data-title="${f.name}">
    <img src="/images/videos/${f.slug}.webp" width="540" height="960" alt="${f.name} — a short film made in Narrava Studio"
      loading="lazy" decoding="async" class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
    <span class="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/20 to-transparent"></span>
    <span class="pointer-events-none absolute inset-0 grid place-items-center">
      <span class="grid ${featured ? "h-14 w-14" : "h-9 w-9"} place-items-center rounded-full bg-surface-950/70 text-fg ring-1 ring-inset ring-white/25 backdrop-blur-sm transition-transform group-hover:scale-110">
        ${icon("play", featured ? "h-6 w-6" : "h-4 w-4")}
      </span>
    </span>
    <span class="pointer-events-none absolute inset-x-0 bottom-0 p-3">
      <span class="block truncate text-${featured ? "sm" : "xs"} font-semibold text-fg">${f.name}</span>
      <span class="mt-0.5 block text-[11px] text-surface-300">${f.kind} · ${f.duration}</span>
    </span>
  </button>`;
}

// A product's own place on this page. The products page links straight to it
// (/phansora#book-alchemy), so these ids are part of another page's markup as much as
// this one's — build.mjs fails the build if a link points at an id nothing renders.
export const productAnchor = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/**
 * The block that opens a product's section: its number, name, tagline, blurb and link.
 *
 * Identical for every product, so it is written once here rather than copied per
 * section — the only thing that varies is which entry of SUITE it is handed.
 *
 * scroll-mt keeps the heading clear of the sticky header when someone arrives on the
 * anchor; without it the number and name land underneath it.
 */
function sectionHead(i) {
  const p = SUITE[i];
  return `<div id="${productAnchor(p.name)}" class="reveal scroll-mt-28 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
    <div>
      <p class="text-sm font-semibold tracking-wider text-fg-muted">
        <span class="text-primary-300">${pad(i)}</span> / ${pad(SUITE.length - 1)}
      </p>
      <h2 class="mt-2 text-3xl font-bold tracking-tight text-fg sm:text-4xl">${p.name}</h2>
      <p class="mt-2 text-lg text-fg-secondary">${p.tagline}</p>
    </div>
    <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <p class="max-w-md leading-relaxed text-fg-secondary">${p.blurb}</p>
      <a href="${p.href}" target="_blank" rel="noopener" class="btn btn-primary w-fit shrink-0">
        Explore ${p.name} ${icon("arrow", "h-4 w-4")}
      </a>
    </div>
  </div>`;
}

/** The four-up strip of what a product does, under its screenshot. */
function capabilityStrip(items) {
  return `<ul class="reveal mt-6 grid gap-px overflow-hidden rounded-2xl border border-surface-800 bg-surface-800 sm:grid-cols-2 lg:grid-cols-4">
    ${items
      .map(
        (c) => `<li class="flex items-start gap-3 bg-surface-900/60 p-5">
      <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-500/10 text-primary-200 ring-1 ring-inset ring-primary-500/25">
        ${icon(c.icon, "h-4.5 w-4.5")}
      </span>
      <span class="min-w-0">
        <span class="block text-sm font-semibold text-fg">${c.title}</span>
        <span class="mt-0.5 block text-sm text-fg-secondary">${c.sub}</span>
      </span>
    </li>`
      )
      .join("")}
  </ul>`;
}

/**
 * The waveform shape, before there is a real one.
 *
 * Lifted from the UI Bible's audio player: a shape seeded from the file name, so it is
 * deterministic — a given clip always looks the same, which is the whole reason a shape
 * is worth drawing in a list rather than a progress bar that is the same rectangle for
 * every row. It is rendered here rather than in the browser so a row arrives with its
 * shape already in it; main.js replaces it with the file's real peaks on play, when the
 * file has to be fetched anyway.
 */
function seededPeaks(seed, buckets) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const out = [];
  for (let b = 0; b < buckets; b += 1) {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    h >>>= 0;
    // Envelope: a clip fades in and out rather than starting at full level.
    const env = Math.sin((b / buckets) * Math.PI);
    out.push(0.25 + 0.75 * ((h % 1000) / 1000) * (0.4 + 0.6 * env));
  }
  return out;
}

// One bar per 3-4px of the waveform's width, which is the Bible's rule. That page's
// count for a row is 48-72 bars, but it also says fewer at narrow widths and never
// more — and this control is narrow: the reference does not stretch the waveform to
// the card's edge, so app.css caps it at 6rem and it runs 72-96px. 24 bars is 3-4px
// across that whole range; 48 would be a smear at any of it.
const WAVE_BARS = 24;

const clock = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

/**
 * One book, as a card: the cover, what it is, a sample, and a line out of it.
 *
 * The player is deliberately not `<audio controls>`. The Bible rules the native
 * element out for a set like this — 54px of unstyleable chrome per card, a different
 * look in every browser, and nothing stopping two of them playing at once. What is
 * here is the row player it specifies instead: a 28px button and the waveform. No
 * time label, which that page allows: the running time above is the book's, and a
 * second clock beside it would be two numbers claiming to be the same thing.
 *
 * Cover left and player right on a phone, cover on top from `sm` up. The cards are
 * one width within any breakpoint, so the three shapes stay comparable — which is
 * the whole reason a waveform is drawn here rather than a progress bar.
 */
function example(e) {
  const bars = seededPeaks(e.slug, WAVE_BARS)
    .map((v) => `<span style="height:${Math.round(v * 100)}%"></span>`)
    .join("");
  return `<li>
    <article class="audio-row flex h-full gap-3 rounded-xl border border-surface-800 bg-surface-950 p-3 sm:flex-col"
      data-src="/audio/book-alchemy/${e.slug}.mp3" data-title="${e.title}" data-seconds="${e.seconds}">
      <!-- self-start, or the cover stretches to the card's height in the phone
           layout and object-cover crops the title off its own spine. -->
      <img src="/images/phansora/covers/${e.slug}.webp" width="142" height="178" loading="lazy" decoding="async"
        alt="${e.cover}"
        class="w-20 shrink-0 self-start rounded-lg border border-surface-800 object-cover sm:w-full" />
      <div class="flex min-w-0 flex-1 flex-col">
        <h4 class="truncate text-sm font-semibold text-fg">${e.title}</h4>
        <p class="mt-0.5 text-[11px] text-fg-muted">${e.meta}</p>
        <div class="mt-3 flex items-center gap-2">
          <button type="button" class="session-play" aria-label="Play a sample of ${e.title}">
            ${icon("play", "h-3.5 w-3.5 g-play")}
            ${icon("pause", "h-3.5 w-3.5 g-pause")}
          </button>
          <div class="wave" role="slider" tabindex="0" aria-label="Seek within the ${e.title} sample"
            aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"
            aria-valuetext="0:00 of ${clock(e.seconds)}">${bars}</div>
        </div>
      </div>
    </article>
  </li>`;
}

/**
 * One clip's poster in the SpokenVerse player: a real frame, a play button, its length.
 *
 * The Bible's video page, point for point: a poster that is a frame from the clip at
 * the clip's own 16:9, a 56px play control that is a real button, and the duration on
 * the poster, since that is what people decide on. All three posters are in the frame
 * and all but the selected one are `hidden`, so a poster's image is only fetched once
 * its clip is picked. There is no <video> until one is pressed: main.js builds the
 * native player then, beside the posters rather than inside one — its controls are
 * interactive content, and a button cannot hold any.
 */
function reelPoster(r, i) {
  return `<button type="button" data-reel-poster data-video="/videos/spokenverse/${r.slug}.mp4" data-title="${r.title}"
      aria-label="Play ${r.title}, ${clock(r.seconds)}"${i === 0 ? "" : " hidden"}
      class="group absolute inset-0 block h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-400">
      <img src="/images/phansora/examples/${r.slug}.webp" width="960" height="540" alt="" loading="lazy" decoding="async"
        class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      <span class="pointer-events-none absolute inset-0 grid place-items-center">
        <span class="grid h-14 w-14 place-items-center rounded-full bg-surface-950/70 text-fg ring-1 ring-inset ring-white/25 backdrop-blur-sm transition-transform group-hover:scale-110">
          ${icon("play", "h-6 w-6")}
        </span>
      </span>
      <span class="pointer-events-none absolute bottom-3 right-3 rounded-md bg-black/75 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white">${clock(r.seconds)}</span>
    </button>`;
}

/**
 * One chip under the player: the clip's thumbnail, title and length. Picking it cues
 * that clip's poster and stops whatever is playing; it does not start the new one,
 * which keeps the panel's promise that nothing loads until play is pressed.
 *
 * The selected chip wears the ring the Chrono Origin panel gives its open timeline —
 * one selected state on the page, not two. The thumbnail steps out between lg and xl:
 * the chips are 113px wide at lg, and beside a 44px thumbnail that leaves 47px for a
 * title, which "Narration" alone is wider than.
 */
function reelChip(r, i) {
  return `<li>
      <button type="button" data-reel-chip data-title="${r.title}"${i === 0 ? ' aria-current="true"' : ""}
        class="flex h-full w-full items-center gap-2.5 rounded-xl border border-surface-800 bg-surface-950 p-1.5 text-left transition-colors hover:border-surface-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 aria-[current=true]:border-primary-400/70 aria-[current=true]:bg-surface-900/80 aria-[current=true]:ring-1 aria-[current=true]:ring-primary-400/30">
        <img src="/images/phansora/examples/${r.slug}-thumb.webp" width="88" height="88" alt="" loading="lazy" decoding="async"
          class="h-11 w-11 shrink-0 rounded-lg object-cover lg:hidden xl:block" />
        <span class="min-w-0 lg:pl-1.5 xl:pl-0">
          <span class="block text-[13px] font-semibold leading-snug text-fg">${r.title}</span>
          <span class="mt-0.5 block text-[11px] tabular-nums text-fg-muted">${clock(r.seconds)}</span>
        </span>
      </button>
    </li>`;
}

/** One example timeline. Static copy, not a link — the button above goes to the app. */
function timeline(t, i) {
  const open = i === 0;
  return `<div class="flex items-start gap-3 rounded-xl border ${
    open ? "border-primary-400/70 bg-surface-900/80 ring-1 ring-primary-400/30" : "border-surface-800 bg-surface-950"
  } p-4">
    <span class="min-w-0 flex-1">
      <span class="block text-sm font-semibold text-fg">${t.name}</span>
      <span class="mt-1 block text-sm leading-relaxed text-fg-secondary">${t.blurb}</span>
    </span>
    <span class="grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${
      open ? "bg-primary-500/20 text-primary-200 ring-1 ring-inset ring-primary-400/40" : "bg-surface-800 text-fg-muted"
    }">${i + 1}</span>
  </div>`;
}

export const phansoraPage = {
  path: "/phansora",
  file: "phansora.html",
  title: "Phansora — the AI creation suite",
  description:
    "Phansora is a suite of AI-powered tools for creators, researchers, and thinkers — video production, audio courses, research reports, origin tracing, and speech.",
  render: () => `
  ${heroGlow(`
    <div class="mx-auto max-w-6xl px-5 pb-14 pt-20 sm:px-8 sm:pt-24">
      <!-- The eyebrow and the pillars flank the headline on a wide screen and stack
           above and below it on a narrow one, which is the only arrangement that keeps
           the headline centred without pushing it off-centre to make room. -->
      <div class="lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-start lg:gap-8">
        <p class="eyebrow text-primary-200 lg:pt-3">The AI creation suite</p>
        <div class="mt-6 text-center lg:mt-0">
          <h1 class="text-4xl font-extrabold leading-[1.05] tracking-tight text-fg sm:text-6xl">
            Discover <span class="bg-gradient-to-r from-primary-300 via-primary-200 to-accent-400 bg-clip-text text-transparent">Phansora</span>
          </h1>
          <p class="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-fg-secondary">
            A suite of AI-powered tools for creators, researchers, and thinkers.
          </p>
        </div>
        <ul class="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-1.5 lg:mt-1 lg:flex-col lg:items-end lg:justify-start lg:gap-1.5">
          ${PILLARS.map(
            (p) =>
              `<li class="text-[11px] font-semibold uppercase tracking-[0.18em] text-surface-300">${p}</li>`
          ).join("")}
        </ul>
      </div>
    </div>
  `)}

  <section class="px-5 ${afterHero} pb-20 sm:px-8">
    <div class="mx-auto max-w-6xl">
      <!-- Product 01. Screenshot left, its films right. -->
      ${sectionHead(0)}

      <div class="reveal mt-8 grid items-start gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <!-- The editor itself. Native resolution is 1672 wide and the card never
             renders wider than that, so there is no 2x variant to serve — the smaller
             file is for phones, where the full one is four times the pixels needed. -->
        <figure class="overflow-hidden rounded-2xl border border-surface-800 bg-surface-950">
          <img src="/images/phansora/narrava-studio.webp"
            srcset="/images/phansora/narrava-studio-940.webp 940w, /images/phansora/narrava-studio.webp 1672w"
            sizes="(min-width: 1024px) 56vw, 100vw"
            width="1672" height="941" loading="lazy" decoding="async"
            alt="The Narrava Studio editor: a media library of generated clips, a preview of a cloaked figure before a mountain castle reading “Ideas Become Reality”, and a multi-track timeline with narration, text, and a cinematic look applied."
            class="block w-full" />
        </figure>

        <div class="flex flex-col rounded-2xl border border-surface-800 bg-surface-900/60 p-5">
          <h3 class="text-sm font-semibold text-fg">Made with Narrava Studio</h3>
          <p class="mt-1 text-sm leading-relaxed text-fg-secondary">Short films cut in the editor on the left. Nothing loads until you press play.</p>
          <!-- One row, not two. Six of them stacked made this column half again as
               tall as the screenshot beside it, and the screenshot is what the section
               is actually about. Three is a taster, not an inventory. -->
          <div class="mt-4 grid grid-cols-3 gap-2.5">
            ${products.creative.slice(0, 3).map((f) => film(f)).join("\n")}
          </div>
        </div>
      </div>

      ${capabilityStrip(NARRAVA_CAPABILITIES)}

      <!-- Product 02. The sides swap: the panel leads and the screenshot follows, so
           two sections running down the page do not read as the same shape twice. The
           timeline picture is also wider than the editor one (2:1 against 16:9), so it
           takes the larger share of the row here. -->
      <div class="mt-24">${sectionHead(1)}</div>

      <div class="reveal mt-8 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)]">
        <div class="flex flex-col gap-3 rounded-2xl border border-surface-800 bg-surface-900/60 p-5">
          ${TIMELINES.map((t, i) => timeline(t, i)).join("\n")}
        </div>

        <figure class="overflow-hidden rounded-2xl border border-surface-800 bg-surface-950">
          <img src="/images/phansora/chrono-origin.webp"
            srcset="/images/phansora/chrono-origin-940.webp 940w, /images/phansora/chrono-origin.webp 1774w"
            sizes="(min-width: 1024px) 64vw, 100vw"
            width="1774" height="887" loading="lazy" decoding="async"
            alt="Chrono Origin tracing Ancient Israelite Religion: five evidence cards from Canaanite Religion, marked first trace, through the Tel Dan and Mesha steles and the Hebrew Bible to Second Temple Judaism, plotted on a dated axis from 1600 BCE to 400 CE above a density strip and a count of 42 sources."
            class="block w-full" />
        </figure>
      </div>

      ${capabilityStrip(CHRONO_CAPABILITIES)}

      <!-- Product 03. Back to screenshot-left, so the page alternates rather than
           settling into one shape — and because this pairing is section 01's again:
           an editor, and beside it what came out of it. The screenshot is 3:2 where
           Narrava's was 16:9, so it takes a smaller share of the row than that one
           did; at 1.35fr a picture this tall left the panel too narrow to lay a
           waveform out in. -->
      <div class="mt-24">${sectionHead(2)}</div>

      <div class="reveal mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <figure class="overflow-hidden rounded-2xl border border-surface-800 bg-surface-950">
          <img src="/images/phansora/book-alchemy.webp"
            srcset="/images/phansora/book-alchemy-940.webp 940w, /images/phansora/book-alchemy.webp 1536w"
            sizes="(min-width: 1024px) 52vw, 100vw"
            width="1536" height="1024" loading="lazy" decoding="async"
            alt="The Book Alchemy converter: The Kybalion loaded as a 342-page PDF beside its cover, a neutral narration voice, playback speed and output format, and the book's six chapters — The All through Rhythm — each with its own play control, above a waveform scrubber."
            class="block w-full" />
        </figure>

        <div class="flex flex-col rounded-2xl border border-surface-800 bg-surface-900/60 p-5">
          <h3 class="text-sm font-semibold text-fg">From Book to Audio</h3>
          <!-- The reference's line here is "Original content on the left. AI-narrated
               audio on the right", which describes a split these cards do not have —
               the cover and the player are stacked in each one. This says what the
               cards actually are, and keeps the promise the films panel makes about
               not fetching anything until asked. -->
          <p class="mt-1 text-sm leading-relaxed text-fg-secondary">Three books, and the narration made from them. Nothing loads until you press play.</p>
          <!-- Capped between sm and lg. Left to fill the page at those widths the
               cards run to 240px and the waveform stretches to a bar chart; the
               Bible's count is one bar per 3-4px of width, and this is what keeps
               one set of bars inside that range at every width the page has. -->
          <ol class="mt-4 grid w-full max-w-md grid-cols-1 gap-3 sm:max-w-xl sm:grid-cols-3 lg:max-w-none">
            ${EXAMPLES.map(example).join("\n")}
          </ol>
        </div>
      </div>

      ${capabilityStrip(BOOK_ALCHEMY_CAPABILITIES)}

      <!-- Product 04. Screenshot left, as the reference draws it, rather than the
           alternation 01-03 run on: from here down the references are the brief. -->
      <div class="mt-24">${sectionHead(3)}</div>

      <!-- 1.35fr : 1fr is section 01's split, and it is what stands these two at the
           same height: the map is 1.41:1, and at that share the panel's heading, its
           line of copy and a 1.31:1 diagram come out within a few pixels of the
           figure. items-start so the remainder is a few pixels of nothing rather than
           a stretched card. -->
      <div class="reveal mt-8 grid items-start gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <!-- Cropped out of the reference at 1083x769 — inside the mock's own card
             border, because the figure draws that chrome itself. That is all the
             resolution there is, so it is 1.7x at the width this renders and will be
             soft on a retina screen until a real capture lands. -->
        <figure class="overflow-hidden rounded-2xl border border-surface-800 bg-surface-950">
          <img src="/images/phansora/research-atlas.webp"
            srcset="/images/phansora/research-atlas-940.webp 940w, /images/phansora/research-atlas.webp 1083w"
            sizes="(min-width: 1024px) 56vw, 100vw"
            width="1083" height="769" loading="lazy" decoding="async"
            alt="The Research Atlas map for “another world in antarctica”: five sources and 1963 attributed items broken out into People, Organizations, Places, a core timeline, events, connections and claims, then where the sources overlap, where they differ, the evidence behind them and the open research gaps — each row carrying its own count."
            class="block w-full" />
        </figure>

        <div class="flex flex-col rounded-2xl border border-surface-800 bg-surface-900/60 p-5">
          <h3 class="text-sm font-semibold text-fg">From Question to Knowledge</h3>
          <p class="mt-1 text-sm leading-relaxed text-fg-secondary">Start with a subject and watch the research expand into connected sources, evidence, people, events, and ideas.</p>
          <!-- The reference's diagram, not a rebuild of it: curved coloured edges, a
               glow and a handwritten aside are a picture, and drawing them in SVG would
               be a different picture. The heading and the line above it are real text
               rather than part of the crop, which is how the other four panels read. -->
          <img src="/images/phansora/research-atlas-map.webp" width="766" height="586"
            loading="lazy" decoding="async"
            alt="The subject “another world in antarctica”, 5 sources and 1963 items, fanning out into People, Organizations, Places, a core timeline, events and connections, which in turn link on to ancient maps, government records, similar accounts and research notes."
            class="mt-4 block w-full rounded-xl border border-surface-800" />
        </div>
      </div>

      ${capabilityStrip(RESEARCH_ATLAS_CAPABILITIES)}

      <!-- Product 05. Screenshot left, as its reference draws it. -->
      <div class="mt-24">${sectionHead(4)}</div>

      <!-- 1.35fr : 1fr, section 01's split again, and for the same reason: at that share
           the panel — its heading, a 16:9 player and a row of two-line chips — stands at
           the 3:2 screenshot's height to the pixel. items-start, so the widths where the
           two part company leave a gap under the shorter card rather than a stretched
           figure with a band of empty frame below its picture. -->
      <div class="reveal mt-8 grid items-start gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <figure class="overflow-hidden rounded-2xl border border-surface-800 bg-surface-950">
          <img src="/images/phansora/spokenverse.webp"
            srcset="/images/phansora/spokenverse-940.webp 940w, /images/phansora/spokenverse.webp 1536w"
            sizes="(min-width: 1024px) 56vw, 100vw"
            width="1536" height="1024" loading="lazy" decoding="async"
            alt="The SpokenVerse text-to-speech studio: a line on knowledge being shared, at 107 of 5,000 characters, read by the Nova voice — female, natural, expressive — in English (US) at 1.0x speed, 0% pitch and a neutral emotion, above a twelve-second waveform ready to play and three recent generations: The Forgotten Library, Beyond the Veil and Ancient Civilizations."
            class="block w-full" />
        </figure>

        <!-- The player the reference draws, made real. main.js drives it off the data-
             attributes: the arrows and the chips pick a clip, a poster builds the video.
             The "1 / 3" is a pager's position, not a tally like the count the Narrava panel
             lost on request — it is what makes the two arrows beside it readable. -->
        <div class="flex flex-col rounded-2xl border border-surface-800 bg-surface-900/60 p-5" data-reel>
          <div class="flex items-start justify-between gap-4">
            <div class="min-w-0">
              <h3 class="text-sm font-semibold text-fg">Video Examples</h3>
              <p class="mt-1 text-sm leading-relaxed text-fg-secondary">See what&rsquo;s possible with SpokenVerse.</p>
            </div>
            <div class="flex shrink-0 items-center gap-2">
              <button type="button" class="reel-step" data-reel-prev aria-label="Previous example" aria-disabled="true">
                ${icon("chevron-left", "h-4 w-4")}
              </button>
              <span class="min-w-10 text-center text-sm tabular-nums text-fg-secondary" aria-hidden="true"><span data-reel-count>1</span> / ${REEL.length}</span>
              <button type="button" class="reel-step" data-reel-next aria-label="Next example">
                ${icon("chevron-right", "h-4 w-4")}
              </button>
            </div>
          </div>
          <!-- The visible counter is hidden from assistive tech and this says the same
               thing in words when the selection changes: "2 / 3" read aloud is noise. -->
          <p class="sr-only" aria-live="polite" data-reel-status></p>

          <!-- Black behind the video, as the Bible has it, so a frame that does not
               fill the box reads as letterboxing rather than a gap. -->
          <div class="relative mt-4 aspect-video overflow-hidden rounded-xl border border-surface-800 bg-black" data-reel-frame>
            ${REEL.map(reelPoster).join("\n            ")}
          </div>

          <!-- One column on a phone, where three abreast leaves each title about 30px. -->
          <ol class="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            ${REEL.map(reelChip).join("\n            ")}
          </ol>
        </div>
      </div>

      ${capabilityStrip(SPOKENVERSE_CAPABILITIES)}
    </div>
  </section>

  ${ctaBand({
    title: "Want something like this built?",
    sub: "Phansora is what this studio builds for itself. The same team builds it for other people.",
  })}
  `,
};
