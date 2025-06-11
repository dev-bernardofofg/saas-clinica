"use client";

import { createAppointment } from "@/actions/create-appointment";
import { getAvailableTimes } from "@/actions/get-available-times";
import { BaseDatePicker } from "@/components/(bases)/(inputs)/base-date-picker";
import { BaseCurrencyInput } from "@/components/(bases)/(inputs)/base-input-currency";
import { BaseSelect } from "@/components/(bases)/(inputs)/base-select";
import { BaseTextarea } from "@/components/(bases)/(inputs)/base-textarea";
import { BaseButton } from "@/components/(bases)/base-button";
import { BaseForm } from "@/components/(bases)/base-form";
import { Form } from "@/components/ui/form";
import { doctorsTable, patientsTable } from "@/db/schema";
import {
  AppointmentValues,
  SchemaAppointment,
} from "@/schemas/appointment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CreateAppointmentFormProps {
  patients: (typeof patientsTable.$inferSelect)[];
  doctors: (typeof doctorsTable.$inferSelect)[];
  onSuccess: () => void;
  isOpen: boolean;
}

export const CreateAppointmentForm = ({
  patients,
  doctors,
  onSuccess,
  isOpen,
}: CreateAppointmentFormProps) => {
  const form = useForm<AppointmentValues>({
    shouldUnregister: true,
    resolver: zodResolver(SchemaAppointment),
    defaultValues: {
      patientId: "",
      doctorId: "",
      date: "",
      time: "",
      priceInCents: 0,
      notes: "",
    },
  });

  const selectedDoctorId = form.watch("doctorId");
  const selectedPatientId = form.watch("patientId");
  const selectedDate = form.watch("date");

  const { data: availableTimes } = useQuery({
    queryKey: ["available-times", selectedDate, selectedDoctorId],
    queryFn: () =>
      getAvailableTimes({
        date: dayjs(selectedDate).format("YYYY-MM-DD"),
        doctorId: selectedDoctorId,
      }),
    enabled: !!selectedDate && !!selectedDoctorId,
  });

  useEffect(() => {
    if (selectedDoctorId) {
      const selectedDoctor = doctors.find(
        (doctor) => doctor.id === selectedDoctorId,
      );
      if (selectedDoctor) {
        form.setValue(
          "priceInCents",
          selectedDoctor.appointmentPriceInCents / 100,
        );
      }
    }
  }, [selectedDoctorId, doctors, form]);

  useEffect(() => {
    if (isOpen) {
      form.reset({
        patientId: "",
        doctorId: "",
        priceInCents: 0,
        date: undefined,
        time: "",
      });
    }
  }, [isOpen, form]);

  const createAppointmentAction = useAction(createAppointment, {
    onSuccess: () => {
      toast.success("Agendamento criado com sucesso");
      onSuccess();
    },
    onError: (error) => {
      toast.error(
        (error.error.serverError as string) || "Erro ao criar agendamento",
      );
    },
  });

  const handleCreateAppointment = (data: AppointmentValues) => {
    createAppointmentAction.execute({
      ...data,
      appointmentPriceInCents: data.priceInCents * 100,
    });
  };

  const isDateAvailable = (date: Date) => {
    if (!selectedDoctorId) return false;
    const selectedDoctor = doctors.find(
      (doctor) => doctor.id === selectedDoctorId,
    );
    if (!selectedDoctor) return false;

    let dayOfWeek = date.getDay();
    dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    return (
      dayOfWeek >= selectedDoctor.availableFromWeekDay &&
      dayOfWeek <= selectedDoctor.availableToWeekDay
    );
  };

  const isDateTimeEnabled = selectedPatientId && selectedDoctorId;

  return (
    <Form {...form}>
      <BaseForm
        onSubmit={form.handleSubmit(handleCreateAppointment)}
        className="grid grid-cols-2 gap-4 space-y-0"
      >
        <BaseSelect
          control={form.control}
          name="patientId"
          label="Paciente"
          placeholder="Selecione o paciente"
          options={patients.map((patient) => ({
            label: patient.name,
            value: patient.id,
          }))}
        />
        <BaseSelect
          control={form.control}
          name="doctorId"
          label="Médico"
          placeholder="Selecione o médico"
          options={doctors.map((doctor) => ({
            label: `Dr. ${doctor.name} - ${doctor.speciality}`,
            value: doctor.id,
          }))}
        />
        <BaseCurrencyInput
          control={form.control}
          name="priceInCents"
          label="Valor da consulta"
          placeholder="R$ 0,00"
        />
        <BaseDatePicker
          control={form.control}
          name="date"
          label="Data"
          disablePastDates
          isDateAvaliable={isDateAvailable}
          isDateDisabled={isDateTimeEnabled}
        />
        <BaseSelect
          control={form.control}
          name="time"
          label="Horário"
          placeholder="Selecione o horário"
          disabled={!isDateTimeEnabled}
          selectDate={!selectedDate}
          options={availableTimes?.data}
        />
        <div className="col-span-2">
          <BaseTextarea
            control={form.control}
            name="notes"
            label="Observações"
            placeholder="Adicione observações sobre a consulta"
          />
        </div>
        <div className="col-span-2">
          <BaseButton
            type="submit"
            disabled={createAppointmentAction.isExecuting}
            className="w-full"
          >
            {!createAppointmentAction.isExecuting && (
              <Plus className="size-4" />
            )}
            {createAppointmentAction.isExecuting
              ? "Criando..."
              : "Criar Agendamento"}
          </BaseButton>
        </div>
      </BaseForm>
    </Form>
  );
};
