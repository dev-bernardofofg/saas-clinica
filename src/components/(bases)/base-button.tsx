"use client";

import { Loader2, Lock, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

interface BaseButtonProps extends ComponentProps<typeof Button> {
  isLoading?: boolean;
  loadingText?: string;
  clickAction?: "default" | "sign-out" | "create" | "blocked";
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
      className={cn(
        "w-full space-x-3 hover:cursor-pointer",
        clickAction === "blocked" && "cursor-not-allowed",
        className,
      )}
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
        <>
          {clickAction === "create" && <Plus className="mr-2 h-4 w-4" />}
          {clickAction === "blocked" && <Lock className="mr-2 h-4 w-4" />}
          {children}
        </>
      )}
    </Button>
  );
};
