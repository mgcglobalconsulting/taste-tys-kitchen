"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

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

  const current = sections.find((s) => s.id === activeSection) ?? sections[0];
  const photo = sectionPhotos[current.id];
  const flavor = sectionFlavors[current.id] ?? "";

  function handleSectionSelect(id: string) {
    setActiveSection(id);
    setCartOpen(false);
  }

  return (
    <div className="min-h-screen bg-linen">
      {/* ── Dark header with ambient video ── */}
      <OrderPageHeader
        count={count}
        total={total}
        mounted={mounted}
        onCartOpen={() => setCartOpen(true)}
      />

      {/* ── Main layout ── */}
      <div className="container-site py-8">
        <div className="grid gap-8 lg:grid-cols-12">

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
          <main className="lg:col-span-7">
            {/* Mobile section chips */}
            <div className="mb-5 lg:hidden">
              <SectionNav
                sections={sections}
                activeId={activeSection}
                onSelect={handleSectionSelect}
              />
            </div>

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
                <div className="flex flex-col gap-7">
                  {current.categories.map((cat) => (
                    <div key={cat.id}>
                      <div className="mb-3 flex items-baseline gap-3">
                        <h3 className="font-display text-lg font-semibold text-ink">
                          {cat.title}
                        </h3>
                        <div className="flex-1 border-t border-line" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-smoke">
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
    </div>
  );
}
