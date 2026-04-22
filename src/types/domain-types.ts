// Interface for the returned objects for last records
export interface ILastRecordResponse {
  title: string;
  source: string;
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

// Interface for the returned object for all the records
export interface IRecordResponse {
  title: string;
  source: string;
  record: RecordType[];
  recordCount: number;
  startDate: string;
  endDate: string;
}

export type RecordType = [string, number]; // [date, value]

// Interface for the returned object for the last USDs exchange records
export interface IUSDSExchangeReturn {
  title: string;
  source: string;
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

// Interface for the returned object for the USD [casa] exchange records
export interface IUSDCasaHis {
  title: string;
  source: string;
  periodicity: string;
  unit: string;
  lastDate: string;
  labels: {
    periodicity: string;
    unit: string;
    lastDate: string;
  };
  values: {
    date: string;
    buy: number;
    sale: number;
  }[];
}

// Interface for the returned objects for getUSDVariation
export interface IGetUSDVariation {
  title: string;
  source: string;
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
