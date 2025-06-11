"use client";

import { createStripeCheckout } from "@/actions/create-stripe-checkout";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { loadStripe } from "@stripe/stripe-js";
import { CheckCircle2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { BaseButton } from "../base-button";

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  active?: boolean;
  hasSubscription?: boolean;
  onUpgrade?: () => void;
}

export default function PricingCard({
  title = "Essential",
  description = "Para profissionais autônomos ou pequenas clínicas",
  price = "R$59",
  period = "/ mês",
  features = [
    "Cadastro de até 3 médicos",
    "Agendamentos ilimitados",
    "Métricas básicas",
    "Cadastro de pacientes",
    "Confirmação manual",
    "Suporte via e-mail",
  ],
  active = false,
  hasSubscription = false,
  onUpgrade,
}: PricingCardProps) {
  const { execute, isExecuting } = useAction(createStripeCheckout, {
    onSuccess: async ({ data }) => {
      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set");
      }

      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      );

      if (!stripe) {
        throw new Error("Stripe is not loaded");
      }

      if (!data?.sessionId) {
        throw new Error("Session ID is not set");
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: data?.sessionId,
      });
    },
  });

  const handleUpgrade = () => {
    execute();
  };

  return (
    <Card className="relative w-full max-w-sm border border-gray-200 bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          {active && (
            <Badge className="bg-emerald-500 px-2 py-1 text-xs text-white hover:bg-emerald-600">
              Atual
            </Badge>
          )}
        </div>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      </CardHeader>

      <Separator />

      <CardContent className="pb-6">
        <div className="mb-6">
          <span className="text-3xl font-bold text-gray-900">{price}</span>
          <span className="ml-1 text-gray-600">{period}</span>
        </div>

        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500">
                <CheckCircle2 className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <Separator />

      <CardFooter>
        <BaseButton
          variant={active ? "outline" : "default"}
          className="w-full"
          onClick={active ? handleUpgrade : undefined}
          disabled={isExecuting}
        >
          {active
            ? "Gerenciar Assinatura"
            : hasSubscription
              ? "Gerenciar Assinatura"
              : "Realizar Assinatura"}
        </BaseButton>
      </CardFooter>
    </Card>
  );
}
