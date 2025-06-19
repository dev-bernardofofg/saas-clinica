import { useMemo } from "react";

export type PlanLimitations = {
  maxDoctors: number;
  maxPatients: number;
  maxAppointments: number;
  canCreateDoctors: boolean;
  canCreatePatients: boolean;
  canCreateAppointments: boolean;
  showUpgradeAlert: boolean;
};

export const PLAN_LIMITS = {
  free: {
    maxDoctors: 1,
    maxPatients: 50,
    maxAppointments: 100,
  },
  initial: {
    maxDoctors: Infinity,
    maxPatients: Infinity,
    maxAppointments: Infinity,
  },
} as const;

export function usePlanLimitations(
  plan: "free" | "initial",
  currentCounts: {
    doctors: number;
    patients: number;
    appointments: number;
  },
): PlanLimitations {
  return useMemo(() => {
    const limits = PLAN_LIMITS[plan];

    const canCreateDoctors = currentCounts.doctors < limits.maxDoctors;
    const canCreatePatients = currentCounts.patients < limits.maxPatients;
    const canCreateAppointments =
      currentCounts.appointments < limits.maxAppointments;

    // Mostrar alerta de upgrade se estiver no plano free e próximo dos limites
    const showUpgradeAlert =
      plan === "free" &&
      (currentCounts.doctors >= limits.maxDoctors ||
        currentCounts.patients >= limits.maxPatients * 0.8 || // 80% do limite
        currentCounts.appointments >= limits.maxAppointments * 0.8); // 80% do limite

    return {
      maxDoctors: limits.maxDoctors,
      maxPatients: limits.maxPatients,
      maxAppointments: limits.maxAppointments,
      canCreateDoctors,
      canCreatePatients,
      canCreateAppointments,
      showUpgradeAlert,
    };
  }, [plan, currentCounts]);
}
