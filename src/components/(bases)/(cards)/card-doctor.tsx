import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  doctorspeciality,
  formatTimes,
  getInitialsName,
} from "@/helpers/string";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Clock } from "lucide-react";
import { BaseButton } from "../base-button";
import Icon from "../base-icon";

interface CardDoctorProps {
  name: string;
  speciality: string;
  cost: number;
  image: string;
  days: string[];
  time: string[];
}

export const CardDoctor = ({
  name,
  speciality,
  cost,
  image,
  days,
  time,
}: CardDoctorProps) => {
  return (
    <Card className="p-5">
      <CardHeader className="flex items-center gap-2 p-0">
        <Avatar className="size-[72px] rounded-full">
          <AvatarFallback>{getInitialsName(name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-lg font-bold">{name}</p>
          <div className="text-sm text-gray-500">
            <div className="flex size-5 items-center justify-center rounded-full p-1">
              <Icon name={doctorspeciality(speciality)} />
            </div>
            <span className="capitalize">{speciality}</span>{" "}
          </div>
        </div>
      </CardHeader>

      <Separator />
      <CardDescription>
        <div className="flex flex-col gap-2">
          <Badge variant="secondary">
            <div className="flex items-center gap-2">
              <span>
                <Clock size={16} />
              </span>
              {formatTimes(time)}
            </div>
            {cost}
          </Badge>
        </div>
      </CardDescription>
      <CardFooter className="p-0">
        <BaseButton>Ver detalhes</BaseButton>
      </CardFooter>
    </Card>
  );
};
