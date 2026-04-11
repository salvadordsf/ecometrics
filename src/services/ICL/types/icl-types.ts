// ICL response types
export interface ICLResponseType {
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

// ICL returned data types
export interface IclDataInf {
  iclRecord: IclRecord[];
  iclRecordCount: number;
  startDate: string;
  endDate: string;
  title: string;
  source: string;
}

export type IclRecord = [string, number];
