import axios from "axios";
import {
  ILastInflation,
  InflationDataInf,
  InflationResponseType,
} from "../types/inflation-types";
import { formatDate } from "@/src/utils/formate-date-es";

// Last month inflation
export const getLastInflation = async (): Promise<ILastInflation> => {
  try {
    const res = await axios.get<InflationResponseType>(
      "https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/27?limit=1",
    );

    const data = res.data.results[0];

    const finalRes = {
      title: "Inflación mensual",
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
    throw new Error("Error fetching Inflation.");
  }
};

// Last interannual inflation
export const getLastAnnualInflation = async (): Promise<ILastInflation> => {
  try {
    const res = await axios.get<InflationResponseType>(
      "https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/28?limit=1",
    );

    const data = res.data.results[0];

    const finalRes = {
      title: "Inflación interanual",
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
    throw new Error("Error fetching annual Inflation.");
  }
};

// Last interannual inflation
export const getREMInflation = async (): Promise<ILastInflation> => {
  try {
    const res = await axios.get<InflationResponseType>(
      "https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/29?limit=1",
    );

    const data = res.data.results[0];

    const finalRes = {
      title: "Expectativas de inflación a 12 meses (REM)",
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
    throw new Error("Error fetching annual Inflation.");
  }
};

//Get all the inflation records
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
    throw new Error("Error fetching Inflation.");
  }
};
