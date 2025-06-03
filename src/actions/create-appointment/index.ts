"use server";

import { db } from "@/db";
import { appointmentsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { getCurrentClinicId } from "@/lib/session";
import dayjs from "dayjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createAppointmentSchema } from "./schema";

export const createAppointment = actionClient
  .schema(createAppointmentSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const clinicId = await getCurrentClinicId();

    // Check if doctor is available at the selected time
    const appointmentDateTime = dayjs(
      `${parsedInput.date} ${parsedInput.time}`,
    );

    // Get existing appointments for the doctor on the same day
    const existingAppointments = await db.query.appointmentsTable.findMany({
      where: and(
        eq(appointmentsTable.doctorId, parsedInput.doctorId),
        eq(appointmentsTable.status, "scheduled"),
      ),
    });

    // Check for time conflicts
    const hasConflict = existingAppointments.some((appointment) => {
      const existingDateTime = dayjs(appointment.date);
      return existingDateTime.isSame(appointmentDateTime);
    });

    if (hasConflict) {
      throw new Error("Médico não está disponível neste horário");
    }

    // Create the appointment
    await db.insert(appointmentsTable).values({
      clinicId,
      patientId: parsedInput.patientId,
      doctorId: parsedInput.doctorId,
      date: appointmentDateTime.toDate(),
      notes: parsedInput.notes,
      priceInCents: parsedInput.appointmentPriceInCents,
      status: "scheduled",
    });

    revalidatePath("/appointments");
  });
