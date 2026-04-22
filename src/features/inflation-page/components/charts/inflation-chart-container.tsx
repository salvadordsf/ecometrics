"use client";

import { useInflation } from "@/src/services/INFLATION/services/inflation-query";
import { useMemo } from "react";
import { InflationChart } from "./inflation-chart";
import { useUSDCasaExchangeVariation } from "@/src/services/USD/services/usd-query";
import { ErrorVarCard } from "@/src/features/main-stats/components/cards/error-card";

const START_DATE_CHART = "2024-12-01";

export const InflationChartContainer = () => {
  // Inflation (IPC Variation)
  const { data: inflation, isLoading, isError } = useInflation(500);

  // USDS Month Variation
  const {
    data: usdOficial,
    isLoading: isLoadingUSDOficial,
    isError: isErrorUSDOficial,
  } = useUSDCasaExchangeVariation("oficial", START_DATE_CHART);

  const {
    data: usdCCL,
    isLoading: isLoadingUSDCCL,
    isError: isErrorUSDCCL,
  } = useUSDCasaExchangeVariation("contadoconliqui", START_DATE_CHART);

  const {
    data: usdBlue,
    isLoading: isLoadingUSDBlue,
    isError: isErrorUSDBlue,
  } = useUSDCasaExchangeVariation("blue", START_DATE_CHART);

  const records = useMemo(() => {
    
    const inflationRecord = inflation ? inflation.record
      .filter((rec) => rec[0] >= START_DATE_CHART)
      .map((rec) => ({
        date: rec[0].slice(0, 7),
        inflation: rec[1],
      })) : null;

    const usdOficialRecords = usdOficial ? usdOficial.record
      .map((usdRec) => {
        return { date: usdRec[0].slice(0, 7), usd: usdRec[1] };
      }): null;

    const usdCCLRecords = usdCCL ? usdCCL.record
      .map((usdRec) => {
        return { date: usdRec[0].slice(0, 7), usd: usdRec[1] };
      }): null;

      const usdBlueRecords = usdBlue ? usdBlue.record
      .map((usdRec) => {
        return { date: usdRec[0].slice(0, 7), usd: usdRec[1] };
      }): null;

     return inflationRecord !== null ? inflationRecord.map((inflationRec, i) => ({
      ...inflationRec,
      usdOficial: usdOficialRecords ? usdOficialRecords[i]?.usd : null,
      usdCCL: usdCCLRecords ? usdCCLRecords[i]?.usd : null,
      usdBlue: usdBlueRecords ? usdBlueRecords[i]?.usd : null,
    })) : [];

  }, [inflation, usdOficial, usdCCL, usdBlue]);

  if (isLoading || isLoadingUSDOficial || isLoadingUSDCCL) return <div></div>;
  if (isError)
    return <ErrorVarCard title="Gráfico inflacionario" api="bcra"/>;

  return <InflationChart records={records} startDate={START_DATE_CHART}/>;
};
