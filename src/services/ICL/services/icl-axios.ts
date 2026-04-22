import axios from "axios";
import { IBCRAResponse } from "@/src/types/bcra-response-types";
import { IRecordResponse, RecordType } from "@/src/types/domain-types";

export const getICL = async (): Promise<IRecordResponse> => {
  try {
    const res = await axios.get<IBCRAResponse>(
      "https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/40?limit=3000",
    );

    const data = res.data;

    const finalRes = {
      title: "Índice para Contratos de Locación (base 30.6.20=1)",
      source: "Banco Central de la República Argentina (BCRA)",
      record: data.results
        .filter((rec) => rec.idVariable === 40)
        .flatMap((rec) => rec.detalle)
        .reverse()
        .map((detalle): RecordType => [detalle.fecha, detalle.valor]),
      recordCount: data.metadata.resultset.count,
      endDate: data.results[0].detalle[0].fecha,
      startDate:
        data.results[0].detalle[data.results[0].detalle.length - 1].fecha,
    };

    return finalRes;
  } catch (error) {
    throw new Error("Error al obtener ICL del BCRA. Intente más tarde.")
  }
};
