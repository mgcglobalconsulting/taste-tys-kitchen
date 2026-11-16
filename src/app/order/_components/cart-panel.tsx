"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";

export function CartPanel() {
  const { items, fulfillment, setFulfillment, removeItem, setQty, total, clear } = useCart();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const reduce = useReducedMotion();

  async function handleCheckout() {
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items, fulfillment }),
        });
        const data = (await res.json()) as { url?: string; error?: string };
        if (data.url) {
          window.location.href = data.url;
        } else {
          setError(data.error ?? "Something went wrong. Please try again.");
        }
      } catch {
        setError("Could not connect. Please try again.");
      }
    });
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <ShoppingBag className="size-10 opacity-20 text-creme" />
        <p className="text-sm text-creme/60">Your cart is empty.</p>
        <p className="text-xs text-creme/40">Add items from the menu.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Items */}
      <ul className="flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.li
              key={item.id}
              layout
              initial={reduce ? undefined : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={reduce ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="rounded-[var(--radius-control)] border border-creme/10 bg-creme/5 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-tight text-creme">{item.name}</p>
                    <p className="text-xs text-creme/50">{item.label}</p>
                    <p className="mt-0.5 text-xs font-bold text-gold">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="shrink-0 text-creme/40 transition-colors hover:text-pinot"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => setQty(item.id, item.quantity - 1)}
                    className="flex size-7 items-center justify-center rounded border border-creme/15 text-creme/60 hover:border-creme/40 hover:text-creme"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="size-3" />
                  </button>
                  <motion.span
                    key={item.quantity}
                    className="w-6 text-center text-sm font-bold text-creme"
                    initial={reduce ? undefined : { y: -6, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.18 }}
                  >
                    {item.quantity}
                  </motion.span>
                  <button
                    onClick={() => setQty(item.id, item.quantity + 1)}
                    className="flex size-7 items-center justify-center rounded border border-creme/15 text-creme/60 hover:border-creme/40 hover:text-creme"
                    aria-label="Increase quantity"
                  >
                    <Plus className="size-3" />
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Fulfillment */}
      <div>
        <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-creme/50">
          Fulfillment
        </label>
        <select
          value={fulfillment}
          onChange={(e) => setFulfillment(e.target.value as "pickup" | "delivery")}
          className="w-full rounded-[var(--radius-control)] border border-creme/15 bg-creme/5 px-3 py-2 text-sm text-creme focus:outline-none focus:ring-1 focus:ring-gold/60"
        >
          <option value="pickup">Pickup</option>
          <option value="delivery">Delivery</option>
        </select>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between border-t border-creme/10 pt-3">
        <span className="text-sm font-semibold text-creme/70">Subtotal</span>
        <span className="font-display text-xl font-bold text-gold">${total.toFixed(2)}</span>
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={() => void handleCheckout()}
        disabled={pending}
      >
        {pending ? "Redirecting…" : "Checkout"}
      </Button>

      <button
        onClick={clear}
        className="text-center text-xs text-creme/30 underline-offset-2 hover:text-creme/60 hover:underline"
      >
        Clear cart
      </button>
    </div>
  );
}
