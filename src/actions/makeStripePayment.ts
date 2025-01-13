"use server";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export async function makeStripePayment({
  title,
  price,
}: {
  title: string;
  price: number;
}) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const res = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: title,
          },
          unit_amount: price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  });
  if (res?.url) redirect(res.url);
  else return { success: false };
}
