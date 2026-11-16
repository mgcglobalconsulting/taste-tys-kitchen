"use client";

import { cn } from "@/lib/utils";
import type { Section } from "./section-data";

interface SectionNavProps {
  sections: Section[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function SectionNav({ sections, activeId, onSelect }: SectionNavProps) {
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

      {/* Mobile — horizontal scrolling chips */}
      <nav
        className="lg:hidden"
        aria-label="Menu sections"
      >
        <div className="overflow-x-auto pb-1">
          <ul className="flex gap-2">
            {sections.map((s) => (
              <li key={s.id} className="shrink-0">
                <button
                  onClick={() => onSelect(s.id)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    activeId === s.id
                      ? "bg-pinot text-creme"
                      : "border border-line bg-white text-ink hover:border-pinot",
                  )}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
