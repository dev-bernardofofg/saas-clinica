"use client";

import { Badge } from "@/components/ui/badge";
import { appointmentsTable } from "@/db/schema";
import { formatCurrencyInCents } from "@/helpers/number";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowUpRight } from "lucide-react";
import { BaseTable } from "../base-table";

type Appointment = typeof appointmentsTable.$inferSelect & {
  patient: { name: string };
  doctor: { name: string; speciality: string };
};

interface AppointmentsTableProps {
  appointments: Appointment[];
  onAppointmentClick?: (appointment: Appointment) => void;
}

export function AppointmentsTable({
  appointments,
  onAppointmentClick,
}: AppointmentsTableProps) {
  return (
    <BaseTable
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
          accessorKey: "doctor",
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
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAppointmentClick?.(appointment);
          }}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowUpRight className="size-4" />
        </button>
      )}
    />
  );
}
