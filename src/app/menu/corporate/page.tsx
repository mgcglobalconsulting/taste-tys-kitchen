import type { Metadata } from "next";
import Link from "next/link";

import { CorpHero } from "@/components/site/corp-hero";
import { CtaBand } from "@/components/site/cta-band";
import { CuisineTabs } from "@/components/site/cuisine-tabs";
import { DishStream } from "@/components/site/dish-stream";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: "Corporate Catering Menu | TOTK Catering Co.",
  description:
    "Full pan-priced catering catalog from TOTK Catering Co. by Taste of Ty's Kitchen. Breakfast, brunch, dinner by cuisine, desserts, and beverages for 10 to 100+ guests.",
};

const stats = [
  { value: "Half pan", detail: "Serves 10–12 guests" },
  { value: "Full pan", detail: "Serves 20–25 guests" },
  { value: "7 cuisines", detail: "Jamaican · Italian · American · Chinese · Mexican · Mediterranean · Vegetarian" },
  { value: "3 service styles", detail: "Drop-off · Buffet · Full service" },
];

export default function CorporateMenuPage() {
  return (
    <>
      <CorpHero />

      {/* Stats strip */}
      <section className="border-b border-line bg-linen/60">
        <div className="container-site grid grid-cols-2 gap-px lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.value} delay={i * 60}>
              <div className="py-8 pr-4">
                <p className="font-display text-2xl sm:text-3xl text-ink">{stat.value}</p>
                <p className="mt-1 text-sm text-smoke">{stat.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Floating dish showcase */}
      <DishStream />

      {/* How it works */}
      <section className="container-site py-20 sm:py-24">
        <Reveal>
          <p className="eyebrow mb-4">How it works</p>
          <h2 className="text-4xl sm:text-5xl max-w-xl">
            From catalog to <em className="text-pinot">your table.</em>
          </h2>
        </Reveal>
        <ol className="mt-12 grid gap-8 sm:grid-cols-3">
          {[
            {
              n: "01",
              title: "Browse & select",
              body: "Use the catalog below to find dishes that fit your occasion. Mix cuisines, combine breakfast and dinner, or build around a theme.",
            },
            {
              n: "02",
              title: "Request your quote",
              body: "Share your event date, venue, guest count, and selections. Chef Ty builds a written quote with confirmed pricing, quantities, and service details.",
            },
            {
              n: "03",
              title: "Enjoy the event",
              body: "Choose drop-off, buffet, or full-service. Chef Ty handles the cooking — you enjoy a seamless, beautifully presented meal.",
            },
          ].map((step, i) => (
            <Reveal key={step.n} as="li" delay={i * 100}>
              <span className="font-display text-5xl italic text-line">{step.n}</span>
              <h3 className="mt-3 font-display text-2xl">{step.title}</h3>
              <p className="mt-2 text-smoke">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* The main catalog tabs */}
      <div className="border-t border-line bg-creme">
        <CuisineTabs />
      </div>

      {/* Breadcrumb back to main menu */}
      <div className="border-t border-line bg-linen py-6">
        <div className="container-site text-sm text-smoke">
          <Link href="/menu" className="hover:text-pinot transition-colors">
            ← Back to full menu
          </Link>
        </div>
      </div>

      <CtaBand />
    </>
  );
}
