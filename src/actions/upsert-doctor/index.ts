"use server";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";
import {
  checkPlanRestrictions,
  getRestrictionErrorMessage,
} from "@/lib/plan-restrictions";
import { getCurrentClinicId } from "@/lib/session";

import { upsertDoctorSchema } from "./schema";

dayjs.extend(utc);

export const upsertDoctor = actionClient
  .schema(upsertDoctorSchema)
  .action(async ({ parsedInput }) => {
    const availableFromTime = parsedInput.availableFromTime;
    const availableToTime = parsedInput.availableToTime;

    const availableFromTimeUTC = dayjs()
      .set("hour", parseInt(availableFromTime.split(":")[0]))
      .set("minute", parseInt(availableFromTime.split(":")[1]))
      .set("second", parseInt(availableFromTime.split(":")[2]))
      .utc();
    const availableToTimeUTC = dayjs()
      .set("hour", parseInt(availableToTime.split(":")[0]))
      .set("minute", parseInt(availableToTime.split(":")[1]))
      .set("second", parseInt(availableToTime.split(":")[2]))
      .utc();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    if (!session.user.clinic?.id) {
      throw new Error("Clinic not found");
    }

    // Verificar restrições do plano apenas para criação de novos médicos
    if (!parsedInput.id) {
      const restrictions = await checkPlanRestrictions("doctors");
      if (!restrictions.allowed) {
        throw new Error(
          getRestrictionErrorMessage(
            "doctors",
            restrictions.current,
            restrictions.max,
          ),
        );
      }
    }

    const clinicId = await getCurrentClinicId();

    await db
      .insert(doctorsTable)
      .values({
        clinicId,
        ...parsedInput,
        email: parsedInput.email || "",
        availableFromTime: availableFromTimeUTC.format("HH:mm:ss"),
        availableToTime: availableToTimeUTC.format("HH:mm:ss"),
      })
      .onConflictDoUpdate({
        target: [doctorsTable.id],
        set: {
          ...parsedInput,
          email: parsedInput.email || "",
        },
      });
    revalidatePath("/doctors");
  });
