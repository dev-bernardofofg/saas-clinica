import { z } from "zod";

export const createAppointmentSchema = z.object({
  patientId: z.string().uuid(),
  doctorId: z.string().uuid(),
  date: z.string(),
  time: z.string(),
  appointmentPriceInCents: z.number(),
  notes: z.string().optional(),
});
