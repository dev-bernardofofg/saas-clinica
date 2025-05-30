import {
  CalendarDays,
  Gem,
  LayoutDashboard,
  Stethoscope,
  UserRound,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { SidebarUser } from "./sidebar-user";
import { SidebarSection } from "./siderbar-section";

const menuPrincipal = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Agendamentos",
    url: "/appointments",
    icon: CalendarDays,
  },
  {
    title: "Médicos",
    url: "/doctors",
    icon: Stethoscope,
  },
  {
    title: "Pacientes",
    url: "/patients",
    icon: UserRound,
  },
];

const others = [
  {
    title: "Planos",
    url: "/plains",
    icon: Gem,
  },
];

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/dashboard" className="p-4">
          <Image
            src="/brand-logo.svg"
            alt="logo doutor agenda"
            width={136}
            height={28}
          />
        </Link>
      </SidebarHeader>
      <SidebarSeparator />

      <SidebarContent>
        <SidebarSection title="Menu principal" items={menuPrincipal} />
        <SidebarSection title="Outros" items={others} />
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>
    </Sidebar>
  );
};
