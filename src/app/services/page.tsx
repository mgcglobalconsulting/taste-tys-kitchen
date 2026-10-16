import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { photos } from "@/content/photos";
import { services } from "@/content/services";
import { primaryCta } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Catering, meal prep, daily meals, cooking classes, nutrition-based meal plans, and add-on services from Taste of Ty's Kitchen.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            A seamless, <em className="text-pinot">one-stop</em> experience.
          </>
        }
        intro="We specialize in catering, meal prep, daily meals, cooking classes, and personalized nutrition-based meal plans designed to fit each client's lifestyle."
        photo={photos.smallBites}
      >
        <Button asChild size="lg">
          <Link href={primaryCta.href}>{primaryCta.label}</Link>
        </Button>
      </PageHero>

      <section className="container-site divide-y divide-line py-10 sm:py-16">
        {services.map((service, index) => (
          <Reveal key={service.slug}>
            <article className="grid items-center gap-8 py-12 md:grid-cols-12 md:gap-12">
              <div
                className={`relative aspect-[4/3] overflow-hidden rounded-[var(--radius-media)] md:col-span-5 ${index % 2 ? "md:order-2" : ""}`}
              >
                <Image
                  src={photos[service.photo].src}
                  alt={photos[service.photo].alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="md:col-span-7">
                <p className="font-display text-sm italic text-pinot">0{index + 1}</p>
                <h2 className="mt-2 text-4xl">{service.name}</h2>
                <p className="mt-4 max-w-xl text-lg text-smoke">{service.summary}</p>
                <Button asChild variant="link" className="mt-6">
                  <Link href={`/services/${service.slug}`}>
                    Learn more <ArrowRight aria-hidden />
                  </Link>
                </Button>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <CtaBand />
    </>
  );
}
