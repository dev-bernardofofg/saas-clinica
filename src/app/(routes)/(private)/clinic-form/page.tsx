import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { CreateClinicsForm } from "@/components/(forms)/create-clinics.form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { db } from "@/db";
import { usersToClinicsTable } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";

const ClinicFormPage = async () => {
  const session = await getCurrentUser();

  const clinics = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session.id),
  });

  if (clinics.length > 0) {
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
