

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

// Interface for the returned object for the last Debts
export interface ILastPrivateDebts {
  title: string;
  source: string;
  lastDate: string;
  values: {
    labels: {
      debtType: string;
      lastDate: string;
    };
    lastDate: string;
    periodicity: string;
    debtType: string;
    value: number;
  }[];
}

// Interface for the returned object for the historic Debts
export interface IPrivateDebts {
  title: string;
  source: string;
  lastDate: string;
  values: {
    labels: {
      debtType: string;
      lastDate: string;
      unit: String;
    };
    lastDate: string;
    periodicity: string;
    debtType: string;
    records: RecordType[]; // [date, value][]
  }[];
}

// Interface for the returned object for the IPCs records by category
export interface IInflationByCategories {
  title: string;
  source: string;
  periodicity: "monthly";
  unit: "%";
  lastDate: string;
  labels: {
    periodicity: "mensual";
    unit: "%";
    lastDate: string;
  };
  records: {
    date: string;
    alimentos: number;
    alcoholTabaco: number;
    bienesServicios: number;
    comunicaciones: number;
    educacion: number;
    mantenimientoHogar: number;
    vestimenta: number;
    cultura: number;
    hotelRestaurant: number;
    salud: number;
    transporte: number;
    viviendaServicios: number;
    general: number;
  }[];
  individualRecords: {
    alimentos: {
      title: string;
      record: RecordType[];
    }
    alcoholTabaco: {
      title: string;
      record: RecordType[];
    }
    bienesServicios: {
      title: string;
      record: RecordType[];
    }
    comunicaciones: {
      title: string;
      record: RecordType[];
    }
    educacion: {
      title: string;
      record: RecordType[];
    }
    mantenimientoHogar: {
      title: string;
      record: RecordType[];
    }
    vestimenta: {
      title: string;
      record: RecordType[];
    }
    cultura: {
      title: string;
      record: RecordType[];
    }
    hotelRestaurant: {
      title: string;
      record: RecordType[];
    }
    salud: {
      title: string;
      record: RecordType[];
    }
    transporte: {
      title: string;
      record: RecordType[];
    }
    viviendaServicios: {
      title: string;
      record: RecordType[];
    }
    general: {
      title: string;
      record: RecordType[];
    }
  };
}
