import axios from "axios";
import { formatDate } from "@/src/utils/formate-date-es";
import {
  IInflationByCategories,
  ILastRecordResponse,
  IRecordResponse,
} from "@/src/types/domain-types";
import { IBCRAResponse } from "@/src/types/bcra-response-types";
import { IINDECResponse } from "@/src/types/indec-types";

// Last month inflation
export const getLastInflation = async (): Promise<ILastRecordResponse> => {
  try {
    const res = await axios.get<IBCRAResponse>(
      "https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/27?limit=1",
    );

    const data = res.data.results[0];

    const finalRes = {
      title: "Inflación mensual",
      source: "Banco Central de la República Argentina (BCRA)",
      periodicity: "monthly",
      unit: "%",
      value: data.detalle[0].valor,
      lastDate: data.detalle[0].fecha,
      labels: {
        periodicity: "mensual",
        unit: "%",
        lastDate: formatDate(data.detalle[0].fecha),
      },
    };

    return finalRes;
  } catch (error) {
    throw new Error(
      "Error al obtener Inflación mensual del BCRA. Intente más tarde.",
    );
  }
};

// Last interannual inflation
export const getLastAnnualInflation =
  async (): Promise<ILastRecordResponse> => {
    try {
      const res = await axios.get<IBCRAResponse>(
        "https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/28?limit=1",
      );

      const data = res.data.results[0];

      const finalRes = {
        title: "Inflación interanual",
        source: "Banco Central de la República Argentina (BCRA)",
        periodicity: "monthly",
        unit: "%",
        value: data.detalle[0].valor,
        lastDate: data.detalle[0].fecha,
        labels: {
          periodicity: "mensual",
          unit: "%",
          lastDate: formatDate(data.detalle[0].fecha),
        },
      };

      return finalRes;
    } catch (error) {
      throw new Error(
        "Error al obtener Inflación interanual del BCRA. Intente más tarde.",
      );
    }
  };

// Last interannual inflation
export const getREMInflation = async (): Promise<ILastRecordResponse> => {
  try {
    const res = await axios.get<IBCRAResponse>(
      "https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/29?limit=1",
    );

    const data = res.data.results[0];

    const finalRes = {
      title: "Expectativas de inflación a 12 meses (REM)",
      source: "Banco Central de la República Argentina (BCRA)",
      periodicity: "monthly",
      unit: "%",
      value: data.detalle[0].valor,
      lastDate: data.detalle[0].fecha,
      labels: {
        periodicity: "mensual",
        unit: "%",
        lastDate: formatDate(data.detalle[0].fecha),
      },
    };

    return finalRes;
  } catch (error) {
    throw new Error(
      "Error al obtener Expectativas de inflación a 12 meses (REM) del BCRA. Intente más tarde.",
    );
  }
};

//Get all the inflation records
export const getInflation = async (limit = 3000): Promise<IRecordResponse> => {
  try {
    const res = await axios.get<IBCRAResponse>(
      `https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/27?limit=${limit}`,
    );

    const data = res.data;

    const finalRes: IRecordResponse = {
      title: "Variación mensual del índice de precios al consumidor",
      source: "Banco Central de la República Argentina (BCRA)",
      record: data.results
        .flatMap((rec) => rec.detalle)
        .reverse()
        .map((detalle) => [detalle.fecha, detalle.valor]),
      recordCount: data.metadata.resultset.count,
      startDate:
        data.results[0].detalle[data.results[0].detalle.length - 1].fecha,
      endDate: data.results[0].detalle[0].fecha,
    };

    return finalRes;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Error al obtener Variación mensual del índice de precios al consumidor del BCRA. Intente más tarde.",
    );
  }
};

