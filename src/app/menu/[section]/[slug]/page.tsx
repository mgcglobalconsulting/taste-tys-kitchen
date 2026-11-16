import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/site/reveal";
import { SteamRise } from "@/components/site/steam-rise";
import { Button } from "@/components/ui/button";
import {
  eveningCategories,
  eveningCuisines,
} from "@/content/corporate-menu";
import { menuSections } from "@/content/menu";
import { photos } from "@/content/photos";
import type { PhotoKey } from "@/content/photos";
import { primaryCta, orderCta } from "@/content/site";

// ─── Photo map ────────────────────────────────────────────────────────────────

const itemPhotoMap: Partial<Record<string, PhotoKey>> = {
  "chicken": "jerkChicken",
  "pork-or-beef": "jerkedQuarters",
  "fish": "salmon",
  "mushrooms": "setup3",
  "tofu": "setup3",
  "fried-plantains": "jerkChicken",
  "mozzarella-caprese-salad": "crostini",
  "southwest-bean-salad": "setup3",
  "broccoli-slaw-or-cole-slaw": "plating",
  "meatballs": "smallBites",
  "signature-skewers": "shrimpCocktail",
  "garden-salad-or-caesar-salad": "seafoodSalad",
  "italian-pasta-salad": "crostini",
  "garlic-mashed-potatoes": "plating",
  "yellow-saffron-rice-or-cilantro-lime-rice": "setup4",
  "6-cheese-mac": "setup3",
  "lo-mein": "seafoodSalad",
  "asparagus": "plating",
  "green-beans": "plating",
  "mixed-greens": "setup3",
  "broccolini": "plating",
};

const sectionPhotoFallback: Record<string, PhotoKey> = {
  "appetizers": "shrimpCocktail",
  "entrees": "jerkChicken",
  "sides": "plating",
};

// ─── Corporate pricing lookup ─────────────────────────────────────────────────

type PricingMatch = { name: string; a: string; b?: string; source: string };

function findCorporatePricing(itemName: string): PricingMatch[] {
  const stopWords = new Set(["or", "and", "the", "a", "an", "of", "with"]);
  const terms = itemName
    .toLowerCase()
    .split(/[\s,&\/\-]+/)
    .filter((t) => t.length > 3 && !stopWords.has(t));

  const results: PricingMatch[] = [];

  for (const cuisine of eveningCuisines) {
    for (const cat of eveningCategories[cuisine]) {
      for (const item of cat.items) {
        if (terms.some((term) => item.name.toLowerCase().includes(term))) {
          results.push({ name: item.name, a: item.a, b: item.b, source: cuisine });
        }
      }
    }
  }

  return results.slice(0, 8);
}

// ─── Slug helper ─────────────────────────────────────────────────────────────

function toSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return menuSections.flatMap((section) =>
    section.items.map((item) => ({
      section: section.id,
      slug: toSlug(item.name),
    })),
  );
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}): Promise<Metadata> {
  const { section: sectionId, slug } = await params;
  const section = menuSections.find((s) => s.id === sectionId);
  const item = section?.items.find((i) => toSlug(i.name) === slug);

  if (!section || !item) return {};

  return {
    title: `${item.name} — Catering Menu`,
    description: item.note
      ? `${item.name}: ${item.note}. Part of Taste of Ty's Kitchen ${section.title} catering menu.`
      : `${item.name} — part of Taste of Ty's Kitchen ${section.title} catering menu.`,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function MenuItemPage({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section: sectionId, slug } = await params;

  const section = menuSections.find((s) => s.id === sectionId);
  if (!section) notFound();

  const item = section.items.find((i) => toSlug(i.name) === slug);
  if (!item) notFound();

  // Determine hero photo
  const photoKey = itemPhotoMap[slug] ?? sectionPhotoFallback[sectionId] ?? "jerkChicken";
  const heroPhoto = photos[photoKey];

  // Parse prep styles from item.note
  const prepStyles = item.note
    ? item.note
        .split(/,\s*|\s+or\s+/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  // Corporate pricing
  const pricingMatches = findCorporatePricing(item.name);

  // Related items (other items in the same section)
  const relatedItems = section.items.filter((i) => toSlug(i.name) !== slug);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden bg-ink">
        {/* Full-bleed photo */}
        <Image
          src={heroPhoto.src}
          alt={heroPhoto.alt}
          fill
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
          priority
        />

        {/* Dark gradient overlay — bottom 60% */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />

        {/* Steam wisps */}
        <SteamRise className="opacity-40" />

        {/* Text content */}
        <div className="container-site absolute inset-x-0 bottom-0 pb-14">
          <Reveal>
            <p className="eyebrow mb-3 text-gold/70">{section.title}</p>
            <h1 className="font-display text-5xl text-creme sm:text-7xl">{item.name}</h1>
            {/* Gold rule */}
            <div className="mt-4 h-0.5 w-16 origin-left scale-x-100 bg-gold" />
          </Reveal>
        </div>
      </section>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <section className="bg-linen">
        <div className="container-site py-16">

          {/* Prep styles */}
          {prepStyles.length > 0 && (
            <Reveal>
              <p className="eyebrow mb-5">Preparation styles</p>
              <div className="flex flex-wrap gap-3">
                {prepStyles.map((style) => (
                  <span
                    key={style}
                    className="rounded-full border border-line bg-creme px-4 py-1.5 text-sm font-semibold"
                  >
                    {style}
                  </span>
                ))}
              </div>
            </Reveal>
          )}

          {/* Pan pricing */}
          {pricingMatches.length > 0 && (
            <Reveal delay={80}>
              <div className={prepStyles.length > 0 ? "mt-14" : ""}>
                <p className="eyebrow mb-6">Pan pricing</p>
                <div className="overflow-hidden rounded-[var(--radius-media)] border border-line bg-creme">
                  {pricingMatches.map((match, i) => (
                    <div
                      key={`${match.source}-${match.name}-${i}`}
                      className="flex flex-col gap-1 border-b border-line px-6 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-semibold leading-snug">{match.name}</p>
                        <p className="eyebrow mt-0.5 text-[0.65rem]">{match.source}</p>
                      </div>
                      <div className="flex shrink-0 gap-6 text-sm">
                        <span>
                          <span className="text-smoke">Half&nbsp;</span>
                          <span className="font-bold text-ink">{match.a}</span>
                        </span>
                        {match.b && (
                          <span>
                            <span className="text-smoke">Full&nbsp;</span>
                            <span className="font-bold text-ink">{match.b}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* CTAs */}
          <Reveal delay={160}>
            <div className={`flex flex-wrap gap-4 ${prepStyles.length > 0 || pricingMatches.length > 0 ? "mt-14" : ""}`}>
              <Button asChild variant="primary" size="lg">
                <Link href={orderCta.href}>{orderCta.label}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={primaryCta.href}>Book for Your Event</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Related items ─────────────────────────────────────────────────── */}
      {relatedItems.length > 0 && (
        <section className="bg-ink py-16 sm:py-20">
          <div className="container-site">
            <Reveal>
              <p className="eyebrow mb-10 text-gold/70">More {section.title}</p>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedItems.map((related, i) => {
                const relatedSlug = toSlug(related.name);
                const relatedPhotoKey =
                  itemPhotoMap[relatedSlug] ?? sectionPhotoFallback[sectionId] ?? "jerkChicken";
                const relatedPhoto = photos[relatedPhotoKey];
                return (
                  <Reveal key={related.name} delay={i * 60}>
                    <Link
                      href={`/menu/${sectionId}/${relatedSlug}`}
                      className="group relative flex h-44 overflow-hidden rounded-[var(--radius-media)] bg-ink/80"
                    >
                      {/* Background photo */}
                      <Image
                        src={relatedPhoto.src}
                        alt={relatedPhoto.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover opacity-50 transition-all duration-500 group-hover:scale-105 group-hover:opacity-70"
                        placeholder="blur"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />

                      {/* Gold border glow on hover */}
                      <div className="absolute inset-0 rounded-[var(--radius-media)] border border-gold/0 transition-all duration-300 group-hover:border-gold/40 group-hover:shadow-[0_0_16px_4px_rgba(204,168,110,0.1)]" />

                      {/* Text */}
                      <div className="relative mt-auto w-full p-5">
                        <p className="font-display text-xl text-creme leading-tight">{related.name}</p>
                        {related.note && (
                          <p className="mt-1 text-xs italic text-creme/60">{related.note}</p>
                        )}
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
