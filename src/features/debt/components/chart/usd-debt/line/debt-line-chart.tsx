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
import { DEBT_TYPE_USD_LABEL } from "@/src/features/debt/util/debt-type-label";
import { Loader } from "@/src/components/ui/loader";

export const DebtUsdLineChart = () => {
  // Get all the private debts records by type
  const { data: debt, isLoading, isError } = usePrivateDebt(700);

  // Calc the usd debt values
  const usdChartData = useMemo(() => {
    if (debt) {
      console.log(debt);
      const values = debt.values;

      return values[0].records.map((rec, i) => {
        return {
          date: rec[0],
          cuentaCorrienteUsd: values
            .find((val) => val.debtType === "cuentaCorrienteUsd")
            ?.records[i][1]!.toFixed(2),
          documentosUsd: values
            .find((val) => val.debtType === "documentosUsd")
            ?.records[i][1]!.toFixed(2),
          hipotecarioUsd: values
            .find((val) => val.debtType === "hipotecarioUsd")
            ?.records[i][1]!.toFixed(2),
          prendarioUsd: values
            .find((val) => val.debtType === "prendarioUsd")
            ?.records[i][1]!.toFixed(2),
          personalUsd: values
            .find((val) => val.debtType === "personalUsd")
            ?.records[i][1]!.toFixed(2),
          tarjetaUsd: values
            .find((val) => val.debtType === "tarjetaUsd")
            ?.records[i][1]!.toFixed(2),
          otrosUsd: values
            .find((val) => val.debtType === "otrosUsd")
            ?.records[i][1]!.toFixed(2),
        };
      });
    }
  }, [debt]);

  // Conditional rendering lines state
  const [cuentaCorriente, setCuentaCorriente] = useState(true);
  const [documentos, setDocumentos] = useState(true);
  const [hipotecario, setHipotecario] = useState(true);
  const [prendario, setPrendario] = useState(true);
  const [personal, setPersonal] = useState(true);
  const [tarjeta, setTarjeta] = useState(true);

  if (isLoading) return <Loader />;
  if (isError || !debt) return <p>Error al cargfar el historial</p>;

  return (
    <section>
      <header className="flex flex-col items-center">
        <p className="text-center text-md text-text-secondary p-2 mb-5">
          <span className="underline underline-offset-2">Gráfico 2:</span> Total
          de préstamos en moneda extranjera otorgados al sector privado,
          expresado en millones de dolares. No incluye operaciones en moneda
          local.
        </p>

        {/* Lines selector */}
        <ChartLinesSelector
          inputs={[
            {
              label: "Cuenta Corriente",
              setState: setCuentaCorriente,
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
          data={usdChartData}
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
          {cuentaCorriente && (
            <Line
              type="monotone"
              dataKey="cuentaCorrienteUsd"
              strokeWidth={2}
              stroke={DEBT_TYPE_COLOR["adelantos"]}
              dot={false}
              isAnimationActive={false}
            />
          )}
          {documentos && (
            <Line
              type="monotone"
              dataKey="documentosUsd"
              strokeWidth={2}
              stroke={DEBT_TYPE_COLOR["documentos"]}
              dot={false}
              isAnimationActive={false}
            />
          )}
          {hipotecario && (
            <Line
              type="monotone"
              dataKey="hipotecarioUsd"
              strokeWidth={2}
              stroke={DEBT_TYPE_COLOR["hipotecario"]}
              dot={false}
              isAnimationActive={false}
            />
          )}
          {prendario && (
            <Line
              type="monotone"
              dataKey="prendarioUsd"
              strokeWidth={2}
              stroke={DEBT_TYPE_COLOR["prendario"]}
              dot={false}
              isAnimationActive={false}
            />
          )}
          {personal && (
            <Line
              type="monotone"
              dataKey="personalUsd"
              strokeWidth={2}
              stroke={DEBT_TYPE_COLOR["personal"]}
              dot={false}
              isAnimationActive={false}
            />
          )}
          {tarjeta && (
            <Line
              type="monotone"
              dataKey="tarjetaUsd"
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
          <Legend verticalAlign="bottom" height={36} formatter={(value) => (<span>{DEBT_TYPE_USD_LABEL[value]}</span>)}/>
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};
