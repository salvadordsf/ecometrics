export const formatAmount = (n: number): { short: string; full: string } => {
  const full = "$" + Math.round(n).toLocaleString("es-AR");
  if (n >= 1_000_000_000)
    return {
      short: `$${(n / 1_000_000_000).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}B`,
      full,
    };
  if (n >= 1_000_000)
    return {
      short: `$${(n / 1_000_000).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}M`,
      full,
    };
  return { short: full, full };
};
