import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { CreateClinicsForm } from "@/components/(forms)/create-clinics.form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { auth } from "@/lib/auth";

const ClinicFormPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  // Se o usuário já tem uma clínica, redirecionar para dashboard
  if (session.user.clinic) {
    redirect("/dashboard");
  }

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicione sua clínica</DialogTitle>
          <DialogDescription>
            Preencha o formulário abaixo para adicionar sua clínica.
          </DialogDescription>
        </DialogHeader>
        <CreateClinicsForm />
      </DialogContent>
    </Dialog>
  );
};

export default ClinicFormPage;
