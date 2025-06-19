import { AppointmentsTable } from "@/components/(bases)/(tables)/appointments-table";
import { BaseButton } from "@/components/(bases)/base-button";
import { PlanRestrictionWrapper } from "@/components/(bases)/plan-restriction-wrapper";
import { PlanUsageStats } from "@/components/(bases)/plan-usage-stats";
import { CreateAppointmentDialog } from "@/components/(dialog)/create-appointment";
import { Header } from "@/components/(layouts)/header";
import { Fade } from "@/components/(motions)/fade";
import { db } from "@/db";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { getCurrentClinicId, getCurrentUser } from "@/lib/session";
import { eq } from "drizzle-orm";

export default async function AppointmentsPage() {
  const user = await getCurrentUser();
  const clinicId = await getCurrentClinicId();

  const [appointments, patients, doctors] = await Promise.all([
    db.query.appointmentsTable.findMany({
      where: eq(appointmentsTable.clinicId, clinicId),
      with: {
        patient: true,
        doctor: true,
      },
    }),
    db.query.patientsTable.findMany({
      where: eq(patientsTable.clinicId, clinicId),
    }),
    db.query.doctorsTable.findMany({
      where: eq(doctorsTable.clinicId, clinicId),
    }),
  ]);

  const currentCounts = {
    doctors: doctors.length,
    patients: patients.length,
    appointments: appointments.length,
  };

  return (
    <Fade>
      <Header
        title="Agendamentos"
        description="Gerencie os agendamentos da sua clínica"
        actions={
          <PlanRestrictionWrapper
            plan={user.plan}
            currentCounts={currentCounts}
            restrictionType="appointments"
          >
            <CreateAppointmentDialog
              patients={patients}
              doctors={doctors}
              trigger={
                <BaseButton clickAction="create">Novo Agendamento</BaseButton>
              }
            />
          </PlanRestrictionWrapper>
        }
      />

      {/* Estatísticas do plano */}
      <div className="mb-6">
        <PlanUsageStats plan={user.plan} currentCounts={currentCounts} />
      </div>

      {/* Tabela de agendamentos */}
      <div className="mt-8">
        <PlanRestrictionWrapper
          plan={user.plan}
          currentCounts={currentCounts}
          restrictionType="appointments"
          showWarning={false}
        >
          <AppointmentsTable appointments={appointments} />
        </PlanRestrictionWrapper>
      </div>
    </Fade>
  );
}
