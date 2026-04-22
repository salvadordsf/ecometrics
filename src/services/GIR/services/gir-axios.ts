import axios from "axios";
import { formatDate } from "@/src/utils/formate-date-es";
import { ILastRecordResponse } from "@/src/types/domain-types";
import { IBCRAVarMeta } from "@/src/types/bcra-response-types";

const lastDateUrl =
  "https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias?limit=1";

export const getLastGIR = async (): Promise<ILastRecordResponse> => {
  try {
    const res = await axios.get<IBCRAVarMeta>(lastDateUrl);

    const data = res.data.results[0];

    const finalRes = {
      title: data.descripcion,
      source: "Banco Central de la República Argentina (BCRA)",
      periodicity: "daily",
      unit: "Millions ARS",
      value: data.ultValorInformado,
      lastDate: data.ultFechaInformada,
      labels: {
        periodicity: "diaria",
        unit: "Millones de pesos ARS",
        lastDate: formatDate(data.ultFechaInformada),
      },
    };

    return finalRes;
  } catch (error) {
    throw new Error("Error al obtener Reservas del BCRA. Intente más tarde.")
  }
};
