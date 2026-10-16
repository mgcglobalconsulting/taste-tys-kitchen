import Image from "next/image";

import { cn } from "@/lib/utils";

const sparkles = [
  { top: "18%", left: "22%", delay: "0.4s", size: 14 },
  { top: "8%", left: "70%", delay: "1.6s", size: 18 },
  { top: "44%", left: "88%", delay: "2.6s", size: 12 },
  { top: "62%", left: "10%", delay: "3.4s", size: 16 },
  { top: "36%", left: "48%", delay: "4.4s", size: 10 },
];

/**
 * The official gold TOTK lockup with a glow, a light sweep clipped to the
 * artwork (CSS mask of the same PNG), and a few twinkles. See globals.css
 * ".shine-logo". All motion stops under prefers-reduced-motion.
 */
export function ShineLogo({ className }: { className?: string }) {
  return (
    <div className={cn("shine-logo relative mx-auto aspect-[959/1000]", className)}>
      <Image
        src="/brand/totk-logo-gold.png"
        alt="TOTK Catering Co. by Taste of Ty's Kitchen. Great food is waiting."
        fill
        priority
        sizes="(min-width: 640px) 340px, 240px"
        className="shine-logo-art object-contain"
      />
      <span className="shine-logo-sweep" aria-hidden />
      {sparkles.map((sparkle) => (
        <span
          key={`${sparkle.top}-${sparkle.left}`}
          className="shine-logo-sparkle"
          aria-hidden
          style={{
            top: sparkle.top,
            left: sparkle.left,
            width: sparkle.size,
            height: sparkle.size,
            animationDelay: sparkle.delay,
          }}
        />
      ))}
    </div>
  );
}
