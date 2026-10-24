# AGENTS.md — Taste of Ty's Kitchen

Contract for every Codex surface working this repo: **CLI, co-work, and VS Code.**
Read this first, every session.

## What this is

Marketing website for a full-service mobile catering business. Next.js, deployed to
Vercel. Brochure site with an event-inquiry form — not a storefront.

## Read these before proposing anything

| File | What it holds |
|---|---|
| `docs/CONTENT.md` | The owner's real site copy. **Use this instead of writing marketing text.** |
| `docs/BRAND.md` | Inherited brand inputs + the new theme's tokens |
| `docs/IMAGES.md` | What each photo is, where it goes, what still needs shooting |
| `docs/zeff-catering-style.md` | Competitor research. **Inspiration only — a different company.** |
| `.github/agents/chef-tys-kitchen-spec.agent.md` | Discovery rules; the "don't invent features" discipline |

## Hard rules

1. **Never invent business facts.** No prices, packages, minimums, service areas, phone
   numbers, lead times, capacity, certifications, or testimonials. If it isn't in
   `docs/CONTENT.md`, it doesn't go on the page. Items marked `[MISSING]` there are
   waiting on the owner — leave them as visible placeholders, don't fill them in.
2. **Nothing carries over from the Zeffert & Gold research.** Different company. Not
   their copy, numbers, awards, clients, or claims.
3. **No backend without explicit approval.** A Supabase project exists but is `INACTIVE`.
   Do not add auth, a database, payments, booking, carts, accounts, or a CRM on your own
   initiative.
4. **Never commit binaries over ~1MB.** Git history is permanent. Source PDFs and video
   are gitignored on purpose; a 134MB file in a commit can only be removed by rewriting
   history for everyone.
5. **Confirm before pushing or deploying.** Per the global rule: ask before `git push`,
   `vercel deploy`, or `vercel --prod`. Vercel builds consume plan credits.
6. **Images go through `next/image`.** Never a bare `<img>` for photography — the source
   files are oversized and unoptimized, and `next/image` is what fixes that at build time.

## Open decisions — do not resolve these silently

- **The brand name.** "Taste of Ty's Kitchen" vs "Ty's Kitchen" vs "Chef Ty's Kitchen"
  all appear across the materials, and the logo artwork disagrees with the business
  documents. Drives the wordmark, titles, metadata, and domain. See `docs/CONTENT.md`.
- **The theme.** Being designed fresh. `docs/BRAND.md` holds inherited inputs; its
  "New theme" section is the decision record.
- **The primary conversion action.** Inquiry vs consultation request vs quote. Pick one
  and build around it — don't ship all three.
- **Display typeface licensing.** The inherited display faces (Billionaire, Syake) are
  not web-licensed and not on Google Fonts.

## Layout

```
src/app/          Routes (App Router)
src/components/   Reusable UI
src/content/      Menu + services data, as data not hardcoded markup
src/lib/          Helpers
src/styles/       tokens.css generated from docs/BRAND.md "New theme"
public/menus/     Downloadable menu PDFs (the only committed PDFs)
public/brand/     Favicon, logo exports
docs/             Distilled source material — read, don't regenerate
```

Source photography lives in `taste-of-ty-site-pics/` until it's been web-optimized into
`src/assets/` or `public/`. See `docs/IMAGES.md`.

## Working across three surfaces

The real failure mode here is two surfaces editing from stale state, not bad structure.

- `git pull` at the start of every session, commit small, push often
- One surface at a time on `main`; use a branch per surface if running concurrently
- `git status` before you start — someone else's uncommitted work may be sitting there

## Gitignored, and why

`taste-tys-assets/` (818MB of video), all root `*.pdf` (source material, incl. the 134MB
brand deck), `node_modules/`, `.next/`. The PDFs are **local input for build decisions** —
their contents are already distilled into `docs/`. Don't try to commit them, and don't
delete them.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
