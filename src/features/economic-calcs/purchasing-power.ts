import { RecordType } from "@/src/types/domain-types";
import { createInflationMap } from "./utils/inflation-maper";

interface PurchasingPowerInput {
  startMonth: number;
  startYear: number;
  endMonth: number;
  endYear: number;
  startAmount: number; // The salary or amount held at the start of the period
  endAmount: number; // The salary or amount held at the end of the period
}

export interface PurchasingPowerResultType {
  period: {
    start: {
      date: string; // ISO date string for the first day of the start month (YYYY-MM-01)
      timestamp: number; // Unix timestamp of the start date
      ipc: number; // Monthly IPC rate for the start month
    };
    end: {
      date: string; // ISO date string for the first day of the end month (YYYY-MM-01)
      timestamp: number; // Unix timestamp of the end date
      ipc: number; // Monthly IPC rate for the end month
    };
    monthsCount: number; // Total number of months in the selected period (inclusive)
  };

  inflation: {
    variation: number; // Accumulated inflation over the period as a percentage
  };

  amount?: {
    startAmount: number; // Original amount at the start of the period
    endAmount: number; // Actual amount at the end of the period
    inflationAmount: number; // What startAmount is worth at the end, adjusted for inflation
    difference: number; // endAmount minus inflationAmount (positive = gain, negative = loss)
    variation: number; // Purchasing power change as a percentage relative to inflationAmount
  };
}

export const calculatePurchasingPower = (
  input: PurchasingPowerInput,
  inflationRecord: RecordType[],
): PurchasingPowerResultType => {
  const { startMonth, startYear, endMonth, endYear, startAmount, endAmount } =
    input;

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

  const result: PurchasingPowerResultType = {
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

  // What the start amount would need to be at the end of the period
  // to have the same purchasing power, accounting for accumulated inflation
  const inflationAmount = startAmount * factor;

  // Compare the actual end amount against the inflation-adjusted start amount:
  // - difference > 0 means the user gained purchasing power
  // - difference < 0 means the user lost purchasing power
  result.amount = {
    startAmount,
    endAmount,
    inflationAmount: parseFloat(inflationAmount.toFixed(2)),
    difference: parseFloat((endAmount - inflationAmount).toFixed(2)),
    variation: parseFloat(
      (((endAmount - inflationAmount) / inflationAmount) * 100).toFixed(2),
    ),
  };

  return result;
};
