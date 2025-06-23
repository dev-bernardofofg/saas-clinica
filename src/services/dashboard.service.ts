import { and, count, desc, eq, sql, sum } from "drizzle-orm";

import { db } from "@/db";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { SessionUser } from "@/lib/session";

export const serviceDashboard = async (
  startDate: Date,
  endDate: Date,
  session: SessionUser,
) => {
  const clinicId = session.clinic?.id;
  if (!clinicId) {
    throw new Error("ID da clínica não está disponível no session.");
  }

  const [
    [totalRevenue],
    [totalAppointments],
    [totalPatients],
    [totalDoctors],
    doctors,
    dailyAppointmentsData,
    topSpecialities,
    appointments,
  ] = await Promise.all([
    db
      .select({
        total: sum(appointmentsTable.priceInCents),
      })
      .from(appointmentsTable)
      .where(
        and(
          eq(appointmentsTable.clinicId, clinicId),
          sql`DATE(${appointmentsTable.date}) >= DATE(${startDate})`,
          sql`DATE(${appointmentsTable.date}) <= DATE(${endDate})`,
        ),
      ),
    db
      .select({
        total: count(appointmentsTable.priceInCents),
      })
      .from(appointmentsTable)
      .where(
        and(
          eq(appointmentsTable.clinicId, clinicId),
          sql`DATE(${appointmentsTable.date}) >= DATE(${startDate})`,
          sql`DATE(${appointmentsTable.date}) <= DATE(${endDate})`,
        ),
      ),
    db
      .select({
        total: count(patientsTable.id),
      })
      .from(patientsTable)
      .where(eq(patientsTable.clinicId, clinicId)),
    db
      .select({
        total: count(doctorsTable.id),
      })
      .from(doctorsTable)
      .where(eq(doctorsTable.clinicId, clinicId)),
    db
      .select({
        id: doctorsTable.id,
        name: doctorsTable.name,
        avatarImageUrl: doctorsTable.avatarImageUrl,
        speciality: doctorsTable.speciality,
        appointments: count(appointmentsTable.id),
      })
      .from(doctorsTable)
      .leftJoin(
        appointmentsTable,
        and(
          eq(appointmentsTable.doctorId, doctorsTable.id),
          eq(appointmentsTable.clinicId, clinicId),
          sql`DATE(${appointmentsTable.date}) >= DATE(${startDate})`,
          sql`DATE(${appointmentsTable.date}) <= DATE(${endDate})`,
        ),
      )
      .where(eq(doctorsTable.clinicId, clinicId))
      .groupBy(
        doctorsTable.id,
        doctorsTable.name,
        doctorsTable.avatarImageUrl,
        doctorsTable.speciality,
      )
      .orderBy(desc(count(appointmentsTable.id)))
      .limit(4),
    db
      .select({
        date: sql<string>`DATE(${appointmentsTable.date})`.as("date"),
        appointments: count(appointmentsTable.id),
        revenue:
          sql<number>`COALESCE(SUM(${appointmentsTable.priceInCents}), 0)`.as(
            "revenue",
          ),
      })
      .from(appointmentsTable)
      .where(
        and(
          eq(appointmentsTable.clinicId, clinicId),
          sql`DATE(${appointmentsTable.date}) >= DATE(${startDate})`,
          sql`DATE(${appointmentsTable.date}) <= DATE(${endDate})`,
        ),
      )
      .groupBy(sql`DATE(${appointmentsTable.date})`)
      .orderBy(sql`DATE(${appointmentsTable.date})`),

    db
      .select({
        speciality: doctorsTable.speciality,
        appointments: count(appointmentsTable.id),
      })
      .from(appointmentsTable)
      .innerJoin(doctorsTable, eq(appointmentsTable.doctorId, doctorsTable.id))
      .where(
        and(
          eq(appointmentsTable.clinicId, clinicId),
          sql`DATE(${appointmentsTable.date}) >= DATE(${startDate})`,
          sql`DATE(${appointmentsTable.date}) <= DATE(${endDate})`,
        ),
      )
      .groupBy(doctorsTable.speciality)
      .orderBy(desc(count(appointmentsTable.id))),

    db.query.appointmentsTable.findMany({
      where: and(
        eq(appointmentsTable.clinicId, clinicId),
        sql`DATE(${appointmentsTable.date}) >= DATE(${startDate})`,
        sql`DATE(${appointmentsTable.date}) <= DATE(${endDate})`,
      ),
      with: {
        patient: true,
        doctor: true,
      },
      limit: 5,
    }),
  ]);

  return {
    totalRevenue,
    totalAppointments,
    totalPatients,
    totalDoctors,
    doctors,
    dailyAppointmentsData,
    topSpecialities,
    appointments,
  };
};
