"use client";

import { UpgradePlanAlert } from "@/components/(bases)/upgrade-plan-alert";
import { usePlanLimitations } from "@/hooks/use-plan-limitations";
import { ReactNode } from "react";

interface PlanRestrictionWrapperProps {
  plan: "free" | "initial";
  currentCounts: {
    doctors: number;
    patients: number;
    appointments: number;
  };
  restrictionType: "doctors" | "patients" | "appointments";
  children: ReactNode;
  showWarning?: boolean;
}

export function PlanRestrictionWrapper({
  plan,
  currentCounts,
  restrictionType,
  children,
  showWarning = true,
}: PlanRestrictionWrapperProps) {
  const limitations = usePlanLimitations(plan, currentCounts);

  const getRestrictionInfo = () => {
    switch (restrictionType) {
      case "doctors":
        return {
          canCreate: limitations.canCreateDoctors,
          current: currentCounts.doctors,
          max: limitations.maxDoctors,
          warningMessage: "Limite de médicos próximo",
          limitMessage: "Limite de médicos atingido",
          description: `Você pode cadastrar até ${limitations.maxDoctors} médico no plano gratuito.`,
        };
      case "patients":
        return {
          canCreate: limitations.canCreatePatients,
          current: currentCounts.patients,
          max: limitations.maxPatients,
          warningMessage: "Limite de pacientes próximo",
          limitMessage: "Limite de pacientes atingido",
          description: `Você pode cadastrar até ${limitations.maxPatients} pacientes no plano gratuito.`,
        };
      case "appointments":
        return {
          canCreate: limitations.canCreateAppointments,
          current: currentCounts.appointments,
          max: limitations.maxAppointments,
          warningMessage: "Limite de agendamentos próximo",
          limitMessage: "Limite de agendamentos atingido",
          description: `Você pode criar até ${limitations.maxAppointments} agendamentos no plano gratuito.`,
        };
    }
  };

  const restrictionInfo = getRestrictionInfo();
  const isAtLimit = !restrictionInfo.canCreate;
  const isNearLimit =
    plan === "free" && restrictionInfo.current >= restrictionInfo.max * 0.8;

  if (plan === "initial") {
    return <>{children}</>;
  }

  return (
    <div className="space-y-4">
      {showWarning && isNearLimit && !isAtLimit && (
        <UpgradePlanAlert
          type="warning"
          message={restrictionInfo.warningMessage}
          description={`${restrictionInfo.current}/${restrictionInfo.max} - ${restrictionInfo.description}`}
        />
      )}

      {isAtLimit && (
        <UpgradePlanAlert
          type="limit-reached"
          message={restrictionInfo.limitMessage}
          description={restrictionInfo.description}
        />
      )}

      <div>{children}</div>
    </div>
  );
}
