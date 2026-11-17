"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Section } from "./section-data";

interface SectionNavProps {
  sections: Section[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function SectionNav({ sections, activeId, onSelect }: SectionNavProps) {
  const stripRef = useRef<HTMLDivElement>(null);

  // Keep the active chip centred in the mobile strip — scrolls the strip only,
  // never the page.
  useEffect(() => {
    const strip = stripRef.current;
    const chip = strip?.querySelector<HTMLElement>(`[data-section="${activeId}"]`);
    if (!strip || !chip) return;
    const left = chip.offsetLeft - strip.clientWidth / 2 + chip.clientWidth / 2;
    strip.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [activeId]);

  return (
    <>
      {/* Desktop — vertical rail */}
      <nav className="hidden lg:block" aria-label="Menu sections">
        <ul className="flex flex-col gap-1">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => onSelect(s.id)}
                className={cn(
                  "w-full rounded-[var(--radius-control)] px-4 py-2.5 text-left text-sm font-semibold transition-colors",
                  activeId === s.id
                    ? "bg-pinot text-creme"
                    : "text-smoke hover:bg-line/60 hover:text-ink",
                )}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile — horizontal scrolling chips (the strip scrolls, the page never does) */}
      <nav className="relative min-w-0 lg:hidden" aria-label="Menu sections">
        <div
          ref={stripRef}
          className="relative snap-x overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <ul className="flex w-max gap-2 pr-6">
            {sections.map((s) => (
              <li key={s.id} className="snap-start">
                <button
                  type="button"
                  data-section={s.id}
                  onClick={() => onSelect(s.id)}
                  aria-current={activeId === s.id ? "true" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors",
                    activeId === s.id
                      ? "bg-pinot text-creme shadow-sm"
                      : "border border-line bg-white text-ink hover:border-pinot",
                  )}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Right-edge fade hints there are more sections */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-linen to-transparent"
        />
      </nav>
    </>
  );
}
