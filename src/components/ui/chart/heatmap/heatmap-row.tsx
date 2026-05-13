import HeatmapCell from "./heatmap-cell";
import { getColorIndex } from "./util/get-color-index";

interface IHeatmapRowProps {
  label: string;
  dataKey: string;
  data: any[];
  valueUnit?: string;
  values: {
    min: number;
    max: number;
  };
}

export default function HeatmapRow({
  label,
  dataKey,
  data,
  valueUnit,
  values,
}: IHeatmapRowProps) {
  return (
    <tr className="border-t border-border">
      <td className="sticky left-0 z-10 border border-border bg-background min-w-35 px-3 py-2 text-xs font-medium text-foreground whitespace-nowrap">
        {label}
      </td>
      {data.flatMap((item: any, i) => (
        <HeatmapCell
          colorIndex={getColorIndex(item[dataKey], values.min, values.max)}
          key={`${dataKey}-${item[dataKey]}-${i}`}
          value={item[dataKey]}
          valueUnit={valueUnit}
        />
      ))}
    </tr>
  );
}
