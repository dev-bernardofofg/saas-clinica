"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ForwardedRef, forwardRef } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { NumericFormat, NumericFormatProps } from "react-number-format";

type BaseCurrencyInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  className?: string;
} & Omit<NumericFormatProps, "customInput" | "value" | "onValueChange">;

function InnerBaseCurrencyInput<T extends FieldValues>(
  { control, name, label, className, ...rest }: BaseCurrencyInputProps<T>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <FormField
      control={control}
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
            <NumericFormat
              {...rest}
              value={field.value}
              onValueChange={(values) => {
                field.onChange(values.floatValue);
              }}
              decimalScale={2}
              fixedDecimalScale
              decimalSeparator=","
              allowNegative={false}
              allowLeadingZeros={false}
              thousandSeparator="."
              prefix="R$"
              customInput={Input}
              className={cn(className)}
              getInputRef={ref}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export const BaseCurrencyInput = forwardRef(InnerBaseCurrencyInput) as <
  T extends FieldValues,
>(
  props: BaseCurrencyInputProps<T> & { ref?: ForwardedRef<HTMLInputElement> },
) => ReturnType<typeof InnerBaseCurrencyInput>;
