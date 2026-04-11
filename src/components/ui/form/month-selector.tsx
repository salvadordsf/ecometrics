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
      flex-1 rounded-md border border-gray-700 bg-gray-950 px-3 py-3.5
      text-[13px] font-medium text-gray-50
      hover:border-gray-600 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/15
      outline-none transition-all duration-150
      appearance-none cursor-pointer
      bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23d97706%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')]
      bg-no-repeat bg-[right_12px_center]
    "
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value} className="bg-gray-900 text-gray-50">
        {opt.label}
      </option>
    ))}
  </select>
);