import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, Clock } from "lucide-react";
import { useState } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

type TimePickerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
};

export function TimePickerPopover<T extends FieldValues>({
  control,
  name,
  label,
  description,
}: TimePickerProps<T>) {
  const { field } = useController({ control, name });
  const [open, setOpen] = useState(false);

  const value = field.value || "--:--";

  const handleTimeChange = (hour: string, minute: string) => {
    const time = `${hour}:${minute}`;
    field.onChange(time);
    setOpen(false);
  };

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );
  const minutes = ["00", "15", "30", "45"];

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between text-sm font-normal"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="text-muted-foreground h-4 w-4" />
                    {value}
                  </div>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="max-h-64 w-[240px] overflow-y-auto rounded-xl shadow-xl"
                align="start"
                sideOffset={8}
              >
                {" "}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-muted-foreground text-xs">Hora</span>
                    {hours.map((h) => (
                      <Button
                        key={h}
                        variant="ghost"
                        className="w-full justify-center"
                        onClick={() =>
                          handleTimeChange(
                            h,
                            field.value?.split(":")[1] ?? "00",
                          )
                        }
                      >
                        {h}
                      </Button>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-muted-foreground text-xs">
                      Minuto
                    </span>
                    {minutes.map((m) => (
                      <Button
                        key={m}
                        variant="ghost"
                        className="w-full justify-center"
                        onClick={() =>
                          handleTimeChange(
                            field.value?.split(":")[0] ?? "00",
                            m,
                          )
                        }
                      >
                        {m}
                      </Button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
