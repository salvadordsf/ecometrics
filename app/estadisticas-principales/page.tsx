import { Title } from "@/src/components/ui/title";
import { GirCard } from "@/src/features/main-stats/components/gir-card";
import { InflationCard } from "@/src/features/main-stats/components/inflation-card";

export default function MainEconomicsStats() {
  return (
    <div className="max-w-xl my-0 mx-auto py-10">
      <Title title="Salud Macroeconómica Argentina" label="Principales estadísticas" />
      <div className="flex flex-wrap justify-center gap-5">
        <GirCard />
        <InflationCard />
        <GirCard />
        <GirCard />
      </div>
    </div>
  );
}
