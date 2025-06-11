import { formatCurrencyInCents } from "@/helpers/number";
import { LucideIcon } from "lucide-react";

interface BaseStatsProps {
  title: string;
  Icon: LucideIcon;
  value: number;
  type: "currency" | "number" | "percentage";
}

export const BaseStats = ({ title, Icon, value, type }: BaseStatsProps) => {
  const formattedValue = () => {
    switch (type) {
      case "currency":
        return formatCurrencyInCents(value);
      case "number":
        return value;
      case "percentage":
        return `${value}%`;
      default:
        return value;
    }
  };

  return (
    <div className="border-border flex flex-col justify-center gap-3 rounded-lg border bg-white px-4 py-5 shadow-xs">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center rounded-full bg-blue-100 p-2">
          <Icon className="text-primary size-4" />
        </div>
        <h3 className="text-muted-foreground font-semibold">{title}</h3>
      </div>
      <p className="text-2xl font-bold">{formattedValue()}</p>
    </div>
  );
};
