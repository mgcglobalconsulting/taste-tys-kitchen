import Image, { type StaticImageData } from "next/image";

import { cn } from "@/lib/utils";

import { SteamRise } from "./steam-rise";

/**
 * Small circular food photo (80–160px) with a warm vignette overlay,
 * subtle gold ring, and animated steam on hover. Used alongside menu
 * section headings to give each category a visual anchor.
 */
export function FoodVignette({
  src,
  alt,
  size = 120,
  steam = false,
  className,
}: {
  src: StaticImageData;
  alt: string;
  size?: number;
  /** Show animated steam wisps on hover. */
  steam?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("food-vignette group relative shrink-0", className)}
      style={{ width: size, height: size }}
    >
      {/* Gold ring */}
      <div className="food-vignette-ring absolute inset-0 rounded-full" />

      {/* Photo */}
      <div className="relative h-full w-full overflow-hidden rounded-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${size}px`}
          className="food-vignette-img object-cover"
          placeholder="blur"
        />
        {/* Warm vignette overlay */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_8px_rgba(20,17,16,0.25)]" />
      </div>

      {/* Steam (hover-triggered via CSS) */}
      {steam && <SteamRise className="opacity-0 transition-opacity duration-500 group-hover:opacity-100" />}
    </div>
  );
}
