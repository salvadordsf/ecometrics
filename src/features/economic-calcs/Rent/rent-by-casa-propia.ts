import { RecordType } from "@/src/types/domain-types";
import { RentFormType } from "../../calculators/rent/schemas/rent-form-schema";
import { getNextMonth } from "@/src/utils/get-next-month";

// Extends the form data with the filtered Casa Propia records for the selected period
interface RentByCasaPropiaParams extends RentFormType {
  records: RecordType[];
}

// Represents a single month entry in the Casa Propia rent calculation result
interface RentByCasaPropiaResultRecord {
  date: string; // Date of the record (YYYY-MM-DD)
  amount: number; // Rent amount for this month
  coeficiente: number; // Casa Propia coefficient applied this month
  variation: number; // Monthly percentage change compared to the previous month
  increase: number; // Absolute rent increase compared to the previous month
  isUpdateMonth: boolean; // True if this month is a rent update month based on the interval
  isStartDate: boolean; // True only for the first record (contract start)
}

// Final shape returned by rentByCasaPropia
export interface RentByCasaPropiaResult {
  // Full month-by-month breakdown of the rent evolution
  records: RentByCasaPropiaResultRecord[];
  // Only the months where the rent was updated, plus the start date as baseline
  updateMonthRecords: (RentByCasaPropiaResultRecord & {
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

export const rentByCasaPropia = (
  data: RentByCasaPropiaParams,
): RentByCasaPropiaResult => {
  const { startYear, startMonth, startAmount, updateInterval, records } = data;

  const startDateString = getNextMonth(`${startYear}-${String(startMonth).padStart(2, "0")}-01`).string;
  // Initialize the result array with the contract start entry (no coefficient applied yet)
  const resultRecords: RentByCasaPropiaResultRecord[] = [
    {
      date: startDateString,
      amount: startAmount,
      coeficiente: records[0][1] as number,
      variation: 0,
      increase: 0,
      isUpdateMonth: false,
      isStartDate: true,
    },
  ];

  // Skip the first record (already added as isStartDate above).
  // Casa Propia uses a compounding coefficient: each month's amount is the
  // previous month's amount multiplied by the current month's coefficient.
  // e.g. amount_m1 = startAmount * coef_m1
  //      amount_m2 = amount_m1 * coef_m2
  //      amount_m3 = amount_m2 * coef_m3 ...
  records.slice(1).forEach((record, i) => {
    const recordDate = records[i + 2]?.[0] as string ?? record[0];
    const coeficiente = record[1] as number;
    const isUpdateMonth = (i + 1) % updateInterval === 0;
    const prevAmount = resultRecords[resultRecords.length - 1].amount;
    const amount = prevAmount * coeficiente;
    
    resultRecords.push({
      date: recordDate,
      amount,
      coeficiente,
      variation: ((amount - prevAmount) / prevAmount) * 100,
      increase: amount - prevAmount,
      isUpdateMonth,
      isStartDate: false,
    });
  });

  // Build the update month records by filtering update months and the start date.
  // Variation and increase here represent the cumulative change since the previous update month.
  const updateMonthRecords = resultRecords
    .filter((r) => r.isUpdateMonth || r.isStartDate)
    .map(
      (
        r,
        i,
        arr,
      ): RentByCasaPropiaResultRecord & {
        isUpdateMonth: true;
      } => ({
        ...r,
        isUpdateMonth: true,
        // First entry is the baseline, so variation and increase are 0
        variation:
          i === 0
            ? 0
            : ((r.amount - arr[i - 1].amount) / arr[i - 1].amount) * 100,
        increase: i === 0 ? 0 : r.amount - arr[i - 1].amount,
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
