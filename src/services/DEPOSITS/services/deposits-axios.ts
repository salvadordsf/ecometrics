import axios from "axios";
import { formatDate } from "@/src/utils/formate-date-es";
import {
  DepositsResponseType,
  ARSDepositsReturnType,
  MEDepositsReturnType,
} from "../types/deposits-types";

const ARSDepositsUrl =
  "https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/100?limit=1";

export const getARSDeposits = async (): Promise<ARSDepositsReturnType> => {
  try {
    const res = await axios.get<DepositsResponseType>(ARSDepositsUrl);

    const data = res.data.results[0].detalle[0];

    const finalRes: ARSDepositsReturnType = {
      title: "Depósitos del sector privado ML no financiero (incluye cedros)",
      periodicity: "daily",
      unit: "Millions ARS",
      value: data.valor,
      lastDate: data.fecha,
      labels: {
        periodicity: "diaria",
        unit: "Millones de pesos ARS",
        lastDate: formatDate(data.fecha),
      },
    };

    return finalRes;
  } catch (error) {
    throw new Error("Error fetching GIR.");
  }
};

const MEDepositsUrl =
  "https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/104?limit=1";

export const getMEDeposits = async (): Promise<MEDepositsReturnType> => {
  try {
    const res = await axios.get<DepositsResponseType>(MEDepositsUrl);

    const data = res.data.results[0].detalle[0];

    const finalRes: MEDepositsReturnType = {
      title: "Depósitos del sector privado ME no financiero",
      periodicity: "daily",
      unit: "Millions ARS",
      value: data.valor,
      lastDate: data.fecha,
      labels: {
        periodicity: "diaria",
        unit: "Millones de pesos ARS",
        lastDate: formatDate(data.fecha),
      },
    };

    return finalRes;
  } catch (error) {
    throw new Error("Error fetching GIR.");
  }
};
