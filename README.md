# Taste of Ty's Kitchen — Website

Marketing site for a full-service mobile catering business. Next.js, deploying to Vercel.

> **Brand name is an open decision.** "Taste of Ty's Kitchen", "Ty's Kitchen", and "Chef
> Ty's Kitchen" all appear across the source materials, and the logo artwork disagrees
> with the business documents. See `docs/CONTENT.md` before writing any user-facing copy.

## Start here

[`CLAUDE.md`](CLAUDE.md) is the working contract — read it first, on any Claude surface.

| Doc | What it holds |
|---|---|
| [`docs/CONTENT.md`](docs/CONTENT.md) | The owner's real site copy. Use it instead of writing marketing text. |
| [`docs/BRAND.md`](docs/BRAND.md) | Inherited brand inputs; the new theme's tokens get recorded here |
| [`docs/IMAGES.md`](docs/IMAGES.md) | Photo inventory, what's usable, what needs reshooting |
| [`docs/zeff-catering-style.md`](docs/zeff-catering-style.md) | Competitor research — inspiration only, a different company |

## Layout

```
src/app/          Routes (App Router)
src/components/   Reusable UI
src/content/      Menu + services data
src/lib/          Helpers
src/styles/       tokens.css, generated from docs/BRAND.md
public/brand/     Favicon, logo exports
public/menus/     Downloadable menu PDFs
docs/             Distilled source material
```

## Source material

The project folder holds the original business PDFs — brand guidelines, business plan,
the owner's website-details email — plus `taste-tys-assets/` (818MB of photo and video).
**All of it is gitignored**, and deliberately so: the brand deck alone is 134MB, over
GitHub's hard 100MB per-file limit.

Those files are local input for build decisions. Their contents are already distilled
into `docs/` — read the markdown rather than reaching for the PDFs.

## Supabase

A project is selected but **not currently in use**:

- Project ref: `jdylalgxmvyltyectuls`
- Dashboard: https://supabase.com/dashboard/project/jdylalgxmvyltyectuls

As of 2026-10-08 Supabase reports it `INACTIVE` (dashboard name: `OneDopeStory's
Project`). No application connection has been configured or verified. The site is a
brochure site with an inquiry form; **no backend has been approved.** Keep credentials in
local env settings or the host's env settings — never in this repo.

## Deploying

Ask before pushing or deploying. Vercel builds consume plan credits.

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also type-checks)
npm run lint
```

Copy `.env.example` to `.env.local`. With `SUPABASE_URL` and `SUPABASE_ANON_KEY` empty the
booking form still works but tells visitors to email or call instead of storing the
request. The table and RLS policy it expects are in `supabase/migrations/` (not applied).

Photos in `src/assets/photos/` are web-converted copies of `taste-of-ty-site-pics/`
(several originals were HEIC or PNG files with `.jpeg` names, which `next/image` can't
read). Re-run the conversion when the real photography arrives.
