import { Check, Star } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CtaBand } from "@/components/site/cta-band";
import { FoodVignette } from "@/components/site/food-vignette";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { SpinMark } from "@/components/site/spin-mark";
import { SteamRise } from "@/components/site/steam-rise";
import { Button } from "@/components/ui/button";
import {
  dietaryOptions,
  menuAddOns,
  menuSections,
  packages,
  serviceStyles,
  smallBites,
} from "@/content/menu";
import { photos } from "@/content/photos";
import { primaryCta } from "@/content/site";

/** Map each menu section to a food photo for its vignette header. */
const sectionVisuals: Record<
  string,
  { photo: (typeof photos)[keyof typeof photos]; steam: boolean }
> = {
  appetizers: { photo: photos.shrimpCocktail, steam: false },
  entrees: { photo: photos.lambChops, steam: true },
  sides: { photo: photos.plating, steam: true },
};

export const metadata: Metadata = {
  title: "Catering Menu",
  description:
    "Appetizers, entrées, and sides from Taste of Ty's Kitchen, with vegetarian, vegan, and gluten-free friendly options.",
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="Catering menu"
        title={
          <>
            Elegant flavor. <em className="text-pinot">Vibrant</em> vibe.
          </>
        }
        intro="A global fusion catering experience that's dietary friendly by design. Use this menu as a starting point; your VIP consultation shapes the final selection."
        photo={photos.jerkedQuarters}
      >
        <Button asChild size="lg">
          <Link href={`${primaryCta.href}?service=catering`}>{primaryCta.label}</Link>
        </Button>
      </PageHero>

      {/* Corporate catalog callout */}
      <div className="border-b border-line bg-ink text-creme">
        <div className="container-site flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow text-gold mb-1">Corporate Catering</p>
            <p className="text-sm text-creme/75">Full pan-priced catalog for 10 to 100+ guests — breakfast through dinner, 7 cuisines.</p>
          </div>
          <Link
            href="/menu/corporate"
            className="shrink-0 rounded-[var(--radius-control)] border border-gold/50 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-gold transition-colors hover:bg-gold/10"
          >
            View catalog →
          </Link>
        </div>
      </div>

      <nav aria-label="Menu sections" className="sticky top-[116px] z-30 border-b border-line bg-creme/95 backdrop-blur">
        <ul className="container-site flex gap-6 overflow-x-auto py-3 text-xs font-bold uppercase tracking-[0.16em]">
          {[...menuSections.map((s) => ({ id: s.id, title: s.title })), { id: "packages", title: "Packages" }, { id: "small-bites", title: "Small Bites" }].map(
            (link) => (
              <li key={link.id} className="shrink-0">
                <a href={`#${link.id}`} className="text-smoke hover:text-pinot">
                  {link.title}
                </a>
              </li>
            ),
          )}
        </ul>
      </nav>

      {/* ── Visual menu grid ──────────────────────────────────────────────── */}
      <section className="container-site grid gap-14 py-20 sm:py-24 lg:grid-cols-3">
        {menuSections.map((section, index) => {
          const visual = sectionVisuals[section.id];
          return (
            <Reveal key={section.id} delay={index * 80}>
              <div id={section.id} className="scroll-mt-48">
                {/* Visual header: food vignette + section title */}
                <div className="mb-6 flex items-center gap-5">
                  {visual && (
                    <FoodVignette
                      src={visual.photo.src}
                      alt={visual.photo.alt}
                      size={96}
                      steam={visual.steam}
                    />
                  )}
                  <div>
                    <p className="eyebrow mb-1">{section.title}</p>
                    <div className="h-px w-12 bg-gold/50" />
                  </div>
                </div>

                <ul className="space-y-4">
                  {section.items.map((item) => (
                    <li key={item.name} className="menu-item-row group relative pl-4 transition-colors hover:bg-linen/60 rounded-sm py-1">
                      <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-gold/50 transition-colors group-hover:bg-gold" />
                      <p className="font-display text-xl">{item.name}</p>
                      {item.note ? <p className="text-sm italic text-smoke">{item.note}</p> : null}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </section>

      {/* ── Rotating logo divider ──────────────────────────────────────────── */}
      <Reveal>
        <div className="flex items-center justify-center gap-6 py-4">
          <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-gold/40" />
          <SpinMark size={64} />
          <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-gold/40" />
        </div>
      </Reveal>

      {/* ── Dietary / Service / Add-ons ────────────────────────────────────── */}
      <section className="bg-linen">
        <div className="container-site grid gap-12 py-16 md:grid-cols-3">
          {[
            { title: "Dietary options", items: dietaryOptions },
            { title: "Service styles", items: serviceStyles },
            { title: "Add-ons", items: menuAddOns },
          ].map((group, index) => (
            <Reveal key={group.title} delay={index * 80}>
              <p className="eyebrow mb-4">{group.title}</p>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-lg">
                    <Check className="size-4 text-pinot" aria-hidden /> {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Plated dinner visual strip ─────────────────────────────────────── */}
      <section className="overflow-hidden bg-ink py-16">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow text-gold mb-4 text-center">From our kitchen</p>
            <h2 className="text-center text-4xl text-creme sm:text-5xl mb-12">
              Plated with <em className="text-gold">intention.</em>
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[photos.lambChops, photos.salmon, photos.jerkChicken, photos.seafoodSalad].map(
              (photo, i) => (
                <Reveal key={photo.alt} delay={i * 100}>
                  <div className="group relative aspect-square overflow-hidden rounded-[var(--radius-media)]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 640px) 25vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      placeholder="blur"
                    />
                    {/* Warm vignette */}
                    <div className="absolute inset-0 shadow-[inset_0_0_30px_12px_rgba(20,17,16,0.4)]" />
                    {/* Steam overlay on hover */}
                    <SteamRise className="opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    {/* Gold border glow on hover */}
                    <div className="absolute inset-0 rounded-[var(--radius-media)] border border-gold/0 transition-all duration-500 group-hover:border-gold/40 group-hover:shadow-[0_0_16px_4px_rgba(204,168,110,0.15)]" />
                  </div>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── Packages ───────────────────────────────────────────────────────── */}
      <section id="packages" className="container-site scroll-mt-48 py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Packages"
            title="Choose a starting point."
            intro="Pricing is per person and depends on your menu, guest count, and service style. We'll walk through it in your consultation."
          />
        </Reveal>
        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {packages.map((pkg, index) => (
            <Reveal key={pkg.name} delay={index * 100}>
              <article
                className={`flex h-full flex-col rounded-[var(--radius-media)] p-8 ${
                  pkg.featured ? "bg-ink text-creme" : "border border-line bg-creme"
                }`}
              >
                {pkg.featured ? (
                  <p className="eyebrow mb-3 inline-flex items-center gap-2 text-gold">
                    <Star className="size-3.5 fill-gold" aria-hidden /> Most popular
                  </p>
                ) : (
                  <p className="eyebrow mb-3">Package</p>
                )}
                <h3 className={`text-4xl ${pkg.featured ? "text-creme" : ""}`}>{pkg.name}</h3>
                <ul className="mt-6 flex-1 space-y-2">
                  {pkg.includes.map((line) => (
                    <li key={line} className="flex items-center gap-3">
                      <Check className={`size-4 ${pkg.featured ? "text-gold" : "text-pinot"}`} aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={pkg.featured ? "primary" : "outline"}
                  className="mt-8 w-full"
                >
                  <Link href={`${primaryCta.href}?service=catering`}>Request pricing</Link>
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Small Bites ────────────────────────────────────────────────────── */}
      <section id="small-bites" className="scroll-mt-48 border-t border-line">
        <div className="container-site grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-4">Small bite tasting menu</p>
            <h2 className="text-4xl sm:text-5xl">
              Three flavorful bites. <em className="text-pinot">One</em> experience.
            </h2>
            <ol className="mt-10 space-y-6">
              {smallBites.map((bite, index) => (
                <li key={bite.name} className="flex gap-5">
                  <span className="font-display text-3xl italic text-pinot">{index + 1}</span>
                  <div>
                    <p className="font-display text-2xl">{bite.name}</p>
                    <p className="italic text-smoke">{bite.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              <div className="group relative aspect-[3/4] overflow-hidden rounded-[var(--radius-media)]">
                <Image
                  src={photos.crostini.src}
                  alt={photos.crostini.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <SteamRise className="opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              </div>
              <div className="group relative mt-10 aspect-[3/4] overflow-hidden rounded-[var(--radius-media)]">
                <Image
                  src={photos.pumpkinRoll.src}
                  alt={photos.pumpkinRoll.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
