import { UpsertDoctorDialog } from "@/components/(dialog)/upsert-doctor";
import { Avatar } from "@/components/ui/avatar";
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
import { AvatarFallback } from "@radix-ui/react-avatar";
import { CalendarIcon, ClockIcon, DollarSignIcon } from "lucide-react";
import { BaseButton } from "../base-button";

interface CardDoctorProps {
  doctor: typeof doctorsTable.$inferSelect;
}

export const CardDoctor = ({ doctor }: CardDoctorProps) => {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <Avatar className="flex h-10 w-10 items-center justify-center bg-blue-100">
          <AvatarFallback>{getInitialsName(doctor.name)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-sm font-medium">{doctor.name}</h3>
          <p className="text-muted-foreground text-sm">{doctor.speciality}</p>
        </div>
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
