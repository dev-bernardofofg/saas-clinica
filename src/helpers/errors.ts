import { ErrorResponseTypes } from "@/types/errors";

const errorCodes = {
  USER_ALREADY_EXISTS: "Usuário já cadastrado",
  EMAIL_NOT_VERIFIED: "E-mail não verificado",
  INVALID_CREDENTIALS: "Credenciais inválidas",
  INVALID_PASSWORD: "Senha inválida",
  INVALID_EMAIL: "E-mail inválido",
  INVALID_NAME: "Nome inválido",
  INVALID_PHONE: "Telefone inválido",
  INVALID_EMAIL_OR_PASSWORD: "E-mail ou senha inválidos",
} satisfies ErrorResponseTypes;

export const getErrorMessage = (code: string) => {
  if (code in errorCodes) {
    return errorCodes[code as keyof typeof errorCodes];
  }
  return "";
};
