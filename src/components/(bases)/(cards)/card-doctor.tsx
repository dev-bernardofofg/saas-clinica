"use client";

import { deleteDoctorAction } from "@/actions/delete-doctor";
import { UpsertDoctorDialog } from "@/components/(dialog)/upsert-doctor";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { doctorsTable } from "@/db/schema";
import { formatCurrencyInCents } from "@/helpers/number";
import { formatDays, formatTimes, getInitialsName } from "@/helpers/string";
import { CalendarIcon, ClockIcon, DollarSignIcon, Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { BaseAlertDialog } from "../(dialog)/base-alert-dialog";
import { BaseButton } from "../base-button";

interface CardDoctorProps {
  doctor: typeof doctorsTable.$inferSelect;
}

export const CardDoctor = ({ doctor }: CardDoctorProps) => {
  const handleDeleteDoctor = useAction(deleteDoctorAction, {
    onSuccess: () => {
      toast.success("Médico deletado com sucesso");
    },
    onError: () => {
      toast.error("Erro ao deletar médico");
    },
  });
  return (
    <Card>
      <CardHeader className="relative flex items-center gap-2">
        <Avatar className="flex h-10 w-10 items-center justify-center bg-blue-100">
          <AvatarFallback>{getInitialsName(doctor.name)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-sm font-medium">{doctor.name}</h3>
          <p className="text-muted-foreground text-sm">{doctor.speciality}</p>
        </div>
        {doctor && (
          <BaseAlertDialog
            title="Deletar médico"
            description="Tem certeza que deseja deletar o médico? E todas as consultas agendadas serão deletadas."
            trigger={
              <BaseButton
                type="button"
                variant="ghost"
                className="text-destructive hover:text-destructive/70 absolute right-2 bottom-4 h-fit w-fit"
              >
                <Trash />
              </BaseButton>
            }
            onConfirm={() => handleDeleteDoctor.execute({ id: doctor.id })}
          />
        )}
      </CardHeader>

      <Separator />
      <CardContent className="flex flex-col gap-2">
        <Badge>
          <CalendarIcon className="mr-1" />
          {formatDays([doctor.availableFromWeekDay, doctor.availableToWeekDay])}
        </Badge>
        <Badge>
          <ClockIcon className="mr-1" />
          {formatTimes([doctor.availableFromTime, doctor.availableToTime])}
        </Badge>
        <Badge>
          <DollarSignIcon className="mr-1" />
          {formatCurrencyInCents(doctor.appointmentPriceInCents)}
        </Badge>
      </CardContent>
      <Separator />
      <CardFooter>
        <UpsertDoctorDialog
          doctor={doctor}
          trigger={<BaseButton>Ver detalhes</BaseButton>}
        />
      </CardFooter>
    </Card>
  );
};
