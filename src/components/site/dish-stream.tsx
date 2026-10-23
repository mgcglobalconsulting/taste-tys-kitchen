"use client";

import Image from "next/image";

import { featuredDishes } from "@/content/corporate-menu";
import { photos } from "@/content/photos";

/** Tag badge colour by cuisine type */
const tagColour: Record<string, string> = {
  Jamaican: "bg-pinot/10 text-pinot",
  Brunch: "bg-gold/15 text-oxblood",
  Vegetarian: "bg-smoke/10 text-smoke",
  American: "bg-pinot/10 text-pinot",
  Mediterranean: "bg-gold/15 text-oxblood",
};

/**
 * Floating dish-highlight bubbles that rise against a large event photo.
 * Each card shows a real dish name, note, and half/full pan price from the catalog.
 * Bubbles rise continuously via CSS animation; all motion stops under prefers-reduced-motion.
 */
export function DishStream() {
  // Horizontal spread positions (%) for each bubble
  const positions = [6, 18, 36, 54, 68, 80, 42, 26];

  return (
    <section className="bg-linen overflow-hidden">
      <div className="container-site grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-2">

        {/* Photo side */}
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

        {/* Bubble stream side */}
        <div>
          <p className="eyebrow mb-4">Featured from the catalog</p>
          <h2 className="text-4xl sm:text-5xl mb-4">
            A world of flavor, <em className="text-pinot">ready to serve.</em>
          </h2>
          <p className="text-smoke mb-8 text-lg">
            International cuisine, comforting classics, and signatures from Chef Ty —
            all pan-priced for your guest count.
          </p>

          {/* The floating bubble arena */}
          <div className="dish-bubble-arena" aria-hidden>
            {featuredDishes.map((dish, i) => (
              <div
                key={dish.name}
                className="dish-bubble"
                style={{
                  left: `${positions[i % positions.length]}%`,
                  animationDelay: `${(i * 1.35).toFixed(2)}s`,
                  animationDuration: `${10 + (i % 3)}s`,
                }}
              >
                <div
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest mb-1 ${tagColour[dish.tag] ?? "bg-smoke/10 text-smoke"}`}
                >
                  {dish.tag}
                </div>
                <p className="font-display text-base leading-snug text-ink">{dish.name}</p>
                <p className="text-xs text-smoke italic mt-0.5">{dish.note}</p>
                <p className="text-xs font-bold text-pinot mt-1">
                  {dish.half} · {dish.full}
                </p>
              </div>
            ))}
          </div>

          {/* Static fallback grid shown under reduced-motion */}
          <ul className="dish-stream-static grid grid-cols-2 gap-3">
            {featuredDishes.slice(0, 6).map((dish) => (
              <li key={dish.name} className="rounded-[var(--radius-media)] border border-line bg-creme p-3">
                <p className="font-display text-sm leading-snug text-ink">{dish.name}</p>
                <p className="text-xs text-pinot font-bold mt-1">
                  {dish.half} · {dish.full}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
