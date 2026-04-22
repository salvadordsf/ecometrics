import { RecordType } from "@/src/types/domain-types";
import { RentFormType } from "../../calculators/rent/schemas/rent-form-schema";
import { getNextMonth } from "@/src/utils/get-next-month";

// Extends the form data with the filtered inflation records for the selected period
interface RentByInflationParams extends RentFormType {
  records: RecordType[];
}

// Represents a single month entry in the rent calculation result
interface RentByInflationResultRecord {
  date: string; // First day of the month this record belongs to (YYYY-MM-01)
  amount: number; // Rent amount for this month
  variation: number; // Monthly inflation rate applied (%) — 0 for the start date
  increase: number; // Absolute increase in rent compared to the previous month
  isUpdateMonth: boolean; // True if this month is a rent update month based on the interval
  isStartDate: boolean; // True only for the first record (contract start)
}

// Final shape returned by rentByInflation
export interface RentByInflationResult {
  // Full month-by-month breakdown of the rent evolution
  records: RentByInflationResultRecord[];
  // Only the months where the rent was updated, plus the start date as baseline
  updateMonthRecords: (RentByInflationResultRecord & {
    isUpdateMonth: true;
  })[];
  amounts: {
    startAmount: number; // Initial rent amount
    finalAmount: number; // Rent amount at the end of the period
    totalIncrease: number; // Total absolute increase over the full period
  };
  period: {
    start: { date: string }; // Contract start date (YYYY-MM-01)
    end: { date: string }; // Last month in the calculation
    updateInterval: number; // How often (in months) the rent gets updated
  };
}

export const rentByInflation = (
  data: RentByInflationParams,
): RentByInflationResult => {
  const { startYear, startMonth, startAmount, updateInterval, records } = data;

  // Build the contract start date string in YYYY-MM-01 format
  const startDateString = getNextMonth(`${startYear}-${String(startMonth).padStart(2, "0")}-01`).string;

  // Initialize the result array with the contract start entry (no variation applied yet)
  const resultRecords: RentByInflationResultRecord[] = [
    {
      date: startDateString,
      amount: startAmount,
      variation: 0,
      increase: 0,
      isUpdateMonth: false,
      isStartDate: true,
    },
  ];

  // Iterate over each inflation record and compute the rent for the following month.
  // The date assigned to each entry is the start of the NEXT month, because the inflation
  // value of month N represents what the rent becomes starting from month N+1.
  // If there is no next record (last entry), getNextMonth generates the date programmatically.
  records.forEach((record, i) => {
    const recordDate = records[i + 1]?.[0]
      ? (records[i + 1][0] as string)
      : getNextMonth(records[i][0] as string).string;

    // Monthly inflation rate as a percentage (e.g. 3.7 means 3.7%)
    const recordAmount = record[1] as number;

    // A month is an update month if its 1-based index is divisible by the update interval
    const isUpdateMonth = (i + 1) % updateInterval === 0;

    const prevAmount = resultRecords[resultRecords.length - 1].amount;

    // Apply the monthly inflation rate: amount = prevAmount * (1 + rate/100)
    const amount = prevAmount * (recordAmount / 100 + 1);

    resultRecords.push({
      date: recordDate,
      amount,
      increase: amount - prevAmount,
      variation: recordAmount,
      isUpdateMonth,
      isStartDate: false,
    });
  });

  // Build the update month records by filtering only update months and the start date.
  // Variation here represents the cumulative % change since the previous update month, not the monthly inflation rate.
  // Increase is the absolute change in rent since the previous update month.
  const updateMonthRecords = resultRecords
    .filter((r) => r.isUpdateMonth || r.isStartDate)
    .map(
      (
        r,
        i,
        arr,
      ): RentByInflationResultRecord & {
        isUpdateMonth: true;
      } => ({
        ...r,
        isUpdateMonth: true,
        // First update month has 0 variation (it is the baseline)
        variation:
          i === 0
            ? 0
            : ((r.amount - arr[i - 1].amount) / arr[i - 1].amount) * 100,
        increase: i === 0 ? 0 :r.amount - arr[i - 1].amount,
      }),
    );

  const lastRecord = resultRecords[resultRecords.length - 1];

  return {
    records: resultRecords,
    updateMonthRecords,
    amounts: {
      startAmount,
      finalAmount: lastRecord.amount,
      totalIncrease: lastRecord.amount - startAmount,
    },
    period: {
      start: {
        date: `${startYear}-${String(startMonth).padStart(2, "0")}-01`,
      },
      end: {
        date: lastRecord.date,
      },
      updateInterval,
    },
  };
};
