import axios from "axios";
import { ILastGIR, LastGIRResponseTypes } from "../types/gir-types";
import { formatDate } from "@/src/utils/formate-date-es";

const lastDateUrl =
  "https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias?limit=1";

export const getLastGIR = async (): Promise<ILastGIR> => {
  try {
    const res = await axios.get<LastGIRResponseTypes>(lastDateUrl);

    const data = res.data.results[0];

    const finalRes = {
      title: data.descripcion,
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
    throw new Error("Error fetching GIR.");
  }
};
