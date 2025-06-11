"use server";

import { actionClient } from "@/lib/safe-action";
import { getCurrentUser } from "@/lib/session";
import Stripe from "stripe";

export const createStripeCheckout = actionClient.action(async () => {
  const session = await getCurrentUser();

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-05-28.basil",
  });

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    subscription_data: {
      metadata: {
        userId: session.id,
      },
    },
    line_items: [
      {
        price: process.env.STRIPE_PRICE_PLAN_INITIAL_ID,
        quantity: 1,
      },
    ],
  });

  return {
    sessionId: checkoutSession.id,
  };
});
