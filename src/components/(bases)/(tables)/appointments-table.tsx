"use client";

import { deleteAppointment } from "@/actions/delete-appointment";
import { Badge } from "@/components/ui/badge";
import { appointmentsTable } from "@/db/schema";
import { formatCurrencyInCents } from "@/helpers/number";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { BaseAlertDialog } from "../(dialog)/base-alert-dialog";
import { BaseButton } from "../base-button";
import { BaseTable } from "../base-table";

type Appointment = typeof appointmentsTable.$inferSelect & {
  patient: { name: string };
  doctor: { name: string; speciality: string };
};

interface AppointmentsTableProps {
  appointments: Appointment[];
  title?: string;
}

export function AppointmentsTable({
  appointments,
  title,
}: AppointmentsTableProps) {
  const { execute: executeDelete } = useAction(deleteAppointment, {
    onSuccess: () => {
      toast.success("Agendamento cancelado com sucesso");
    },
    onError: () => {
      toast.error("Erro ao cancelar agendamento");
    },
  });
  return (
    <BaseTable
      title={title}
      data={appointments}
      columns={[
        {
          header: "PACIENTE",
          accessorKey: "patient",
          cell: (_, appointment) => appointment.patient.name,
        },
        {
          header: "DATA",
          accessorKey: "date",
          cell: (value) =>
            format(new Date(value), "dd/MM/yy, HH:mm", {
              locale: ptBR,
            }),
        },
        {
          header: "MÉDICO",
          accessorKey: "doctor",
          cell: (_, appointment) => `Dr. ${appointment.doctor.name}`,
        },
        {
          header: "ESPECIALIDADE",
          accessorKey: "doctorId",
          cell: (_, appointment) => appointment.doctor.speciality,
        },
        {
          header: "VALOR",
          accessorKey: "priceInCents",
          cell: (value) => formatCurrencyInCents(value),
        },
        {
          header: "STATUS",
          accessorKey: "status",
          cell: (value) => (
            <Badge
              variant={
                value === "scheduled"
                  ? "default"
                  : value === "completed"
                    ? "success"
                    : "destructive"
              }
            >
              {value === "scheduled"
                ? "Confirmado"
                : value === "completed"
                  ? "Concluído"
                  : "Cancelado"}
            </Badge>
          ),
        },
      ]}
      actions={(appointment) => (
        <BaseAlertDialog
          title="Cancelar Agendamento"
          description="Tem certeza que deseja cancelar este agendamento?"
          trigger={
            <BaseButton
              variant="ghost"
              type="button"
              className="text-muted-foreground hover:text-foreground w-fit"
            >
              <Trash className="size-4" />
            </BaseButton>
          }
          onConfirm={() => {
            executeDelete(appointment.id);
          }}
        />
      )}
    />
  );
}
