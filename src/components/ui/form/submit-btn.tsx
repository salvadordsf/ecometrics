interface SubmitButtonProps {
  label: string;
}

export const SubmitButton = ({ label }: SubmitButtonProps) => (
  <button
    type="submit"
    className="
      relative w-full overflow-hidden rounded-md
      border border-amber/60 bg-amber/10
      px-4 py-3.5 text-sm font-semibold tracking-[0.08em] uppercase text-amber
      transition-all duration-150
      hover:bg-amber/20 hover:border-amber-500 hover:text-amber
      active:scale-[0.98]
      focus:outline-none focus:ring-2 focus:ring-amber/30 cursor-pointer
    "
  >
    <span className="relative z-10">{label}</span>
    <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
  </button>
);
