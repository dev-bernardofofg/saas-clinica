import { z } from "zod";

export const SchemaAppointment = z.object({
  patientId: z.string().uuid({ message: "Paciente é obrigatório" }),
  doctorId: z.string().uuid({ message: "Médico é obrigatório" }),
  date: z.string().min(1, { message: "Data é obrigatória" }),
  time: z.string().min(1, { message: "Horário é obrigatório" }),
  priceInCents: z.number().min(1, { message: "Valor é obrigatório" }),
  notes: z.string().optional(),
});

export type AppointmentValues = z.infer<typeof SchemaAppointment>;
