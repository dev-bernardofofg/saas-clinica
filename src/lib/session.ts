import { headers } from "next/headers";

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
    throw new Error("Clinic not found");
  }

  return session.user as SessionUser;
}

export async function getCurrentClinicId() {
  const user = await getCurrentUser();

  if (!user.clinic?.id) {
    throw new Error("No clinic found for current user");
  }

  return user.clinic.id;
}

export async function getCurrentClinic() {
  const user = await getCurrentUser();

  if (!user.clinic) {
    throw new Error("No clinic found for current user");
  }

  return user.clinic;
}
