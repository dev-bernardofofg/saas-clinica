"use client";

import { BaseDialog } from "@/components/(bases)/(dialog)/base-dialog";
import { UpsertPatientForm } from "@/components/(forms)/upsert-patient.form";
import { patientsTable } from "@/db/schema";
import { useState } from "react";

interface UpsertPatientDialogProps {
  patient?: typeof patientsTable.$inferSelect;
  trigger?: React.ReactNode;
}

export const UpsertPatientDialog = ({
  patient,
  trigger,
}: UpsertPatientDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <BaseDialog
      open={open}
      setOpen={setOpen}
      trigger={trigger}
      title={patient ? patient.name : "Adicionar Paciente"}
      description={
        patient
          ? "Edite as informações do paciente"
          : "Adicione um novo paciente para a sua clínica"
      }
    >
      <UpsertPatientForm patient={patient} onSuccess={() => setOpen(false)} />
    </BaseDialog>
  );
};
