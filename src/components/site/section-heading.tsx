import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow mb-4", tone === "dark" && "text-gold")}>{eyebrow}</p>
      ) : null}
      <h2 className={cn("text-4xl sm:text-5xl", tone === "dark" ? "text-creme" : "text-ink")}>
        {title}
      </h2>
      {intro ? (
        <p className={cn("mt-5 text-lg", tone === "dark" ? "text-creme/80" : "text-smoke")}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}
