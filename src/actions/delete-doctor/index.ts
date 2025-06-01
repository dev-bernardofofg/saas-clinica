"use server";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { actionClient } from "@/lib/next-safe-action";
import { getCurrentUser } from "@/lib/session";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const deleteDoctorAction = actionClient
  .schema(
    z.object({
      id: z.string().uuid(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const session = await getCurrentUser();

    const doctor = await db.query.doctorsTable.findFirst({
      where: eq(doctorsTable.id, parsedInput.id),
    });

    if (!doctor) {
      throw new Error("Médico não encontrado");
    }

    if (doctor.clinicId !== session.clinic?.id) {
      throw new Error("Médico não encontrado");
    }

    await db.delete(doctorsTable).where(eq(doctorsTable.id, parsedInput.id));

    revalidatePath("/doctors");
  });
