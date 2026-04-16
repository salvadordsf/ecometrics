"use client";

import { MainVarStateCard } from "./main-var-state-card";
import { useEffect, useState } from "react";
import { useLastInflation } from "@/src/services/INFLATION/services/inflation-query";

export const InflationCard = () => {
  // Fetch last Inflation record
  const { data: lastInflation, isLoading, isError } = useLastInflation();
  const [inflationStatus, setInflationStatus] = useState<"red" | "yellow" | "green" | null>(
    null,
  );

  // Set the status (red | yellow | green)
  useEffect(() => {
    const inflationValue = lastInflation ? lastInflation.value : null;
    if (inflationValue)
      setInflationStatus(
        inflationValue > 6 ? "red" : inflationValue > 3 ? "yellow" : "green",
      );
  }, [lastInflation, setInflationStatus]);

  if (isLoading) return <p>Cargando inflacion</p>;
  if (isError || !lastInflation || !inflationStatus) return <p>Error al cargar inflacion</p>;
  return (
    <MainVarStateCard stateColor={inflationStatus} title={lastInflation.title}>
      <div className="flex flex-col items-center">
        <span className="text-xl">
          <span className="font-bold">{lastInflation.value} </span>
          {lastInflation.labels.unit}
        </span>
        <span className="text-xs text-neutral-400  font-extralight">Fecha: {lastInflation.labels.lastDate}</span>
      </div>
    </MainVarStateCard>
  );
};
