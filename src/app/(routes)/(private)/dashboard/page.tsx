import { ListDoctor } from "@/components/(bases)/(list)/list-doctor";
import { BaseStats } from "@/components/(bases)/(stats)/base-stats";
import AppointmentsChart from "@/components/(charts)/appointments-chart";
import { FilterDashboardMetricsForm } from "@/components/(forms)/filter-dashboard-metrics.form";
import { Header } from "@/components/(layouts)/header";
import { Fade } from "@/components/(motions)/fade";
import { db } from "@/db";
import {
  appointmentsTable,
  doctorsTable,
  patientsTable,
  usersToClinicsTable,
} from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import { filterDashboardMetricsDefaultValues } from "@/schemas/dashboard.schema";
import { endOfDay, parseISO, startOfDay } from "date-fns";
import { and, count, desc, eq, sql, sum } from "drizzle-orm";
import {
  CalendarIcon,
  DollarSignIcon,
  StethoscopeIcon,
  UserIcon,
} from "lucide-react";
import { redirect } from "next/navigation";

interface DashboardPageProps {
  searchParams: Promise<{
    from?: string;
    to?: string;
  }>;
}

const DashboardPage = async ({ searchParams }: DashboardPageProps) => {
  const session = await getCurrentUser();

  const clinics = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session.id),
  });

  if (clinics.length === 0) {
    redirect("/clinic-form");
  }

  if (!session.clinic?.id) {
    redirect("/clinic-form");
  }

  const { from: rawFrom, to: rawTo } = await searchParams;

  const fromDate = rawFrom
    ? parseISO(rawFrom)
    : parseISO(filterDashboardMetricsDefaultValues.from);
  const toDate = rawTo
    ? parseISO(rawTo)
    : parseISO(filterDashboardMetricsDefaultValues.to);

  const startDate = startOfDay(fromDate);
  const endDate = endOfDay(toDate);

  const [
    [totalRevenue],
    [totalAppointments],
    [totalPatients],
    [totalDoctors],
    doctors,
    dailyAppointmentsData,
  ] = await Promise.all([
    db
      .select({
        total: sum(appointmentsTable.priceInCents),
      })
      .from(appointmentsTable)
      .where(
        and(
          eq(appointmentsTable.clinicId, session.clinic.id),
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
          eq(appointmentsTable.clinicId, session.clinic.id),
          sql`DATE(${appointmentsTable.date}) >= DATE(${startDate})`,
          sql`DATE(${appointmentsTable.date}) <= DATE(${endDate})`,
        ),
      ),
    db
      .select({
        total: count(patientsTable.id),
      })
      .from(patientsTable)
      .where(eq(patientsTable.clinicId, session.clinic.id)),
    db
      .select({
        total: count(doctorsTable.id),
      })
      .from(doctorsTable)
      .where(eq(doctorsTable.clinicId, session.clinic.id)),
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
          eq(appointmentsTable.clinicId, session.clinic.id),
          sql`DATE(${appointmentsTable.date}) >= DATE(${startDate})`,
          sql`DATE(${appointmentsTable.date}) <= DATE(${endDate})`,
        ),
      )
      .where(eq(doctorsTable.clinicId, session.clinic.id))
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
          eq(appointmentsTable.clinicId, session.clinic.id),
          sql`DATE(${appointmentsTable.date}) >= DATE(${startDate})`,
          sql`DATE(${appointmentsTable.date}) <= DATE(${endDate})`,
        ),
      )
      .groupBy(sql`DATE(${appointmentsTable.date})`)
      .orderBy(sql`DATE(${appointmentsTable.date})`),
  ]);

  return (
    <Fade>
      <Header
        title="Dashboard"
        description="Tenha uma visão geral da sua clínica"
        actions={<FilterDashboardMetricsForm />}
      />

      <div className="grid grid-cols-4 gap-4">
        <BaseStats
          title="Faturamento"
          Icon={DollarSignIcon}
          value={Number(totalRevenue.total)}
          type="currency"
        />
        <BaseStats
          title="Agendamentos"
          Icon={CalendarIcon}
          value={totalAppointments.total}
          type="number"
        />
        <BaseStats
          title="Pacientes"
          Icon={UserIcon}
          value={totalPatients.total}
          type="number"
        />
        <BaseStats
          title="Médicos"
          Icon={StethoscopeIcon}
          value={totalDoctors.total}
          type="number"
        />
      </div>

      <div className="grid max-h-64 grid-cols-4 gap-4">
        <div className="col-span-3">
          <AppointmentsChart dailyAppointmentsData={dailyAppointmentsData} />
        </div>
        <ListDoctor className="col-span-1" doctors={doctors} />
      </div>
    </Fade>
  );
};

export default DashboardPage;
