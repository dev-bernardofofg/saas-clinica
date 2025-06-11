import { endOfDay, format, startOfDay, subMonths } from "date-fns";
import { z } from "zod";

const today = new Date();
const oneMonthFromToday = subMonths(today, 1);

export const filterDashboardMetricsSchema = z.object({
  from: z.string().min(1, "Data de início é obrigatória"),
  to: z.string().min(1, "Data de fim é obrigatória"),
});

export const filterDashboardMetricsDefaultValues = {
  from: format(startOfDay(oneMonthFromToday), "yyyy-MM-dd"),
  to: format(endOfDay(today), "yyyy-MM-dd"),
};

export type FilterDashboardMetricsSchema = z.infer<
  typeof filterDashboardMetricsSchema
>;
