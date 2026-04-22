import { UseFormRegisterReturn } from "react-hook-form";

interface MonthOption {
  value: number;
  label: string;
}

interface MonthSelectProps {
  registration: UseFormRegisterReturn;
  options: MonthOption[];
  selectKey?: string;
}

export const MonthSelect = ({ registration, options, selectKey }: MonthSelectProps) => (
  <select
    key={selectKey}
    {...registration}
    className="
      flex-1 rounded-md border border-border bg-background px-3 py-3.5
      text-sm font-medium text-text-primary
      hover:border-border-2 focus:border-amber focus:ring-2 focus:ring-amber/15
      outline-none transition-all duration-150
      appearance-none cursor-pointer
      bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23d97706%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')]
      bg-no-repeat bg-[right_12px_center]
    "
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value} className="bg-background text-text-primary">
        {opt.label}
      </option>
    ))}
  </select>
);