import { CardDoctor } from "@/components/(bases)/(cards)/card-doctor";
import { BaseButton } from "@/components/(bases)/base-button";
import { UpsertDoctorDialog } from "@/components/(dialog)/upsert-doctor";
import { Header } from "@/components/(layouts)/header";
import { Fade } from "@/components/(motions)/fade";
import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { getCurrentClinicId } from "@/lib/session";
import { eq } from "drizzle-orm";

const DoctorsPage = async () => {
  const clinicId = await getCurrentClinicId();
  const doctors = await db.query.doctorsTable.findMany({
    where: eq(doctorsTable.clinicId, clinicId),
  });
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

      <div className="grid grid-cols-4 gap-4">
        {doctors.map((doctor) => (
          <CardDoctor key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </Fade>
  );
};

export default DoctorsPage;
