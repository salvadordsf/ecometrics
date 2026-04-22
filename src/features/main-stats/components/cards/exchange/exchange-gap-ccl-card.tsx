"use client";

import { useUSDSExchange } from "@/src/services/USD/services/usd-query";
import { MainVarStateCard } from "../main-var-state-card";
import { useEffect, useState } from "react";
import { MainVarCardSkeleton } from "../../main-var-card-skeleton";
import { ErrorVarCard } from "../error-card";

export const CCLGapCard = () => {
  // Fetch last USDS exhanges
  const { data: usdsExchanges, isLoading, isError } = useUSDSExchange();
  const [exchangeGapState, setExchangeGapState] = useState<
    "red" | "yellow" | "green" | null
  >(null);
  const [exchangeGap, setExchangeGap] = useState<number | null>(null);

  // Set the status (red | yellow | green)
  useEffect(() => {
    const exchangeGap: number | null = usdsExchanges
      ? ((usdsExchanges.values.CCL.values.sale -
          usdsExchanges.values.oficial.values.sale) /
          usdsExchanges.values.oficial.values.sale) *
        100
      : null;

    if (exchangeGap && exchangeGap !== null) setExchangeGap(exchangeGap);
    setExchangeGapState(
      exchangeGap! > 40 ? "red" : exchangeGap! > 15 ? "yellow" : "green",
    );
  }, [usdsExchanges, setExchangeGapState, setExchangeGap]);

  if (isLoading) return <MainVarCardSkeleton />;
  if (isError || !usdsExchanges || !exchangeGapState || !exchangeGap)
    return <ErrorVarCard title="Brecha cambiaria (CCL / Oficial)" api="dolar"/>
  return (
    <MainVarStateCard
      stateColor={exchangeGapState}
      title="Brecha cambiaria (CCL / Oficial)"
    >
      <div className="flex flex-col items-center">
        <span className="text-xl">
          <span className="font-bold">{exchangeGap.toFixed(2)}%</span>
        </span>
        <span className="text-xs text-text-secondary font-extralight">
          Fecha: {usdsExchanges.labels.lastDate}
        </span>
      </div>
    </MainVarStateCard>
  );
};
