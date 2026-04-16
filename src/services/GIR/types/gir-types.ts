// Last GIR Record
export interface LastGIRResponseTypes {
  status: number;
  metadata: Metadata;
  results: LastGIRVarTypes[];
}

interface Metadata {
  resultset: Resultset;
}

interface Resultset {
  count: number;
  offset: number;
  limit: number;
}

interface LastGIRVarTypes {
  idVariable: number;
  descripcion: string;
  categoria: string;
  tipoSerie: string;
  periodicidad: string;
  unidadExpresion: string;
  moneda: string;
  primerFechaInformada: string;
  ultFechaInformada: string;
  ultValorInformado: number;
}

export interface ILastGIR {
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
