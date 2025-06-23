import { eq } from "drizzle-orm";

import { PatientsTable } from "@/components/(bases)/(tables)/patients-table";
import { BaseButton } from "@/components/(bases)/base-button";
import { PlanRestrictionWrapper } from "@/components/(bases)/plan-restriction-wrapper";
import { PlanUsageStats } from "@/components/(bases)/plan-usage-stats";
import { UpsertPatientDialog } from "@/components/(dialog)/upsert-patient";
import { Header } from "@/components/(layouts)/header";
import { Fade } from "@/components/(motions)/fade";
import { db } from "@/db";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { getCurrentClinicId, getCurrentUser } from "@/lib/session";

const PatientsPage = async () => {
  const user = await getCurrentUser();
  const clinicId = await getCurrentClinicId();

  // Buscar contadores atuais
  const [patients, doctors, appointments] = await Promise.all([
    db.query.patientsTable.findMany({
      where: eq(patientsTable.clinicId, clinicId),
    }),
    db.query.doctorsTable.findMany({
      where: eq(doctorsTable.clinicId, clinicId),
    }),
    db.query.appointmentsTable.findMany({
      where: eq(appointmentsTable.clinicId, clinicId),
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
        title="Pacientes"
        description="Gerencie os pacientes da sua clínica"
        actions={
          <PlanRestrictionWrapper
            plan={user.plan}
            currentCounts={currentCounts}
            restrictionType="patients"
          >
            <UpsertPatientDialog
              trigger={
                <BaseButton clickAction="create">Adicionar Paciente</BaseButton>
              }
            />
          </PlanRestrictionWrapper>
        }
      />

      {/* Estatísticas do plano */}
      <div className="mb-6">
        <PlanUsageStats plan={user.plan} currentCounts={currentCounts} />
      </div>

      {/* Tabela de pacientes */}
      <PlanRestrictionWrapper
        plan={user.plan}
        currentCounts={currentCounts}
        restrictionType="patients"
        showWarning={false}
      >
        <PatientsTable patients={patients} />
      </PlanRestrictionWrapper>
    </Fade>
  );
};

export default PatientsPage;
