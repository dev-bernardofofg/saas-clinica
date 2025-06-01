import { z } from "zod";

export const SchemaDoctor = z
  .object({
    name: z.string().trim().min(1, { message: "" }),
    email: z.string().email({ message: "*" }).optional(),
    phoneNumber: z.string().min(1, { message: "*" }),
    avatarImageUrl: z.string().optional(),
    speciality: z.string().trim().min(1, { message: "*" }),
    professionalId: z
      .string()
      .trim()
      .min(1, { message: "*" })
      .toUpperCase()
      .regex(
        /^\d{4,6}[-\/\s]?(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$/,
        {
          message: "CRM inválido. Ex: 123456-SP",
        },
      ),
    appointmentPrice: z.number().min(1, {
      message: "*",
    }),
    availableFromWeekDay: z.string(),
    availableToWeekDay: z.string(),
    availableFromTime: z.string().min(1, {
      message: "*",
    }),
    availableToTime: z.string().min(1, {
      message: "*",
    }),
    isActive: z.boolean().default(true),
  })
  .refine((data) => data.availableFromTime <= data.availableToTime, {
    message: "O horário de início deve ser menor que o horário de término",
    path: ["availableToTime"],
  });

export type DoctorValues = z.infer<typeof SchemaDoctor>;
