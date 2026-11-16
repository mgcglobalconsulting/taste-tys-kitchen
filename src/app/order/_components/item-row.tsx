"use client";

import { motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
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

export function ItemRow({ item, category, sectionId, sectionLabel }: ItemRowProps) {
  const { addItem, items } = useCart();
  const reduce = useReducedMotion();

  const halfId = toItemId(sectionId, item.name, category.colA);
  const fullId = item.b ? toItemId(sectionId, item.name, category.colB ?? "full") : null;

  const halfQty = items.find((i) => i.id === halfId)?.quantity ?? 0;
  const fullQty = fullId ? (items.find((i) => i.id === fullId)?.quantity ?? 0) : 0;

  const halfPrice = parsePrice(item.a);
  const fullPrice = item.b ? parsePrice(item.b) : 0;

  const inCart = halfQty > 0 || fullQty > 0;

  return (
    <motion.div
      className={cn(
        "rounded-[var(--radius-control)] border-l-2 bg-white px-4 py-3 shadow-sm transition-colors",
        inCart ? "border-l-pinot" : "border-l-transparent",
      )}
      animate={
        reduce
          ? undefined
          : { borderLeftColor: inCart ? "#b01010" : "transparent" }
      }
      transition={{ duration: 0.25 }}
    >
      <p className="mb-2 font-semibold leading-snug text-ink">{item.name}</p>

      <div className="flex flex-col gap-1.5">
        {/* Option A */}
        <div className="flex items-center gap-3">
          <span className="min-w-0 flex-1 text-sm text-smoke">{category.colA}</span>
          <span className="font-bold tabular-nums text-pinot">${halfPrice}</span>
          {halfQty > 0 && (
            <motion.span
              key={halfQty}
              className="text-xs font-bold text-pinot"
              initial={reduce ? undefined : { y: -6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              ×{halfQty}
            </motion.span>
          )}
          <Button
            size="sm"
            variant="primary"
            className="shrink-0"
            onClick={() =>
              addItem({
                id: halfId,
                name: item.name,
                label: category.colA,
                unitPrice: halfPrice,
                category: sectionLabel,
              })
            }
          >
            <Plus />
            Add
          </Button>
        </div>

        {/* Option B */}
        {item.b && fullId && (
          <div className="flex items-center gap-3">
            <span className="min-w-0 flex-1 text-sm text-smoke">{category.colB}</span>
            <span className="font-bold tabular-nums text-pinot">${fullPrice}</span>
            {fullQty > 0 && (
              <motion.span
                key={fullQty}
                className="text-xs font-bold text-pinot"
                initial={reduce ? undefined : { y: -6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                ×{fullQty}
              </motion.span>
            )}
            <Button
              size="sm"
              variant="outline"
              className="shrink-0"
              onClick={() =>
                addItem({
                  id: fullId,
                  name: item.name,
                  label: category.colB ?? "Full",
                  unitPrice: fullPrice,
                  category: sectionLabel,
                })
              }
            >
              <Plus />
              Add
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
