import { db } from "@/db";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import { eq } from "drizzle-orm";

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

export async function checkPlanRestrictions(
  restrictionType: "doctors" | "patients" | "appointments",
): Promise<{ allowed: boolean; current: number; max: number }> {
  const user = await getCurrentUser();
  const limits = PLAN_LIMITS[user.plan];

  if (!user.clinic?.id) {
    throw new Error("Clinic not found");
  }

  let current = 0;

  switch (restrictionType) {
    case "doctors":
      const doctors = await db.query.doctorsTable.findMany({
        where: eq(doctorsTable.clinicId, user.clinic.id),
      });
      current = doctors.length;
      break;

    case "patients":
      const patients = await db.query.patientsTable.findMany({
        where: eq(patientsTable.clinicId, user.clinic.id),
      });
      current = patients.length;
      break;

    case "appointments":
      const appointments = await db.query.appointmentsTable.findMany({
        where: eq(appointmentsTable.clinicId, user.clinic.id),
      });
      current = appointments.length;
      break;
  }

  const max =
    limits[
      restrictionType === "doctors"
        ? "maxDoctors"
        : restrictionType === "patients"
          ? "maxPatients"
          : "maxAppointments"
    ];
  const allowed = current < max;

  return { allowed, current, max };
}

export function getRestrictionErrorMessage(
  restrictionType: "doctors" | "patients" | "appointments",
  current: number,
  max: number,
): string {
  const typeNames = {
    doctors: "médicos",
    patients: "pacientes",
    appointments: "agendamentos",
  };

  return `Limite de ${typeNames[restrictionType]} atingido. Você pode cadastrar até ${max} ${typeNames[restrictionType]} no plano gratuito. Faça upgrade para desbloquear recursos ilimitados.`;
}
