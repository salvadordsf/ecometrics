import { RecordType } from "@/src/types/domain-types";
import { createInflationMap } from "./utils/inflation-maper";

interface InflationInput {
  startMonth: number;
  startYear: number;
  endMonth: number;
  endYear: number;
  amount?: number; // Optional reference amount to calculate the inflation-adjusted equivalent
}

export interface InflationResultType {
  period: {
    start: {
      date: string;      // ISO date string for the first day of the start month (YYYY-MM-01)
      timestamp: number; // Unix timestamp of the start date
      ipc: number;       // Monthly IPC rate for the start month
    };
    end: {
      date: string;      // ISO date string for the first day of the end month (YYYY-MM-01)
      timestamp: number; // Unix timestamp of the end date
      ipc: number;       // Monthly IPC rate for the end month
    };
    monthsCount: number; // Total number of months in the selected period (inclusive)
  };

  inflation: {
    variation: number; // Accumulated inflation over the period as a percentage
  };

  // Only present when an optional reference amount is provided
  amount?: {
    initial: number;    // The original amount entered by the user
    final: number;      // The inflation-adjusted equivalent at the end of the period
    difference: number; // Nominal difference between final and initial amounts
  };
}

export const calculateInflation = (
  input: InflationInput,
  inflationRecord: RecordType[],
): InflationResultType => {
  const { startMonth, startYear, endMonth, endYear, amount } = input;

  // Build a "YYYY-MM" -> rate map for O(1) monthly lookups
  const ipcMap = createInflationMap(inflationRecord);

  // Compound all monthly inflation rates between start and end (inclusive)
  // by multiplying each month's factor: factor = ∏ (1 + rate_i / 100)
  let factor = 1;
  let current = { month: startMonth, year: startYear };

  while (
    current.year < endYear ||
    (current.year === endYear && current.month <= endMonth)
  ) {
    const key = `${current.year}-${String(current.month).padStart(2, "0")}`;
    const monthlyVariation = ipcMap.get(key);

    // Throw early if data is missing for any month in the range
    if (monthlyVariation === undefined) {
      throw new Error(`No se encontraron datos IPC para ${key}`);
    }

    factor *= 1 + monthlyVariation / 100;

    // Advance to the next month, wrapping December -> January
    if (current.month === 12) {
      current = { month: 1, year: current.year + 1 };
    } else {
      current = { month: current.month + 1, year: current.year };
    }
  }

  // Convert the compounded factor to a percentage variation
  const variation = (factor - 1) * 100;

  // Build normalized date strings and keys for the start and end months
  const startKey = `${startYear}-${String(startMonth).padStart(2, "0")}`;
  const endKey = `${endYear}-${String(endMonth).padStart(2, "0")}`;
  const startDateStr = `${startKey}-01`;
  const endDateStr = `${endKey}-01`;

  const result: InflationResultType = {
    period: {
      start: {
        date: startDateStr,
        timestamp: new Date(startDateStr).getTime(),
        ipc: ipcMap.get(startKey)!, // guaranteed to exist — already validated above
      },
      end: {
        date: endDateStr,
        timestamp: new Date(endDateStr).getTime(),
        ipc: ipcMap.get(endKey)!,
      },
      // Inclusive month count: e.g. Jan 2020 -> Mar 2020 = 3 months
      monthsCount: (endYear - startYear) * 12 + (endMonth - startMonth) + 1,
    },
    inflation: {
      variation: parseFloat(variation.toFixed(2)),
    },
  };

  // Only calculate amount fields when a reference amount was provided
  if (amount !== undefined) {
    const amountFinal = amount * factor;
    result.amount = {
      initial: amount,
      final: parseFloat(amountFinal.toFixed(2)),
      difference: parseFloat((amountFinal - amount).toFixed(2)),
    };
  }

  return result;
};