export const ErrorVarCard = ({
  title,
  api,
}: {
  title: string;
  api: "bcra" | "dolar" | "arg";
}) => {
  const label =
    api === "bcra"
      ? "El servicio del Banco Central de la República Argentina"
      : api === "dolar"
        ? "El servicio de Dolar API"
        : "El servicio de Argentina Datos";

  return (
    <div className="flex flex-col items-center justify-center gap-1 w-90 p-4 border border-neutral-500 rounded-xl bg-neutral-700/10">
      <h3 className="text-md text-center text-neutral-500 font-bold">
        {title}
      </h3>
      <p className="text-xs text-center text-neutral-700">
        {`${label} no se encuentra disponible en este momento. Intente recargar más tarde.`}
      </p>
    </div>
  );
};
