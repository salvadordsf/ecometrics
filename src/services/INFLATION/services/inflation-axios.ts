import axios from "axios";
import { formatDate } from "@/src/utils/formate-date-es";
import { ILastRecordResponse, IRecordResponse } from "@/src/types/domain-types";
import { IBCRAResponse } from "@/src/types/bcra-response-types";

// Last month inflation
export const getLastInflation = async (): Promise<ILastRecordResponse> => {
  try {
    const res = await axios.get<IBCRAResponse>(
      "https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/27?limit=1",
    );

    const data = res.data.results[0];

    const finalRes = {
      title: "Inflación mensual",
      source: "Banco Central de la República Argentina (BCRA)",
      periodicity: "monthly",
      unit: "%",
      value: data.detalle[0].valor,
      lastDate: data.detalle[0].fecha,
      labels: {
        periodicity: "mensual",
        unit: "%",
        lastDate: formatDate(data.detalle[0].fecha),
      },
    };

    return finalRes;
  } catch (error) {
    throw new Error("Error al obtener Inflación mensual del BCRA. Intente más tarde.")
  }
};

// Last interannual inflation
export const getLastAnnualInflation =
  async (): Promise<ILastRecordResponse> => {
    try {
      const res = await axios.get<IBCRAResponse>(
        "https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/28?limit=1",
      );

      const data = res.data.results[0];

      const finalRes = {
        title: "Inflación interanual",
        source: "Banco Central de la República Argentina (BCRA)",
        periodicity: "monthly",
        unit: "%",
        value: data.detalle[0].valor,
        lastDate: data.detalle[0].fecha,
        labels: {
          periodicity: "mensual",
          unit: "%",
          lastDate: formatDate(data.detalle[0].fecha),
        },
      };

      return finalRes;
    } catch (error) {
      throw new Error("Error al obtener Inflación interanual del BCRA. Intente más tarde.")
    }
  };

// Last interannual inflation
export const getREMInflation = async (): Promise<ILastRecordResponse> => {
  try {
    const res = await axios.get<IBCRAResponse>(
      "https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/29?limit=1",
    );

    const data = res.data.results[0];

    const finalRes = {
      title: "Expectativas de inflación a 12 meses (REM)",
      source: "Banco Central de la República Argentina (BCRA)",
      periodicity: "monthly",
      unit: "%",
      value: data.detalle[0].valor,
      lastDate: data.detalle[0].fecha,
      labels: {
        periodicity: "mensual",
        unit: "%",
        lastDate: formatDate(data.detalle[0].fecha),
      },
    };

    return finalRes;
  } catch (error) {
    throw new Error("Error al obtener Expectativas de inflación a 12 meses (REM) del BCRA. Intente más tarde.")
  }
};

//Get all the inflation records
export const getInflation = async (limit = 3000): Promise<IRecordResponse> => {
  try {
    const res = await axios.get<IBCRAResponse>(
      `https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/27?limit=${limit}`,
    );

    const data = res.data;
    
    const finalRes: IRecordResponse = {
      title: "Variación mensual del índice de precios al consumidor",
      source: "Banco Central de la República Argentina (BCRA)",
      record: data.results
        .flatMap((rec) => rec.detalle)
        .reverse()
        .map((detalle) => [detalle.fecha, detalle.valor]),
      recordCount: data.metadata.resultset.count,
      startDate:
        data.results[0].detalle[data.results[0].detalle.length - 1].fecha,
      endDate: data.results[0].detalle[0].fecha,
    };

    return finalRes;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener Variación mensual del índice de precios al consumidor del BCRA. Intente más tarde.")
  }
};
