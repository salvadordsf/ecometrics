import { useMemo } from "react";
import { getStartMonths } from "@/src/utils/get-start-month";
import { getEndMonths } from "@/src/utils/get-end-months";

// Returns the list of selectable months for a given year,
// filtered by the dataset's available date range.
// Three cases are handled:
//   1. Selected year is the last available year → cap months at endMonthMax
//   2. Selected year is the first available year → start months from startMonthMin
//   3. Any year in between → all 12 months are available
export const useMonthOptions = (
  startYear: number, // The currently selected year
  startYearMin: number, // The earliest year available in the dataset
  startMonthMin: number, // The earliest month available in startYearMin
  endYearMax: number, // The latest year available in the dataset
  endMonthMax: number, // The latest month available in endYearMax
) => {
  return useMemo(() => {
    if (startYear === endYearMax) {
      // Last available year: only show months up to the last record
      return getEndMonths(startYear, endYearMax, endMonthMax);
    }
    if (startYear === startYearMin) {
      // First available year: only show months from the first record onwards
      return getStartMonths(startYear, startYearMin, startMonthMin);
    }
    // Middle years: all months are valid, pass 1 as the min month
    return getStartMonths(startYear, startYearMin, 1);
  }, [startYear, startYearMin, startMonthMin, endYearMax, endMonthMax]);
};
