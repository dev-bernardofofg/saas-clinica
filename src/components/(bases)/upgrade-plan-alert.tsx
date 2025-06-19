"use client";

import { BaseButton } from "@/components/(bases)/base-button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Crown, Zap } from "lucide-react";
import Link from "next/link";

interface UpgradePlanAlertProps {
  type: "warning" | "limit-reached";
  message: string;
  description?: string;
  showUpgradeButton?: boolean;
}

export function UpgradePlanAlert({
  type,
  message,
  description,
  showUpgradeButton = true,
}: UpgradePlanAlertProps) {
  return (
    <Card
      className={`border-l-4 ${
        type === "warning"
          ? "border-l-yellow-500 bg-yellow-50"
          : "border-l-red-500 bg-red-50"
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div
            className={`flex-shrink-0 rounded-full p-1 ${
              type === "warning"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {type === "warning" ? (
              <AlertTriangle className="h-4 w-4" />
            ) : (
              <Crown className="h-4 w-4" />
            )}
          </div>

          <div className="flex-1">
            <h4
              className={`font-medium ${
                type === "warning" ? "text-yellow-800" : "text-red-800"
              }`}
            >
              {message}
            </h4>

            {description && (
              <p
                className={`mt-1 text-sm ${
                  type === "warning" ? "text-yellow-700" : "text-red-700"
                }`}
              >
                {description}
              </p>
            )}

            {showUpgradeButton && (
              <div className="mt-3 flex items-center gap-2">
                <Link href="/plains">
                  <BaseButton
                    size="sm"
                    variant="default"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Zap className="mr-1 h-3 w-3" />
                    Fazer Upgrade
                  </BaseButton>
                </Link>

                <span className="text-xs text-gray-500">
                  Desbloqueie recursos ilimitados
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
