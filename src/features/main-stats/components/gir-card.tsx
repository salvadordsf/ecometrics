"use client";

import { useLastGIR } from "@/src/services/GIR/services/gir-querys";
import { MainVarStateCard } from "./main-var-state-card";
import { useEffect, useState } from "react";

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

  if (isLoading) return <p>Cargando GIR</p>;
  if (isError || !lastGIR || !girStatus) return <p>Error al cargar GIR</p>;
  return (
    <MainVarStateCard stateColor={girStatus} title={lastGIR.title}>
      <div className="flex flex-col items-center">
        <span className="text-xl">
          <span className="font-bold">{lastGIR.value} </span>
          {lastGIR.labels.unit}
        </span>
        <span className="text-xs text-neutral-400  font-extralight">Fecha: {lastGIR.labels.lastDate}</span>
      </div>
    </MainVarStateCard>
  );
};
