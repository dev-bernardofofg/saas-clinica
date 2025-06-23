"use client";

import { EllipsisVertical } from "lucide-react";

import { BaseButton } from "@/components/(bases)/base-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface SidebarUserProps {
  name?: string | null;
  clinicName?: string | null;
  avatarUrl?: string | null;
}

export const SidebarUser = ({
  name,
  clinicName,
  avatarUrl,
}: SidebarUserProps) => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <Avatar>
                <AvatarImage src={avatarUrl || undefined} />
                <AvatarFallback>{name}</AvatarFallback>
              </Avatar>{" "}
              <div className="flex flex-col">
                <span>{clinicName}</span>
                <span className="text-muted-foreground text-xs">{name}</span>
              </div>
              <EllipsisVertical className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
          >
            <DropdownMenuItem>
              <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BaseButton
                clickAction="sign-out"
                variant="ghost"
                className="h-fit p-0"
              >
                Sair
              </BaseButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
