interface InputLabelProps {
  label: string;
}

export const InputLabel = ({ label }: InputLabelProps) => (
  <span className="text-xs tracking-[0.12em] uppercase text-text-muted">
    {label}
  </span>
);
