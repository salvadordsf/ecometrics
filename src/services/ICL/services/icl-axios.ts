import axios from "axios";
import { IclDataInf, IclRecord, ICLResponseType } from "../types/icl-types";

export const getICL = async (): Promise<IclDataInf> => {
  try {
    const res = await axios.get<ICLResponseType>(
      "https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/40?limit=3000",
    );

    const data = res.data;

    const finalRes = {
      iclRecord: data.results
      .filter((rec) => rec.idVariable === 40)
      .flatMap((rec) => rec.detalle)
      .reverse()
        .map((detalle): IclRecord => [detalle.fecha, detalle.valor]),
      iclRecordCount: data.metadata.resultset.count,
      endDate: data.results[0].detalle[0].fecha,
      startDate:
        data.results[0].detalle[
          data.results[0].detalle.length - 1
        ].fecha,
      title: "Índice para Contratos de Locación (base 30.6.20=1)",
      source: "Banco Central de la República Argentina (BCRA)",
    };

    return finalRes;
  } catch (error) {
    throw new Error("Error fetching ICL.");
  }
};
