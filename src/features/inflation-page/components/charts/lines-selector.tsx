"use client";

import { Dispatch, SetStateAction } from "react";

export const InflationChartLinesSelector = ({
  inputs,
}: {
  inputs: { label: string; setState: Dispatch<SetStateAction<boolean>> }[];
}) => {
  return (
    <div className="flex gap-5 p-3">
      {inputs.map((input, i) => (
        <label key={`line-${i}`} className="flex gap-1 cursor-pointer">
          <input
            type="checkbox"
            defaultChecked
            onClick={() => input.setState((prev) => !prev)}
          />
          {input.label}
        </label>
      ))}
    </div>
  );
};
