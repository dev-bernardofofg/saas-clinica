"use client";

import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  CalendarDays,
  Gem,
  LayoutDashboard,
  Stethoscope,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SidebarUpgradeAlert } from "./sidebar-upgrade-alert";
import { SidebarUser } from "./sidebar-user";
import { SidebarSection } from "./siderbar-section";

interface SidebarWithAlertProps {
  plan: "free" | "initial";
  currentCounts: {
    doctors: number;
    patients: number;
    appointments: number;
  };
  userName?: string | null;
  clinicName?: string | null;
  avatarUrl?: string | null;
}

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

export function SidebarWithAlert({
  plan,
  currentCounts,
  userName,
  clinicName,
  avatarUrl,
}: SidebarWithAlertProps) {
  return (
    <>
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

        {/* Alerta de upgrade */}
        <SidebarUpgradeAlert plan={plan} currentCounts={currentCounts} />
      </SidebarContent>

      <SidebarSeparator />
      <SidebarFooter>
        <SidebarUser
          name={userName}
          clinicName={clinicName}
          avatarUrl={avatarUrl}
        />
      </SidebarFooter>
    </>
  );
}
