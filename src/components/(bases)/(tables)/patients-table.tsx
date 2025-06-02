"use client";

import { UpsertPatientDialog } from "@/components/(dialog)/upsert-patient";
import { Badge } from "@/components/ui/badge";
import { patientsTable } from "@/db/schema";
import { formatPhoneNumber } from "@/helpers/number";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ExternalLink } from "lucide-react";
import { BaseButton } from "../base-button";
import { BaseTable } from "../base-table";

type Patient = typeof patientsTable.$inferSelect;

interface PatientsTableProps {
  patients: Patient[];
}

export function PatientsTable({ patients }: PatientsTableProps) {
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
        <UpsertPatientDialog
          patient={patient}
          trigger={
            <BaseButton
              variant="ghost"
              type="button"
              className="text-muted-foreground hover:text-foreground"
            >
              <ExternalLink className="size-4" />
            </BaseButton>
          }
        />
      )}
    />
  );
}
