import { Title } from "@/src/components/ui/title";
import { InflationChartContainer } from "./components/charts/inflation-chart-container";
import { InflationMainCards } from "./components/main-cards/inflation-main-cards";

export const InflationPage = () => {
  return (
    <section className="flex flex-col items-center gap-10 mt-10">
      <header className="flex flex-col items-center">
        <Title title="Inflación" label="Variación, expectativas y relaciones" />
        <p className="text-center text-md text-text-secondary p-2">
          Evolución histórica del IPC, expectativas de mercado y su relación con
          el tipo de cambio y las reservas.
        </p>
      </header>
      <main className="flex flex-col">
        <InflationMainCards />
      </main>
      <section className="w-full">
        <InflationChartContainer />
      </section>
    </section>
  );
};
