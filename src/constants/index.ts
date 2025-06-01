export enum Medicalspeciality {
  ALERGOLOGIA = "Alergologia",
  ANESTESIOLOGIA = "Anestesiologia",
  ANGIOLOGIA = "Angiologia",
  CANCEROLOGIA = "Cancerologia",
  CARDIOLOGIA = "Cardiologia",
  CIRURGIA_CARDIOVASCULAR = "Cirurgia Cardiovascular",
  CIRURGIA_CABECA_PESCOCO = "Cirurgia de Cabeça e Pescoço",
  CIRURGIA_DIGESTIVA = "Cirurgia do Aparelho Digestivo",
  CIRURGIA_GERAL = "Cirurgia Geral",
  CIRURGIA_PEDIATRICA = "Cirurgia Pediátrica",
  CIRURGIA_PLASTICA = "Cirurgia Plástica",
  CIRURGIA_TORACICA = "Cirurgia Torácica",
  CIRURGIA_VASCULAR = "Cirurgia Vascular",
  CLINICA_MEDICA = "Clínica Médica",
  DERMATOLOGIA = "Dermatologia",
  ENDOCRINOLOGIA = "Endocrinologia e Metabologia",
  ENDOSCOPIA = "Endoscopia",
  GASTROENTEROLOGIA = "Gastroenterologia",
  GERIATRIA = "Geriatria",
  GINECOLOGIA_OBSTETRICIA = "Ginecologia e Obstetrícia",
  HEMATOLOGIA = "Hematologia e Hemoterapia",
  HEPATOLOGIA = "Hepatologia",
  HOMEOPATIA = "Homeopatia",
  INFECTOLOGIA = "Infectologia",
  MASTOLOGIA = "Mastologia",
  MEDICINA_DE_EMERGENCIA = "Medicina de Emergência",
  MEDICINA_DO_ESPORTO = "Medicina do Esporte",
  MEDICINA_DO_TRABALHO = "Medicina do Trabalho",
  MEDICINA_DE_FAMILIA = "Medicina de Família e Comunidade",
  MEDICINA_FISICA_REABILITACAO = "Medicina Física e Reabilitação",
  MEDICINA_INTENSIVA = "Medicina Intensiva",
  MEDICINA_LEGAL = "Medicina Legal e Perícia Médica",
  NEFROLOGIA = "Nefrologia",
  NEUROCIRURGIA = "Neurocirurgia",
  NEUROLOGIA = "Neurologia",
  NUTROLOGIA = "Nutrologia",
  OFTALMOLOGIA = "Oftalmologia",
  ONCOLOGIA_CLINICA = "Oncologia Clínica",
  ORTOPEDIA_TRAUMATOLOGIA = "Ortopedia e Traumatologia",
  OTORRINOLARINGOLOGIA = "Otorrinolaringologia",
  PATOLOGIA = "Patologia",
  PATOLOGIA_CLINICA = "Patologia Clínica/Medicina Laboratorial",
  PEDIATRIA = "Pediatria",
  PNEUMOLOGIA = "Pneumologia",
  PSIQUIATRIA = "Psiquiatria",
  RADIOLOGIA = "Radiologia e Diagnóstico por Imagem",
  RADIOTERAPIA = "Radioterapia",
  REUMATOLOGIA = "Reumatologia",
  UROLOGIA = "Urologia",
}

export const medicalSpecialties = Object.entries(Medicalspeciality).map(
  ([key, value]) => ({
    value: Medicalspeciality[key as keyof typeof Medicalspeciality],
    label: value,
  }),
);

export const DayOfWeek = {
  0: "Segunda-feira",
  1: "Terça-feira",
  2: "Quarta-feira",
  3: "Quinta-feira",
  4: "Sexta-feira",
  5: "Sábado",
  6: "Domingo",
};

export const daysOfWeek = Object.entries(DayOfWeek).map(([key, value]) => ({
  value: Number(key),
  label: value,
}));

type Option = { label: string; value: string | number };

type OptionGroup = {
  label: string;
  options: Option[];
};

export const timeOfMorning: OptionGroup = {
  label: "Manhã",
  options: [
    { value: "05:00:00", label: "05:00" },
    { value: "05:30:00", label: "05:30" },
    { value: "06:00:00", label: "06:00" },
    { value: "06:30:00", label: "06:30" },
    { value: "07:00:00", label: "07:00" },
    { value: "07:30:00", label: "07:30" },
    { value: "08:00:00", label: "08:00" },
    { value: "08:30:00", label: "08:30" },
    { value: "09:00:00", label: "09:00" },
    { value: "09:30:00", label: "09:30" },
    { value: "10:00:00", label: "10:00" },
    { value: "10:30:00", label: "10:30" },
    { value: "11:00:00", label: "11:00" },
    { value: "11:30:00", label: "11:30" },
    { value: "12:00:00", label: "12:00" },
    { value: "12:30:00", label: "12:30" },
  ],
};

export const timeOfAfternoon: OptionGroup = {
  label: "Tarde",
  options: [
    { value: "13:00:00", label: "13:00" },
    { value: "13:30:00", label: "13:30" },
    { value: "14:00:00", label: "14:00" },
    { value: "14:30:00", label: "14:30" },
    { value: "15:00:00", label: "15:00" },
    { value: "15:30:00", label: "15:30" },
    { value: "16:00:00", label: "16:00" },
    { value: "16:30:00", label: "16:30" },
    { value: "17:00:00", label: "17:00" },
    { value: "17:30:00", label: "17:30" },
    { value: "18:00:00", label: "18:00" },
    { value: "18:30:00", label: "18:30" },
  ],
};

export const timeOfEvening: OptionGroup = {
  label: "Noite",
  options: [
    { value: "19:00:00", label: "19:00" },
    { value: "19:30:00", label: "19:30" },
    { value: "20:00:00", label: "20:00" },
    { value: "20:30:00", label: "20:30" },
    { value: "21:00:00", label: "21:00" },
    { value: "21:30:00", label: "21:30" },
    { value: "22:00:00", label: "22:00" },
    { value: "22:30:00", label: "22:30" },
    { value: "23:00:00", label: "23:00" },
    { value: "23:30:00", label: "23:30" },
  ],
};

export const timeOptionsGrouped: OptionGroup[] = [
  timeOfMorning,
  timeOfAfternoon,
  timeOfEvening,
];
