"use client";

import { Dispatch, SetStateAction, useState } from "react";

export const InflationChartLinesSelector = ({
  inputs,
}: {
  inputs: { label: string; setState: Dispatch<SetStateAction<boolean>>; color?: string }[];
}) => {
  const [checked, setChecked] = useState<boolean[]>(inputs.map(() => true));

  const toggle = (i: number) => {
    inputs[i].setState((prev) => !prev);
    setChecked((prev) => prev.map((v, j) => (j === i ? !v : v)));
  };

  return (
    <div className="flex flex-wrap gap-2 p-1 mb-5">
      {inputs.map((input, i) => (
        <button
          key={`line-${i}`}
          onClick={() => toggle(i)}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-md
            border text-xs font-medium tracking-wide
            transition-all duration-150 cursor-pointer
            ${checked[i]
              ? "border-border-2 bg-surface-2 text-text-primary hover:border-amber/50 hover:bg-surface-2"
              : "border-border bg-surface text-text-muted opacity-50 hover:opacity-70 hover:border-border-2"
            }
          `}
        >
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: input.color ?? "#d97706" }}
          />
          {input.label}
        </button>
      ))}
    </div>
  );
};