import { parseDate } from "./parse-months";

interface DataBounds {
  startYearMin: number;
  startMonthMin: number;
  endYearMax: number;
  endMonthMax: number;
}

interface DataWithDates {
  startDate: string;
  endDate: string;
}

export const getDataBounds = (data: DataWithDates | null | undefined): DataBounds => {
  if (!data) {
    const now = new Date();
    return {
      startYearMin: now.getFullYear(),
      startMonthMin: 1,
      endYearMax: now.getFullYear(),
      endMonthMax: 12,
    };
  }

  const { year: startYearMin, month: startMonthMin } = parseDate(data.startDate);
  const { year: endYearMax, month: endMonthMax } = parseDate(data.endDate);

  return { startYearMin, startMonthMin, endYearMax, endMonthMax };
};