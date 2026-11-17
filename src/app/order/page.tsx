"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { useRef, useState } from "react";

import { useCart } from "@/lib/cart";
import { CartDrawer } from "./_components/cart-drawer";
import { CartPanel } from "./_components/cart-panel";
import { ItemRow } from "./_components/item-row";
import { OrderPageHeader } from "./_components/order-page-header";
import { SectionBanner } from "./_components/section-banner";
import { SectionNav } from "./_components/section-nav";
import { sections, sectionFlavors, sectionPhotos } from "./_components/section-data";

export default function OrderPage() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [cartOpen, setCartOpen] = useState(false);
  const { count, total, mounted } = useCart();
  const reduce = useReducedMotion();
  const menuTopRef = useRef<HTMLDivElement>(null);

  const current = sections.find((s) => s.id === activeSection) ?? sections[0];
  const photo = sectionPhotos[current.id];
  const flavor = sectionFlavors[current.id] ?? "";

  function handleSectionSelect(id: string) {
    setActiveSection(id);
    setCartOpen(false);
    // If the reader is deep in a long section, bring them back to the top of
    // the new one instead of leaving them mid-page.
    const top = menuTopRef.current;
    if (top && top.getBoundingClientRect().top < 0) {
      top.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-linen">
      {/* ── Dark header with ambient video ── */}
      <OrderPageHeader
        count={count}
        total={total}
        mounted={mounted}
        onCartOpen={() => setCartOpen(true)}
      />

      {/* ── Main layout ── */}
      <div className="container-site pb-28 pt-4 lg:py-8">
        {/* grid-cols-1 = minmax(0,1fr): stops wide children (the chip strip)
            from stretching the column past the phone screen. */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

          {/* ── Left: nav rail (desktop) ── */}
          <aside className="hidden lg:col-span-2 lg:block">
            <div className="sticky top-6">
              <SectionNav
                sections={sections}
                activeId={activeSection}
                onSelect={handleSectionSelect}
              />
            </div>
          </aside>

          {/* ── Center: menu items ── */}
          <main className="min-w-0 lg:col-span-7">
            {/* Mobile section chips — sticky under the site header (h-9 + h-20) */}
            <div className="sticky top-[7.25rem] z-30 -mx-4 mb-4 border-b border-line/70 bg-linen/95 px-4 py-2.5 backdrop-blur supports-[backdrop-filter]:bg-linen/85 sm:-mx-6 sm:px-6 lg:hidden">
              <SectionNav
                sections={sections}
                activeId={activeSection}
                onSelect={handleSectionSelect}
              />
            </div>

            <div ref={menuTopRef} className="scroll-mt-[11rem] lg:scroll-mt-8" />

            {/* Animated section area */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={reduce ? undefined : { opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -12 }}
                transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Section photo banner */}
                {photo && (
                  <SectionBanner
                    id={current.id}
                    label={current.label}
                    flavor={flavor}
                    photo={photo}
                  />
                )}

                {/* Categories + items */}
                <div className="flex flex-col gap-6 sm:gap-7">
                  {current.categories.map((cat) => (
                    <div key={cat.id}>
                      <div className="mb-3 flex items-baseline gap-3">
                        <h3 className="font-display text-lg font-semibold text-ink">
                          {cat.title}
                        </h3>
                        <div className="flex-1 border-t border-line" />
                        <span className="hidden text-xs font-semibold uppercase tracking-widest text-smoke sm:inline">
                          {cat.colA}{cat.colB ? ` / ${cat.colB}` : ""}
                        </span>
                      </div>

                      {cat.note && (
                        <p className="mb-3 rounded-[var(--radius-control)] bg-creme px-3 py-2 text-xs text-smoke">
                          {cat.note}
                        </p>
                      )}

                      <div className="flex flex-col gap-2">
                        {cat.items.map((item) => (
                          <ItemRow
                            key={item.name}
                            item={item}
                            category={cat}
                            sectionId={activeSection}
                            sectionLabel={current.label}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </main>

          {/* ── Right: dark cart sidebar (desktop) ── */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-6 rounded-[var(--radius-media)] bg-ink p-6">
              <h2 className="mb-4 font-display text-xl font-semibold text-creme">Your Order</h2>
              <CartPanel />
            </div>
          </aside>
        </div>
      </div>

      {/* ── Mobile cart drawer ── */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* ── Mobile sticky "View order" bar ── */}
      <AnimatePresence>
        {mounted && count > 0 && !cartOpen && (
          <motion.div
            className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 lg:hidden"
            initial={reduce ? undefined : { y: "120%" }}
            animate={{ y: 0 }}
            exit={reduce ? undefined : { y: "120%" }}
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
          >
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="flex w-full items-center gap-3 rounded-full bg-pinot px-5 py-3.5 text-creme shadow-lg shadow-ink/25 transition-colors active:bg-ink"
            >
              <span className="relative">
                <ShoppingBag className="size-5" aria-hidden />
                <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-ink">
                  {count}
                </span>
              </span>
              <span className="flex-1 text-left text-sm font-bold uppercase tracking-[0.12em]">
                View order
              </span>
              <span className="font-bold tabular-nums">${total.toFixed(2)}</span>
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
