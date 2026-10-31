"use client";

/**
 * TestimonialsStrip — full-width dark section with an auto-advancing
 * testimonial carousel. Uses CSS keyframe animations (testimonial-card-enter
 * in globals.css) for smooth enter transitions.
 *
 * Auto-advances every 6 s; pauses on hover or keyboard focus.
 * Fully respects prefers-reduced-motion.
 *
 * ⚠️  Content: testimonials in src/content/testimonials.ts are PLACEHOLDER.
 * Owner must replace them with real client reviews before launch.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { testimonials } from "@/content/testimonials";
import { cn } from "@/lib/utils";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const INTERVAL_MS = 6_000;

/** Star icon — inline SVG keeps this component self-contained. */
function Star({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export function TestimonialsStrip() {
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0); // increment to retrigger CSS enter animation
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const count = testimonials.length;

  const go = useCallback(
    (index: number) => {
      const next = ((index % count) + count) % count;
      setActive(next);
      setTick((t) => t + 1);
    },
    [count],
  );

  /* Auto-advance */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % count);
      setTick((t) => t + 1);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  /* Pause while any element inside has keyboard focus */
  const onFocusIn = () => setPaused(true);
  const onFocusOut = (e: React.FocusEvent) => {
    if (!sectionRef.current?.contains(e.relatedTarget as Node)) {
      setPaused(false);
    }
  };

  const item = testimonials[active]!;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-ink py-20 sm:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={onFocusIn}
      onBlur={onFocusOut}
    >
      {/* Decorative oversized background quote mark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 select-none font-display text-[28rem] leading-[0.8] text-gold/[0.035]"
      >
        &#8220;
      </span>

      {/* Fine horizontal rules — ornamental */}
      <span aria-hidden className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <span aria-hidden className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container-site relative z-10">
        {/* Section heading */}
        <Reveal>
          <SectionHeading
            align="center"
            tone="dark"
            eyebrow="What clients say"
            title={
              <span id="testimonials-heading">
                A reputation built on{" "}
                <em className="text-gold">every plate.</em>
              </span>
            }
          />
        </Reveal>

        {/* Carousel card */}
        <div
          className="mx-auto mt-16 max-w-2xl text-center"
          role="region"
          aria-label="Client testimonials carousel"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* key=tick forces React to remount, which restarts the CSS animation */}
          <div key={tick} className="testimonial-card-enter">
            {/* Stars */}
            <div
              className="mb-8 flex justify-center gap-1.5"
              aria-label="5 out of 5 stars"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5 fill-gold text-gold" />
              ))}
            </div>

            {/* Quote body */}
            <blockquote>
              <p className="font-display text-xl italic leading-relaxed text-creme/85 sm:text-2xl">
                &ldquo;{item.body}&rdquo;
              </p>
            </blockquote>

            {/* Author */}
            <div className="mt-10 flex flex-col items-center gap-3">
              {/* Initials badge */}
              <span
                aria-hidden
                className="flex size-12 items-center justify-center rounded-full border border-pinot/30 bg-gradient-to-br from-pinot/25 to-pinot/10 font-sans text-sm font-bold text-creme"
              >
                {item.initials}
              </span>
              <div>
                <p className="font-bold text-creme">{item.author}</p>
                <p className="mt-0.5 font-sans text-xs uppercase tracking-[0.15em] text-creme/45">
                  {item.occasion}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation row */}
        <div className="mt-12 flex items-center justify-center gap-5">
          {/* Prev */}
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Previous testimonial"
            className="flex size-10 items-center justify-center rounded-full border border-creme/15 text-creme/40 transition-colors hover:border-gold/50 hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/60"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>

          {/* Dot indicators */}
          <div className="flex gap-2" role="group" aria-label="Testimonial navigation">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`View testimonial ${i + 1} of ${count}`}
                aria-pressed={i === active}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === active
                    ? "w-8 bg-gold"
                    : "w-1.5 bg-creme/20 hover:bg-creme/40",
                )}
              />
            ))}
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Next testimonial"
            className="flex size-10 items-center justify-center rounded-full border border-creme/15 text-creme/40 transition-colors hover:border-gold/50 hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/60"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>

        {/* Subtle bottom note — visible to developers, not site visitors */}
        {process.env.NODE_ENV === "development" && (
          <p className="mt-8 text-center text-xs text-creme/20">
            ⚠ Placeholder testimonials — owner must supply real reviews before launch
          </p>
        )}
      </div>
    </section>
  );
}
