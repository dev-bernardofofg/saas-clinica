"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";

import { BaseButton } from "@/components/(bases)/base-button";
import { BaseForm } from "@/components/(bases)/base-form";
import { BaseInput } from "@/components/(bases)/base-input";
import { Form } from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import {
  signInDefaultValues,
  signInSchema,
  signInValues,
} from "@/schemas/auth.schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const SignInForm = () => {
  const { push } = useRouter();
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: signInDefaultValues,
  });

  const handleSignIn = async (data: signInValues) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          push("/dashboard");
        },
        onError: () => {
          toast.error("E-mail ou senha inválidos");
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
          Entrar
        </BaseButton>
      </BaseForm>
    </Form>
  );
};
