"use client";

import { motion } from "framer-motion";
import { Check, Eye, EyeOff, LucideIcon, Pencil, X } from "lucide-react";
import { useState } from "react";
import { Control, FieldValues, Path, useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type BaseInputProps<T extends FieldValues> = {
  control?: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  Icon?: LucideIcon;
  type?: "text" | "email" | "password" | "number" | "date";
  inline?: boolean;
};

export function BaseInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  Icon,
  type = "text",
  inline = false,
}: BaseInputProps<T>) {
  const methods = useFormContext<T>();
  const finalControl = control || methods.control;

  const [isEditing, setIsEditing] = useState(!inline);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

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
              {!isEditing && inline ? (
                <div
                  className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-2"
                  onClick={() => setIsEditing(true)}
                >
                  {Icon && <Icon className="size-4" />}
                  <span className="text-sm">{field.value || placeholder}</span>
                  <Pencil className="ml-2 size-4" />
                </div>
              ) : (
                <div className="relative flex items-center">
                  <div className="text-muted-foreground absolute left-3">
                    {Icon && <Icon className="size-4" />}
                  </div>
                  <Input
                    type={isPassword && !showPassword ? "password" : type}
                    {...field}
                    placeholder={placeholder}
                    className={cn(Icon && "pl-10", isPassword && "pr-10")}
                  />
                  {isPassword && (
                    <button
                      type="button"
                      tabIndex={-1}
                      className="text-muted-foreground hover:text-foreground absolute right-3 transition-colors"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  )}
                  {inline && (
                    <div className="absolute right-2 flex gap-2">
                      <button
                        type="button"
                        className="transition-colors hover:text-green-400"
                        onClick={() => setIsEditing(false)}
                      >
                        <Check className="size-4" />
                      </button>
                      <button
                        type="button"
                        className="transition-colors hover:text-red-400"
                        onClick={() => {
                          setIsEditing(false);
                          field.onChange(field.value);
                        }}
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}
