export const FormTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col items-center gap-2 mb-6">
      <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-amber-600">
        calculadora
      </span>
      <h2 className="text-2xl font-semibold text-gray-50 tracking-tight">
        {title}
      </h2>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
    </div>
  );
};
