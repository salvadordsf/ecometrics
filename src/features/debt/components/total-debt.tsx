"use client";

import { useLastPrivateDebt } from "@/src/services/DEBT/services/debt-querys";
import { useMemo } from "react";

export const TotalPrivateDebt = () => {
  const { data: lastPrivateDebts, isLoading, isError } = useLastPrivateDebt();

  const MLDebt = useMemo(
    () =>
      lastPrivateDebts?.values.find((rec) => {
        if (rec.debtType === "totalArs") return rec;
      })?.value,
    [lastPrivateDebts],
  );

  const MEDebt = useMemo(
    () =>
      lastPrivateDebts?.values.find((rec) => {
        if (rec.debtType === "totalUsd") return rec;
      })?.value,
    [lastPrivateDebts],
  );

  if (isLoading) return <p>Cargando</p>;
  if (isError || !lastPrivateDebts) return <p>Error al cargar debt</p>;

  return (
    <div className="p-4 border border-border rounded bg-surface-2 divider">
      <h3 className="text-2xl text-center mb-3 text-text-primary">
        Financiamiento total al sector privado
      </h3>

      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-text-muted">
        <div className="text-lg pb-3 md:pb-0 md:px-3">
          <span className="text-amber">${(MLDebt! / 1000).toFixed()}</span>{" "}
          billones de ARS
        </div>

        <div className="text-lg pt-3 md:pt-0 md:px-3">
          <span className="text-amber">${MEDebt}</span> millones de USD
        </div>
      </div>
    </div>
  );
};
