import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getInitialsName } from "@/helpers/string";
import { cn } from "@/lib/utils";
import { Stethoscope } from "lucide-react";
import Link from "next/link";

interface ListDoctorsProps {
  doctors: {
    id: string;
    name: string;
    avatarImageUrl: string | null;
    speciality: string;
    appointments: number;
  }[];
}

const ListItemDoctor = (doctor: ListDoctorsProps["doctors"][number]) => {
  return (
    <div className="grid grid-cols-3 items-center justify-between gap-3">
      <div className="col-span-2 flex items-center gap-2">
        <Avatar className="flex h-10 w-10 items-center justify-center bg-blue-100">
          <AvatarFallback>{getInitialsName(doctor.name)}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-1 text-sm">
          <p className="font-medium">{doctor.name}</p>
          <p className="text-muted-foreground">{doctor.speciality}</p>
        </div>
      </div>

      <div className="col-span-1 flex items-center justify-end">
        <span className="text-muted-foreground text-sm">
          {doctor.appointments} agend.
        </span>
      </div>
    </div>
  );
};

export const ListDoctor = ({
  doctors,
  className,
}: {
  doctors: ListDoctorsProps["doctors"];
  className?: string;
}) => {
  return (
    <Card
      className={cn("flex w-full flex-col gap-3 space-y-3 bg-white", className)}
    >
      <CardHeader className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-full bg-blue-100 p-1">
              <Stethoscope className="size-5" />
            </div>
            <p className="text-sm font-medium">Médicos</p>
          </div>
          <p className="text-muted-foreground text-sm">
            {doctors.length} médicos cadastrados
          </p>
        </div>

        <Link
          href="/doctors"
          className="text-muted-foreground text-sm hover:underline"
        >
          Ver tudo
        </Link>
      </CardHeader>

      <Separator />

      <CardContent className="flex flex-col gap-2">
        {doctors.map((doctor) => (
          <ListItemDoctor key={doctor.id} {...doctor} />
        ))}
        {doctors.length === 0 && (
          <div className="flex items-center justify-center">
            <p className="text-muted-foreground text-sm">
              Nenhum médico encontrado
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
