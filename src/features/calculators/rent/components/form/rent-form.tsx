"use client";

import { useCasaPropia } from "@/src/data/casa-propia";
import { useICL } from "@/src/services/ICL/services/icl-query";
import { useInflation } from "@/src/services/INFLATION/services/inflation-query";
import { useForm } from "react-hook-form";
import { RentFormSchema, RentFormType } from "../../schemas/rent-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useResetDateOnIndexChange } from "@/src/hooks/use-reset-date-on-index-change";
import { getDataBounds } from "@/src/utils/get-data-bounds";
import { useYearOptions } from "@/src/hooks/use-year-options";
import { useMonthOptions } from "@/src/hooks/use-month-options";
import { getPeriodRecord } from "@/src/utils/get-period-records";
import {
  rentByInflation,
  RentByInflationResult,
} from "@/src/features/economic-calcs/Rent/rent-by-inflation";
import {
  rentByIcl,
  RentByIclResult,
} from "@/src/features/economic-calcs/Rent/rent-by-icl";
import {
  rentByCasaPropia,
  RentByCasaPropiaResult,
} from "@/src/features/economic-calcs/Rent/rent-by-casa-propia";
import { DateRangeSelector } from "@/src/components/ui/form/date-range-selector";
import { AmountInput } from "@/src/components/ui/form/amount-input";
import { SubmitButton } from "@/src/components/ui/form/submit-btn";
import { FormTitle } from "@/src/components/ui/form/form-title";
import { UiSelect } from "@/src/components/ui/form/select";
import { FormErrorMessage } from "@/src/components/ui/form/form-error-message";
import { RentResult, RentResultProps } from "../results/rent-results";
import { Loader } from "@/src/components/ui/loader";

export const RentForm = () => {
  // Stores the calculation result to display below the form after submission
  const [results, setResults] = useState<RentResultProps | null>(null);

  // Fetch data from all three indices — Casa Propia is a local mock, no loading/error state needed
  const {
    data: inflationData,
    isLoading: isInflationLoading,
    isError: isInflationError,
  } = useInflation();
  const {
    data: iclData,
    isLoading: isICLLoading,
    isError: isICLError,
  } = useICL();
  const casaPropiaData = useCasaPropia();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RentFormType>({
    resolver: zodResolver(RentFormSchema),
    defaultValues: {
      startYear: new Date().getFullYear(),
      startMonth: new Date().getMonth() + 1,
      startAmount: 100000,
      updateIndex: "IPC",
      updateInterval: 3,
    },
  });

  // Watch these fields to reactively update date options and reset on index change
  const updateIndex = watch("updateIndex");
  const startYear = watch("startYear");

  // Select the active dataset based on the chosen index
  const activeData = useMemo(
    () =>
      updateIndex === "IPC"
        ? inflationData
        : updateIndex === "ICL"
          ? iclData
          : casaPropiaData,
    [updateIndex, inflationData, iclData, casaPropiaData],
  );

  // When the index changes, reset start date to the last available date of the new dataset
  useResetDateOnIndexChange(updateIndex, activeData, setValue);

  // Extract date boundaries and build year/month select options from the active dataset
  const { startYearMin, startMonthMin, endYearMax, endMonthMax } =
    getDataBounds(activeData);
  const yearOptions = useYearOptions(activeData);
  const monthOptions = useMonthOptions(
    startYear,
    startYearMin,
    startMonthMin,
    endYearMax,
    endMonthMax,
  );

  const onSubmit = (data: RentFormType) => {
    const updateIndex = data.updateIndex;

    // Select the record array that corresponds to the chosen index
    const activeRecord =
      updateIndex === "IPC"
        ? inflationData?.inflationRecord
        : updateIndex === "ICL"
          ? iclData?.iclRecord
          : casaPropiaData?.casaPropiaRecord;

    if (!activeRecord) return;

    // Slice the record array to only include entries from the selected start date onwards
    const periodRecord = getPeriodRecord(
      activeRecord,
      data.startYear,
      data.startMonth,
    );

    // Run the correct calculation function based on the selected index
    // Each function applies a different formula (% variation, ICL ratio, or direct multiplier)
    let result:
      | RentByInflationResult
      | RentByIclResult
      | RentByCasaPropiaResult;
    const finalData = { ...data, records: periodRecord };

    switch (updateIndex) {
      case "IPC":
        result = rentByInflation(finalData);
        break;
      case "ICL":
        result = rentByIcl(finalData);
        break;
      case "CASA_PROPIA":
        result = rentByCasaPropia(finalData);
        break;
    }

    // Pass both the result and the index so the result component can adapt its display
    setResults({ result, index: updateIndex });
  };

  // Show loader while remote data is being fetched
  if (isInflationLoading || isICLLoading) return <Loader />;

  // Show error state if any remote fetch failed
  if (!inflationData || isInflationError || !iclData || isICLError)
    return (
      <div className="text-center py-10">Error al intentar obtener datos</div>
    );

  return (
    <div className="mb-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto p-4 space-y-5"
      >
        <FormTitle title="Calculadora de alquileres" />

        {/* Start date: filtered by the active dataset's available date range.
            selectKey forces remount when the index changes to sync the selected value */}
        <DateRangeSelector
          label="Fecha de inicio"
          monthRegistration={register("startMonth", { valueAsNumber: true })}
          yearRegistration={register("startYear", { valueAsNumber: true })}
          monthOptions={monthOptions}
          yearOptions={yearOptions}
          error={errors.startMonth?.message}
          selectKey={updateIndex}
        />

        {/* Initial rent amount entered by the user */}
        <AmountInput
          label="Monto inicial"
          registration={register("startAmount", {
            valueAsNumber: true,
            min: 0,
          })}
          error={errors.startAmount?.message}
          placeholder="Ej: 100000"
        />

        {/* How often (in months) the rent amount gets updated */}
        <div className="space-y-2">
          <UiSelect
            label="Se actualiza cada x/meses"
            registration={register("updateInterval", { valueAsNumber: true })}
            options={Array.from({ length: 12 }, (_, i) => ({
              value: i + 1,
              label: `${i + 1} ${i + 1 === 1 ? "mes" : "meses"}`,
            }))}
            className="w-full"
          />
          <FormErrorMessage message={errors.updateInterval?.message} />
        </div>

        {/* Which economic index to use for rent updates.
            Changing this resets the date selects via useResetDateOnIndexChange */}
        <div className="space-y-2">
          <UiSelect
            label="Índice de actualización"
            className="w-full"
            registration={register("updateIndex")}
            options={[
              { value: "IPC", label: "IPC" },
              { value: "ICL", label: "ICL" },
              { value: "CASA_PROPIA", label: "Casa Propia" },
            ]}
            selectKey="updateIndex"
          />
          <FormErrorMessage message={errors.updateIndex?.message} />
        </div>

        <SubmitButton label="Calcular" />
      </form>

      {/* Render the result panel only after a successful submission */}
      {results && <RentResult {...results} />}
    </div>
  );
};
