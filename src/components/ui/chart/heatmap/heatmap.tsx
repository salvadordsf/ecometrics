import HeatmapLegend from "./heatmap-legend";
import HeatmapRow from "./heatmap-row";

interface IHeatmapProps {
  data: any[];
  XAxis: string;
  rows: {
    dataKey: string;
    label: string;
  }[];
  valueUnit?: string;
  values: {
    min: number;
    max: number;
  };
}

export default function Heatmap({
  data,
  XAxis,
  rows,
  valueUnit,
  values,
}: IHeatmapProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="max-w-80 md:max-w-3xl rounded-md border border-border">
        {/* Wrapper with scroll */}
        <div className="overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th
                  className="sticky left-0 z-10 bg-background min-w-35 px-3 py-2 text-left text-xs font-medium text-muted-foreground
                              after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-border after:content-['']"
                />
                {data.map((item, i) => (
                  <th
                    key={`x-label-${i}`}
                    className="min-w-16 px-2 py-2 text-center text-xs font-medium text-muted-foreground whitespace-nowrap"
                  >
                    {item[XAxis]}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, i) => (
                <HeatmapRow
                  key={`row-${i}`}
                  label={row.label}
                  dataKey={row.dataKey}
                  data={data}
                  valueUnit={valueUnit}
                  values={values}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <HeatmapLegend />
    </div>
  );
}
