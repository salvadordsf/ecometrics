import { useMemo } from "react";
import { buildYearOptions } from "@/src/utils/build-years-options";

interface DataWithDates {
  startDate: string;
  endDate: string;
}

// Returns the list of selectable years derived from the active dataset's date range.
// Returns an empty array while the dataset is still loading or unavailable,
// so year selects render nothing until data is ready.
export const useYearOptions = (
  activeData: DataWithDates | null | undefined, // The active dataset, null/undefined while loading
) => {
  return useMemo(() => {
    if (!activeData) return [];
    // Delegate the year range construction to the shared utility
    return buildYearOptions(activeData.startDate, activeData.endDate);
  }, [activeData]); // Recomputes only when the active dataset changes
};
