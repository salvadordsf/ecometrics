import { ResultsDivider } from "@/src/components/ui/results/result-divider";
import { InflationResultType } from "@/src/features/economic-calcs/acumulated-inflation";
import { formatAmount } from "@/src/utils/format-amount";
import { formatPercent } from "@/src/utils/format-porcent";
import { formatDate } from "@/src/utils/formate-date-es";

export const InflationResult = (result: InflationResultType) => {
  const { period, inflation, amount } = result;

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
      {/* Visual separator between the form and the results section */}
      <ResultsDivider />

      {/* Main stat: accumulated inflation percentage over the selected period */}
      {(() => {
        // formatPercent returns both a short (abbreviated) and full representation
        // e.g. short: "1.2M%" full: "1.234.567%"
        const { short, full } = formatPercent(inflation.variation);
        const abbreviated = short !== full;
        return (
          <div className="relative rounded-md border border-amber-600/30 bg-amber-600/5 p-5 overflow-hidden">
            {/* Decorative top gradient line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-600/60 to-transparent" />
            <p className="text-[10px] tracking-[0.16em] uppercase text-amber-600/80 mb-1">
              variación acumulada
            </p>
            {/* Primary display: short format */}
            <p className="text-4xl font-semibold text-amber-400 tracking-tight leading-none">
              +{short}
            </p>
            {/* Full format shown only when the value was abbreviated */}
            {abbreviated && (
              <p className="text-[11px] text-amber-600/50 mt-0.5">+{full}</p>
            )}
            {/* Period summary: month count and date range */}
            <p className="text-[11px] text-gray-500 mt-1.5">
              {period.monthsCount} meses · {formatDate(period.start.date)} →{" "}
              {formatDate(period.end.date)}
            </p>
          </div>
        );
      })()}

      {/* Amount cards: initial vs final value side by side */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "monto inicial", value: amount?.initial ?? 0, dim: true },
          { label: "monto final", value: amount?.final ?? 0, dim: false },
        ].map(({ label, value, dim }) => {
          // formatAmount returns short and full representations for large numbers
          const { short, full } = formatAmount(value);
          const abbreviated = short !== full;
          return (
            <div
              key={label}
              className="rounded-md border border-gray-800 bg-gray-900 p-4 flex flex-col gap-1"
            >
              <p className="text-[10px] tracking-[0.12em] uppercase text-gray-500">
                {label}
              </p>
              {/* Initial amount is dimmed to visually emphasize the final amount */}
              <p
                className={`text-lg font-medium leading-tight ${dim ? "text-gray-300" : "text-gray-50"}`}
              >
                {short}
              </p>
              {/* Full value shown below when abbreviated */}
              {abbreviated && (
                <p className="text-[10px] text-gray-600 leading-tight">
                  {full}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Nominal difference: how much more the final amount is in absolute terms */}
      {(() => {
        const { short, full } = formatAmount(amount?.difference ?? 0);
        const abbreviated = short !== full;
        return (
          <div className="rounded-md border border-gray-800 bg-gray-900 p-4 flex items-center justify-between gap-4">
            <p className="text-[10px] tracking-[0.12em] uppercase text-gray-500 shrink-0">
              diferencia nominal
            </p>
            <div className="text-right">
              {/* Primary display */}
              <p className="text-[15px] font-semibold text-gray-50">+{short}</p>
              {/* Full value shown below when abbreviated */}
              {abbreviated && (
                <p className="text-[10px] text-gray-600">+{full}</p>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
};