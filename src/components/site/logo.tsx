import Image from "next/image";
import Link from "next/link";

import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  /**
   * "mark": the TOTK emblem on its black ground, for light surfaces (header).
   * "gold": the full gold lockup keyed to transparency, for dark surfaces.
   */
  variant?: "mark" | "gold";
  className?: string;
};

/** Official TOTK Catering Co. logo — see docs/BRAND.md "Official logo". */
export function Logo({ variant = "mark", className }: LogoProps) {
  return (
    <Link href="/" className={cn("inline-block shrink-0", className)} aria-label={`${site.name} home`}>
      {variant === "mark" ? (
        <Image
          src="/brand/totk-mark.jpg"
          alt="TOTK Catering Co. by Taste of Ty's Kitchen"
          width={640}
          height={470}
          priority
          sizes="120px"
          className="h-auto w-full rounded-[var(--radius-media)] shadow-[0_6px_18px_-10px_rgba(20,17,16,0.7)]"
        />
      ) : (
        <Image
          src="/brand/totk-logo-gold.png"
          alt="TOTK Catering Co. by Taste of Ty's Kitchen"
          width={959}
          height={1000}
          sizes="240px"
          className="h-auto w-full"
        />
      )}
    </Link>
  );
}
