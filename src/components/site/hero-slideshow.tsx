import Image from "next/image";

import type { Photo } from "@/content/photos";

/**
 * Full-bleed crossfading photo hero (CSS-only, see .hero-slide in globals.css).
 * Expects exactly four photos; the cycle timing assumes it.
 */
export function HeroSlideshow({ slides }: { slides: Photo[] }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink" aria-hidden>
      {slides.map((slide, index) => (
        <div key={slide.alt} className="hero-slide absolute inset-0" style={{ animationDelay: `${index * 6 - 2}s` }}>
          <Image
            src={slide.src}
            alt=""
            fill
            priority={index === 0}
            placeholder="blur"
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
