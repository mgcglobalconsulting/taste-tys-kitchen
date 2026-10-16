import { existsSync } from "node:fs";
import path from "node:path";

import { ArrowRight, CalendarCheck, ChefHat, MapPin, MessageSquareHeart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CtaBand } from "@/components/site/cta-band";
import { FindUs } from "@/components/site/find-us";
import { HeroSlideshow } from "@/components/site/hero-slideshow";
import { PromoVideo } from "@/components/site/promo-video";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { aboutCompany } from "@/content/about";
import { photos, type PhotoKey } from "@/content/photos";
import { services } from "@/content/services";
import { primaryCta, site } from "@/content/site";

/*
 * Home page. Section order follows the Ridgewells reference
 * (announcement → full-bleed hero → service tiles → region band → about →
 * marquee → process → film → menu → add-ons → social strip → booking CTA),
 * with Taste of Ty's Kitchen content from docs/CONTENT.md.
 */

const heroSlides = [photos.fineDining, photos.setupPrivate, photos.plating, photos.shrimpCocktail];

const processSteps = [
  {
    icon: MessageSquareHeart,
    title: "Tell us your vision",
    body: "Share your date, your guests, and the experience you have in mind.",
  },
  {
    icon: ChefHat,
    title: "Your VIP consultation",
    body: "We tailor the menu to your vision, dietary needs, and event goals.",
  },
  {
    icon: CalendarCheck,
    title: "Secure your date",
    body: "We handle the food, and any add-ons you choose, from setup to service.",
  },
];

const signatureDishes: { photo: PhotoKey; name: string }[] = [
  { photo: "jerkChicken", name: "Caribbean Jerk Chicken" },
  { photo: "salmon", name: "Pineapple Habanero Salmon" },
  { photo: "lambChops", name: "Lamb Chops" },
  { photo: "shrimpCocktail", name: "Shrimp Cocktail" },
];

// The film renders from motion/hero-loop; hide its section until the MP4 exists.
const hasFilm = existsSync(path.join(process.cwd(), "public/media/hero-loop.mp4"));

const socialStrip: PhotoKey[] = ["lambChops", "setup3", "crostini", "homeDining", "pumpkinRoll", "seafoodSalad"];

