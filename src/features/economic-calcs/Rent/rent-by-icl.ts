import { RecordType } from "@/src/types/domain-types";
import { RentFormType } from "../../calculators/rent/schemas/rent-form-schema";

// Extends the form data with the filtered ICL records for the selected period
interface RentByIclParams extends RentFormType {
  records: RecordType[];
}

// Represents a single month entry in the ICL rent calculation result
interface RentByIclResultRecord {
  date: string; // Date of the ICL record used for this month (last day of the month)
  amount: number; // Rent amount for this month
  iclValue: number; // The ICL index value for this month
  variation: number; // Monthly ICL percentage change compared to the previous month
  increase: number; // Absolute rent increase compared to the previous month
  isUpdateMonth: boolean; // True if this month is a rent update month based on the interval
  isStartDate: boolean; // True only for the first record (contract start)
}

// Final shape returned by rentByIcl
export interface RentByIclResult {
  // Full month-by-month breakdown of the rent evolution
  records: RentByIclResultRecord[];
  // Only the months where the rent was updated, plus the start date as baseline
  updateMonthRecords: (RentByIclResultRecord & {
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

export const rentByIcl = (data: RentByIclParams): RentByIclResult => {
  const { startYear, startMonth, startAmount, updateInterval, records } = data;

  // The ICL index is a daily series, so we group by month and keep only the last
  // available entry per month (highest date = last day), which is the value
  // used by official rent calculators as the reference for that month
  const filteredRecords = Object.values(
    records.reduce(
      (acc, record) => {
        const monthKey = (record[0] as string).slice(0, 7); // Extract "YYYY-MM"
        if (
          !acc[monthKey] ||
          (record[0] as string) > (acc[monthKey][0] as string)
        ) {
          acc[monthKey] = record;
        }
        return acc;
      },
      {} as Record<string, RecordType>,
    ),
  );

  // The ICL value at contract start, used as the fixed base for all ratio calculations
  const startIclValue = filteredRecords[0][1] as number;

  // Initialize the result array with the contract start entry (no variation applied yet)
  const resultRecords: RentByIclResultRecord[] = [
    {
      date: filteredRecords[0][0] as string,
      amount: startAmount,
      iclValue: startIclValue,
      variation: 0,
      increase: 0,
      isUpdateMonth: false,
      isStartDate: true,
    },
  ];

  // Skip the first record (already added as isStartDate above).
  // For each subsequent month, compute the rent using the ICL ratio formula:
  //   amount = startAmount * (currentICL / startICL)
  // This keeps all calculations relative to the original base, avoiding compounding errors.
  // Note: prevRecordIclValue uses filteredRecords[i] instead of filteredRecords[i-1]
  // because slice(1) already shifted the index by 1.
  filteredRecords.slice(1).forEach((record, i) => {
    const recordDate = record[0] as string;
    const recordIclValue = record[1] as number;
    const prevRecordIclValue = filteredRecords[i][1] as number;
    const isUpdateMonth = (i + 1) % updateInterval === 0;
    const prevAmount = resultRecords[resultRecords.length - 1].amount;

    // Rent is always calculated relative to the start ICL value, not compounded month to month
    const amount = startAmount * (recordIclValue / startIclValue);

    resultRecords.push({
      date: recordDate,
      amount,
      iclValue: recordIclValue,
      // Monthly variation reflects the ICL index change, not the rent change
      variation:
        ((recordIclValue - prevRecordIclValue) / prevRecordIclValue) * 100,
      increase: amount - prevAmount,
      isUpdateMonth,
      isStartDate: false,
    });
  });

  // Build the update month records by filtering update months and the start date.
  // Variation here represents the cumulative % change since the previous update month.
  // Increase here represents the absolute rent change since the previous update month.
  const updateMonthRecords = resultRecords
    .filter((r) => r.isUpdateMonth || r.isStartDate)
    .map((r, i, arr): RentByIclResultRecord & { isUpdateMonth: true } => ({
      ...r,
      isUpdateMonth: true,
      // First entry is the baseline, so variation and increase are 0
      variation:
        i === 0
          ? 0
          : ((r.amount - arr[i - 1].amount) / arr[i - 1].amount) * 100,
      increase: i === 0 ? 0 : r.amount - arr[i - 1].amount,
    }));

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
