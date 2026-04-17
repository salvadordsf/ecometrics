"use client";

import { MainVarStateCard } from "../main-var-state-card";
import { useEffect, useState } from "react";
import { MainVarCardSkeleton } from "../../main-var-card-skeleton";
import { useLastREMInflation } from "@/src/services/INFLATION/services/inflation-query";

export const REMAnnualInflation = () => {
  // Fetch last REM Annual Inflation record
  const {
    data: lastREMAnnualInflation,
    isLoading,
    isError,
  } = useLastREMInflation();
  const [inflationStatus, setInflationStatus] = useState<
    "red" | "yellow" | "green" | null
  >(null);

  // Set the status (red | yellow | green)
  useEffect(() => {
    const inflationValue = lastREMAnnualInflation
      ? lastREMAnnualInflation.value
      : null;
    if (inflationValue)
      setInflationStatus(
        inflationValue > 80 ? "red" : inflationValue > 30 ? "yellow" : "green",
      );
  }, [lastREMAnnualInflation, setInflationStatus]);

  if (isLoading) return <MainVarCardSkeleton />;
  if (isError || !lastREMAnnualInflation || !inflationStatus)
    return <p>Error al cargar inflacion interanual</p>;
  return (
    <MainVarStateCard
      stateColor={inflationStatus}
      title={lastREMAnnualInflation.title}
    >
      <div className="flex flex-col items-center">
        <span className="text-xl">
          <span className="font-bold">{lastREMAnnualInflation.value} </span>
          {lastREMAnnualInflation.labels.unit}
        </span>
        <span className="text-xs text-neutral-400  font-extralight">
          Fecha: {lastREMAnnualInflation.labels.lastDate}
        </span>
      </div>
    </MainVarStateCard>
  );
};