//INDEC API: https://apis.datos.gob.ar/series/api/series
// INFLATION by categories
//URL: https://apis.datos.gob.ar/series/api/series/?ids=146.3_IALIMENNAL_DICI_M_45,146.3_IBEBIDANAL_DICI_M_39,146.3_IBIENESNAL_DICI_M_36,146.3_ICOMUNINAL_DICI_M_27,146.3_IEDUCACNAL_DICI_M_22,146.3_IEQUIPANAL_DICI_M_46,146.3_IPRENDANAL_DICI_M_35,146.3_IRECREANAL_DICI_M_31,146.3_IRESTAUNAL_DICI_M_33,146.3_ISALUDNAL_DICI_M_18,146.3_ITRANSPNAL_DICI_M_23,146.3_IVIVIENNAL_DICI_M_52,145.3_INGNACNAL_DICI_M_15&start_date=2023-12-01&sort=desc&representation_mode=percent_change
export const getInflationByCategories =
  async (startDate = "2023-12-01"): Promise<IInflationByCategories> => {
    try {
      const res = await axios.get<IINDECResponse>(
        `https://apis.datos.gob.ar/series/api/series/?ids=146.3_IALIMENNAL_DICI_M_45,146.3_IBEBIDANAL_DICI_M_39,146.3_IBIENESNAL_DICI_M_36,146.3_ICOMUNINAL_DICI_M_27,146.3_IEDUCACNAL_DICI_M_22,146.3_IEQUIPANAL_DICI_M_46,146.3_IPRENDANAL_DICI_M_35,146.3_IRECREANAL_DICI_M_31,146.3_IRESTAUNAL_DICI_M_33,146.3_ISALUDNAL_DICI_M_18,146.3_ITRANSPNAL_DICI_M_23,146.3_IVIVIENNAL_DICI_M_52,145.3_INGNACNAL_DICI_M_15&start_date=${startDate}&sort=asc&representation_mode=percent_change`,
      );

      const data = res.data;

      const INDEX = {
        alimentos: data.meta.findIndex(
          (m) => m.field?.id === "146.3_IALIMENNAL_DICI_M_45",
        ),
        alcoholTabaco: data.meta.findIndex(
          (m) => m.field?.id === "146.3_IBEBIDANAL_DICI_M_39",
        ),
        bienesServicios: data.meta.findIndex(
          (m) => m.field?.id === "146.3_IBIENESNAL_DICI_M_36",
        ),
        comunicaciones: data.meta.findIndex(
          (m) => m.field?.id === "146.3_ICOMUNINAL_DICI_M_27",
        ),
        educacion: data.meta.findIndex(
          (m) => m.field?.id === "146.3_IEDUCACNAL_DICI_M_22",
        ),
        mantenimientoHogar: data.meta.findIndex(
          (m) => m.field?.id === "146.3_IEQUIPANAL_DICI_M_46",
        ),
        vestimenta: data.meta.findIndex(
          (m) => m.field?.id === "146.3_IPRENDANAL_DICI_M_35",
        ),
        cultura: data.meta.findIndex(
          (m) => m.field?.id === "146.3_IRECREANAL_DICI_M_31",
        ),
        hotelRestaurant: data.meta.findIndex(
          (m) => m.field?.id === "146.3_IRESTAUNAL_DICI_M_33",
        ),
        salud: data.meta.findIndex(
          (m) => m.field?.id === "146.3_ISALUDNAL_DICI_M_18",
        ),
        transporte: data.meta.findIndex(
          (m) => m.field?.id === "146.3_ITRANSPNAL_DICI_M_23",
        ),
        viviendaServicios: data.meta.findIndex(
          (m) => m.field?.id === "146.3_IVIVIENNAL_DICI_M_52",
        ),
        general: data.meta.findIndex(
          (m) => m.field?.id === "145.3_INGNACNAL_DICI_M_15",
        ),
      };

      const finalRes: IInflationByCategories = {
        title: `Inflación por categoría de IPC Nacional. Base diciembere 2016.`,
        source: "Instituto Nacional de Estadística y Censos (INDEC)",
        periodicity: "monthly",
        unit: "%",
        lastDate: data.meta[0].end_date!,
        labels: {
          periodicity: "mensual",
          unit: "%",
          lastDate: formatDate(data.meta[0].end_date!),
        },
        records: data.data.map((rec) => ({
          date: rec[0],
          alimentos: Number((rec[INDEX.alimentos] * 100).toFixed(2)),
          alcoholTabaco: Number((rec[INDEX.alcoholTabaco] * 100).toFixed(2)),
          bienesServicios: Number((rec[INDEX.bienesServicios] * 100).toFixed(2)),
          comunicaciones: Number((rec[INDEX.comunicaciones] * 100).toFixed(2)),
          educacion: Number((rec[INDEX.educacion] * 100).toFixed(2)),
          mantenimientoHogar: Number(
            (rec[INDEX.mantenimientoHogar] * 100).toFixed(2),
          ),
          vestimenta: Number((rec[INDEX.vestimenta] * 100).toFixed(2)),
          cultura: Number((rec[INDEX.cultura] * 100).toFixed(2)),
          hotelRestaurant: Number((rec[INDEX.hotelRestaurant] * 100).toFixed(2)),
          salud: Number((rec[INDEX.salud] * 100).toFixed(2)),
          transporte: Number((rec[INDEX.transporte] * 100).toFixed(2)),
          viviendaServicios: Number(
            (rec[INDEX.viviendaServicios] * 100).toFixed(2),
          ),
          general: Number((rec[INDEX.general] * 100).toFixed(2)),
        })),
        individualRecords: {
          alimentos: {
            title: "Inflación Alimentos y bebidas no alcohólicas",
            record:
              INDEX.alimentos !== -1
                ? data.data.map((rec) => [
                    rec[0],
                    Number((rec[INDEX.alimentos] * 100).toFixed(2)),
                  ])
                : [],
          },
          alcoholTabaco: {
            title: "Inflación Bebidas alcohólicas y tabaco",
            record:
              INDEX.alcoholTabaco !== -1
                ? data.data.map((rec) => [
                    rec[0],
                    Number((rec[INDEX.alcoholTabaco] * 100).toFixed(2)),
                  ])
                : [],
          },
          bienesServicios: {
            title: "Inflación Bienes y servicios varios",
            record:
              INDEX.bienesServicios !== -1
                ? data.data.map((rec) => [
                    rec[0],
                    Number((rec[INDEX.bienesServicios] * 100).toFixed(2)),
                  ])
                : [],
          },
          comunicaciones: {
            title: "Inflación Comunicaciones",
            record:
              INDEX.comunicaciones !== -1
                ? data.data.map((rec) => [
                    rec[0],
                    Number((rec[INDEX.comunicaciones] * 100).toFixed(2)),
                  ])
                : [],
          },
          educacion: {
            title: "Inflación Educación",
            record:
              INDEX.educacion !== -1
                ? data.data.map((rec) => [
                    rec[0],
                    Number((rec[INDEX.educacion] * 100).toFixed(2)),
                  ])
                : [],
          },
          mantenimientoHogar: {
            title: "Inflación Equipamiento y mantenimiento del hogar",
            record:
              INDEX.mantenimientoHogar !== -1
                ? data.data.map((rec) => [
                    rec[0],
                    Number((rec[INDEX.mantenimientoHogar] * 100).toFixed(2)),
                  ])
                : [],
          },
          vestimenta: {
            title: "Inflación Prendas de vestir y calzado",
            record:
              INDEX.vestimenta !== -1
                ? data.data.map((rec) => [
                    rec[0],
                    Number((rec[INDEX.vestimenta] * 100).toFixed(2)),
                  ])
                : [],
          },
          cultura: {
            title: "Inflación Recreación y cultura",
            record:
              INDEX.cultura !== -1
                ? data.data.map((rec) => [
                    rec[0],
                    Number((rec[INDEX.cultura] * 100).toFixed(2)),
                  ])
                : [],
          },
          hotelRestaurant: {
            title: "Inflación Hoteles y restaurantes",
            record:
              INDEX.hotelRestaurant !== -1
                ? data.data.map((rec) => [
                    rec[0],
                    Number((rec[INDEX.hotelRestaurant] * 100).toFixed(2)),
                  ])
                : [],
          },
          salud: {
            title: "Inflación Salud",
            record:
              INDEX.salud !== -1
                ? data.data.map((rec) => [
                    rec[0],
                    Number((rec[INDEX.salud] * 100).toFixed(2)),
                  ])
                : [],
          },
          transporte: {
            title: "Inflación Transporte",
            record:
              INDEX.transporte !== -1
                ? data.data.map((rec) => [
                    rec[0],
                    Number((rec[INDEX.transporte] * 100).toFixed(2)),
                  ])
                : [],
          },
          viviendaServicios: {
            title:
              "Inflación Vivienda, agua, electricidad, y otros combustibles",
            record:
              INDEX.viviendaServicios !== -1
                ? data.data.map((rec) => [
                    rec[0],
                    Number((rec[INDEX.viviendaServicios] * 100).toFixed(2)),
                  ])
                : [],
          },
          general: {
            title: "Inflación general",
            record:
              INDEX.general !== -1
                ? data.data.map((rec) => [
                    rec[0],
                    Number((rec[INDEX.general] * 100).toFixed(2)),
                  ])
                : [],
          },
        },
      };

      return finalRes;
    } catch (error) {
      console.error(error);
      throw new Error(
        `Error al obtener los IPC por categoría de INDEC. Intente más tarde.`,
      );
    }
  };
