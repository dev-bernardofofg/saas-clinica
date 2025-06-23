import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

import { BaseBreadcrumb } from "@/components/(bases)/base-breadcrumb";
import { SidebarWithAlert } from "@/components/(layouts)/(sidebar)/sidebar-with-alert";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { db } from "@/db";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

const LayoutPrivate = async ({ children }: { children: React.ReactNode }) => {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user) {
    redirect("/");
  }

  // Buscar contadores atuais para o alerta do sidebar
  let currentCounts = {
    doctors: 0,
    patients: 0,
    appointments: 0,
  };

  let userName = session.user.name || "";
  let clinicName = session.user.clinic?.name || "";
  let avatarUrl = session.user.image || undefined;

  // Se o usuário tem clínica, buscar contadores
  if (session.user.clinic?.id) {
    const [doctors, patients, appointments] = await Promise.all([
      db.query.doctorsTable.findMany({
        where: eq(doctorsTable.clinicId, session.user.clinic.id),
      }),
      db.query.patientsTable.findMany({
        where: eq(patientsTable.clinicId, session.user.clinic.id),
      }),
      db.query.appointmentsTable.findMany({
        where: eq(appointmentsTable.clinicId, session.user.clinic.id),
      }),
    ]);

    currentCounts = {
      doctors: doctors.length,
      patients: patients.length,
      appointments: appointments.length,
    };
    userName = session.user.name || userName;
    clinicName = session.user.clinic?.name || clinicName;
    avatarUrl = avatarUrl;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarWithAlert
          plan={session.user.plan || "free"}
          currentCounts={currentCounts}
          userName={userName}
          clinicName={clinicName}
          avatarUrl={avatarUrl}
        />
      </Sidebar>
      <main className="w-full bg-gray-100">
        <div className="flex flex-col px-6 py-8">
          <BaseBreadcrumb />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default LayoutPrivate;
