import Link from "next/link";

const calculadoras = [
  {
    slug: "inflacion",
    nombre: "Inflación acumulada",
    descripcion:
      "Calculá cuánto se devaluó el peso en un período determinado y el impacto sobre un monto de referencia.",
    indices: ["IPC BCRA"],
    disponible: true,
  },
  {
    slug: "poder-adquisitivo",
    nombre: "Poder adquisitivo",
    descripcion:
      "Medí si un salario o ingreso ganó o perdió poder de compra real frente a la inflación del período.",
    indices: ["IPC BCRA"],
    disponible: true,
  },
  {
    slug: "alquiler",
    nombre: "Actualización de alquiler",
    descripcion:
      "Simulá la evolución de un contrato de alquiler según el índice elegido y el intervalo de actualización.",
    indices: ["IPC BCRA", "ICL BCRA", "Coeficiente Casa Propia"],
    disponible: true,
  },
];

export default function CalculadorasPage() {
  return (
    <main className="max-w-5xl mx-auto px-8 py-16 flex flex-col gap-12 bg-zinc-950">
      {/* Page header */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] tracking-[0.2em] uppercase text-amber-600/70">
          herramientas
        </span>
        <h1 className="text-2xl font-semibold text-gray-50 tracking-tight">
          Calculadoras
        </h1>
        <p className="text-[13px] text-gray-500 leading-relaxed max-w-md">
          Explora todas las calculadoras económicas.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {calculadoras.map((calc) => (
          <Link
            key={calc.slug}
            href={`/calculadoras/${calc.slug}`}
            className="group relative flex flex-col gap-4 rounded-md border border-gray-800 bg-gray-900 p-5 hover:border-gray-700 hover:bg-gray-800/60 transition-all duration-150"
          >

            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <p className="text-[13px] font-semibold text-gray-100 group-hover:text-white transition-colors">
                {calc.nombre}
              </p>
              <span className="text-gray-700 group-hover:text-amber-600 transition-colors duration-150 shrink-0 mt-0.5">
                ↗
              </span>
            </div>

            {/* Descripción */}
            <p className="text-[12px] text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-150 flex-1">
              {calc.descripcion}
            </p>

            {/* Índices */}
            <div className="flex flex-wrap gap-1.5 pt-1 border-t border-gray-800/60">
              {calc.indices.map((idx) => (
                <span
                  key={idx}
                  className="text-[9px] tracking-[0.1em] uppercase px-2 py-1 rounded bg-amber-600/10 text-amber-600/70 border border-amber-600/20"
                >
                  {idx}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
