export type ErrorResponseTypes = Partial<
  Record<keyof typeof authClient.$ERROR_CODES, string>
>;
