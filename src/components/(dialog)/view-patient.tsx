"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { patientsTable } from "@/db/schema";
import { formatPhoneNumber } from "@/helpers/number";
import { Eye, Heart, Phone, Stethoscope, User2 } from "lucide-react";
import { BaseButton } from "../(bases)/base-button";
import { Badge } from "../ui/badge";

type Patient = typeof patientsTable.$inferSelect;

interface ViewPatientDialogProps {
  patient: Patient;
  trigger?: React.ReactNode;
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-2">
      <div className="text-muted-foreground mt-0.5">{icon}</div>
      <div>
        <p className="text-muted-foreground text-sm">{label}</p>
        <p className="text-sm">{value || "Não informado"}</p>
      </div>
    </div>
  );
}

export function ViewPatientDialog({
  patient,
  trigger,
}: ViewPatientDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <BaseButton variant="ghost" type="button">
            <Eye className="size-4" />
          </BaseButton>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <DialogTitle>{patient.name}</DialogTitle>
              <Badge
                variant={
                  patient.status === "active"
                    ? "success"
                    : patient.status === "inactive"
                      ? "default"
                      : "destructive"
                }
              >
                {patient.status === "active"
                  ? "Ativo"
                  : patient.status === "inactive"
                    ? "Inativo"
                    : "Bloqueado"}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="emergency">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="emergency">Emergência</TabsTrigger>
            <TabsTrigger value="medical">Relatório Médico</TabsTrigger>
          </TabsList>

          <TabsContent value="emergency" className="mt-4 space-y-4">
            <div className="grid gap-4">
              <InfoItem
                icon={<User2 className="size-4" />}
                label="Nome"
                value={patient.emergencyContact}
              />
              <InfoItem
                icon={<Phone className="size-4" />}
                label="Telefone"
                value={
                  patient.emergencyPhone
                    ? formatPhoneNumber(patient.emergencyPhone)
                    : undefined
                }
              />
            </div>
          </TabsContent>

          <TabsContent value="medical" className="mt-4 space-y-4">
            <div className="grid gap-4">
              <InfoItem
                icon={<Stethoscope className="size-4" />}
                label="Histórico Médico"
                value={patient.medicalHistory}
              />
              <InfoItem
                icon={<Heart className="size-4" />}
                label="Alergias"
                value={patient.allergies}
              />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
