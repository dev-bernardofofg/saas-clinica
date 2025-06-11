import { ChartConfig } from "@/components/ui/chart";

// Types
export type AppointmentChartData = {
  month: string;
  completed: number;
  cancelled: number;
  rescheduled: number;
};

export type RevenueChartData = {
  month: string;
  revenue: number;
  expenses: number;
};

export type PatientChartData = {
  month: string;
  newPatients: number;
  returningPatients: number;
};

// Chart Configs
export const appointmentChartConfig = {
  completed: {
    label: "Completed",
    color: "var(--success)",
  },
  cancelled: {
    label: "Cancelled",
    color: "var(--destructive)",
  },
  rescheduled: {
    label: "Rescheduled",
    color: "var(--warning)",
  },
} satisfies ChartConfig;

export const revenueChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--success)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--destructive)",
  },
} satisfies ChartConfig;

export const patientChartConfig = {
  newPatients: {
    label: "New Patients",
    color: "var(--primary)",
  },
  returningPatients: {
    label: "Returning Patients",
    color: "var(--secondary)",
  },
} satisfies ChartConfig;

// Mock Data
export const appointmentChartData: AppointmentChartData[] = [
  {
    month: "January",
    completed: 45,
    cancelled: 10,
    rescheduled: 5,
  },
  {
    month: "February",
    completed: 52,
    cancelled: 8,
    rescheduled: 7,
  },
  {
    month: "March",
    completed: 48,
    cancelled: 12,
    rescheduled: 9,
  },
  {
    month: "April",
    completed: 60,
    cancelled: 15,
    rescheduled: 8,
  },
  {
    month: "May",
    completed: 55,
    cancelled: 9,
    rescheduled: 6,
  },
  {
    month: "June",
    completed: 58,
    cancelled: 11,
    rescheduled: 8,
  },
];

export const revenueChartData: RevenueChartData[] = [
  {
    month: "January",
    revenue: 15000,
    expenses: 8000,
  },
  {
    month: "February",
    revenue: 18000,
    expenses: 8500,
  },
  {
    month: "March",
    revenue: 17000,
    expenses: 9000,
  },
  {
    month: "April",
    revenue: 20000,
    expenses: 9500,
  },
  {
    month: "May",
    revenue: 19000,
    expenses: 8800,
  },
  {
    month: "June",
    revenue: 22000,
    expenses: 9200,
  },
];

export const patientChartData: PatientChartData[] = [
  {
    month: "January",
    newPatients: 25,
    returningPatients: 40,
  },
  {
    month: "February",
    newPatients: 30,
    returningPatients: 45,
  },
  {
    month: "March",
    newPatients: 28,
    returningPatients: 42,
  },
  {
    month: "April",
    newPatients: 35,
    returningPatients: 48,
  },
  {
    month: "May",
    newPatients: 32,
    returningPatients: 50,
  },
  {
    month: "June",
    newPatients: 38,
    returningPatients: 52,
  },
];
