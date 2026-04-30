"use client";

import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";

export const ChartLinesSelector = ({
  inputs,
}: {
  inputs: {
    label: string;
    setState: Dispatch<SetStateAction<boolean>>;
    color?: string;
  }[];
}) => {
  const [checked, setChecked] = useState<boolean[]>(inputs.map(() => true));
  const [hovered, setHovered] = useState<number | null>(null);

  const toggle = (i: number) => {
    inputs[i].setState((prev) => !prev);
    setChecked((prev) => prev.map((v, j) => (j === i ? !v : v)));
  };

  return (
    <div className="flex flex-wrap gap-2 p-1 mb-5 justify-center">
      {inputs.map((input, i) => (
        <button
          key={`line-${i}`}
          onClick={() => toggle(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          className={clsx(
            "flex items-center gap-2 px-3 py-1.5 rounded-md",
            "border text-xs font-medium tracking-wide",
            "transition-all duration-150 cursor-pointer",
            checked[i]
              ? "border-border-2 bg-surface-2 text-text-primary"
              : "border-border bg-surface text-text-muted opacity-50 hover:opacity-70 hover:border-border-2"
          )}
          style={
            checked[i] && hovered === i && input.color
              ? { borderColor: input.color, boxShadow: `0 0 0 1px ${input.color}33` }
              : undefined
          }
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