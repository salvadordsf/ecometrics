import { Subtitle } from "@/src/components/ui/subtitle";
import { AnnualInflationCard } from "@/src/features/main-stats/components/cards/inflation/annual-inflation-card";
import { InflationCard } from "@/src/features/main-stats/components/cards/inflation/inflation-card";
import { REMAnnualInflation } from "@/src/features/main-stats/components/cards/inflation/rem-annual-inflation";
import { InflationVarCard } from "@/src/features/main-stats/components/cards/inflation/var-inflation-card";
import { StatusLabel } from "@/src/features/main-stats/components/status-label";

export const InflationMainCards = () => {
  return (
    <>
      <Subtitle subtitle="Datos principales" />
      <div className="flex flex-col items-center">
        <StatusLabel />
        <div className="flex flex-wrap justify-center gap-5">
          <InflationCard />
          <InflationVarCard />
          <AnnualInflationCard />
          <REMAnnualInflation />
        </div>
      </div>
    </>
  );
};
