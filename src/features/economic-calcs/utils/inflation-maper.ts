import { InflationRecord } from "../../../services/INFLATION/types/inflation-types";

// Builds a Map from the inflation record array for O(1) lookups by month key.
// Each entry is indexed as "YYYY-MM" so callers can retrieve the monthly
// inflation rate for any given year/month without scanning the full array.
export const createInflationMap = (inflationRecord: InflationRecord[]) => {
  const map = new Map<string, number>();

  inflationRecord.forEach(([date, value]) => {
    // Parse the date string and normalize it to a "YYYY-MM" key,
    // discarding the day component since inflation records are monthly
    const d = new Date(date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    map.set(key, value);
  });

  return map;
};