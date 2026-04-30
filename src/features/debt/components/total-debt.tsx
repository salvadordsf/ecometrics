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

  const totalDebt = useMemo(
    () =>
      lastPrivateDebts?.values.find((rec) => {
        if (rec.debtType === "totalConsolidado") return rec;
      })?.value,
    [lastPrivateDebts],
  );

  if (isLoading) return <p>Cargando</p>;
  if (isError || !lastPrivateDebts || !totalDebt) return <p>Error al cargar debt</p>;

  return (
    <div className="p-4 border border-border rounded bg-surface-2 divider">
      <h3 className="text-2xl text-center mb-3 text-text-primary">
        Financiamiento total al sector privado
      </h3>

      <div className="flex flex-col md:flex-row items-center text-center ">
        <div className="text-lg pb-3 md:pb-0 md:px-3">
          <span className="text-amber">${(MLDebt! / 1000).toFixed()}</span>{" "}
          billones de ARS
        </div>

        <span className="text-2xl">+</span>

        <div className="text-lg pt-3 md:pt-0 md:px-3">
          <span className="text-amber">${MEDebt}</span> millones de USD
        </div>

        <span className="text-2xl">=</span>

        <div className="text-lg pt-3 md:pt-0 md:px-3">
          <span className="text-amber">${Number(totalDebt.toFixed()).toLocaleString("es-AR")}</span> millones de ARS
        </div>
      </div>
    </div>
  );
};
