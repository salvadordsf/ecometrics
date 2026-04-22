export interface IBCRAResponse {
  status: number;
  metadata: { resultset: { count: number; offset: number; limit: number } };
  results: {
    idVariable: number;
    detalle: { fecha: string; valor: number }[];
  }[];
}

export interface IBCRAVarMeta {
  status: number;
  metadata: { resultset: { count: number; offset: number; limit: number } };
  results: {
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
  }[];
}
