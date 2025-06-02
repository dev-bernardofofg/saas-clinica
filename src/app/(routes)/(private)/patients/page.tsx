import { PatientsTable } from "@/components/(bases)/(tables)/patients-table";
import { BaseButton } from "@/components/(bases)/base-button";
import { UpsertPatientDialog } from "@/components/(dialog)/upsert-patient";
import { Header } from "@/components/(layouts)/header";
import { Fade } from "@/components/(motions)/fade";
import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { getCurrentClinicId } from "@/lib/session";
import { eq } from "drizzle-orm";

const PatientsPage = async () => {
  const clinicId = await getCurrentClinicId();
  const patients = await db.query.patientsTable.findMany({
    where: eq(patientsTable.clinicId, clinicId),
  });

  return (
    <Fade>
      <Header
        title="Pacientes"
        description="Gerencie os pacientes da sua clínica"
        actions={
          <UpsertPatientDialog
            trigger={
              <BaseButton clickAction="create">Adicionar Paciente</BaseButton>
            }
          />
        }
      />

      <PatientsTable patients={patients} />
    </Fade>
  );
};

export default PatientsPage;
