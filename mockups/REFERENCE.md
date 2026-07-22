# Law-firm concept recreations — reference measurements

Working notes for replacing the six live CSS mockups on `/solutions/law-firms` with static
WebP recreations of the reference screenshots in `~/Pictures/1–6.png`.

**Status:** paused, waiting on user-supplied photography for all six.

## Screenshot → existing showcase concept

Each reference's color scheme already matches one of the six `legalPalettes`, so every
recreation reuses the firm name, headline, nav, stats and cards **already written** in
`site.config.mjs` → `industryPages[0].showcase[]`. No new copy needs inventing.

| Ref | Source template | Concept slug | Scheme | Label | Photo need |
|---|---|---|---|---|---|
| `6.png` | Legaro | `casewright` | Charcoal & Crimson | Business & corporate litigation | dark courtroom scene |
| `5.png` | Justica | `thornbury` | Sepia & Amber | Personal injury & civil rights | law library, seated |
| `4.png` | Lexicon | `ambersby` | Cream & Gold | Estate planning & appellate | 2× courthouse architecture, no person |
| `2.png` | Avukat | `hollowell` | Navy & Camel | Family law & divorce | cut-out on flat navy |
| `3.png` | Lawfic | `kestrel` | Slate & Brass | Criminal defense | cut-out on flat navy |
| `1.png` | Barristar | `stonecourt` | Plum & Pale Gold | Immigration & business | bright blurred office |

## Pipeline

Author each as a fixed-size HTML stage, screenshot with headless Chrome, convert to WebP.
Text stays crisp and re-wording is a one-line edit rather than a raster edit.

```
google-chrome --headless --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=3840,1850 \
  --screenshot=out/<slug>.png file://<abs>/<slug>.html
```

Then Pillow → WebP. `build.mjs:81` already copies `assets/images/` → `dist/images/`, so
dropping the results in `assets/images/concepts/` publishes them with no build change.

Fonts must be vendored as woff2 (Google Fonts, OFL) — the box only has DejaVu / Liberation /
Noto, none of which match the reference typography. Needed: Playfair Display, Cormorant
Garamond, Marcellus, Poppins, Jost, Archivo, Lora.

Python tooling lives in a venv (system pip is PEP-668 managed):
`/tmp/claude-1000/-home-crimson-sites/*/scratchpad/venv/bin/python` — has numpy + Pillow.

## Measured spec — `2.png` Avukat → `hollowell`

Sampled directly from the reference. Canvas 3840×1850.

**Colors**
| Role | Hex |
|---|---|
| Background (flat, whole canvas) | `#1e2e3e` |
| Accent / tan (eyebrow, button, numeral, nav underline) | `#cdb091` |
| Headline | `#ffffff` |
| Body paragraph | `#e2e2e2` |
| Frame rectangle stroke | `#717171` |
| Nav bottom hairline | `#41586f` |

**Geometry** (x/y in canvas pixels)
| Element | Box |
|---|---|
| Header container | x 260–3579 |
| Logo mark + wordmark | x 386–601, y 80–129 |
| Nav items | x 1207–2612, y 101–126 |
| Active-item tan underline | x 1161–1353, y 218–225 (8px) |
| Nav hairline | y 226–227, full container width |
| Copy column left edge | x 535 |
| Eyebrow (serif, tan) | y 723–776 |
| Headline (serif bold, 2 lines) | x 536–1846, y 844–1154 |
| Paragraph (sans, 3 lines) | x 535–1870, y 1233–1371 |
| Button fill | x 533–1008, y 1443–1554 |
| Button offset outline | ~14px up/right of the fill, 3px tan stroke |
| Frame rectangle | x 2307–3346, y 341 → bleeds off bottom; 40px stroke |
| Big numeral | x 2057–2288, y 1623–1781 |
| Numeral label (2 lines) | x 2345–2638, y 1630–1768 |
| Figure silhouette | x ~2350–3390, y ~270 → bleeds off bottom |

Type: headline is a high-contrast transitional serif (Playfair Display Bold is the closest
free match); eyebrow is the same serif at ~54px; body and nav are a geometric sans
(Poppins/Jost).

Copy comes from the `hollowell` demo object already in `site.config.mjs` — brand
"Hollowell Legal", nav Divorce/Custody/Mediation/Contact, eyebrow "Family Law", headline
"Steady guidance through the hardest year", bignum 1,400 / "Families served".

## Photo audit — `~/Pictures/people/` (superseded)

Eight cut-outs, all on transparent/white, no environments. Kept for reference:

| File | Size | Note |
|---|---|---|
| `pngwing.com7.png` | 1564×2559 | Best in set. Woman, dark suit, arms crossed. |
| `pngwing.com8.png` | 536×1872 | Man, black suit, arms crossed, full standing body. Narrow. |
| `pngwing.com4.png` | 758×1145 | Man, gray suit. Right pose for Avukat, but carries a **white fringe halo** needing erosion before it sits on navy. |
| `pngwing.com3.png` | 752×1113 | Woman, arms crossed. P-mode with real alpha. Sweater, reads business-casual. |
| `pngwing.com2/5/6.png` | ≤815px | Too low-res; 2–3× upscale would soften. |
| `pngwing.com.png` | 792×1222 | Sunglasses, cargo pants. Not usable for legal. |

## Page wiring (not started)

- `site.config.mjs` — add `image:` and `scheme:` to each `showcase[]` entry; keep `demo` as the
  copy source of truth so render and config can't drift.
- `src/pages/industry.mjs` — rewrite `concept()` (lines 12–25) to emit `<img loading="lazy">`
  instead of `mockup()`; drop the `mockup`/`paletteBySlug` import; move the concepts grid
  (line 67) from `lg:grid-cols-2` to single column, since 2.08:1 is unreadable in a 600px column.
- Reword the originality claims at `src/pages/industry.mjs:65`, `:71`, and the
  `NOTE ON THE SHOWCASE` comment in `site.config.mjs` — near-identical recreations of commercial
  templates make "not stock templates" untrue. Keep the "not past client work" disclaimer.
- Once verified, `legalPalettes`, the `legal` VARIANT and `ART.figure` in `src/mockup.mjs`, and
  the `.mk-legal-*` / `.mk-util` / `.mk-bignum` rules in `src/styles/app.css` all become dead.
  `mockup()` itself stays — `/solutions` and `/solutions/color-palettes` still use it.
