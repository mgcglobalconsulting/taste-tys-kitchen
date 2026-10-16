# Brand Inputs — Taste of Ty's Kitchen

**A new theme is being created for this site.** This document is *source material* for
that work, not a specification to reproduce. Nothing here is binding. The new theme's
actual tokens get recorded in "New theme" at the bottom once decided, and
`src/styles/tokens.css` is generated from that section.

**Why this file exists:** the brand guidelines PDF is 134MB — no AI session can read it
usefully, and it is gitignored. This is the readable distillation, so every Claude
surface (CLI, co-work, VS Code) can load the brand facts for a few hundred tokens.

**Source:** `Ty's Kitchen - Brand Guidelines.pdf`, 13 pages. Text extracted
2026-10-09 by inflating the PDF content streams. The deck uses custom font encodings
with no `ToUnicode` map, so some values did not decode — those are marked below.
Confidence is stated per item; treat anything below "exact" as needing a visual check
against the PDF before it influences a decision.

---

## Inherited palette

The deck names four colors, weighted "in order of importance":

| Name | Hex | Confidence |
|---|---|---|
| **Gold** | `#CCA86E` | **Exact** — read directly from the PDF text, with `CMYK: 2, 35, 28, 0` alongside it |
| **Oxblood** | not extracted | Name only |
| **Pinot** | not extracted | Name only |
| **Crème** | not extracted | Name only (appeared as `CR...ME`) |

Only Gold's hex survived extraction. The other three are named in the deck's colour
page but their values are drawn as encoded vector text.

### Colors sampled from the actual logo file

Independent cross-check — dominant opaque colors in `chef-ty-logo.PNG` (3000×3000):

| Sampled | Share | Likely corresponds to |
|---|---|---|
| `#000000` black | 91.9% | Logo ground |
| `#B01010` red | 6.1% | Possibly **Pinot** |
| `#600808` dark red | 1.6% | Possibly **Oxblood** |

**These are approximations, not brand values.** They come from a quantized sample of a
compressed raster, and the mapping to the deck's colour names is inference, not
evidence. No gold appears in this logo variant. Do not paste these into a stylesheet as
if they were the brand palette.

To get the real values: render page 5-ish of the brand PDF (`brew install poppler`, then
`pdftoppm -f 5 -l 5 -r 150 -png`) and read the swatches, or ask the owner / the designer
at `creativelyinkdbyt@gmail.com` for the source brand file.

---

## Inherited typography

Three typefaces, with the deck's own stated roles:

**Primary — Billionaire (medium)**
> Unique, retro, vintage appearance. Comes in 3 styles; regular, medium and thin.
> Suitable for titling, display texts and logotype design.

**Secondary — Syake (regular)**
> Effortlessly combines elegance with design. Characters meticulously crafted.
> Suitable for titling, display texts and logotype design; in our case it is the one
> that reads "Tys".

**Tertiary — Lato (Bold / Light / Regular)**
> Classical proportions, particularly in the uppercase; familiar harmony and elegance,
> semi-rounded details that feel warm, underlying structure provides stability and
> seriousness. Best used for body texts, and in our case we also use it for the tagline.

### Web availability — a real constraint

| Face | Web-ready? |
|---|---|
| **Lato** | Yes — free on Google Fonts, `next/font/google` handles it |
| **Billionaire** | No — commercial display font, not on Google Fonts. Needs a licensed webfont purchase, or a substitute. |
| **Syake** | No — same situation. |

If the new theme keeps a retro/vintage display face, either budget for the webfont
licence or choose a Google-hosted substitute. Shipping an unlicensed webfont is a
licensing problem, and faking it with an image of text costs accessibility and SEO.

---

## Inherited logo system

Three lockups described in the deck:

- **Main logo** — wordmark + tagline, two elements, joined by an underline. The deck
  says it "can never be altered or compromised", and that for smaller or cleaner
  placements it may be used without the underline and tagline.
- **Square logo** — the same two elements redistributed on a square layout for better
  readability at small sizes.
- **Emblem** — a supporting asset "to create a strong and distinctive brand element
  while providing versatility and dynamism".

