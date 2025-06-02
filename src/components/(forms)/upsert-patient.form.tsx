"use client";

import { upsertPatient } from "@/actions/upsert-patient";
import { BaseDatePicker } from "@/components/(bases)/(inputs)/base-date-picker";
import { BaseInput } from "@/components/(bases)/(inputs)/base-input";
import { BasePhoneInput } from "@/components/(bases)/(inputs)/base-phone-input";
import { BaseSelect } from "@/components/(bases)/(inputs)/base-select";
import { BaseTextarea } from "@/components/(bases)/(inputs)/base-textarea";
import { BaseButton } from "@/components/(bases)/base-button";
import { BaseForm } from "@/components/(bases)/base-form";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { patientsTable } from "@/db/schema";
import { PatientValues, SchemaPatient } from "@/schemas/patient.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { Home, Mail, Pen, Plus, User } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface UpsertPatientFormProps {
  patient?: typeof patientsTable.$inferSelect;
  onSuccess: () => void;
}

export const UpsertPatientForm = ({
  patient,
  onSuccess,
}: UpsertPatientFormProps) => {
  const form = useForm<PatientValues>({
    resolver: zodResolver(SchemaPatient) as any,
    defaultValues: {
      name: patient?.name ?? "",
      email: patient?.email ?? "",
      status: patient?.status ?? "active",
      phoneNumber: patient?.phoneNumber ?? "",
      sex: patient?.sex ?? "male",
      dateOfBirth: patient?.dateOfBirth
        ? dayjs(patient.dateOfBirth).format("YYYY-MM-DD")
        : "",
      address: patient?.address ?? "",
      emergencyContact: patient?.emergencyContact ?? "",
      emergencyPhone: patient?.emergencyPhone ?? "",
      medicalHistory: patient?.medicalHistory ?? "",
      allergies: patient?.allergies ?? "",
    },
  });

  const upsertPatientAction = useAction(upsertPatient, {
    onSuccess: () => {
      toast.success(
        patient
          ? "Paciente atualizado com sucesso"
          : "Paciente criado com sucesso",
      );
      onSuccess();
    },
    onError: () => {
      toast.error(
        patient ? "Erro ao atualizar paciente" : "Erro ao criar paciente",
      );
    },
  });

  const handleUpsertPatient = (data: PatientValues) => {
    upsertPatientAction.execute({
      ...data,
      id: patient?.id,
    });
  };

  return (
    <Form {...form}>
      <BaseForm
        onSubmit={form.handleSubmit(handleUpsertPatient)}
        className="space-y-6"
      >
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
            <TabsTrigger value="contact">Contato</TabsTrigger>
            <TabsTrigger value="emergency">Emergência</TabsTrigger>
            <TabsTrigger value="medical">Dados Médicos</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="mt-4 space-y-4">
            <div className="space-y-4">
              <BaseInput
                control={form.control}
                name="name"
                label="Nome do paciente"
                Icon={User}
                placeholder="Insira o nome do paciente"
              />

              <BaseSelect
                control={form.control}
                name="sex"
                label="Sexo"
                placeholder="Selecione o sexo"
                options={[
                  { label: "Masculino", value: "male" },
                  { label: "Feminino", value: "female" },
                ]}
              />

              <BaseDatePicker
                control={form.control}
                name="dateOfBirth"
                label="Data de nascimento"
                disableFutureDates
                maxDate={new Date()}
              />
            </div>
          </TabsContent>

          <TabsContent value="contact" className="mt-4 space-y-4">
            <div className="space-y-4">
              <BaseInput
                control={form.control}
                name="email"
                label="Email"
                Icon={Mail}
                placeholder="Insira o email"
              />

              <BasePhoneInput
                control={form.control}
                name="phoneNumber"
                label="Telefone"
              />

              <BaseInput
                control={form.control}
                name="address"
                label="Endereço"
                Icon={Home}
                placeholder="Insira o endereço completo"
              />
            </div>
          </TabsContent>

          <TabsContent value="emergency" className="mt-4 space-y-4">
            <div className="space-y-4">
              <BaseInput
                control={form.control}
                name="emergencyContact"
                label="Contato de emergência"
                Icon={User}
                placeholder="Nome do contato de emergência"
              />

              <BasePhoneInput
                control={form.control}
                name="emergencyPhone"
                label="Telefone de emergência"
              />
            </div>
          </TabsContent>

          <TabsContent value="medical" className="mt-4 space-y-4">
            <div className="space-y-4">
              <BaseTextarea
                control={form.control}
                name="medicalHistory"
                label="Histórico médico"
                placeholder="Histórico médico do paciente"
              />

              <BaseTextarea
                control={form.control}
                name="allergies"
                label="Alergias"
                placeholder="Alergias do paciente"
              />

              <BaseSelect
                control={form.control}
                name="status"
                label="Status"
                placeholder="Selecione o status"
                options={[
                  { label: "Ativo", value: "active" },
                  { label: "Inativo", value: "inactive" },
                  { label: "Bloqueado", value: "blocked" },
                ]}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div>
          <BaseButton type="submit" disabled={upsertPatientAction.isExecuting}>
            {patient
              ? !upsertPatientAction.isExecuting && <Pen />
              : !upsertPatientAction.isExecuting && <Plus />}

            {patient
              ? upsertPatientAction.isExecuting
                ? "Editando..."
                : "Editar"
              : upsertPatientAction.isExecuting
                ? "Salvando..."
                : "Salvar"}
          </BaseButton>
        </div>
      </BaseForm>
    </Form>
  );
};
