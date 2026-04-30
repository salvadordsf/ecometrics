import { Title } from "@/src/components/ui/title";
import { TotalPrivateDebt } from "./total-debt";
import { TotalPrivateDebtPieChart } from "./chart/ars-debt/pie/debt-pie-chart";
import { TotalPrivateUsdDebtPieChart } from "./chart/usd-debt/pie/debt-usd-pie-chart";
import { DebtTypesDescription } from "./debt-types-descriptions";
import { DebtLineChart } from "./chart/ars-debt/line/debt-line-chart";
import { Subtitle } from "@/src/components/ui/subtitle";
import { DebtUsdLineChart } from "./chart/usd-debt/line/debt-line-chart";

export const PrivateDebtPage = () => {
  return (
    <section className="flex flex-col items-center gap-10 mt-10 mx-auto">
      <header className="flex flex-col items-center">
        <Title title="Deuda privada" label="Total y composicón" />
        <p className="text-center text-md text-text-secondary p-2">
          El crédito al sector privado refleja el nivel de financiamiento que el
          sistema bancario argentino otorga a empresas y personas. Su
          composición y evolución son indicadores clave de la actividad
          económica, el acceso al crédito y la exposición del sistema
          financiero.
        </p>
      </header>
      <main className="flex flex-col items-center px-2">
        <TotalPrivateDebt />
      </main>
      <section className="w-full">
        <Subtitle subtitle="Deuda privada en moneda local" />
        <TotalPrivateDebtPieChart />
        <DebtLineChart />
      </section>
      <section className="w-full">
        <Subtitle subtitle="Deuda privada en moneda extranjera" />
        <TotalPrivateUsdDebtPieChart />
        <DebtUsdLineChart />
      </section>
      <section className="w-full">
        <Subtitle subtitle="Definiciones y análisis" />
        <div className="flex flex-col gap-5 divide-surface-2 divide-y">
          <DebtTypesDescription />
        </div>
      </section>
    </section>
  );
};
