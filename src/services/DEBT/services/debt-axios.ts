import axios from "axios";
import { formatDate } from "@/src/utils/formate-date-es";
import {
  ILastPrivateDebts,
  IPrivateDebts,
  RecordType,
} from "@/src/types/domain-types";
import { IBCRAResponse } from "@/src/types/bcra-response-types";

export const LAST_DEBT_IDS = {
  adelantos: 110,
  documentos: 111,
  hipotecario: 112,
  prendario: 113,
  personal: 114,
  tarjeta: 115,
  otros: 116,
  totalArs: 117,

  cuentaCorrienteUsd: 118,
  documentosUsd: 119,
  hipotecarioUsd: 120,
  prendarioUsd: 121,
  personalUsd: 122,
  tarjetaUsd: 123,
  otrosUsd: 124,
  totalUsd: 125,
  totalUsdInArs: 126,

  totalConsolidado: 127,
} as const;

export const getLastPrivateDebts = async (): Promise<ILastPrivateDebts> => {
  try {
    const entries = Object.entries(LAST_DEBT_IDS);

    const res = await Promise.all(
      entries.map(async ([keyof, id]) => {
        const res = await axios.get<IBCRAResponse>(
          `https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/${id}?limit=1`,
        );

        const data = res.data;

        return {
          labels: {
            debtType:
              keyof === "totalArs"
                ? "Total en ARS"
                : keyof === "totalUsd"
                  ? "Total en USD"
                  : "Total consolidado en ARS",
            lastDate: formatDate(data.results[0].detalle[0].fecha),
            unit: keyof.endsWith("Usd") ? "Millones de USD" : "Millones de ARS",
          },
          lastDate: data.results[0].detalle[0].fecha,
          periodicity: "daily",
          debtType: keyof,
          value: data.results[0].detalle[0].valor,
        };
      }),
    );

    const finalRes = {
      title: "Prestamos al sector privado",
      source: "Banco Central de la República Argentina (BCRA)",
      lastDate: res[0].lastDate,
      values: res,
    };

    return finalRes;
  } catch (error) {
    throw new Error("Error al obtener Reservas del BCRA. Intente más tarde.");
  }
};

export const DEBT_IDS = {
  adelantos: 110,
  documentos: 111,
  hipotecario: 112,
  prendario: 113,
  personal: 114,
  tarjeta: 115,
  otros: 116,
  totalArs: 117,

  cuentaCorrienteUsd: 118,
  documentosUsd: 119,
  hipotecarioUsd: 120,
  prendarioUsd: 121,
  personalUsd: 122,
  tarjetaUsd: 123,
  otrosUsd: 124,
  totalUsd: 125,
  totalUsdInArs: 126,

  totalConsolidado: 127,
} as const;

export const getPrivateDebts = async (limit = 3000): Promise<IPrivateDebts> => {
  try {
    const entries = Object.entries(DEBT_IDS);

    const res = await Promise.all(
      entries.map(async ([keyof, id]) => {
        const res = await axios.get<IBCRAResponse>(
          `https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/${id}?limit=${limit}`,
        );

        const data = res.data;

        return {
          labels: {
            debtType:
              keyof === "totalArs"
                ? "Total en ARS"
                : keyof === "totalUsd"
                  ? "Total en USD"
                  : keyof === "totalUsdInArs"
                    ? "Total USD expresado en ARS"
                    : "Total consolidado en ARS",
            lastDate: formatDate(data.results[0].detalle[0].fecha),
            unit: keyof.endsWith("Usd") ? "Millones de USD" : "Millones de ARS",
          },
          lastDate: data.results[0].detalle[0].fecha,
          periodicity: "daily",
          debtType: keyof,
          records: data.results[0].detalle.map(
            (rec) => [rec.fecha, rec.valor] as RecordType,
          ).reverse(),
        };
      }),
    );

    const finalRes = {
      title: "Historico de prestamos al sector privado",
      source: "Banco Central de la República Argentina (BCRA)",
      lastDate: res[0].lastDate,
      values: res,
    };

    return finalRes;
  } catch (error) {
    throw new Error("Error al obtener Reservas del BCRA. Intente más tarde.");
  }
};
