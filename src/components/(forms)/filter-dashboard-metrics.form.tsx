"use client";

import { parseISO } from "date-fns";
import { parseAsIsoDate, useQueryState } from "nuqs";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

import { BaseDateRangePicker } from "@/components/(bases)/(inputs)/base-date-range-picker";
import { BaseForm } from "@/components/(bases)/base-form";
import { Form } from "@/components/ui/form";
import {
  filterDashboardMetricsDefaultValues,
  FilterDashboardMetricsSchema,
} from "@/schemas/dashboard.schema";

export const FilterDashboardMetricsForm = () => {
  const form = useForm<FilterDashboardMetricsSchema>({
    defaultValues: filterDashboardMetricsDefaultValues,
  });

  const [from, setFrom] = useQueryState(
    "from",
    parseAsIsoDate.withDefault(new Date()),
  );

  const [to, setTo] = useQueryState(
    "to",
    parseAsIsoDate.withDefault(new Date()),
  );

  const handleFilterMetrics = useCallback(
    (data: FilterDashboardMetricsSchema) => {
      if (data?.from) {
        setFrom(parseISO(data.from), {
          shallow: false,
        });
      }
      if (data?.to) {
        setTo(parseISO(data.to), {
          shallow: false,
        });
      }
    },
    [setFrom, setTo],
  );

  const date = {
    from,
    to,
  };

  useEffect(() => {
    const subscription = form.watch((_, { name }) => {
      if (name === "from" || name === "to") {
        form.handleSubmit(handleFilterMetrics)();
      }
    });

    return () => subscription.unsubscribe();
  }, [form, handleFilterMetrics]);

  return (
    <Form {...form}>
      <BaseForm onSubmit={form.handleSubmit(handleFilterMetrics)}>
        <BaseDateRangePicker
          control={form.control}
          fromFieldName="from"
          toFieldName="to"
          label="Período"
          placeholder="Selecione o período"
          isDisable={false}
          defaultValue={date}
        />
      </BaseForm>
    </Form>
  );
};
