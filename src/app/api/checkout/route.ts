import { NextResponse } from "next/server";

import type { CartItem } from "@/lib/cart";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const stripe = getStripe();
  const { items, fulfillment }: { items: CartItem[]; fulfillment: "pickup" | "delivery" } =
    await request.json();

  if (!items.length) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const baseUrl = `https://${new URL(request.url).host}`;

  const session = await stripe.checkout.sessions.create({
    line_items: items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.label ? `${item.name} — ${item.label}` : item.name,
          metadata: { category: item.category },
        },
        unit_amount: Math.round(item.unitPrice * 100),
      },
      quantity: item.quantity,
    })),
    metadata: { fulfillment },
    mode: "payment",
    success_url: `${baseUrl}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/order`,
  });

  return NextResponse.json({ url: session.url });
}
