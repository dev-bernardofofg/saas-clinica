"use client";

import { createClinic } from "@/actions/create-clinic";
import {
  clinicSchema,
  clinicValues,
  clinicValuesSchema,
} from "@/schemas/clinic.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { BaseInput } from "../(bases)/(inputs)/base-input";
import { FileInput } from "../(bases)/(inputs)/base-input-file";
import { MaskedInput } from "../(bases)/(inputs)/base-input-masked";
import { TimePickerPopover } from "../(bases)/(inputs)/base-time-picker";
import { BaseButton } from "../(bases)/base-button";
import { BaseForm } from "../(bases)/base-form";
import { Form } from "../ui/form";

export const CreateClinicsForm = () => {
  const form = useForm({
    resolver: zodResolver(clinicSchema),
    defaultValues: clinicValuesSchema,
  });

  const handleCreateClinic = async (data: clinicValues) => {
    try {
      await createClinic(data);
      toast.success("Clínica criada com sucesso");
      form.reset();
    } catch (error) {
      if (isRedirectError(error)) {
        return;
      }
      toast.error("Erro ao criar clínica");
    }
  };

  return (
    <Form {...form}>
      <BaseForm
        onSubmit={form.handleSubmit(handleCreateClinic)}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <BaseInput
          control={form.control}
          name="name"
          label="Nome"
          placeholder="Nome da clínica"
        />
        <BaseInput
          control={form.control}
          name="address"
          label="Endereço"
          placeholder="Endereço da clínica"
        />

        <MaskedInput
          control={form.control}
          name="phoneNumber"
          label="Telefone"
          placeholder="(99) 99999-9999"
          mask="(XX) XXXXX-XXXX"
          replacement={{ X: /\d/ }}
        />
        <BaseInput
          control={form.control}
          name="email"
          label="E-mail"
          placeholder="E-mail da clínica"
        />

        <div className="md:col-span-2">
          <BaseInput
            control={form.control}
            name="website"
            label="Website"
            placeholder="minha-clinica"
          />
        </div>

        <div className="md:col-span-2">
          <FileInput
            control={form.control}
            name="logoImageUrl"
            label="Logo da clínica"
            description="Somente PNG, JPG ou SVG"
            accept="image/png, image/jpeg, image/svg+xml"
          />
        </div>

        <TimePickerPopover
          control={form.control}
          name="businessHoursStart"
          label="Horário de início"
        />
        <TimePickerPopover
          control={form.control}
          name="businessHoursEnd"
          label="Horário de término"
        />

        <BaseButton
          type="submit"
          className="md:col-span-2"
          disabled={form.formState.isSubmitting}
        >
          Criar clínica
        </BaseButton>
      </BaseForm>
    </Form>
  );
};
