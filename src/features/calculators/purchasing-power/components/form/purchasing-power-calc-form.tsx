"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useInflation } from "@/src/services/INFLATION/services/inflation-query";
import {
  calculatePurchasingPower,
  PurchasingPowerResultType,
} from "@/src/features/economic-calcs/purchasing-power";
import {
  PurchasingPowerFormSchema,
  PurchasingPowerFormType,
} from "../../schemas/purchasing-power-form-schema";
import { getDataBounds } from "@/src/utils/get-data-bounds";
import { useYearOptions } from "@/src/hooks/use-year-options";
import { useMonthOptions } from "@/src/hooks/use-month-options";
import { DateRangeSelector } from "@/src/components/ui/form/date-range-selector";
import { AmountInput } from "@/src/components/ui/form/amount-input";
import { SubmitButton } from "@/src/components/ui/form/submit-btn";
import { FormTitle } from "@/src/components/ui/form/form-title";
import { PurchasingPowerResult } from "../purchasing-power-results";
import { Loader } from "@/src/components/ui/loader";

export const PurchasingPowerForm = () => {
  // Stores the calculation result to display below the form after submission
  const [results, setResults] = useState<PurchasingPowerResultType | null>(
    null,
  );

  // Fetch monthly inflation records from the BCRA API
  const { data: Inflation_data, isLoading, isError } = useInflation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<PurchasingPowerFormType>({
    resolver: zodResolver(PurchasingPowerFormSchema),
  });

  // Watch startYear and endYear to reactively filter the available month options
  const startYear = useWatch({ control, name: "startYear" });
  const endYear = useWatch({ control, name: "endYear" });

  // Extract the min/max year and month boundaries from the dataset
  const { startYearMin, startMonthMin, endYearMax, endMonthMax } =
    getDataBounds(Inflation_data);

  // Both start and end share the same full year range
  const startYearOptions = useYearOptions(Inflation_data);
  const endYearOptions = useYearOptions(Inflation_data);

  // Month options are filtered based on the selected year and the dataset boundaries
  const startMonthOptions = useMonthOptions(
    startYear,
    startYearMin,
    startMonthMin,
    endYearMax,
    endMonthMax,
  );
  const endMonthOptions = useMonthOptions(
    endYear,
    startYearMin,
    startMonthMin,
    endYearMax,
    endMonthMax,
  );

  // Once the inflation data is available, initialize the form with the full available range
  // startAmount and endAmount default to the same value so the user can compare from a baseline
  useEffect(() => {
    if (!Inflation_data) return;

    const start = new Date(Inflation_data.startDate);
    const end = new Date(Inflation_data.endDate);

    reset({
      startYear: start.getFullYear(),
      startMonth: start.getMonth() + 1, // getMonth() is 0-indexed
      endYear: end.getFullYear(),
      endMonth: end.getMonth() + 1,
      startAmount: 100000,
      endAmount: 100000,
    });
  }, [Inflation_data, reset]);

  // Run the purchasing power calculation and store the result for display
  const onSubmit = (data: PurchasingPowerFormType) => {
    if (Inflation_data) {
      const result = calculatePurchasingPower(
        data,
        Inflation_data.inflationRecord,
      );
      setResults(result);
    }
  };

  // Show loader while remote data is being fetched
  if (isLoading) {
    return <Loader />;
  }

  // Show error state if the fetch failed or returned no data
  if (!Inflation_data || isError) {
    return (
      <div className="text-center py-10">Error al intentar obtener datos</div>
    );
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto p-4 space-y-5"
      >
        <FormTitle title="Calculadora de poder adquisitivo" />

        {/* Start date: the month and year when the reference salary/amount was earned */}
        <DateRangeSelector
          label="Desde el inicio de"
          monthRegistration={register("startMonth", { valueAsNumber: true })}
          yearRegistration={register("startYear", { valueAsNumber: true })}
          monthOptions={startMonthOptions}
          yearOptions={startYearOptions}
          error={errors.startMonth?.message}
          selectKey="IPC-start"
        />

        {/* The amount earned or held at the start date */}
        <AmountInput
          label="El monto era de"
          registration={register("startAmount", {
            valueAsNumber: true,
            min: 0,
          })}
          error={errors.startAmount?.message}
          placeholder="Ej: 100000"
        />

        {/* End date: the month and year to compare purchasing power against */}
        <DateRangeSelector
          label="Hasta el final de"
          monthRegistration={register("endMonth", { valueAsNumber: true })}
          yearRegistration={register("endYear", { valueAsNumber: true })}
          monthOptions={endMonthOptions}
          yearOptions={endYearOptions}
          error={errors.endMonth?.message}
          selectKey="IPC-end"
        />

        {/* The amount earned or held at the end date, used to compare against the inflation-adjusted start amount */}
        <AmountInput
          label="El monto era de"
          registration={register("endAmount", { valueAsNumber: true, min: 0 })}
          error={errors.endAmount?.message}
          placeholder="Ej: 150000"
        />

        <SubmitButton label="Calcular" />
      </form>

      {/* Render the result panel only after a successful submission */}
      {results && <PurchasingPowerResult {...results} />}
    </div>
  );
};
