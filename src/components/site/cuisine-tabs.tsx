"use client";

import { useState } from "react";

import {
  menuTabs,
  eveningCuisines,
  eveningCategories,
  type PanCategory,
  type EveningCuisine,
} from "@/content/corporate-menu";
import { primaryCta } from "@/content/site";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// ─── Pan pricing table ────────────────────────────────────────────────────────

function PanTable({ category }: { category: PanCategory }) {
  return (
    <div className="mt-4 mb-6">
      <h3 className="font-display text-2xl sm:text-3xl mb-1">{category.title}</h3>
      <div className="overflow-x-auto rounded-[var(--radius-media)] border border-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-linen">
              <th className="px-4 py-3 text-left font-bold uppercase tracking-widest text-[11px] text-smoke w-full">
                Dish
              </th>
              <th className="px-4 py-3 text-right font-bold uppercase tracking-widest text-[11px] text-smoke whitespace-nowrap">
                {category.colA}
              </th>
              {category.colB && (
                <th className="px-4 py-3 text-right font-bold uppercase tracking-widest text-[11px] text-smoke whitespace-nowrap">
                  {category.colB}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {category.items.map((item, i) => (
              <tr
                key={item.name}
                className={`pan-row border-b border-line last:border-0 ${i % 2 === 0 ? "bg-creme" : "bg-linen/40"}`}
              >
                <td className="px-4 py-3 text-ink">{item.name}</td>
                <td className="px-4 py-3 text-right font-bold text-pinot whitespace-nowrap">{item.a}</td>
                {category.colB && (
                  <td className="px-4 py-3 text-right font-bold text-pinot whitespace-nowrap">
                    {item.b ?? "—"}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {category.note && (
        <p className="mt-2 text-xs italic text-smoke leading-relaxed">{category.note}</p>
      )}
    </div>
  );
}

// ─── Evening panel — cuisine sub-picker ───────────────────────────────────────

function EveningPanel() {
  const [cuisine, setCuisine] = useState<EveningCuisine>("Jamaican");

  return (
    <div className="tab-panel-active">
      <p className="text-smoke mb-6 text-lg">
        Pan-priced dinner selections spanning seven cuisines. Mix and match across menus —
        Chef Ty can coordinate a full multi-cuisine buffet.
      </p>

      {/* Cuisine sub-nav */}
      <div className="mb-8 flex flex-wrap gap-2">
        {eveningCuisines.map((c) => (
          <button
            key={c}
            onClick={() => setCuisine(c)}
            className={`rounded-full border px-4 py-1.5 text-sm font-bold transition-colors ${
              cuisine === c
                ? "border-pinot bg-pinot text-creme"
                : "border-line bg-creme text-smoke hover:border-pinot hover:text-pinot"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Cuisine panel */}
      <div key={cuisine} className="tab-panel-active">
        {eveningCategories[cuisine].map((cat) => (
          <PanTable key={cat.id} category={cat} />
        ))}
      </div>

      <p className="text-xs italic text-smoke mt-4 border-t border-line pt-4">
        Prices are per half / full pan. Portion needs vary by dish and menu — confirm quantities with Chef Ty.
        Delivery, staffing, rentals, and taxes are quoted separately.
      </p>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const ALL_TABS = [...menuTabs.map((t) => ({ id: t.id, label: t.label })), { id: "evening", label: "Evening" }];

export function CuisineTabs() {
  const [activeTab, setActiveTab] = useState("breakfast");

  const currentMenuTab = menuTabs.find((t) => t.id === activeTab);

  return (
    <section id="menu-tabs" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-site">
        <div className="mb-10">
          <p className="eyebrow mb-3">Full catalog</p>
          <h2 className="text-4xl sm:text-5xl">
            Every menu. <em className="text-pinot">Every occasion.</em>
          </h2>
          <p className="mt-4 text-smoke text-lg max-w-2xl">
            Browse by meal period. All pan pricing is from the current catalog — your written quote confirms
            quantities and current pricing.
          </p>
        </div>

        {/* Tab bar */}
        <div className="sticky top-[72px] z-20 -mx-4 sm:-mx-6 lg:-mx-10 mb-8 border-b border-line bg-creme/95 backdrop-blur px-4 sm:px-6 lg:px-10">
          <div className="flex gap-1 overflow-x-auto py-1">
            {ALL_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative shrink-0 rounded-sm px-5 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
                  activeTab === tab.id
                    ? "text-pinot after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-pinot"
                    : "text-smoke hover:text-ink"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Panel */}
        <div>
          {activeTab === "evening" ? (
            <EveningPanel />
          ) : currentMenuTab ? (
            <div key={activeTab} className="tab-panel-active">
              <p className="text-smoke mb-6 text-lg max-w-2xl">{currentMenuTab.intro}</p>

              {currentMenuTab.categories.map((cat) => (
                <PanTable key={cat.id} category={cat} />
              ))}

              {/* Live station callout */}
              {currentMenuTab.liveStation && (
                <div className="mt-8 rounded-[var(--radius-media)] border border-gold/40 bg-ink p-6 text-creme">
                  <p className="eyebrow mb-2 text-gold">{currentMenuTab.liveStation.title}</p>
                  <p className="font-bold text-gold mb-3">{currentMenuTab.liveStation.priceLabel}</p>
                  <ul className="space-y-1">
                    {currentMenuTab.liveStation.details.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-creme/80">
                        <span className="mt-1 size-1 shrink-0 rounded-full bg-gold" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Custom note for beverages */}
              {currentMenuTab.customNote && (
                <div className="mt-6 rounded-[var(--radius-media)] border border-line bg-linen p-5">
                  <p className="text-sm italic text-smoke">{currentMenuTab.customNote}</p>
                </div>
              )}

              <p className="text-xs italic text-smoke mt-6 border-t border-line pt-4">
                Listed prices are from the current catalog. The final written quote confirms current pricing,
                quantities, and service costs.
              </p>
            </div>
          ) : null}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex flex-col items-center gap-4 rounded-[var(--radius-media)] bg-ink p-10 text-center text-creme">
          <p className="eyebrow text-gold">Ready to plan?</p>
          <h3 className="font-display text-3xl sm:text-4xl text-creme">
            Tell Chef Ty about your gathering.
          </h3>
          <p className="text-creme/70 max-w-lg">
            Event date, venue, guest count, cuisine preferences, and any dietary needs —
            your written quote brings it all together.
          </p>
          <Button asChild size="lg" variant="primary" className="mt-2">
            <Link href={`${primaryCta.href}?service=corporate`}>{primaryCta.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
