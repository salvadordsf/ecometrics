export const Subtitle = ({ subtitle }: { subtitle: string }) => {
  return (
    <div className="flex items-center gap-3 sm:gap-5 w-full max-w-3xl mb-4">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />

      <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-50 tracking-tight text-center whitespace-nowrap">
        {subtitle}
      </h2>

      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
    </div>
  );
};
