"use client";

import { useEffect, useRef } from "react";

type PromoVideoProps = {
  src: string;
  poster: string;
  label: string;
};

/**
 * Muted, looping promo film (rendered with HyperFrames from motion/hero-loop).
 * Stays on the poster frame for visitors who prefer reduced motion.
 */
export function PromoVideo({ src, poster, label }: PromoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (query.matches) {
        video.pause();
      } else {
        void video.play().catch(() => undefined);
      }
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <video
      ref={ref}
      className="aspect-video w-full rounded-[var(--radius-media)] bg-linen object-cover"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    />
  );
}
