import axios from "axios";
import { formatDate } from "@/src/utils/formate-date-es";
import { IBCRAResponse } from "@/src/types/bcra-response-types";
import { ILastRecordResponse } from "@/src/types/domain-types";

const LAST_BADLAR_URL =
  "https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/7?limit=1";

export const getLastBADLAR = async (): Promise<ILastRecordResponse> => {
  try {
    const res = await axios.get<IBCRAResponse>(LAST_BADLAR_URL);

    const data = res.data.results[0].detalle[0];
  
    const finalRes = {
      title: "Tasa de interés BADLAR de bancos privados",
      source: "Banco Central de la República Argentina (BCRA)",
      periodicity: "daily",
      unit: "% annual nominal",
      value: data.valor,
      lastDate: data.fecha,
      labels: {
        periodicity: "diaria",
        unit: "% anual nominal",
        lastDate: formatDate(data.fecha),
      },
    };

    return finalRes;
  } catch (error) {
    throw new Error("Error al obtener indice BADLAR del BCRA. Intente más tarde.")
  }
};
