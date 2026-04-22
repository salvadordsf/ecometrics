export const Title = ({ title, label= "" }: { title: string; label?: string }) => {
  return (
    <div className="max-w-2xl flex flex-col items-center gap-2 mb-6">
      {label && (
        <span className="text-[10px] font-medium tracking-[0.2rem] uppercase text-amber">
          {label}
        </span>
      )}
      <h1 className="text-2xl font-semibold text-text-primary tracking-tight">
        {title}
      </h1>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-amber to-transparent" />
    </div>
  );
};
