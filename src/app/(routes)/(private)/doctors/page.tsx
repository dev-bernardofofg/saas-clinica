import { CardDoctor } from "@/components/(bases)/(cards)/card-doctor";
import { UpsertDoctorDialog } from "@/components/(dialog)/upsert-doctor";
import { Header } from "@/components/(layouts)/header";
import { Fade } from "@/components/(motions)/fade";

const DoctorsPage = () => {
  return (
    <Fade>
      <Header
        title="Médicos"
        description="Gerencie os médicos da sua clínica"
        actions={<UpsertDoctorDialog />}
      />

      <div className="grid grid-cols-4 gap-4">
        <CardDoctor
          name="Dr. João Silva"
          speciality="pediatria"
          cost={150}
          image="/doctors/joao-silva.jpg"
          days={["Segunda", "Quarta", "Sexta"]}
          time={["09:00", "10:00", "11:00"]}
        />
      </div>
    </Fade>
  );
};

export default DoctorsPage;
