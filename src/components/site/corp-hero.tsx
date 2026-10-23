"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ShineLogo } from "@/components/site/shine-logo";
import { primaryCta } from "@/content/site";

/**
 * Corporate menu hero — dark band with the gold TOTK logo surrounded by
 * two slowly orbiting rings. All motion stops under prefers-reduced-motion.
 */
export function CorpHero() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 sm:py-28 text-creme">
      {/* Subtle vignette grain overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E')]" aria-hidden />

      <div className="container-site flex flex-col items-center gap-10 text-center lg:flex-row lg:text-left lg:gap-20">

        {/* Orbital logo container */}
        <div className="corp-orbit-container shrink-0">
          {/* Ring 1 — inner, clockwise */}
          <div
            className="corp-orbit-track corp-orbit-track--cw"
            style={{ width: "76%", height: "76%", inset: "12%" }}
            aria-hidden
          >
            <span className="corp-orbit-dot" />
            <span className="corp-orbit-dot" style={{ top: "auto", bottom: "-4px" }} />
          </div>

          {/* Ring 2 — outer, counter-clockwise */}
          <div
            className="corp-orbit-track corp-orbit-track--ccw"
            style={{ width: "100%", height: "100%", inset: 0 }}
            aria-hidden
          >
            <span className="corp-orbit-dot corp-orbit-dot--sm" />
            <span
              className="corp-orbit-dot corp-orbit-dot--sm"
              style={{ top: "auto", bottom: "-3px", left: "calc(50% - 3px)" }}
            />
          </div>

          {/* Ring 3 — faint outermost pulse ring */}
          <div
            className="corp-orbit-ring-pulse"
            style={{ width: "116%", height: "116%", inset: "-8%" }}
            aria-hidden
          />

          {/* The logo itself */}
          <ShineLogo className="relative z-10 w-44 sm:w-56" />
        </div>

        {/* Text */}
        <div className="max-w-xl">
          <p className="eyebrow mb-4 text-gold">Corporate Catering</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-creme">
            Pan-priced for <em className="text-gold">every occasion.</em>
          </h1>
          <p className="mt-5 text-lg text-creme/75 leading-relaxed">
            From office breakfast to gala dinner — full catalog pricing for half and full pans,
            serving 10 to 100&nbsp;+ guests. Drop-off, buffet, or full-service, built around your occasion.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
            <Button asChild size="lg" variant="primary">
              <Link href={`${primaryCta.href}?service=corporate`}>{primaryCta.label}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-creme/30 text-creme hover:bg-creme/10">
              <a href="#menu-tabs">Browse the catalog</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
