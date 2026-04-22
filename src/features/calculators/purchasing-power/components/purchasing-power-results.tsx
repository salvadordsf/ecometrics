import { ResultsDivider } from "@/src/components/ui/results/result-divider";
import { ResultLabel } from "@/src/components/ui/results/result-label";
import { PurchasingPowerResultType } from "@/src/features/economic-calcs/purchasing-power";
import { formatAmount } from "@/src/utils/format-amount";
import { formatPercent } from "@/src/utils/format-porcent";
import { formatDate } from "@/src/utils/formate-date-es";

export const PurchasingPowerResult = (result: PurchasingPowerResultType) => {
  const { period, inflation, amount } = result;

  // Determine if the user gained or lost purchasing power over the period
  const isGain = amount!.variation >= 0;
  const sign = isGain ? "+" : "";

  // Color scheme switches between green (gain) and red (loss) based on the result
  const accent = isGain
    ? {
        border: "border-green-600/30",
        bg: "bg-green-600/5",
        via: "via-green-600/60",
        label: "text-green-600/80",
        value: "text-green-400",
        sub: "text-green-600/50",
      }
    : {
        border: "border-red-600/30",
        bg: "bg-red-600/5",
        via: "via-red-600/60",
        label: "text-red-500/80",
        value: "text-red-400",
        sub: "text-red-500/50",
      };

  // Pre-format all values — each returns { short, full } for abbreviated vs full display
  const { short: shortVar, full: fullVar } = formatPercent(
    Math.abs(amount!.variation), // use absolute value, sign is handled separately
  );
  const { short: shortInfl, full: fullInfl } = formatPercent(
    inflation.variation,
  );
  const { short: shortInflAmount, full: fullInflAmount } = formatAmount(
    amount!.inflationAmount, // what the start amount would be worth today adjusted for inflation
  );
  const { short: shortDiff, full: fullDiff } = formatAmount(
    Math.abs(amount!.difference), // absolute nominal difference, sign handled separately
  );

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
      {/* Visual separator between the form and the results section */}
      <ResultsDivider />

      {/* Main stat: purchasing power gain or loss as a percentage */}
      <div
        className={`relative rounded-md border ${accent.border} ${accent.bg} p-5 overflow-hidden`}
      >
        {/* Decorative top gradient line using the accent color */}
        <div
          className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${accent.via} to-transparent`}
        />
        <p
          className={`text-xs tracking-[0.16em] uppercase ${accent.label} mb-1`}
        >
          {isGain
            ? "ganancia de poder adquisitivo"
            : "pérdida de poder adquisitivo"}
        </p>
        {/* Primary display: abbreviated percentage */}
        <p
          className={`text-4xl font-semibold ${accent.value} tracking-tight leading-none`}
        >
          {sign}
          {shortVar}
        </p>
        {/* Full percentage shown only when the value was abbreviated */}
        {shortVar !== fullVar && (
          <p className={`text-xs ${accent.sub} mt-0.5`}>
            {sign}
            {fullVar}
          </p>
        )}
        {/* Period summary: month count and date range */}
        <p className="text-xs text-text-secondary mt-1.5">
          {period.monthsCount} meses · {formatDate(period.start.date)} →{" "}
          {formatDate(period.end.date)}
        </p>
      </div>

      {/* Period inflation: the overall CPI increase over the selected period */}
      <div className="rounded-md border border-amber/20 bg-amber/5 px-4 py-3 flex items-center justify-between gap-4">
        <p className="text-xs tracking-[0.12em] uppercase text-amber/70 shrink-0">
          inflación del período
        </p>
        <div className="text-right">
          <p className="text-sm font-medium text-amber-400">+{shortInfl}</p>
          {shortInfl !== fullInfl && (
            <p className="text-xs text-amber/40">+{fullInfl}</p>
          )}
        </div>
      </div>

      {/* Amount cards: the two amounts entered by the user for comparison */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "monto inicial", value: amount!.startAmount },
          { label: "monto final", value: amount!.endAmount },
        ].map(({ label, value }) => {
          const { short, full } = formatAmount(value);
          return (
            <div
              key={label}
              className="rounded-md border border-border bg-surface-2 p-4 flex flex-col gap-1"
            >
              <ResultLabel label={label} />
              <p className="text-lg font-medium text-text-primary leading-tight">
                {short}
              </p>
              {/* Full value shown below when abbreviated */}
              {short !== full && (
                <p className="text-xs text-text-muted">{full}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Inflation-adjusted value: what the start amount is equivalent to in end-period money */}
      <div className="rounded-md border border-gray-800 bg-surface-2 p-4 flex items-center justify-between gap-4">
        <ResultLabel label="valor ajustado" />
        <div className="text-right">
          <p className="text-lg font-semibold text-text-primary">
            {shortInflAmount}
          </p>
          {shortInflAmount !== fullInflAmount && (
            <p className="text-xs text-text-muted">{fullInflAmount}</p>
          )}
        </div>
      </div>

      {/* Nominal difference: absolute gap between the end amount and the inflation-adjusted start amount */}
      <div className="rounded-md border border-gray-800 bg-gray-900 p-4 flex items-center justify-between gap-4">
        <ResultLabel label="diferencia nominal" />
        <div className="text-right">
          {/* Color reflects gain or loss */}
          <p
            className={`text-lg font-semibold ${isGain ? "text-green-400" : "text-red-400"}`}
          >
            {sign}
            {shortDiff}
          </p>
          {shortDiff !== fullDiff && (
            <p className="text-xs text-text-muted">
              {sign}
              {fullDiff}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
