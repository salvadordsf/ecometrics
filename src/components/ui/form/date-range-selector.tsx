import { UseFormRegisterReturn } from "react-hook-form";
import { FormErrorMessage } from "./form-error-message";
import { MonthSelect } from "./month-selector";
import { YearSelect } from "./year-selector";

interface MonthOption {
  value: number;
  label: string;
}

interface DateRangeSelectorProps {
  label: string;
  monthRegistration: UseFormRegisterReturn;
  yearRegistration: UseFormRegisterReturn;
  monthOptions: MonthOption[];
  yearOptions: number[];
  error?: string;
  selectKey?: string;
}

export const DateRangeSelector = ({
  label,
  monthRegistration,
  yearRegistration,
  monthOptions,
  yearOptions,
  error,
  selectKey,
}: DateRangeSelectorProps) => (
  <div className="flex flex-col gap-1.5">
    <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-gray-500">
      {label}
    </span>

    <div className="flex gap-2">
      <MonthSelect
        registration={monthRegistration}
        options={monthOptions}
        selectKey={selectKey ? `month-${selectKey}` : undefined}
      />
      <YearSelect
        registration={yearRegistration}
        options={yearOptions}
        selectKey={selectKey ? `year-${selectKey}` : undefined}
      />
    </div>

    <FormErrorMessage message={error} />
  </div>
);
