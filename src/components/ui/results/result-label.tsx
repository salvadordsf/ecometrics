interface ResultLabelProps {
  label: string;
}

export const ResultLabel = ({ label }: ResultLabelProps) => (
  <span className="text-xs tracking-[0.12em] uppercase text-gray-500">
    {label}
  </span>
);
