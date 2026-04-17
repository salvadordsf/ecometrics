// DOLARAPI
// USD response types
export type USDSExchangeResponseType = USDS[];

export interface USDS {
  moneda: string;
  casa: string;
  nombre: string;
  compra: number;
  venta: number;
  fechaActualizacion: string;
}

// USD returned data types
export interface IUSDSExchangeReturn {
  title: "Cotización Dólares";
  periodicity: "d";
  unit: "ARS";
  lastDate: string;
  labels: {
    periodicity: "diaria";
    unit: "ARS";
    lastDate: string;
  };
  values: {
    oficial: IUSDExchange;
    blue: IUSDExchange;
    bolsa: IUSDExchange;
    CCL: IUSDExchange;
    mayorista: IUSDExchange;
    cripto: IUSDExchange;
    tarjeta: IUSDExchange;
  };
}

export interface IUSDExchange {
  title: string;
  unit: "ARS";
  values: {
    buy: number;
    sale: number;
  };
}

//BCRA
// USD response types
export interface USDResponseType {
  status: number;
  metadata: Metadata;
  results: Result[];
}

export interface Metadata {
  resultset: Resultset;
}

export interface Resultset {
  count: number;
  offset: number;
  limit: number;
}

export interface Result {
  idVariable: number;
  detalle: Detalle[];
}

export interface Detalle {
  fecha: string;
  valor: number;
}

// USD returned data types
export interface IGetUSDVariation {
  title: string;
  unit: string;
  value: number;
  dates: {
    prevDate: string;
    lastDate: string;
  };
  labels: {
    unit: string;
    dates: {
      prevDate: string;
      lastDate: string;
    };
  };
}
