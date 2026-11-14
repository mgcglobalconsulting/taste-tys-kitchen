import { cn } from "@/lib/utils";

/**
 * Pure-CSS animated steam wisps. Place over a food image for atmosphere.
 * Three thin gradient lines drift upward and fade. All motion stops
 * under prefers-reduced-motion.
 */
export function SteamRise({ className }: { className?: string }) {
  return (
    <div
      className={cn("steam-rise pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <span className="steam-wisp steam-wisp--1" />
      <span className="steam-wisp steam-wisp--2" />
      <span className="steam-wisp steam-wisp--3" />
    </div>
  );
}
