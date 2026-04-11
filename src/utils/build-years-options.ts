import { parseDate } from "./parse-months";

export const buildYearOptions = (startDate: string, endDate: string) => {
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  const years: number[] = [];
  for (let y = start.year; y <= end.year; y++) {
    years.push(y);
  }
  return years;
};
