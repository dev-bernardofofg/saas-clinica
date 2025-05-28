import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({ message: "E-mail é obrigatório" })
    .email({ message: "E-mail inválido" }),
  password: z
    .string({ message: "Senha é obrigatória" })
    .min(1, "Senha é obrigatória"),
});

export const signInDefaultValues = {
  email: "",
  password: "",
};

export type signInValues = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  name: z
    .string({ message: "Nome é obrigatório" })
    .trim()
    .min(3, { message: "Nome deve conter pelo menos 3 caracteres" }),
  email: z
    .string({ message: "Email é obrigatório" })
    .trim()
    .email({ message: "E-mail inválido" }),
  password: z
    .string({ message: "Senha é obrigatória" })
    .trim()
    .min(8, { message: "Senha deve conter pelo menos 8 caracteres" }),
});

export const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
};

export type signUpValues = z.infer<typeof signUpSchema>;
