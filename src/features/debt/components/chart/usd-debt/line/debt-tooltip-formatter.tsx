import { TooltipValueType } from "recharts";
import { DEBT_TYPE_COLOR } from "../../../../util/debt-type-color";
import { DEBT_TYPE_USD_LABEL } from "../../../../util/debt-type-label";
import { NameType } from "recharts/types/component/DefaultTooltipContent";

export const debtTooltipFormatter = (
  value: TooltipValueType | undefined,
  name: NameType | undefined = "",
) => {
  const color = DEBT_TYPE_COLOR[name];
  const label = DEBT_TYPE_USD_LABEL[name];
  
  if (!label) return [String(value), name];

  return [
    <span
      style={{ color }}
    >{`${Number(value).toLocaleString("es-AR")} Millones de USD`}</span>,
    label
  ];
};
