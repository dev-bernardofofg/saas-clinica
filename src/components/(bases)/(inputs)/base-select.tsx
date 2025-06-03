import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import type { Control, FieldValues, Path } from "react-hook-form";

type Option = { label: string; value: string | number; available?: boolean };
type OptionGroup = { label: string; options: Option[] };

export interface IBaseSelect<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  options?: Option[];
  optionGroups?: OptionGroup[];
  description?: string;
  disabled?: string | boolean;
  selectDate?: string | boolean;
}

export const BaseSelect = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Selecione uma opção",
  options = [],
  optionGroups = [],
  description,
  disabled = false,
  selectDate = false,
}: IBaseSelect<T>) => {
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
            <Select
              value={field.value ? String(field.value) : ""}
              onValueChange={field.onChange}
              disabled={Boolean(disabled || selectDate)}
            >
              <SelectTrigger className="h-9 w-full truncate">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {optionGroups.length > 0
                  ? optionGroups.map((group) => (
                      <SelectGroup key={group.label}>
                        <SelectLabel>{group.label}</SelectLabel>
                        {group.options.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={String(option.value)}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))
                  : options.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={String(option.value)}
                        className="truncate"
                        disabled={option.available === false}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
              </SelectContent>
            </Select>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
};
