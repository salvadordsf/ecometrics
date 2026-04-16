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
