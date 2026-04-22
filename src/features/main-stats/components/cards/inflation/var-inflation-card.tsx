"use client";

import { MainVarStateCard } from "../main-var-state-card";
import { useEffect, useState } from "react";
import { useInflation } from "@/src/services/INFLATION/services/inflation-query";
import { MainVarCardSkeleton } from "../../main-var-card-skeleton";
import { formatDate } from "@/src/utils/formate-date-es";
import { ErrorVarCard } from "../error-card";

export const InflationVarCard = () => {
  // Fetch two last Inflation record
  const { data: inflationRecords, isLoading, isError } = useInflation(2);
  const [inflationVarStatus, setinflationVarStatus] = useState<
    "red" | "yellow" | "green" | null
  >(null);
  const [inflationVar, setinflationVar] = useState<number | null>(null);

  // Set the status (red | yellow | green)
  useEffect(() => {
    if (inflationRecords) console.log(inflationRecords);
    const inflationVar = inflationRecords
      ? inflationRecords.record[1][1] - inflationRecords.record[0][1]
      : null;
    if (inflationVar && inflationVar !== null) {
      console.log("asdasd");
      setinflationVar(inflationVar);
      setinflationVarStatus(
        inflationVar! > 1 ? "red" : inflationVar > 0.2 ? "yellow" : "green",
      );
    }
  }, [inflationRecords, setinflationVarStatus, setinflationVarStatus]);

  if (isLoading) return <MainVarCardSkeleton />;
  if (isError || !inflationRecords || !inflationVarStatus || !inflationVar)
    return (
      <ErrorVarCard title="Variación mensual del tipo de cambio" api="bcra" />
    );
  return (
    <MainVarStateCard
      stateColor={inflationVarStatus}
      title="Variación respecto al mes anterior"
    >
      <div className="flex flex-col items-center">
        <span className="text-xl">
          <span className="font-bold">
            {inflationVar > 0 ? `+${inflationVar}` : `-${inflationVar}`} puntos
            porcentuales
          </span>
        </span>
        <span className="text-xs text-neutral-400  font-extralight">
          {formatDate(inflationRecords.record[0][0])} a{" "}
          {formatDate(inflationRecords.record[1][0])}
        </span>
      </div>
    </MainVarStateCard>
  );
};
