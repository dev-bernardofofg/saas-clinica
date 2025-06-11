"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormDescription, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Control, FieldValues, Path, useFormContext } from "react-hook-form";

type BaseDateRangePickerProps<T extends FieldValues> = {
  control?: Control<T>;
  fromFieldName: Path<T>;
  toFieldName: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  disableFutureDates?: boolean;
  disablePastDates?: boolean;
  minDate?: Date;
  maxDate?: Date;
  fromYear?: number;
  toYear?: number;
  isDateAvaliable?: (date: Date) => boolean;
  isDisable?: boolean;
  defaultValue?: {
    from: Date;
    to: Date;
  };
};

export function BaseDateRangePicker<T extends FieldValues>({
  control,
  fromFieldName,
  toFieldName,
  label,
  placeholder = "Selecione o período",
  description,
  disableFutureDates = false,
  disablePastDates = false,
  minDate,
  maxDate,
  fromYear = 1900,
  toYear = new Date().getFullYear(),
  isDateAvaliable,
  isDisable = false,
  defaultValue,
}: BaseDateRangePickerProps<T>) {
  const methods = useFormContext<T>();
  const finalControl = control || methods.control;
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(undefined);
  const [date, setDate] = useState<DateRange | undefined>(
    defaultValue ? { from: defaultValue.from, to: defaultValue.to } : undefined,
  );
  const years = Array.from(
    { length: toYear - fromYear + 1 },
    (_, i) => toYear - i,
  );

  const currentMonth = calendarDate || new Date();
  const currentYear = currentMonth.getFullYear();
  const currentMonthName = format(currentMonth, "MMMM", { locale: ptBR });

  const handlePreviousMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() - 1);
    setCalendarDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + 1);
    setCalendarDate(newDate);
  };

  return (
    <div className="grid gap-2">
      {label && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-between"
        >
          <FormLabel>{label}</FormLabel>
          <FormMessage />
        </motion.div>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
            disabled={isDisable}
          >
            <CalendarIcon className="mr-2 size-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(
                    new Date(date.from.setUTCHours(3, 0, 0, 0)),
                    "dd 'de' MMMM 'de' yyyy",
                    {
                      locale: ptBR,
                    },
                  )}{" "}
                  -{" "}
                  {format(
                    new Date(date.to.setUTCHours(3, 0, 0, 0)),
                    "dd 'de' MMMM 'de' yyyy",
                    {
                      locale: ptBR,
                    },
                  )}
                </>
              ) : (
                format(
                  new Date(date.from.setUTCHours(3, 0, 0, 0)),
                  "dd 'de' MMMM 'de' yyyy",
                  {
                    locale: ptBR,
                  },
                )
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex items-center justify-between border-b p-3">
            <div className="flex items-center gap-2">
              <Select
                value={currentYear.toString()}
                onValueChange={(year) => {
                  const newDate = new Date(currentMonth);
                  newDate.setFullYear(parseInt(year));
                  setCalendarDate(newDate);
                }}
              >
                <SelectTrigger className="h-8 w-[90px]">
                  <SelectValue placeholder="Ano" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem
                      key={year}
                      value={year.toString()}
                      className="cursor-pointer"
                    >
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="text-sm font-medium capitalize">
                {currentMonthName}
              </div>
            </div>

            <div className="flex gap-1">
              <Button
                variant="outline"
                className="h-7 w-7 p-0"
                onClick={handlePreviousMonth}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                className="h-7 w-7 p-0"
                onClick={handleNextMonth}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
          <div className="p-3">
            <Calendar
              mode="range"
              month={calendarDate}
              onMonthChange={setCalendarDate}
              selected={date}
              onSelect={(range) => {
                setDate(range);
                if (range?.from) {
                  const fromDate = new Date(range.from);
                  fromDate.setUTCHours(3, 0, 0, 0);
                  methods.setValue(
                    fromFieldName,
                    format(fromDate, "yyyy-MM-dd") as any,
                  );
                } else {
                  methods.setValue(fromFieldName, "" as any);
                }
                if (range?.to) {
                  const toDate = new Date(range.to);
                  toDate.setUTCHours(3, 0, 0, 0);
                  methods.setValue(
                    toFieldName,
                    format(toDate, "yyyy-MM-dd") as any,
                  );
                } else {
                  methods.setValue(toFieldName, "" as any);
                }
              }}
              disabled={(date) => {
                if (disableFutureDates && date > new Date()) return true;
                if (disablePastDates && date < new Date()) return true;
                if (minDate && date < minDate) return true;
                if (maxDate && date > maxDate) return true;
                if (isDateAvaliable && !isDateAvaliable(date)) return true;
                return false;
              }}
              numberOfMonths={1}
              initialFocus
              locale={ptBR}
              showOutsideDays
              fixedWeeks
              classNames={{
                months: "space-y-4",
                head_row: "flex",
                head_cell: cn(
                  "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem] capitalize",
                ),
                row: "flex w-full mt-2",
                cell: cn(
                  "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                  "[&:has([aria-selected])]:bg-accent",
                ),
                day: cn(
                  "h-8 w-8 p-0 font-normal",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus:bg-accent focus:text-accent-foreground focus:outline-none",
                ),
                day_range_start: "day-range-start",
                day_range_end: "day-range-end",
                day_selected: cn(
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                  "focus:bg-primary focus:text-primary-foreground",
                ),
                day_today: "bg-accent/50 text-accent-foreground",
                day_outside: "text-muted-foreground opacity-50",
                day_disabled: "text-muted-foreground opacity-50",
                day_hidden: "invisible",
                nav: "hidden",
                caption: "hidden",
                table: "w-full border-collapse space-y-1",
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
      {description && <FormDescription>{description}</FormDescription>}
    </div>
  );
}
