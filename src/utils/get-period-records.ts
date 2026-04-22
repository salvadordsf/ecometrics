import { RecordType } from "../types/domain-types";

export const getPeriodRecord = (
  record: RecordType[],
  startYear: number,
  startMonth: number,
): RecordType[] => {
  const startDateStr = `${startYear}-${String(startMonth).padStart(2, "0")}`;

  // Find the first record whose date is >= startDateStr
  const startIndex = record.findIndex(
    ([date]) => (date as string).slice(0, 7) >= startDateStr,
  );

  if (startIndex === -1) return [];

  return record.slice(startIndex);
};
