"use client";

import { motion } from "framer-motion";
import { LucideIcon, Phone } from "lucide-react";
import { Control, FieldValues, Path, useFormContext } from "react-hook-form";
import { PatternFormat, PatternFormatProps } from "react-number-format";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type BasePhoneInputProps<T extends FieldValues> = {
  control?: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  Icon?: LucideIcon;
};

const PhoneInput = ({
  value,
  onChange,
  className,
  placeholder,
  ...props
}: PatternFormatProps<InputProps>) => (
  <PatternFormat
    customInput={Input}
    value={value}
    onValueChange={(values) => {
      const syntheticEvent = {
        target: { value: values.value },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(syntheticEvent);
    }}
    className={className}
    placeholder={placeholder}
    {...props}
  />
);

export function BasePhoneInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "(99) 99999-9999",
  description,
  Icon = Phone,
}: BasePhoneInputProps<T>) {
  const methods = useFormContext<T>();
  const finalControl = control || methods.control;

  return (
    <FormField
      control={finalControl}
      name={name}
      render={({ field }) => (
        <FormItem className="relative w-full">
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

          <FormControl>
            <div className="relative">
              <div className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                <Icon className="size-4" />
              </div>
              <PhoneInput
                {...field}
                className={cn("pl-10")}
                placeholder={placeholder}
                format="(##) #####-####"
              />
            </div>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}
