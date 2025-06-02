import { z } from "zod";

export const upsertPatientSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, { message: "*" }),
  email: z.string().email({ message: "*" }),
  status: z.enum(["active", "inactive", "blocked"]),
  phoneNumber: z.string().min(1, { message: "*" }),
  sex: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string().min(1, { message: "*" }),
  address: z.string().min(1, { message: "*" }),
  emergencyContact: z.string().default(""),
  emergencyPhone: z.string().default(""),
  medicalHistory: z.string().optional(),
  allergies: z.string().optional(),
});
