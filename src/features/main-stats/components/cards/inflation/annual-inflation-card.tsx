"use client";

import { MainVarStateCard } from "../main-var-state-card";
import { useEffect, useState } from "react";
import { MainVarCardSkeleton } from "../../main-var-card-skeleton";
import { useLastAnnualInflation } from "@/src/services/INFLATION/services/inflation-query";
import { ErrorVarCard } from "../error-card";

export const AnnualInflationCard = () => {
  // Fetch last Annual Inflation record
  const {
    data: lastAnualInflation,
    isLoading,
    isError,
  } = useLastAnnualInflation();
  const [inflationStatus, setInflationStatus] = useState<
    "red" | "yellow" | "green" | null
  >(null);

  // Set the status (red | yellow | green)
  useEffect(() => {
    const inflationValue = lastAnualInflation ? lastAnualInflation.value : null;
    if (inflationValue)
      setInflationStatus(
        inflationValue > 80 ? "red" : inflationValue > 30 ? "yellow" : "green",
      );
  }, [lastAnualInflation, setInflationStatus]);

  if (isLoading) return <MainVarCardSkeleton />;
  if (isError || !lastAnualInflation || !inflationStatus)
    return <ErrorVarCard title="Inflación interanual" api="bcra"/>
  return (
    <MainVarStateCard
      stateColor={inflationStatus}
      title={lastAnualInflation.title}
    >
      <div className="flex flex-col items-center">
        <span className="text-xl">
          <span className="font-bold">{lastAnualInflation.value} </span>
          {lastAnualInflation.labels.unit}
        </span>
        <span className="text-xs text-text-secondary   font-extralight">
          Fecha: {lastAnualInflation.labels.lastDate}
        </span>
      </div>
    </MainVarStateCard>
  );
};
