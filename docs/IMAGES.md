# Image Inventory & Plan

> ⚠️ **PROVISIONAL — the real image set has not been delivered yet.**
> This audits only the placeholder material currently in `taste-of-ty-site-pics/`.
> When the actual photography arrives, re-run the audit and replace the inventory
> tables below. The **"Handling in code"** section stays valid regardless of which
> files land; the file-by-file tables do not.

22 images + 1 PDF in `taste-of-ty-site-pics/`, ~20MB total. Audited 2026-10-09 with
`sips` for dimensions and EXIF. None are web-ready yet.

## The headline problem

**Most of this library is phone screenshots and Instagram re-downloads, not original
photography.** 14 files are exactly 1179px wide — that is the iPhone 14/15 Pro screenshot
width. Five more carry `Software: Instagram`, meaning they were saved back off the
platform after Instagram already compressed them.

Consequence: **only 5 images are large enough for a full-bleed hero** on a retina
display. For a brand positioning itself as "elevated" and "premium", the photography is
currently the weakest asset in the project.

I also checked `taste-tys-assets/` (818MB, 55 images) for better originals — it's the
same material at the same ceiling, mostly 1179×2096 and 2048×2048. No higher-res
versions are in the project.

### Two asks that would fix it cheaply

1. **There was a real Canon shoot.** `fine-dining`, `private-dining`, and
   `chef-ty-home-dining` are all Canon EOS REBEL T1i frames from 2023-10-28, minutes
   apart, delivered at exactly 2376×1584 — precisely half of that body's 4752×3168
   native. **The photographer still has 15MP originals.** Getting them back is free and
   roughly quadruples usable resolution.
2. **Original camera files, not screenshots.** For every 1179px file, an original sits
   in someone's camera roll at ~3024×4032. Pulling those directly — AirDrop, not
   screenshot, not Instagram — is also free.

Where neither is possible, a short food/event shoot is the honest recommendation before
launch.

---

## Inventory

Source column: how the file was produced, per EXIF.

### Usable at hero size (5)

| File | Size | Dimensions | Source | Notes |
|---|---|---|---|---|
| `jerked-chicken-quarters.jpeg` | 1.7M | 3024×4032 | iPhone 14 Pro | Full-res original. Portrait. Best food shot on hand. |
| `small-bites-pic.jpeg` | 768K | 2217×3168 | Canon | Portrait. |
| `fine-dining.jpeg` | 468K | 2376×1584 | Canon | **Landscape — prime hero candidate.** |
| `private-dining.jpeg` | 468K | 2376×1584 | Canon | Landscape. Same shoot. |
| `chef-ty-home-dining.jpeg` | 480K | 2376×1584 | Canon | Landscape. Same shoot. |

### Card / gallery only — too small for hero (12)

| File | Size | Dimensions | Source |
|---|---|---|---|
| `chef-ty-barnes-nobles.jpeg` | 824K | 1179×2556 | screenshot |
| `chef-tyshrimp-cocktail.JPG` | 864K | 1179×2096 | iPhone |
| `setup-private-1.JPG` | 732K | 1179×2096 | iPhone |
| `chef-setup-3.JPG` | 684K | 1179×2096 | iPhone |
| `chef-ty-setup-4.JPG` | 684K | 1179×2096 | iPhone |
| `pumpkin-roll.JPG` | 672K | 1179×2096 | iPhone |
| `chef-ty-plating.jpg` | 668K | 1179×1785 | screenshot |
| `chef-ty-flavors.jpg` | 712K | 1179×758 | screenshot — very wide crop |
| `chefty-candid-1.JPG` | 268K | 1179×2096 | Instagram |
| `chefty-crostinos.jpg` | 348K | 502×841 | screenshot — small |
| `jerk-chicken.JPG` | 180K | 828×876 | Instagram |
| `pineapple-habanero-salmon.JPG` | 176K | 828×933 | Instagram |
| `seafoodsalad.JPG` | 144K | 828×822 | Instagram |

### Problem files (5)

| File | Size | Dimensions | Problem |
|---|---|---|---|
| `chef-ty-lambchop.png` | **2.8M** | 1179×1466 | A photograph saved as PNG. Wrong format — converting to WebP saves ~2.6MB, the single biggest win in the set. |
| `taste-of-tys-award.jpeg` | **3.0M** | 2556×1179 | Largest file for a mid-size image; badly over-weight. Also: confirm what the award actually is before captioning it. |
| `chef-ty-logo.PNG` | 1.2M | 3000×3000 | Raster logo, no vector. Won't stay crisp from favicon to nav bar. See `docs/BRAND.md`. |
| `chef-ty-group.jpeg` | 48K | 642×423 | Too small and too soft for any prominent placement. |
| `menu-example.pdf` | 2.0M | 1800×2664 | Not an image — a menu PDF filed in the images folder. Belongs in `public/menus/`. |

---

## Where they go

```
public/brand/     logo exports, favicon, og-image      ← from chef-ty-logo.PNG (+ vector)
public/menus/     menu-example.pdf                     ← the only committed PDFs
src/assets/
  hero/           the 5 large files
  food/           plated dishes
  events/         setups, private/fine dining
  team/           owner + candid shots
```

Keep originals in `taste-of-ty-site-pics/` (gitignore-free, they're small enough) and
import from `src/assets/` so `next/image` processes them at build.

## Handling in code

`next/image` does the resizing, format negotiation (WebP/AVIF), and `srcset` generation
at build time — which is the whole reason not to hand-optimize these.

- Import from `src/assets/` so Next can read intrinsic dimensions and prevent layout shift
- `priority` on the hero image only; everything else lazy-loads by default
- `sizes` must reflect real layout width, or Next ships a file far larger than needed
- Set `quality={75}`–`82`; the default 75 is fine for food photography
- **Never a bare `<img>` for photography** — these sources are too heavy for it
- Real `alt` text on every image: describe the dish or scene, not "food photo"

Expected result: ~20MB of sources serving as roughly 1.5–2MB of actual transfer.

## Approved bio photograph (2026-10-24)

The owner supplied `~/Downloads/chefty-and-shalonda.jpeg` and selected it for the
About page beside Chef Ty's biography. The owner identifies the subjects as Chef Ty
and Shalonda Stokes, president of Downtown Partnership.

Despite its extension, the original is HEIF (4032×3024). The site uses a converted
1800×1350 JPEG at `src/assets/photos/chefty-and-shalonda.jpg` (under 1MB), served
through `next/image`. Its 4:3 frame and `object-contain` preserve the entire photograph.
The original download is untouched.

## Before launch

- [ ] Request the 15MP Canon originals from the 2023-10-28 shoot
- [ ] Replace Instagram-sourced files with originals from the camera roll
- [ ] Convert `chef-ty-lambchop.png` off PNG
- [ ] Recompress `taste-of-tys-award.jpeg`
- [ ] Get or trace a vector logo
- [ ] Move `menu-example.pdf` to `public/menus/`
- [ ] Confirm what `taste-of-tys-award.jpeg` depicts
- [x] Owner's photo for the "About the owner" section — `chefty-and-shalonda.jpeg`
      selected by the owner on 2026-10-24
- [ ] Owner asked for "10–12" gallery images; there are enough files, but confirm which
      are approved and which are actually *her work* rather than reference
