import { UseFormRegisterReturn } from "react-hook-form";
import { FormErrorMessage } from "./form-error-message";

interface AmountInputProps {
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  placeholder?: string;
  step?: string;
}

export const AmountInput = ({
  label,
  registration,
  error,
  placeholder = "100.000",
  step = "1",
}: AmountInputProps) => (
  <div className="flex flex-col gap-1.5">
    <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-gray-500">
      {label}
    </span>

    <div className="relative">
      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] font-medium text-amber-600">
        $
      </span>
      <input
        type="number"
        step={step}
        {...registration}
        placeholder={placeholder}
        className={`
          w-full rounded-md border bg-gray-950 py-3.5 pl-9 pr-3.5
          text-[15px] font-medium text-gray-50
          placeholder:font-normal placeholder:text-gray-700
          outline-none transition-all duration-150
          [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/15"
              : "border-gray-700 hover:border-gray-600 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/15"
          }
        `}
      />
    </div>

    <div
      className={`h-px from-amber-600 to-transparent transition-opacity duration-150 ${
        error ? "opacity-0" : "opacity-0 focus-within:opacity-100"
      }`}
    />

    <FormErrorMessage message={error} />
  </div>
);
