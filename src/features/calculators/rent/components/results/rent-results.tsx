"use client";

import React, { useState } from "react";
import { ResultsDivider } from "@/src/components/ui/results/result-divider";
import { RentByCasaPropiaResult } from "@/src/features/economic-calcs/Rent/rent-by-casa-propia";
import { RentByIclResult } from "@/src/features/economic-calcs/Rent/rent-by-icl";
import { RentByInflationResult } from "@/src/features/economic-calcs/Rent/rent-by-inflation";
import { formatAmount } from "@/src/utils/format-amount";
import { formatDate } from "@/src/utils/formate-date-es";
import { Th } from "./th";

export interface RentResultProps {
  result: RentByInflationResult | RentByIclResult | RentByCasaPropiaResult;
  index: "IPC" | "ICL" | "CASA_PROPIA";
}

// Human-readable label for each index, shown in the table header
const INDEX_LABEL: Record<RentResultProps["index"], string> = {
  IPC: "IPC · Inflación",
  ICL: "ICL",
  CASA_PROPIA: "Casa Propia",
};

export const RentResult = ({ result, index }: RentResultProps) => {
  const { amounts, period, records } = result;

  // Tracks which update-month rows have their intermediate months expanded
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());

  // Pre-format summary values for the footer cards
  const totalVariation = (amounts.totalIncrease / amounts.startAmount) * 100;
  const { short: shortIncrease, full: fullIncrease } = formatAmount(
    amounts.totalIncrease,
  );
  const { short: shortFinal } = formatAmount(amounts.finalAmount);
  const { short: shortStart } = formatAmount(amounts.startAmount);

  // Count only actual rent updates (exclude the start date entry)
  const actualUpdates = records.filter(
    (r) => r.isUpdateMonth && !r.isStartDate,
  );

  // Toggle the expanded state of a row's intermediate months
  const toggle = (date: string) =>
    setExpandedDates((prev) => {
      const next = new Set(prev);
      next.has(date) ? next.delete(date) : next.add(date);
      return next;
    });

  type AnyRecord = (typeof records)[number];
  // A block groups one update/start row (head) with its intermediate months
  type Block = { head: AnyRecord; intermediates: AnyRecord[] };

  // Group records into blocks: each update month or start date starts a new block,
  // and all non-update months following it are its intermediates
  const blocks = records.reduce<Block[]>((acc, record) => {
    if (record.isUpdateMonth || record.isStartDate) {
      acc.push({ head: record, intermediates: [] });
    } else {
      acc[acc.length - 1]?.intermediates.push(record);
    }
    return acc;
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
      {/* Visual separator between the form and the results section */}
      <ResultsDivider />

      <div className="rounded-md border border-gray-800 overflow-hidden">
        {/* Table header: shows index label, update interval, date range, and update count */}
        <div className="px-4 py-3 bg-gray-900 border-b border-gray-800 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.16em] uppercase text-amber-600/80">
              actualizaciones · {INDEX_LABEL[index]}
            </p>
            <p className="text-[11px] text-gray-500 mt-0.5">
              cada {period.updateInterval}{" "}
              {period.updateInterval === 1 ? "mes" : "meses"}
              {" · "}
              {formatDate(period.start.date)} → {formatDate(period.end.date)}
            </p>
          </div>
          <span className="text-[11px] text-gray-600 shrink-0">
            {actualUpdates.length} ajustes
          </span>
        </div>

        <table className="w-full text-[12px] border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-gray-900/40">
              <Th align="left">fecha</Th>
              <Th>monto</Th>
              <Th>aumento</Th>
              <Th>var.</Th>
              {/* Empty column for the expand/collapse chevron */}
              <th className="w-6 pr-3" />
            </tr>
          </thead>

          <tbody>
            {blocks.map(({ head, intermediates }, blockIdx) => {
              const { short: shortAmt } = formatAmount(head.amount);
              const { short: shortInc } = formatAmount(head.increase);
              const isExpanded = expandedDates.has(head.date);
              const hasIntermediate = intermediates.length > 0;
              const isLast = blockIdx === blocks.length - 1;

              return (
                <React.Fragment key={head.date}>
                  {/* Head row: update month or contract start date.
                      Clicking it toggles the intermediate months if any exist */}
                  <tr
                    onClick={() => hasIntermediate && toggle(head.date)}
                    className={`
                      ${!isLast || isExpanded ? "border-b border-gray-800/60" : ""}
                      ${head.isStartDate ? "bg-amber-600/10" : ""}
                      ${hasIntermediate ? "cursor-pointer hover:bg-gray-800/40 transition-colors duration-100" : ""}
                    `}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`${head.isStartDate ? "text-amber-500/80" : "text-gray-300"}`}
                        >
                          {formatDate(head.date)}
                        </span>
                        {/* Badge shown only on the contract start row */}
                        {head.isStartDate && (
                          <span className="text-[9px] tracking-[0.1em] uppercase bg-amber-600/20 text-amber-600/80 px-1.5 py-0.5 rounded">
                            inicio
                          </span>
                        )}
                      </div>
                    </td>

                    <td
                      className={`px-4 py-3 text-right font-medium ${head.isStartDate ? "text-amber-400/80" : "text-gray-100"}`}
                    >
                      {shortAmt}
                    </td>

                    {/* Start date has no increase or variation to show */}
                    <td className="px-4 py-3 text-right text-gray-400">
                      {head.isStartDate ? "N/A" : `+${shortInc}`}
                    </td>

                    <td
                      className={`px-4 py-3 text-right font-medium ${head.isStartDate ? "text-gray-600" : "text-amber-400"}`}
                    >
                      {head.isStartDate
                        ? "N/A"
                        : `+${head.variation.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`}
                    </td>

                    {/* Chevron: rotates when expanded, invisible if no intermediates */}
                    <td className="pr-3 text-right">
                      <span
                        className={`text-[10px] text-gray-600 select-none inline-block transition-transform duration-150
                          ${isExpanded ? "rotate-180" : ""}
                          ${hasIntermediate ? "opacity-100" : "opacity-0"}
                        `}
                      >
                        ▾
                      </span>
                    </td>
                  </tr>

                  {/* Intermediate rows: non-update months between two update months.
                      Shown only when the parent head row is expanded */}
                  {hasIntermediate &&
                    isExpanded &&
                    intermediates.map((rec, j) => {
                      const { short: sAmt } = formatAmount(rec.amount);
                      const { short: sInc } = formatAmount(rec.increase);
                      const isIntLast = j === intermediates.length - 1;
                      return (
                        <tr
                          key={rec.date}
                          className={`bg-gray-950/60 ${!isIntLast ? "border-b border-gray-800/30" : "border-b border-gray-800/60"}`}
                        >
                          <td className="px-4 py-2">
                            <div className="flex items-center gap-2">
                              {/* Vertical line to visually connect intermediates to their parent */}
                              <span className="w-px h-3 bg-gray-700 ml-0.5 shrink-0 inline-block" />
                              <span className="text-[11px] text-gray-600">
                                {formatDate(rec.date)}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-2 text-right text-[11px] text-gray-500">
                            {sAmt}
                          </td>
                          <td className="px-4 py-2 text-right text-[11px] text-gray-600">
                            +{sInc}
                          </td>
                          <td className="px-4 py-2 text-right text-[11px] text-gray-600">
                            +
                            {rec.variation.toLocaleString("es-AR", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                            %
                          </td>
                          <td />
                        </tr>
                      );
                    })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary footer: three cards showing start amount, final amount, and total variation */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-md border border-gray-800 bg-gray-900 p-3 flex flex-col gap-1">
          <p className="text-[9px] tracking-[0.1em] uppercase text-gray-500">
            inicial
          </p>
          <p className="text-[13px] font-medium text-gray-400">{shortStart}</p>
        </div>
        <div className="rounded-md border border-gray-800 bg-gray-900 p-3 flex flex-col gap-1">
          <p className="text-[9px] tracking-[0.1em] uppercase text-gray-500">
            final
          </p>
          <p className="text-[13px] font-medium text-gray-50">{shortFinal}</p>
        </div>
        {/* Total variation card: highlighted in amber to draw attention */}
        <div className="rounded-md border border-amber-600/20 bg-amber-600/5 p-3 flex flex-col gap-1">
          <p className="text-[9px] tracking-[0.1em] uppercase text-amber-600/70">
            total
          </p>
          <p className="text-[13px] font-medium text-amber-400">
            +
            {totalVariation.toLocaleString("es-AR", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}
            %
          </p>
          {/* Full increase shown only when the abbreviated value differs */}
          {shortIncrease !== fullIncrease && (
            <p className="text-[9px] text-gray-600">{fullIncrease}</p>
          )}
        </div>
      </div>
    </div>
  );
};
