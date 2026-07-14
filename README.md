# Skylanex

Static marketing site for **Skylanex** — an independent AI software studio
(personal brand for Brandon Sanders). "Skylanex" evokes sky / cloud / technology
leadership. **No dashboard, no backend** — it builds to plain static HTML you can
host anywhere (Netlify, Vercel, Cloudflare Pages, S3+CloudFront, nginx).

Brand: violet primary + cyan accent on ink. Logo mark = an ascending double-arch
(leadership / cloud / horizon) with a guiding star, in the brand gradient. Assets:
`assets/images/skylanex-mark.svg` (icon) and `skylanex-logo.svg` (full lockup);
the nav renders the mark inline via `mark()` in `src/layout.mjs`.

## Stack
- **Tailwind CSS v4** (latest; Tailwind v5 is not released yet). Palette is organized
  the same way as the Phansora site — semantic `surface` / `primary` / `accent`
  ramps declared in `@theme` (`src/styles/app.css`) with an `@source inline(...)`
  safelist. New scheme though: **violet primary + cyan accent on ink**.
- A tiny static-site generator (`build.mjs`) that renders shared layout + page
  modules into `dist/` with clean directory-index URLs (`/services/index.html`).
- Vanilla JS (`assets/js/main.js`) for the mobile menu, sticky-nav, reveal-on-scroll,
  and the contact form (composes a `mailto:` — no backend needed).

## Develop / build
```bash
npm install
npm run build         # build:html + build:css -> dist/
npm run watch:css     # (optional) rebuild CSS on change; re-run build:html for content
```
Serve `dist/` with any static server, e.g. `python3 -m http.server --directory dist`.

## Structure
```
site.config.mjs      nav, services, work, stats, site meta   (edit content here)
src/layout.mjs       HTML shell: <head>, nav, mobile menu, footer, icon set
src/ui.mjs           shared snippets (headings, CTA band, stat row, hero glow)
src/pages/*.mjs      one module per page; service.mjs generates all 6 detail pages
build.mjs            generator -> dist/ (+ 404, robots.txt, sitemap.xml)
src/styles/app.css   Tailwind entry + @theme palette + components
```

## Pages
Home, Services (+ 6 detail pages: AI app dev, ML & data science, process automation,
AI consulting, NLP, computer vision), Work, About, Contact, 404.

## Relationship to Phansora
Phansora is featured here as the flagship **venture** and links out to
`https://www.phansora.com`. The six service/consulting pages **moved off** Phansora
to here. On the Phansora app, those old URLs 301-redirect to this site once the env
var `PERSONAL_SITE_URL` is set to this site's deployed origin (slugs match 1:1):

```
PERSONAL_SITE_URL=https://<this-site-domain>
```
Until that var is set, Phansora keeps serving the old pages (no breakage).

## TODO before launch
- Pick the real name + domain; update `site.config.mjs` (`name`, `domain`, `email`).
- Set `PERSONAL_SITE_URL` in the Phansora prod env to activate the 301s.
- Decide whether to also move the portfolio *item* pages (client/creative) + add
  their 301s (not done yet).
