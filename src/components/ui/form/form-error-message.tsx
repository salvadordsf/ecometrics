interface FormErrorMessageProps {
  message?: string;
}

export const FormErrorMessage = ({ message }: FormErrorMessageProps) => {
  if (!message) return null;

  return (
    <p className="flex items-center gap-1.5 text-[11px] tracking-[0.04em] text-red-500">
      <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-[9px] font-semibold">
        !
      </span>
      {message}
    </p>
  );
};
