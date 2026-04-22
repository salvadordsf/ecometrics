
export interface IDolarApiCotization {
  moneda: string;
  casa: USDCasaType;
  nombre: string;
  compra: number;
  venta: number;
  fechaActualizacion: string;
}

export type USDCasaType =
  | "oficial"
  | "blue"
  | "bolsa"
  | "contadoconliqui"
  | "cripto"
  | "mayorista";