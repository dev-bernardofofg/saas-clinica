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
import { auth } from "@/lib/auth";
import { EllipsisVertical } from "lucide-react";
import { headers } from "next/headers";

export const SidebarUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <Avatar>
                <AvatarImage src="https://github.com/dev-bernardofofg.png" />
                <AvatarFallback>{session?.user.name}</AvatarFallback>
              </Avatar>{" "}
              <div className="flex flex-col">
                <span>{session?.user?.clinic?.name}</span>
                <span className="text-muted-foreground text-xs">
                  {session?.user.name}
                </span>
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
