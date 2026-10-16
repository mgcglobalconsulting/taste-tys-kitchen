import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { aboutCompany } from "@/content/about";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Taste of Ty's Kitchen is a full-service mobile catering company with over 5 years of experience delivering elevated, globally inspired cuisine.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={
          <>
            Elevated, globally inspired, and <em className="text-pinot">made for you.</em>
          </>
        }
        intro="Great food with purpose. Elevated experiences, every time."
        photo={photos.homeDining}
      />

      <section className="container-site grid gap-12 py-20 sm:py-28 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow mb-4">About the company</p>
          <h2 className="text-4xl sm:text-5xl">A fully customized experience.</h2>
        </Reveal>
        <Reveal delay={100} className="space-y-5 text-lg text-smoke lg:col-span-7">
          {aboutCompany.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </Reveal>
      </section>

      {/* About the owner — copy pending from the owner (docs/CONTENT.md [MISSING]). */}
      <section className="bg-linen">
        <div className="container-site grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-media)]">
              <Image
                src={photos.candid.src}
                alt={photos.candid.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow mb-4">Meet the chef</p>
            <h2 className="text-4xl sm:text-5xl">Chef Ty</h2>
            <p
              className="mt-6 rounded-[var(--radius-media)] border border-dashed border-pinot/40 bg-creme p-5 text-smoke"
              data-placeholder="about-owner"
            >
              [Owner bio coming soon. Waiting on Chef Ty&apos;s paragraph and portrait.]
            </p>
          </Reveal>
        </div>
      </section>

      <section id="giving-back" className="scroll-mt-32 bg-ink text-creme">
        <div className="container-site grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow mb-4 text-gold">Giving back</p>
            <h2 className="text-4xl text-creme sm:text-5xl">
              Food is a tool for <em className="text-gold">change.</em>
            </h2>
            <p className="mt-6 max-w-xl text-lg text-creme/80">
              At our core, we believe food is meant to bring people together, and give back. A
              portion of our proceeds goes toward feeding the homeless in our community every
              week.
            </p>
            <Button asChild variant="outline-light" className="mt-8">
              <Link href="/about/mission">Our mission &amp; values</Link>
            </Button>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-media)]">
              <Image
                src={photos.team.src}
                alt={photos.team.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
