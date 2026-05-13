import { HEATMAP_CELL_COLORS } from "./util/heatmap-cell-colors";

interface IHeatmapCellProps {
  value: string | number;
  valueUnit?: string;
  colorIndex?: number;
}

export default function HeatmapCell({
  value,
  valueUnit,
  colorIndex = 0,
}: IHeatmapCellProps) {
  const color = HEATMAP_CELL_COLORS[colorIndex] ?? HEATMAP_CELL_COLORS[0];

  return (
    <td
      className="min-w-16 px-2 py-2.5 border border-border text-center text-md font-medium tracking-wide transition-opacity duration-150 hover:opacity-80 cursor-default"
      style={{ backgroundColor: color.bg, color: color.text }}
    >
      {value}
      {valueUnit && <span className="ml-0.5 opacity-70">{valueUnit}</span>} 
    </td>
  );
}
