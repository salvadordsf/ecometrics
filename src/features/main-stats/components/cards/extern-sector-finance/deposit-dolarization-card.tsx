"use client";

import { useLastGIR } from "@/src/services/GIR/services/gir-querys";
import { useEffect, useState } from "react";
import { MainVarCardSkeleton } from "../../main-var-card-skeleton";
import { MainVarStateCard } from "../main-var-state-card";
import {
  useARSDeposits,
  useMEDeposits,
} from "@/src/services/DEPOSITS/services/deposits-querys";
import { ErrorVarCard } from "../error-card";

export const DepositDolarizationCard = () => {
  // Fetch ARS deposits record
  const {
    data: ARSDeposits,
    isLoading: isLoadingARSDeposits,
    isError: isErrorARSDeposits,
  } = useARSDeposits();
  const {
    data: MEDeposits,
    isLoading: isLoadingMEDeposits,
    isError: isErrorMEDeposits,
  } = useMEDeposits();

  const [depositsStatus, setDepositsStatus] = useState<
    "red" | "yellow" | "green" | null
  >(null);
  const [deposits, setDeposits] = useState<number | null>(null);

  // Set the status (red | yellow | green)
  useEffect(() => {
    const depositsDolarization =
      ARSDeposits && MEDeposits
        ? (MEDeposits.value / (ARSDeposits.value + MEDeposits.value)) * 100
        : null;
    if (depositsDolarization && depositsDolarization !== null) {
      setDeposits(depositsDolarization);
      setDepositsStatus(
        depositsDolarization > 45
          ? "red"
          : depositsDolarization > 30
            ? "yellow"
            : "red",
      );
    }
  }, [MEDeposits, ARSDeposits, setDepositsStatus, setDeposits]);

  if (isLoadingARSDeposits || isLoadingMEDeposits)
    return <MainVarCardSkeleton />;
  if (isErrorARSDeposits || isErrorMEDeposits || !depositsStatus || !deposits)
    return <ErrorVarCard title="Dolarización de depósitos del sector privado" api="bcra"/>
  return (
    <MainVarStateCard
      stateColor={depositsStatus}
      title="Dolarización de depósitos del sector privado"
    >
      <div className="flex flex-col items-center">
        <span className="text-xl font-bold">{deposits.toFixed()}%</span>
        <span className="text-xs text-neutral-400  font-extralight">
          Fecha: {ARSDeposits?.labels.lastDate}
        </span>
      </div>
    </MainVarStateCard>
  );
};
