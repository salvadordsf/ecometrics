//  Tasa Efectiva Mensual (TEM) (pesos nominales sin inflación)
export const getTEMbyBADLAR = (badlar: number): number => {
  const decimalBADLAR = badlar / 100;

  const dailyRate = decimalBADLAR / 365;

  const rate = 1 + dailyRate;

  const depositDuration = 30; /* days */

  return rate ** depositDuration - 1;
};

// Tasa Real Menusal incluyendo inflacion (Fisher)
export const getTRM = (badlar: number, inflation: number) =>
  (1 + getTEMbyBADLAR(badlar)) / (1 + inflation) - 1;
