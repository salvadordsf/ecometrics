import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { parseDate } from "@/src/utils/parse-months";
import { RentFormType } from "@/src/features/calculators/rent/schemas/rent-form-schema";

interface DataWithDates {
  startDate: string;
  endDate: string;
}

// Resets the form's startYear and startMonth fields whenever the selected
// index (updateIndex) changes, defaulting to the last available date of
// the newly active dataset so the user always starts from a valid date.
export const useResetDateOnIndexChange = (
  updateIndex: string, // The currently selected economic index (IPC, ICL, CASA_PROPIA)
  activeData: DataWithDates | null | undefined, // The dataset corresponding to the selected index
  setValue: UseFormSetValue<RentFormType>, // RHF setter to update form fields programmatically
) => {
  useEffect(() => {
    // Do nothing if the dataset hasn't loaded yet
    if (!activeData) return;

    // Parse the most recent date in the dataset and apply it to the form
    const { year, month } = parseDate(activeData.endDate);
    setValue("startYear", year);
    setValue("startMonth", month);

    // Only re-run when the index changes — activeData and setValue are intentionally omitted
    // from the dependency array to avoid resetting on unrelated re-renders
  }, [updateIndex]);
};
