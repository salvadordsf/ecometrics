"use client";

import { Subtitle } from "@/src/components/ui/subtitle";
import { formatDate } from "@/src/utils/formate-date-es";
import { useState } from "react";
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
import { RenderLegendFormatter } from "@/src/components/ui/chart/leged-formatter";
import { ChartLinesSelector } from "@/src/components/ui/chart/chart-lines-selector";

export const InflationChart = ({
  records,
  startDate,
}: {
  records: any[];
  startDate: string;
}) => {
  // Active chart´s lines
  const [usdOficial, setUsdOficial] = useState(true);
  const [usdCCL, setUsdCLL] = useState(true);
  const [usdBlue, setUsdBlue] = useState(true);

  return (
    <section>
      <header className="flex flex-col items-center">
        <Subtitle
          subtitle={`Gráfico inflaciónario`}
        />
        <p className="text-center text-md text-text-secondary p-2">
          Evolución de la inflación desde {formatDate(startDate)} al día de hoy,
          en relación a tipos de cambios de USD.
        </p>
        {/* USDs selector */}
        <ChartLinesSelector
          inputs={[
            { label: "Dolar oficial", setState: setUsdOficial },
            { label: "Dolar CCL", setState: setUsdCLL },
            { label: "Dolar blue", setState: setUsdBlue },
          ]}
        />
      </header>

      <ResponsiveContainer width="90%" height={400} className="md:mx-5">
        <LineChart
          data={records}
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
          <Line
            type="monotone"
            dataKey="inflation"
            strokeWidth={3}
            stroke="oklch(66.6% 0.179 58.318)"
            dot={false}
            isAnimationActive={false}
          />

          {/* USDs lines*/}
          {usdOficial && (
            <Line
              type="monotone"
              dataKey="usdOficial"
              strokeWidth={2}
              stroke="oklch(72.3% 0.219 149.579)"
              dot={false}
              isAnimationActive={false}
            />
          )}
          {usdCCL && (
            <Line
              type="monotone"
              dataKey="usdCCL"
              strokeWidth={2}
              stroke="oklch(49.6% 0.265 301.924)"
              dot={false}
              isAnimationActive={false}
            />
          )}
          {usdBlue && (
            <Line
              type="monotone"
              
              dataKey="usdBlue"
              strokeWidth={2}
              stroke="oklch(62.3% 0.214 259.815)"
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
            formatter={(value, name) => {
              switch (name) {
                case "inflation":
                  return [`${value}%`, `Inflación`];
                case "usdOficial":
                  return [`${value}%`, `Var. USD oficial`];
                case "usdCCL":
                  return [`${value}%`, `Var. USD CCL`];
                case "usdBlue":
                  return [`${value}%`, `Var. USD Blue`];
              }
            }}
          />
          <Legend verticalAlign="bottom" height={36} formatter={RenderLegendFormatter}/>
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};
