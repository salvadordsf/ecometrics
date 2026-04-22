import { UseFormRegisterReturn } from "react-hook-form";
import { InputLabel } from "./input-label";

interface SelectOption {
  value: number | string;
  label: string;
}

interface SelectProps {
  registration: UseFormRegisterReturn;
  options: SelectOption[];
  selectKey?: string;
  className?: string;
  label: string;
}

export const UiSelect = ({
  registration,
  options,
  selectKey,
  className,
  label,
}: SelectProps) => (
  <div className="flex flex-col gap-1.5">
    <InputLabel label={label}/>

    <select
      key={selectKey}
      {...registration}
      className={`
      w-1/2 rounded-md border border-border bg-background px-3 py-3.5
      text-sm font-medium text-text-primary
      hover:border-border-2 focus:border-amber focus:ring-2 focus:ring-amber/15
      outline-none transition-all duration-150
      appearance-none cursor-pointer
      bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23d97706%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')]
      bg-no-repeat bg-[right_12px_center]
      ${className ?? ""}
    `}
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value} className="bg-background text-text-primary">
          {label}
        </option>
      ))}
    </select>
  </div>
);
