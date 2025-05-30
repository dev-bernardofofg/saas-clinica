import { BaseBreadcrumb } from "@/components/(bases)/base-breadcrumb";
import { AppSidebar } from "@/components/(layouts)/(sidebar)/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const LayoutPrivate = async ({ children }: { children: React.ReactNode }) => {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user) {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
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
