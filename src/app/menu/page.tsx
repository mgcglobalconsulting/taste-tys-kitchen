import { Check, Star } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
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

      <section className="container-site grid gap-14 py-20 sm:py-24 lg:grid-cols-3">
        {menuSections.map((section, index) => (
          <Reveal key={section.id} delay={index * 80}>
            <div id={section.id} className="scroll-mt-48">
              <h2 className="border-b border-ink pb-4 text-4xl">{section.title}</h2>
              <ul className="mt-6 space-y-4">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <p className="font-display text-xl">{item.name}</p>
                    {item.note ? <p className="text-sm italic text-smoke">{item.note}</p> : null}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </section>

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
              <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-media)]">
                <Image
                  src={photos.crostini.src}
                  alt={photos.crostini.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-[var(--radius-media)]">
                <Image
                  src={photos.pumpkinRoll.src}
                  alt={photos.pumpkinRoll.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
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
