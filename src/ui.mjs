// ui.mjs — reusable content snippets shared across pages.
import { icon } from "./layout.mjs";
import { site, stats as statData } from "../site.config.mjs";

// Top padding for the section that directly follows a hero.
//
// Those sections used to declare only `pb-*`, which left their content with nothing
// above it and a gap below — so a filter-chip row read as part of the hero it was
// touching rather than as the control for the cards under it. Proximity decides
// grouping before anything else does, and the gap above a block has to beat the gap
// below it for the block to belong to what follows.
//
// It lives here rather than being typed into each page so the next page added after a
// hero starts correct, and so the whole set moves together if the rhythm changes.
// Deliberately NOT solved by padding the hero: that grows the hero's field and leaves
// the content welded to the boundary, just lower down.
export const afterHero = "pt-12 sm:pt-16";

export function heading({ eyebrow, title, sub, center = true, light = false }) {
  return `<div class="${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}">
    ${eyebrow ? `<p class="eyebrow mb-3 text-primary-400">${eyebrow}</p>` : ""}
    <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">${title}</h2>
    ${sub ? `<p class="mt-4 text-lg leading-relaxed text-surface-300">${sub}</p>` : ""}
  </div>`;
}

export function ctaBand({ title, sub, primaryLabel = "Start a project", primaryHref = "/contact" } = {}) {
  return `<section class="px-5 pb-24 sm:px-8">
    <div class="reveal relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-primary-500/20 bg-gradient-to-br from-primary-900 via-surface-900 to-surface-950 px-6 py-14 text-center sm:px-12">
      <div class="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-secondary-500/10 blur-3xl"></div>
      <div class="relative">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">${title || "Let’s build something intelligent"}</h2>
        <p class="mx-auto mt-4 max-w-xl text-lg text-surface-300">${sub || "Tell us what you’re working on — we’ll tell you honestly whether AI is the right tool, and how we’d build it."}</p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="${primaryHref}" class="btn btn-primary">${primaryLabel} ${icon("arrow", "h-4 w-4")}</a>
          <a href="mailto:${site.email}" class="btn btn-ghost">Email us</a>
        </div>
      </div>
    </div>
  </section>`;
}

export function statRow() {
  return `<section class="border-y border-surface-800 bg-surface-950 px-5 py-14 sm:px-8">
    <div class="mx-auto grid max-w-5xl grid-cols-2 gap-8 text-center sm:grid-cols-4">
      ${statData
        .map(
          (s) => `<div class="reveal">
        <p class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">${s.value}</p>
        <p class="mt-1 text-sm text-surface-400">${s.label}</p>
      </div>`
        )
        .join("")}
    </div>
  </section>`;
}

/**
 * Hero container: the deep blue-black field, plus either supplied artwork or the two
 * soft blooms that keep the corners from going dead flat.
 *
 * `image` takes supplied artwork. It is a background-image on a layer rather than an
 * `<img>`, because the artwork IS the field — it has no subject to describe, and
 * announcing it to a screen reader would be noise. Anchored right, so the composition's
 * empty left half stays under the headline at every width, and covered so it never
 * letterboxes.
 *
 * The two blooms render only when there is no image. Under artwork they are a second
 * light source disagreeing with the one already in the picture.
 */
export function heroGlow(inner, { image = null, image2x = null } = {}) {
  const art = image
    ? `<div class="pointer-events-none absolute inset-0 bg-cover bg-right bg-no-repeat opacity-40 lg:opacity-100"
        style="background-image:image-set(url('${image}') 1x${image2x ? `, url('${image2x}') 2x` : ""})"></div>
      <!-- Two scrims, because the artwork means different things at different widths.
           This composition puts its subject on the right and leaves the left empty, so on
           a wide screen the copy lands on the empty half and the scrim only has to sweep
           in from the LEFT — a uniform tint there would dim the picture to protect type
           that was never over it.
           On a phone there is no empty half: background-size cover crops to the subject
           and the copy lands on top of it. So below lg the artwork drops to 40% and the
           scrim runs top to bottom instead, which keeps it as texture behind the headline
           rather than a picture competing with it. -->
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-950/85 via-surface-950/70 to-surface-950/85 lg:bg-gradient-to-r lg:from-surface-950 lg:via-surface-950/75 lg:to-transparent"></div>`
    : `<div class="pointer-events-none absolute inset-0">
        <div class="absolute left-1/2 top-[-10%] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary-600/15 blur-3xl"></div>
        <div class="absolute right-[-10%] top-[20%] h-[320px] w-[420px] rounded-full bg-secondary-500/10 blur-3xl"></div>
      </div>`;
  return `<section class="brand-field relative overflow-hidden">
    ${art}
    <div class="relative">${inner}</div>
    ${chevronRule()}
  </section>`;
}

// The banner's diagonal, as the seam under the hero.
//
// A lit hairline rather than a filled wedge: in the banner the diagonal is where two
// near-black panels meet and catch an edge of light, so what you actually read is the
// LINE, not a shape. Filling it turns the hero into a badge.
//
// Sits at the very bottom of the hero and is purely decorative, so it is aria-hidden
// and cannot take pointer events away from anything under it.
export function chevronRule() {
  return `<div class="pointer-events-none absolute inset-x-0 bottom-0 h-16 overflow-hidden" aria-hidden="true">
    <svg class="absolute inset-0 h-full w-full" viewBox="0 0 1440 64" preserveAspectRatio="none" fill="none">
      <path d="M0 63.5 L1010 63.5 L1136 6 L1440 6" stroke="url(#skx-chev)" stroke-width="1.25"/>
      <defs>
        <linearGradient id="skx-chev" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
          <stop stop-color="var(--color-primary-400)" stop-opacity="0"/>
          <stop offset="0.62" stop-color="var(--color-primary-400)" stop-opacity="0.5"/>
          <stop offset="0.78" stop-color="var(--color-secondary-300)" stop-opacity="0.85"/>
          <stop offset="1" stop-color="var(--color-primary-400)" stop-opacity="0.08"/>
        </linearGradient>
      </defs>
    </svg>
  </div>`;
}

// ── the CTA badge ───────────────────────────────────────────────────────────
//
// STILL A PLACEHOLDER FOR SUPPLIED ARTWORK. The mock's CTA carries a hexagonal badge that
// no SVG will match at the fidelity of a render, so this stands in: the same silhouette,
// the same weight in the layout, drawn from the brand mark and the tokens so the band
// reads finished rather than gappy.
//
// The hero's platform used to live here too. Its artwork has arrived and is the hero
// section's background image now, so that placeholder is gone.
//
// To replace: drop the asset in assets/images/ and swap the body. Nothing else moves — it
// is sized by its container, not by its own dimensions.

/** The hexagon badge in the CTA band. Placeholder — see above. */
export function ctaBadge(cls = "h-24 w-24") {
  return `<span class="relative grid ${cls} shrink-0 place-items-center" aria-hidden="true">
    <svg viewBox="0 0 120 120" class="absolute inset-0 h-full w-full" fill="none">
      <defs>
        <linearGradient id="cb-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="var(--color-primary-400)"/>
          <stop offset="1" stop-color="var(--color-secondary-400)"/>
        </linearGradient>
      </defs>
      <path d="M60 6 L107 33 L107 87 L60 114 L13 87 L13 33 Z"
        fill="color-mix(in oklab, var(--color-primary-500) 12%, transparent)"
        stroke="url(#cb-edge)" stroke-width="2"/>
    </svg>
    <svg viewBox="0 0 1152 924" class="relative h-1/2 w-1/2 text-primary-300"><use href="#skx-eagle"/></svg>
  </span>`;
}
