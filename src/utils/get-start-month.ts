import { MONTHS_LABEL } from "./months-label";

export const getStartMonths = (
  startYear: number | null,
  startYearMin: number,
  startMonthMin: number,
) => {
  if (!startYear) return MONTHS_LABEL;

  if (startYear === startYearMin) {
    return MONTHS_LABEL.filter((m) => m.value >= startMonthMin);
  }

  return MONTHS_LABEL;
};
