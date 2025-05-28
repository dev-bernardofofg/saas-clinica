"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";

import { BaseInput } from "@/components/(bases)/(inputs)/base-input";
import { BaseButton } from "@/components/(bases)/base-button";
import { BaseForm } from "@/components/(bases)/base-form";
import { Form } from "@/components/ui/form";
import { getErrorMessage } from "@/helpers/errors";
import { authClient } from "@/lib/auth-client";
import {
  signUpDefaultValues,
  signUpSchema,
  signUpValues,
} from "@/schemas/auth.schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const SignUpForm = () => {
  const { push } = useRouter();
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: signUpDefaultValues,
  });

  const handleSignIn = async (data: signUpValues) => {
    await authClient.signUp.email(
      {
        email: data.email,
        name: data.name,
        password: data.password,
      },
      {
        onSuccess: () => {
          push("/dashboard");
        },
        onError: (error) => {
          toast.error(getErrorMessage(error.error.code));
        },
      },
    );
  };

  return (
    <Form {...form}>
      <BaseForm
        onSubmit={form.handleSubmit(handleSignIn)}
        className="space-y-4"
      >
        <BaseInput
          control={form.control}
          name="name"
          label="Nome Completo"
          Icon={User}
        />
        <BaseInput
          control={form.control}
          name="email"
          label="E-mail"
          type="email"
          Icon={Mail}
        />
        <BaseInput
          control={form.control}
          name="password"
          label="Senha"
          type="password"
          Icon={Lock}
        />
        <BaseButton type="submit" isLoading={form.formState.isSubmitting}>
          Criar conta
        </BaseButton>
      </BaseForm>
    </Form>
  );
};
