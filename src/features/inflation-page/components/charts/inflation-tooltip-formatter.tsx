import { TooltipValueType } from "recharts";
import { NameType } from "recharts/types/component/DefaultTooltipContent";
import { INFLATION_TYPE_COLOR } from "../../utils/inflation-type-color";
import { INFLATION_TYPE_LABEL } from "../../utils/inflation-type-labels";

export const inflationTooltipFormatter = (
  value: TooltipValueType | undefined,
  name: NameType | undefined = "",
) => {
  const color = INFLATION_TYPE_COLOR[name];
  const label = INFLATION_TYPE_LABEL[name];
  
  if (!label) return [String(value), name];

  return [
    <span
      style={{ color }}
    >{`${Number(value).toLocaleString("es-AR")}%`}</span>,
    label
  ];
};
