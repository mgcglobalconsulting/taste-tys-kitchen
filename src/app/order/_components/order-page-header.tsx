"use client";

import { ShoppingBag } from "lucide-react";

interface OrderPageHeaderProps {
  count: number;
  total: number;
  mounted: boolean;
  onCartOpen: () => void;
}

export function OrderPageHeader({ count, total, mounted, onCartOpen }: OrderPageHeaderProps) {
  return (
    <header className="relative overflow-hidden bg-ink">
      {/* Ambient video — very low opacity, decorative only */}
      <video
        className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover opacity-[0.12] lg:block"
        src="/videos/hero-loop.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 container-site flex items-center justify-between gap-4 py-4 lg:py-5">
        <div>
          <p className="eyebrow mb-1 text-gold/80">Online Order</p>
          <h1 className="font-display text-2xl text-creme sm:text-4xl">Build Your Order</h1>
        </div>

        {/* Mobile cart button */}
        <button
          className="relative flex shrink-0 items-center gap-2 rounded-full border border-creme/20 bg-creme/10 px-4 py-2 text-sm font-semibold text-creme backdrop-blur-sm transition-colors hover:bg-creme/20 lg:hidden"
          onClick={onCartOpen}
          aria-label="Open cart"
        >
          <ShoppingBag className="size-5" />
          <span>Cart</span>
          {mounted && count > 0 && (
            <span className="hidden font-bold tabular-nums text-gold sm:inline">${total.toFixed(2)}</span>
          )}
          {mounted && count > 0 && (
            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-pinot text-[10px] font-bold text-creme">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
