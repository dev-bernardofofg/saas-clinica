"use server";

import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { z } from "zod";

import { db } from "@/db";
import { appointmentsTable, doctorsTable } from "@/db/schema";
import { generateTimeSlots } from "@/helpers/time";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const getAvailableTimes = actionClient
  .schema(
    z.object({
      doctorId: z.string(),
      date: z.string().date(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      throw new Error("Unauthorized");
    }
    if (!session.user.clinic) {
      throw new Error("Clínica não encontrada");
    }
    const doctor = await db.query.doctorsTable.findFirst({
      where: eq(doctorsTable.id, parsedInput.doctorId),
    });
    if (!doctor) {
      throw new Error("Médico não encontrado");
    }
    const selectedDayOfWeek = dayjs(parsedInput.date).day();
    console.log("Selected day of week:", selectedDayOfWeek);
    console.log("Doctor available from:", doctor.availableFromWeekDay);
    console.log("Doctor available to:", doctor.availableToWeekDay);
    const doctorIsAvailable =
      selectedDayOfWeek >= doctor.availableFromWeekDay &&
      selectedDayOfWeek <= doctor.availableToWeekDay;
    console.log("Doctor is available:", doctorIsAvailable);
    if (!doctorIsAvailable) {
      return [];
    }
    const appointments = await db.query.appointmentsTable.findMany({
      where: eq(appointmentsTable.doctorId, parsedInput.doctorId),
    });
    const appointmentsOnSelectedDate = appointments
      .filter((appointment) => {
        return dayjs(appointment.date).isSame(parsedInput.date, "day");
      })
      .map((appointment) => dayjs(appointment.date).format("HH:mm:ss"));
    const timeSlots = generateTimeSlots();

    // Convert the time values to dayjs objects
    const [fromHours, fromMinutes] = doctor.availableFromTime
      .split(":")
      .map(Number);
    const [toHours, toMinutes] = doctor.availableToTime.split(":").map(Number);

    const doctorAvailableFrom = dayjs()
      .set("hour", fromHours)
      .set("minute", fromMinutes)
      .set("second", 0);

    const doctorAvailableTo = dayjs()
      .set("hour", toHours)
      .set("minute", toMinutes)
      .set("second", 0);

    const doctorTimeSlots = timeSlots.filter((time) => {
      const [hours, minutes] = time.split(":").map(Number);
      const slotTime = dayjs()
        .set("hour", hours)
        .set("minute", minutes)
        .set("second", 0);

      return (
        slotTime.isSameOrAfter(doctorAvailableFrom) &&
        slotTime.isSameOrBefore(doctorAvailableTo)
      );
    });

    return doctorTimeSlots.map((time) => {
      return {
        value: time,
        available: !appointmentsOnSelectedDate.includes(time),
        label: time.substring(0, 5),
      };
    });
  });
