import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-8">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(217,119,6,0.07),transparent)] pointer-events-none" />

      {/* Content */}
      <div className="relative flex flex-col items-center gap-8 max-w-lg text-center">
        {/* Eyebrow */}
        <span className="text-[10px] tracking-[0.3em] uppercase text-amber-600/70">
          código abierto · argentina
        </span>

        {/* Title */}
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-semibold text-gray-50 tracking-tight leading-tight">
            Calculadoras Económicas Argentinas
          </h1>
          <p className="text-[13px] text-gray-500 leading-relaxed">
            Calculadoras simples y precisas para entender el impacto de las
            variables económicas en salarios, poder adquisitivo, ahorros y
            contratos de alquiler.
          </p>
        </div>

        <div className="w-[75%] h-px bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/calculadoras"
            className="
              relative px-5 py-2.5 rounded-md overflow-hidden
              border border-amber-600/60 bg-amber-600/10
              text-[11px] tracking-[0.1em] uppercase font-semibold text-amber-400
              hover:bg-amber-600/20 hover:border-amber-500 hover:text-amber-300
              transition-all duration-150
            "
          >
            <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
            Ver calculadoras
          </Link>

          <Link
            href="/autor"
            className="
              px-5 py-2.5 rounded-md
              text-[11px] tracking-[0.1em] uppercase font-medium
              text-gray-500 hover:text-gray-300 hover:bg-gray-800/50
              transition-all duration-150
            "
          >
            Autor
          </Link>
        </div>

        {/* calculators preview */}
        <div className="w-full flex flex-col gap-1.5 mt-4">
          {[
            {
              label: "Calculadora de inflación acumulada",
              href: "/calculadoras/inflacion",
            },
            {
              label: "Calculadora de poder adquisitivo",
              href: "/calculadoras/poder-adquisitivo",
            },
            {
              label: "Calculadora de actualización de alquiler",
              href: "/calculadoras/alquiler",
            },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-between px-4 py-2.5 rounded-md border border-gray-800/60 bg-gray-900/40 hover:border-gray-700 hover:bg-gray-900 transition-all duration-150 group"
            >
              <span className="text-[12px] text-gray-500 group-hover:text-gray-300 transition-colors duration-150">
                {label}
              </span>
              <span className="text-gray-700 group-hover:text-amber-600 transition-colors duration-150 text-[11px]">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
