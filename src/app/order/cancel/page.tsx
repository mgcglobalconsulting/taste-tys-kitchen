import type { Metadata } from "next";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Order Cancelled" };

export default function CancelPage() {
  return (
    <section className="bg-linen min-h-screen">
      <div className="container-site py-20 text-center">
        <div className="mx-auto max-w-md">
          <p className="eyebrow mb-3">Cancelled</p>
          <h1 className="mb-4 font-display text-4xl">No worries</h1>
          <p className="mb-10 text-lg text-smoke">
            Your order was not completed. Your cart has been saved — head back
            whenever you&apos;re ready.
          </p>
          <Button asChild variant="primary" size="lg">
            <a href="/order">Back to Order</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
