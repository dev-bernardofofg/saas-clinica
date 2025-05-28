import { BaseButton } from "@/components/(bases)/base-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div>
      DashboardPage
      <p>{session?.user?.email}</p>
      <BaseButton clickAction="sign-out">Sair</BaseButton>
    </div>
  );
};

export default DashboardPage;
