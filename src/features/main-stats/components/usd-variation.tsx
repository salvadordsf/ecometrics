"use client";

import { useUSDVariation } from "@/src/services/USD/services/usd-query";
import { MainVarStateCard } from "./main-var-state-card";
import { useEffect, useState } from "react";

export const UsdVariationCard = () => {
  // Fetch last Inflation record
  const { data: usdVariation, isLoading, isError } = useUSDVariation();
  const [usdVariationStatus, setUsdVariationStatus] = useState<
    "red" | "yellow" | "green" | null
  >(null);

  // Set the status (red | yellow | green)
  useEffect(() => {
    const usdVariationValue = usdVariation ? usdVariation.value : null;
    if (usdVariationValue)
      setUsdVariationStatus(
        usdVariationValue > 8
          ? "red"
          : usdVariationValue > 3
            ? "yellow"
            : "green",
      );
  }, [usdVariation, setUsdVariationStatus]);

  if (isLoading) return <p>Cargando USD variacion</p>;
  if (isError || !usdVariation || !usdVariationStatus)
    return <p>Error al cargar GIR</p>;
  return (
    <MainVarStateCard
      stateColor={usdVariationStatus}
      title={usdVariation.title}
    >
      <div className="flex flex-col items-center">
        <span className="text-xl">
          <span className="font-bold">{usdVariation.value.toFixed(2)}</span>
          {usdVariation.labels.unit}
        </span>
        <span className="text-xs text-neutral-400  font-extralight">
          De {usdVariation.labels.dates.prevDate} a{" "}
          {usdVariation.labels.dates.lastDate}
        </span>
      </div>
    </MainVarStateCard>
  );
};
