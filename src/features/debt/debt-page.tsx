import { Title } from "@/src/components/ui/title";
import { TotalPrivateDebt } from "./components/total-debt";
import { TotalPrivateDebtPieChart } from "./components/debt-pie-chart";
import { TotalPrivateUsdDebtPieChart } from "./components/debt-usd-pie-chart";
import { DebtTypesDescription } from "./components/debt-types-descriptions";

export const PrivateDebtPage = () => {
  return (
    <section className="flex flex-col items-center gap-10 mt-10 max-w-3xl mx-auto">
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
      <main className="flex flex-col items-center">
        <TotalPrivateDebt />
      </main>
      <section className="w-full">
        <TotalPrivateDebtPieChart />
      </section>
      <section className="w-full">
        <TotalPrivateUsdDebtPieChart />
      </section>
      <section className="flex flex-col gap-5 divide-surface-2 divide-y mt-10">
        <DebtTypesDescription />
      </section>
    </section>
  );
};
