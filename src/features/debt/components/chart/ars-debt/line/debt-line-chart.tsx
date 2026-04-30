"use client";

import { usePrivateDebt } from "@/src/services/DEBT/services/debt-querys";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DEBT_TYPE_COLOR } from "../../../../util/debt-type-color";
import { ChartLinesSelector } from "@/src/components/ui/chart/chart-lines-selector";
import { debtTooltipFormatter } from "./debt-tooltip-formatter";
import { useInflation } from "@/src/services/INFLATION/services/inflation-query";
import { RecordType } from "@/src/types/domain-types";
import { DEBT_TYPE_LABEL } from "../../../../util/debt-type-label";
import clsx from "clsx";
import { NominalRealToggle } from "./nominal-real-toggle";
import { Loader } from "@/src/components/ui/loader";

export const DebtLineChart = () => {
  // Get all the private debts records by type
  const { data: debt, isLoading, isError } = usePrivateDebt(700);
  // Get the inflation for the same interval for calc the real debts using inflation
  const {
    data: inflation,
    isLoading: isLoadingInflation,
    isError: isErrorInflation,
  } = useInflation(34);

  // Calc the debt NOMINAL values
  const nominalChartData = useMemo(() => {
    if (debt) {
      const values = debt.values;

      return values[0].records.map((rec, i) => {
        return {
          date: rec[0],
          adelantos: (
            values.find((val) => val.debtType === "adelantos")?.records[i][1]! /
            1000
          ).toFixed(2),
          documentos: (
            values.find((val) => val.debtType === "documentos")?.records[
              i
            ][1]! / 1000
          ).toFixed(2),
          hipotecario: (
            values.find((val) => val.debtType === "hipotecario")?.records[
              i
            ][1]! / 1000
          ).toFixed(2),
          prendario: (
            values.find((val) => val.debtType === "prendario")?.records[i][1]! /
            1000
          ).toFixed(2),
          personal: (
            values.find((val) => val.debtType === "personal")?.records[i][1]! /
            1000
          ).toFixed(2),
          tarjeta: (
            values.find((val) => val.debtType === "tarjeta")?.records[i][1]! /
            1000
          ).toFixed(2),
          otros: (
            values.find((val) => val.debtType === "otros")?.records[i][1]! /
            1000
          ).toFixed(2),
        };
      });
    }
  }, [debt]);

  // Nominal / Real rendering chart state
  const [isReal, setIsReal] = useState(false);

  // Calc the inflation accumulated index for for deflate
  const cumulativeIndex = useMemo(() => {
    if (!inflation) return null;
    const index: Record<string, number> = {};
    let accumulated = 1;

    inflation.record.forEach(([date, pct]: RecordType) => {
      accumulated = accumulated * (1 + pct / 100);
      index[date.slice(0, 7)] = accumulated;
    });

    return index;
  }, [inflation]);

  // Calc the debt NOMINAL values
  const realChartData = useMemo(() => {
    if (!debt || !cumulativeIndex || !inflation) return undefined;
    const values = debt.values;
    const lastDeflactor = Object.values(cumulativeIndex).at(-1) ?? 1;

    return values[0].records
      .map((rec, i) => {
        const date: string = rec[0];
        const lastInflationDate = inflation?.endDate;

        if (date > lastInflationDate) return;

        const monthKey = date.slice(0, 7);
        const deflactor = cumulativeIndex[monthKey] ?? 1;

        const deflate = (raw: number) =>
          ((raw / 1000) * (lastDeflactor / deflactor)).toFixed(2);

        const row: Record<string, string | number> = { date };
        Object.keys(DEBT_TYPE_LABEL).forEach((key) => {
          const raw =
            values.find((v) => v.debtType === key)?.records[i][1] ?? 0;
          row[key] = deflate(raw);
        });
        return row;
      })
      .filter(Boolean);
  }, [debt, cumulativeIndex, inflation]);

  // Conditional rendering lines state
  const [adelantos, setAdelantos] = useState(true);
  const [documentos, setDocumentos] = useState(true);
  const [hipotecario, setHipotecario] = useState(true);
  const [prendario, setPrendario] = useState(true);
  const [personal, setPersonal] = useState(true);
  const [tarjeta, setTarjeta] = useState(true);

  if (isLoading || isLoadingInflation) return <Loader />;
  if (isError || !debt || isErrorInflation || !inflation)
    return <p>Error al cargfar el historial</p>;

  return (
    <section>
      <header className="flex flex-col items-center">
        <p className="text-center text-md text-text-secondary p-2 mb-5">
          <span className="underline underline-offset-2">Gráfico 2:</span> Total
          de préstamos en moneda local otorgados al sector privado, expresado en
          miles de millones de pesos ARS. No incluye operaciones en moneda
          extranjera.
        </p>
        {/* Toggle nominal / real */}
        <NominalRealToggle isReal={isReal} setIsReal={setIsReal} />

        {/* Lines selector */}
        <ChartLinesSelector
          inputs={[
            {
              label: "Adelantos",
              setState: setAdelantos,
              color: DEBT_TYPE_COLOR["adelantos"],
            },
            {
              label: "Documentos",
              setState: setDocumentos,
              color: DEBT_TYPE_COLOR["documentos"],
            },
            {
              label: "Hipotecario",
              setState: setHipotecario,
              color: DEBT_TYPE_COLOR["hipotecario"],
            },
            {
              label: "Prendario",
              setState: setPrendario,
              color: DEBT_TYPE_COLOR["prendario"],
            },
            {
              label: "Personales",
              setState: setPersonal,
              color: DEBT_TYPE_COLOR["personal"],
            },
            {
              label: "Tarjeta",
              setState: setTarjeta,
              color: DEBT_TYPE_COLOR["tarjeta"],
            },
          ]}
        />
      </header>

      <ResponsiveContainer width="90%" height={400} className="md:mx-5">
        <LineChart
          data={isReal ? realChartData : nominalChartData}
          margin={{
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <CartesianGrid strokeDasharray="1 5" />
          <XAxis dataKey="date" />
          <YAxis />
          {adelantos && (
            <Line
              type="monotone"
              dataKey="adelantos"
              strokeWidth={2}
              stroke={DEBT_TYPE_COLOR["adelantos"]}
              dot={false}
              isAnimationActive={false}
            />
          )}
          {documentos && (
            <Line
              type="monotone"
              dataKey="documentos"
              strokeWidth={2}
              stroke={DEBT_TYPE_COLOR["documentos"]}
              dot={false}
              isAnimationActive={false}
            />
          )}
          {hipotecario && (
            <Line
              type="monotone"
              dataKey="hipotecario"
              strokeWidth={2}
              stroke={DEBT_TYPE_COLOR["hipotecario"]}
              dot={false}
              isAnimationActive={false}
            />
          )}
          {prendario && (
            <Line
              type="monotone"
              dataKey="prendario"
              strokeWidth={2}
              stroke={DEBT_TYPE_COLOR["prendario"]}
              dot={false}
              isAnimationActive={false}
            />
          )}
          {personal && (
            <Line
              type="monotone"
              dataKey="personal"
              strokeWidth={2}
              stroke={DEBT_TYPE_COLOR["personal"]}
              dot={false}
              isAnimationActive={false}
            />
          )}
          {tarjeta && (
            <Line
              type="monotone"
              dataKey="tarjeta"
              strokeWidth={2}
              stroke={DEBT_TYPE_COLOR["tarjeta"]}
              dot={false}
              isAnimationActive={false}
            />
          )}
          <Tooltip
            contentStyle={{
              backgroundColor: "#050712",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "rgba(255,255,255,0.5)" }}
            itemStyle={{ color: "rgba(255,255,255,0.9)" }}
            formatter={debtTooltipFormatter}
          />
          <Legend verticalAlign="bottom" height={36} />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};
