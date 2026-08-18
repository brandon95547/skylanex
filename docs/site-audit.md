# Skylanex site audit — SEO, performance, security

Audited 2026-08-18 against the built `dist/` and the live responses from
`https://www.skylanex.com`. Ordered by impact, not by category: the top items
change what visitors and crawlers actually see, the bottom ones are hardening.

Each item says what is wrong, why it matters, and what fixing it means.

## Already correct — don't redo these

Worth stating plainly so the list below reads as the exception rather than the rule:

- **robots.txt** — present, allows everything, points at the sitemap.
- **sitemap.xml** — all 27 built pages are listed, none missing, none stale.
- **llms.txt** — generated from the same config as the site, so it can't drift.
- **canonical + OG/Twitter tags** — on every page, absolute, `www`-correct.
- **One `<h1>` per page** — all 27 pages, no exceptions.
- **Image `alt`** — all 39 images have it; the 7 empty ones are decorative, which
  is the correct use of `alt=""`.
- **`loading="lazy"`** — on 27 images.
- **Structured data** — Organization/ProfessionalService + WebSite sitewide, plus
  Service, FAQPage, BreadcrumbList, ItemList, VideoObject, ImageObject per page type.
- **Security headers** — verified live: HSTS, CSP, `X-Content-Type-Options`,
  `frame-ancestors 'none'`, COOP, Referrer-Policy, Permissions-Policy.
- **No secrets, no `.env`, no source maps** committed anywhere in the repo.
- **`rel="noopener"`** on every `target="_blank"` link.

---

## 1. `og:image` is an SVG — every social share is a blank card

`layout.mjs` points `og:image` and `twitter:image` at
`/images/skylanex-logo.svg`. **No major platform renders SVG in a link preview** —
not X, LinkedIn, Facebook, Slack, iMessage, or WhatsApp. Every link to the site
posted anywhere currently shows an empty box, on a site whose whole job is to look
like a studio that ships polished work.

`assets/images/` has only `skylanex-logo.svg` and `skylanex-mark.svg`, so there is
no raster fallback to switch to.

**Fix:** produce a 1200×630 PNG or JPG (the eagle mark, wordmark, and tagline on
the dark field), add it as `assets/images/og-card.png`, and point both tags at it.
Add `og:image:width`/`height` while you're there — some scrapers use them to avoid
fetching the file.

## 2. Eleven page titles are too long for search results

Google truncates around 60 characters. These are over, worst first:

| Chars | Page |
|---|---|
| 81 | `/solutions/medical-dental/northpoint` |
| 78 | `/solutions/medical-dental/elevation` |
| 75 | `/solutions` |
| 73 | `/solutions/medical-dental/riverbend` |
| 71 | `/solutions/medical-dental/heritage`, `/solutions/medical-dental/meridian` |
| 66 | `/solutions/medical-dental/summit` |
| 63 | `/solutions/law-firms/westbridge` |
| 62 | `/solutions/law-firms/harbor`, `/solutions/law-firms/hawthorne` |
| 61 | `/solutions/medical-dental` |

These are the concept pages, where the title is built as
`<firm> — <label> website design concept · Skylanex`. The tail — the part that says
what the page is — is exactly what gets cut.

**Fix:** give the concept pages an explicit shorter `metaTitle` (the layout already
supports it) — something like `Northpoint — dental website concept · Skylanex`.

## 3. No images carry `width`/`height` — layout shift on every page

Zero of the 39 `<img>` tags declare dimensions. The browser can't reserve space
before the image loads, so content jumps as each one arrives. This is measured
directly by Core Web Vitals (CLS), and it's a ranking input.

**Fix:** add `width` and `height` to every `<img>` (the intrinsic pixel size — CSS
still controls display size). The concept images are all 1200×675, which the
`ImageObject` JSON-LD in `seo.mjs` already asserts, so the values are known.

## 4. Google Fonts is a render-blocking third-party dependency

`layout.mjs` loads Inter and Saira from `fonts.googleapis.com`. That's two extra
DNS lookups plus two TLS handshakes on the critical path before any text paints,
and it hands every visitor's IP to a third party — the reason the CSP has to carve
out `fonts.googleapis.com` and `fonts.gstatic.com` at all.

**Fix:** self-host the two families as woff2 in `assets/fonts/`. Fewer round trips,
a tighter CSP (`style-src 'self' 'unsafe-inline'`, `font-src 'self'`), and no
third-party exposure.

## 5. `sitemap.xml` has no `lastmod`

