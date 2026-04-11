export const parseDate = (dateStr: string) => {
  const [year, month] = dateStr.split("-").map(Number);
  return { year, month };
};