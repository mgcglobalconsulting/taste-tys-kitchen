import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { dietaryOptions, serviceStyles } from "@/content/menu";
import { photos } from "@/content/photos";
import { getService, services } from "@/content/services";
import { primaryCta } from "@/content/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return { title: service.name, description: service.summary };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((item) => item.slug !== service.slug);

  return (
    <>
      <PageHero eyebrow="Services" title={service.name} intro={service.intro} photo={photos[service.photo]}>
        <Button asChild size="lg">
          <Link href={`${primaryCta.href}?service=${service.slug}`}>{primaryCta.label}</Link>
        </Button>
        {service.slug === "catering" ? (
          <Button asChild variant="outline" size="lg">
            <Link href="/menu">View the Menu</Link>
          </Button>
        ) : null}
      </PageHero>

      <section className="container-site py-20 sm:py-24">
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {service.highlights.map((highlight, index) => (
            <Reveal key={highlight.title} delay={index * 80} className="border-t-2 border-pinot pt-6">
              <h2 className="text-2xl">{highlight.title}</h2>
              <p className="mt-3 text-smoke">{highlight.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {service.slug === "catering" ? (
        <section className="bg-linen">
          <div className="container-site grid gap-12 py-16 sm:py-20 md:grid-cols-2">
            <Reveal>
              <p className="eyebrow mb-4">Service styles</p>
              <ul className="space-y-3">
                {serviceStyles.map((style) => (
                  <li key={style} className="flex items-center gap-3 font-display text-2xl">
                    <Check className="size-5 text-pinot" aria-hidden /> {style}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <p className="eyebrow mb-4">Dietary options</p>
              <ul className="space-y-3">
                {dietaryOptions.map((option) => (
                  <li key={option} className="flex items-center gap-3 font-display text-2xl">
                    <Check className="size-5 text-pinot" aria-hidden /> {option}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="container-site border-t border-line py-16 sm:py-20">
        <p className="eyebrow mb-8">More from Ty&apos;s Kitchen</p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/services/${item.slug}`}
                className="group flex h-full items-center justify-between gap-4 rounded-[var(--radius-media)] border border-line p-5 transition-colors hover:border-pinot"
              >
                <span className="font-display text-xl">{item.name}</span>
                <ArrowRight
                  className="size-4 shrink-0 text-pinot transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}
