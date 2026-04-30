export const DEBT_TYPE_LABEL: Record<string, string> = {
  adelantos:   "Adelantos",
  documentos:  "Documentos",
  hipotecario: "Hipotecarios",
  prendario:   "Prendario",
  personal:    "Personales",
  tarjeta:     "Tarjeta",
} as const;

export const DEBT_TYPE_USD_LABEL: Record<string, string> = {
  cuentaCorrienteUsd: "cuenta corriente",
  documentosUsd: "documentos",
  hipotecarioUsd: "hipotecario",
  prendarioUsd: "prendario",
  personalUsd: "personal",
  tarjetaUsd: "tarjeta",
  otrosUsd: "otros",
} as const;
