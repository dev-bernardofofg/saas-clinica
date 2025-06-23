import { z } from "zod";

export const SchemaPatient = z.object({
  name: z.string().trim().min(1, { message: "*" }),
  email: z.string().email({ message: "*" }),
  status: z.enum(["active", "inactive", "blocked"]),
  phoneNumber: z.string().min(1, { message: "*" }),
  sex: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string().min(1, { message: "*" }),
  address: z.string().min(1, { message: "*" }),
  emergencyContact: z.string(),
  emergencyPhone: z.string(),
  medicalHistory: z.string(),
  allergies: z.string(),
});

export type PatientValues = z.infer<typeof SchemaPatient>;
