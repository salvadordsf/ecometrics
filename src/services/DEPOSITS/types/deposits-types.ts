export interface DepositsResponseType {
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

export interface ARSDepositsReturnType {
  title: "Depósitos del sector privado ML no financiero (incluye cedros)";
  periodicity: "daily";
  unit: "Millions ARS";
  value: number;
  lastDate: string;
  labels: {
    periodicity: "diaria";
    unit: "Millones de pesos ARS";
    lastDate: string;
  };
}

export interface MEDepositsReturnType {
  title: "Depósitos del sector privado ME no financiero";
  periodicity: "daily";
  unit: "Millions ARS";
  value: number;
  lastDate: string;
  labels: {
    periodicity: "diaria";
    unit: "Millones de pesos ARS";
    lastDate: string;
  };
}