"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Minus, Plus } from "lucide-react";

import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import type { PanCategory, PanItem } from "@/content/corporate-menu";
import { parsePrice, toItemId } from "./section-data";

interface ItemRowProps {
  item: PanItem;
  category: PanCategory;
  sectionId: string;
  sectionLabel: string;
}

/**
 * One dish, with one tappable "size pill" per price option.
 * Name on top, options side by side underneath — everything fits a 320px
 * phone without horizontal scroll. Tap a pill to add; once in the cart the
 * pill turns into a − qty + stepper.
 */
export function ItemRow({ item, category, sectionId, sectionLabel }: ItemRowProps) {
  const { items } = useCart();

  const options = [
    {
      id: toItemId(sectionId, item.name, category.colA),
      label: category.colA,
      price: parsePrice(item.a),
    },
    ...(item.b
      ? [
          {
            id: toItemId(sectionId, item.name, category.colB ?? "full"),
            label: category.colB ?? "Full",
            price: parsePrice(item.b),
          },
        ]
      : []),
  ];

  const inCart = options.some((o) => items.some((i) => i.id === o.id));

  return (
    <div
      className={cn(
        "rounded-[var(--radius-control)] border bg-white p-3 shadow-sm transition-colors sm:p-4",
        inCart ? "border-pinot/40" : "border-transparent",
      )}
    >
      <p className="mb-2.5 font-semibold leading-snug text-ink">{item.name}</p>

      <div className={cn("grid gap-2", options.length > 1 ? "grid-cols-2" : "grid-cols-1")}>
        {options.map((o) => (
          <SizePill
            key={o.id}
            id={o.id}
            name={item.name}
            label={o.label}
            price={o.price}
            category={sectionLabel}
          />
        ))}
      </div>
    </div>
  );
}

interface SizePillProps {
  id: string;
  name: string;
  label: string;
  price: number;
  category: string;
}

function SizePill({ id, name, label, price, category }: SizePillProps) {
  const { addItem, setQty, items } = useCart();
  const reduce = useReducedMotion();
  const qty = items.find((i) => i.id === id)?.quantity ?? 0;

  const add = () => addItem({ id, name, label, unitPrice: price, category });

  if (qty === 0) {
    return (
      <motion.button
        type="button"
        onClick={add}
        whileTap={reduce ? undefined : { scale: 0.96 }}
        aria-label={`Add ${name}, ${label}, $${price}`}
        className="flex min-h-12 min-w-0 items-center justify-between gap-2 rounded-[var(--radius-control)] border border-line bg-linen px-3 py-2 text-left transition-colors hover:border-pinot active:bg-creme"
      >
        <span className="min-w-0">
          <span className="block truncate text-xs text-smoke">{label}</span>
          <span className="block font-bold tabular-nums text-pinot">${price}</span>
        </span>
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-pinot text-creme">
          <Plus className="size-4" aria-hidden />
        </span>
      </motion.button>
    );
  }

  return (
    <div className="flex min-h-12 min-w-0 items-center justify-between gap-1 rounded-[var(--radius-control)] border border-pinot bg-pinot px-1.5 py-1.5 text-creme">
      <button
        type="button"
        onClick={() => setQty(id, qty - 1)}
        aria-label={`Remove one ${name}, ${label}`}
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-creme/15 transition-colors hover:bg-creme/25"
      >
        <Minus className="size-4" aria-hidden />
      </button>

      <span className="min-w-0 text-center leading-tight">
        <span className="block truncate text-[11px] text-creme/80">{label}</span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={qty}
            className="block text-lg font-bold tabular-nums"
            initial={reduce ? undefined : { y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? undefined : { y: 8, opacity: 0 }}
            transition={{ duration: 0.18 }}
            aria-live="polite"
          >
            {qty}
          </motion.span>
        </AnimatePresence>
      </span>

      <button
        type="button"
        onClick={add}
        aria-label={`Add another ${name}, ${label}`}
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-creme text-pinot transition-colors hover:bg-white"
      >
        <Plus className="size-4" aria-hidden />
      </button>
    </div>
  );
}
