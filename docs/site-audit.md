# Skylanex site audit — SEO, performance, security

Audited 2026-08-18 against the built `dist/` and the live responses from
`https://www.skylanex.com`, then worked through. Everything below is **resolved in
this repo** except the two items under "Still yours to do", which need a prod
deploy rather than a code change.

Kept as a record rather than deleted: the reasoning for each change lives here, and
the "already correct" list is what stops the next audit from redoing settled work.

---

## Already correct — found this way, left alone

- **robots.txt** — present, allows everything, points at the sitemap.
- **sitemap.xml** — all 27 built pages listed, none missing, none stale.
- **llms.txt** — generated from the same config as the site, so it can't drift.
- **canonical tags** — on every page, absolute, `www`-correct.
- **One `<h1>` per page** — all 27 pages, no exceptions.
- **Image `alt`** — all 39 images have it; the 7 empty ones are decorative, which is
  the correct use of `alt=""`.
- **`loading="lazy"`** — on 27 images.
- **Structured data** — Organization/ProfessionalService + WebSite sitewide, plus
  Service, FAQPage, BreadcrumbList, ItemList, VideoObject, ImageObject per page type.
- **Security headers** — verified live: HSTS, CSP, `X-Content-Type-Options`,
  `frame-ancestors 'none'`, COOP, Referrer-Policy, Permissions-Policy.
- **No secrets, no `.env`, no source maps** committed anywhere in the repo.
- **`rel="noopener"`** on every `target="_blank"` link.
- **Port 8000 is not publicly exposed** on either host — checked, not assumed.

## A correction to this audit's own first draft

The first pass reported "no image declares width/height — 0 of 39". **That was
wrong.** The check grepped `<img [^>]*>`, which only matches a tag that fits on one
line, and these span two. The real number was 32 of 39 already correct, with only
the seven video posters on `/work` missing dimensions.

Recorded because the lesson generalizes: a regex over built HTML silently measures
the subset that happens to match its shape, and reports the rest as absent rather
than as unexamined.

---

## 1. `og:image` was an SVG — every social share was a blank card ✅

`og:image` pointed at `skylanex-logo.svg`, and **no major platform renders SVG in a
link preview** — not X, LinkedIn, Facebook, Slack, iMessage, or WhatsApp. Every link
to the site posted anywhere showed an empty box, on a site whose job is to look like
a studio that ships polished work.

**Done:** per-page cards, one per route, at `scripts/og-cards.mjs` (`npm run og`).

The card is composed as HTML and screenshotted with headless Chrome rather than
drawn in a design tool, so it inherits the real site — same brand field, same
constellation, same eagle, same two typefaces. A card drawn separately drifts from
the site the first time the palette moves.

Three decisions worth knowing:

- **Not part of `npm run build`.** It shells out to Chrome once per page: ~30s, on a
  build that otherwise takes under a second and runs on every save in dev. Cards
  change only when a title or description changes.
- **JPEG at q90, not PNG.** Chrome only emits PNG, and 24-bit PNG of a smooth dark
  gradient ran ~256KB — 14MB across both committed copies of 27 cards, which git
  would then keep for every regeneration, forever. The same card is ~105KB as JPEG
  with no visible difference.
- **The page list moved to `src/pages-index.mjs`** so the generator and the builder
  walk the same set. Two copies would drift the first time a page was added, and the
  failure would be silent: a new page with no card.

## 2. Eleven page titles were too long for search results ✅

Google truncates around 60 characters. Eleven pages ran over — worst was 81. They
were the concept pages, where the title was built as
`<firm> — <full industry eyebrow> concept · Skylanex`, so the tail that says what the
page actually is got cut.

**Done:** a short `conceptNoun` per industry ("law firm", "healthcare"), and the
concept pages drop the `· Skylanex` suffix — those titles already carry a firm name
*and* a category, and Google derives the site name from the WebSite schema anyway, so
the suffix was the redundant half. Two landing-page titles were shortened directly.
All 27 now fit.

## 3. Seven images had no dimensions ✅

The video posters on `/work` — the browser couldn't reserve space before they
loaded, so content jumped as each arrived. Measured directly as CLS, which is a
ranking input. **Done:** they are all 540×960; declared.

## 4. Google Fonts was a render-blocking third-party dependency ✅

Inter and Saira loaded from `fonts.googleapis.com`: two extra DNS lookups plus two
TLS handshakes on the critical path before any text painted, every visitor's IP
handed to a third party, and two external hosts the CSP had to allow.

**Done:** both families self-hosted from `assets/fonts/`, and the CSP tightened to
`style-src 'self' 'unsafe-inline'; font-src 'self'` — the site now loads **nothing**
from an external host.

The one number worth remembering: the **variable** faces are the same size as a
single static weight. Inter's variable latin face is 47KB and covers 400–800, where
the nine static weights this site uses totalled 365KB. Latin subset only, `swap` so
text paints immediately, both OFL-1.1 with licenses beside the files.

