import { CheckCircle } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { notifyOwner } from "@/lib/notify";
import { getStripe } from "@/lib/stripe";
import { getSupabase } from "@/lib/supabase";

export const metadata: Metadata = { title: "Order Confirmed" };
export const dynamic = "force-dynamic";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  if (!session_id) notFound();

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items"],
  });

  if (session.payment_status !== "paid") notFound();

  // Record order and send notification — idempotent via unique stripe_session_id
  const supabase = getSupabase();
  if (supabase) {
    const lineItems =
      session.line_items?.data.map((li) => ({
        name: li.description,
        qty: li.quantity,
        amount_cents: li.amount_total,
      })) ?? [];

    const { error } = await supabase.from("orders").insert({
      stripe_session_id: session.id,
      customer_name: session.customer_details?.name,
      customer_email: session.customer_details?.email,
      amount_cents: session.amount_total,
      fulfillment: session.metadata?.fulfillment,
      line_items: lineItems,
    });

    // error.code === "23505" means duplicate (already notified) — skip
    if (!error) {
      const itemList = lineItems
        .map(
          (li) =>
            `${li.qty}x ${li.name} — $${((li.amount_cents ?? 0) / 100).toFixed(2)}`,
        )
        .join("\n");

      await notifyOwner(
        `New order — ${session.customer_details?.name ?? "Customer"} (${session.metadata?.fulfillment ?? "pickup"})`,
        {
          Customer: session.customer_details?.name ?? "-",
          Email: session.customer_details?.email ?? "-",
          Fulfillment: session.metadata?.fulfillment ?? "pickup",
          Items: itemList,
          Total: `$${((session.amount_total ?? 0) / 100).toFixed(2)}`,
        },
      );
    }
  }

  const firstName =
    session.customer_details?.name?.split(" ")[0] ?? "there";
  const isDelivery = session.metadata?.fulfillment === "delivery";

  return (
    <section className="bg-linen min-h-screen">
      <div className="container-site py-20">
        <div className="mx-auto max-w-xl text-center">
          <CheckCircle className="mx-auto mb-6 size-14 text-pinot" />
          <p className="eyebrow mb-3">Order Confirmed</p>
          <h1 className="mb-4 font-display text-4xl sm:text-5xl">
            Thank you, {firstName}!
          </h1>
          <p className="mb-10 text-lg text-smoke">
            Your order has been received. Chef Ty will be in touch to confirm
            details and arrange your{" "}
            {isDelivery ? "delivery" : "pickup"}.
          </p>

          {/* Order summary */}
          <div className="mb-10 rounded-xl border border-line bg-white p-6 text-left">
            <p className="mb-4 font-semibold">Order summary</p>
            <ul className="flex flex-col gap-2">
              {session.line_items?.data.map((item, i) => (
                <li key={i} className="flex justify-between text-sm text-smoke">
                  <span>
                    {item.quantity}× {item.description}
                  </span>
                  <span className="font-semibold">
                    ${((item.amount_total ?? 0) / 100).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between border-t border-line pt-4 font-bold">
              <span>Total paid</span>
              <span className="text-pinot">
                ${((session.amount_total ?? 0) / 100).toFixed(2)}
              </span>
            </div>
            <div className="mt-3 rounded-lg bg-linen px-3 py-2 text-xs text-smoke">
              Fulfillment: <span className="font-semibold capitalize">{session.metadata?.fulfillment ?? "pickup"}</span>
            </div>
          </div>

          <Button asChild variant="primary" size="lg">
            <a href="/">Back to Home</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
