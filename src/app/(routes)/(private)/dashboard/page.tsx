import { BaseStats } from "@/components/(bases)/(stats)/base-stats";
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
import { and, count, eq, gte, lt, sum } from "drizzle-orm";
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

  const {
    from = filterDashboardMetricsDefaultValues.from,
    to = filterDashboardMetricsDefaultValues.to,
  } = await searchParams;
  const startDate = startOfDay(parseISO(from));
  const endDate = endOfDay(parseISO(to));

  const [
    totalRevenue,
    totalAppointments,
    totalPatients,
    totalDoctors,
    totalRevenueInCents,
  ] = await Promise.all([
    db
      .select({
        total: sum(appointmentsTable.priceInCents),
      })
      .from(appointmentsTable)
      .where(
        and(
          eq(appointmentsTable.clinicId, session.clinic.id),
          gte(appointmentsTable.date, startDate),
          lt(appointmentsTable.date, endDate),
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
          gte(appointmentsTable.date, startDate),
          lt(appointmentsTable.date, endDate),
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
        total: sum(appointmentsTable.priceInCents),
      })
      .from(appointmentsTable)
      .where(eq(appointmentsTable.clinicId, session.clinic.id)),
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
          value={Number(totalRevenue[0].total)}
          type="currency"
        />
        <BaseStats
          title="Agendamentos"
          Icon={CalendarIcon}
          value={totalAppointments[0].total}
          type="number"
        />
        <BaseStats
          title="Pacientes"
          Icon={UserIcon}
          value={totalPatients[0].total}
          type="number"
        />
        <BaseStats
          title="Médicos"
          Icon={StethoscopeIcon}
          value={totalDoctors[0].total}
          type="number"
        />
      </div>
    </Fade>
  );
};

export default DashboardPage;
