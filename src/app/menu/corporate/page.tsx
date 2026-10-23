import type { Metadata } from "next";
import Link from "next/link";

import { CorpHero } from "@/components/site/corp-hero";
import { CateringJourney } from "@/components/site/catering-journey";
import { CtaBand } from "@/components/site/cta-band";
import { CuisineTabs } from "@/components/site/cuisine-tabs";
import { DishShowcase } from "@/components/site/dish-showcase";
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

      {/* Dish marquee showcase */}
      <DishShowcase />

      {/* How it works */}
      <CateringJourney />

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
