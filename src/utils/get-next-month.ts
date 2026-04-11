import { parseDate } from "./parse-months";

export const getNextMonth = (dateStr: string) => {
  const { year, month } = parseDate(dateStr);
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  return {
    year: nextYear,
    month: nextMonth,
    string: `${nextYear}-${String(nextMonth).padStart(2, "0")}-01`,
  };
};
