import { Title } from "@/src/components/ui/title";
import { GirCard } from "@/src/features/main-stats/components/gir-card";
import { InflationCard } from "@/src/features/main-stats/components/inflation-card";
import { RealRateARSCard } from "@/src/features/main-stats/components/real-rate-ARS-card";
import { UsdVariationCard } from "@/src/features/main-stats/components/usd-variation";

export default function MainEconomicsStats() {
  return (
    <div className="mt-10 flex flex-col items-center">
      <Title title="Salud Macroeconómica Argentina" label="Principales estadísticas" />
      <div className="flex flex-wrap justify-center gap-5">
        <GirCard />
        <InflationCard />
        <UsdVariationCard />
        <RealRateARSCard />
      </div>
    </div>
  );
}
