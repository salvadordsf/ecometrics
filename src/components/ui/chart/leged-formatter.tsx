import { ReactElement } from "react";

export const RenderLegendFormatter = (value: string, entry: any): ReactElement => {
  const { color } = entry;

  let label = "";

  switch (value) {
    case "inflation":
      label = "Inflación";
      break;
    case "usdOficial":
      label = "Dolar oficial";
      break;
    case "usdCCL":
      label = "Dolar CLL";
      break;
    case "usdBlue":
      label = "Dolar blue";
      break;
  }

  return <span style={{ color }}>{label}</span>;
};
