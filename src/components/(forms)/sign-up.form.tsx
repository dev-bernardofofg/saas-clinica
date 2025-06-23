"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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

  const handleGoogleSignUp = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
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
        <BaseButton
          type="button"
          onClick={handleGoogleSignUp}
          variant="outline"
        >
          <Image src="/google-icon.svg" alt="Google" width={24} height={24} />
          Entrar com Google
        </BaseButton>
      </BaseForm>
    </Form>
  );
};
