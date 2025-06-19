import { CardDoctor } from "@/components/(bases)/(cards)/card-doctor";
import { BaseButton } from "@/components/(bases)/base-button";
import { PlanRestrictionWrapper } from "@/components/(bases)/plan-restriction-wrapper";
import { PlanUsageStats } from "@/components/(bases)/plan-usage-stats";
import { UpsertDoctorDialog } from "@/components/(dialog)/upsert-doctor";
import { Header } from "@/components/(layouts)/header";
import { Fade } from "@/components/(motions)/fade";
import { db } from "@/db";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { getCurrentClinicId, getCurrentUser } from "@/lib/session";
import { eq } from "drizzle-orm";

const DoctorsPage = async () => {
  const user = await getCurrentUser();
  const clinicId = await getCurrentClinicId();

  // Buscar contadores atuais
  const [doctors, patients, appointments] = await Promise.all([
    db.query.doctorsTable.findMany({
      where: eq(doctorsTable.clinicId, clinicId),
    }),
    db.query.patientsTable.findMany({
      where: eq(patientsTable.clinicId, clinicId),
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
        title="Médicos"
        description="Gerencie os médicos da sua clínica"
        actions={
          <UpsertDoctorDialog
            trigger={
              <BaseButton clickAction="create">Adicionar Médico</BaseButton>
            }
          />
        }
      />

      {/* Estatísticas do plano */}
      <div className="mb-6">
        <PlanUsageStats plan={user.plan} currentCounts={currentCounts} />
      </div>

      {/* Lista de médicos */}
      <PlanRestrictionWrapper
        plan={user.plan}
        currentCounts={currentCounts}
        restrictionType="doctors"
        showWarning={false}
      >
        <div className="grid grid-cols-4 gap-4">
          {doctors.map((doctor) => (
            <CardDoctor key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </PlanRestrictionWrapper>
    </Fade>
  );
};

export default DoctorsPage;
