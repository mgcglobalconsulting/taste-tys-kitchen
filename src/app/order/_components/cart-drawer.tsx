"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { CartPanel } from "./cart-panel";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className="relative max-h-[82dvh] overflow-y-auto rounded-t-2xl bg-ink px-6 pb-8 pt-5"
            initial={reduce ? undefined : { y: "100%" }}
            animate={{ y: 0 }}
            exit={reduce ? undefined : { y: "100%" }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 40,
              duration: reduce ? 0 : undefined,
            }}
          >
            {/* Drag handle */}
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-creme/20" />

            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-creme">Your Order</h2>
              <button
                onClick={onClose}
                className="text-sm text-creme/50 underline-offset-2 hover:text-creme hover:underline"
              >
                Close
              </button>
            </div>

            <CartPanel />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
