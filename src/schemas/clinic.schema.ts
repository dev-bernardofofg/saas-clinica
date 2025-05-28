import { z } from "zod";

export const clinicSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  phoneNumber: z.string().min(1),
  email: z.string().min(1),
  website: z.string().optional(),
  logoImageUrl: z.string().optional(),
  businessHoursStart: z.string().min(1),
  businessHoursEnd: z.string().min(1),
  isActive: z.boolean().default(true),
});

export const clinicValuesSchema = {
  name: "",
  address: "",
  phoneNumber: "",
  email: "",
  website: "",
  logoImageUrl: "",
  businessHoursStart: "",
  businessHoursEnd: "",
  isActive: true,
};

export type clinicValues = z.infer<typeof clinicSchema>;
