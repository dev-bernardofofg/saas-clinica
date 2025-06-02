"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export const BaseBreadcrumb = () => {
  const pathname = usePathname();

  const pathnames = pathname.split("/").filter((item) => item);

  const translate = (path: string) => {
    switch (path) {
      case "dashboard":
        return "Dashboard";
      case "clinic-form":
        return "Cadastro de Clínica";
      case "plains":
        return "Planos";
      case "doctors":
        return "Médicos";
      case "patients":
        return "Pacientes";
      default:
        return path;
    }
  };

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Menu Principal</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-blue-700" />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components" className="text-blue-700">
            {translate(pathnames[0])}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
