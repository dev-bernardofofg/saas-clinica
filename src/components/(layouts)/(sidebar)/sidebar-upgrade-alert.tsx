"use client";

import { Card, CardContent } from "@/components/ui/card";
import { usePlanLimitations } from "@/hooks/use-plan-limitations";
import { Crown, Zap } from "lucide-react";

interface SidebarUpgradeAlertProps {
  plan: "free" | "initial";
  currentCounts: {
    doctors: number;
    patients: number;
    appointments: number;
  };
}

export function SidebarUpgradeAlert({
  plan,
  currentCounts,
}: SidebarUpgradeAlertProps) {
  const limitations = usePlanLimitations(plan, currentCounts);

  if (plan === "initial" || !limitations.showUpgradeAlert) {
    return null;
  }

  return (
    <Card className="mx-4 mb-4 border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-blue-50">
      <CardContent className="p-3">
        <div className="flex items-start gap-2">
          <div className="flex-shrink-0 rounded-full bg-purple-100 p-1">
            <Crown className="h-3 w-3 text-purple-600" />
          </div>

          <div className="flex-1">
            <h4 className="text-xs font-medium text-purple-800">
              Upgrade Recomendado
            </h4>

            <p className="mt-1 text-xs text-purple-700">
              Você está próximo dos limites do plano gratuito
            </p>

            <div className="mt-2">
              <a
                href="/plains"
                className="inline-flex items-center gap-1 rounded bg-gradient-to-r from-purple-600 to-blue-600 px-2 py-1 text-xs font-medium text-white hover:from-purple-700 hover:to-blue-700"
              >
                <Zap className="h-3 w-3" />
                Fazer Upgrade
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