Every URL carries `<changefreq>monthly</changefreq>` and nothing else. `changefreq`
is [openly ignored by Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap);
`lastmod` is the field it actually reads to decide what to recrawl. Without it,
edits to a page are found whenever the crawler gets around to it.

**Fix:** in `build.mjs`, stamp each URL with the source page's git commit date (or
the build date as a cruder version). Dropping `changefreq` at the same time costs
nothing.

## 6. `/services` and `/work` skip from `<h1>` straight to `<h3>`

Both pages run `h1 → h3` with no `h2` in between. Screen-reader users navigating by
heading level hit a gap, and it muddies the document outline that crawlers read.

**Fix:** promote the first tier of section headings on those two pages to `h2`.
Purely a tag change — the visual size is a Tailwind class, not the level.

## 7. The 404 page tells crawlers to index it

`dist/404.html` carries the sitewide `<meta name="robots" content="index, follow">`.
nginx does serve it with a real 404 status, so this is mostly harmless — but the
page is also reachable directly at `/404.html`, where it returns **200** and is
therefore indexable as a thin "Page not found" result.

**Fix:** pass a `noindex` flag through `layout()` for this one page.

## 8. `CORS_ALLOW_ORIGINS` on phansora-api defaults to `*`

`config.py` falls back to `["*"]` when the env var is unset. Now that `/contact` is
a public route (see below), any website can POST to it from a visitor's browser.
The blast radius is small — the recipient is pinned by `EMAIL_TO`, so it can only
ever mail you, and it's rate limited — but there's no reason to allow it.

**Fix:** set `CORS_ALLOW_ORIGINS` in the prod env to the real origins:
`https://www.skylanex.com,https://www.phansora.com`.

## 9. No body-size cap or edge rate limit on `/api/contact`

The API now caps message size and allows five submissions per hour per IP, so this
is defense in depth rather than an open hole — but every junk request still travels
through nginx into Python before being rejected, and nginx's default
`client_max_body_size` is 1 MB for a form that needs ~8 KB.

**Fix** in the `location = /api/contact` block:

```nginx
client_max_body_size 16k;
limit_req zone=contact burst=3 nodelay;
```

with `limit_req_zone $binary_remote_addr zone=contact:1m rate=10r/m;` in `http{}`.

## 10. Smaller hardening items

- **No `Cache-Control` on HTML.** Responses carry `ETag` and `Last-Modified` only,
  so browsers apply heuristic caching and may serve a stale page after a deploy.
  Add `location ~* \.html$ { add_header Cache-Control "no-cache"; }` — but note it
  must re-declare the security headers, since nginx drops inherited `add_header`
  from any location that sets its own. The existing comment in the vhost about the
  asset location makes the same point.
- **Deprecated nginx syntax.** `listen 443 ssl http2;` is deprecated as of nginx
  1.25; the current form is `listen 443 ssl;` plus a separate `http2 on;`. Works
  today, warns in the log.
- **HSTS has no `preload`.** `max-age=31536000; includeSubDomains` is already
  strong. Adding `preload` and submitting to hstspreload.org closes the
  first-ever-visit gap — but it is genuinely hard to undo, so only do it if you're
  certain every current and future subdomain will be HTTPS forever.
- **No `og:locale`.** One-line addition (`en_US`); matters only if you ever add a
  second language.

---

## Contact form — how it works now

Included here because it was the one item on this list that was actually broken,
and it's now fixed and deployed to git.

The form has always posted to `/api/contact`, and the nginx vhost has always
proxied that to phansora-api's `/contact`. But phansora-api's auth gate rejected
it: skylanex is a static site, so unlike phansora.com there is no server in front
to attach the internal key. **Every submission returned 401** and the page silently
fell back to opening the visitor's mail client.

`/contact` is now a public route on the API, made safe to be public rather than
relying on nobody finding it:

- the recipient is fixed by `EMAIL_TO` — a submission can never choose where mail goes;
- five submissions per hour per IP, keyed on the **forwarded** client (every
  submission shares one socket peer behind nginx, so keying on that would let one
  visitor lock out the whole site);
- a hidden `website` honeypot field, answered like a success so bots learn nothing;
- subject/message/reply-to length caps, and newlines stripped from the subject to
  close header injection;
- phansora.com's keyed relay is exempt from the limit — it funnels the whole site
  through one host and would otherwise be throttled to five messages an hour total.

Covered by `tests/test_contact.py` in phansora-api, and verified end to end through
a local stand-in for the nginx-plus-API topology.

**To activate in prod:** pull phansora-api and restart the service. No nginx change
is needed — the proxy was already there.
