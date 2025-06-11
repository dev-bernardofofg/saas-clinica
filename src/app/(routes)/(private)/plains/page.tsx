import PricingCard from "@/components/(bases)/(cards)/card-pricing";
import { Header } from "@/components/(layouts)/header";
import { Fade } from "@/components/(motions)/fade";

const Plains = () => {
  return (
    <Fade>
      <Header title="Planos" description="Gerencie os planos da sua clínica" />

      <div className="grid grid-cols-4 gap-4">
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
          active
          hasSubscription
        />
      </div>
    </Fade>
  );
};

export default Plains;
