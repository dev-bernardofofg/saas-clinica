"use server";

import { parseISO } from "date-fns";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { actionClient } from "@/lib/next-safe-action";
import {
  checkPlanRestrictions,
  getRestrictionErrorMessage,
} from "@/lib/plan-restrictions";
import { getCurrentClinicId } from "@/lib/session";

import { upsertPatientSchema } from "./schema";

export const upsertPatient = actionClient
  .schema(upsertPatientSchema)
  .action(async ({ parsedInput }) => {
    // Verificar restrições do plano apenas para criação de novos pacientes
    if (!parsedInput.id) {
      const restrictions = await checkPlanRestrictions("patients");
      if (!restrictions.allowed) {
        throw new Error(
          getRestrictionErrorMessage(
            "patients",
            restrictions.current,
            restrictions.max,
          ),
        );
      }
    }

    const clinicId = await getCurrentClinicId();
    const { dateOfBirth, ...rest } = parsedInput;

    await db
      .insert(patientsTable)
      .values({
        clinicId,
        ...rest,
        dateOfBirth: parseISO(dateOfBirth),
        status: "active",
      })
      .onConflictDoUpdate({
        target: [patientsTable.id],
        set: {
          ...rest,
          dateOfBirth: parseISO(dateOfBirth),
        },
      });

    revalidatePath("/patients");
  });
