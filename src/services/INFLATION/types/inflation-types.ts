// IPC response types
export interface InflationResponseType {
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

// Inflation returned data types
export interface InflationDataInf {
  inflationRecord: InflationRecord[];
  inflationRecordCount: number;
  startDate: string;
  endDate: string;
  title: string;
  source: string;
}

export type InflationRecord = [string, number];
