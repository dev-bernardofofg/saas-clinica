"use client";

import { BaseButton } from "@/components/(bases)/base-button";
import { BaseDialog } from "@/components/(bases)/base-dialog";
import { UpsertDoctorForm } from "@/components/(forms)/upsert-doctor.form";
import { useState } from "react";

export const UpsertDoctorDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <BaseDialog
      open={open}
      setOpen={setOpen}
      trigger={<BaseButton clickAction="create">Adicionar Médico</BaseButton>}
      title="Adicionar Médico"
      description="Adicione um novo médico para a sua clínica"
    >
      <UpsertDoctorForm onSuccess={() => setOpen(false)} />
    </BaseDialog>
  );
};