On hand: `chef-ty-logo.PNG`, 3000×3000 raster, which reads **"Ty's Kitchen"** — not
"Taste of Ty's Kitchen". See the naming conflict in `docs/CONTENT.md`.

**No vector logo exists in this project.** A 3000px raster will not stay crisp across a
favicon, a nav bar, and a footer. Either get the vector from the designer, or trace it.

Also described, not needed for web: uniform applications (hat, t-shirt) and a billboard.

---

## Brand voice from the deck

The guidelines carry their own shorter "who we are" and mission text, distinct from the
fuller copy the owner emailed. Recorded for tone reference — `docs/CONTENT.md` holds the
copy that should actually ship:

> At Ty's Kitchen, we strive to provide quality, great-tasting food. Our menu is
> thoughtfully crafted to cater to people from all walks of life. From comforting
> classics to exciting international [dishes] ... that resonates with each and every
> culture.

> **Our mission:** To inspire and nurture our community with healthier tasteful options.

Note the divergence: the deck emphasises *accessibility and health*, while the owner's
newer website copy emphasises *elevated, customized, VIP*. The new theme should resolve
which direction it expresses — they pull apart visually.

---

## New theme

**Decided 2026-10-16 — "Crème & Pinot".** Direction set by the owner's request: light,
vital, with restrained red and black accents. `src/styles/tokens.css` mirrors this
section; change both together.

```
Direction:        Light and vital. Warm crème ground, black ink, one red accent used
                  sparingly (CTAs, italics in headlines, small rules). Food photography
                  carries the colour; the UI stays quiet around it.
Display face:     Fraunces (Google Fonts, SIL OFL — free for web). Soft, vintage serif;
                  stands in for Billionaire, which is not web-licensed.
Body face:        Lato (Google Fonts, SIL OFL) — the brand's own tertiary face.
Surface / bg:     Crème  #FBF8F3   (page)      Linen #F3ECE2 (alternate sections)
Ink / text:       Ink    #141110   (headings, body, dark bands)
                  Smoke  #57504B   (secondary text)
Primary accent:   Pinot  #B01010   (sampled from the logo artwork)
Secondary accent: Oxblood #600808  (hover / pressed states of Pinot)
Detail only:      Gold   #CCA86E   (hairlines and ornaments on dark bands; never text on crème)
Contrast checked: yes, 2026-10-16
                  Ink on Crème 17.7:1 · Smoke on Crème 7.5:1 · Pinot on Crème 6.8:1
                  Crème on Pinot 6.8:1 · Crème on Ink 17.7:1 · Gold on Ink 8.4:1
                  Pinot on Linen 6.1:1 · Smoke on Linen 6.8:1   (all clear AA 4.5:1)
```

### Usage rules

- **Red is an accent, not a fill.** One red element per viewport is the target: the
  primary button, or an italic word in a headline, or a short rule. Full red bands are
  reserved for the single "Now booking" call to action.
- **Black is for weight.** The header CTA, the footer, and one dark band per page.
- **Gold never sits on crème** (it fails contrast). Use it only as ornament on Ink.
- **Type scale:** display headings in Fraunces 500–600, tight leading (1.05), with an
  optional *italic* word in Pinot. Eyebrows in Lato 700, uppercase, 0.2em tracking,
  12–13px. Body in Lato 400 at 17–18px, leading 1.65.
- **Corners and depth:** 2px radius on buttons and fields, 4px on images. No heavy
  shadows; use hairline borders (`#E6DED3`) and whitespace instead.
- **Motion:** gentle fade-and-rise on scroll (500ms, ease-out), a slow scale on the hero
  photo, and a slow marquee on the service strip. All of it turns off under
  `prefers-reduced-motion`.

### Logo on the light theme

The supplied `chef-ty-logo.PNG` is red artwork on a solid black square and reads
**"Taste of Ty's Kitchen"** (with a chef's hat on the F). For the light theme it was
keyed to transparency from the red channel and exported to `public/brand/`:

| File | Use |
|---|---|
| `logo-red.png` | Header, on crème |
| `logo-cream.png` | Footer and dark bands |
| `logo-ink.png` | Single-colour print / fallback |

These are 1200px raster exports. A vector logo from the designer is still the right
long-term fix (see the logo section above).
