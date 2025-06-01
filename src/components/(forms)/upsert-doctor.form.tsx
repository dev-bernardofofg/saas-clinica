"use client";

import { upsertDoctor } from "@/actions/upsert-doctor";
import { BaseInput } from "@/components/(bases)/(inputs)/base-input";
import { BaseCurrencyInput } from "@/components/(bases)/(inputs)/base-input-currency";
import { BaseSelect } from "@/components/(bases)/(inputs)/base-select";
import { BaseButton } from "@/components/(bases)/base-button";
import { BaseForm } from "@/components/(bases)/base-form";
import { Form } from "@/components/ui/form";
import {
  daysOfWeek,
  medicalSpecialties,
  timeOptionsGrouped,
} from "@/constants";
import { doctorsTable } from "@/db/schema";
import { DoctorValues, SchemaDoctor } from "@/schemas/doctor.shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { IdCard, Mail, Pen, Phone, Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface UpsertDoctorFormProps {
  doctor?: typeof doctorsTable.$inferSelect;
  onSuccess: () => void;
}

export const UpsertDoctorForm = ({
  doctor,
  onSuccess,
}: UpsertDoctorFormProps) => {
  const form = useForm({
    shouldUnregister: true,
    resolver: zodResolver(SchemaDoctor),
    defaultValues: {
      name: doctor?.name ?? "",
      email: doctor?.email ?? "",
      phoneNumber: doctor?.phoneNumber ?? "",
      avatarImageUrl: doctor?.avatarImageUrl ?? "",
      speciality: doctor?.speciality ?? "",
      professionalId: doctor?.professionalId ?? "",
      appointmentPrice: doctor?.appointmentPriceInCents
        ? doctor.appointmentPriceInCents / 100
        : 0,
      availableFromWeekDay: doctor?.availableFromWeekDay?.toString() ?? "0",
      availableToWeekDay: doctor?.availableToWeekDay?.toString() ?? "4",
      availableFromTime: doctor?.availableFromTime ?? "",
      availableToTime: doctor?.availableToTime ?? "",
      isActive: doctor?.isActive ?? true,
    },
  });

  const upsertDoctionAction = useAction(upsertDoctor, {
    onSuccess: () => {
      toast.success(
        doctor ? "Médico atualizado com sucesso" : "Médico criado com sucesso",
      );
      onSuccess();
    },
    onError: () => {
      toast.error(doctor ? "Erro ao atualizar médico" : "Erro ao criar médico");
    },
  });

  const handleUpsertDoctor = (data: DoctorValues) => {
    upsertDoctionAction.execute({
      ...data,
      id: doctor?.id,
      availableFromWeekDay: Number(data.availableFromWeekDay),
      availableToWeekDay: Number(data.availableToWeekDay),
      appointmentPriceInCents: data.appointmentPrice * 100,
    });
  };

  return (
    <Form {...form}>
      <BaseForm
        onSubmit={form.handleSubmit(handleUpsertDoctor)}
        className="grid grid-cols-2 gap-4 space-y-0"
      >
        <BaseInput
          control={form.control}
          name="name"
          label="Nome"
          placeholder="Insira o nome"
        />

        <BaseInput
          control={form.control}
          name="email"
          label="Email"
          Icon={Mail}
          placeholder="Insira o email"
        />

        <BaseInput
          control={form.control}
          name="phoneNumber"
          label="Telefone"
          Icon={Phone}
          placeholder="Insira o telefone"
        />

        <BaseInput
          control={form.control}
          name="professionalId"
          label="CRM"
          Icon={IdCard}
          placeholder="Insira o CRM"
        />

        <BaseSelect
          control={form.control}
          name="speciality"
          label="Especialidade"
          placeholder="Selecione a especialidade"
          options={medicalSpecialties}
        />

        <BaseCurrencyInput
          control={form.control}
          name="appointmentPrice"
          label="Preço da consulta"
          placeholder="Insira o preço da consulta"
        />

        <BaseSelect
          control={form.control}
          name="availableFromWeekDay"
          label="Intervalo inicial de atendimento"
          placeholder="Selecione o intervalo inicial"
          options={daysOfWeek}
        />

        <BaseSelect
          control={form.control}
          name="availableToWeekDay"
          label="Intervalo final de atendimento"
          placeholder="Selecione o intervalo final"
          options={daysOfWeek}
        />

        <BaseSelect
          control={form.control}
          name="availableFromTime"
          label="Horário de início"
          placeholder="Selecione o horário de início"
          optionGroups={timeOptionsGrouped}
        />

        <BaseSelect
          control={form.control}
          name="availableToTime"
          label="Horário de término"
          placeholder="Selecione o horário de término"
          optionGroups={timeOptionsGrouped}
        />
        <div className="col-span-2 flex flex-col gap-1">
          <BaseButton type="submit" disabled={upsertDoctionAction.isExecuting}>
            {doctor
              ? !upsertDoctionAction.isExecuting && <Pen />
              : !upsertDoctionAction.isExecuting && <Plus />}

            {doctor
              ? upsertDoctionAction.isExecuting
                ? "Editando..."
                : "Editar"
              : upsertDoctionAction.isExecuting
                ? "Salvando..."
                : "Salvar"}
          </BaseButton>
        </div>
      </BaseForm>
    </Form>
  );
};
