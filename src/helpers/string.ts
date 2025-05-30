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

const weekDaysOrder = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

export function formatDays(days: string[]): string {
  if (!days.length) return "";

  const indexes = days
    .map((day) => weekDaysOrder.indexOf(day))
    .sort((a, b) => a - b);

  const isConsecutive = indexes.every((val, i, arr) =>
    i === 0 ? true : val === arr[i - 1] + 1,
  );

  if (isConsecutive && indexes.length > 1) {
    const first = weekDaysOrder[indexes[0]];
    const last = weekDaysOrder[indexes[indexes.length - 1]];
    return `${first} a ${last}`;
  }

  if (days.length === 2) return days.join(" e ");

  return days.slice(0, -1).join(", ") + " e " + days[days.length - 1];
}

export function formatTimes(times: string[]): string {
  if (!times.length) return "";

  const toMinutes = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const sorted = times.sort((a, b) => toMinutes(a) - toMinutes(b));
  const indexes = sorted.map(toMinutes);

  const isConsecutive = indexes.every((val, i, arr) =>
    i === 0 ? true : val === arr[i - 1] + 60,
  );

  if (isConsecutive && indexes.length > 1) {
    return `${sorted[0]} às ${sorted[sorted.length - 1]}`;
  }

  if (times.length === 2) return sorted.join(" e ");

  return sorted.slice(0, -1).join(", ") + " e " + sorted[sorted.length - 1];
}

export const getInitialsName = (name: string) => {
  return name
    .split(" ")
    .map((name) => name[0])
    .join("");
};
