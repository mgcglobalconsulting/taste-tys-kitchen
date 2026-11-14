import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Slow 3D rotating TOTK mark with a gold shimmer pulse.
 * Used as a decorative section divider on the menu page.
 * Rotation stops under prefers-reduced-motion; the static mark remains.
 */
export function SpinMark({
  size = 80,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("spin-mark mx-auto", className)}
      style={{ width: size, height: size, perspective: 600 }}
      aria-hidden
    >
      <div className="spin-mark-inner" style={{ width: size, height: size }}>
        <Image
          src="/brand/totk-mark.jpg"
          alt=""
          width={size * 2}
          height={size * 2}
          sizes={`${size}px`}
          className="h-full w-full rounded-full object-cover"
        />
      </div>
    </div>
  );
}
