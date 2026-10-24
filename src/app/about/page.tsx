import { Phone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { aboutCompany, aboutOwner } from "@/content/about";
import { photos } from "@/content/photos";
import { site } from "@/content/site";

import styles from "./owner-photo.module.css";

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

      <section id="meet-chef-ty" aria-labelledby="chef-ty-heading" className="scroll-mt-32 bg-linen">
        <div className="container-site grid items-start gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-16">
          <Reveal className={`${styles.sidebar} lg:col-span-4`}>
            <div className={styles.frame}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[14px]">
                <Image
                  src={photos.ownerBio.src}
                  alt={photos.ownerBio.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1280px) 325px, (min-width: 1024px) calc(30vw - 32px), (min-width: 688px) 608px, (min-width: 640px) calc(100vw - 80px), calc(100vw - 64px)"
                  className="object-contain"
                />
              </div>
            </div>
            <section aria-labelledby="owner-contact-heading" className="mt-8 border-t border-pinot/20 pt-7 text-center">
              <h3 id="owner-contact-heading" className="text-3xl sm:text-4xl lg:text-3xl">
                WE answer!
                <span className="mt-2 block text-2xl text-pinot italic">When YOU call...</span>
              </h3>
              <Button asChild variant="ink" className="mt-6 rounded-full px-7">
                <a href={site.contact.phoneHref} aria-label={`Call Chef Ty at ${site.contact.phoneDisplay}`}>
                  <Phone aria-hidden="true" />
                  {site.contact.phoneDisplay}
                </a>
              </Button>
              <div className={`${styles.socialGroup} mt-7 flex flex-col items-center gap-3`}>
                <p className={`${styles.followLabel} text-sm text-smoke`} data-text="Follow us:">Follow us:</p>
                <div className="flex justify-center gap-4">
                  <a
                    href={site.social.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Taste of Ty’s Kitchen on Instagram (opens in a new tab)"
                    className={styles.socialLink}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="size-5" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                  <a
                    href={site.social.facebook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Taste of Ty’s Kitchen on Facebook (opens in a new tab)"
                    className={styles.socialLink}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
                      <path d="M13.5 22v-9h3l.5-3.5h-3.5V7.25c0-1 .3-1.75 1.75-1.75H17V2.3c-.3 0-1.4-.15-2.65-.15-2.65 0-4.35 1.6-4.35 4.55v2.8H7V13h3v9h3.5Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </section>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-8">
            <p className="eyebrow mb-4">Meet the chef</p>
            <h2 id="chef-ty-heading" className="text-5xl sm:text-6xl">{aboutOwner.name}</h2>
            <p className="mt-4 text-sm tracking-wide text-smoke">
              {aboutOwner.fullName} <span aria-hidden="true">·</span> {aboutOwner.role}
            </p>

            <figure className="my-10 border-y border-pinot/20 py-8 sm:my-12 sm:py-10">
              <blockquote className="max-w-xl font-display text-4xl leading-[1.2] tracking-tight text-pinot italic sm:text-5xl">
                <p>“{aboutOwner.quote}”</p>
              </blockquote>
              <figcaption className="mt-5 text-sm text-smoke">
                — {aboutOwner.name}, {aboutOwner.role}
              </figcaption>
            </figure>

            <div className="max-w-[65ch] space-y-6 text-base leading-[1.85] text-smoke sm:text-lg">
              {aboutOwner.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
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
