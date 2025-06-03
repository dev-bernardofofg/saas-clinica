import { AppointmentsTable } from "@/components/(bases)/(tables)/appointments-table";
import { BaseButton } from "@/components/(bases)/base-button";
import { CreateAppointmentDialog } from "@/components/(dialog)/create-appointment";
import { Header } from "@/components/(layouts)/header";
import { Fade } from "@/components/(motions)/fade";
import { db } from "@/db";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { getCurrentClinicId } from "@/lib/session";
import { eq } from "drizzle-orm";

export default async function AppointmentsPage() {
  const clinicId = await getCurrentClinicId();

  const appointments = await db.query.appointmentsTable.findMany({
    where: eq(appointmentsTable.clinicId, clinicId),
    with: {
      patient: true,
      doctor: true,
    },
  });

  const patients = await db.query.patientsTable.findMany({
    where: eq(patientsTable.clinicId, clinicId),
  });
  const doctors = await db.query.doctorsTable.findMany({
    where: eq(doctorsTable.clinicId, clinicId),
  });

  return (
    <Fade>
      <Header
        title="Agendamentos"
        description="Gerencie os agendamentos da sua clínica"
        actions={
          <CreateAppointmentDialog
            patients={patients}
            doctors={doctors}
            trigger={
              <BaseButton clickAction="create">Novo Agendamento</BaseButton>
            }
          />
        }
      />
      <div className="mt-8">
        <AppointmentsTable appointments={appointments} />
      </div>
    </Fade>
  );
}
