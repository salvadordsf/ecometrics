"use client";

import { MainVarStateCard } from "../main-var-state-card";
import { useEffect, useState } from "react";
import { useLastInflation } from "@/src/services/INFLATION/services/inflation-query";
import { useLastBADLAR } from "@/src/services/BADLAR/services/badlar-querys";
import { getTRM } from "../../../../economic-calcs/badlar-calcs";
import { MainVarCardSkeleton } from "../../main-var-card-skeleton";
import { ErrorVarCard } from "../error-card";

export const RealRateARSCard = () => {
  // Fetch last Inflation record
  const {
    data: lastInflation,
    isLoading: isLoadingInflation,
    isError: isErrorInflation,
  } = useLastInflation();
  // Fetch last BADLAR record
  const {
    data: lastBADLAR,
    isLoading: isLoadingBADLAR,
    isError: isErrorBADLAR,
  } = useLastBADLAR();

  const [realRate, setRealRate] = useState<null | number>(null);
  const [realRateStatus, setRealRateStatus] = useState<
    "red" | "yellow" | "green" | null
  >(null);

  // Set the status (red | yellow | green)
  useEffect(() => {
    const realRate =
      lastInflation && lastBADLAR
        ? getTRM(lastBADLAR.value, lastInflation.value)
        : null;
    if (realRate) setRealRate(realRate);
    setRealRateStatus(
      realRate! > 0 ? "green" : realRate! > -2 ? "yellow" : "red",
    );
  }, [lastInflation, lastBADLAR, setRealRateStatus]);

  if (isLoadingInflation || isLoadingBADLAR)
    return <MainVarCardSkeleton />;
  if (
    isErrorInflation ||
    isErrorBADLAR ||
    !lastInflation ||
    !lastBADLAR ||
    !realRateStatus
  )
    return <ErrorVarCard title="Tasa real mensual en pesos" api="bcra"/>
  return (
    <MainVarStateCard stateColor={realRateStatus} title="Tasa real mensual en pesos">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xl font-bold">{realRate?.toFixed(3)}%</span>
        <div className="flex flex-col items-center">
          <span className="text-xs text-neutral-400  font-extralight">
            BADLAR mensualizada − inflación mensual
          </span>
          <span className="text-xs text-neutral-400  font-extralight">
            Fecha: {lastBADLAR.labels.lastDate}
          </span>
        </div>
      </div>
    </MainVarStateCard>
  );
};
