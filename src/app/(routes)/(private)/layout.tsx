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

  return <div>{children}</div>;
};

export default LayoutPrivate;
