import { HEATMAP_CELL_COLORS } from "./util/heatmap-cell-colors";

export default function HeatmapLegend() {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex w-full rounded overflow-hidden border border-border">
        {HEATMAP_CELL_COLORS.map((color, i) => (
          <div
            key={i}
            className="flex-1 h-5"
            style={{ backgroundColor: color.bg }}
          />
        ))}
      </div>
      <div className="flex w-full justify-between px-0.5">
        <span className="text-xs text-muted-foreground">Baja</span>
        <span className="text-xs text-muted-foreground">Alta</span>
      </div>
    </div>
  );
}
