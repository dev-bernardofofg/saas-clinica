"use client";

import { BaseDialog } from "@/components/(bases)/(dialog)/base-dialog";
import { UpsertDoctorForm } from "@/components/(forms)/upsert-doctor.form";
import { doctorsTable } from "@/db/schema";
import { useState } from "react";

interface UpsertDoctorDialogProps {
  doctor?: typeof doctorsTable.$inferSelect;
  trigger?: React.ReactNode;
}

export const UpsertDoctorDialog = ({
  doctor,
  trigger,
}: UpsertDoctorDialogProps) => {
  const [open, setOpen] = useState(false);
  return (
    <BaseDialog
      open={open}
      setOpen={setOpen}
      trigger={trigger}
      title={doctor ? doctor.name : "Adicionar Médico"}
      description={
        doctor
          ? "Edite as informações do médico"
          : "Adicione um novo médico para a sua clínica"
      }
    >
      <UpsertDoctorForm doctor={doctor} onSuccess={() => setOpen(false)} />
    </BaseDialog>
  );
};
