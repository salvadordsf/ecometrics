// Last BADLAR Record
export interface LastBADLARResponseTypes {
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

export interface ILastBADLAR {
  title: string;
  periodicity: string;
  unit: string;
  value: number;
  lastDate: string;
  labels: {
    periodicity: string;
    unit: string;
    lastDate: string;
  };
}
