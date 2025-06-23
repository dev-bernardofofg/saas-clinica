import { endOfDay, parseISO, startOfDay } from "date-fns";
import { eq } from "drizzle-orm";
import {
  CalendarIcon,
  DollarSignIcon,
  StethoscopeIcon,
  UserIcon,
} from "lucide-react";
import { redirect } from "next/navigation";

import { ListDoctor } from "@/components/(bases)/(list)/list-doctor";
import TopSpecialities from "@/components/(bases)/(list)/top-speciality";
import { BaseStats } from "@/components/(bases)/(stats)/base-stats";
import { AppointmentsTable } from "@/components/(bases)/(tables)/appointments-table";
import { PlanUsageStats } from "@/components/(bases)/plan-usage-stats";
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
import { serviceDashboard } from "@/services/dashboard.service";

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

  const [dashboardData, currentCounts] = await Promise.all([
    serviceDashboard(startDate, endDate, session),
    // Buscar contadores atuais para estatísticas do plano
    Promise.all([
      db.query.doctorsTable.findMany({
        where: eq(doctorsTable.clinicId, session.clinic.id),
      }),
      db.query.patientsTable.findMany({
        where: eq(patientsTable.clinicId, session.clinic.id),
      }),
      db.query.appointmentsTable.findMany({
        where: eq(appointmentsTable.clinicId, session.clinic.id),
      }),
    ]),
  ]);

  const {
    totalRevenue,
    totalAppointments,
    totalPatients,
    totalDoctors,
    dailyAppointmentsData,
    doctors,
    appointments,
    topSpecialities,
  } = dashboardData;

  const [doctorsList, patientsList, appointmentsList] = currentCounts;
  const planCounts = {
    doctors: doctorsList.length,
    patients: patientsList.length,
    appointments: appointmentsList.length,
  };

  return (
    <Fade>
      <Header
        title="Dashboard"
        description="Tenha uma visão geral da sua clínica"
        actions={<FilterDashboardMetricsForm />}
      />

      {/* Estatísticas do plano para usuários free */}
      {session.plan === "free" && (
        <div className="mb-6">
          <PlanUsageStats plan={session.plan} currentCounts={planCounts} />
        </div>
      )}

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

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <AppointmentsChart dailyAppointmentsData={dailyAppointmentsData} />
        </div>
        <ListDoctor className="col-span-1" doctors={doctors} />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <AppointmentsTable
            appointments={appointments}
            title="Últimos agendamentos"
          />
        </div>
        <TopSpecialities
          className="col-span-1"
          specialitiesData={topSpecialities}
        />
      </div>
    </Fade>
  );
};

export default DashboardPage;
