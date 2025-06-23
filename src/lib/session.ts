import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  clinic?: {
    id: string;
    name: string;
  };
  plan: "free" | "initial";
};

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (!session.user.clinic) {
    redirect("/clinic-form");
  }

  return session.user as SessionUser;
}

export async function getCurrentClinicId() {
  const user = await getCurrentUser();

  if (!user.clinic?.id) {
    redirect("/clinic-form");
  }

  return user.clinic.id;
}

export async function getCurrentClinic() {
  const user = await getCurrentUser();

  if (!user.clinic) {
    redirect("/clinic-form");
  }

  return user.clinic;
}
