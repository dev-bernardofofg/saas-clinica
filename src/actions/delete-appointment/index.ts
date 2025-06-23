"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/db";
import { appointmentsTable } from "@/db/schema";
import { actionClient } from "@/lib/next-safe-action";
import { getCurrentUser } from "@/lib/session";

export const deleteAppointment = actionClient
  .schema(z.string().uuid())
  .action(async ({ parsedInput: appointmentId }) => {
    const session = await getCurrentUser();

    const appointment = await db.query.appointmentsTable.findFirst({
      where: eq(appointmentsTable.id, appointmentId),
    });

    if (!appointment) {
      throw new Error("Agendamento não encontrado");
    }

    if (appointment.clinicId !== session.clinic?.id) {
      throw new Error("Agendamento não encontrado");
    }

    await db
      .delete(appointmentsTable)
      .where(eq(appointmentsTable.id, appointmentId));

    revalidatePath("/appointments");
  });
