"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";

import { BaseForm } from "@/components/(bases)/base-form";
import { BaseInput } from "@/components/(bases)/base-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  signInDefaultValues,
  signInSchema,
  signInValues,
} from "@/schemas/auth.schema";

export const SignInForm = () => {
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: signInDefaultValues,
  });

  const handleSignIn = (data: signInValues) => {
    console.log(data);
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
        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </BaseForm>
    </Form>
  );
};
