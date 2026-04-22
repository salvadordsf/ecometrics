import axios from "axios";
import { formatDate } from "@/src/utils/formate-date-es";
import { IBCRAResponse } from "@/src/types/bcra-response-types";
import { ILastRecordResponse } from "@/src/types/domain-types";

const ML_DEPOSITS_URL =
  "https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/100?limit=1";

const ME_DEPOSITS_URL =
  "https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/104?limit=1";

export const getARSDeposits = async (): Promise<ILastRecordResponse> => {
  try {
    const res = await axios.get<IBCRAResponse>(ML_DEPOSITS_URL);

    const data = res.data.results[0].detalle[0];

    const finalRes: ILastRecordResponse = {
      title: "Depósitos del sector privado ML no financiero (incluye cedros)",
      source: "Banco Central de la República Argentina (BCRA)",
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

export const getMEDeposits = async (): Promise<ILastRecordResponse> => {
  try {
    const res = await axios.get<IBCRAResponse>(ME_DEPOSITS_URL);

    const data = res.data.results[0].detalle[0];

    const finalRes: ILastRecordResponse = {
      title: "Depósitos del sector privado ME no financiero",
      source: "Banco Central de la República Argentina (BCRA)",
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
    throw new Error("Error al obtener Depositos del sector privado no financiero del BCRA. Intente más tarde.")
  }
};
