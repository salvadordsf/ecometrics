"use client";

import { useLastGIR } from "@/src/services/GIR/services/gir-querys";
import { useEffect, useState } from "react";
import { MainVarCardSkeleton } from "../../main-var-card-skeleton";
import { MainVarStateCard } from "../main-var-state-card";
import { ErrorVarCard } from "../error-card";

export const GirCard = () => {
  // Fetch last GIR record
  const { data: lastGIR, isLoading, isError } = useLastGIR();
  const [girStatus, setGirStatus] = useState<"red" | "yellow" | "green" | null>(
    null,
  );

  // Set the status (red | yellow | green)
  useEffect(() => {
    const GIRValue = lastGIR ? lastGIR.value : null;
    if (GIRValue)
      setGirStatus(
        GIRValue > 30000 ? "green" : GIRValue > 20000 ? "yellow" : "red",
      );
  }, [lastGIR, setGirStatus]);

  if (isLoading) return <MainVarCardSkeleton />;
  if (isError || !lastGIR || !girStatus)
    return <ErrorVarCard title="Reservas internacionales" api="bcra" />;
  return (
    <MainVarStateCard stateColor={girStatus} title={lastGIR.title}>
      <div className="flex flex-col items-center">
        <span className="text-xl">
          <span className="font-bold">{lastGIR.value} </span>
          {lastGIR.labels.unit}
        </span>
        <span className="text-xs text-neutral-400  font-extralight">
          Fecha: {lastGIR.labels.lastDate}
        </span>
      </div>
    </MainVarStateCard>
  );
};
