import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

export const NominalRealToggle = ({
  isReal,
  setIsReal,
}: {
  isReal: boolean;
  setIsReal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex gap-2 mb-3">
      <button
        onClick={() => setIsReal(false)}
        className={clsx(
          "px-3 py-1 rounded text-sm font-medium border transition-all bg-surface-2 cursor-pointer",
          !isReal
            ? "border-amber text-text-primary"
            : "border-border text-text-muted/80 hover:border-amber hover:text-text-secondary",
        )}
      >
        Nominal
      </button>
      <button
        onClick={() => setIsReal(true)}
        className={clsx(
          "px-3 py-1 rounded text-sm font-medium border transition-all bg-surface-2 cursor-pointer",
          isReal
            ? "border-amber text-text-primary"
            : "border-border text-text-muted/80 hover:border-amber hover:text-text-secondary",
        )}
      >
        Real (a precios de hoy)
      </button>
    </div>
  );
};
