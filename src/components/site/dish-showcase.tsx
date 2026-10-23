import Image from "next/image";

import { featuredDishes } from "@/content/corporate-menu";
import { photos } from "@/content/photos";

import styles from "./dish-showcase.module.css";

type Dish = (typeof featuredDishes)[number];

const tagStyle: Record<string, string> = {
  Jamaican:      "bg-pinot/10 text-pinot",
  Brunch:        "bg-gold/15 text-oxblood",
  Vegetarian:    "bg-smoke/10 text-smoke",
  American:      "bg-pinot/10 text-pinot",
  Mediterranean: "bg-gold/15 text-oxblood",
};

/* Duplicate so the loop is seamless — 50% translateX lands back on start */
const row1 = [...featuredDishes, ...featuredDishes];
const row2 = [...[...featuredDishes].reverse(), ...[...featuredDishes].reverse()];

function Card({ dish }: { dish: Dish }) {
  return (
    <div className={styles.card}>
      <span className={`${styles.tag} ${tagStyle[dish.tag] ?? "bg-smoke/10 text-smoke"}`}>
        {dish.tag}
      </span>
      <p className={styles.dishName}>{dish.name}</p>
      <p className={styles.dishNote}>{dish.note}</p>
      <p className={styles.dishPrice}>{dish.half} · {dish.full}</p>
    </div>
  );
}

/**
 * Replaces DishStream's scattered bubble layout with a dual-row
 * infinite marquee. Row 1 drifts left, row 2 drifts right.
 * Hover over either row to pause and read a card.
 */
export function DishShowcase() {
  return (
    <section className="bg-linen overflow-hidden">
      <div className="container-site grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-2">

        {/* ── Photo ────────────────────────────────────────────────────── */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-media)] lg:aspect-auto lg:h-[520px]">
          <Image
            src={photos.setupPrivate.src}
            alt={photos.setupPrivate.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="eyebrow mb-1 text-gold">Pan service</p>
            <p className="font-display text-2xl text-creme leading-tight">
              Half pan feeds 10–12 guests.<br />Full pan feeds 20–25.
            </p>
          </div>
        </div>

        {/* ── Showcase ─────────────────────────────────────────────────── */}
        <div>
          <p className="eyebrow mb-4">Featured from the catalog</p>
          <h2 className="text-4xl sm:text-5xl mb-4">
            A world of flavor, <em className="text-pinot">ready to serve.</em>
          </h2>
          <p className="text-smoke mb-8 text-lg">
            International cuisine, comforting classics, and signatures from Chef Ty —
            all pan-priced for your guest count.
          </p>

          {/* Gold dot divider */}
          <div className={styles.divider}>
            <div className={styles.dividerDot} />
          </div>

          {/* Dual-row marquee */}
          <div className={styles.marqueeWrap}>
            <div className={styles.marqueeOuter}>
              <div className={`${styles.track} ${styles.trackLeft}`}>
                {row1.map((dish, i) => (
                  <Card key={`r1-${i}`} dish={dish} />
                ))}
              </div>
            </div>

            <div className={styles.marqueeOuter}>
              <div className={`${styles.track} ${styles.trackRight}`}>
                {row2.map((dish, i) => (
                  <Card key={`r2-${i}`} dish={dish} />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
