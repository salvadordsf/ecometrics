import { IArgDatosHis } from "@/src/types/argentina-datos-types";
import { IBCRAResponse } from "@/src/types/bcra-response-types";
import { IDolarApiCotization, USDCasaType } from "@/src/types/dolar-api-types";
import {
  IGetUSDVariation,
  IRecordResponse,
  IUSDCasaHis,
  IUSDSExchangeReturn,
  RecordType,
} from "@/src/types/domain-types";
import { formatDate } from "@/src/utils/formate-date-es";
import axios from "axios";

//DOLAR API: https://dolarapi.com/v1/dolares

// Last USDs exchange
export const getLastUSDExchange = async (): Promise<IUSDSExchangeReturn> => {
  try {
    const res = await axios.get<IDolarApiCotization[]>(
      "https://dolarapi.com/v1/dolares",
    );

    const data = res.data;

    const getValues = (filter: string) => {
      const usd = data.filter((record) => record.casa === filter)[0];
      return {
        buy: usd.compra,
        sale: usd.venta,
      };
    };

    const finalRes: IUSDSExchangeReturn = {
      title: "Cotización Dólares",
      source: "Dolar API",
      periodicity: "d",
      unit: "ARS",
      lastDate: data[0]?.fechaActualizacion,
      labels: {
        periodicity: "diaria",
        unit: "ARS",
        lastDate: new Date(data[0]?.fechaActualizacion).toLocaleDateString(
          "es-AR",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          },
        ),
      },
      values: {
        oficial: {
          title: "USD Oficial",
          unit: "ARS",
          values: getValues("oficial"),
        },
        blue: {
          title: "USD Blue",
          unit: "ARS",
          values: getValues("blue"),
        },
        bolsa: {
          title: "USD Bolsa",
          unit: "ARS",
          values: getValues("bolsa"),
        },
        CCL: {
          title: "USD Contado con liquidación",
          unit: "ARS",
          values: getValues("contadoconliqui"),
        },
        mayorista: {
          title: "USD Mayorista",
          unit: "ARS",
          values: getValues("mayorista"),
        },
        cripto: {
          title: "USD Cripto",
          unit: "ARS",
          values: getValues("cripto"),
        },
        tarjeta: {
          title: "USD Tarjeta",
          unit: "ARS",
          values: getValues("tarjeta"),
        },
      },
    };

    return finalRes;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Error al obtener Cotizaciones de USDs de DolarAPI. Intente más tarde.",
    );
  }
};

//Argentina datos API: https://api.argentinadatos.com/v1/cotizaciones/
// USD oficial exchange
//URL: https://api.argentinadatos.com/v1/cotizaciones/dolares/{casa}
export const getUSDCasaExchange = async (
  casa: USDCasaType,
): Promise<IUSDCasaHis> => {
  try {
    const res = await axios.get<IArgDatosHis[]>(
      `https://api.argentinadatos.com/v1/cotizaciones/dolares/${casa}`,
    );

    const data = res.data;

    const finalRes: IUSDCasaHis = {
      title: `Cotización USD ${casa === "contadoconliqui" ? "CCL" : casa}`,
      source: "Argentina Datos API",
      periodicity: "d",
      unit: "ARS",
      lastDate: data[data.length - 1].fecha,
      labels: {
        periodicity: "diaria",
        unit: "ARS",
        lastDate: new Date(data[data.length - 1].fecha).toLocaleDateString(
          "es-AR",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          },
        ),
      },
      values: data.map((rec) => ({
        date: rec.fecha,
        buy: rec.compra,
        sale: rec.venta,
      })),
    };

    return finalRes;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Error al obtener la Cotización de USD ${casa === "contadoconliqui" ? "CCL" : casa} de ArgentinaDatosAPI. Intente más tarde.`,
    );
  }
};

export const getUSDCasaVariationExchange = async (
  casa: USDCasaType,
  startDate: string,
): Promise<IRecordResponse> => {
  try {
    const usdHis = await getUSDCasaExchange(casa);

    const filteredRecords = usdHis.values.filter(
      (rec) => rec.date >= startDate && rec.date.endsWith("01"),
    );

    const varRecords: RecordType[] = filteredRecords
      .map((usdRec, i) => {
        if (!filteredRecords[i + 1]) return null;

        const variation = Number(
          (
            ((filteredRecords[i + 1].sale - usdRec.sale) / usdRec.sale) *
            100
          ).toFixed(2),
        );

        return [usdRec.date.slice(0, 7) as string, variation] as RecordType;
      })
      .filter((rec) => rec !== null);
    const finalRes: IRecordResponse = {
      title: `Variación mensual de la cotización del USD ${casa === "contadoconliqui" ? "CCL" : casa}`,
      source: "Argentina Datos API",
      record: varRecords,
      recordCount: varRecords.length,
      startDate: varRecords[0][0],
      endDate: varRecords[varRecords.length - 1][0],
    };

    return finalRes;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Error al obtener la Variación de la Cotización de USD ${casa === "contadoconliqui" ? "CCL" : casa} de ArgentinaDatosAPI. Intente más tarde.`,
    );
  }
};

//BCRA
export const getUSDVariation = async (
  limit = 3000,
): Promise<IGetUSDVariation> => {
  try {
    const res = await axios.get<IBCRAResponse>(
      `https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/4?limit=${limit}`,
    );

    const data = res.data.results[0];

    //Calculate the variation
    const startRecord = data.detalle[data.detalle.length - 1];
    const endRecord = data.detalle[0];
    const variation = (startRecord.valor - endRecord.valor) / startRecord.valor;

    const finalRes = {
      title: "Variación mensual del tipo de cambio USD",
      source: "Banco Central de la República Argentina (BCRA)",
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
    throw new Error(
      `Error al obtener la Variación de la Cotización de USD de BCRA. Intente más tarde.`,
    );
  }
};
