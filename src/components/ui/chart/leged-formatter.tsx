import { INFLATION_TYPE_LABEL } from "@/src/features/inflation-page/utils/inflation-type-labels";
import { ReactElement } from "react";

export const RenderLegendFormatter = (value: string, entry: any): ReactElement => {
  const { color } = entry;

  let label = "";

  switch (value) {
    case "inflation":
      label = INFLATION_TYPE_LABEL.inflation;
      break;
    case "usdOficial":
      label = INFLATION_TYPE_LABEL.usdOficial;
      break;
    case "usdCCL":
      label = INFLATION_TYPE_LABEL.usdCCL;
      break;
    case "usdBlue":
      label = INFLATION_TYPE_LABEL.usdBlue;
      break;
  }
  
  return <span style={{ color }}>{label}</span>;
};
