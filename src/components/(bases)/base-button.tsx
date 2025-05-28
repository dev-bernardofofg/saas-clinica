"use client";

import { Loader2 } from "lucide-react";
import { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface BaseButtonProps extends ComponentProps<typeof Button> {
  isLoading?: boolean;
  loadingText?: string;
  clickAction?: "default" | "sign-out";
}

export const BaseButton = ({
  children,
  isLoading,
  loadingText,
  className,
  disabled,
  clickAction = "default",
  ...props
}: BaseButtonProps) => {
  const { push } = useRouter();
  return (
    <Button
      className={cn("w-full", className)}
      disabled={disabled || isLoading}
      onClick={async () => {
        if (clickAction === "sign-out") {
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                push("/");
              },
            },
          });
        }
      }}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText || children}
        </>
      ) : (
        children
      )}
    </Button>
  );
};
