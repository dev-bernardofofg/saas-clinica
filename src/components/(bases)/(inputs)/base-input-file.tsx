import { ImagePlus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Control, FieldValues, Path, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type FileInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
  accept?: string;
};

export function FileInput<T extends FieldValues>({
  control,
  name,
  label,
  description,
  accept = "image/*",
}: FileInputProps<T>) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const fieldValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    if (!fieldValue) {
      setPreviewUrl(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  }, [fieldValue]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex flex-col gap-3">
              {previewUrl ? (
                <div className="bg-muted relative h-24 w-24 overflow-hidden rounded-lg border">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewUrl(null);
                      field.onChange(null);
                      if (fileRef.current) fileRef.current.value = "";
                    }}
                    className="absolute top-1 right-1 rounded-full bg-white p-1 shadow-sm"
                  >
                    <Trash2 className="text-destructive h-4 w-4" />
                  </button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileRef.current?.click()}
                  className="w-full justify-start gap-2"
                >
                  <ImagePlus className="h-4 w-4" />
                  Selecionar imagem
                </Button>
              )}

              <input
                ref={fileRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setPreviewUrl(reader.result as string);
                      field.onChange(reader.result); // base64
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
