"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { actionClient } from "@/lib/next-safe-action";
import { getCurrentUser } from "@/lib/session";

const schema = z.object({
  id: z.string().uuid(),
});

export const deletePatient = actionClient
  .schema(schema)
  .action(async ({ parsedInput }) => {
    const session = await getCurrentUser();

    const patient = await db.query.patientsTable.findFirst({
      where: eq(patientsTable.id, parsedInput.id),
    });

    if (!patient) {
      throw new Error("Paciente não encontrado");
    }

    if (patient.clinicId !== session.clinic?.id) {
      throw new Error("Paciente não encontrado");
    }

    await db.delete(patientsTable).where(eq(patientsTable.id, parsedInput.id));

    revalidatePath("/patients");
  });
