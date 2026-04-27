"use client";

import { useLastPrivateDebt } from "@/src/services/DEBT/services/debt-querys";
import { useMemo } from "react";
import { Pie, PieChart } from "recharts";
import { DEBT_TYPE_COLOR } from "../util/debt-type-color";
import { Subtitle } from "@/src/components/ui/subtitle";

export const TotalPrivateDebtPieChart = () => {
  const { data: lastPrivateDebts, isLoading, isError } = useLastPrivateDebt();

  const totalArs = useMemo(() => {
    if (lastPrivateDebts)
      return lastPrivateDebts.values.find((rec) => rec.debtType === "totalArs")
        ?.value;
  }, [lastPrivateDebts]);

  const totalDebt = useMemo(() => {
    if (lastPrivateDebts)
      return lastPrivateDebts.values.find(
        (rec) => rec.debtType === "totalConsolidado",
      )?.value;
  }, [lastPrivateDebts]);

  const debtData = useMemo(() => {
    if (lastPrivateDebts && totalArs)
      return lastPrivateDebts?.values
        .map((rec) => {
          if (
            rec.debtType !== "totalArs" &&
            rec.debtType !== "totalUsdInArs" &&
            !rec.debtType.endsWith("Usd") &&
            rec.debtType !== "totalConsolidado"
          )
            return {
              name: rec.debtType,
              value: Number(((rec.value / totalArs) * 100).toFixed(2)),
              fill: DEBT_TYPE_COLOR[
                rec.debtType as keyof typeof DEBT_TYPE_COLOR
              ],
            };
        })
        .filter((rec) => rec);
  }, [lastPrivateDebts]);

  if (isLoading) return <p>Cargando</p>;
  if (isError || !lastPrivateDebts || !debtData || !totalDebt)
    return <p>Error al cargar debt</p>;

  return (
    <div className="p-4 mb-10">
      <div className="mb-10">
        <Subtitle subtitle="Composición en pesos (ARS)" />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        <div className="relative">
          <PieChart width={280} height={280}>
            <Pie
              data={debtData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              paddingAngle={2}
            />
          </PieChart>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-1 scale-80">
            <p className="text-xs text-text-muted uppercase tracking-widest">
              del total consolidado
            </p>
            <p className="text-3xl font-semibold text-text-primary">
              {((totalArs! / totalDebt!) * 100).toFixed()}%
            </p>
            <p className="text-xs text-text-muted uppercase tracking-widest">
              es deuda en pesos
            </p>
          </div>
        </div>

        <div className="bg-surface-2 rounded border-border border text-xl">
          <ul className="flex flex-col gap-4 p-4">
            {debtData
              .sort((a, b) => b!.value - a!.value)
              .map((rec) => (
                <li key={rec?.name} className="flex justify-between gap-5">
                  <div className="flex gap-2 items-center">
                    <div
                      className="w-4 h-4 rounded-sm border border-border"
                      style={{ background: `${rec?.fill}` }}
                    ></div>
                    <span
                      className="capitalize"
                      style={{ color: `${rec?.fill}` }}
                    >
                      {rec?.name}
                    </span>
                  </div>
                  <span className="text-text-primary">{rec?.value}%</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
