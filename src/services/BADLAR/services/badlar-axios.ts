import axios from "axios";
import { formatDate } from "@/src/utils/formate-date-es";
import { ILastBADLAR, LastBADLARResponseTypes } from "../types/badlar-types";

const lastDateUrl =
  "https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/7?limit=1";

export const getLastBADLAR = async (): Promise<ILastBADLAR> => {
  try {
    const res = await axios.get<LastBADLARResponseTypes>(lastDateUrl);

    const data = res.data.results[0].detalle[0];
    console.log(data)
    const finalRes = {
      title: "Tasa de interés BADLAR de bancos privados",
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

    console.log(finalRes);
    return finalRes;
  } catch (error) {
    throw new Error("Error fetching BADLAR.");
  }
};
