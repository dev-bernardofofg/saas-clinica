import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputMask } from "@react-input/mask";
import { Control, FieldValues, Path } from "react-hook-form";

type MaskedInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  mask: string;
  replacement?: Record<string, RegExp>;
  placeholder?: string;
  description?: string;
};

export function MaskedInput<T extends FieldValues>({
  control,
  name,
  label,
  mask,
  replacement = { 9: /\d/ },
  placeholder,
  description,
}: MaskedInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <InputMask
              mask={mask}
              replacement={replacement}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder={placeholder}
              id={field.name}
              className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
