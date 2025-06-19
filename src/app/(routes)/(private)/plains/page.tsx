import PricingCard from "@/components/(bases)/(cards)/card-pricing";
import { Header } from "@/components/(layouts)/header";
import { Fade } from "@/components/(motions)/fade";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const Plains = async () => {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/sign-in");
  }

  if (!session.clinic?.id) {
    redirect("/clinic-form");
  }

  return (
    <Fade>
      <Header title="Planos" description="Gerencie os planos da sua clínica" />

      <div className="grid grid-cols-4 gap-4">
        <PricingCard
          title="Free"
          description="Para profissionais autônomos ou pequenas clínicas"
          price="R$0"
          period="/ mês"
          features={[
            "Cadastro de até 1 médico",
            "Agendamentos limitados",
            "Métricas básicas",
            "Cadastro de pacientes limitados",
            "Confirmação manual",
            "Suporte via e-mail",
          ]}
          active={session.plan === "free"}
          email={session.email ?? undefined}
          plan="free"
          userCurrentPlan={session.plan}
        />
        <PricingCard
          title="Essential"
          description="Para profissionais autônomos ou pequenas clínicas"
          price="R$59"
          period="/ mês"
          features={[
            "Cadastro de até 3 médicos",
            "Agendamentos ilimitados",
            "Métricas básicas",
            "Cadastro de pacientes",
            "Confirmação manual",
            "Suporte via e-mail",
          ]}
          active={session.plan === "initial"}
          email={session.email ?? undefined}
          plan="initial"
          userCurrentPlan={session.plan}
        />
      </div>
    </Fade>
  );
};

export default Plains;
