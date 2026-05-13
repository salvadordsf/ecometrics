"use client";

import { useMemo } from "react";
import { ErrorVarCard } from "@/src/features/main-stats/components/cards/error-card";
import { useInflationByCategories } from "@/src/services/INFLATION/services/inflation-query";
import { Loader } from "@/src/components/ui/loader";
import Heatmap from "@/src/components/ui/chart/heatmap/heatmap";
import { INFLATION_BY_CATEGORY_TYPE_LABEL } from "../../../utils/inflation-type-labels";
import { Subtitle } from "@/src/components/ui/subtitle";
import { formatDate } from "@/src/utils/formate-date-es";

const START_DATE_CHART = "2024-12-01";

export const InflationByCategoryChartContainer = () => {
  // Inflation by category of IPC (IPC Variation)
  const {
    data: inflations,
    isLoading,
    isError,
  } = useInflationByCategories(START_DATE_CHART);

  const records = useMemo(() => {
    if (!inflations) return null;
    return inflations.records ? inflations?.records : null;
  }, [inflations]);

  if (isLoading) return <Loader />;
  if (isError || !records)
    return (
      <ErrorVarCard title="Gráfico inflacionario por categoría" api="bcra" />
    );

  return (
    <div>
      <header className="flex flex-col pb-5">
        <Subtitle subtitle="Inflación mensual por categoría" />
        <p className=" text-md text-text-secondary p-2">
          Variación porcentual mensual del IPC por categoría desde{" "}
          {formatDate("2025-02-01")} al día de hoy.
        </p>
      </header>
      <div className="flex justify-center">
        <Heatmap
          data={records}
          XAxis="date"
          valueUnit="%"
          values={{
            min: 0,
            max: 6,
          }}
          rows={[
            {
              dataKey: "alimentos",
              label: INFLATION_BY_CATEGORY_TYPE_LABEL.alimentos,
            },
            {
              dataKey: "alcoholTabaco",
              label: INFLATION_BY_CATEGORY_TYPE_LABEL.alcoholTabaco,
            },
            {
              dataKey: "bienesServicios",
              label: INFLATION_BY_CATEGORY_TYPE_LABEL.bienesServicios,
            },
            {
              dataKey: "comunicaciones",
              label: INFLATION_BY_CATEGORY_TYPE_LABEL.comunicaciones,
            },
            {
              dataKey: "educacion",
              label: INFLATION_BY_CATEGORY_TYPE_LABEL.educacion,
            },
            {
              dataKey: "mantenimientoHogar",
              label: INFLATION_BY_CATEGORY_TYPE_LABEL.mantenimientoHogar,
            },
            {
              dataKey: "vestimenta",
              label: INFLATION_BY_CATEGORY_TYPE_LABEL.vestimenta,
            },
            {
              dataKey: "cultura",
              label: INFLATION_BY_CATEGORY_TYPE_LABEL.cultura,
            },
            {
              dataKey: "hotelRestaurant",
              label: INFLATION_BY_CATEGORY_TYPE_LABEL.hotelRestaurant,
            },
            { dataKey: "salud", label: INFLATION_BY_CATEGORY_TYPE_LABEL.salud },
            {
              dataKey: "transporte",
              label: INFLATION_BY_CATEGORY_TYPE_LABEL.transporte,
            },
            {
              dataKey: "viviendaServicios",
              label: INFLATION_BY_CATEGORY_TYPE_LABEL.viviendaServicios,
            },
            {
              dataKey: "general",
              label: INFLATION_BY_CATEGORY_TYPE_LABEL.general,
            },
          ]}
        />
      </div>
    </div>
  );
};
