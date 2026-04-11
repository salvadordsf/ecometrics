export const formatPercent = (n: number): { short: string; full: string } => {
  const full = n.toLocaleString("es-AR") + "%";
  if (n >= 1_000_000)
    return {
      short: `${(n / 1_000_000).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}M%`,
      full,
    };
  if (n >= 1_000)
    return {
      short: `${(n / 1_000).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}K%`,
      full,
    };
  return { short: full, full };
};
