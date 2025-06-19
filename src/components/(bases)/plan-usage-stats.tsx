"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { usePlanLimitations } from "@/hooks/use-plan-limitations";
import { Calendar, UserCheck, Users } from "lucide-react";

interface PlanUsageStatsProps {
  plan: "free" | "initial";
  currentCounts: {
    doctors: number;
    patients: number;
    appointments: number;
  };
}

export function PlanUsageStats({ plan, currentCounts }: PlanUsageStatsProps) {
  const limitations = usePlanLimitations(plan, currentCounts);

  const getUsagePercentage = (current: number, max: number) => {
    if (max === Infinity) return 0;
    return Math.min((current / max) * 100, 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 80) return "text-yellow-600";
    return "text-green-600";
  };

  if (plan === "initial") {
    return (
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-blue-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Badge className="bg-blue-600 text-white">Plano Essential</Badge>
            <span className="text-sm font-normal">Recursos ilimitados</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {currentCounts.doctors}
              </div>
              <div className="text-xs text-gray-600">Médicos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {currentCounts.patients}
              </div>
              <div className="text-xs text-gray-600">Pacientes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {currentCounts.appointments}
              </div>
              <div className="text-xs text-gray-600">Agendamentos</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="text-sm">Uso do Plano Gratuito</span>
          <Badge variant="outline">Free</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Médicos */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-blue-600" />
              <span>Médicos</span>
            </div>
            <span
              className={getUsageColor(
                getUsagePercentage(
                  currentCounts.doctors,
                  limitations.maxDoctors,
                ),
              )}
            >
              {currentCounts.doctors}/{limitations.maxDoctors}
            </span>
          </div>
          <Progress
            value={getUsagePercentage(
              currentCounts.doctors,
              limitations.maxDoctors,
            )}
            className="h-2"
          />
        </div>

        {/* Pacientes */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-600" />
              <span>Pacientes</span>
            </div>
            <span
              className={getUsageColor(
                getUsagePercentage(
                  currentCounts.patients,
                  limitations.maxPatients,
                ),
              )}
            >
              {currentCounts.patients}/{limitations.maxPatients}
            </span>
          </div>
          <Progress
            value={getUsagePercentage(
              currentCounts.patients,
              limitations.maxPatients,
            )}
            className="h-2"
          />
        </div>

        {/* Agendamentos */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-orange-600" />
              <span>Agendamentos</span>
            </div>
            <span
              className={getUsageColor(
                getUsagePercentage(
                  currentCounts.appointments,
                  limitations.maxAppointments,
                ),
              )}
            >
              {currentCounts.appointments}/{limitations.maxAppointments}
            </span>
          </div>
          <Progress
            value={getUsagePercentage(
              currentCounts.appointments,
              limitations.maxAppointments,
            )}
            className="h-2"
          />
        </div>
      </CardContent>
    </Card>
  );
}
