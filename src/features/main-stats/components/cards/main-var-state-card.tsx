import { clsx } from "clsx";
import { ReactElement } from "react";

export const MainVarStateCard = ({
  stateColor,
  title,
  children,
}: {
  stateColor: "red" | "yellow" | "green";
  title: string;
  children: ReactElement;
}) => {
  const cardClass =
  stateColor === "red"
    ? "border-red-600 bg-red-600/20"
    : stateColor === "yellow"
    ? "border-yellow-600 bg-yellow-600/20"
    : "border-green-800 bg-green-800/20";

    const textClass =
  stateColor === "red"
    ? "text-red-300"
    : stateColor === "yellow"
    ? "text-yellow-300"
    : "text-green-300";

  return (
    <div className={clsx("flex flex-col items-center justify-center gap-1 w-90 p-4 border rounded-xl", cardClass)}>
      <h3 className="text-center text-white font-bold">{title}</h3>
      <div className={textClass}>
        {children}
      </div>
    </div>
  );
};