## 5. `sitemap.xml` had no `lastmod` ✅

Every URL carried `changefreq: monthly` — a field Google states outright that it
ignores — and no `lastmod`, which is the field it actually reads to decide what to
recrawl.

**Done:** `lastmod` per URL, read from git rather than invented. Because `dist/` is
committed, a built page's own commit date *is* the date its output last changed. Two
cases the naive version gets wrong, both handled: a page whose output differs from
HEAD has changed now but has no commit yet (those get today), and stamping every page
with the build date would claim the whole site changed on every rebuild, which tells
a crawler nothing. `changefreq` is gone.

## 6. `/services` and `/work` skipped `<h1>` → `<h3>` ✅

Screen-reader users navigating by heading level hit a gap, and it muddied the
outline crawlers read. On both pages the culprit was the same shape: cards that are
the page's primary content, sitting under no section heading of their own.
**Done:** promoted to `h2`.

## 7. `/404.html` was directly reachable and returned 200 ✅

A missing page correctly 404s, but `/404.html` requested directly answered **200** —
an indexable thin "Page not found" result, a soft 404 in Search Console's terms.

**Done** — and not the way this audit first suggested. A `noindex` meta tag politely
asks; `location = /404.html { internal; }` makes the page reachable *only* through
the `error_page` redirect, so a direct request gets a real 404. One line, and the
crawlable surface actually shrinks.

## 8. Contact form was returning 401 on every submission ✅

Not originally on this list — found while wiring it up, and the only thing on the
site that was outright broken.

The form has always posted to `/api/contact`, and nginx has always proxied that to
phansora-api's `/contact`. But the auth gate rejected it: skylanex is static, so
unlike phansora.com there is no server in front to attach the internal key. **Every
submission 401'd** and the page silently fell back to opening the visitor's mail
client.

`/contact` is now public on the API, made safe to be public rather than relying on
nobody finding it: the recipient is fixed by `EMAIL_TO` (a submission can never
choose where mail goes), five submissions per hour per IP keyed on the *forwarded*
client, a honeypot field answered like a success so bots learn nothing, length caps,
and newlines stripped from the subject to close header injection. phansora.com's
keyed relay is exempt from the limit — it funnels a whole site through one host and
would otherwise be throttled to five messages an hour in total.

Covered by `tests/test_contact.py` in phansora-api and verified end to end.

## 9. Hardening ✅

- **Body cap and edge rate limit** on `/api/contact` (`client_max_body_size 16k`,
  `limit_req` at 10r/m burst 3). Defence in depth — the API already bounds volume,
  but junk no longer reaches Python, and nginx no longer accepts a 1MB body for a
  form that needs ~8KB. The `limit_req_zone` is declared **in the vhost file itself**
  (conf.d is already inside `http{}`), so the config cannot be copied to a server
  without its zone — a missing zone doesn't degrade, it stops nginx from starting.
- **`Cache-Control: no-cache` on HTML.** Responses carried only `ETag` and
  `Last-Modified`, so browsers applied heuristic freshness and could serve a stale
  page after a deploy. `no-cache` means "revalidate before reusing", not "don't
  cache" — the ETag turns revalidation into a 304, so the cost is one conditional
  request. It sits on `location /` rather than a `\.html$` regex because the site
  serves clean URLs: a request for `/work/` never matches `.html`. Every security
  header is repeated inside that block, and the repetition is load-bearing — nginx
  drops all inherited `add_header` directives from any location declaring even one of
  its own, so adding Cache-Control alone would have silently stripped the CSP and
  HSTS from every page. **If you add a header at server level, add it there too.**
- **Deprecated `listen ... http2`** replaced with `listen 443 ssl;` + `http2 on;`.
- **`og:locale`** added.
- **"Heeritage Dental" → "Heritage Dental"** — a typo on a live page, caught while
  measuring title lengths.

---

## Still yours to do — these need prod, not code

**1. Restart phansora-api** so the contact fix goes live, and set the CORS origins
while you're in the env:

```
CORS_ALLOW_ORIGINS=https://www.skylanex.com,https://www.phansora.com
```

`config.py` falls back to `["*"]` when unset. With `/contact` now public, any site
could POST to it from a visitor's browser. Small blast radius — the recipient is
pinned and it's rate limited — but there's no reason to allow it.

**2. Copy the nginx vhost** from `deploy/nginx/skylanex.com.conf` to
`/etc/nginx/conf.d/` and reload. It carries the CSP tightening, the 404 fix, the
rate limit, and the `http2` syntax. Check it first:

```bash
nginx -t && systemctl reload nginx
```

### Deliberately not done

- **HSTS `preload`** — genuinely hard to undo, and it only closes the
  first-ever-visit gap. `max-age=31536000; includeSubDomains` is already strong. Not
  worth the commitment unless every future subdomain is certain to be HTTPS forever.
(Only HSTS preload. The `Cache-Control` item that was parked here is done — see
below.)
