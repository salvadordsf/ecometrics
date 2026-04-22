import { USDCasaType } from "./dolar-api-types";

export interface IArgDatosHis {
  casa: USDCasaType;
  compra: number;
  venta: number;
  fecha: string;
}