import { BaseAreaChart } from "@/components/(bases)/(charts)/base-area-chart";
import { ListDoctor } from "@/components/(bases)/(list)/list-doctor";
import { BaseStats } from "@/components/(bases)/(stats)/base-stats";
import { FilterDashboardMetricsForm } from "@/components/(forms)/filter-dashboard-metrics.form";
import { Header } from "@/components/(layouts)/header";
import { Fade } from "@/components/(motions)/fade";
import { ChartConfig } from "@/components/ui/chart";
import { db } from "@/db";
import {
  appointmentsTable,
  doctorsTable,
  patientsTable,
  usersToClinicsTable,
} from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import { filterDashboardMetricsDefaultValues } from "@/schemas/dashboard.schema";
import {
  endOfDay,
  format,
  isWithinInterval,
  parseISO,
  startOfDay,
} from "date-fns";
import { and, count, eq, gte, lt, sql, sum } from "drizzle-orm";
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
        total: sum(appointmentsTable.priceInCents),
      })
      .from(appointmentsTable)
      .where(eq(appointmentsTable.clinicId, session.clinic.id)),
  ]);

  const doctors = await db.query.doctorsTable.findMany({
    where: eq(doctorsTable.clinicId, session.clinic.id),
    limit: 4,
  });

  const chartStartDate = new Date(
    new Date().setDate(new Date().getDate() - 10),
  );
  const chartEndDate = new Date();

  const dailyAppointmnetsData = await db
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
        gte(appointmentsTable.date, chartStartDate),
        lt(appointmentsTable.date, chartEndDate),
      ),
    )
    .groupBy(sql`DATE(${appointmentsTable.date})`)
    .orderBy(sql`DATE(${appointmentsTable.date})`);

  const revenueChartConfig = {
    appointments: {
      label: "Agendamentos",
      color: "var(--success)",
    },
    revenue: {
      label: "Faturamento",
      color: "var(--destructive)",
    },
  } satisfies ChartConfig;

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

      <div className="grid grid-cols-4 gap-4">
        <BaseAreaChart
          title="Faturamento"
          description="Faturamento mensal"
          data={dailyAppointmnetsData.filter((item) => {
            const date = parseISO(item.date);
            return isWithinInterval(date, {
              start: chartStartDate,
              end: chartEndDate,
            });
          })}
          config={revenueChartConfig}
          xAxisKey="date"
          trendingValue={Number(totalRevenue[0].total)}
          dateRange={`${format(startDate, "MMMM yyyy")} - ${format(endDate, "MMMM yyyy")}`}
          className="col-span-3"
        />
        <ListDoctor doctors={doctors} />
      </div>
    </Fade>
  );
};

export default DashboardPage;
