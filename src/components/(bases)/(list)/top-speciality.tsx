import { CardContent, CardHeader } from "@/components/ui/card";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import {
  Activity,
  Baby,
  Bone,
  Hand,
  Heart,
  Stethoscope,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

const getSpecialtyIcon = (specialty: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    Cardiologia: <Heart className="h-5 w-5 text-blue-600" />,
    Ginecologia: <Activity className="h-5 w-5 text-pink-600" />,
    Pediatria: <Baby className="h-5 w-5 text-green-600" />,
    Dermatologia: <Hand className="h-5 w-5 text-orange-600" />,
    Ortopedia: <Bone className="h-5 w-5 text-purple-600" />,
    "Medicina de Família e Comunidade": (
      <UserCheck className="h-5 w-5 text-teal-600" />
    ),
    "Cirurgia Torácica": <Stethoscope className="h-5 w-5 text-red-600" />,
  };

  return (
    iconMap[specialty] || <Stethoscope className="h-5 w-5 text-gray-600" />
  );
};

// Get progress bar color based on specialty
const getProgressColor = (specialty: string) => {
  const colorMap: { [key: string]: string } = {
    Cardiologia: "bg-blue-500",
    Ginecologia: "bg-pink-500",
    Pediatria: "bg-green-500",
    Dermatologia: "bg-orange-500",
    Ortopedia: "bg-purple-500",
    "Medicina de Família e Comunidade": "bg-teal-500",
    "Cirurgia Torácica": "bg-red-500",
  };

  return colorMap[specialty] || "bg-gray-500";
};

export default function TopSpecialities({
  specialitiesData,
  className,
}: {
  specialitiesData: {
    speciality: string;
    appointments: number;
  }[];
  className?: string;
}) {
  // Calculate max appointments for progress bar scaling
  const maxAppointments = Math.max(
    ...specialitiesData.map((item) => item.appointments),
  );

  return (
    <Card
      className={cn(
        "border-border flex w-full flex-col gap-3 space-y-3 rounded-lg border bg-white",
        className,
      )}
    >
      <CardHeader className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-full bg-blue-100 p-1">
              <Stethoscope className="size-5" />
            </div>
            <p className="text-sm font-medium">Especialidades</p>
          </div>
        </div>

        <Link
          href="/doctors"
          className="text-muted-foreground text-sm hover:underline"
        >
          Ver tudo
        </Link>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-4 pt-0">
        {specialitiesData.map((item, index) => {
          const progressValue = (item.appointments / maxAppointments) * 100;

          return (
            <div
              key={index}
              className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-gray-50"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-50">
                {getSpecialtyIcon(item.speciality)}
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="truncate text-sm font-medium text-gray-900">
                    {item.speciality}
                  </h3>
                  <span className="ml-2 flex-shrink-0 text-sm text-gray-500">
                    {item.appointments} agend.
                  </span>
                </div>

                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(item.speciality)}`}
                    style={{ width: `${progressValue}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
