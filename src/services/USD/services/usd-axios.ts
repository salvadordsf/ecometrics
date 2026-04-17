import { formatDate } from "@/src/utils/formate-date-es";
import axios from "axios";
import {
  IGetUSDVariation,
  IUSDSExchangeReturn,
  USDResponseType,
  USDSExchangeResponseType,
} from "../types/usd-types";

//DOLAR API: https://dolarapi.com/v1/dolares

// Last USDs exchange
export const getLastUSDExchange = async (): Promise<IUSDSExchangeReturn> => {
  try {
    const res = await axios.get<USDSExchangeResponseType>(
      "https://dolarapi.com/v1/dolares",
    );

    const data = res.data;

    const getValues = (filter: string) => {
      const usd = data.filter(record => record.casa === filter)[0];
      return {
        buy: usd.compra,
        sale: usd.venta,
      }
    }

    const finalRes: IUSDSExchangeReturn = {
      title: "Cotización Dólares",
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
    throw new Error("Error fetching USD exchange.");
  }
};

//BCRA
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
