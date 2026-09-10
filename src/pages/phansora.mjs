import { icon } from "../layout.mjs";
import { heroGlow, afterHero, ctaBand } from "../ui.mjs";
import { products, site } from "../../site.config.mjs";

// The five products of the suite, in the order this page presents them — which is not
// the platform's own order (phansora/src/products.js leads with Book Alchemy). The two
// with interface art to show lead here; the rest follow and are what the "/ 05" counts.
//
// A section's number is its index in this array, so moving an entry renumbers it. The
// three without art are still listed because a bare 05 with nothing naming the five it
// counts would be a number nobody could check.
//
// `href` is taken from that app's product registry rather than guessed. The two products
// this page actually shows the interface of link straight into their dashboard, so
// "Explore X" opens the thing the screenshot above it is a picture of; Phansora's
// `requireDashboardSession` sends a logged-out visitor to /login?next=<that path> and
// drops them back on the product once they are in, so the link works either way. The
// two without art still point at their marketing page — sending a stranger into a
// dashboard for a product they have not read a word about is a step too far.
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
    tagline: "Turn any book into a course you can listen to.",
    blurb:
      "Turns a book or long document into a structured, multi-session audio course — an AI-designed curriculum, narrated, and grounded in the author's own words.",
    href: `${site.phansoraUrl}/dashboard/book-alchemy`,
    icon: "book",
  },
  {
    name: "Research Atlas",
    tagline: "Turn a pile of sources into a report.",
    blurb:
      "Upload your sources and Research Atlas organises them into a structured, attributed research report — every claim traceable to the document it came from.",
    href: `${site.phansoraUrl}/research-atlas`,
    icon: "layers",
  },
  {
    name: "SpokenVerse",
    tagline: "Your words, in a voice of your own.",
    blurb:
      "Natural text-to-speech with voice cloning — turn writing into narration that sounds like a person rather than a synthesiser.",
    href: `${site.phansoraUrl}/spokenverse`,
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
  { icon: "book", title: "Any Book or Paper", sub: "A PDF in, a narrated course out." },
  { icon: "workflow", title: "Chapters", sub: "Split into sessions you can finish." },
  { icon: "mic", title: "Narration Voice", sub: "Natural, realistic speech." },
  { icon: "sliders", title: "Speed &amp; Format", sub: "0.75x to 1.5x — MP3, M4A, or WAV." },
];

// The sessions beside the Book Alchemy screenshot, named for the chapters the screenshot
// has open so the panel and the picture are the same course.
//
// PLACEHOLDER AUDIO. The files under assets/audio/book-alchemy are 90-second excerpts of
// unrelated narration, standing in until the real samples land. `duration` and `seconds`
// are the length of the file that is actually there — they are what the row shows before
// anything is fetched and what its scrubber reads out, so they move when the file does.
const SESSIONS = [
  { n: 1, name: "The All", file: "01-the-all.mp3", duration: "1:30", seconds: 90 },
  { n: 2, name: "Mentalism", file: "02-mentalism.mp3", duration: "1:30", seconds: 90 },
  { n: 3, name: "Correspondence", file: "03-correspondence.mp3", duration: "1:30", seconds: 90 },
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

/**
 * The block that opens a product's section: its number, name, tagline, blurb and link.
 *
 * Identical for every product, so it is written once here rather than copied per
 * section — the only thing that varies is which entry of SUITE it is handed.
 */
function sectionHead(i) {
  const p = SUITE[i];
  return `<div class="reveal grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
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

// Roughly one bar per 3-4px of the widest the waveform gets, which is the Bible's
// range. The bars flex, so this one count reads correctly at every width.
const WAVE_BARS = 56;

/**
 * One session of the course, as a row player.
 *
 * Deliberately not `<audio controls>`: the Bible rules the native element out for a
 * list — 54px of unstyleable chrome per row, a different look in every browser, and
 * nothing stopping two of them playing at once. This is the row size it specifies
 * instead: a 28px play button, the waveform, one time label, nothing else. The label
 * is the duration until playback starts and the position afterwards, because a column
 * of 0:00 tells the reader nothing.
 *
 * The name sits above the row on a phone and becomes a column of its own from `sm` up.
 * Either way every waveform on the page is the same width, which is what makes the
 * shapes comparable down the column — the one thing a list of clips exists to do.
 */
function session(s) {
  const bars = seededPeaks(s.file, WAVE_BARS)
    .map((v) => `<span style="height:${Math.round(v * 100)}%"></span>`)
    .join("");
  return `<li>
    <div class="session grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 rounded-xl border border-surface-800 bg-surface-950 p-3 sm:grid-cols-[auto_9.5rem_minmax(0,1fr)_auto]"
      data-src="/audio/book-alchemy/${s.file}" data-title="${s.name}" data-seconds="${s.seconds}" data-duration="${s.duration}">
      <span class="col-span-3 min-w-0 truncate text-sm font-medium text-fg sm:col-span-1 sm:col-start-2 sm:row-start-1">
        <span class="tabular-nums text-fg-muted">${pad(s.n - 1)}</span> ${s.name}
      </span>
      <button type="button" class="session-play sm:col-start-1 sm:row-start-1" aria-label="Play ${s.name}">
        ${icon("play", "h-3.5 w-3.5 g-play")}
        ${icon("pause", "h-3.5 w-3.5 g-pause")}
      </button>
      <div class="wave sm:col-start-3 sm:row-start-1" role="slider" tabindex="0"
        aria-label="Seek within ${s.name}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"
        aria-valuetext="0:00 of ${s.duration}">${bars}</div>
      <span class="session-time sm:col-start-4 sm:row-start-1">${s.duration}</span>
    </div>
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

      <div class="reveal mt-8 grid items-start gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <figure class="overflow-hidden rounded-2xl border border-surface-800 bg-surface-950">
          <img src="/images/phansora/book-alchemy.webp"
            srcset="/images/phansora/book-alchemy-940.webp 940w, /images/phansora/book-alchemy.webp 1536w"
            sizes="(min-width: 1024px) 52vw, 100vw"
            width="1536" height="1024" loading="lazy" decoding="async"
            alt="The Book Alchemy converter: The Kybalion loaded as a 342-page PDF beside its cover, a neutral narration voice, playback speed and output format, and the book's six chapters — The All through Rhythm — each with its own play control, above a waveform scrubber."
            class="block w-full" />
        </figure>

        <div class="flex flex-col rounded-2xl border border-surface-800 bg-surface-900/60 p-5">
          <h3 class="text-sm font-semibold text-fg">Made with Book Alchemy</h3>
          <p class="mt-1 text-sm leading-relaxed text-fg-secondary">The opening sessions of the course on the left. Nothing loads until you press play.</p>
          <!-- One list, three rows deep. The screenshot beside it already shows what a
               full contents page looks like; what this has to do is let someone hear
               the thing, which takes one row done properly rather than six. -->
          <ol class="mt-4 flex w-full max-w-md flex-col gap-2.5 lg:max-w-none">
            ${SESSIONS.map(session).join("\n")}
          </ol>
        </div>
      </div>

      ${capabilityStrip(BOOK_ALCHEMY_CAPABILITIES)}
    </div>
  </section>

  ${ctaBand({
    title: "Want something like this built?",
    sub: "Phansora is what this studio builds for itself. The same team builds it for other people.",
  })}
  `,
};
