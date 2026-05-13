export const Subtitle = ({ subtitle }: { subtitle: string }) => {
  return (
    <div className="flex items-center gap-3 w-full max-w-3xl mb-4">
      <div className="w-1 h-6 rounded-full bg-linear-to-b from-amber-400 to-amber-600" />
      <h2 className="text-xl font-semibold text-text-primary tracking-tight">
        {subtitle}
      </h2>
    </div>
  );
};