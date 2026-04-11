import axios from "axios";
import {
  InflationDataInf,
  InflationResponseType,
} from "../types/inflation-types";

export const getInflation = async (): Promise<InflationDataInf> => {
  try {
    const res = await axios.get<InflationResponseType>(
      "https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/27?limit=3000",
    );

    const data = res.data;
    const finalRes: InflationDataInf = {
      inflationRecord: data.results
        .flatMap((rec) => rec.detalle)
        .reverse()
        .map((detalle) => [detalle.fecha, detalle.valor]),
      inflationRecordCount: data.metadata.resultset.count,
      startDate:
        data.results[0].detalle[data.metadata.resultset.count - 1].fecha,
      endDate: data.results[0].detalle[0].fecha,
      title: "Variación mensual del índice de precios al consumidor",
      source: "Banco Central de la República Argentina (BCRA)",
    };

    return finalRes;
  } catch (error) {
    throw new Error("Error fetching IPC.");
  }
};
