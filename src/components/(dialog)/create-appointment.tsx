"use client";

import { BaseDialog } from "@/components/(bases)/(dialog)/base-dialog";
import { CreateAppointmentForm } from "@/components/(forms)/create-appointment.form";
import { doctorsTable, patientsTable } from "@/db/schema";
import { useState } from "react";

interface CreateAppointmentDialogProps {
  patients: (typeof patientsTable.$inferSelect)[];
  doctors: (typeof doctorsTable.$inferSelect)[];
  trigger?: React.ReactNode;
}

export const CreateAppointmentDialog = ({
  patients,
  doctors,
  trigger,
}: CreateAppointmentDialogProps) => {
  const [open, setOpen] = useState(false);
  return (
    <BaseDialog
      open={open}
      setOpen={setOpen}
      trigger={trigger}
      title="Adicionar Agendamento"
      description="Adicione um novo agendamento para a sua clínica"
    >
      <CreateAppointmentForm
        isOpen={open}
        patients={patients}
        doctors={doctors}
        onSuccess={() => setOpen(false)}
      />
    </BaseDialog>
  );
};
