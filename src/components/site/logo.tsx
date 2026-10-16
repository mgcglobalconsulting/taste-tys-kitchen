import Image from "next/image";
import Link from "next/link";

import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  tone?: "red" | "cream";
  className?: string;
};

/** Keyed from chef-ty-logo.PNG — see docs/BRAND.md "Logo on the light theme". */
export function Logo({ tone = "red", className }: LogoProps) {
  return (
    <Link href="/" className={cn("inline-block shrink-0", className)} aria-label={`${site.name} home`}>
      <Image
        src={tone === "red" ? "/brand/logo-red.png" : "/brand/logo-cream.png"}
        alt={site.name}
        width={1200}
        height={586}
        priority={tone === "red"}
        sizes="200px"
        className="h-auto w-full"
      />
    </Link>
  );
}
