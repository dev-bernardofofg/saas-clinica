"use client";

import { deletePatient } from "@/actions/delete-patient";
import { UpsertPatientDialog } from "@/components/(dialog)/upsert-patient";
import { ViewPatientDialog } from "@/components/(dialog)/view-patient";
import { Badge } from "@/components/ui/badge";
import { patientsTable } from "@/db/schema";
import { formatPhoneNumber } from "@/helpers/number";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ClipboardPlus, PencilLine, Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { BaseAlertDialog } from "../(dialog)/base-alert-dialog";
import { BaseButton } from "../base-button";
import { BaseTable } from "../base-table";

type Patient = typeof patientsTable.$inferSelect;

interface PatientsTableProps {
  patients: Patient[];
}

export function PatientsTable({ patients }: PatientsTableProps) {
  const { execute: executeDelete } = useAction(deletePatient, {
    onSuccess: () => {
      toast.success("Paciente excluído com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao excluir paciente");
    },
  });

  return (
    <BaseTable
      data={patients}
      columns={[
        {
          header: "NOME",
          accessorKey: "name",
        },
        {
          header: "EMAIL",
          accessorKey: "email",
        },
        {
          header: "TELEFONE",
          accessorKey: "phoneNumber",
          cell: (value) => formatPhoneNumber(value),
        },
        {
          header: "DATA DE NASCIMENTO",
          accessorKey: "dateOfBirth",
          cell: (value) =>
            format(new Date(value), "dd 'de' MMMM 'de' yyyy", {
              locale: ptBR,
            }),
        },
        {
          header: "STATUS",
          accessorKey: "status",
          cell: (value) => (
            <Badge
              variant={
                value === "active"
                  ? "success"
                  : value === "inactive"
                    ? "default"
                    : "destructive"
              }
            >
              {value === "active"
                ? "Ativo"
                : value === "inactive"
                  ? "Inativo"
                  : "Bloqueado"}
            </Badge>
          ),
        },
      ]}
      actions={(patient) => (
        <div className="flex items-center gap-2">
          <ViewPatientDialog
            patient={patient}
            trigger={
              <BaseButton
                variant="ghost"
                type="button"
                className="text-muted-foreground hover:text-foreground w-fit"
              >
                <ClipboardPlus className="size-4" />
              </BaseButton>
            }
          />
          <UpsertPatientDialog
            patient={patient}
            trigger={
              <BaseButton
                variant="ghost"
                type="button"
                className="text-muted-foreground hover:text-foreground w-fit"
              >
                <PencilLine className="size-4" />
              </BaseButton>
            }
          />
          <BaseAlertDialog
            title="Excluir Paciente"
            description="Tem certeza que deseja excluir o paciente?"
            trigger={
              <BaseButton
                variant="ghost"
                type="button"
                className="text-muted-foreground hover:text-foreground w-fit"
              >
                <Trash className="size-4" />
              </BaseButton>
            }
            onConfirm={() => executeDelete({ id: patient.id })}
          />
        </div>
      )}
    />
  );
}
