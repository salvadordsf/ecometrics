import { ReactElement } from "react";

export const VarDescription = ({
  title,
  description,
  high,
  low,
  relations,
  extraElement,
}: {
  title: string;
  description: string;
  high?: string;
  low?: string;
  relations?: string[];
  extraElement?: ReactElement;
}) => {
  return (
    <div className="p-2 pb-10 text-text-primary">
      <h3 className="mb-3 font-semibold text-xl">{title}</h3>
      <p className="text-text-secondary mb-4">{description}</p>

      {(high || low) && (
        <div className="flex flex-col gap-2 mb-4">
          {high && (
            <div className="flex gap-2 items-start">
              <span className="text-green-400 font-semibold text-sm shrink-0">
                ↑ Alto
              </span>
              <p className="text-text-secondary text-sm">{high}</p>
            </div>
          )}
          {low && (
            <div className="flex gap-2 items-start">
              <span className="text-red-400 font-semibold text-sm shrink-0">
                ↓ Bajo
              </span>
              <p className="text-text-secondary text-sm">{low}</p>
            </div>
          )}
        </div>
      )}

      {relations && relations.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
            Relaciones clave
          </span>
          {relations.map((rel, i) => (
            <div key={i} className="flex gap-2 items-start">
              <span className="text-text-muted text-sm shrink-0">•</span>
              <p className="text-text-secondary text-sm">{rel}</p>
            </div>
          ))}
        </div>
      )}

      {extraElement && <div className="mt-4">{extraElement}</div>}
    </div>
  );
};
