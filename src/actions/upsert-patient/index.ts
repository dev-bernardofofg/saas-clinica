"use server";

import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { actionClient } from "@/lib/next-safe-action";
import { getCurrentClinicId } from "@/lib/session";
import { parseISO } from "date-fns";
import { revalidatePath } from "next/cache";
import { upsertPatientSchema } from "./schema";

export const upsertPatient = actionClient
  .schema(upsertPatientSchema)
  .action(async ({ parsedInput }) => {
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
