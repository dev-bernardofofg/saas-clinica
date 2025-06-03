import {
  Baby,
  Bone,
  Brain,
  Hand,
  HeartPulse,
  LucideIcon,
  Stethoscope,
  Venus,
} from "lucide-react";

export const doctorspeciality = (speciality: string): LucideIcon => {
  switch (speciality) {
    case "pediatria":
      return Baby;
    case "cardiologia":
      return HeartPulse;
    case "dermatologia":
      return Hand;
    case "ortopedia":
      return Bone;
    case "psiquiatria":
      return Brain;
    case "neurologia":
      return Brain;
    case "ginecologia":
      return Venus;

    default:
      return Stethoscope;
  }
};

const weekDaysOrder: Record<number, string> = {
  0: "Segunda-feira",
  1: "Terça-feira",
  2: "Quarta-feira",
  3: "Quinta-feira",
  4: "Sexta-feira",
  5: "Sábado",
  6: "Domingo",
};

export function formatDays(days: number[]): string {
  if (!days.length) return "";

  // Ordena os dias numericamente
  const sortedDays = [...days].sort((a, b) => a - b);

  // Verifica se são dias consecutivos
  const isConsecutive = sortedDays.every((val, i, arr) =>
    i === 0 ? true : val === arr[i - 1] + 1,
  );

  if (isConsecutive && sortedDays.length > 1) {
    const first = weekDaysOrder[sortedDays[0]];
    const last = weekDaysOrder[sortedDays[sortedDays.length - 1]];
    return `${first} a ${last}`;
  }

  // Caso contrário, retorna formatado com "e"
  const namedDays = sortedDays.map((d) => weekDaysOrder[d]);
  if (namedDays.length === 2) return namedDays.join(" a ");
  return (
    namedDays.slice(0, -1).join(", ") + "e " + namedDays[namedDays.length - 1]
  );
}

export function formatTimes(times: string[]): string {
  if (!times.length) return "";

  const toMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
  };

  const sorted = times
    .sort((a, b) => toMinutes(a) - toMinutes(b))
    .map(formatTime);
  const indexes = sorted.map((time) => toMinutes(time));

  const isConsecutive = indexes.every((val, i, arr) =>
    i === 0 ? true : val === arr[i - 1] + 60,
  );

  if (isConsecutive && indexes.length > 1) {
    return `${sorted[0]} às ${sorted[sorted.length - 1]}`;
  }

  if (times.length === 2) return sorted.join(" às ");

  return sorted.slice(0, -1).join(", ") + " e " + sorted[sorted.length - 1];
}

export const getInitialsName = (name: string) => {
  return name
    .split(" ")
    .map((name) => name[0])
    .join("");
};
