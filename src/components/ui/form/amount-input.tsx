import { UseFormRegisterReturn } from "react-hook-form";
import { FormErrorMessage } from "./form-error-message";
import { InputLabel } from "./input-label";

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
    <InputLabel label={label} />

    <div className="relative">
      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-amber">
        $
      </span>
      <input
        type="number"
        step={step}
        {...registration}
        placeholder={placeholder}
        className={`
          w-full rounded-md border bg-background py-3.5 pl-9 pr-3.5
          text-sm text-text-primary
          placeholder:font-normal placeholder:text-text-muted
          outline-none transition-all duration-150
          [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/15"
              : "border-border hover:border-border-2 focus:border-amber focus:ring-2 focus:ring-amber/15"
          }
        `}
      />
    </div>

    <div
      className={`h-px from-amber to-transparent transition-opacity duration-150 ${
        error ? "opacity-0" : "opacity-0 focus-within:opacity-100"
      }`}
    />

    <FormErrorMessage message={error} />
  </div>
);
