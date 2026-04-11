import { MONTHS_LABEL } from "./months-label";

export const getEndMonths = (
  endYear: number | null,
  endYearMax: number,
  endMonthMax: number,
) => {
  if (!endYear) return MONTHS_LABEL;

  if (endYear === endYearMax) {
    return MONTHS_LABEL.filter((m) => m.value <= endMonthMax);
  }

  return MONTHS_LABEL;
};
