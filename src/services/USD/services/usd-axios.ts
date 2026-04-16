import { formatDate } from "@/src/utils/formate-date-es";
import axios from "axios";
import { IGetUSDVariation, USDResponseType } from "../types/usd-types";

export const getUSDVariation = async (): Promise<IGetUSDVariation> => {
  try {
    const res = await axios.get<USDResponseType>(
      "https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/4?limit=30",
    );

    const data = res.data.results[0];

    //Calculate the variation
    const startRecord = data.detalle[data.detalle.length - 1];
    const endRecord = data.detalle[0];
    const variation = (startRecord.valor - endRecord.valor) / startRecord.valor;

    const finalRes = {
      title: "Variación mensual del tipo de cambio USD",
      periodicity: "monthly",
      unit: "%",
      value: variation,
      dates: {
        prevDate: formatDate(startRecord.fecha),
        lastDate: formatDate(endRecord.fecha),
      },
      labels: {
        periodicity: "mensual",
        unit: "%",
        dates: {
          prevDate: formatDate(startRecord.fecha),
          lastDate: formatDate(endRecord.fecha),
        },
      },
    };

    return finalRes;
  } catch (error) {
    throw new Error("Error fetching USD variation.");
  }
};