export default function HomePage() {
  return (
    <>
      {/* Announcement */}
      <div className="border-b border-line bg-linen">
        <p className="container-site flex flex-wrap items-center justify-center gap-x-4 gap-y-1 py-3 text-center text-sm">
          <span className="font-display text-base italic">Now booking. Secure your date for the season ahead.</span>
          <Link href="/menu" className="eyebrow inline-flex items-center gap-1 hover:text-oxblood">
            Explore the menu <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </p>
      </div>

      {/* Hero */}
      <section className="relative isolate flex min-h-[78svh] items-end overflow-hidden sm:min-h-[86svh] sm:items-center">
        <HeroSlideshow slides={heroSlides} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/25" aria-hidden />
        <div className="container-site relative py-16 text-center text-creme sm:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold sm:text-sm">
            Elegant flavor · Vibrant vibe · Dietary friendly
          </p>
          <h1 className="mx-auto mt-6 max-w-4xl text-[2.9rem] leading-[1.02] text-creme sm:text-7xl xl:text-[5.5rem]">
            Great food with <em className="text-creme">purpose.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-creme/85 sm:text-xl">
            {site.name} is a full-service mobile catering company with over 5 years of experience
            delivering elevated, globally inspired cuisine.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </Button>
            <Button asChild variant="outline-light" size="lg">
              <Link href="/menu">View the Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container-site py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Customized menus · VIP service · Memorable moments"
            title={
              <>
                One kitchen. <em className="text-pinot">Every</em> occasion.
              </>
            }
            intro="We specialize in catering, meal prep, daily meals, cooking classes, and personalized nutrition-based meal plans designed to fit each client's lifestyle."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 80} className={index === 0 ? "lg:row-span-2" : ""}>
              <Link
                href={`/services/${service.slug}`}
                className="group relative flex h-full min-h-80 flex-col justify-end overflow-hidden rounded-[var(--radius-media)] bg-ink"
              >
                <Image
                  src={photos[service.photo].src}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="relative p-7">
                  <h3 className="text-3xl text-creme">{service.name}</h3>
                  <p className="mt-2 max-w-sm text-creme/80">{service.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-creme">
                    View more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Region band */}
      <section className="bg-linen">
        <Reveal className="container-site flex flex-col items-center gap-4 py-14 text-center">
          <MapPin className="size-6 text-pinot" aria-hidden />
          <p className="eyebrow">Baltimore · Maryland</p>
          <p className="max-w-2xl font-display text-2xl sm:text-3xl">
            Full-service mobile catering, based in {site.base}.
          </p>
          <Button asChild variant="link">
            <Link href="/contact">
              Get in touch <ArrowRight aria-hidden />
            </Link>
          </Button>
        </Reveal>
      </section>

      {/* About */}
      <section>
        <div className="container-site grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-media)]">
              <Image
                src={photos.homeDining.src}
                alt={photos.homeDining.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden w-44 overflow-hidden rounded-[var(--radius-media)] border-4 border-creme shadow-lg sm:block lg:-right-10 lg:w-52">
              <Image
                src={photos.lambChops.src}
                alt={photos.lambChops.alt}
                placeholder="blur"
                sizes="208px"
                className="aspect-square object-cover"
              />
            </div>
          </Reveal>
          <Reveal>
            <p className="eyebrow mb-4">Our story</p>
            <h2 className="text-4xl sm:text-5xl">
              Food is meant to bring people <em className="text-pinot">together.</em>
            </h2>
            <p className="mt-6 text-lg text-smoke">{aboutCompany[1]}</p>
            <p className="mt-4 text-lg text-smoke">{aboutCompany[2]}</p>
            <Button asChild variant="outline" className="mt-8">
              <Link href="/about">View more</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Marquee */}
      <section aria-label={site.loveLanguage} className="overflow-hidden bg-ink py-5 text-creme">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {Array.from({ length: 8 }, (_, index) => (
            <span
              key={index}
              aria-hidden
              className="flex items-center gap-10 font-display text-2xl italic sm:text-3xl"
            >
              {site.loveLanguage}
              <span className="text-gold not-italic">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-linen">
        <div className="container-site py-20 sm:py-28">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="How it works"
              title="Every client gets the VIP treatment."
              intro="What sets us apart is a fully customized experience, and it starts with a conversation."
            />
          </Reveal>
          <ol className="mt-16 grid gap-10 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 120} className="relative text-center">
                <span className="mx-auto flex size-16 items-center justify-center rounded-full border border-pinot/30 bg-creme text-pinot">
                  <step.icon className="size-7" aria-hidden />
                </span>
                <p className="mt-6 font-display text-sm italic text-pinot">Step {index + 1}</p>
                <h3 className="mt-1 text-2xl">{step.title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-smoke">{step.body}</p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-14 text-center">
            <Button asChild size="lg">
              <Link href={primaryCta.href}>Start with a consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Promo film — rendered with HyperFrames (motion/hero-loop) */}
      {hasFilm ? (
      <section className="container-site py-20 sm:py-28">
        <Reveal>
          <PromoVideo
            src="/media/hero-loop.mp4"
            poster="/media/hero-loop-poster.jpg"
            label="A short film of Taste of Ty's Kitchen dishes and event setups, ending with Book a Consultation"
          />
        </Reveal>
      </section>
      ) : null}

      {/* Menu */}
      <section className="border-t border-line">
        <div className="container-site py-20 sm:py-28">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <SectionHeading
                eyebrow="Our catering menu"
                title={
                  <>
                    Bold flavors that <em className="text-pinot">tell a story.</em>
                  </>
                }
                intro="Appetizers, entrées, and sides with vegetarian, vegan, and gluten-free friendly options."
              />
            </Reveal>
            <Button asChild variant="outline">
              <Link href="/menu">Explore the menu</Link>
            </Button>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {signatureDishes.map((dish, index) => (
              <Reveal key={dish.name} delay={index * 80}>
                <figure>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-media)] bg-linen">
                    <Image
                      src={photos[dish.photo].src}
                      alt={photos[dish.photo].alt}
                      fill
                      placeholder="blur"
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition duration-700 hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-4 font-display text-xl">{dish.name}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="bg-ink text-creme">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-80 lg:min-h-[32rem]">
            <Image
              src={photos.setupPrivate.src}
              alt={photos.setupPrivate.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <Reveal className="flex flex-col justify-center px-4 py-16 sm:px-10 lg:px-16">
            <p className="eyebrow mb-4 text-gold">One-stop shop</p>
            <h2 className="text-4xl text-creme sm:text-5xl">Beyond the food.</h2>
            <p className="mt-6 max-w-lg text-lg text-creme/80">
              Add-on services including bartending, bakery creations, event planning, and full setup,
              for a seamless experience from start to finish.
            </p>
            <Button asChild variant="outline-light" className="mt-8 self-start">
              <Link href="/services/add-ons">Explore add-ons</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Giving back */}
      <section id="giving-back" className="container-site grid items-center gap-10 py-20 sm:py-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow mb-4">Community impact</p>
          <h2 className="text-4xl sm:text-5xl">
            Great food with <em className="text-pinot">purpose.</em>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-smoke">
            A portion of our proceeds goes toward feeding the homeless in our community every week.
            Giving back is not an add-on, it&apos;s part of who we are.
          </p>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-5">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-media)]">
            <Image
              src={photos.serving.src}
              alt={photos.serving.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* Social strip */}
      <section className="border-t border-line bg-linen">
        <div className="container-site py-16 sm:py-20">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="eyebrow">Follow us</p>
            <a
              href={site.social.instagram.url}
              rel="noopener"
              className="font-display text-3xl hover:text-pinot sm:text-4xl"
            >
              {site.social.instagram.handle}
            </a>
          </div>
          <ul className="mt-10 grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
            {socialStrip.map((key) => (
              <li key={key} className="relative aspect-square overflow-hidden rounded-[var(--radius-media)]">
                <Image
                  src={photos[key].src}
                  alt={photos[key].alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 16vw, 33vw"
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />

      <FindUs />
    </>
  );
}
